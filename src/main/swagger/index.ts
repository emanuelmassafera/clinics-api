import { OpenAPIV3 } from 'openapi-types';
import paths from './paths';

const document: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'Clinics API',
    description: 'RESTful API that allows searching across multiple clinic providers',
    version: '1.0.0',
    contact: {
      name: 'Emanuel Massafera',
      email: 'emanuel301@live.com',
      url: 'https://www.linkedin.com/in/emanuelmassafera/',
    },
  },
  tags: [
    { name: 'Clinics', description: 'Endpoints related to clinics' },
  ],
  paths,
};

export default document;
