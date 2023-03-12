import fastify, { FastifyInstance } from 'fastify';
import swaggerPlugin from './swagger';
import clinicsRoutes from '../routes/clinics';

const createServer = async (): Promise<FastifyInstance> => {
  const server = fastify();

  server.register(swaggerPlugin);

  server.register(clinicsRoutes);

  await server.ready();

  return server;
};

export default createServer;
