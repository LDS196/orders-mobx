import { DatePicker } from '@gravity-ui/date-components';
import { dateTimeParse } from '@gravity-ui/date-utils';
import { Button, Modal, Select } from '@gravity-ui/uikit';
import { ModalProps } from '@gravity-ui/uikit/build/cjs/components/Modal/Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useRootStore } from '~/base/hooks/useRootStore';
import Notification from '~/base/ui/Notification';
import { ConfirmModal } from '~base/components/ConfirmModal';
import { OutlinedInputWithController } from '~base/components/OutlinedInputWithController';
import { OrderForm, OrderFormFields } from '~modules/order/forms/OrderForm';
import { orderFormValidationSchema } from '~modules/order/schemas/OrderFormValidation';

const status = ['new', 'inProgress', 'completed'];

interface IOrderFormModalProps extends ModalProps {
  open: boolean;
  onClose: () => void;
  orderId: number | null;
  onRefreshList: () => void;
  onCreateSuccess: (orderId: number) => void;
}

export const OrderFormModal: React.FC<IOrderFormModalProps> = observer((props) => {
  const { orderId, onRefreshList, onCreateSuccess, open, onClose, ...rest } = props;
  const { orderStore } = useRootStore();
  const [removedOrderId, setRemovedOrderId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const methods = useForm<OrderForm>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: OrderForm.create(),
    resolver: yupResolver(orderFormValidationSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = methods;

  const isEditMode = !!orderId;
  const isCompleted = orderStore.orderData?.status === 'completed';

  // Effects

  // On open
  useEffect(() => {
    if (!open || !orderId) {
      return;
    }

    orderStore.getOrder(orderId);
  }, [open, orderId]);

  useEffect(() => {
    if (!orderStore.orderData) {
      return;
    }

    const preparedValues = orderStore.prepareOrderFormValues(orderStore.orderData);

    setSelectedDate(orderStore.orderData.date);

    reset(preparedValues);
  }, [orderStore.orderData]);

  useEffect(() => {
    if (!orderStore.orderData?.status) {
      return;
    }

    setValue('status', orderStore.orderData?.status);
  }, [orderStore.orderData]);

  // On close
  useEffect(() => {
    if (open) {
      return;
    }

    setTimeout(() => {
      reset(OrderForm.create());
      orderStore.resetOrderData();
    }, 255); // дожидаемся закрытия модалки
  }, [open]);

  // Handlers

  const handleRepeat = () => {
    if (!orderId) {
      return;
    }

    orderStore.getOrder(orderId);
  };

  const handleClose = () => {
    onClose();
    setSelectedDate(null);
  };

  const handleCreateOrderSuccess = (newOrderId: number) => {
    handleClose();
    onCreateSuccess(newOrderId);
  };

  const handleSubmitOrderForm = (values: OrderForm) => {
    if (orderId) {
      orderStore.updateOrder(orderId, values, handleClose);
      return;
    }
    orderStore.createOrder(values, handleCreateOrderSuccess);
  };

  // Remove

  const handleTryRemoveOrder = (orderId: number) => {
    setRemovedOrderId(orderId);
  };

  const handleCloseRemoveOrderConfirm = () => {
    setRemovedOrderId(null);
  };

  const handleRemoveSuccessResult = () => {
    handleClose();
    onRefreshList();
  };

  const handleRemoveOrder = () => {
    handleCloseRemoveOrderConfirm();

    if (!removedOrderId) {
      Notification.showSomethingWrongError();
      return;
    }

    orderStore.removeOrder(removedOrderId, handleRemoveSuccessResult);
  };

  const handleChange = (dateChange: any) => {
    setValue(OrderFormFields.date, dateChange, {
      shouldDirty: true,
    });
    setSelectedDate(dateChange);
  };

  // Renders

  return (
    <>
      <Modal open={open} onClose={handleClose} {...rest}>
        <form onSubmit={handleSubmit(handleSubmitOrderForm)}>
          <div style={{ padding: '20px', minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>{isCompleted ? 'Order completed' : 'Order'}</div>
            <div>
              <OutlinedInputWithController
                name={OrderFormFields.number}
                hookFormProps={{ control }}
                label={'Number'}
                placeholder={'Number'}
                size={'s'}
                disabled={isCompleted}
              />
            </div>
            <div>
              <DatePicker
                disabled={isCompleted}
                name={OrderFormFields.date}
                onUpdate={handleChange}
                value={selectedDate ? dateTimeParse(selectedDate) : null}
                errorMessage={errors.date?.message}
                validationState={errors.date?.message ? 'invalid' : undefined}
              />
            </div>
            <div>
              <Controller
                name={OrderFormFields.status}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    disabled={!isEditMode || isCompleted}
                    width={'max'}
                    label={'status'}
                    value={[value]}
                    onUpdate={(val) => onChange(val[0])}
                    errorMessage={errors.status?.message}
                    validationState={errors.status?.message ? 'invalid' : undefined}
                  >
                    {status.map((option) => (
                      <Select.Option key={option} value={option}>
                        {option}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            <div>
              <OutlinedInputWithController
                disabled={isCompleted}
                name={OrderFormFields.clientName}
                hookFormProps={{ control }}
                label={'clientName'}
                placeholder={'clientName'}
                size={'m'}
              />
            </div>
            <div>
              <OutlinedInputWithController
                name={OrderFormFields.notes}
                hookFormProps={{ control }}
                label={'notes'}
                placeholder={'notes'}
                size={'s'}
                disabled={isCompleted}
              />
            </div>
            <div>
              <OutlinedInputWithController
                name={OrderFormFields.phoneTransporter}
                hookFormProps={{ control }}
                label={'phoneTransporter'}
                placeholder={'phoneTransporter'}
                size={'s'}
                disabled={isCompleted}
              />
            </div>
            <div>
              <OutlinedInputWithController
                name={OrderFormFields.codeTransporter}
                hookFormProps={{ control }}
                label={'codeTransporter'}
                placeholder={'codeTransporter'}
                size={'s'}
                disabled={isCompleted}
              />
            </div>
          </div>

          {!isCompleted && (
            <div style={{ display: 'flex', justifyContent: 'space-around', paddingBottom: '20px' }}>
              {orderId && (
                <Button loading={orderStore.removeOrderLoading} onClick={() => handleTryRemoveOrder(orderId)}>
                  remove
                </Button>
              )}

              <Button
                view={'action'}
                type="submit"
                loading={orderStore.createOrderLoading || orderStore.updateOrderLoading}
                disabled={orderStore.removeOrderLoading}
              >
                save
              </Button>
            </div>
          )}
        </form>
      </Modal>

      <ConfirmModal
        open={!!removedOrderId}
        desc={'Delete order?'}
        onDisagree={handleCloseRemoveOrderConfirm}
        onAgree={handleRemoveOrder}
      />
    </>
  );
});
