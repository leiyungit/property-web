const twoStep = {
    state: {
        buildingCodeCount: '',
        estateCode: ''
    },
    mutations: {
        SET_TITLE(state, payload) {
            state.buildingCodeCount = payload.buildingCodeCount
            state.estateCode = payload.estateCode
        }
    },
    getters: {},
    actions: {}
}
export default twoStep
