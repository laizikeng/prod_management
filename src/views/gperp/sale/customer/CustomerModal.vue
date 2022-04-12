<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './customer.data';

  import { getCustomerList, createCustomer, updateCustomer } from '/@/api/sale/customer';
  import { CustomerCreateModal, CustomerUpdateModal } from '/@/api/sale/model/customerModel';

  export default defineComponent({
    name: 'CustomerModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      let id: number = -1;
      const isUpdate = ref(true);

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        console.log(data.record);

        if (unref(isUpdate)) {
          id = data.record.id;
          setFieldsValue({
            ...data.record,
          });
        }

        const treeData = await getCustomerList();
        console.log(treeData);
        updateSchema({
          field: 'parentDept',
          componentProps: { treeData },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增部门' : '编辑部门'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          if (isUpdate.value === false) {
            // create
            let params: CustomerCreateModal = {
              code: '',
              name: '',
              contact_name: '',
              contact_phone: '',
              contact_address: '',
              is_deleted: '',
            };
            params.code = values['code'];
            params.name = values['name'];
            params.contact_name = values['contact_name'];
            params.contact_phone = values['contact_phone'];
            params.contact_address = values['contact_address'];
            params.is_deleted = '';

            await createCustomer(params);
          } else {
            // update
            let params: CustomerUpdateModal = {
              code: '',
              name: '',
              contact_name: '',
              contact_phone: '',
              contact_address: '',
              is_deleted: '',
            };
            params.code = values['code'];
            params.name = values['name'];
            params.contact_name = values['contact_name'];
            params.contact_phone = values['contact_phone'];
            params.contact_address = values['contact_address'];
            params.is_deleted = '';

            await updateCustomer(id, params);
          }
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
