import { AxiosRequestConfig } from 'axios';

import PaginationModel from '~/base/modules/pagination/models/PaginationModel';

import { IApiConfig } from '../ApiInterfaces';

export interface IAxiosConfig extends IApiConfig {
  data?: Object;
  config?: AxiosRequestConfig & {
    excludeErrorsCode?: number[];
  };}

export interface IAxiosResponse<T = {}> {
  success: boolean;
  userInfo: string | null;
  data: T;
  dataInfo?: PaginationModel | null;
  errorInfo: string[] | null;
}
