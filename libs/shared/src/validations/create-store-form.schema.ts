import { z } from 'zod';
import validator from 'validator';
import { zodResolver } from '@hookform/resolvers/zod';

const STORE_NAME_REQUIRED_MESSAGE = 'Store name is required';
const WEBSITE_URL_REQUIRED_MESSAGE = 'Website URL is required';
const WEBSITE_URL_VALID_REQUIRED_MESSAGE = 'Please enter a valid website URL';

export const createStoreSchema = z.object({
  name: z.string({
    required_error: STORE_NAME_REQUIRED_MESSAGE,
    invalid_type_error: STORE_NAME_REQUIRED_MESSAGE,
  }),
  website_url: z
    .string({
      required_error: WEBSITE_URL_REQUIRED_MESSAGE,
      invalid_type_error: WEBSITE_URL_REQUIRED_MESSAGE,
    })
    .transform((val) => (val.startsWith('https://') ? val : `https://${val}`))
    .refine((value) => validator.isURL(value), {
      message: WEBSITE_URL_VALID_REQUIRED_MESSAGE,
    }),
});

export type CreateStoreValues = z.infer<typeof createStoreSchema>;
export const createStoreSchemaResolver = zodResolver(createStoreSchema);
