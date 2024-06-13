import { createServer } from 'http';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { WssService } from './presentation/services/wss.service';


(async () => {
  main();
})();


function main() {

  const server = new Server({
    port: envs.PORT
  });

  const httpServer = createServer(server.app);
  WssService.initWss({ server: httpServer });

  // after initialization of wss service we can set routes to work with it and api rest routes
  server.setRoutes(AppRoutes.routes)

  httpServer.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT}`);
  });
}