<template>
  <div>
    <!-- <a-form-model ref="ruleForm" :model="form2" :label-col="labelCol" :wrapper-col="wrapperCol"> -->
    <a-row class="header">
      选择楼宇:
      <a-select style="width:80px" v-model="form2.buildingCode" @change="changeBuliding" >
        <a-select-option
            v-for="(item, index) in selectBuilding"
            :key="index"
            :value="item.buildingCode">{{item.buildingName}}
        </a-select-option>

      </a-select>选择单元:
      <a-select style="width:100px" v-model="form2.unitCode" @change="changeUnit">
          <a-select-option
            v-for="(item, index) in selectUnit"
            :key="index"
            :value="item.unitCode">{{item.unitName}}
          </a-select-option>
      </a-select>
      建筑面积:
      <a-input style="width: 40px;padding: 0;text-align: center;"></a-input>
      使用面积:
      <a-input style="width: 40px;padding: 0;text-align: center;"></a-input>
    </a-row>
    <a-row>
      <a-table :columns="columns" :dataSource="data" bordered align="center">
        <template
          v-for="col in [
            'floorNumber',
            'unitCode',
            'cellCode',
            'cellName',
            'cellBuildArea',
            'cellUsedArea',
            'remark'
          ]"
          :slot="col"
          slot-scope="text, record"
        >
          <div :key="col">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
            <template v-else>{{ text }}</template>
          </div>
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span v-if="record.editable">
              <a @click="() => save(record.key)">保存</a>&nbsp;
              <a-popconfirm title="确认取消吗?" @confirm="() => cancel(record.key)">
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a :disabled="editingKey !== ''" @click="() => edit(record.key)">编辑</a>
            </span>
          </div>
        </template>
      </a-table>
      <a-row>
        <a-button type="primary" @click="prevStep()">上一步</a-button>&nbsp;
        <a-button type="primary" @click="nextStep()">下一步</a-button>
      </a-row>
    </a-row>
  </div>
</template>

<script>
import { selectCell, updateCell, updateBatchCell, findSelectBuildingByEstateCode, findUnitByBuildingCode, findCellByUnitCode } from '@/api/estate'

const columns = [
    {
        align: 'center',
        title: '楼层数',
        dataIndex: 'floorNumber',
        width: '6%',
        scopedSlots: { customRender: 'floorNumber' }
    },
    {
        align: 'center',
        title: '单元编码',
        dataIndex: 'unitCode',
        width: '6%',
        scopedSlots: { customRender: 'unitCode' }
    },
    {
        align: 'center',
        title: '房间编码',
        dataIndex: 'cellCode',
        width: '6%',
        scopedSlots: { customRender: 'cellCode' }
    },
    {
        align: 'center',
        title: '房间名称',
        dataIndex: 'cellName',
        width: '6%',
        scopedSlots: { customRender: 'cellName' }
    },
    {
        align: 'center',
        title: '建筑面积',
        dataIndex: 'cellBuildArea',
        width: '6%',
        scopedSlots: { customRender: 'cellBuildArea' }
    },
    {
        align: 'center',
        title: '使用面积',
        dataIndex: 'cellUsedArea',
        width: '7%',
        scopedSlots: { customRender: 'cellUsedArea' }
    },
    {
        align: 'center',
        title: '备注',
        dataIndex: 'remark',
        width: '38%',
        scopedSlots: { customRender: 'remark' }
    },
    {
        align: 'center',
        title: '编辑',
        width: '7%',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' }
    }
]

const data = []

