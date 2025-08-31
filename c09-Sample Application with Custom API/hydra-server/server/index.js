import 'dotenv/config';
import ServerModule from './common/Server';
import routes from './routes';

// Handle potential Babel default export
const Server = ServerModule.default || ServerModule;

new Server()
  .router(routes)
  .listen(process.env.PORT);
