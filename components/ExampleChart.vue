<template lang="html">
  <div
    ref="container"
    class="chart__container"
  >
    <svg
      ref="chart"
      class="example-chart"
    />
  </div>
</template>

<script>
const d3 = Object.assign({},
  require('d3-selection'),
  require('d3-scale'),
  require('d3-array'),
  require('d3-shape'),
  require('d3-axis'),
  require('d3-transition'),
  require('d3-time-format'),
  require('d3-ease'),
  require('d3-interpolate'),
)

const margin = {
  top: 10,
  right: 0,
  bottom: 10,
  left: 0,
}

const colors = ['red', 'green', 'purple', 'yellow']
const INCLUDE_TRANSITION = true

export default {
  props: {
    rows: {
      type: Array,
      default: () => [],
    },
    chartOptions: {
      type: Object,
      default () {
        return {
          object: '',
          formatValue: (x) => x,
        }
      },
    },
  },
  watch: {
    rows () {
      this.renderChart(INCLUDE_TRANSITION)
    },
  },
  mounted () {
    this.initChart()
    this.renderChart(INCLUDE_TRANSITION)
  },
  created () {
    if (process.browser) {
      window.addEventListener('resize', this.handleResize)
    }
  },
  beforeDestroy () {
    if (process.browser) {
      window.removeEventListener('resize', this.handleResize)
    }
  },
  methods: {
    handleResize () {
      this.renderChart()
    },
    initGradient (svgDefs, color) {
      const gradient = svgDefs.append('linearGradient')
        .attr('id', `${color}Gradient`)
        .attr('x1', 0).attr('x2', 0)
        .attr('y1', 0).attr('y2', 1)

      // Create the stops of the main gradient. Each stop will be assigned
      // a class to style the stop using CSS.
      gradient.append('stop')
        .attr('class', `stop-top ${color}`)
        .attr('offset', '0')

      gradient.append('stop')
        .attr('class', `stop-bottom ${color}`)
        .attr('offset', '1')
    },
    initChart () {
      // Add all static elements
      const svg = d3.select(this.$refs.chart)
      const g = svg.append('g').attr('class', 'container')

      // gradient
      // Create the svg:defs element and the gradient definitions
      var svgDefs = svg.append('defs')
      colors.forEach(c => this.initGradient(svgDefs, c))

      // main data paths
      colors.forEach(c => {
        const colorGroup = g.append('g').attr('class', c)
        colorGroup.append('path').attr('class', `area ${c}`)
        colorGroup.append('path').attr('class', `line ${c}`)
      })

      this.initGradient(svgDefs, 'background')
      svg.select('#backgroundGradient')
        .attr('x1', 0).attr('x2', 1)
        .attr('y1', 0).attr('y2', 0)
      g.append('rect').attr('class', 'y-background')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 50)

      // Add the Axis
      g.append('g').attr('class', 'y-axis')
      g.append('g').attr('class', 'x-axis')
    },
    renderChart (shouldIncludeTransition) {
      const svg = d3.select(this.$refs.chart)
      const g = svg.select('.container')

      // Calculate width and height of graph
      const containerWidth = this.$refs.container.offsetWidth
      const containerHeight = this.$refs.container.offsetHeight

      // Set width and height
      svg
        .attr('width', containerWidth)
        .attr('height', containerHeight - margin.top)

      g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      svg.select('.y-background')
        .attr('height', containerHeight)

      // render our rows
      this.rows.forEach(d => {
        this.renderRow(d, shouldIncludeTransition)
      })
    },
    renderRow (row, shouldIncludeTransition) {
      const svg = d3.select(this.$refs.chart)
      const formatValue = this.chartOptions.formatValue

      const containerWidth = this.$refs.container.offsetWidth
      const containerHeight = this.$refs.container.offsetHeight

      const width = containerWidth - margin.left - margin.right
      const height = containerHeight - margin.top - margin.bottom

      const x = d3.scaleTime().range([0, width])
      const y = d3.scaleLinear().range([height, 0])
      const t = d3.transition().duration(shouldIncludeTransition ? 100 : 0).ease(d3.easeCubicInOut)

      const color = row.color
      const data = row.data

      // Scale the range of the data
      const xExtent = d3.extent(data, (d) => d.date)
      x.domain([+xExtent[0] - x(1000), +xExtent[1] + x(1000)])
      // Add a little padding to top and bottom
      const dev = d3.deviation(data, d => d.current) / 2
      const min = d3.min(data, (d) => d.current)
      const max = d3.max(data, (d) => d.current)
      y.domain([min - dev, max + dev])

      // define the line
      const currentLine = d3.line()
        .x((d) => x(d.date))
        .y((d) => y(d.current))
        .curve(d3.curveCatmullRom)

      // define the area
      const currentArea = d3.area()
        .x((d) => x(d.date))
        .y0((d) => y(min - dev))
        .y1((d) => y(d.current))
        .curve(d3.curveCatmullRom)

      // Update axis
      svg.selectAll('.y-axis')
        .attr('transform', `translate(0, 0)`)
        .call(d3.axisRight(y).tickFormat(formatValue))

      svg.selectAll('.x-axis')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisTop(x).ticks(6).tickSizeOuter(50))

      // Update main data
      svg.select(`.area.${color}`)
        .data([data])
        .transition(t)
        .attr('d', currentArea)

      svg.select(`.line.${color}`)
        .data([data])
        .transition(t)
        .attr('d', currentLine)
    },
  },
}
</script>

<style lang="scss">

svg.example-chart {
  $background-color: #212150;
  $white: #ebeef9;
  $label-color: #D4D4E0;

  $colorCodes: (
    green: #81f160,
    red: #f34773,
    purple: cyan,
    yellow: gold,
  );
  $colors: green red purple yellow;

  .line {
    fill: none;
    stroke-width: 2px;
  }

  .area {
    mix-blend-mode: hard-light;
  }

  .stop-top {
    stop-opacity: .5;
  }

  .stop-bottom {
    stop-opacity: 0;
  }

  .y-background {
    fill: #1e1f4c;
    fill: url(#backgroundGradient);
  }

  .background.stop-top,
  .background.stop-bottom {
    stop-color: #1e1f4c;
  }

  .background.stop-top {
    stop-opacity: .8;
  }

  @each $key in $colors {
    .#{$key} {
      $color: map-get($colorCodes, $key);

      &.line {
        stroke: $color;
      }

      &.area {
        fill: $color;
        fill: url("##{$key}Gradient");
      }

      &.stop-top {
        stop-color: $color;
      }

      &.stop-bottom {
        stop-color: $color;
      }
    }
  }

  .domain {
    stroke: none;
  }

  .tick {
    line {
      stroke: none;
    }

    text {
      font-size: 10px;
      font-weight: normal;
      fill: $label-color;
    }
  }
}

</style>
