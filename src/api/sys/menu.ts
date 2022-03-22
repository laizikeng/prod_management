import { defHttp } from '/@/utils/http/axios';
import {
  getMenuListResultModel,
  RouteSearchParam,
  CreateMenuParam,
  MenuUpdateModal,
} from './model/menuModel';

enum Api {
  GetMenuList = '/base/menu/routes/',
  GetMenuListAll = '/base/menu/routes/all/',
  CreateMenu = '/base/menu/',
  DeleteMenu = '/base/menu/',
  UpdateMenu = '/base/menu/',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = (params?: RouteSearchParam) => {
  return defHttp.get<getMenuListResultModel>({
    url: Api.GetMenuList,
    params: params,
  });
};

export const getMenuListAll = (params?: RouteSearchParam) => {
  return defHttp.get<getMenuListResultModel>({
    url: Api.GetMenuListAll,
    params: params,
  });
};

export const createMenu = (params?: CreateMenuParam) => {
  return defHttp.post<string>({
    url: Api.CreateMenu,
    params: params,
  });
};

export const deleteMenu = (ids: string) => {
  return defHttp.delete<string>({
    url: Api.DeleteMenu,
    params: { ids: ids },
  });
};

export const updateMenu = (id: number, params?: MenuUpdateModal) => {
  return defHttp.put<string>({
    url: Api.UpdateMenu + id.toString() + '/',
    params: params,
  });
};
