import {
  describe, it, expect,
} from 'vitest';
import { faker } from '@faker-js/faker';
import { checkSubString, convertAvailabilityIntoDate } from '../../../../src/infra/database/utils/utils';

describe('Utils', () => {
  describe('checkSubString', () => {
    it('Should return true if the string includes the subString', () => {
      const subString = faker.random.word();
      const string = faker.random.word().concat(subString);

      expect(checkSubString(string, subString)).toBe(true);
    });

    it('Should return false if the string does not include the subString', () => {
      const subString = faker.random.word();
      const string = faker.random.word();

      expect(checkSubString(string, subString)).toBe(false);
    });
  });

  describe('convertAvailabilityIntoDate', () => {
    it('Should return availability converted into date', () => {
      const availability = {
        from: faker.helpers.arrayElement(['08:00', '10:00', '12:00']),
        to: faker.helpers.arrayElement(['18:00', '20:00', '22:00']),
      };

      const convertedAvailability = convertAvailabilityIntoDate(availability);

      const isValidDate = (date: any): boolean => date
      && Object.prototype.toString.call(date) === '[object Date]'
      && !Number.isNaN(date);

      expect(convertedAvailability).toBeTruthy();
      expect(convertedAvailability.from).toBeTruthy();
      expect(convertedAvailability.to).toBeTruthy();
      expect(isValidDate(convertedAvailability.from)).toBe(true);
      expect(isValidDate(convertedAvailability.to)).toBe(true);
    });

    it('Should return formatted availability', () => {
      const availability = {
        from: faker.helpers.arrayElement(['24:00']),
        to: faker.helpers.arrayElement(['24:00']),
      };

      const convertedAvailability = convertAvailabilityIntoDate(availability);

      expect(convertedAvailability.from.getHours()).toBe(23);
      expect(convertedAvailability.from.getMinutes()).toBe(59);
      expect(convertedAvailability.to.getHours()).toBe(23);
      expect(convertedAvailability.to.getMinutes()).toBe(59);
    });
  });
});
