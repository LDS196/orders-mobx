import { BaseForm } from '~/base/BaseForm';

export enum OrderFiltersFormFields {
  numberOrder = 'numberOrder',
  clientName = 'clientName',
  showCompleted = 'showCompleted',
}

export class OrderFiltersForm extends BaseForm {
  numberOrder: string = '';
  clientName: string = '';
  showCompleted: boolean = false;

  constructor(props?: unknown) {
    super(props);
    this.load(props);
  }
}
