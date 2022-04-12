<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增客户 </a-button>
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
    <CustomerModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { toRaw } from '@vue/reactivity';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getCustomerList, deleteCustomer } from '/@/api/sale/customer';
  import { useModal } from '/@/components/Modal';
  // import RoleDrawer from './RoleDrawer.vue';
  import CustomerModal from './CustomerModal.vue';

  import { columns, searchFormSchema } from './customer.data';

  import type { PaginationProps } from '/@/components/Table/src/types/pagination';

  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, CustomerModal, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload, getRawDataSource, setTableData, setPagination }] = useTable({
        title: '角色列表',
        api: getCustomerList,
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
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        let ids: string = '';
        ids = toRaw(record)['id'];
        deleteCustomer(ids).then(() => {
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
        registerModal,
        onFetchSuccess,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
