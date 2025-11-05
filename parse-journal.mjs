#!/usr/bin/env node
import fs from "fs";

const TICKERS = {
  "₳": "ADA",
  "$": "USDM",
};

/**
 * Parse a ledger journal markdown and build a structured model
 * @param {string} md - markdown content
 * @returns {{ metadata: object, transactions: object[] }}
 */
function parseLedger(md) {
  const metadata = {};
  const transactions = [];

  //
  // ---- HEADER / PREAMBLE PARSING ----
  //
  const getField = (label) => {
    const regex = new RegExp(`\\|\\s*${label}\\s*\\|([^|]+)\\|`);
    const match = md.match(regex);
    return match ? match[1].trim() : null;
  };

  // Maintainer
  const maintainerMatch = getField("Maintainer\\(s\\)");
  metadata.maintainer = maintainerMatch
    ? maintainerMatch.replace(/\[([^\]]+)\]\[\]/g, "$1").trim()
    : null;

  // Owner credential
  metadata.ownerCredential = getField("Owner's credential")?.replace(/`/g, "") ?? null;

  // Treasury script hash
  metadata.treasuryScriptHash = getField("Treasury's script hash")?.replace(/`/g, "") ?? null;

  // Treasury stake address (the actual stake... value)
  const stakeMatch = getField("Treasury's stake address");
  metadata.treasuryStakeAddress = stakeMatch
    ? stakeMatch.match(/`?(stake[a-z0-9]+)`?/)?.[1] ?? null
    : null;

  // Treasury address (resolve explorer link)
  const addrMatch = getField("Treasury's address");
  const addrSlug = addrMatch?.match(/\[`([^`]*)`/)[1];
  const explorerLink = md.split("\n").find((row) => row.includes(`[\`${addrSlug}\`]:`));

  metadata.treasuryAddress = explorerLink.split("/address/")[1].trim();

  // Initial allocation and current balance (multiple currency lines possible)
  const alloc = getField("Initial allocation");
  metadata.initialAllocation = parseBalances(alloc);

  const curr = getField("Current balance");
  metadata.currentBalance = parseBalances(curr);

  //
  // ---- TRANSACTIONS PARSING ----
  //

  const ix = md.indexOf("## Transactions");

  const txSections = md.slice(ix)
    .replace("## Transactions", "")
    .split(/^---$/m)
    .map((s) => s.trim())
    .filter((s) => s.includes("| ID"));

  for (const section of txSections) {
    const lines = section.split("\n");

    // Extract the first part (the table)
    const tableEndIndex = lines.findIndex((l) => !l.startsWith("|") && l.trim() !== "");
    const tableLines = tableEndIndex !== -1 ? lines.slice(0, tableEndIndex) : lines;
    const descLines = tableEndIndex !== -1 ? lines.slice(tableEndIndex).join("\n").trim() : "";

    const block = tableLines.join("\n");

    const idMatch = block.match(/\| ID\s*\|\s*\[`?([a-f0-9]+)`?\]\[\]/);
    const typeMatch = block.match(/\| Type\s*\|\s*`?([^\|]+?)`?\s*\|/);
    const deltaMatch = block.match(/\| Delta amount\s*\|\s*([^\|]+)\|/);
    const agreementMatch = block.match(/\| Agreement\?\s*\|\s*([^\|]+)\|/);

    const id = idMatch ? idMatch[1] : null;

    const type =
      typeMatch && typeMatch[1].trim() !== "N/A"
        ? typeMatch[1].trim().replace(/`/g, "")
        : null;

    let agreement =
      agreementMatch && agreementMatch[1].trim() !== "N/A"
        ? agreementMatch[1].trim()
        : null;

    if (agreement != null) {
      const title = agreement.match(/\[([^\]]*)\]/)[1];
      const handle = agreement.match(/\[[^\]]*\]\[([^\]]*)\]/)[1];
      const href = md.slice(md.lastIndexOf(handle)).match(/:\s*(.*)\n/)[1];
      agreement = { title, href }
    }

    const balance = parseBalances(deltaMatch ? deltaMatch[1] : "");

    const description = descLines.trim() || null;

    transactions.push({ id, type, agreement, balance, description });
  }

  return { metadata, transactions };
}

/**
 * Parse a balance cell like "`₳300,000`" or "`₳168,757.99407`<br/>`$101,041.173`"
 * or "+25,780.315769 USDM, +2.306 ADA"
 */
function parseBalances(raw) {
  if (!raw) return [];
  const cleaned = raw
    .replace(/<br\/?>/gi, ", ")
    .replace(/`/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const parts = cleaned.split(", ").map((s) => s.trim()).filter(Boolean);

  return parts.map((p) => {
    // extract numeric value and unit
    const match = p.match(/([+\-]?\s*[₳$]?[0-9.,]+)\s*([A-Z@a-z]*)/);
    if (!match) return { value: p, unit: null };
    let [_, value, unit] = match;
    unit = unit ? unit.trim() : null;
    value = value.trim().replace(/-\s*/, "-").replace(/\+\s*/, "");

    if (value.startsWith("₳") || value.startsWith("$")) {
      unit = TICKERS[value[0]] ?? null;
      value = value.slice(1);
    }

    if (value.startsWith("-₳") || value.startsWith("-$")) {
      unit = TICKERS[value[1]] ?? null;
      value = `-${value.slice(2)}`;
    }


    return { value, unit };
  });
}

async function fetchCurrentBalance(address) {
  const options = {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
  };

  let addressInfo = await fetch(
    "https://api.koios.rest/api/v1/address_info",
    {
      ...options,
      body: JSON.stringify({ _addresses: [address] }),
    }
  );

  let addressAssets = await fetch(
    "https://api.koios.rest/api/v1/address_assets",
    {
      ...options,
      body: JSON.stringify({ _addresses: [address] }),
    }
  );

  const formatValue = n => new Intl.NumberFormat("us-US", { style: "currency", currency: "EUR" })
    .format(Math.floor(Number.parseInt(n, 10) / 1e6))
    .slice(1, -3);

  if (addressInfo.ok && addressAssets.ok) {
    addressInfo = await addressInfo.json();

    return (await addressAssets.json()).reduce((assets, item) => {
      if (item.policy_id === 'c48cbb3d5e57ed56e276bc45f99ab39abe94e6cd7ac39fb402da47ad') {
        assets.push({ value: formatValue(item.quantity), unit: 'USDM' });
        return assets;
      }

      if (item.asset_name.startsWith("000de140")) {
        assets.push({
          value: item.quantity,
          unit: Buffer.from(item.asset_name.slice(8), 'hex').toString()
        });
        return assets;
      }

      assets.push({ value: item.quantity, unit: item.asset_name });

      return assets;
    }, [{ value: formatValue(addressInfo[0]?.balance ?? 0), unit: 'ADA' }]);
  }

  return null
}

// ---- CLI ENTRY POINT ----
const file = process.argv[2];
if (!file) {
  console.error("Usage: parse-journal.js <FILEPATH>");
  process.exit(1);
}

const md = fs.readFileSync(file, "utf-8");
const result = parseLedger(md);

const currentBalance = await fetchCurrentBalance(result.metadata.treasuryAddress);
if (currentBalance != null) {
  result.metadata.currentBalance = currentBalance[0].value === "0"
    ? result.metadata.initialAllocation
    : currentBalance;
}

console.log(JSON.stringify(result, null, 2));
