import { defHttp } from '/@/utils/http/axios';
import {
  RoleSearchParam,
  getRoleListResultModel,
  RoleCreateModal,
  RoleUpdateModal,
} from './model/roleModel';

enum Api {
  GetRoleList = '/base/role/',
  SetRoleStatus = '/base/role/',
  CreateRole = '/base/role/',
  DeleteRole = '/base/role/',
  UpdateRole = '/base/role/',
}

/**
 * @description: Get user menu based on id
 */

export const getRoleList = (params?: RoleSearchParam) => {
  return defHttp.get<getRoleListResultModel>({
    url: Api.GetRoleList,
    params: params,
  });
};

export const setRoleStatus = (id: number, is_enabled: string) => {
  return defHttp.patch<string>({
    url: Api.SetRoleStatus + id.toString() + '/',
    params: { is_enabled: is_enabled },
  });
};

export const createRole = (params?: RoleCreateModal) => {
  return defHttp.post<string>({
    url: Api.CreateRole,
    params: params,
  });
};

export const deleteRole = (ids: string) => {
  return defHttp.delete<string>({
    url: Api.DeleteRole,
    params: { ids: ids },
  });
};

export const updateRole = (id: number, params?: RoleUpdateModal) => {
  return defHttp.put<string>({
    url: Api.UpdateRole + id.toString() + '/',
    params: params,
  });
};
