import { jsonProperty } from 'ts-serializable';

import CreateOrderDto from './CreateOrderDto';

export default class UpdateOrderDto extends CreateOrderDto {
  @jsonProperty(Number, null) orderId: number | null = null;
}
