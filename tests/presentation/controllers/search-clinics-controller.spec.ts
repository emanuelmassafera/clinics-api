import { faker } from '@faker-js/faker';
import {
  describe, it, expect, vi,
} from 'vitest';
import { Clinic } from '../../../src/domain/models/clinic';
import { SearchClinicsController } from '../../../src/presentation/controllers/search-clinics-controller';
import { HttpError } from '../../../src/presentation/errors/http-errors';
import throwError from '../../utils/throw-error';
import ValidationSpy from '../../validation/mocks/validation-mock';
import SearchClinicsSpy from '../mocks/mock-clinic';

const mockRequest = (): SearchClinicsController.Request => ({
  category: faker.helpers.arrayElement([Clinic.Category.Dental, Clinic.Category.Vet]),
  name: faker.company.name(),
  availability: {
    from: faker.random.word(),
    to: faker.random.word(),
  },
  state: faker.address.state(),
});

type SutTypes = {
  sut: SearchClinicsController
  validationSpy: ValidationSpy
  searchClinicsSpy: SearchClinicsSpy
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const searchClinicsSpy = new SearchClinicsSpy();
  const sut = new SearchClinicsController(validationSpy, searchClinicsSpy);

  return {
    sut,
    validationSpy,
    searchClinicsSpy,
  };
};

describe('SearchClinicsController', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(validationSpy.input).toEqual(request);
  });

  it('Should return BadRequest if validation return invalid params', async () => {
    const { sut, validationSpy } = makeSut();
    vi.spyOn(validationSpy, 'validate').mockResolvedValueOnce({
      param: 'error',
    });
    const result = await sut.handle(mockRequest());
    expect(result).toBeInstanceOf(HttpError.BadRequest);
  });

  it('Should return ServerError if validation throws', async () => {
    const { sut, validationSpy } = makeSut();
    vi.spyOn(validationSpy, 'validate').mockImplementationOnce(
      () => {
        throw new Error();
      },
    );
    const result = await sut.handle(mockRequest());
    expect(result).toBeInstanceOf(HttpError.Server);
  });

  it('Should call SearchClinics with correct values', async () => {
    const { sut, searchClinicsSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(searchClinicsSpy.params).toEqual(request);
  });

  it('Should return ServerError if SearchClinics throws', async () => {
    const { sut, searchClinicsSpy } = makeSut();
    vi.spyOn(searchClinicsSpy, 'search').mockImplementationOnce(throwError);
    const result = await sut.handle(mockRequest());
    expect(result).toBeInstanceOf(HttpError.Server);
  });

  it('Should return ok if request is succeeded', async () => {
    const { sut, searchClinicsSpy } = makeSut();
    const result = await sut.handle(mockRequest());
    expect(result.body).toEqual(searchClinicsSpy.result);
    expect(result.statusCode).toEqual(200);
  });
});
