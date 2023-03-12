import { OpenAPIV3 } from 'openapi-types';
import badRequest from '../components/bad-request';
import serverError from '../components/server-error';

const clinicsPath: OpenAPIV3.PathItemObject = {
  get: {
    tags: ['Clinics'],
    summary: 'Search clinics',
    description: 'This route can be performed by any user',
    parameters: [
      {
        in: 'query',
        name: 'category',
        description: 'Clinic category: DENTAL or VET',
        required: true,
        schema: {
          type: 'string',
        },
      },
      {
        in: 'query',
        name: 'name',
        description: 'Clinic name',
        required: false,
        schema: {
          type: 'string',
        },
      },
      {
        in: 'query',
        name: 'state',
        description: 'Clinic state',
        required: false,
        schema: {
          type: 'string',
        },
      },
      {
        in: 'query',
        name: 'availabilityFrom',
        description: 'Availability from: HH:MM',
        required: false,
        schema: {
          type: 'string',
        },
      },
      {
        in: 'query',
        name: 'availabilityTo',
        description: 'Availability to: HH:MM',
        required: false,
        schema: {
          type: 'string',
        },
      },
      {
        in: 'query',
        name: 'page',
        description: 'The number of the page',
        required: false,
        schema: {
          type: 'number',
        },
      },
      {
        in: 'query',
        name: 'limit',
        description: 'The number of results that will be returned',
        required: false,
        schema: {
          type: 'number',
        },
      },
    ],
    responses: {
      200: {
        description: 'Ok',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                elements: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                      },
                      state: {
                        type: 'string',
                      },
                      availability: {
                        type: 'object',
                        properties: {
                          from: {
                            type: 'string',
                          },
                          to: {
                            type: 'string',
                          },
                        },
                        required: ['from', 'to'],
                      },
                    },
                    required: ['name', 'state', 'availability'],
                  },
                },
                totalElements: {
                  type: 'number',
                },
                totalPages: {
                  type: 'number',
                },
                currentPage: {
                  type: 'number',
                },
              },
              required: ['elements', 'totalElements', 'totalPages', 'currentPage'],
            },
          },
        },
      },
      400: badRequest,
      500: serverError,
    },
  },
};

export default clinicsPath;
