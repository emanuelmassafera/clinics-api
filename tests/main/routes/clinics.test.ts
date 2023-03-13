import {
  describe, beforeAll, it, expect,
} from 'vitest';
import request from 'supertest';
import testEnv from '../../utils/test-env';
import { DatabaseHelper } from '../../../src/infra/database/helpers/database-helper';
import createServer from '../../../src/main/config/app';

describe('Clinics Routes', () => {
  beforeAll(async () => {
    await DatabaseHelper.connect(
      testEnv.dentalClinicsRepositoryTestPath,
      testEnv.vetClinicsRepositoryTestPath,
    );
  });

  describe('GET /clinics', () => {
    it('Should return 400 when fetching clinics using bad parameters', async () => {
      const app = await createServer();
      await request(app.server)
        .get('/clinics?category=WRONG_CAT')
        .expect(400);
    });

    it('Should return 200 when successfully fetching clinics', async () => {
      const app = await createServer();
      let response = await request(app.server)
        .get('/clinics?category=DENTAL');

      expect(response.statusCode).toEqual(200);
      expect(response.body.elements).toBeTruthy();
      expect(response.body.elements).toHaveLength(2);
      expect(response.body.totalElements).toBeTruthy();
      expect(response.body.totalPages).toBeTruthy();
      expect(response.body.currentPage).toBeTruthy();

      response = await request(app.server)
        .get('/clinics?category=VET');

      expect(response.statusCode).toEqual(200);
      expect(response.body.elements).toBeTruthy();
      expect(response.body.elements).toHaveLength(2);
      expect(response.body.totalElements).toBeTruthy();
      expect(response.body.totalPages).toBeTruthy();
      expect(response.body.currentPage).toBeTruthy();
    });
  });
});
