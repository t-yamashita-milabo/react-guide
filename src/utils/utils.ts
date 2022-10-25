import { format } from "date-fns";

export type Except<T, U extends keyof T> = {
  [Prop in keyof T as Exclude<Prop, U>]: T[Prop];
};

export type Override<T, U extends { [Prop in keyof T]?: any }> = {
  [Prop in keyof T as Exclude<Prop, keyof U>]: T[Prop];
} & {
  [Prop in keyof U]: U[Prop];
};

export const isArrayOf = <T>(
  arg: unknown,
  pred: (v: unknown) => boolean
): arg is T[] => {
  const x = arg as T[];

  return Array.isArray(x) && (x.length === 0 || x.every(pred));
};

export const fmtDate = (date: Date, fmt = "yyyy/MM/dd") => format(date, fmt);

export const range = (start: number, end: number, step: number) => {
  if (step === 0) {
    throw new RangeError(`invalid argument: step=${step}; step must not be 0.`);
  }
  const len = Math.ceil((end - start) / step);
  return len <= 0 ? [] : Array.from(new Array(len), (v, i) => start + i * step);
};

export const eRange = (end: number) => range(0, end, 1);
