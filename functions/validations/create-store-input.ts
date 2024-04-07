import { Request, Response } from 'express';
import {
  formatResponse,
  handleError,
  InputValidationBody,
} from '@backend/lib/function-provider';
import { storeSdk } from '@backend/graphql/stores';
import {
  createStoreSchema,
  CreateStoreValues,
} from '@shared/validations/create-store-form.schema';

const createStoreInputValidation = async (req: Request, res: Response) => {
  try {
    const { data } = req.body as InputValidationBody<CreateStoreValues>;
    const input = data.input[0];

    createStoreSchema.parse(input);
    const { stores } = await storeSdk.checkWebsiteExist({
      url: `%${input.website_url}%`,
    });
    if (stores.length !== 0) {
      formatResponse(
        res,
        {
          message: 'A store with same website already exist',
        },
        400,
      );
    } else {
      res.status(200).send('OK');
    }
  } catch (e) {
    handleError(res, e);
  }
};
export default createStoreInputValidation;
