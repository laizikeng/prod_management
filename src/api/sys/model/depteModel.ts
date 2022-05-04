export interface DeptItem {
  dept_name: string;
  order_no: string;
  leader: string;
  phone: string;
  email: string;
  status: string;
  is_deleted: string;
  children?: DeptItem[];
}

export interface DeptSearchParam {
  // name: string;
}

/**
 * @description: Get dept return value
 */
export type getDeptListResultModel = DeptItem[];
