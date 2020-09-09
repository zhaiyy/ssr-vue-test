import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Item from '@/components/Item'

Vue.use(Router)

export function CreateRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
      },
      {
        path: '/ssr',
        name: 'Item',
        component: Item
      }
  ]
  })
}
