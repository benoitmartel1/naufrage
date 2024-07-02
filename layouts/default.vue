<template>
  <div :class="[{ appro: approMode }]">
    <div id="app" class="no-cursor">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import idle from '~/mixins/idle.js'
let movieInterval
export default {
  data() {
    return {
      timeToMovie: 0,
    }
  },
  computed: {
    approMode() {
      return false
      return Boolean(
        process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'dev'
          ? 1
          : 0
      )
    },
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.key == 'v') {
      }
    })
  },
  mixins: [idle],
}
</script>

<style lang="scss">
body {
  font-size: 48px;
  margin: 0;
  background-color: #333;
}

#app {
  position: relative;
  background: url('~/assets/img/back_blur.jpg');

  transition: transform 600ms ease-out;
  width: 1920px;
  height: 1080px;
  overflow: hidden;
}

.appro {
  //   margin: 30px;
  transform: scale(0.9);
  transform-origin: 0 0;
}
.page-enter-active {
  transition: all 0.4s;
  .backdrop,
  .woman {
    transition: all 0.4s var(--cubic);
  }
}
.page-enter {
  opacity: 0;
}
.page-enter {
  .backdrop {
    transform: scale(0.92) rotate(-3deg);
  }
  .woman {
    filter: brightness(0);
    transform: scale(1.2) translateX(-200px);
  }
}
</style>
