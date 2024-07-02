<template>
  <div class="arrow-wrapper">
    <div class="arrow">
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 54.45 80.61"
      >
        <defs>
          <style>
            .cls-1 {
              fill: #fff;
              stroke-width: 0px;
            }
          </style>
        </defs>
        <polygon
          class="cls-1"
          points="28.28 40.31 54.45 14.14 40.31 0 0 40.31 40.31 80.61 54.45 66.47 28.28 40.31"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.arrow {
  width: 60px;
  animation: moveIn 600ms;
}
@keyframes moveIn {
  from {
    transform: translateX(30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
