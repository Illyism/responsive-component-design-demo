<template>
  <div class="example">
    <div class="box">
      <div class="header">
        <div class="header__item header__item--title">Statistics</div>
        <div class="">
          <div
            class="header__item header__item--clickable"
            @click="toggleLoop"
          >
            <icon-stop v-if="interval" />
            <icon-autorenew v-else/>
          </div>
        </div>
        <div
          class="header__item header__item--clickable"
          @click="setSeed"
        >
          <icon-refresh />
        </div>
      </div>
      <div class="box__content">
        <example-chart :rows="rows" />
      </div>
    </div>
  </div>
</template>

<script>
import { startOfMonth, addMonths } from 'date-fns'
import ExampleChart from '~/components/ExampleChart'
const faker = require('faker')

export default {
  layout: 'component',
  components: { ExampleChart },
  data () {
    return {
      interval: null,
      random: 1,
      rowsCount: 4,
      monthsCount: 12,
    }
  },
  computed: {
    startDate () {
      const { random } = this
      return startOfMonth(faker.date.past(faker.random.number({ min: 3, max: 5 })))
    },
    rows () {
      const { rowsCount, startDate, monthsCount, random } = this

      const rows = []
      for (let i = 0; i < rowsCount; i++) {
        const row = {
          id: faker.random.number(),
          accountName: faker.finance.accountName(),
          color: [ 'red', 'green', 'purple', 'yellow' ][i],
          data: [],
        }

        let current = 100
        for (let j = 0; j < monthsCount; j++) {
          let terminated = faker.random.number({ min: 0, max: (50) - (5 * j) })
          let added = faker.random.number({ min: 0, max: 10 * j })
          current = current + added - terminated
          row.data.push({
            i: j,
            date: addMonths(startDate, j),
            current,
            terminated,
            added,
          })
        }

        rows.push(row)
      }

      return rows
    },
  },
  methods: {
    toggleLoop () {
      if (this.interval) this.interval = clearInterval(this.interval)
      else this.interval = setInterval(this.setSeed, 100)
    },
    setSeed () {
      this.random = faker.random.number()
      faker.seed(this.random)
    },
  },
}
</script>

<style lang="scss" scoped>
  .example {
    width: 100%;
    height: 100vh;
    font-size: 14px;
    color: #D2D3DE;
  }

  @import 'assets/chart.scss';

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
