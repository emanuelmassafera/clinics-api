export interface Validation<T, K> {
  validate: (input: T) => Validation.Result<T, K>
}

export namespace Validation {
  export type BadParams<T> = {
    [key in keyof T]?: string | BadParams<T[key]>;
  } | undefined;

  export type Result<T, K> = Promise<{
    formattedRequest: K
    badParams: Validation.BadParams<T>
  }>;
}
