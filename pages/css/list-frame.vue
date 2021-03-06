<template>
  <div class="example">
    <div class="table list">
      <div class="thead m-hide">
        <div class="tr list__row list__row--header">
          <div class="th">Name</div>
          <div class="th t-hide">Email</div>
          <div class="th">Role</div>
          <div class="th">Team</div>
          <div class="th">Status</div>
        </div>
      </div>
      <div class="tbody">
        <div
          v-for="row in rows"
          :key="row.id"
          class="tr list__row m-block"
        >
          <div class="td nowrap">
            <div class="avatar">
              <img
                class="avatar__content"
                :class="row.status"
                :src="row.avatar"
                alt=""
              >
            </div>
            <span>{{ row.name }}</span>
          </div>
          <div class="td t-hide">{{ row.email }}</div>
          <div class="td">{{ row.role }}</div>
          <div class="td">{{ row.team }}</div>
          <div class="td m-hide">
            <div class="tag" :class="row.status">
              {{ row.status }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <div class="pagination__item pagination__item--clickable" @click="prev">
        <icon-arrow-left-bold />
      </div>
      <div class="pagination__item pagination__item--clickable" @click="next">
        <icon-arrow-right-bold />
      </div>
      <div class="pagination__item pagination__item--text">
        {{ page }}
      </div>
    </div>
  </div>
</template>

<script>
const faker = require('faker')

export default {
  layout: 'component',
  data () {
    return {
      page: 1,
      rowsCount: 3,
    }
  },
  computed: {
    rows () {
      const { rowsCount, page } = this

      const rows = []
      for (let i = 0; i < rowsCount; i++) {
        const row = {
          id: faker.random.number(),
          avatar: faker.image.avatar(),
          name: faker.name.findName(),
          email: faker.internet.email(),
          role: faker.name.jobTitle(),
          team: faker.name.jobArea(),
          status: faker.random.arrayElement([
            'online',
            'offline',
          ]),
        }

        rows.push(row)
      }

      return rows
    },
  },
  watch: {
    page () {
      this.setSeed()
    },
  },
  created () {
    this.setSeed()
  },
  methods: {
    setSeed () {
      const seed = parseInt(this.page)
      faker.seed(seed)
    },
    prev () {
      if (this.page <= 1) return
      this.page--
    },
    next () {
      this.page++
    },
  },
}
</script>

<style lang="scss" scoped>
  @import 'assets/list.scss';

  .example {
    font-size: 14px;
    color: #D2D3DE;
  }

  .table {
    width: 100%;
  }

  @media only screen and (max-width: 800px) {
    .t-hide {
      display: none !important;
    }

    .list__row {
      .th,
      .td {
        padding: 8px 10px;
      }
    }
  }

  @media only screen and (max-width: 480px) {
    .t-hide {
      display: block !important;
    }

    .m-hide {
      display: none !important;
    }

    .avatar {
      width: 50px;
      height: 50px;
      position: absolute;
      right: 0;
      bottom: 0;
      top: 0;
      margin: auto 20px;
    }

    .avatar__content {
      border-width: 2px;
    }

    .td.nowrap {
      font-size: 16px;
      display: block;
      margin-bottom: 4px;
    }

    .tr.m-block {
      display: block;
      position: relative;
      padding: 20px;
      border-bottom: 1px solid #3d3e63;

      > .td {
        display: block;
        padding: 0;
      }

      &:last-child {
        border-bottom: 0;
      }
    }

    .pagination {
      display: flex;
      margin-top: 0;
    }

    .pagination__item {
      flex: 1;
      border-radius: 0;

      &:first-child {
        order: 1;
      }

      &:nth-child(2) {
        order: 3;
      }
    }

    .pagination__item--text {
      order: 2;
    }
  }
</style>