export default {
    name: 'Step4',
    data() {
        return {
            labelCol: { span: 2 },
            wrapperCol: { span: 1 },
            form2: {
                name: '',
                buildingCode: '',
                unitCode: '',
                date1: undefined,
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            data,
            columns,
            editingKey: '',
            selectBuilding: [],
            selectUnit: []
        }
    },
    created() {
        const params = this.$store.state.threeStep.cellMessage
        // console.log(params)
        selectCell(params).then(res => {
            // console.log(res)
            const mydata = []
            for (let i = 0; i < res.result.length; i++) {
                const m = res.result[i]
                mydata.push({
                    key: m.id,
                    floorNumber: m.floorNumber,
                    unitCode: m.unitCode,
                    cellCode: m.cellCode,
                    cellName: m.cellName,
                    cellBuildArea: m.cellBuildArea,
                    cellUsedArea: m.cellUsedArea,
                    remark: ''
                })
            }
            this.data = mydata
            // console.log(data)
            this.cacheData = this.data.map(item => ({ ...item }))
            // console.log(this.cacheData)
        }).catch(err => {
            setTimeout(this.$notification.error({
                message: '异常',
                description: err.message
            }), 1000)
        })
        const param = { estateCode: this.$store.state.threeStep.estateCode }
        findSelectBuildingByEstateCode(param).then(res => {
            console.log(res)
            this.selectBuilding = res.result
        })
    },
    methods: {
        nextStep() {
            const newData = this.data
            for (let index = 0; index < newData.length; index++) {
                newData[index].id = newData[index].key
            }
            updateBatchCell(newData).then(res => {
                if (res.result > 0) {
                    this.$notification.success({
                        message: '成功'
                        // description: '' // res.message
                    })
                    this.$emit('nextStep')
                } else {
                    this.$notification.error({
                        message: '失败'
                        // description: res.message
                    })
                }
            }).catch(err => {
                setTimeout(this.$notification.error({
                    message: '异常',
                    description: err.message
                }), 1000)
            })
        },
        prevStep() {
            this.$emit('prevStep')
        },
        handleChange(value, key, column) {
            const newData = [...this.data]
            const target = newData.filter(item => key === item.key)[0]
            if (target) {
                target[column] = value
                this.data = newData
            }
        },
        edit(key) {
            const newData = [...this.data]
            const target = newData.filter(item => key === item.key)[0]
            this.editingKey = key
            if (target) {
                target.editable = true
                this.data = newData
            }
        },
        save(key) {
            console.log(key)
            const newData = [...this.data]
            const newCacheData = [...this.cacheData]
            const target = newData.filter(item => key === item.key)[0]
            const targetCache = newCacheData.filter(item => key === item.key)[0]
            if (target && targetCache) {
                delete target.editable
                this.data = newData
                Object.assign(targetCache, target)
                this.cacheData = newCacheData
                this.editingKey = ''
            }
            target.id = target.key
            updateCell(target).then(res => {
                if (res.result === 1) {
                    this.$notification.success({
                        message: '成功'
                        // description: '' // res.message
                    })
                } else {
                    this.$notification.error({
                        message: '失败'
                        // description: res.message
                    })
                }
            }).catch(err => {
                setTimeout(this.$notification.error({
                    message: '异常',
                    description: err.message
                }), 1000)
            })
        },
        cancel(key) {
            const newData = [...this.data]
            const target = newData.filter(item => key === item.key)[0]
            this.editingKey = ''
            if (target) {
                Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
                delete target.editable
                this.data = newData
            }
        },
        changeBuliding(val) {
            console.log(val)
            const param = { buildingCode: this.form2.buildingCode }
            findUnitByBuildingCode(param).then(res => {
                this.selectUnit = res.result
                if (this.selectUnit.length > 0) {
                    console.log(this.selectUnit[0].unitCode)
                    this.form2.unitCode = this.selectUnit[0].unitCode
                    this.changeUnit()
                }
            })
        },
        changeUnit(val) {
            console.log(val)
            findCellByUnitCode({ unitCode: this.form2.unitCode }).then(res => {
                const mydata = []
                for (let i = 0; i < res.result.length; i++) {
                    const m = res.result[i]
                    mydata.push({
                        key: m.id,
                        floorNumber: m.floorNumber,
                        unitCode: m.unitCode,
                        cellCode: m.cellCode,
                        cellName: m.cellName,
                        cellBuildArea: m.cellBuildArea,
                        cellUsedArea: m.cellUsedArea,
                        remark: ''
                    })
                }
                this.data = mydata
                // console.log(data)
                this.cacheData = this.data.map(item => ({ ...item }))
                // console.log(this.cacheData)
            })
        }
    },
    beforeDestroy() {
        //  clearTimeout(this.timer)
    }
}
</script>

<style lang="less" scoped>
.stepFormText {
    margin-bottom: 24px;

    .ant-form-item-label,
    .ant-form-item-control {
        line-height: 22px;
    }
}
</style>
