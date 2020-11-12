<template>
  <div>
    <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <template slot="operation" slot-scope="text, record">
        <a href="javascript:;" @click="seemqintain(text, record)">查看楼宇</a>
      </template>
    </a-table>
  </div>
</template>

<script>
import { findEstate } from '@/api/estate'

const columns = [
    {
        title: '所属公司',
        dataIndex: 'company',
        scopedSlots: { customRender: 'company' }
    },
    {
        title: '住宅编码',
        dataIndex: 'estateCode'
    },
    {
        title: '住宅名称',
        dataIndex: 'estateName'
    },
    {
        title: '地址',
        dataIndex: 'estateAddr'
    },
    {
        align: 'center',
        title: '编辑',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' }
    }
]
const data = []

export default {
    name: 'Houseinformation',
    props: {
        activeKey: {
            type: Object,
            default: () => {
                return {
                    defaultKey: '1'
                }
            }
        }
    },
    data() {
        return {
            data,
            columns
        }
    },
    computed: {
        rowSelection() {
            // eslint-disable-next-line no-unused-vars
            const { selectedRowKeys } = this
            return {
                onChange: (selectedRowKeys, selectedRows) => {
                    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
                }
            }
        }
    },
    created() {
        findEstate().then(res => {
            console.log(res)
            for (let index = 0; index < res.result.length; index++) {
                const m = res.result[index]
                data.push({
                    key: m.id,
                    company: m.company,
                    estateCode: m.estateCode,
                    estateName: m.estateName,
                    estateAddr: m.estateAddr
                })
            }
        })
    },
    methods: {
        seemqintain(text, record) {
            this.activeKey.defaultKey = '2'
            console.log(text, record)
            this.$emit('set-houseinformation', record.estateName)
        }
    }
}
</script>
