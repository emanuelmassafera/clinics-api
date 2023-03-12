import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import fastifySwagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import fastifySwaggerUi, { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

const swaggerPlugin: FastifyPluginAsync = async (app) => {
  const openApiOptions: FastifyDynamicSwaggerOptions = {
    openapi: {
      info: {
        title: 'Clinics API',
        description: 'RESTful API that allows searching across multiple clinic providers',
        version: '1.0.0',
      },
      tags: [{
        name: 'Clinics',
        description: 'Endpoints related to clinics',
      }],
    },
    hideUntagged: true,
  };

  await app.register(fastifySwagger, openApiOptions);

  const openApiUiOptions: FastifySwaggerUiOptions = {
    routePrefix: '/api-docs',
  };

  await app.register(fastifySwaggerUi, openApiUiOptions);
};

export default fp(swaggerPlugin);
