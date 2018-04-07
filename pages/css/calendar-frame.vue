<template>
  <div class="example">
    <div class="calendar">
      <div class="calendar__row calendar__row--header">
        <div class="header">
          <div class="header__item header__item--clickable" @click="prev">
            <icon-arrow-left-bold />
          </div>
          <div class="header__item header__item--clickable" @click="next">
            <icon-arrow-right-bold />
          </div>
          <div class="header__item header__item--month">
            {{ startDate | toHeaderDate }} - {{ endDate | toHeaderDate }}
          </div>
        </div>
        <div class="days days--header">
          <div v-for="day in days" class="day">
            {{ day.date | toWeekDay }}
          </div>
        </div>
      </div>
      <div
        v-for="row in rows"
        :key="row.id"
        class="calendar__row">
        <div class="calendar__header">
          <div class="avatar">
            <img class="avatar__content" :src="row.avatar" alt="">
          </div>
          <span class="calendar__name">{{ row.name }}</span>
        </div>
        <div class="days">
          <div
            v-for="day in row.days"
            class="day"
          >
            <div
              class="day__slot"
              :style="day.style"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format, addDays, subDays, startOfISOWeek } from 'date-fns'

const faker = require('faker')

export default {
  layout: 'component',
  filters: {
    toHeaderDate (date) {
      return format(date, 'DD MMM')
    },
    toWeekDay (date) {
      return format(date, 'ddd')
    },
  },
  data () {
    return {
      startDate: startOfISOWeek(new Date()),
      daysCount: 7,
      rowsCount: 3,
    }
  },
  computed: {
    endDate () {
      return addDays(this.startDate, this.daysCount)
    },
    rows () {
      const { startDate, daysCount, rowsCount } = this

      const rows = []
      for (let i = 0; i < rowsCount; i++) {
        const row = {
          id: faker.random.number(),
          avatar: faker.image.avatar(),
          name: faker.name.findName(),
          days: [],
        }

        for (let i = 0; i < daysCount; i++) {
          row.days.push({
            i: i + 1,
            date: addDays(startDate, i),
            style: {
              background: faker.random.arrayElement([
                '#6799F1',
                '#9C5EC3',
                '#F8707F',
                '#673160',
                '#1e1e44',
                '#1e1e44',
                '#1e1e44',
                '#1e1e44',
              ])
            }
          })
        }

        rows.push(row)
      }
      return rows
    },
    days () {
      const { startDate, daysCount } = this
      const days = []
      for (let i = 0; i < daysCount; i++) {
        days.push({
          date: addDays(startDate, i),
        })
      }
      return days
    },
  },
  watch: {
    startDate () {
      this.setSeed()
    },
  },
  created () {
    this.setSeed()
  },
  methods: {
    setSeed () {
      const seed = parseInt(format(this.startDate, 'DDD'))
      faker.seed(seed)
    },
    prev () {
      this.startDate = subDays(this.startDate, this.daysCount)
    },
    next () {
      this.startDate = addDays(this.startDate, this.daysCount)
    },
  },
}
</script>

<style lang="scss" scoped>
  .example {
    font-size: 14px;
    color: #D2D3DE;
  }

  @import 'assets/avatar.scss';
  @import 'assets/calendar.scss';

  .calendar {
    width: 100%;
  }

  .avatar {
    width: 50px;
    height: 50px;
    padding: 10px;
  }

  @media only screen and (max-width: 480px) {
    .header,
    .calendar__header {
      width: 100%;
    }

    // left arrow
    .header__item {
      order: 1;
    }

    // time range display
    .header__item--month {
      order: 2;
      text-align: center;
    }

    // right arrow
    .header__item:nth-child(2) {
      order: 3;
    }

    .calendar__row {
      flex-direction: column;
    }
  }
</style>
