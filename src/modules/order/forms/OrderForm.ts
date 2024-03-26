import { BaseForm } from '~/base/BaseForm';

export enum OrderFormFields {
  number = 'number',
  date = 'date',
  clientName = 'clientName',
  phoneTransporter = 'phoneTransporter',
  notes = 'notes',
  status = 'status',
  codeTransporter = 'codeTransporter',
}

export class OrderForm extends BaseForm {
  number: string = '';
  date: Date | null = null;
  clientName: string = '';
  phoneTransporter: string = '';
  notes: string = '';
  status: string = 'new';
  codeTransporter: string = '';

  constructor(props?: unknown) {
    super(props);
    this.load(props);
  }
}
