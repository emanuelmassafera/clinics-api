import fastify, { FastifyInstance } from 'fastify';
import swaggerPlugin from './swagger';
import clinicsRoutes from '../routes/clinics';

const createServer = async (): Promise<FastifyInstance> => {
  const server = fastify();

  server.register(clinicsRoutes);

  server.register(swaggerPlugin);

  await server.ready();

  return server;
};

export default createServer;
