export interface Validation<T, K> {
  validate: (input: T) => Validation.Result<T, K>
}

export namespace Validation {
  export type BadParams<T> = {
    [key in keyof T]?: string | BadParams<T[key]>;
  };

  export type Result<T, K> = {
    formattedRequest: K | Validation.BadParams<T> | null | any
    hasIssues: boolean
  };
}
