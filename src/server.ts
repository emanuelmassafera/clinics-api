import { DatabaseHelper } from './infra/database/helpers/database-helper';
import app from './main/config/app';
import env from './main/config/env';

const dentalClinicsRepositoryPath = new URL('../assets/dental-clinics.json', import.meta.url);
const vetClinicsRepositoryPath = new URL('../assets/vet-clinics.json', import.meta.url);

DatabaseHelper.connect(dentalClinicsRepositoryPath, vetClinicsRepositoryPath).then(() => {
  app.listen({ port: env.PORT }).then(() => {
    console.log(`HTTP Server running at ${env.PORT}`);
  });
});

['unhandledRejection', 'uncaughtException'].forEach(
  (event) => process.on(event, (e: any) => {
    console.error(`${event}:`, e.message || event);
  }),
);

['SIGINT', 'SIGTERM'].forEach(
  (event) => process.on(event, async () => {
    console.log('Closing HTTP Server');
    await app.close();
    process.exit(0);
  }),
);
