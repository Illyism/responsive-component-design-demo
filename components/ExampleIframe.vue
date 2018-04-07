<template lang="html">
  <div>
    <div
      class="orientation"
      @click="changeView"
    >
      <icon-orientation />
    </div>

    <div class="example-iframe">
      <div
        :data-url="`${width}px x ${height}px`"
        class="mockup"
        :class="classes"
      >
        <iframe
          :src="src"
          :style="{ width: `${width}px`, height: `${height}px` }"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: 'about:blank',
    },
    width: {
      type: [ Number, String ],
      default: 320,
    },
    height: {
      type: [ Number, String ],
      default: 540,
    },
  },
  data () {
    return {
      view: 3,
    }
  },
  computed: {
    classes () {
      const classes = {
        chrome__browser: this.width > 320,
        phone__browser: this.width <= 320,
      }
      classes[`view-${this.view}`] = true
      return classes
    },
  },
  methods: {
    changeView () {
      this.view++
      if (this.view > 3) this.view = 1
    },
  },
}
</script>

<style lang="css" scoped>
.example-iframe {
  perspective: 1000px;
}

iframe {
  margin: 0;
  border: 0;
  width: 100%;
  height: 100%;
}

.mockup {
  transition: background .5s ease-in-out, box-shadow .5s ease-in-out;
  &:after,
  &:before {
    transition: background-color .5s ease-in-out, box-shadow .5s ease-in-out;
  }
}

/*
  MINIMAL DESIGN
  based on the sleek design of Jacob Säwensten ( http://www.jacobsawensten.com/ )
  PDF: https://dribbble.com/shots/1460141-Free-minimal-browser-window/attachments/216671
*/
.chrome__browser {
  position:  relative;
  padding:  55px 0px 0px 0px;
  box-shadow:  0px 5px 10px rgba(0,0,0,0.1);
  font-family: sans-serif;
  color: #454545;
  border-radius: 3px;
  overflow-x: hidden;
}

/*
  INLINE SVG
  Color can be changed inline (search for %23, which equals #)
*/

.chrome__browser:before {
  content:  "";
  display:  block;
  position:  absolute;
  top:  -1px;
  left:  -1px;
  right:  -1px;
  height:  56px;
  border-bottom:  1px solid rgba(0,0,0,0.05);
  border-radius:  3px 3px 0px 0px;
  background: url('data:image/svg+xml;charset=utf-8,<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="minimal-browser-button" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g id="Ellipse_1"><g><circle fill-rule="evenodd" clip-rule="evenodd" fill="%23B3B3B3" cx="8" cy="8" r="5"/></g></g></svg>') 16px 22px no-repeat,
  url('data:image/svg+xml;charset=utf-8,<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="minimal-browser-button" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g id="Ellipse_1"><g><circle fill-rule="evenodd" clip-rule="evenodd" fill="%23B3B3B3" cx="8" cy="8" r="5"/></g></g></svg>') 32px 22px no-repeat,
  url('data:image/svg+xml;charset=utf-8,<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="minimal-browser-button" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g id="Ellipse_1"><g><circle fill-rule="evenodd" clip-rule="evenodd" fill="%23B3B3B3" cx="8" cy="8" r="5"/></g></g></svg>') 48px 22px no-repeat,
  url('data:image/svg+xml;charset=utf-8,<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="minimal-browser-settings" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g id="Menu_icon"><g><path fill-rule="evenodd" clip-rule="evenodd" fill="%23B3B3B3" d="M1,1v3h14V1H1z M1,10h14V7H1V10z M1,16h14v-3H1V16z"/></g></g></svg>')  right 16px top 22px no-repeat,
  #e8e8e8;
}

.chrome__browser:after {
  content:  attr(data-url);
  position:  absolute;
  padding:  2px 16px 0px 32px;
  top:  16px;
  height:  24px;
  left:  80px;
  right:  48px;
  border-radius:  3px;
  box-shadow:  inset 0 1px 1px -1px rgba(0,0,0,0.5);
  font-size:  12px;
  line-height:  24px;
  white-space:  nowrap;
  overflow:  hidden;
  text-overflow:  ellipsis;
  direction:  rtl;
  text-align:  left;
  background: url('data:image/svg+xml;charset=utf-8,<svg version="1.1" id="Refresh_icon_1_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><g id="minimal-browser-refresh"><g><path fill-rule="evenodd" clip-rule="evenodd" fill="%23B3B3B3" d="M12.5,10.9l2.5-3h-1.7C13.2,4.6,10.7,2,7.7,2C4.5,2,2,4.7,2,8c0,3.3,2.5,6,5.7,6c1.3,0,2.5-0.5,3.5-1.3l-1-1.1c-0.7,0.5-1.6,0.9-2.5,0.9c-2.3,0-4.2-2-4.2-4.5s1.9-4.5,4.2-4.5c2.3,0,4.2,1.9,4.2,4.4h-2L12.5,10.9z"/></g></g></svg>') 8px 6px no-repeat,
  #FFFFFF;
}

/* https://codepen.io/FelixRilling/pen/vLRNvb */
.phone__browser {
  position: relative;
  border: 40px solid #f8f8f8;
  border-width: 55px 7px;
  border-radius: 40px;
  margin: auto;

  &:before,
  &:after {
    content:  "";
    display:  block;
  }
}

.phone__browser:after,
.phone__browser:before {
  content:  "";
  display:  block;
  background: black;
  border-radius: 100%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
}

.phone__browser:after {
  background: white;
  width: 34px;
  height: 34px;
  bottom: -47px;
}

.phone__browser:before {
  background: linear-gradient(135deg, #303233 0%, #b5b7b9 50%, #f0f2f2 69%, #303233 100%);
  width: 36px;
  height: 36px;
  bottom: -48px;
}

.mockup.view-1 {
  transform: rotateX(50deg) rotateY(0deg) rotateZ(-50deg);
  box-shadow: -3px 3px 0 #BBB, -6px 6px 0 #BBB, -9px 9px 0 #BBB, -12px 12px 0 #BBB, -14px 10px 20px #666;
}

.mockup.view-2 {
  transform: rotateX(0deg) rotateY(-60deg) rotateZ(0deg);
  box-shadow: 5px 1px 0 #BBB, 9px 2px 0 #BBB, 12px 3px 0 #BBB, 15px 4px 0 #BBB, 0 7px 20px #999;
}

.mockup.view-3 {
  transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  box-shadow: 0px 3px 0 #BBB, 0px 4px 0 #BBB, 0px 5px 0 #BBB, 0px 7px 0 #BBB, 0px 10px 20px #666;
}

.orientation {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 20px;
  cursor: pointer;

  &:hover,
  &:focus {
    color: black;
  }
}

</style>
