import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const STORE_STORE_ID_REQUIRED_MESSAGE = 'Store Id is required';

export const addStoreIntegrationFormSchema = z.object({
  storeId: z.string({
    required_error: STORE_STORE_ID_REQUIRED_MESSAGE,
    invalid_type_error: STORE_STORE_ID_REQUIRED_MESSAGE,
  }),
});

export type AddStoreIntegrationValues = z.infer<
  typeof addStoreIntegrationFormSchema
>;
export const addStoreIntegrationFormSchemaResolver = zodResolver(
  addStoreIntegrationFormSchema,
);
