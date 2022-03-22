<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { toRaw } from '@vue/reactivity';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import { getMenuList, createMenu, updateMenu } from '/@/api/sys/menu';

  export default defineComponent({
    name: 'MenuDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const record = ref('');

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        record.value = data?.record;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
        const treeData = await getMenuList();
        updateSchema([
          { field: 'type', show: unref(isUpdate) },
          {
            field: 'parentMenu',
            componentProps: { treeData },
          },
        ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

      async function handleSubmit() {
        try {
          // 此处分三种情况
          // 1.创建顶级节点 --- isUpdate: false, toRaw(record.value)['pk']: undefined
          // 2.创建其他节点 --- isUpdate: false, toRaw(record.value)['pk']: number
          // 3.更新节点 -- isUpdate: true
          if (isUpdate.value === false) {
            const values = await validate();
            setDrawerProps({ confirmLoading: true });
            toRaw(record.value)['pk'] === undefined
              ? (values['pid'] = 1)
              : (values['pid'] = toRaw(record.value)['pk']);
            await createMenu(values);
            closeDrawer();
            emit('success');
          } else {
            const values = await validate();
            setDrawerProps({ confirmLoading: true });
            values['pid'] = toRaw(record.value)['pid'];
            await updateMenu(toRaw(record.value)['pk'], values);

            closeDrawer();
            emit('success');
          }
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
