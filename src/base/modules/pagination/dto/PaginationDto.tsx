import { jsonProperty, Serializable } from 'ts-serializable';

export class PaginationDto extends Serializable {
  @jsonProperty(Number, null) pageNumber: number | null = null;
  @jsonProperty(Number, null) pageSize: number | null = null;
}