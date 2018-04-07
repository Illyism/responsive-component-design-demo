<template>
  <div class="basic-example">

    <p>Basic chart component</p>

    <chart-frame />
  </div>
</template>

<script>
import ChartFrame from '~/pages/responsive/chart-frame'

export default {
  components: { ChartFrame },
}
</script>

<style lang="scss" scoped>
  .example {
    width: 800px !important;
    height: 400px !important;
  }
</style>
