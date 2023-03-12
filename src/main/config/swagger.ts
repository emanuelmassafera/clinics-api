import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import fastifySwagger, { SwaggerOptions } from '@fastify/swagger';
import fastifySwaggerUi, { FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import swaggerConfig from '../swagger';

const swaggerPlugin: FastifyPluginAsync = async (app) => {
  const swaggerOptions: SwaggerOptions = {
    mode: 'static',
    specification: {
      document: swaggerConfig,
    },
  };

  await app.register(fastifySwagger, swaggerOptions);

  const swaggerUiOptions: FastifySwaggerUiOptions = {
    routePrefix: '/api-docs',
  };

  await app.register(fastifySwaggerUi, swaggerUiOptions);
};

export default fp(swaggerPlugin);
