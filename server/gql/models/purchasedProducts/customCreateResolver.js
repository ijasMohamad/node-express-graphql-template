import moment from 'moment';
import { insertPurchasedProducts } from '@daos/purchasedProducts';
import { transformSQLError } from '@utils';
import { redis } from '@services/redis';
import { SUBSCRIPTION_TOPICS } from '@server/utils/constants';
import { getSingleSupplierId } from '@daos/supplierProducts';
import { pubsub } from '@server/utils/pubsub';
import { getCategoryById } from '@server/daos/products';

export const updateRedis = async res => {
  const currentDate = moment().format('YYYY-MM-DD');
  const category = await getCategoryById(res.productId);
  const redisAggregate = JSON.parse(await redis.get(`${currentDate}_total`));
  const redisAggregateCategory = JSON.parse(await redis.get(`${currentDate}_${category}`));
  redis.set(
    `${currentDate}_${category}`,
    JSON.stringify({
      total: redisAggregateCategory?.total + res.price || res.price,
      count: redisAggregateCategory?.count + 1 || 1
    })
  );
  redis.set(
    `${currentDate}_total`,
    JSON.stringify({
      total: redisAggregate?.total + res.price || res.price,
      count: redisAggregate?.count + 1 || 1
    })
  );
};

export const publishMessage = async (args, res) => {
  const supplierProduct = await getSingleSupplierId(args);
  pubsub.publish(SUBSCRIPTION_TOPICS.NOTIFICATIONS, {
    notifications: {
      productId: res.productId,
      deliveryDate: res.deliveryDate,
      price: res.price,
      supplierId: supplierProduct.supplierId
    }
  });
};
export default async (model, args, context) => {
  try {
    const res = await insertPurchasedProducts(args);
    updateRedis(res);
    publishMessage(res, args);
    return res;
  } catch (err) {
    throw transformSQLError(err);
  }
};
