import { dateTimeParse } from '@gravity-ui/date-utils';

import { OrderFiltersForm } from '~modules/order/forms/OrderFiltersForm';
import { OrderModel } from '~modules/order/models/OrderModel';

export const getMockOrders = () => {
  const orders: OrderModel[] = [];
  let currentDate = new Date(); // Начальная дата

  for (let i = 0; i < 10; i++) {
    const order = new OrderModel();
    order.id = Date.now() + i;
    order.number = (i + 1).toString();
    order.date = String(dateTimeParse(currentDate));
    order.clientName = `Client ${i + 1}`;
    order.phoneTransporter = `9877379613`;
    order.notes = `Notes for order ${i + 1}`;
    order.status = i % 3 === 0 ? 'new' : i % 3 === 1 ? 'inProgress' : 'completed';
    order.codeTransporter = (i + 1).toString();

    orders.push(order);

    // Добавляем 1 день к текущей дате для следующей итерации
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  }

  return orders;
};

export const getMockOrder = () => {
  const someNumber = Math.floor(Math.random() * 100);
  const order = new OrderModel();
  order.id = someNumber;
  order.number = someNumber.toString();
  order.date = String(dateTimeParse(new Date()));
  order.clientName = `Client ${someNumber}`;
  order.phoneTransporter = `9877379613`;
  order.notes = `Notes for order someNumber`;
  order.status = someNumber % 3 === 0 ? 'new' : someNumber % 3 === 1 ? 'inProgress' : 'completed';
  order.codeTransporter = someNumber.toString();

  return order;
};

export const filteredOrders = (data: OrderModel[], filterForm: OrderFiltersForm) =>
  data.filter((el) => {
    if (filterForm.clientName && el.clientName !== filterForm.clientName) {
      return false;
    }

    if (filterForm.numberOrder && el.number !== filterForm.numberOrder) {
      return false;
    }

    if (!filterForm.showCompleted && el.status === 'completed') {
      return false;
    }

    return true;
  });
