
const oneStep = {
    state: {
        buildingNumber: '',
        estateCode: ''
    },
    mutations: {
        SET_TITLE(state, payload) {
            console.log('楼宇数量:  ' + payload.buildingNumber)
            state.estateCode = payload.estateCode
            state.buildingNumber = payload.buildingNumber
        }
    },
    getters: {},
    actions: {}
}
export default oneStep
