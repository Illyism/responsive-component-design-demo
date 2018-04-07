<template>
  <div class="grid">
    <div class="header">
      <list-cell class="col" />
    </div>
    <div class="main">
      <list-cell class="col" />
      <list-cell class="col" />
    </div>
    <div class="side">
      <list-cell class="col" />
      <list-cell class="col" />
    </div>
  </div>
</template>

<script>
import ListCell from '~/components/ListCell'

export default {
  components: { ListCell },
}
</script>

<style lang="scss" scoped>
  .grid {
    display: grid;
    grid-gap: 20px;
    grid-template-areas:
      "header"
      "content"
      "sidebar";
  }

  .header {
    grid-area: header;
  }

  .main {
    grid-area: content;
  }

  .side {
    grid-area: sidebar;
  }

  .col + .col {
    margin-top: 20px;
  }

  @media (min-width: 500px) {
    .grid {
      grid-template-columns: 4fr 1fr;
      grid-template-areas:
        "header header"
        "content sidebar"
    }
  }
</style>
