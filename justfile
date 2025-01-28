

build:
  npm run build
  chmod +x dist/app.js

test-profile: build
    ./dist/app.js profile --npub npub1a3jz7w9laar2k77dkkh2rhxunr9zpja5emrl5yrxetamt29swqyqmmt32y
