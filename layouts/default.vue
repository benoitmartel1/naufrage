<template>
  <div
    :class="[{ appro: approMode }, 'app-wrapper']"
    :style="approMode == false ? 'overflow: hidden;' : ''"
  >
    <div id="app">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      approMode: 1,
    }
  },
}
</script>

<style lang="scss">
body {
  overflow: hidden;
  /* color: white; */
  font-size: 48px;
  margin: 0;
  background-color: #333;
}
#app {
  /* flex-shrink: 0; */
  width: $width;
  height: $height;
  border: 1px solid black;
  background-color: beige;
  /* transform: scale(1); */
}

.appro {
  margin: 30px;
  transform: scale(0.5);
  transform-origin: 0 0;
}
.app-wrapper {
  display: flex;
  width: $width;
  height: $height;
}
.approMode {
  cursor: pointer;
  display: flex;
  font-weight: bold;
  /* width: 200px; */
  padding: 30px;
  font-size: 36px;
  margin-right: -200px;
  opacity: 0.2;
}
</style>
