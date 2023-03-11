import { faker } from '@faker-js/faker';
import { Clinic } from '../../../src/domain/models/clinic';

export const mockClinicModel = (): Clinic.Model => ({
  name: faker.company.name(),
  state: faker.address.state(),
  availability: {
    from: faker.random.word(),
    to: faker.random.word(),
  },
});

export const mockClinicModels = (): Clinic.Model[] => [
  mockClinicModel(),
  mockClinicModel(),
];
