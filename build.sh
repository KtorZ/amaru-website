#!/usr/bin/env bash
git clone --depth 1 https://github.com/pragma-org/amaru.git
mv amaru/engineering-decision-records/* src/content/edrs
yarn build
