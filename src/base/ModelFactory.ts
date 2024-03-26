import { Serializable } from 'ts-serializable';

import { IAxiosResponse } from './api/axios/IAxiosInterfaces';
import { IPaginationList } from './modules/pagination/interfaces/IPaginationList';
import PaginationModel from './modules/pagination/models/PaginationModel';

export class ModelFactory {
  create<T extends Serializable>(Model: new () => T, data: Object): T {
    return new Model().fromJSON({ ...data });
  }

  createList<T extends Serializable>(Model: new () => T, array: Object[]): T[] {
    return array.map((item: Object) => new Model().fromJSON({ ...item }));
  }

  createPaginationList<T extends Serializable>(
    Model: new () => T,
    data: IAxiosResponse<[]>,
  ): IPaginationList<T, PaginationModel> {
    const items = this.createList<T>(Model, data.data);
    const pagination = this.create<PaginationModel>(PaginationModel, { ...data.dataInfo });

    return { items, pagination };
  }
}

export const modelFactory = new ModelFactory();
