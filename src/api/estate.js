import {
    axios
} from '@/utils/request'

const QS = require('qs')

export function selectCompany() {
    return axios({
        url: '/estate/findCompany',
        method: 'get'
    })
}

export function insertEstate(parameter) {
    return axios({
        url: '/estate/insertEstate',
        method: 'post',
        data: parameter
    })
}

export function findEstate() {
    return axios({
        url: '/estate/findEstate',
        method: 'get'
    })
}

export function selectEstateByCompany(parameter) {
    return axios({
        url: '/estate/selectEstateByCompany',
        method: 'post',
        data: QS.stringify(parameter)
    })
}

export function selectBuilding(parameter) {
    return axios({
        url: '/estate/selectBuilding',
        method: 'post',
        data: QS.stringify(parameter)
    })
}

export function updateBuilding(parameter) {
    return axios({
        url: '/estate/updateBuilding',
        method: 'post',
        data: QS.stringify(parameter)
    })
}

export function updateBatchBuilding(parameter) {
    // console.log(QS.parse(parameter))
    return axios({
        url: '/estate/updateBatchBuilding',
        method: 'post',
        // contentType: 'application/json',
        headers: {
            'Content-Type': 'application/json'
        },
        // [{"key":149,"buildingCode":"B-0","buildingName":"0幢"},{"key":150,"buildingCode":"B-1","buildingName":"1幢"}]
        data: JSON.stringify(parameter)
        // data: QS.stringify(parameter, {
        //     arrayFormat: 'repeat' // , allowDots: true
        // })
    })
}

export function findSelectBuildingByEstateCode(parameter) {
    return axios({
        url: '/estate/findSelectBuildingByEstateCode',
        method: 'post',
        data: QS.stringify(parameter)
    })
}

export function findUnitByBuildingCode(parameter) {
    return axios({
        url: '/estate/findUnitByBuildingCode',
        method: 'post',
        data: QS.stringify(parameter)
    })
}

export function selectUnit(parameter) {
    return axios({
        url: '/estate/selectUnit',
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function updateUnit(parameter) {
    return axios({
        url: '/estate/updateUnit',
        method: 'post',
        data: QS.stringify(parameter)
    })
}

export function updateBatchUnit(parameter) {
    return axios({
        url: '/estate/updateBatchUnit',
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function selectCell(parameter) {
    return axios({
        url: '/estate/selectCell',
        method: 'post',
        data: JSON.stringify(parameter),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function findCellByUnitCode(parameter) {
    return axios({
        url: '/estate/findCellByUnitCode',
        method: 'post',
        data: QS.stringify(parameter)
    })
}

export function updateCell(parameter) {
    return axios({
        url: '/estate/updateCell',
        method: 'post',
        data: QS.stringify(parameter)
    })
}

export function updateBatchCell(parameter) {
    return axios({
        url: '/estate/updateBatchCell',
        method: 'post',
        data: JSON.stringify(parameter),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// 住宅维护 data的方式必须写post
export function findBuildingByEstateCode(parameter) {
    console.log(QS.stringify(parameter))
    return axios({
        url: '/estate/findBuildingByEstateCode',
        method: 'post',
        data: QS.stringify(parameter)
    })
}
