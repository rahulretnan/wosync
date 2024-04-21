import { Request, Response } from 'express';
import { WoocommerceClient } from '@wosync/woocommerce';
import { integrationSdk } from '@backend/graphql/integrations';

const analyticsData = async (req: Request, res: Response) => {
  const { store_id } = req.body;
  const { integrations } = await integrationSdk.getIntegrationByStoreId({
    store_id,
  });
  const integration = integrations[0];
  const woo = new WoocommerceClient({
    baseUrl: integration.store.website_url,
    consumerKey: integration.metadata.consumer_key,
    consumerSecret: integration.metadata.consumer_secret,
  });
  const { data, count, totalPages } = await woo.orders.list();
  res.status(200).json({ data, count, totalPages });
};

export default analyticsData;
