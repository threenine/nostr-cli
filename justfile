

local-build:
  npm run build
  chmod +x dist/app.js

test-version: local-build
 ./dist/app.js --version

test-help: local-build
  ./dist/app.js --help

test-profile: local-build
    ./dist/app.js profile --npub npub1a3jz7w9laar2k77dkkh2rhxunr9zpja5emrl5yrxetamt29swqyqmmt32y --output

test-keys: local-build
     ./dist/app.js keys --output

