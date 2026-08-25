import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import babel from 'vite-plugin-babel';
import { resolve, extname } from 'path';
import type { IncomingMessage, ServerResponse } from 'http';

type VercelLikeResponse = ServerResponse & {
  status: (code: number) => VercelLikeResponse;
  json: (body: unknown) => void;
  send: (body: string) => void;
};

function createVercelResponse(res: ServerResponse): VercelLikeResponse {
  const vercelRes = res as VercelLikeResponse;

  vercelRes.status = (code: number) => {
    res.statusCode = code;
    return vercelRes;
  };

  vercelRes.json = (body: unknown) => {
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(body));
    }
  };

  vercelRes.send = (body: string) => {
    if (!res.headersSent) {
      res.end(body);
    }
  };

  return vercelRes;
}

function readRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolveBody, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });
    req.on('end', () => resolveBody(Buffer.concat(chunks).toString('utf-8')));
    req.on('error', reject);
  });
}

function vercelApiDevPlugin(): Plugin {
  let devServer: ViteDevServer;

  return {
    name: 'vercel-api-dev',
    enforce: 'pre',
    configureServer(server) {
      devServer = server;

      server.middlewares.use(async (req, res, next) => {
        const pathname = req.url?.split('?')[0];
        if (pathname !== '/api/chat') {
          return next();
        }

        try {
          const env = loadEnv('development', process.cwd(), '');
          if (env.GEMINI_API_KEY) {
            process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
          }

          if (req.method !== 'GET' && req.method !== 'HEAD') {
            const bodyText = await readRequestBody(req);
            if (bodyText) {
              (req as IncomingMessage & { body?: unknown }).body = JSON.parse(bodyText);
            }
          }

          const mod = await devServer.ssrLoadModule(resolve(process.cwd(), 'api/chat.ts'));
          const handler = mod.default as (
            req: IncomingMessage & { body?: unknown },
            res: VercelLikeResponse
          ) => Promise<void>;

          await handler(req, createVercelResponse(res));
        } catch (error) {
          console.error('[vercel-api-dev] /api/chat error:', error);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                error: 'Dev API error',
                details: error instanceof Error ? error.message : String(error),
              })
            );
          }
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [
    vercelApiDevPlugin(),
    babel({
      include: /\/src\/.*\.[jt]sx?$/,
      loader: (path) => (extname(path) === '.ts' ? 'ts' : 'tsx'),
      babelConfig: {
        babelrc: false,
        configFile: false,
        presets: [['@babel/preset-typescript', { isTSX: true, allExtensions: true }]],
        plugins: [
          [
            '@stylexjs/babel-plugin',
            {
              runtimeInjection: false,
              dev: process.env.NODE_ENV !== 'production',
              test: false,
              unstable_moduleResolution: {
                type: 'commonJS',
                rootDir: __dirname,
              },
            },
          ],
        ],
      },
    }),
    react(),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2020',
  },
  server: {
    port: 3000,
    open: true,
    host: true,
    allowedHosts: ['.loca.lt', '.ngrok.io', '.ngrok-free.app', '.ngrok-free.dev', '.trycloudflare.com'],
  },
  preview: {
    port: 3000,
  },
  ssr: {
    noExternal: ['@google/generative-ai'],
  },
});
