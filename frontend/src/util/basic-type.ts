export type Result<T> =
  | {
      result: T;
      error: undefined;
    }
  | {
      error: Error;
    };

export const newResult = <T>(arg: T): Result<T> => {
  return {
    result: arg,
    error: undefined,
  };
};

export const newError = (txt: string) => {
  return {
    error: new Error(txt),
  };
};
