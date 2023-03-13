import { faker } from '@faker-js/faker';
import {
  describe, it, expect, vi,
} from 'vitest';
import { Clinic } from '../../../src/domain/models/clinic';
import { SearchClinics } from '../../../src/domain/usecases/search-clinics';
import { SearchClinicsController } from '../../../src/presentation/controllers/search-clinics-controller';
import { HttpError } from '../../../src/presentation/errors/http-errors';
import throwError from '../../utils/throw-error';
import ValidationSpy from '../validations/mocks/validation-mock';
import SearchClinicsSpy from '../mocks/mock-clinic';

const mockRequest = (): SearchClinicsController.Request => ({
  category: faker.helpers.arrayElement([Clinic.Category.Dental, Clinic.Category.Vet]),
  name: faker.company.name(),
  state: faker.address.state(),
  availabilityFrom: faker.helpers.arrayElement(['08:00', '10:00', '12:00']),
  availabilityTo: faker.helpers.arrayElement(['18:00', '20:00', '22:00']),
  page: faker.datatype.number().toString(),
  limit: faker.datatype.number().toString(),
});

const mockSearchClinicsParams = (): SearchClinics.Params => ({
  category: faker.helpers.arrayElement([Clinic.Category.Dental, Clinic.Category.Vet]),
  name: faker.company.name(),
  availability: {
    from: faker.helpers.arrayElement(['08:00', '10:00', '12:00']),
    to: faker.helpers.arrayElement(['18:00', '20:00', '22:00']),
  },
  state: faker.address.state(),
  page: faker.datatype.number(),
  limit: faker.datatype.number(),
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
    vi.spyOn(validationSpy, 'validate').mockReturnValueOnce({
      formattedRequest: { param: 'error' },
      hasIssues: true,
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
    const { sut, searchClinicsSpy, validationSpy } = makeSut();
    const searchClinicsParams = mockSearchClinicsParams();
    vi.spyOn(validationSpy, 'validate').mockReturnValueOnce({
      formattedRequest: searchClinicsParams,
      hasIssues: false,
    });
    await sut.handle(mockRequest());
    expect(searchClinicsSpy.params).toEqual(searchClinicsParams);
  });

  it('Should return ServerError if SearchClinics throws', async () => {
    const { sut, searchClinicsSpy } = makeSut();
    vi.spyOn(searchClinicsSpy, 'search').mockImplementationOnce(throwError);
    const result = await sut.handle(mockRequest());
    expect(result).toBeInstanceOf(HttpError.Server);
  });

  it('Should return ok if request is succeeded', async () => {
    const { sut, searchClinicsSpy, validationSpy } = makeSut();
    vi.spyOn(validationSpy, 'validate').mockReturnValueOnce({
      formattedRequest: mockSearchClinicsParams(),
      hasIssues: false,
    });
    const result = await sut.handle(mockRequest());
    expect(result.body).toEqual(searchClinicsSpy.result);
    expect(result.statusCode).toEqual(200);
  });
});
