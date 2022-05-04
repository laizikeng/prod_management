import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { setRoleStatus } from '/@/api/sys/role';
import { useMessage } from '/@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'role_name',
    width: 200,
  },
  {
    title: '角色值',
    dataIndex: 'remark',
    width: 180,
  },
  {
    title: '状态',
    dataIndex: 'is_enabled',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.is_enabled === 'Y',
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 'Y' : 'N';
          const { createMessage } = useMessage();
          setRoleStatus(record.id, newStatus)
            .then(() => {
              record.is_enabled = newStatus;
              createMessage.success(`已成功修改角色状态`);
            })
            .catch(() => {
              createMessage.error('修改角色状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
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
    field: 'role_name__icontains',
    label: '角色名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'is_enabled',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 'Y' },
        { label: '停用', value: 'N' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'role_name',
    label: '角色名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'remark',
    label: '角色值',
    required: true,
    component: 'Input',
  },
  {
    field: 'is_enabled',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 'Y',
    componentProps: {
      options: [
        { label: '启用', value: 'Y' },
        { label: '停用', value: 'N' },
      ],
    },
  },
  {
    label: ' ',
    field: 'menu',
    slot: 'menu',
    component: 'Input',
  },
];
