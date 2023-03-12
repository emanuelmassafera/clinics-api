import { FastifyInstance } from 'fastify';
import adaptRoute from '../adapters/fastify-route-adapter';
import makeSearchClinicsController from '../factories/controllers/search-clinics-controller-factory';

export default async (app: FastifyInstance) => {
  app.get('/clinics', adaptRoute(makeSearchClinicsController()));
};
