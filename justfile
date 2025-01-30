

local-build:
  pnpm run build
  chmod +x bin/app.js

test-version: local-build
  ./bin/app.js --version

test-help: local-build
  ./bin/app.js --help

test-profile: local-build
  ./bin/app.js profile --npub npub1a3jz7w9laar2k77dkkh2rhxunr9zpja5emrl5yrxetamt29swqyqmmt32y --output

test-keys: local-build
   ./bin/app.js keys --output

