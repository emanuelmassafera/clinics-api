import fastify from 'fastify';
import clinicsRoutes from '../routes/clinics';

const app = fastify();

app.register(clinicsRoutes);

export default app;
