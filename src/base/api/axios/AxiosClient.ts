import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import Notification from '../../ui/Notification';
import IApiClient from '../IApiClient';
import { IAxiosConfig, IAxiosResponse } from './IAxiosInterfaces';

export default class AxiosClient implements IApiClient {
  static readonly SUCCESS_STATUSES = [200, 201];
  static readonly SERVER_ERROR = 500;
  static readonly UN_AUTH = 401;
  static readonly FORBIDDEN = 403;

  api: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.api = axios.create(config);
    this.api.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
    this.api.defaults.headers.common['Content-Type'] = 'application/json';

    if (!import.meta.env.VITE_APP_API_URL) {
      console.error('env.VITE_APP_API_URL - api url is not found!');
    }

    this.setInterceptorResponse();
  }

  // API Methods

  get = <T = IAxiosResponse>(config: IAxiosConfig) => {
    return this.api.get<T>(config.url, config.config);
  };

  post = <T = IAxiosResponse>(config: IAxiosConfig) => {
    return this.api.post<T>(config.url, config.data, config.config);
  };

  put = <T = IAxiosResponse>(config: IAxiosConfig) => {
    return this.api.put<T>(config.url, config.data, config.config);
  };

  delete = <T = IAxiosResponse>(config: IAxiosConfig) => {
    return this.api.delete<T>(config.url, config.config);
  };

  // SETTERS

  protected getApiErrors = (error: string | string[] | null) => {
    if (Array.isArray(error)) {
      error.forEach((error) => Notification.showError(error));
    } else if (error) {
      Notification.showError(error);
    } else {
      Notification.showError('Неизвестная ошибка');
    }
  };

  // INTERCEPTORS

  private setInterceptorResponse = () => {
    this.api.interceptors.response.use(
      (response: AxiosResponse<IAxiosResponse>) => {
        // Если запрос успешно выполнился но с ошибкой. Например: ошибки валидации
        if (response?.data?.success === false || response?.data?.errorInfo) {
          this.getApiErrors(response.data.errorInfo);

          return Promise.reject(response);
        }

        if (response?.data?.userInfo) {
          Notification.showSuccess(response?.data?.userInfo);
        }

        return response;
      },
      async (error) => {
        // Отображение ошибки из бэка
        if (error.response?.data?.ErrorInfo) {
          Notification.showSuccess(error.response?.data?.ErrorInfo);
        }

        if (error.response?.status === AxiosClient.SERVER_ERROR) {
          Notification.showError('Server error');
        }

        // Отображение неизвестной ошибки
        const isNoShowError = error?.config?.excludeErrorsCode?.includes(error?.response?.status);

        if (!isNoShowError) {
          Notification.showSomethingWrongError();
        }

        return Promise.reject(error);
      },
    );
  };
}
