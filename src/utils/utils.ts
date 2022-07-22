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
