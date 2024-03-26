import React from 'react';
import { useFormContext } from 'react-hook-form';

import CheckboxWithController from '~base/components/CheckboxLabelWithController';
import { OutlinedInputWithController } from '~base/components/OutlinedInputWithController';
import { OrderFiltersForm, OrderFiltersFormFields } from '~modules/order/forms/OrderFiltersForm';

interface IOrderToolbarProps {
  onReset: () => void;
}

export const OrderToolbar: React.FC<IOrderToolbarProps> = (props) => {
  const { onReset } = props;

  // Основная форма фильтров
  const { control } = useFormContext<OrderFiltersForm>();

  // Effects

  // Handlers

  // Renders

  return (
    <div style={{ display: 'flex', flex: '70%', gap: '0 20px', alignItems: 'center' }}>
      <div>
        <OutlinedInputWithController
          name={OrderFiltersFormFields.clientName}
          hookFormProps={{ control }}
          label={'clientName'}
          placeholder={'clientName'}
          size={'m'}
        />
      </div>
      <div>
        <OutlinedInputWithController
          name={OrderFiltersFormFields.numberOrder}
          hookFormProps={{ control }}
          label={'numberOrder'}
          placeholder={'numberOrder'}
          size={'m'}
        />
      </div>
      <div>
        <CheckboxWithController
          content={'showCompleted'}
          name={OrderFiltersFormFields.showCompleted}
          hookFormProps={{ control }}
        />
      </div>
    </div>
  );
};
