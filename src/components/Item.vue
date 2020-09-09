<!-- Item.vue -->
<template>
  <div>{{ item.title }} </div>
</template>

<script>
export default {
  title () {
    return this.item.title
  },
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('fetchItem', 'store title')
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item () {
      return this.$store.state.items
    }
  }
}
</script>