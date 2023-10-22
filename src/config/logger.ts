import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { createLogger, format, transports } from 'winston';
import { env } from './globals';

const log_dir = 'logs';

if (!existsSync(log_dir)) {
	mkdirSync(log_dir);
}

const errorLog = join(log_dir, 'error.log');
const combinedLog = join(log_dir, 'combined.log');
const exceptionsLog = join(log_dir, 'exceptions.log');

export const logger = createLogger({
	level: 'info',
	format: format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		format.printf((info: any) => `${info.timestamp} ${info.level}: ${info.message}`)
	),
	transports: [
		new transports.File({
			filename: errorLog,
			level: 'error'
		}),
		new transports.File({
			filename: combinedLog
		})
	],
	exceptionHandlers: [
		new transports.File({
			filename: exceptionsLog
		})
	]
});

if (env.APP_ENV !== 'production') {
	logger.add(
		new transports.Console({
			format: format.combine(
				format.colorize(),
				format.printf((info: any) => `${info.timestamp} ${info.level}: ${info.message}`)
			),
			level: 'debug'
		})
	);
}
