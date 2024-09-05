import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse } from '@/src/entities';
import { configData } from '@/src/data';

export class Api {
  private static baseURL = configData.isBaseUrl();

  private static config: AxiosRequestConfig = {
    withCredentials: true,
    baseURL: this.baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  static createInstance() {
    return axios.create(this.config);
  }

  static async get<T>(
    restApi: string,
    config?: AxiosRequestConfig
  ) {
    return this.createInstance().get<ApiResponse<T>>(
      restApi,
      config
    );
  }

  static async post<T, P>(
    restApi: string,
    data: P,
    config?: AxiosRequestConfig
  ) {
    return this.createInstance().post<T, AxiosResponse<ApiResponse<T>, P>, P>(
      restApi,
      data,
      config
    );
  }

  static async postWithFile<T, P>(
    restApi: string,
    data: P,
    config?: AxiosRequestConfig
  ) {
    return this.createInstance().post<T, AxiosResponse<ApiResponse<T>, P>, P>(
      restApi,
      data,
      {
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }

  static async patch<T, P>(
    restApi: string,
    data: P,
    config?: AxiosRequestConfig
  ) {
    return this.createInstance().patch<T, AxiosResponse<ApiResponse<T>, P>, P>(
      restApi,
      data,
      config
    );
  }

  static async put<T, P>(
    restApi: string,
    data: P,
    config?: AxiosRequestConfig
  ) {
    return this.createInstance().put<T, AxiosResponse<ApiResponse<T>, P>, P>(
      restApi,
      data,
      config
    );
  }

  static async delete<T>(
    restApi: string,
    config?: AxiosRequestConfig
  ) {
    return this.createInstance().delete<ApiResponse<T>>(
      restApi,
      config
    );
  }

  static async getQuery<D>(url: string) {
    return this.get<D>(url);
  }

  static async postQuery<D, P>(
    url: string,
    postData: P
  ) {
    return this.post<D, P>(url, postData);
  }

  static async patchQuery<D, P>(
    url: string,
    patchData: P
  ) {
    return this.patch<D, P>(url, patchData);
  }

  static async deleteQuery<D>(url: string) {
    return this.delete<D>(url);
  }
}
