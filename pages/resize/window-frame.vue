<template lang="html">
  <div class="contain" :class="size">
    <h1>{{ size }}</h1>
    <img :src="`/transport/${size}.svg`" alt="">
  </div>
</template>

<script>
export default {
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
  mounted () {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
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
