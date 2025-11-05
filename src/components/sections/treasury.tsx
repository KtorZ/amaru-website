'use client';

import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { ChevronDown, Component, Coins, Calculator, MapPinCheckInside, UserRoundPen, Link2 } from 'lucide-react';
import { Meteors } from '@/components/magicui/meteors';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SITE_METADATA } from '@/consts';


type Category =
  | 'Consensus'
  | 'Ledger'
  | 'Marketing'
  | 'Mercenaries'
  | 'Contingency';

const categories: Category[] = [
  'Consensus',
  'Ledger',
  'Marketing',
  'Mercenaries',
  'Contingency',
];

function showBalance(assets, separator = " ") {
  return assets.flatMap(({ value, unit }) => {
    if (unit === "ADA") {
      return value.startsWith("-") ? [`-₳${value.slice(1)}`] : [`+₳${value}`];
    } else if (unit === "USDM") {
      return value.startsWith("-") ? [`-$${value.slice(1)}`] : [`+$${value}`];
    } else {
      return [];
    }
  }).join(separator);
}

export function Treasury({ treasury }) {
  const [activeTab, setActiveTab] = useState<Category>(categories[0]);

  return (
    <section className="">
      <div className="container divide-y">
        <div className="border-x border-[#30e2a3] bg-[url(/images/landing/treasury.webp)] bg-cover bg-top bg-no-repeat pb-50">
          <h1 className="bordered-div-padding font-weight-display text-2xl leading-snug tracking-tighter md:text-3xl lg:text-5xl drop-shadow-lg">
            Treasury
          </h1>
        </div>

          <section className="">
            <div className="grid grid-cols-1 divide-y border-x border-b border-[#30e2a3] md:grid-cols-2 md:divide-x md:divide-y-0">
              <div className="bordered-div-padding space-y-8 border-[#30e2a3]">
                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
                    <Component className="size-5" />
                    Scopes
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                    Amaru's treasury for 2025 is divided in <span className="text-foreground">4 treasury buckets</span>,
                    each covering a different scope of work. Each scope has a
                    dedicated owner whose role is to oversee the expenditure of
                    the budget in that work area.
                  </p>
                  <ul className="text-muted-foreground text-sm leading-relaxed md:text-base">
                    <li>
                      <h4 className="text-foreground">Consensus</h4>
                      <p className="pl-4">Covers implementation of the Ouroboros family of blockchain consensus protocols, as well as work done around deterministic simulations thereof.</p>
                    </li>
                    <li>
                      <h4 className="text-foreground">Ledger</h4>
                      <p className="pl-4">Transition rules and state management pertaining to Cardano, including the execution of smart contracts (i.e. Plutus Virtual Machine).</p>
                    </li>
                    <li>
                      <h4 className="text-foreground">Mercenaries</h4>
                      <p className="pl-4">Adhoc missions and short workstream necessary to the support of Amaru's core activities.</p>
                    </li>
                    <li>
                      <h4 className="text-foreground">Marketing</h4>
                      <p className="pl-4">Promotions, socials and coordinating events related to Amaru, such as the <i>Node Diversity workshops</i>.</p>
                    </li>
                  </ul>
                  <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                    An additional special sub-treasury is reserved for <span className="text-foreground">contingency</span>, and is collectively overseen by all scopes owners.
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                    Off-chain, a series of agreements provides a legal framework to remunerate contributors according to
                    agreed-upon missions and deliveries. These <i>Remunerated Contributor Agreements</i> are tied together by <a className="text-secondary" target="_blank" href="https://ipfs.io/ipfs/bafkreiabxyva5lfm6zztg7tnktxvvbbucljrce7hlrp4p6hropqzfaip3y">PRAGMA's Maintainer Committee Framework</a>.
                  </p>
                </div>
              </div>

              <div className="bordered-div-padding relative space-y-8">
                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
                    <Link2 className="size-5" />
                    On-chain Process
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                    The Amaru maintainer committee ensures direct administration of
                    its budget, assisted with an <span className="text-foreground">on-chain smart contract</span>.
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                    The smart contract's role is to ensure that the
                    expenditure of funds is <span className="text-foreground">done in accordance with the scope</span> defined
                    in this budget and <span className="text-foreground">authorized by the relevant scope owners</span>. We
                    recognize the following capabilities of this contract:
                  </p>
                  <ul className="text-muted-foreground text-sm leading-relaxed md:text-base">
                    <li>
                      <h4 className="text-foreground">Standard withdrawal</h4>
                      <p className="pl-4">A scope owner initiates money withdrawal from their treasury, with another scope owner approval.</p>
                    </li>
                    <li>
                      <h4 className="text-foreground">Contingency withdrawal</h4>
                      <p className="pl-4">A scope owner asks all other scope owners to withdraw an amount from the contingency funds.</p>
                    </li>
                    <li>
                      <h4 className="text-foreground">Scope reconciliation</h4>
                     <p className="pl-4">A scope owner asks other scope owners for a change of ownership (or a reallocation of budget).</p>
                    </li>
                    <li>
                      <h4 className="text-foreground">Contingency refund/closing/failsafe</h4>
                     <p className="pl-4">Any leftovers from scopes or from the contingency budget can be sent back to the Cardano treasury after an ageed-upon delay.</p>
                    </li>
                    <li>
                      <h4 className="text-foreground">Credential rotation</h4>
                      <p className="pl-4">In case of lost credentials or the departure of a scope owner, a mechanism allows the rotation of credentials to a new scope owner upon approval by all (5 out of 5) PRAGMA members.</p>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </section>

          <div className="mt-6 block md:hidden">
            <Select
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as Category)}
            >
              <SelectTrigger className="w-full">
                <SelectValue>{activeTab}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        <div className="bordered-div-padding relative hidden border-x border-[#30d0b1] md:block">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as Category)}
            className=""
          >
            <TabsList className="flex gap-3">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <section className="">
          <div className="grid grid-cols-1 border border-t-0 border-x border-[#30d0b1] md:grid-cols-3">
            <div className="bordered-div-padding relative md:border-e border-[#30bcc2]">
              <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
                <UserRoundPen className="size-5" /> Scope's owner
              </h2>
              <h3 className="text-foreground font-weight-display leading-snug md:text-xl pt-2">
                {treasury[activeTab].metadata.maintainer}
              </h3>
            </div>

            <div className="bordered-div-padding relative md:border-e border-[#30bcc2]">
              <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
                <Coins className="size-5" /> Initial Allocation
              </h2>
              <h3 className="text-foreground font-weight-display leading-snug md:text-xl pt-2">
                {showBalance(treasury[activeTab].metadata.initialAllocation)}
              </h3>
            </div>

            <div className="bordered-div-padding relative border-[#30bcc2]">
              <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
                <Calculator className="size-5" /> Current Balance
              </h2>
              <h3 className="text-foreground font-weight-display leading-snug md:text-xl pt-2">
                {showBalance(treasury[activeTab].metadata.currentBalance)}
              </h3>
            </div>
          </div>
          <div className="bordered-div-padding relative border-x border-b border-[#30bcc2]">
            <h2 className="text-muted-foreground flex items-center gap-2 text-sm leading-snug font-medium md:text-base">
              <MapPinCheckInside className="size-5" /> Treasury's address
            </h2>
            <h3 className="text-foreground font-weight-display leading-snug md:text-xl pt-2">
              <a href={`https://explorer.cardano.org/address/${treasury[activeTab].metadata.treasuryAddress}`} target="_blank">{treasury[activeTab].metadata.treasuryAddress}</a>
            </h3>
          </div>
        </section>

        <div className="border-x border-[#30bcc2]">
          <Accordion type="single" collapsible>
            {treasury[activeTab].transactions.map((tx, index) =>
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b-[#30bcc2]"
                >
                  <AccordionTrigger className="bordered-div-padding flex w-full items-center justify-between !pb-4 text-base hover:no-underline md:!pb-6 [&>svg]:hidden [&[data-state=open]_svg]:rotate-180">
                    <span>{(tx.id ?? "").slice(0, 64)}</span>
                    <span>{showBalance(tx.balance)}</span>
                    <div className="bg-card flex size-8 items-center justify-center rounded-sm border margin-auto">
                      <ChevronDown className="size-5 shrink-0 tracking-tight transition-transform duration-200" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground bordered-div-padding max-w-2xl !pt-0 leading-relaxed tracking-tight">
                    <ReactMarkdown>{tx.description}</ReactMarkdown>
                    <br/>
                    {!tx.agreement ? "" : (<a className="text-secondary text-right" target="_blank" href={tx.agreement.href}>Contributor agreement: {tx.agreement.title}</a>)}
                  </AccordionContent>
                </AccordionItem>
            )}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
