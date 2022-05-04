import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: '图标',
    dataIndex: 'count',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: '组件',
    dataIndex: 'component',
    width: 200,
  },
  {
    title: '路由地址',
    dataIndex: 'path',
    width: 200,
  },
  {
    title: '排序',
    dataIndex: 'order',
    width: 50,
  },
  {
    title: '状态',
    dataIndex: 'is_enabled',
    width: 80,
    customRender: ({ record }) => {
      const is_enabled = record.is_enabled;
      const enable = is_enabled === 'Y';
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '创建人',
    dataIndex: 'created_by',
    width: 180,
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    width: 180,
  },
  {
    title: '更新人',
    dataIndex: 'updated_by',
    width: 180,
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'is_enabled',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'type',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '菜单', value: '0' },
        { label: '按钮', value: '1' },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'path',
    label: '路由地址',
    component: 'Input',
    required: true,
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    required: false,
  },
  {
    field: 'redirect',
    label: '重定向地址',
    component: 'Input',
  },
  {
    field: 'is_cache',
    label: '是否缓存',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '否', value: '0' },
        { label: '是', value: '1' },
      ],
    },
  },
  {
    field: 'is_enabled',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 'Y',
    componentProps: {
      options: [
        { label: '启用', value: 'Y' },
        { label: '禁用', value: 'N' },
      ],
    },
  },
  {
    field: 'is_outer_chain',
    label: '是否外链',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '否', value: '0' },
        { label: '是', value: '1' },
      ],
    },
  },
  {
    field: 'is_show',
    label: '是否显示',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '是', value: '0' },
        { label: '否', value: '1' },
      ],
    },
  },
  {
    field: 'order',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
];
