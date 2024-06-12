# Node with Typescript - Socket Server - TS-node

after clone, run:

```sh
pnpm i
docker compose up -d
pnpm dev
```

## This project was created with this steps

1. Install TypeScript and more dependencies

   ```sh
   pnpm i -D typescript @types/node ts-node-dev rimraf
   ```

2. init TypeScript config file

   ```sh
   pnpm exec tsc --init --outDir dist/ --rootDir src
   ```

3. scripts for dev, build and start ([more info about TS-NODE here](https://www.npmjs.com/package/ts-node-dev))

   ```sh
     "dev": "tsnd --respawn --clear src/app.ts",
     "build": "rimraf ./dist && tsc",
     "start": "npm run build && node dist/app.js"
   ```
