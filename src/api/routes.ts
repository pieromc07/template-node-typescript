import { Request, Response, Router } from 'express';

/**
 * Init Express REST routes
 * @param {Router} router
 * @returns {void}
 */

export function initRestRoutes(router: Router): void {
	const prefix: string = '/api/v1';

	router.get(prefix, (_req: Request, res: Response) => res.send('PING'));
}
