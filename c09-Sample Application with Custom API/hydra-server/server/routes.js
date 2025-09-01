import articlesRouter from './api/controllers/articles/router';
import userRouter from './api/controllers/user/router';
import path from 'path';
import express from 'express';
import fs from 'fs';
import fetch from 'node-fetch';
import env from './common/env';

export default function routes(app) {
  // --- Health / readiness / liveness probes ---
  // General health check (basic signal that server is up)
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Liveness probe (is the process alive? usually trivial)
  app.get('/liveness', (req, res) => {
    res.json({ status: 'alive', pid: process.pid });
  });



// Readiness probe
app.get('/readiness', async (req, res) => {
  try {
    // Check IDP service (Dex/Keycloak) is responding
    const idpUrl = env("OIDC_ISSUER",'http://dex:5556')
    const response = await fetch(idpUrl, { method: 'GET', timeout: 2000 });

    if (!response.ok) {
      throw new Error(`IDP service returned status ${response.status}`);
    }

    // All checks passed
    res.json({ status: 'ready', dependencies: { idp: 'ok' } });
  } catch (err) {
    console.error(`[READINESS] Dependency check failed: ${err.message}`);
    res.status(500).json({
      status: 'not ready',
      dependencies: { idp: 'down' },
      error: err.message,
    });
  }
});


  // --- API routes ---
  app.use('/api/v1/articles', articlesRouter);
  app.use('/api/v1/user', userRouter);

  // Serve the API spec with debug logs
  app.get('/api/v1/spec', (req, res) => {
    const filePath = path.join(process.cwd(), 'server', 'common', 'openapi.yml');
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
