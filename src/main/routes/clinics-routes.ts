import { FastifyInstance } from 'fastify';

export default async (app: FastifyInstance) => {
  app.get('/', async () => ({ hello: 'world' }));
};