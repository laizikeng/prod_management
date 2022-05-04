<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增菜单 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:file-add-outlined',
              onClick: handleCreate.bind(null, record),
            },
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
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { toRaw } from '@vue/reactivity';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getMenuListAll } from '/@/api/sys/menu';

  import { useDrawer } from '/@/components/Drawer';
  import MenuDrawer from './MenuDrawer.vue';
  import { PageWrapper } from '/@/components/Page';

  import { columns, searchFormSchema } from './menu.data';

  import { deleteMenu } from '/@/api/sys/menu';

  export default defineComponent({
    name: 'MenuManagement',
    components: { BasicTable, PageWrapper, MenuDrawer, TableAction },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '菜单列表',
        api: getMenuListAll,
        columns,
        formConfig: {
          labelWidth: 200,
          schemas: searchFormSchema,
        },
        isTreeTable: true,
        striped: false,
        // useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: true,
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: 'right',
        },
      });

      function handleCreate(record: Recordable) {
        openDrawer(true, {
          record,
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
        ids = toRaw(record)['pk'];
        console.log(ids);
        deleteMenu(ids).then(() => {
          reload();
        });
      }

      function handleSuccess() {
        reload();
      }

      function onFetchSuccess() {
        // 演示默认展开所有表项
        // nextTick(expandAll);
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        onFetchSuccess,
      };
    },
  });
</script>
