import { jsonProperty, Serializable } from 'ts-serializable';

import { OrderStatus } from '~modules/order/types/OrderTypes';

export default class CreateOrderDto extends Serializable {
  @jsonProperty(String, null) number: string | null = null;
  @jsonProperty(String, null) date: string | null = null;
  @jsonProperty(String, null) clientName: string | null = null;
  @jsonProperty(String, null) phoneTransporter: string | null = null;
  @jsonProperty(String, null) notes: string | null = null;
  @jsonProperty(String, null) status: OrderStatus | null = null;
  @jsonProperty(String, null) codeTransporter: string | null = null;
}
