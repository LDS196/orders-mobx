import { jsonProperty, Serializable } from 'ts-serializable';

export default class OrderFiltersDto extends Serializable {
  @jsonProperty(String) numberOrder: string = '';
  @jsonProperty(String) clientName: string = '';
  @jsonProperty(Boolean) showCompleted: boolean = false;
}
