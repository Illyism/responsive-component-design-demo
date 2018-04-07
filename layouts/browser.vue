<template>
  <div
    v-resize="handleResize"
    class="browser"
  >
    <div class="inputs">
      <input
        v-model="width"
        :max="maxWidth"
        type="range"
        min="320"
        class="input-range"
      >

      <input
        v-model="height"
        :max="maxHeight"
        type="range"
        min="200"
        class="input-range"
      >
    </div>

    <nuxt-link
      :to="frameURL"
      class="fullscreen-btn"
    >
      <icon-fullscreen />
    </nuxt-link>

    <example-iframe
      ref="exampleFrame"
      :src="frameURL"
      :width="width"
      :height="height"
      :style="styles"
      class="example"
    />
    <nuxt/>
  </div>
</template>

<script>
import resize from '~/plugins/vue-resize-directive'
import ExampleIframe from '~/components/ExampleIframe'

export default {
  directives: { resize },
  components: {
    ExampleIframe,
  },
  data () {
    return {
      width: this.maxSize,
      height: this.maxHeight,
      wrapWidth: process.browser ? document.body.clientWidth : 1680,
      wrapHeight: process.browser ? document.body.clientHeight : 400,
    }
  },
  computed: {
    frameURL () {
      const [ category, name ] = this.$route.path.split('/').filter(x => x)
      return `/${category}/${name}-frame/`
    },
    styles () {
      if (this.wrapWidth < 600) {
        const scale = (this.wrapWidth - 20) / this.width
        return {
          transform: `scale(${scale})`,
        }
      }
    },
    maxWidth () {
      if (process.browser) {
        if (this.wrapWidth < 600) {
          return 1080
        }
        return this.wrapWidth - 20
      } else {
        return 1680
      }
    },
    maxHeight () {
      if (process.browser) {
        if (this.wrapHeight < 600) {
          return 800
        }
        return this.wrapHeight - 120
      } else {
        return 400
      }
    },
  },
  methods: {
    handleResize () {
      this.wrapWidth = document.body.clientWidth
      this.wrapHeight = document.body.clientHeight
      if (this.width > this.maxWidth) this.width = this.maxWidth
      if (this.height > this.maxHeight) this.height = this.maxHeight
    },
  },
}
</script>

<style>
  .inputs {
    display: flex;
    width: 100%;
    height: 30px;
    line-height: 30px;
  }

  .input-range {
    flex: 1;
    box-sizing: border-box;
    width: 100%;
    margin: 0 10px;
    padding: 10px;
  }

  .fullscreen-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 20px;
    cursor: pointer;
    color: #D2D3DE;

    &:hover,
    &:focus {
      color: black;
    }
  }

  .example {
    transform-origin: top;
  }
</style>
