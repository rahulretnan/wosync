import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const EMAIL_VALIDATION_MESSAGE = 'Email is not valid';
const EMAIL_REQUIRED_VALIDATION_MESSAGE = 'Email is required';
const PASSWORD_VALIDATION_MESSAGE = 'Password is not valid';
const PASSWORD_REQUIRED_VALIDATION_MESSAGE = 'Password is required';
const PASSWORD_MIN_LENGTH_VALIDATION_MESSAGE =
  'Password must be at least 8 characters long';
const NO_WHITE_SPACE_VALIDATION_MESSAGE = 'No white space allowed';

const whiteSpaceRegex = /\s/;

const schema = z.object({
  email: z
    .string({
      required_error: EMAIL_REQUIRED_VALIDATION_MESSAGE,
      invalid_type_error: EMAIL_VALIDATION_MESSAGE,
    })
    .email(EMAIL_VALIDATION_MESSAGE),
  password: z
    .string({
      required_error: PASSWORD_REQUIRED_VALIDATION_MESSAGE,
      invalid_type_error: PASSWORD_VALIDATION_MESSAGE,
    })
    .min(8, PASSWORD_MIN_LENGTH_VALIDATION_MESSAGE)
    .refine((value) => !whiteSpaceRegex.test(value), {
      message: NO_WHITE_SPACE_VALIDATION_MESSAGE,
    }),
  rememberMe: z.boolean(),
});
export const signinFormSchema = zodResolver(schema);
export type SigninFormSchema = z.infer<typeof schema>;
