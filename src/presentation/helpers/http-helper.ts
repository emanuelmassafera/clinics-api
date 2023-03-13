import { Http } from '../protocols/http';

const ok = <T extends any>(data: T): Http.Response<T> => ({
  statusCode: 200,
  body: data,
});

export default ok;
