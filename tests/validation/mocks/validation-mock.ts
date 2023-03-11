import { Validation } from '../../../src/presentation/protocols/validation';

export default class ValidationSpy implements Validation {
  input: any;

  result = undefined;

  async validate(input: any): Validation.Result<any> {
    this.input = input;
    return this.result;
  }
}
