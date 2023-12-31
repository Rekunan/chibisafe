import type { FastifyReply } from 'fastify';
import type { RequestWithUser } from '@/structures/interfaces';

import { cachedStats, getStats } from '@/utils/StatsGenerator';

export const options = {
	url: '/admin/service/statistics/:force?',
	method: 'get',
	middlewares: ['auth', 'admin']
};

export const run = async (req: RequestWithUser, res: FastifyReply) => {
	// Generate all stats categories, without forcing any
	// In practice, this will only generate "system" and "service" categories on-demand,
	// because the others would have been generated by scheduler
	// Consult StatsCategory.ts route for per-category on-demand refresh
	const { force } = req.params as { force?: string };
	await getStats(['system', 'service', 'fileSystems', 'uploads', 'users', 'albums'], Boolean(force));

	const stats = Object.keys(cachedStats).map(name => ({
		[name]: {
			...cachedStats[name]?.cache,
			meta: {
				generatedOn: cachedStats[name]?.generatedOn
			}
		}
	}));

	return res.send({ statistics: stats });
};
