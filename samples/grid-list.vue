<script>
// https://github.com/Illyism/responsive-component-design-demo/blob/master/components/ListCell.vue
const elementSizeMixin = require('~/plugins/elementSizeMixin')

export default {
  mixins: [ elementSizeMixin ],
  computed: {
    listClasses () {
      // our classes are based on this element's size!
      // not the browser window!
      if (!this.size) return {}
      return {
        phone: this.size.width < 480,
        tablet: this.size.width < 800,
      }
    },
  },
}
</script>
