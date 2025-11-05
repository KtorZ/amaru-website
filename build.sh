#!/usr/bin/env bash

# Convert Github callouts syntax to MDX's Aside
callouts_to_aside() {
  awk '
  BEGIN {
    in_block = 0
  }

  # Detect start of a callout block
  /^> \[!([A-Z]+)\]/ {
    in_block = 1
    type = tolower(substr($2, 3, length($2) - 3))

    # remap types
    if (type == "important" || type == "warning") type = "caution"
    else if (type == "caution") type = "danger"

    print "<Aside type=\"" type "\">"
    next
  }

  # Lines inside a callout block
  in_block && /^>/ {
    line = substr($0, 3) # strip leading "> "
    print line
    next
  }

  # End of a callout block
  in_block && !/^>/ {
    print "</Aside>"
    in_block = 0
  }

  # Normal lines
  {
    print
  }

  END {
    if (in_block) print "</Aside>"
  }
  '
}

enable_html_blocks() {
  awk '
  # Match opening comment like <!--- <Steps> -->
  /^<!-- *<([A-Za-z]+[^>]*)> *-->$/ {
    tag = gensub(/^<!-- *<([A-Za-z]+[^>]*)> *-->$/, "\\1", "g")
    print "<" tag ">"
    next
  }

  # Match closing comment like <!--- </Steps> -->
  /^<!-- *<\/([A-Za-z]+[^>]*)> *-->$/ {
    tag = gensub(/^<!-- *<\/([A-Za-z]+[^>]*)> *-->$/, "\\1", "g")
    print "</" tag ">"
    next
  }

  # All other lines are printed unchanged
  { print }
  '
}

 git clone --depth 1 https://github.com/pragma-org/amaru.git

 mv amaru/engineering-decision-records/* src/content/edrs

# docs/PROFILING.md
cat 1>tmp.mdx <<EOF
---
title: Profiling
description: Heap memory profiling with HeapTrack
full: true
---
import { Aside, Badge, CardGrid, Code, Steps, Tabs, TabItem } from '@astrojs/starlight/components';

EOF
cat amaru/docs/PROFILING.md >> tmp.mdx
callouts_to_aside < tmp.mdx | enable_html_blocks > src/content/docs/docs/profiling.mdx

# Monitoring/README.md
cat 1>tmp.mdx <<EOF
---
title: Monitoring
description: Observability tips and reference for Amaru
full: true
---
import { Aside, Badge, CardGrid, Code, Steps, Tabs, TabItem } from '@astrojs/starlight/components';

EOF
cat amaru/monitoring/README.md >> tmp.mdx
callouts_to_aside < tmp.mdx | enable_html_blocks > src/content/docs/docs/monitoring.mdx

# Monitoring/jaeger.yml
cat 1>tmp.mdx <<EOF
---
title: Monitoring Stack (Jaeger)
description: An example of Observability stack using Jaeger & Prometheus
full: true
---
import { Aside, Badge, CardGrid, Code, Steps, Tabs, TabItem } from '@astrojs/starlight/components';

\`\`\`yaml title="docker-compose.yml"
EOF

cat amaru/monitoring/jaeger/docker-compose.yml >> tmp.mdx

cat 1>>tmp.mdx <<EOF
\`\`\`
EOF

cat amaru/monitoring/jaeger/README.md >> tmp.mdx

callouts_to_aside < tmp.mdx | enable_html_blocks > src/content/docs/docs/monitoring/jaeger.mdx

# Monitoring/grafana
cat 1>tmp.mdx <<EOF
---
title: Monitoring Stack (Grafana Tempo)
description: An example of Observability stack using Grafana Tempo & Prometheus
full: true
---
import { Aside, Badge, CardGrid, Code, Steps, Tabs, TabItem } from '@astrojs/starlight/components';

\`\`\`yaml title="docker-compose.yml"
EOF

cat amaru/monitoring/grafana-tempo/docker-compose.yml >> tmp.mdx

cat 1>>tmp.mdx <<EOF
\`\`\`
EOF

cat amaru/monitoring/grafana-tempo/README.md >> tmp.mdx

callouts_to_aside < tmp.mdx | enable_html_blocks > src/content/docs/docs/monitoring/grafana-tempo.mdx

# Fetch details about Amaru's treasury
git clone --depth 1 https://github.com/pragma-org/amaru-treasury.git

./parse-journal.mjs amaru-treasury/journal/consensus.md > src/data/consensus.json
./parse-journal.mjs amaru-treasury/journal/ledger.md > src/data/ledger.json
./parse-journal.mjs amaru-treasury/journal/marketing.md > src/data/marketing.json
./parse-journal.mjs amaru-treasury/journal/mercenaries.md > src/data/mercenaries.json
./parse-journal.mjs amaru-treasury/journal/contingency.md > src/data/contingency.json

# Finally, build the website
npm run build
