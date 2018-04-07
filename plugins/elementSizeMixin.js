if (process.browser) {
  module.exports = {
    mounted () {
      window.addEventListener('resize', this._elementResize)
      this._elementResize()
    },
    beforeDestroy () {
      window.removeEventListener('resize', this._elementResize)
    },
    data () {
      return {
        size: {
          width: 0,
          height: 0,
        },
      }
    },
    methods: {
      _elementResize () {
        this.size.width = this.$el.clientWidth
        this.size.height = this.$el.clientHeight
      },
    },
  }
} else {
  module.exports = {
    data () {
      return {
        size: {
          width: 0,
          height: 0,
        },
      }
    },
  }
}
