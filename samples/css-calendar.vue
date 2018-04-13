<!-- https://github.com/Illyism/responsive-component-design-demo/blob/master/pages/css/calendar-frame.vue -->

<style lang="scss">
  @media only screen and (max-width: 480px) {
    // full width rows
    .header,
    .calendar__header {
      width: 100%;
    }

    .calendar__row {
      flex-direction: column;
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
  }
</style>
