import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '客户编号',
    dataIndex: 'code',
    width: 40,
    align: 'left',
  },
  {
    title: '客户名称',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '联系人姓名',
    dataIndex: 'contact_name',
    width: 50,
  },
  {
    title: '联系人电话',
    dataIndex: 'contact_phone',
    width: 70,
  },
  {
    title: '联系人地址',
    dataIndex: 'contact_address',
    width: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    width: 100,
  },
  {
    title: '创建人',
    dataIndex: 'created_by',
    width: 70,
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
    width: 100,
  },
  {
    title: '更新人',
    dataIndex: 'updated_by',
    width: 70,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'code',
    label: '客户编号',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'name',
    label: '客户名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'contact_name',
    label: '联系人姓名',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'code',
    label: '客户编码',
    component: 'Input',
    required: true,
  },
  {
    field: 'name',
    label: '客户名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'contact_name',
    label: '联系人姓名',
    component: 'Input',
    required: true,
  },
  {
    field: 'contact_phone',
    label: '联系人电话',
    component: 'Input',
    required: true,
  },
  {
    field: 'contact_address',
    label: '联系人地址',
    component: 'Input',
    required: true,
  },
];
