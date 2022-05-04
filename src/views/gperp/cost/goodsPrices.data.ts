import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getGoodsName } from '/@/api/gperp/cost';
import { Moment } from 'moment';

export const columns: BasicColumn[] = [
  {
    title: '订单id',
    dataIndex: 'order_id',
    width: 100,
  },
  {
    title: '订单名称',
    dataIndex: 'order_name',
    width: 180,
  },
  {
    title: '货品id',
    dataIndex: 'goods_id',
    width: 100,
  },
  {
    title: '货品名称',
    dataIndex: 'order_name',
    width: 180,
  },
  {
    title: '操作来源',
    dataIndex: 'operate_origin',
    width: 150,
    format: (value: string) => {
      const v = value as unknown as number;
      let rs = '';
      switch (v) {
        case 1:
          rs = '进仓';
          break;
        case 2:
          rs = '出仓';
          break;
        case 3:
          rs = '人为编辑';
          break;
      }
      return rs;
    },
  },
  {
    title: '订单类型',
    dataIndex: 'order_type',
    width: 100,
    format: (value: string) => {
      const v = value as unknown as number;
      let rs = '';
      switch (v) {
        case 1:
          rs = '进仓';
          break;
        case 2:
          rs = '出仓';
          break;
      }
      return rs;
    },
  },
  {
    title: '操作数量',
    dataIndex: 'operate_num',
    width: 100,
  },
  {
    title: '采购价格',
    dataIndex: 'cost',
    width: 180,
    format: (text: string) => {
      return '￥' + ((text as unknown as number) / 100).toFixed(2);
    },
  },
  {
    title: '仓库中货品的数量',
    dataIndex: 'stock_num',
    width: 180,
  },
  {
    title: '最新进价',
    dataIndex: 'current_price',
    width: 180,
    format: (value: string) => {
      return '￥' + ((value as unknown as number) / 100).toFixed(2);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    width: 180,
    format: (value: string) => {
      return (value as unknown as number)
        ? new Date((value as unknown as number) * 1000).toLocaleString()
        : '';
    },
  },
  {
    title: '是否被删除',
    dataIndex: 'is_deleted',
    width: 90,
    format: (value: string) => {
      return (value as unknown as number) === 1 ? '是' : '否';
    },
  },
  {
    title: '删除时间',
    dataIndex: 'delete_time',
    width: 180,
    format: (value: string) => {
      return (value as unknown as number)
        ? new Date((value as unknown as number) * 1000).toLocaleString()
        : '';
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'keyword',
    label: '货品名称',
    component: 'AutoComplete',
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      return {
        options: formModel.options,
        onChange: async (value) => {
          formModel.goods_id = 0;
          formModel.goods_name = '';
          if (!value || value == '' || value == ' ') return;
          const rs = await getGoodsName({
            keyword: value,
            start_time: 0,
            end_time: 0,
            offset: 1,
            limit: 100,
          });
          rs.records = rs.records.map((item) => {
            const rs = {
              value: item.goods_id + ' - ' + item.goods_name,
              goods_id: item.goods_id,
              goods_name: item.goods_name,
            };
            return rs;
          });
          formModel.options = rs.records;
        },
        onSelect: async (value, option) => {
          formModel.goods_id = option.goods_id;
          formModel.goods_name = option.goods_name;
          formModel.keyword = option.goods_name;
        },
      };
    },
    suffix: ({ model, field }) => {
      if (model['goods_id'] && model['goods_id'] != 0) {
        return model['goods_id'] + ' - ' + model['goods_name'];
      }
      return '';
    },
    colProps: { span: 8 },
  },
  {
    field: 'rangeDate',
    label: '起止日期',
    component: 'RangePicker',
    colProps: { span: 8 },
    componentProps: ({ schema, tableAction, formActionType, formModel }) => {
      return {
        onChange: (value: Moment[], dateString: string[]) => {
          console.log('Selected Time: ', value);
          console.log('Formatted Selected Time: ', dateString);
        },
      };
    },
  },
  {
    field: 'goods_id',
    label: 'goodsId',
    component: 'Input',
    show: false,
    colProps: { span: 8 },
  },
  {
    field: 'goods_name',
    label: 'goodsName',
    component: 'Input',
    show: false,
    colProps: { span: 8 },
  },
];
