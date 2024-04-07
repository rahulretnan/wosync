import { Request, Response } from 'express';
import { integrationSdk } from '@backend/graphql/integrations';
import { Integrations } from '@shared/constants/integrations';
import { logSdk } from '@backend/graphql/logs';
import { storeSdk } from '@backend/graphql/stores';
import { IntegrationEvent } from '@shared/constants/logs/integration.event';
import { handleError } from '@backend/lib/function-provider';

type StoreIntegrationCallback = {
  key_id: number;
  user_id: string;
  consumer_key: string;
  consumer_secret: string;
  key_permissions: string;
};

const connectWoocommerce = async (req: Request, res: Response) => {
  try {
    const data = req.body as StoreIntegrationCallback;
    const { store } = await storeSdk.checkStoreExist({
      id: data.user_id,
    });
    if (!store) {
      throw new Error(`Could not find store with id ${data.user_id}`);
    }
    const { insertIntegration } = await integrationSdk.addIntegration({
      object: {
        store_id: data.user_id,
        integration_type: Integrations.Woocommerce,
        metadata: data,
      },
    });
    await logSdk.addActivityLog({
      object: {
        created_by: store.user_id,
        metadata: {
          key_id: data.key_id,
          store_id: data.user_id,
          key_permissions: data.key_permissions,
          integration_id: insertIntegration.id,
        },
        event: IntegrationEvent.CreateIntegration,
        store_id: store.id,
      },
    });
    res.status(200).send('OK');
  } catch (e) {
    handleError(res, e);
  }
};
export default connectWoocommerce;
