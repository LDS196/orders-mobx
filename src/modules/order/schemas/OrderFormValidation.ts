import * as yup from 'yup';

import { OrderFormFields } from '../forms/OrderForm';

export const orderFormValidationSchema: any = yup.object().shape({
  [OrderFormFields.number]: yup.string().required('required field').min(1),
  [OrderFormFields.date]: yup.string().required('required field'),
  [OrderFormFields.clientName]: yup.string().required('required field').min(1),
  [OrderFormFields.status]: yup.string().required('required field'),
  [OrderFormFields.phoneTransporter]: yup.string().required('required field'),
  [OrderFormFields.codeTransporter]: yup.string().required('required field').min(1),
});
