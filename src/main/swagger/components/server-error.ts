import { OpenAPIV3 } from 'openapi-types';

const serverError: OpenAPIV3.ResponseObject = {
  description: 'Server Error',
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
        name: 'ServerError',
        message: 'Internal server error',
      },
    },
  },
};

export default serverError;
