<div class="box">
    <div class="header">
        <!-- statistics, refresh button... -->
    </div>
    <div class="box__content">
        <chart :rows="rows" />
    </div>
</div>

<style>
  .box {
    display: flex;
    flex-direction: column;
    margin: 0;
    height: 100%;
  }

  .box__content {
    flex: 1;
    flex-grow: 1;
    overflow: hidden;
  }

  .chart__container {
    height: 100%;
  }
</style>


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
export default {
  watch: {
    rows () {
      // re-render on data change
      this.renderChart()
    },
  },
  mounted () {
    this.initChart()
    this.renderChart()
  },
  created () {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      this.renderChart()
    },

    initChart () {
      // called once per chart component
      // insert our <g> containers, our gradients, axis, ...
      // do as much as you can without having any data
      // so we can select and transition later
    },
    renderChart () {
      // called on on every data change and resize
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

      // set up our scales and axis based on the width and height
      const width = containerWidth - margin.left - margin.right
      const height = containerHeight - margin.top - margin.bottom

      const x = d3.scaleTime().range([0, width])
      const y = d3.scaleLinear().range([height, 0])
      const t = d3.transition().duration(100).ease(d3.easeCubicInOut)

      // render our rows
      this.rows.forEach(row => {
        const color = row.color
        const data = row.data

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

        // Update main data
        svg.select(`.area.${color}`)
          .data([data])
          .transition(t)
          .attr('d', currentArea)

        svg.select(`.line.${color}`)
          .data([data])
          .transition(t)
          .attr('d', currentLine)
      })

      // Update axis
      svg.selectAll('.y-axis')
        .attr('transform', `translate(0, 0)`)
        .call(d3.axisRight(y).tickFormat(formatValue))

      svg.selectAll('.x-axis')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisTop(x).ticks(6).tickSizeOuter(50))
    },
  },
}
</script>
