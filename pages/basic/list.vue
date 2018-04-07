<template>
  <div class="basic-example">

    <p>Basic list component</p>

    <div class="example">
      <div class="table list">
        <div class="thead">
          <div class="tr list__row list__row--header">
            <div class="th">Name</div>
            <div class="th">Email</div>
            <div class="th">Role</div>
            <div class="th">Team</div>
            <div class="th">Status</div>
          </div>
        </div>
        <div class="tbody">
          <div
            v-for="row in rows"
            :key="row.id"
            class="tr list__row"
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
            <div class="td">{{ row.email }}</div>
            <div class="td">{{ row.role }}</div>
            <div class="td">{{ row.team }}</div>
            <div class="td">
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
        <div class="pagination__item">
          {{ page }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const faker = require('faker')

export default {
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
  .example {
    width: 800px;
    font-size: 14px;
    color: #D2D3DE;
  }

  @import 'assets/list.scss';
</style>
