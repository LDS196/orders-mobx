import { Checkbox, CheckboxProps } from '@gravity-ui/uikit';
import React from 'react';
import { UseWatchProps, Controller } from 'react-hook-form';

interface ICheckboxWithControllerProps extends CheckboxProps {
  name: string;
  hookFormProps: Omit<UseWatchProps<any>, 'name' | 'render'>;
}

const CheckboxWithController: React.FC<ICheckboxWithControllerProps> = (props) => {
  const { name, hookFormProps, ...rest } = props;

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Checkbox {...rest} checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
      )}
      {...hookFormProps}
    />
  );
};

export default CheckboxWithController;
