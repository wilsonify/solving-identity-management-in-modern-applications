import articlesRouter from './api/controllers/articles/router';
import userRouter from './api/controllers/user/router';
import path from 'path';
import express from 'express';

export default function routes(app) {
  // API routes
  app.use('/api/v1/articles', articlesRouter);
  app.use('/api/v1/user', userRouter);

  // Swagger UI docs (serving from /public/api-explorer)
  app.use(
    '/api-explorer',
    express.static(path.join(process.cwd(), 'public', 'api-explorer'))
  );
}
