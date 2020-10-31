import {
    axios
} from '@/utils/request'

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
