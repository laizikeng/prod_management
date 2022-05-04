import { defHttp } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import {
  GoodsNameResult,
  PlanResult,
  GoodsNameModal,
  GoodsPricesModal,
  PlanModal,
  GoodsPricesResult,
} from './model/costModel';
enum Api {
  getGoodsName = '/cost/get_goods_name/',
  getGoodsPrices = '/cost/get_goods_prices/',
  getPlan = '/cost/get_plan/',
}

/**
 * @description: get goods name list
 */

export const getGoodsName = (params?: GoodsNameModal) => {
  return defHttp.post<GoodsNameResult>({
    url: Api.getGoodsName,
    params: params,
    headers: { 'Content-Type': ContentTypeEnum.JSON },
  });
};

export const getGoodsPrices = (params?: GoodsPricesModal) => {
  return defHttp.post<GoodsPricesResult>({
    url: Api.getGoodsPrices,
    params: params,
    headers: { 'Content-Type': ContentTypeEnum.JSON },
  });
};

export const getPlan = (params?: PlanModal) => {
  return defHttp.post<PlanResult>({
    url: Api.getPlan,
    params: params,
    headers: { 'Content-Type': ContentTypeEnum.JSON },
  });
};
