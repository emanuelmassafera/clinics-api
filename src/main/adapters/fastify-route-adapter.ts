import { FastifyReply, FastifyRequest } from 'fastify';
import { Http } from '../../presentation/protocols/http';

export default (controller: Http.Controller) => async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const httpResponse = await controller.handle(request);

  reply.status(httpResponse.statusCode).send(httpResponse.body);
};
