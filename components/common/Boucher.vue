<template>
  <div class="boucher">
    <div class="flip">
      <img src="img/common/boucher_v2.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.boucher {
  animation: slideFromBottom 400ms var(--cubic) both;
  //   animation-delay: 2s;
  img {
    width: 535px;
    position: absolute;
    top: 192px;
  }
  position: absolute;
  //   bottom: -192px;
  left: 1300px;
  z-index: 3;
}
@keyframes slideFromBottom {
  from {
    filter: brightness(0);
    transform: scale(1.15);
  }
  to {
    filter: brightness(1);
    transform: scale(1) translateX(0);
  }
}
</style>
