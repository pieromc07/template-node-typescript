import { config } from 'dotenv';
config();
import express from 'express';

import { Server } from './api/server';

import { createServer, Server as HttpServer } from 'http';
import { env } from './config/globals';
import { logger } from './config/logger';

(async () => {
	try {
		// Init express server
		const app: express.Application = new Server().app;
		const server: HttpServer = createServer(app);

		// Start express server
		server.listen(env.APP_PORT);

		server.on('listening', () => {
			logger.info(`node server is listening on ${env.APP_DOMAIN}:${env.APP_PORT} in ${env.APP_ENV} mode`);
		});

		server.on('close', () => {
			logger.info('node server closed');
		});
	} catch (err: any) {
		logger.error(err.stack);
	}
})();
