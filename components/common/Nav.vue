<template>
  <div class="nav">
    <div v-if="$route.path != '/'" class="btn home" @click="$router.push('/')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="79"
        height="70.856"
        viewBox="0 0 79 70.856"
      >
        <image
          id="VJ_home"
          width="79"
          height="70.856"
          xlink:href="data:image/png;base64,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Uk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAJcEhZcwAACxMAAAsTAQCanBgAAAYKaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMSA3OS5jMDIwNGIyZGVmLCAyMDIzLzAyLzAyLTEyOjE0OjI0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3OWQ3YzFkNi01MjBiLTQ0ZjMtOWQzNC05OGRmNWFkNWUzNzQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Qzg2QTA3ODRFMTNEMTFFREIwMzlFRkUxRDREOEFEOUUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Yjc4NGZiNTQtOWU2MS00NjI4LWJhN2EtYzVmNDEwOThiMjFjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyNC4xIChNYWNp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"
        />
      </svg>
    </div>
    <div v-else class="btn empty"></div>
    <div class="game" v-if="gameName()">{{ gameName() }}</div>
    <div class="btn lang" @click="changeLang()">
      {{ !fr ? 'fr' : 'en' }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    fr() {
      return this.$store.state.lang == 'fr'
    },
  },

  methods: {
    changeLang() {
      this.$store.commit('setLang', !this.fr ? 'fr' : 'en')
    },
    gameName() {
      switch ($nuxt.$route.name.split('-')[0]) {
        case 'panier':
          return this.fr ? 'Dans mon p’tit panier…' : 'In my little basket'
          break
        case 'vore':
          return this.fr
            ? 'Quel type de mangeur êtes-vous?'
            : 'What kind of eater are you?'
          break
        case 'croire':
          return this.fr
            ? 'J’sais pas si tu vas m’croire?'
            : 'I don’t know if you’ll believe me'
          break
        default:
          break
      }
    },
  },
}
</script>

<style lang="scss">
.nav {
  .game {
    // pointer-events: none;
    font-weight: 400;
    font-size: 36px;
    animation: fromBottom 400ms cubic-bezier(0.17, 0.67, 0.52, 0.92) both;
    animation-delay: 100ms;
  }
  .btn {
    color: white;
    width: 106px;
    height: 106px;
    font-size: 30px;
    border-radius: 100%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    &.empty {
      background: none;
    }
    &.lang {
      width: 88px;
      height: 88px;
      font-size: 36px;
      font-weight: 700;
    }
    &.home svg {
      width: 79px;
    }
  }
  width: 100%;
  display: flex;
  padding: 40px;
  align-items: center;
  justify-content: space-between;
  z-index: 888;
  position: absolute;
  bottom: 0;
  .lang {
    text-transform: uppercase;
  }
}
@keyframes fromBottom {
  from {
    transform: translateY(120px);
  }
  to {
    transform: translateY(0px);
  }
}
</style>
