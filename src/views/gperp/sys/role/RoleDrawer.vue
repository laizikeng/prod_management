<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :fieldNames="{ title: 'title', key: 'id' }"
          checkable
          toolbar
          title="菜单分配"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { toRaw } from '@vue/reactivity';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeItem } from '/@/components/Tree';

  import { getMenuListAll } from '/@/api/sys/menu';
  import { createRole, updateRole } from '/@/api/sys/role';
  import { RoleCreateModal } from '/@/api/sys/model/roleModel';

  export default defineComponent({
    name: 'RoleDrawer',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      let id: number = -1;
      const isUpdate = ref(true);
      const treeData = ref<TreeItem[]>([]);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        if (unref(treeData).length === 0) {
          treeData.value = (await getMenuListAll()) as any as TreeItem[];
        }

        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          id = data.record.id;
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // TODO custom api
          let menu = toRaw(values['menu']);
          let menus = toRaw(treeData.value);
          let pks = [];
          getTreePks(menu, menus, pks);
          pks = Array.from(new Set(pks));

          if (isUpdate.value === false) {
            // create
            let params: RoleCreateModal = {
              role_name: '',
              remark: '',
              is_enabled: '',
              is_deleted: '',
              pks: '',
            };
            params.role_name = values['role_name'];
            params.remark = values['remark'];
            params.is_enabled = values['is_enabled'];
            params.is_deleted = '0';
            params.pks = pks.toString();
            await createRole(params);
          } else {
            // update
            let params: RoleCreateModal = {
              role_name: '',
              remark: '',
              is_enabled: '',
              is_deleted: '',
              pks: '',
            };
            params.role_name = values['role_name'];
            params.remark = values['remark'];
            params.is_enabled = values['is_enabled'];
            params.is_deleted = '0';
            params.pks = pks.toString();

            await updateRole(id, params);
          }

          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      function getTreePks(menu, menus, pks) {
        for (let i = 0; i < menu.length; i++) {
          let menu_list = menu[i].split('-');
          let menus_temp = menus;
          for (let j = 1; j < menu_list.length; j++) {
            pks.push(menus_temp[Number(menu_list[j])]['pk']);
            menus_temp = menus_temp[Number(menu_list[j])]['children'];
          }
        }
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        treeData,
      };
    },
  });
</script>
