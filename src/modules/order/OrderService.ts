import Dto from '~/base/Dto';
import { modelFactory } from '~/base/ModelFactory';
import ApiHelper from '~/base/api/ApiHelper';
import PhoneHelper from '~helpers/PhoneHelper';

import OrderApiRepository from './OrderApiRepository';
import CreateEmployeeDto from './dto/CreateOrderDto';
import OrderFiltersDto from './dto/OrderFiltersDto';
import UpdateOrderDto from './dto/UpdateOrderDto';
import { OrderFiltersForm } from './forms/OrderFiltersForm';
import { OrderForm } from './forms/OrderForm';
import { OrderModel } from './models/OrderModel';

export default class OrderService {
  api: OrderApiRepository;

  constructor() {
    this.api = new OrderApiRepository();
  }

  // API

  getOrderList = async (form: OrderFiltersForm) => {
    const dto = Dto.populate(OrderFiltersDto, {
      ...form,
    });
    const params = ApiHelper.getURLSearchParams(dto);
    const { data } = await this.api.getOrderList(params);

    return modelFactory.createList(OrderModel, data.data);
  };

  getOrder = async (id: number) => {
    const { data } = await this.api.getOrder(id);

    return modelFactory.create(OrderModel, data.data);
  };

  createOrder = async (form: OrderForm) => {
    const dto = Dto.populate(CreateEmployeeDto, {
      ...form,
      phone: PhoneHelper.getRussianRawNumber(form.phoneTransporter),
    });

    const { data } = await this.api.createOrder(dto);

    return modelFactory.create(OrderModel, data.data);
  };

  updateOrder = async (orderId: number, form: OrderForm) => {
    const dto = Dto.populate(UpdateOrderDto, {
      ...form,
      orderId,
      phone: PhoneHelper.getRussianRawNumber(form.phoneTransporter),
    });

    const { data } = await this.api.updateOrder(dto);

    return modelFactory.create(OrderModel, data.data);
  };

  removeOrder = async (orderId: number) => {
    return await this.api.removeOrder(orderId);
  };

  // OTHERS

  prepareOrderFormValues = (data: OrderModel): { [key: string]: unknown } => {
    const formModel = ApiHelper.getOnlyFillData(modelFactory.create(OrderModel, data));
    // подготовка даты под нужный формат
    // if (data.date) {
    //   formModel.date = data.date;
    // }

    return { ...OrderForm.create(), ...formModel };
  };

  updateOrderList = (orderList: OrderModel[], updatedOrder: OrderModel): OrderModel[] => {
    return orderList.map((order) => {
      if (order.id === order.id) {
        return updatedOrder;
      }

      return order;
    });
  };
}
