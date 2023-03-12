import { DatabaseHelper } from './infra/database/helpers/database-helper';
import app from './main/config/app';
import env from './main/config/env';

const dentalClinicsRepositoryPath = new URL('../assets/dental-clinics.json', import.meta.url);
const vetClinicsRepositoryPath = new URL('../assets/vet-clinics.json', import.meta.url);

DatabaseHelper.connect(dentalClinicsRepositoryPath, vetClinicsRepositoryPath).then(() => {
  app.listen({ port: env.PORT }).then(() => {
    console.log(`Server running at ${env.PORT}`);
  });
});
