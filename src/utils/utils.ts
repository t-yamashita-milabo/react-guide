import { format } from "date-fns";

export const isArrayOf = <T>(
  arg: unknown,
  pred: (v: unknown) => boolean
): arg is T[] => {
  const x = arg as T[];

  return Array.isArray(x) && (x.length === 0 || x.every(pred));
};

export const fmtDate = (date: Date, fmt = "yyyy/MM/dd") => format(date, fmt);
