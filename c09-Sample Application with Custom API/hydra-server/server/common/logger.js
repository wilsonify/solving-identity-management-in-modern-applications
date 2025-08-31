import pino from 'pino';
import env from './env';

const l = pino({
  name: env('APP_ID','hydra-server'),
  level: env('LOG_LEVEL','debug'),
});

export default l;
