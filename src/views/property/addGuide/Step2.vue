<template>
  <div>
    <!-- <a-form-model ref="ruleForm" :model="form2" :label-col="labelCol" :wrapper-col="wrapperCol"> -->
    <a-row class="header">
      楼宇数量:
      <span style="color: blue;font-weight: 700;">{{ this.$store.state.oneStep.buildingNumber }}</span>
      单元数量:
      <!-- <a-form-model-item label="单元数量：" prop="region" class="units" :labelCol="labelCol" :wrapperCol="wrapperCol"> -->
      <a-select v-model="form2.chUnitCount" @change="changeUnitCount">
        <a-select-option value="1">1</a-select-option>
        <a-select-option value="2">2</a-select-option>
        <a-select-option value="3">3</a-select-option>
        <a-select-option value="4">4</a-select-option>
      </a-select>
      封顶日期：
      <a-date-picker v-model="form2.chOverRoofDate" style="width:110px" :format="dateFormat" @change="changeOverRoofDate" />
      竣工日期：
      <a-date-picker v-model="form2.chFinishDate" style="width:110px" :format="dateFormat" @change="changeFinishDate" />
      <!-- </a-form-model-item> -->
    </a-row>
    <a-row>
      <a-table :columns="columns" :dataSource="data" bordered align="center">
        <template
          v-for="col in [
            'buildingCode',
            'buildingName',
            'unitCount',
            'overRoofDate',
            'finishDate',
            'salePermissionId',
            'buildPermissionId',
            'buildArea',
            'usedArea',
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
              <a @click="() => save(record.key)">保存</a>
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
        <a-button type="primary" @click="prevStep()">上一步</a-button>
        <a-button type="primary" @click="nextStep()" style="margin-left: 10px;" >下一步</a-button>
      </a-row>
    </a-row>
  </div>
</template>

<script>
import { selectBuilding, updateBuilding, updateBatchBuilding } from '@/api/estate'
// const QS = require('qs')

const columns = [
    {
        align: 'center',
        title: '楼宇编码',
        dataIndex: 'buildingCode',
        width: '6%',
        scopedSlots: { customRender: 'buildingCode' }
    },
    {
        align: 'center',
        title: '楼宇名称',
        dataIndex: 'buildingName',
        width: '15%',
        scopedSlots: { customRender: 'buildingName' }
    },
    {
        align: 'center',
        title: '单元数量',
        dataIndex: 'unitCount',
        width: '6%',
        scopedSlots: { customRender: 'unitCount' }
    },
    {
        align: 'center',
        title: '封顶日期',
        dataIndex: 'overRoofDate',
        width: '7%',
        scopedSlots: { customRender: 'overRoofDate' }
    },
    {
        align: 'center',
        title: '竣工日期',
        dataIndex: 'finishDate',
        width: '7%',
        scopedSlots: { customRender: 'finishDate' }
    },
    {
        align: 'center',
        title: '预售许可证',
        dataIndex: 'salePermissionId',
        width: '7%',
        scopedSlots: { customRender: 'salePermissionId' }
    },
    {
        align: 'center',
        title: '建筑许可证',
        dataIndex: 'buildPermissionId',
        width: '7%',
        scopedSlots: { customRender: 'buildPermissionId' }
    },
    {
        align: 'center',
        title: '建筑面积',
        dataIndex: 'buildArea',
        width: '6%',
        scopedSlots: { customRender: 'buildArea' }
    },
    {
        align: 'center',
        title: '使用面积',
        dataIndex: 'usedArea',
        width: '6%',
        scopedSlots: { customRender: 'usedArea' }
    },
    {
        align: 'center',
        title: '备注',
        dataIndex: 'remark',
        width: '10%',
        scopedSlots: { customRender: 'remark' }
    },
    {
        align: 'center',
        title: '编辑',
        width: '4%',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' }
    }
]

const data = []

export default {
    name: 'Step2',
    data() {
        return {
            labelCol: { span: 2 },
            wrapperCol: { span: 1 },
            form2: {
                name: '',
                chUnitCount: undefined,
                date1: undefined,
                delivery: false,
                type: [],
                resource: '',
                desc: '',
                chOverRoofDate: '',
                chFinishDate: ''
            },
            data,
            columns,
            editingKey: '',
            dateFormat: ['YYYY-MM-DD']
            // labelCol: { lg: { span: 5 }, sm: { span: 5 } },
            // wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
            // form: this.$form.createForm(this),
            // loading: false,
            // timer: 0
        }
    },
    created() {
        const senData = {
            buildingNumber: this.$store.state.oneStep.buildingNumber,
            estateCode: this.$store.state.oneStep.estateCode
        }
        selectBuilding(senData)
        .then(res => {
            console.log(res)
            // const list = QS.parse(res.result)
            const result = res.result
            for (let i = 0; i < result.length; i++) {
                var building = result[i]
                data.push({
                    key: building.id,
                    buildingCode: building.buildingCode,
                    buildingName: building.buildingName,
                    unitCount: building.unitCount,
                    overRoofDate: building.overRoofDate, // .format('YYYY-MM-DD'),
                    finishDate: building.finishDate, // .format('YYYY-MM-DD'),
                    salePermissionId: building.salePermissionId,
                    buildPermissionId: building.buildPermissionId,
                    buildArea: building.buildArea,
                    usedArea: building.usedArea,
                    remark: building.remark
                })
            }
            this.cacheData = data.map(item => ({ ...item }))
        }).catch(err => {
            console.log(err)
        })
    },
    methods: {
        nextStep() {
            // console.log(data)
            // console.log(JSON.stringify(this.data))
            JSON.stringify(this.data)
            const newData = this.data
            for (let index = 0; index < newData.length; index++) {
                const element = newData[index]
                element.id = element.key
                element.estateCode = this.$store.state.oneStep.estateCode
            }
             console.log(newData)
            updateBatchBuilding(newData)
                .then(res => {
                    console.log(res)
                    if (res.result > 0) {
                        this.$emit('nextStep')
                    }
                }).catch(err => {
                    console.log(err)
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
                this.editingKey = ''
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
            }
            // 需要对列表行数据 赋值主键id，和楼宇编码
            target.id = target.key
            target.estateCode = this.$store.state.oneStep.estateCode
            console.log(target)
            updateBuilding(target)
                .then(res => {
                    console.log(res)
                    // const list = QS.parse(res.result)
                    if (res.result === 1) {
                        this.$notification.success({
                            message: '成功',
                            description: res.message
                        })
                    } else {
                        this.$notification.error({
                            message: '失败',
                            description: res.message
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
        changeUnitCount() {
            console.log(this.form2.chUnitCount)
            for (let i = 0; i < data.length; i++) {
                data[i].unitCount = this.form2.chUnitCount
            }
        },
        changeOverRoofDate() {
            console.log(this.form2.chOverRoofDate)
            if (!this.form2.chOverRoofDate) return false
            for (let i = 0; i < data.length; i++) {
                data[i].overRoofDate = this.form2.chOverRoofDate.format('YYYY-MM-DD')
            }
        },
        changeFinishDate() {
            console.log(this.form2.chFinishDate)
            if (!this.form2.chFinishDate) return false
            for (let i = 0; i < data.length; i++) {
                data[i].finishDate = this.form2.chFinishDate.format('YYYY-MM-DD')
            }
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
