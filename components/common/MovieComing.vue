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
  font-weight: 400;
  position: absolute;
  bottom: 0;
  width: 50%;
  background-color: black;
  color: white;
  border-radius: 60px 60px 0 0;
  left: 25%;
  padding: 30px 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: moveIn 300ms ease-out;
  z-index: 800;
}
.countdown {
  font-weight: 800;
  margin-left: 20px;
}
@keyframes moveIn {
  from {
    transform: translateY(100px);
  }
  to {
    transform: translateY(0);
  }
}
</style>
