export interface CustomerSearchParam {}

export interface CustomerResult {
  count: any;
  results: string[];
}

export interface CustomerCreateModal {
  code: string;
  name: string;
  contact_name: string;
  contact_phone: string;
  contact_address: string;
  is_deleted: string;
}

export interface CustomerUpdateModal {
  code: string;
  name: string;
  contact_name: string;
  contact_phone: string;
  contact_address: string;
  is_deleted: string;
}

/*
 * @description: Get customer return value
 */
export type getCustomerListResultModel = CustomerResult;
