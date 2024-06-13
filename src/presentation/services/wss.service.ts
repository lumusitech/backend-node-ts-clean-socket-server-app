import type { Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';

interface Options {
  server: Server
  path?: string
}

// Singleton because we only need one instance of this service
export class WssService {

  private static _instance: WssService;
  private wss: WebSocketServer;

  private constructor(options: Options) {
    const { server, path = '/ws' } = options; // default path: ws://localhost:3000/ws

    this.wss = new WebSocketServer({ server, path });

    this.start();
  }

  static get instance(): WssService {
    if (!WssService._instance) {
      throw 'WssService not initialized';
    }
    return WssService._instance;
  }

  static initWss(options: Options) {
    if (WssService._instance) {
      throw 'WssService already initialized';
    }
    WssService._instance = new WssService(options);
  }

  public sendMessage(type: string, payload: Object) {
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) { }
      client.send(JSON.stringify({ type, payload }));
    })
  }

  public start() {
    this.wss.on("connection", (ws: WebSocket) => {
      console.log("Client connected");

      ws.on("close", () => {
        console.log("Client disconnected");
      })

    })
  }
}