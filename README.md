# Node with Typescript - Socket Server - TS-node - Tickets app (Waiting Queue)

This project integrate Websockets with REST API for update tickets queue using WS after creation of a ticket with a POST request.

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

## Dependencies

[WS](https://www.npmjs.com/package/ws): This is a simple to use, blazing fast, and thoroughly tested WebSocket client and server implementation.
