<template lang="html">
  <div class="contain" :class="size" v-resize="handleResize">
    <h1 v-if="size === 'SM'">Small</h1>
    <h1 v-if="size === 'MD'">Medium</h1>
    <h1 v-if="size === 'LG'">Large</h1>
    <img v-if="size === 'SM'" src="/transport/SM.svg" alt="">
    <img v-if="size === 'MD'" src="/transport/MD.svg" alt="">
    <img v-if="size === 'LG'" src="/transport/LG.svg" alt="">
  </div>
</template>

<script>
import resize from '~/plugins/vue-resize-directive'

export default {
  directives: { resize },
  data () {
    return {
      documentWidth: 0,
      documentHeight: 0,
    }
  },
  computed: {
    size () {
      const width = this.documentWidth
      if (width < 400) return 'SM'
      if (width < 800) return 'MD'
      return 'LG'
    },
  },
  methods: {
    handleResize () {
      this.documentWidth = document.body.clientWidth
      this.documentHeight = document.body.clientHeight
      // computed will kick in!
    },
  },
}
</script>

<style lang="scss" scoped>
  @import "assets/resize-example.scss";
</style>
