import { makeAutoObservable } from 'mobx';

import { modelFactory } from '~base/ModelFactory';
import { filteredOrders, getMockOrders } from '~modules/order/data/mockData';

import OrderService from './OrderService';
import { OrderFiltersForm } from './forms/OrderFiltersForm';
import { OrderForm } from './forms/OrderForm';
import { OrderModel } from './models/OrderModel';

export class OrderStore {
  orderList: OrderModel[] = [];
  orderListLoading = true;
  orderListLoaded = true;

  orderData: OrderModel | null = null;
  orderDataLoading = true;
  orderDataLoaded = true;

  createOrderLoading = false;
  updateOrderLoading = false;
  removeOrderLoading = false;

  private orderService: OrderService;

  constructor() {
    makeAutoObservable(this);
    this.orderService = new OrderService();
  }

  // API

  getOrdersList = (filterForm: OrderFiltersForm) => {
    this.setOrderListLoading(true);

    this.orderService
      .getOrderList(filterForm)
      .then((items) => {
        this.setOrderList(items);
        this.setOrderListLoaded(true);
      })
      .catch(() => {
        //TODO
        //mock data and filter
        this.setOrderList(filteredOrders(getMockOrders(), filterForm));
        this.setOrderListLoaded(false);
      })
      .finally(() => {
        this.setOrderListLoading(false);
      });
  };

  getOrder = (id: number) => {
    this.setOrderDataLoading(true);

    this.orderService
      .getOrder(id)
      .then((data) => {
        this.setOrderData(data);
        this.setOrderDataLoaded(true);
      })
      .catch(() => {
        // TODO
        // mock data
        const foundOrder = this.orderList.find((order) => order.id === id);

        if (foundOrder) {
          this.setOrderData(foundOrder);
        }
        this.setOrderDataLoaded(false);
      })
      .finally(() => {
        this.setOrderDataLoading(false);
      });
  };

  createOrder = (form: OrderForm, onSuccess: (newOrderId: number) => void) => {
    this.setCreateOrderLoading(true);

    this.orderService
      .createOrder(form)
      .then((newOrder) => {
        this.orderList.push(newOrder);
        onSuccess(newOrder.id!);
      })
      .catch(() => {
        // TODO
        // mock data
        const order = modelFactory.create(OrderModel, { ...form, id: Date.now() });
        this.orderList.push(order);
        onSuccess(order.id!);
      })
      .finally(() => {
        this.setCreateOrderLoading(false);
      });
  };

  updateOrder = (orderId: number, form: OrderForm, onSuccess: () => void) => {
    this.setUpdateOrderLoading(true);

    this.orderService
      .updateOrder(orderId, form)
      .then((order) => {
        this.setOrderList(this.orderService.updateOrderList(this.orderList, order));
        onSuccess();
      })
      .catch(() => {
        // TODO
        // mock data
        const order = modelFactory.create(OrderModel, { ...form, id: orderId });
        this.setOrderList(this.orderService.updateOrderList(this.orderList, order));
        onSuccess();
      })
      .finally(() => {
        this.setUpdateOrderLoading(false);
      });
  };

  removeOrder = (orderId: number, onSuccess: () => void) => {
    this.setRemoveOrderLoading(true);

    this.orderService
      .removeOrder(orderId)
      .then(() => {
        onSuccess();
      })
      .catch(() => {
        // TODO
        // mock data
        this.orderList = this.orderList.filter((order) => order.id !== orderId);
        onSuccess();
      })
      .finally(() => {
        this.setRemoveOrderLoading(false);
      });
  };

  // OTHERS

  /**
   * Подготавливает данные заявки для формы. Переименует поля под форму и оставляет только `NonNullable` значении.
   *
   * @param data - данные формы
   * @returns объект с `NonNullable` данными
   */
  prepareOrderFormValues = (data: OrderModel) => {
    return this.orderService.prepareOrderFormValues(data);
  };

  // RESET

  resetOrderList = () => {
    this.orderList = [];
    this.orderListLoading = true;
    this.orderListLoaded = true;
  };

  resetOrderData = () => {
    this.orderData = null;
    this.orderDataLoading = true;
    this.orderDataLoaded = true;
  };

  reset = () => {
    this.resetOrderList();
    this.resetOrderData();
  };

  // SETTERS

  private setOrderList = (items: OrderModel[]) => {
    this.orderList = items;
  };

  private setOrderListLoading = (value: boolean) => {
    this.orderListLoading = value;
  };

  private setOrderListLoaded = (value: boolean) => {
    this.orderListLoaded = value;
  };

  private setOrderData = (data: OrderModel | null) => {
    this.orderData = data;
  };

  private setOrderDataLoading = (value: boolean) => {
    this.orderDataLoading = value;
  };

  private setOrderDataLoaded = (value: boolean) => {
    this.orderDataLoaded = value;
  };

  private setCreateOrderLoading = (value: boolean) => {
    this.createOrderLoading = value;
  };

  private setUpdateOrderLoading = (value: boolean) => {
    this.updateOrderLoading = value;
  };

  private setRemoveOrderLoading = (value: boolean) => {
    this.removeOrderLoading = value;
  };
}
