import articlesRouter from './api/controllers/articles/router';
import userRouter from './api/controllers/user/router';
import path from 'path';
import express from 'express';
import fs from 'fs';

export default function routes(app) {
  // API routes
  app.use('/api/v1/articles', articlesRouter);
  app.use('/api/v1/user', userRouter);

  // Serve the API spec with debug logs
  app.get('/api/v1/spec', (req, res) => {
    const filePath = path.join(process.cwd(), 'server', 'common', 'api.yml');
    console.log(`[DEBUG] Request for /api/v1/spec`);
    console.log(`[DEBUG] Trying to read: ${filePath}`);

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`[ERROR] Failed to read API spec: ${err.message}`);
        res.status(500).json({
          error: 'Unable to read API spec',
          details: err.message,
          attemptedPath: filePath,
        });
      } else {
        console.log(`[DEBUG] Successfully read API spec (${data.length} bytes)`);
        res.type('yaml').send(data);
      }
    });
  });

  // Swagger UI docs (serving from /public/api-explorer)
  app.use(
    '/api-explorer',
    express.static(path.join(process.cwd(), 'public', 'api-explorer'))
  );
}
