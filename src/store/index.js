import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    list: []
  },
  mutations: {
    setList (state, data) {
      state.list = data;
    },
    setCount (state, data) {
      state.count = data;
    }
  }
})

export default store
