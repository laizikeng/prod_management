import type { RouteMeta } from 'vue-router';
export interface RouteItem {
  path: string;
  component: any;
  meta: RouteMeta;
  name?: string;
  alias?: string | string[];
  redirect?: string;
  caseSensitive?: boolean;
  children?: RouteItem[];
}

export interface RouteSearchParam {
  // name: string;
}

export interface CreateMenuParam {
  pid: any;
  name: string;
  path: string;
  component: string;
  icon: string;
  redirect: string;
  is_cache: string;
  is_enabled: string;
  is_outer_chain: string;
  is_show: string;
  order: string;
}

export interface MenuUpdateModal {
  pid: string;
  name: string;
  path: string;
  component: string;
  icon: string;
  redirect: string;
  is_enabled: string;
  is_outer_chain: string;
  is_show: string;
  order: string;
}

/**
 * @description: Get menu return value
 */
export type getMenuListResultModel = RouteItem[];
