<template>
  <div class="movie-coming">
    Vidéo démarre dans
    <div class="countdown">
      {{ timeLeft }}
    </div>
  </div>
</template>

<script>
let movieInterval
export default {
  data() {
    return {
      timeLeft: 0,
    }
  },
  props: ['timeToMovie'],
  mounted() {
    this.timeLeft = this.timeToMovie
    movieInterval = setInterval(() => {
      this.timeLeft--
      if (this.timeLeft <= 0) {
        clearInterval(movieInterval)
        console.log('Emit start movie')
      }
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(movieInterval)
  },
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
