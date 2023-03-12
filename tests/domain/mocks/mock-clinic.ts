import { faker } from '@faker-js/faker';
import { Clinic } from '../../../src/domain/models/clinic';

export const mockClinicModel = (): Clinic.Model => ({
  name: faker.company.name(),
  state: faker.address.state(),
  availability: {
    from: faker.helpers.arrayElement(['08:00', '10:00', '12:00']),
    to: faker.helpers.arrayElement(['18:00', '20:00', '22:00']),
  },
});

export const mockClinicModels = (): Clinic.Model[] => [
  mockClinicModel(),
  mockClinicModel(),
];
