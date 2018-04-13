<!-- https://github.com/Illyism/responsive-component-design-demo/blob/master/pages/responsive/calendar-frame.vue -->

<script>
export default {
  mq: {
    phone: '(max-width: 480px)',
    tablet: '(max-width: 800px)',
    desktop: '(min-width: 801px)',
  },
  computed: {
    calendarClasses () {
      return {
        'calendar--tablet': this.$mq.tablet,
        'calendar--phone': this.$mq.phone,
      }
    },
    daysCount () {
      if (!this.$mq.desktop) {
        return 7
      }

      return getDaysInMonth(this.startDate)
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
  },
  data () {
    return {
      referenceDate: new Date(),
    }
  },
}
</script>



<div class="header__item header__item--month">
  {{ timeRangeText }}
</div>

<script>
export default {
  computed: {
    timeRangeText () {
      if (!this.$mq.desktop) {
        const start = format(this.startDate, 'DD MMM')
        const end = format(this.endDate, 'DD MMM')
        return `${start} - ${end}`
      }

      return format(this.startDate, 'MMMM YYYY')
    },
  },
}
</script>



<div class="days days--header">
  <div v-for="day in days" class="day">
    {{ day.date | toWeekDay($mq) }}
  </div>
</div>

<script>
export default {
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
}
</script>
