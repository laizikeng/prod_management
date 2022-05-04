export interface GoodsNameRecord {
  goods_id: number;
  goods_name: string;
}

export interface GoodsPriceRecord {
  operate_origin: number;
  order_type: number;
  order_id: number;
  order_name: string;
  goods_id: number;
  goods_name: string;
  operate_num: number;
  cost: number;
  stock_num: number;
  current_price: number;
  create_time: number;
  is_deleted: number;
  delete_time: number;
}

export interface PlanRecord {
  plan_id: number;
  plan_name: string;
  plan_cost: number;
  create_time: number;
  material_requirements: MaterialRequirementsRecord[];
}

export interface MaterialRequirementsRecord {
  order_id: number;
  order_name: string;
  goods_id: number;
  goods_name: string;
  num: number;
  price: number;
  cost: number;
}

export interface GoodsPricesResult {
  total: number;
  records: GoodsPriceRecord[];
}

export interface GoodsNameResult {
  records: GoodsNameRecord[];
}

export interface PlanResult {
  total: number;
  records: PlanRecord[];
}

export interface GoodsNameModal {
  keyword: string;
  start_time: number;
  end_time: number;
  offset: number;
  limit: number;
}

export interface GoodsPricesModal {
  goods_id: number;
  start_time: number;
  end_time: number;
  offset: number;
  limit: number;
}

export interface PlanModal {
  goods_id: number;
  start_time: number;
  end_time: number;
  offset: number;
  limit: number;
}
