import AbstractApiRepository from '~/base/api/AbstractApiRepository';
import { IAxiosResponse } from '~/base/api/axios/IAxiosInterfaces';

import CreateOrderDto from './dto/CreateOrderDto';
import UpdateOrderDto from './dto/UpdateOrderDto';

export default class OrderApiRepository extends AbstractApiRepository {
  getOrderList = (params: URLSearchParams) => {
    return this.apiClient.get<IAxiosResponse<[]>>({
      url: `/Order/GetOrders?${params.toString()}`,
    });
  };

  getOrder = (id: number) => {
    return this.apiClient.get({ url: `/Order/GetOrder?orderId=${id}` });
  };

  createOrder = (dto: CreateOrderDto) => {
    return this.apiClient.post({
      url: `/Order/CreateOrder`,
      data: { ...dto },
    });
  };

  updateOrder = (dto: UpdateOrderDto) => {
    return this.apiClient.put({
      url: `/Order/UpdateOrder`,
      data: { ...dto },
    });
  };

  removeOrder = (id: number) => {
    return this.apiClient.put({ url: `/Order/RemoveOrder?orderId=${id}` });
  };
}
