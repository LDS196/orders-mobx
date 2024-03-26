import { jsonProperty, Serializable } from 'ts-serializable';

import { appConfig } from '~/appConfig';

export default class PaginationModel extends Serializable {
  @jsonProperty(Number, null) pageSize: number = appConfig.tablePagination.pagination.pageSize;
  @jsonProperty(Number, null) pageNumber: number = appConfig.tablePagination.pagination.pageIndex;
  @jsonProperty(Number, null) pagesCount: number = 0;
}