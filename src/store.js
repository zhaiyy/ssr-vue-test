// store.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = {
    state: {
        items: {}
      },
      actions: {
        fetchItem ({ commit }, title) {
          // `store.dispatch()` 会返回 Promise，
          // 以便我们能够知道数据在何时更新

          commit('setItem', { item: { title } })
        }
      },
      mutations: {
        setItem (state, { item }) {
          state.items = Object.assign({}, item)
        }
      }
}

export function createStore () {
  return new Vuex.Store(store)
}