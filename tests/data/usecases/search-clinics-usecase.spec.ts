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
  searchDentalClinicsRepositorySpy: SearchClinicsRepositorySpy
  searchVetClinicsRepositorySpy: SearchClinicsRepositorySpy
};

const makeSut = (): SutTypes => {
  const searchDentalClinicsRepositorySpy = new SearchClinicsRepositorySpy();
  const searchVetClinicsRepositorySpy = new SearchClinicsRepositorySpy();
  const sut = new SearchClinicsUseCase(
    searchDentalClinicsRepositorySpy,
    searchVetClinicsRepositorySpy,
  );

  return {
    sut,
    searchDentalClinicsRepositorySpy,
    searchVetClinicsRepositorySpy,
  };
};

describe('SearchClinicsUseCase', () => {
  describe('When category is DENTAL', () => {
    it('Should call SearchDentalClinicsRepository with correct values', async () => {
      const { sut, searchDentalClinicsRepositorySpy } = makeSut();
      const params = mockSearchClinicsParams();
      params.category = Clinic.Category.Dental;
      await sut.search(params);
      expect(searchDentalClinicsRepositorySpy.params).toEqual({
        name: params.name,
        state: params.state,
        availability: params.availability,
      });
    });

    it('Should throw if SearchDentalClinicsRepository throws', async () => {
      const { sut, searchDentalClinicsRepositorySpy } = makeSut();
      vi.spyOn(searchDentalClinicsRepositorySpy, 'searchClinics').mockImplementationOnce(throwError);
      const params = mockSearchClinicsParams();
      params.category = Clinic.Category.Dental;
      const promise = sut.search(params);
      await expect(promise).rejects.toThrow();
    });

    it('Should return List<Clinic.Model> on success', async () => {
      const { sut, searchDentalClinicsRepositorySpy } = makeSut();
      const params = mockSearchClinicsParams();
      params.category = Clinic.Category.Dental;
      const result = await sut.search(params);
      expect(result).toEqual(searchDentalClinicsRepositorySpy.result);
    });
  });

  describe('When category is VET', () => {
    it('Should call SearchVetClinicsRepository with correct values', async () => {
      const { sut, searchVetClinicsRepositorySpy } = makeSut();
      const params = mockSearchClinicsParams();
      params.category = Clinic.Category.Vet;
      await sut.search(params);
      expect(searchVetClinicsRepositorySpy.params).toEqual({
        name: params.name,
        state: params.state,
        availability: params.availability,
      });
    });

    it('Should throw if SearchVetClinicsRepository throws', async () => {
      const { sut, searchVetClinicsRepositorySpy } = makeSut();
      vi.spyOn(searchVetClinicsRepositorySpy, 'searchClinics').mockImplementationOnce(throwError);
      const params = mockSearchClinicsParams();
      params.category = Clinic.Category.Vet;
      const promise = sut.search(params);
      await expect(promise).rejects.toThrow();
    });

    it('Should return List<Clinic.Model> on success', async () => {
      const { sut, searchVetClinicsRepositorySpy } = makeSut();
      const params = mockSearchClinicsParams();
      params.category = Clinic.Category.Vet;
      const result = await sut.search(params);
      expect(result).toEqual(searchVetClinicsRepositorySpy.result);
    });
  });
});
