import { defHttp } from '/@/utils/http/axios';
import { DeptSearchParam, getDeptListResultModel } from './model/depteModel';

enum Api {
  GetDeptList = '/base/dept/',
}
/**
 * @description: Get user menu based on id
 */

export const getDeptList = (params?: DeptSearchParam) => {
  return defHttp.get<getDeptListResultModel>({
    url: Api.GetDeptList,
    params: params,
  });
};
