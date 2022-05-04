<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { toRaw } from '@vue/reactivity';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getRoleList } from '/@/api/sys/role';

  import { useDrawer } from '/@/components/Drawer';
  import RoleDrawer from './RoleDrawer.vue';

  import { columns, searchFormSchema } from './role.data';

  import type { PaginationProps } from '/@/components/Table/src/types/pagination';

  import { deleteRole } from '/@/api/sys/role';

  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, RoleDrawer, TableAction },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload, getRawDataSource, setTableData, setPagination }] = useTable({
        title: '角色列表',
        api: getRoleList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        let ids: string = '';
        ids = toRaw(record)['id'];
        deleteRole(ids).then(() => {
          reload();
        });
      }

      function handleSuccess() {
        reload();
      }

      function onFetchSuccess() {
        let roleData = toRaw(getRawDataSource())['results'];
        setTableData(roleData);
        var info: Partial<PaginationProps> = {};
        info.total = toRaw(getRawDataSource())['count'];
        setPagination(info);
      }

      return {
        registerTable,
        registerDrawer,
        onFetchSuccess,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
