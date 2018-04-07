<template>
  <div class="table list" :class="listClasses">
    <div v-if="size === 'tablet'" class="thead">
      <div class="tr list__row list__row--header">
        <div class="th">Name</div>
        <div v-if="!listClasses.tablet" class="th">Email</div>
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
        <div v-if="!listClasses.tablet || listClasses.phone" class="td">{{ row.email }}</div>
        <div class="td">{{ row.role }}</div>
        <div class="td">{{ row.team }}</div>
        <div v-if="!listClasses.phone" class="td">
          <div class="tag" :class="row.status">
            {{ row.status }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const faker = require('faker')
const elementSizeMixin = require('~/plugins/elementSizeMixin')

export default {
  mixins: [ elementSizeMixin ],
  data () {
    return {
      rowsCount: 3,
    }
  },
  computed: {
    listClasses () {
      if (!this.size) return {}
      return {
        phone: this.size.width < 480,
        tablet: this.size.width < 800,
      }
    },
    rows () {
      const { rowsCount } = this

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
  }
}
</script>

<style lang="scss" scoped>
  @import 'assets/list.scss';

  .table {
    width: 100%;
  }

  .list.tablet {
    .th,
    .td {
      padding: 8px 10px;
    }
  }

  .list.phone {
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

    .tr {
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
  }
</style>
