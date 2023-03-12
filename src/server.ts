import { DatabaseHelper } from './infra/database/helpers/database-helper';
import createServer from './main/config/app';
import env from './main/config/env';

const dentalClinicsRepositoryPath = new URL('../assets/dental-clinics.json', import.meta.url);
const vetClinicsRepositoryPath = new URL('../assets/vet-clinics.json', import.meta.url);

const main = async (): Promise<void> => {
  await DatabaseHelper.connect(dentalClinicsRepositoryPath, vetClinicsRepositoryPath);

  const server = await createServer();
  server.listen({ port: env.PORT }, () => console.log(`HTTP Server running at ${env.PORT}`));

  ['unhandledRejection', 'uncaughtException'].forEach(
    (event) => process.on(event, (e: any) => {
      console.error(`${event}:`, e.message || event);
    }),
  );

  ['SIGINT', 'SIGTERM'].forEach(
    (event) => process.on(event, async () => {
      console.log('Closing HTTP Server');
      server.close()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
    }),
  );
};

main();
