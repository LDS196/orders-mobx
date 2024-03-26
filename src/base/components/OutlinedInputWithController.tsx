import { TextInput, TextInputProps } from '@gravity-ui/uikit';
import React from 'react';
import { UseWatchProps, Controller } from 'react-hook-form';

interface IOutlinedInputWithControllerProps extends TextInputProps {
  name: string;
  hookFormProps: Omit<UseWatchProps<any>, 'name' | 'render'>;
  hideErrorMessage?: boolean;
}

export const OutlinedInputWithController: React.FC<IOutlinedInputWithControllerProps> = (props) => {
  const { name, hookFormProps, hideErrorMessage, disabled, ...rest } = props;

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => {
        const errorMessage = fieldState.error?.message;

        return (
          <TextInput
            controlRef={field.ref}
            {...rest}
            {...field}
            errorMessage={errorMessage}
            error={!!errorMessage || props.error}
            ref={null}
            disabled={disabled}
          />
        );
      }}
      {...hookFormProps}
    />
  );
};
