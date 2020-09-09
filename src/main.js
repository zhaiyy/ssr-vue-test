import Vue from 'vue'
import App from './App'
import { CreateRouter } from './router'
import { createStore } from "./store";
import { sync } from "vuex-router-sync";
import TitleMixin from './mixin/title';

Vue.mixin(TitleMixin);

export function createApp () {
  const router = new CreateRouter()
  const store = createStore();

  // 同步路由状态(route state)到 store
  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}