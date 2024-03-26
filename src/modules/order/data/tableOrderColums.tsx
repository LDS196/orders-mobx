import { TableColumnConfig, TableDataItem } from '@gravity-ui/uikit';
import React from 'react';

import { OrderModel } from '~modules/order/models/OrderModel';

export const getOrderColumns = (
  renderNumber: (item: OrderModel) => React.JSX.Element,
  renderCode: (item: OrderModel) => React.JSX.Element,
): TableColumnConfig<TableDataItem>[] => [
  {
    id: 'number',
    template: (item) => renderNumber(item as OrderModel),
    meta: { defaultSortOrder: 'desc', sort: (a: TableDataItem, b: TableDataItem) => a.number - b.number },
  },
  {
    id: 'date',
    meta: {
      defaultSortOrder: 'desc',
      sort: (a: TableDataItem, b: TableDataItem) => Date.parse(a.date) - Date.parse(b.date),
    },
  },
  { id: 'clientName' },
  { id: 'phoneTransporter' },
  { id: 'notes' },
  { id: 'status' },
  {
    id: 'codeTransporter',
    template: (item) => renderCode(item as OrderModel),
  },
];
