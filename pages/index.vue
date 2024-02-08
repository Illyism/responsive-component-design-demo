<template>
  <section>
    <a href="https://il.ly/">Made by Ilias Ism</a>
    <div class="links">
      <div class="header">Basic components</div>
      <nuxt-link class="link" to="/basic/list">list</nuxt-link>
      <nuxt-link class="link" to="/basic/calendar">calendar</nuxt-link>
      <nuxt-link class="link" to="/basic/chart">chart</nuxt-link>
    </div>

    <div class="links">
      <div class="header">Old-school responsive</div>
      <nuxt-link class="link" to="/css/list">list</nuxt-link>
      <nuxt-link class="link" to="/css/calendar">calendar</nuxt-link>
    </div>

    <div class="links">
      <div class="header">Responsive component</div>
      <nuxt-link class="link" to="/responsive/list">list</nuxt-link>
      <nuxt-link class="link" to="/responsive/calendar">calendar</nuxt-link>
      <nuxt-link class="link" to="/responsive/chart">chart</nuxt-link>
    </div>

    <div class="links">
      <div class="header">Resize code samples</div>
      <nuxt-link class="link" to="/resize/window">window event listener</nuxt-link>
      <nuxt-link class="link" to="/resize/directive">with directive</nuxt-link>
      <nuxt-link class="link" to="/resize/plugin">with plugin</nuxt-link>
      <nuxt-link class="link" to="/resize/grid">element size</nuxt-link>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style scoped>
section {
  display: flex;
  align-items: stretch;
  justify-content: space-around;
}

.links {
  flex: 1;
  background: #212150;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid #272658;
  text-align: left;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.4);
}

.links {
  display: flex;
  flex-direction: column;
  :first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  :last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}

.header {
  background: #1c1c48;
  background: linear-gradient(to bottom, #212150, #1c1c48);
  color: #aaabde;
  font-size: 12px;
  padding: 8px 20px;
}

.link {
  flex: 1;
  padding: 16px 20px;
  font-size: 16px;
  display: block;
  color: #D4D4E0;
  text-decoration: none;
  cursor: pointer;

  &:hover,
  &:focus {
    color: white;
    z-index: 1;
    background: rgba(255, 255, 255, .1);
    box-shadow: 0 0 100px rgba(255, 255, 255, .2);
  }
}
</style>
