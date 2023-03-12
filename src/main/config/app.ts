import fastify from 'fastify';
import swaggerPlugin from './swagger';
import clinicsRoutes from '../routes/clinics';

const app = fastify();

app.register(clinicsRoutes);

app.register(swaggerPlugin);

export default app;
