const threeStep = {
    state: {
        cellMessage: []
    },
    mutations: {
        SET_TITLE(state, payload) {
            state.cellMessage = payload.cellMessage
        }
    },
    getters: {},
    actions: {}
}
export default threeStep
