import { Pencil } from '@gravity-ui/icons';
import { Button, Table, TableDataItem, withTableSorting } from '@gravity-ui/uikit';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { Simulate } from 'react-dom/test-utils';
import { FormProvider, useForm } from 'react-hook-form';

import { useRootStore } from '~base/hooks/useRootStore';
import { getOrderColumns } from '~modules/order/data/tableOrderColums';
import { OrderFiltersForm } from '~modules/order/forms/OrderFiltersForm';
import { OrderModel } from '~modules/order/models/OrderModel';
import { OrderFormModal } from '~screens/order/OrderFormModal';
import { OrderToolbar } from '~screens/order/OrderToolbar';

import reset = Simulate.reset;

export const OrderScreen: React.FC = observer(() => {
  const OrderTable = withTableSorting(Table);
  const { orderStore } = useRootStore();

  const methods = useForm<OrderFiltersForm>({
    defaultValues: { ...OrderFiltersForm.create() },
  });

  const { watch, getValues: getFilterFormValues } = methods;

  // Card
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
  const [isOrderCardOpen, setIsOrderCardOpen] = useState<boolean>(false);

  // Effects

  useEffect(() => {
    orderStore.getOrdersList(getFilterFormValues());

    return () => {
      orderStore.resetOrderList();
    };
  }, []);

  // Применяем фильтры при изменении с задержкой
  useEffect(() => {
    const watchSubscription = watch((values) => {
      if (!values) {
        return;
      }

      void handleApplyFilters(values as OrderFiltersForm);
    });

    return () => {
      watchSubscription.unsubscribe();
    };
  }, [watch]);

  // Handlers
  const handleRefreshList = () => {
    orderStore.getOrdersList(getFilterFormValues());
  };

  const handleApplyFilters = useCallback((values: OrderFiltersForm) => {
    setTimeout(() => {
      orderStore.getOrdersList(values);
    }, 500);
  }, []);

  const handleAddNewOrder = () => {
    setEditingOrderId(null);
    setIsOrderCardOpen(true);
  };

  const handleOrderCardOpen = (order: OrderModel) => {
    setEditingOrderId(order.id);
    setIsOrderCardOpen(true);
  };

  const handleOrderCardClose = () => {
    setEditingOrderId(null);
    setIsOrderCardOpen(false);
  };

  const handleReset = () => {
    reset({ ...OrderFiltersForm.create() });
  };

  // Renders

  const renderNumber = (item: TableDataItem) => {
    return (
      <div>
        <span style={{ marginRight: '10px' }}>{item.number}</span>
        <Pencil onClick={() => handleOrderCardOpen(item as OrderModel)} />
      </div>
    );
  };

  return (
    <div>
      <FormProvider {...methods}>
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <OrderToolbar onReset={handleReset} />
          <Button view={'action'} onClick={handleAddNewOrder}>
            Add order
          </Button>
        </div>

        <OrderTable data={orderStore.orderList} columns={getOrderColumns(renderNumber)} emptyMessage={'no data'} />
      </FormProvider>
      <OrderFormModal
        open={isOrderCardOpen}
        orderId={editingOrderId}
        onClose={handleOrderCardClose}
        onRefreshList={handleRefreshList}
        onCreateSuccess={() => {}}
      />
    </div>
  );
});
