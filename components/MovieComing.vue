<template>
  <div class="movie-coming">
    Vidéo démarre dans
    <div class="countdown">
      {{ timeToMovie }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['timeToMovie'],
}
</script>

<style lang="scss" scoped>
.movie-coming {
  position: absolute;
  bottom: 0;
  width: 80%;
  background-color: black;
  color: white;
  border-radius: 80px 80px 0 0;
  left: 10%;
  padding: 30px 100px;
  display: flex;
}
</style>
