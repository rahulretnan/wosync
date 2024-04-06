import { isObject } from 'lodash';
import { format, inspect } from 'util';

type LogArgument = unknown;

export const log = (...args: LogArgument[]) => {
  console.log(
    ...args.map((arg) => {
      if (isObject(arg)) {
        return inspect(arg, { depth: null });
      } else {
        return format(arg as string);
      }
    }),
  );
};
