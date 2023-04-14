<template>
  <div class="boucher">
    <img src="@/assets/images/boucher.png" alt="" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.boucher {
  animation: slideFromBottom 300ms ease-out;
  img {
    width: 420px;
    position: absolute;
    bottom: 0;
  }
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 3;
}
@keyframes slideFromBottom {
  from {
    margin-bottom: -5%;
    opacity: 0;
  }
  to {
    margin-bottom: 0;
    opacity: 1;
  }
}
</style>
