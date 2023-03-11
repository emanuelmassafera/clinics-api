import fastify from 'fastify';

const app = fastify();

app.get('/', async () => ({ hello: 'world' }));

export default app;
