import { OpenAPIV3 } from 'openapi-types';

const badRequest: OpenAPIV3.ResponseObject = {
  description: 'Bad Request',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          statusCode: {
            type: 'number',
          },
        },
      },
      example: {
        name: 'BadRequest',
        message: 'Invalid request params',
        badParams: {
          param: 'string',
        },
      },
    },
  },
};

export default badRequest;
