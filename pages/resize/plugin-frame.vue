<template lang="html">
  <div class="contain" :class="size">
    <h1 v-if="$mq.SM">Small</h1>
    <h1 v-if="$mq.MD">Medium</h1>
    <h1 v-if="$mq.LG">Large</h1>
    <img v-if="$mq.SM" src="/transport/SM.svg" alt="">
    <img v-if="$mq.MD" src="/transport/MD.svg" alt="">
    <img v-if="$mq.LG" src="/transport/LG.svg" alt="">
  </div>
</template>

<script>
export default {
  mq: {
    SM: '(max-width: 400px)',
    MD: '(max-width: 800px) and (min-width: 401px)',
    LG: '(min-width: 801px)',
  },
  computed: {
    size () {
      if (process.browser) {
        return this.$mq ? this.$mq.all[0] : 'LG'
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "assets/resize-example.scss";
</style>
