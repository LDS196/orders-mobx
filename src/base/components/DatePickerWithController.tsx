import React from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { UseWatchProps, Controller } from 'react-hook-form';

interface IDatePickerWithControllerProps extends ReactDatePickerProps {
  name: string;
  hookFormProps: Omit<UseWatchProps<any>, 'name' | 'render'>;
}

export const DatePickerWithController: React.FC<IDatePickerWithControllerProps> = (props) => {
  const { name, hookFormProps, ...rest } = props;

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => {
        const errorMessage = fieldState.error?.message;

        return <DatePicker {...rest} {...field} ref={field.ref} />;
      }}
      {...hookFormProps}
    />
  );
};
