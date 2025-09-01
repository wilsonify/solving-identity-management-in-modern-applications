import Express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import cookieParser from 'cookie-parser';

import l from './logger';
import env from './env';
import corsMiddleware from '../api/middlewares/cors.middleware';
import errorHandler from '../api/middlewares/error.handler';

export default class Server {
  constructor() {
    this.app = Express();
    const root = path.normalize(`${__dirname}/../..`);
    this.app.set('appPath', `${root}/client`);
    this.app.use(bodyParser.json({ limit: env('REQUEST_LIMIT', '100kb') }));
    this.app.use(bodyParser.urlencoded({ extended: true, limit: env('REQUEST_LIMIT', '100kb') }));
    this.app.use(bodyParser.text({ limit: env('REQUEST_LIMIT', '100kb') }));
    this.app.use(cookieParser(env('SESSION_SECRET')));
    this.app.use(Express.static(`${root}/public`));
    this.routes = null;
    this.server = null; // hold HTTP server instance if started
  }

  router(routes) {
    this.routes = routes;
    return this; // keep chainable API
  }

  listen(port = env('PORT', '3000'), startServer = true) {
    if (!this.routes) {
      throw new Error('No routes provided');
    }

    // Apply middleware and routes
    this.app.use(corsMiddleware);
    this.routes(this.app);
    this.app.use(errorHandler);

    if (startServer) {
      this.server = http.createServer(this.app).listen(port, () => {
        l.info(`up and running in ${env('NODE_ENV', 'development')} @: ${os.hostname()} on port: ${port}`);
      });
    }

    return this.app; // return Express app for tests
  }
}
