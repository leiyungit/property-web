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
