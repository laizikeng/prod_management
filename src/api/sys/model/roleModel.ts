export interface RoleSearchParam {}

export interface RoleResult {
  count: any;
  results: string[];
}

export interface RoleCreateModal {
  role_name: string;
  remark: string;
  is_enabled: string;
  is_deleted: string;
  pks: string;
}

export interface RoleUpdateModal {
  role_name: string;
  remark: string;
  is_enabled: string;
  is_deleted: string;
  pks: string;
}

/*
 * @description: Get role return value
 */
export type getRoleListResultModel = RoleResult;
