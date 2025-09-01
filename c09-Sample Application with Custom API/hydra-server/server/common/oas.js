import Express from 'express';
import * as path from 'path';
import errorHandler from '../api/middlewares/error.handler';
import { OpenApiValidator } from 'express-openapi-validator';
import env from './env';


export default function oas(app, routes) {
  const apiSpec = path.join(__dirname, 'openapi.yml');
  const validateResponses = (() => {
    const raw = env('OPENAPI_ENABLE_RESPONSE_VALIDATION', 'false');
    return ['true', '1', 'yes', 'on'].includes(String(raw).toLowerCase());
  })();
  const openApiSpec = env('OPENAPI_SPEC', '/api/v1/spec');
  
  return new OpenApiValidator({
    apiSpec,
    validateResponses,
  })
    .install(app)
    .then(() => {
      app.use(openApiSpec, Express.static(apiSpec));
      routes(app);
      app.use(errorHandler);
    });
}
