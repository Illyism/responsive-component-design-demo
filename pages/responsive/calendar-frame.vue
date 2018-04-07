<template>
  <div class="example">
    <div class="calendar" :class="calendarClasses">
      <div class="calendar__row calendar__row--header">
        <div class="header">
          <div class="header__item header__item--clickable" @click="prev">
            <icon-arrow-left-bold />
          </div>
          <div class="header__item header__item--clickable" @click="next">
            <icon-arrow-right-bold />
          </div>
          <div class="header__item header__item--month">
            {{ timeRangeText }}
          </div>
        </div>
        <div class="days days--header">
          <div v-for="day in days" class="day">
            {{ day.date | toWeekDay($mq) }}
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
import { format, addDays, subDays, startOfISOWeek, startOfMonth, getDaysInMonth } from 'date-fns'

const faker = require('faker')

export default {
  layout: 'component',
  mq: {
    phone: '(max-width: 480px)',
    tablet: '(max-width: 800px)',
    desktop: '(min-width: 801px)',
  },
  filters: {
    toWeekDay (date, mq) {
      if (mq.phone) {
        return format(date, 'ddd')
      }
      if (mq.tablet) {
        return format(date, 'dd')
      }
      return format(date, 'D')
    },
  },
  data () {
    return {
      referenceDate: new Date(),
      rowsCount: 3,
    }
  },
  computed: {
    daysCount () {
      if (this.$mq.phone) {
        return 7
      }

      if (this.$mq.tablet) {
        return 7
      }

      return getDaysInMonth(this.startDate)
    },
    calendarClasses () {
      return {
        'calendar--tablet': this.$mq.tablet,
        'calendar--phone': this.$mq.phone,
      }
    },
    startDate () {
      if (this.$mq.desktop) {
        return startOfMonth(this.referenceDate)
      }
      return startOfISOWeek(this.referenceDate)
    },
    endDate () {
      return addDays(this.startDate, this.daysCount)
    },
    timeRangeText () {
      if (!this.$mq.desktop) {
        const start = format(this.startDate, 'DD MMM')
        const end = format(this.endDate, 'DD MMM')
        return `${start} - ${end}`
      }

      return format(this.startDate, 'MMMM YYYY')
    },

    rows () {
      const { startDate, daysCount, rowsCount, $mq } = this

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
              ]),
            },
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
      const seed = parseInt(format(this.referenceDate, 'DDD'))
      faker.seed(seed)
    },
    prev () {
      this.referenceDate = subDays(this.referenceDate, this.daysCount)
    },
    next () {
      this.referenceDate = addDays(this.referenceDate, this.daysCount)
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

  .calendar--phone {
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
