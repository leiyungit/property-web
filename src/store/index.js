import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

// default router permission control
import permission from './modules/permission'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'
import oneStep from './modules/oneStep'
import twoStep from './modules/twoStep'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    oneStep,
    twoStep
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
