import { FastifyReply, FastifyRequest } from 'fastify';
import { Http } from '../../presentation/protocols/http';

const adaptRoute = (controller: Http.Controller) => async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const httpResponse = await controller.handle({
    ...(request.body || {}),
    ...(request.params || {}),
    ...(request.query || {}),
  });

  reply.status(httpResponse.statusCode).send(httpResponse.body);
};

export default adaptRoute;
