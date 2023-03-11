import { faker } from '@faker-js/faker';
import {
  describe, it, expect, vi,
} from 'vitest';
import { Clinic } from '../../../src/domain/models/clinic';
import { SearchClinics } from '../../../src/domain/usecases/search-clinics';
import SearchClinicsUseCase from '../../../src/data/usecases/search-clinics-usecase';
import SearchClinicsRepositorySpy from '../mocks/mock-clinic';
import throwError from '../../utils/throw-error';

const mockSearchClinicsParams = (): SearchClinics.Params => ({
  category: faker.helpers.arrayElement([Clinic.Category.Dental, Clinic.Category.Vet]),
  name: faker.company.name(),
  availability: {
    from: faker.random.word(),
    to: faker.random.word(),
  },
  state: faker.address.state(),
});

type SutTypes = {
  sut: SearchClinicsUseCase
  searchClinicsRepositorySpy: SearchClinicsRepositorySpy
};

const makeSut = (): SutTypes => {
  const searchClinicsRepositorySpy = new SearchClinicsRepositorySpy();
  const sut = new SearchClinicsUseCase(searchClinicsRepositorySpy);

  return {
    sut,
    searchClinicsRepositorySpy,
  };
};

describe('SearchClinicsUseCase', () => {
  it('Should call SearchClinicsRepository with correct values', async () => {
    const { sut, searchClinicsRepositorySpy } = makeSut();
    const params = mockSearchClinicsParams();
    await sut.search(params);
    expect(searchClinicsRepositorySpy.params).toEqual(params);
  });

  it('Should throw if SearchClinicsRepository throws', async () => {
    const { sut, searchClinicsRepositorySpy } = makeSut();
    vi.spyOn(searchClinicsRepositorySpy, 'searchClinics').mockImplementationOnce(throwError);
    const promise = sut.search(mockSearchClinicsParams());
    await expect(promise).rejects.toThrow();
  });

  it('Should return List<Clinic.Model> on success', async () => {
    const { sut, searchClinicsRepositorySpy } = makeSut();
    const result = await sut.search(mockSearchClinicsParams());
    expect(result).toEqual(searchClinicsRepositorySpy.result);
  });
});
