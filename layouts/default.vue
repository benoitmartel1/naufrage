<template>
  <div :class="[{ appro: approMode }]">
    <div id="app">
      <MovieComing v-if="movieComing" :timeToMovie="timeToMovie" />
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      approMode: 1,
      movieComing: false,
      timeToMovie: 10,
    }
  },
  mounted() {
    setTimeout(() => {
      this.movieComing = true
    }, 2000)
  },
}
</script>

<style lang="scss">
body {
  font-size: 48px;
  margin: 0;
  background-color: #333;
}
#app {
  transition: transform 600ms ease-out;
  width: $width;
  height: $height;
  background-color: beige;
  overflow: hidden;
}
.appro {
  margin: 30px;
  transform: scale(0.5);
  transform-origin: 0 0;
}
</style>
