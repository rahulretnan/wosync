import { Request, Response } from 'express';
import { EventPayload } from '@backend/lib/function-provider';
import { logSdk } from '@backend/graphql/logs';
import { StoreEventType } from '@shared/constants/logs/store.event';

type CreateStoreEventPayload = {
  created_at: string;
  id: string;
  name: string;
  updated_at: string;
  user_id: string;
  website_url: string;
};
const storeEvent = async (req: Request, res: Response) => {
  const input = req.body as EventPayload<CreateStoreEventPayload>;
  const storeId = input.event.data.new?.id || input.event.data.old?.id;
  const createdBy = input.event.session_variables['x-hasura-user-id'];
  if (createdBy)
    await logSdk.addActivityLog({
      object: {
        created_by: createdBy,
        metadata: input.event,
        event: StoreEventType[input.event.op],
        store_id: storeId,
      },
    });
};

export default storeEvent;
