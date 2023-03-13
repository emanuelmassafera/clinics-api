import { Validation } from '../../../../src/presentation/protocols/validation';

export default class ValidationSpy implements Validation<any, any> {
  input: any;

  result: any;

  validate(input: any): Validation.Result<any, any> {
    this.input = input;
    return this.result;
  }
}
