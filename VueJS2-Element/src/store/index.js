import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: []
  },
  getters: {
    data: state => state.data
  },
  mutations: {
    SET_DATA: (state, data) => {
      state.data = data
    }
  },
  actions: {
  },
  modules: {
  }
})
