<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { toRaw } from '@vue/reactivity';

  import { BasicTable, useTable } from '/@/components/Table';
  import { getGoodsPrices } from '/@/api/gperp/cost';

  import { columns, searchFormSchema } from './goodsPrices.data';

  import type { PaginationProps } from '/@/components/Table/src/types/pagination';

  export default defineComponent({
    name: 'GoodsPrices',
    components: { BasicTable },
    setup() {
      const [registerTable, { getRawDataSource, setTableData, setPagination }] = useTable({
        title: '获取货品的最新进价',
        api: getGoodsPrices,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          fieldMapToTime: [['rangeDate', ['startTime', 'endTime'], 'X']],
        },
        handleSearchInfoFn: (params: any) => {
          return {
            start_time: params ? params.start_time || 0 : 0,
            end_time: params ? params.end_time || 0 : 0,
            goods_id: params ? params.goods_id || 0 : 0,
          };
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        fetchSetting: {
          pageField: 'offset',
          sizeField: 'limit',
        },
        beforeFetch: (params: PaginationProps) => {
          const { offset, limit, startTime, endTime, goods_id } = params;
          return {
            offset: offset,
            limit: limit,
            start_time: startTime ? parseInt(startTime) || 0 : 0,
            end_time: endTime ? parseInt(endTime) || 0 : 0,
            goods_id: goods_id ? goods_id || 0 : 0,
          };
        },
      });

      function onFetchSuccess() {
        let r = toRaw(getRawDataSource());
        let recordsData = r['records'];
        setTableData(recordsData);
        var info: Partial<PaginationProps> = {};
        info.total = toRaw(getRawDataSource())['total'];
        setPagination(info);
      }

      return {
        registerTable,
        onFetchSuccess,
      };
    },
  });
</script>
