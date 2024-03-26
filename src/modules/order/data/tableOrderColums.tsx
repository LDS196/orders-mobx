import { TableColumnConfig, TableDataItem } from '@gravity-ui/uikit';
import React from 'react';

export const getOrderColumns = (
  renderNumber: (item: TableDataItem) => React.JSX.Element,
): TableColumnConfig<TableDataItem>[] => [
  {
    id: 'number',
    meta: { sort: true },
    template: (item) => renderNumber(item),
    meta: { defaultSortOrder: 'desc', sort: (a, b) => a.number - b.number },
  },
  {
    id: 'date',
    meta: { defaultSortOrder: 'desc', sort: (a, b) => Date.parse(a.date) - Date.parse(b.date) },
  },
  { id: 'clientName' },
  { id: 'phoneTransporter' },
  { id: 'notes' },
  { id: 'status' },
  { id: 'codeTransporter' },
];
