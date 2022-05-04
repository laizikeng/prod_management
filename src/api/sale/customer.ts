import { defHttp } from '/@/utils/http/axios';
import {
  CustomerSearchParam,
  getCustomerListResultModel,
  CustomerCreateModal,
  CustomerUpdateModal,
} from './model/customerModel';
enum Api {
  GetCustomerList = '/sale/customer/',
  CreateCustomer = '/sale/customer/',
  DeleteCustomer = '/sale/customer/',
  UpdateCustomer = '/sale/customer/',
}

/**
 * @description: get customer list
 */

export const getCustomerList = (params?: CustomerSearchParam) => {
  if (params != undefined) {
    params['code__icontains'] = params['code'];
    params['name__icontains'] = params['name'];
    params['contact_name__icontains'] = params['contact_name'];
  }

  return defHttp.get<getCustomerListResultModel>({
    url: Api.GetCustomerList,
    params: params,
  });
};

export const createCustomer = (params?: CustomerCreateModal) => {
  return defHttp.post<string>({
    url: Api.CreateCustomer,
    params: params,
  });
};

export const deleteCustomer = (ids: string) => {
  return defHttp.delete<string>({
    url: Api.DeleteCustomer,
    params: { ids: ids },
  });
};

export const updateCustomer = (id: number, params?: CustomerUpdateModal) => {
  return defHttp.put<string>({
    url: Api.UpdateCustomer + id.toString() + '/',
    params: params,
  });
};
