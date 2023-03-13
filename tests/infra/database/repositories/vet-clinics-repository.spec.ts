import {
  describe, beforeAll, it, expect,
} from 'vitest';
import { DatabaseHelper } from '../../../../src/infra/database/helpers/database-helper';
import VetClinicsRepository from '../../../../src/infra/database/repositories/vet-clinics-repository';
import testEnv from '../../../utils/test-env';

const makeSut = (): VetClinicsRepository => new VetClinicsRepository();

describe('VetClinicsRepository', () => {
  beforeAll(async () => {
    await DatabaseHelper.connect(
      testEnv.dentalClinicsRepositoryTestPath,
      testEnv.vetClinicsRepositoryTestPath,
    );
  });

  describe('searchClinics', () => {
    it('Should return List<Clinic.Model>', async () => {
      const sut = makeSut();
      const result = await sut.searchClinics({
        name: null,
        state: null,
        availability: null,
        limit: null,
        page: null,
      });

      expect(result.elements).toBeTruthy();
      expect(result.elements).toHaveLength(2);
      expect(result.totalElements).toBeTruthy();
      expect(result.totalElements).toBe(2);
      expect(result.totalPages).toBeTruthy();
      expect(result.totalPages).toBe(1);
      expect(result.currentPage).toBeTruthy();
      expect(result.currentPage).toBe(1);
    });

    it('Should return List<Clinic.Model> when passing pagination filters', async () => {
      const sut = makeSut();
      let result = await sut.searchClinics({
        name: null,
        state: null,
        availability: null,
        limit: 1,
        page: 1,
      });

      expect(result.elements).toHaveLength(1);
      expect(result.totalElements).toBe(1);
      expect(result.totalPages).toBe(2);
      expect(result.currentPage).toBe(1);

      result = await sut.searchClinics({
        name: null,
        state: null,
        availability: null,
        limit: 1,
        page: 2,
      });

      expect(result.elements).toHaveLength(1);
      expect(result.totalElements).toBe(1);
      expect(result.totalPages).toBe(2);
      expect(result.currentPage).toBe(2);

      result = await sut.searchClinics({
        name: null,
        state: null,
        availability: null,
        limit: 1,
        page: 3,
      });

      expect(result.elements).toHaveLength(0);
      expect(result.totalElements).toBe(0);
      expect(result.totalPages).toBe(2);
      expect(result.currentPage).toBe(3);
    });

    it('Should return List<Clinic.Model> when passing search filters', async () => {
      const sut = makeSut();
      let result = await sut.searchClinics({
        name: 'mock',
        state: null,
        availability: null,
        limit: null,
        page: null,
      });

      expect(result.elements).toHaveLength(0);
      expect(result.totalElements).toBe(0);
      expect(result.totalPages).toBe(1);
      expect(result.currentPage).toBe(1);

      result = await sut.searchClinics({
        name: null,
        state: 'mock',
        availability: null,
        limit: null,
        page: null,
      });

      expect(result.elements).toHaveLength(0);
      expect(result.totalElements).toBe(0);
      expect(result.totalPages).toBe(1);
      expect(result.currentPage).toBe(1);

      result = await sut.searchClinics({
        name: null,
        state: null,
        availability: {
          from: '00:00',
          to: '24:00',
        },
        limit: null,
        page: null,
      });

      expect(result.elements).toHaveLength(0);
      expect(result.totalElements).toBe(0);
      expect(result.totalPages).toBe(1);
      expect(result.currentPage).toBe(1);
    });
  });
});
