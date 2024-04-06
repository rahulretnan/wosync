import { Request, Response } from 'express';
import { log } from '@backend/lib/logger';

const addStoreIntegration = async (req: Request, res: Response) => {
  // const { data } = req.body as InputValidationBody<AddStoreIntegrationValues>;
  // const input = data.input[0];
  log(req.body);
  res.status(200).send('OK');
};
export default addStoreIntegration;
