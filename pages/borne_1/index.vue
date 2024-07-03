<template>
  <div>
    <div class="overlay">
      <div v-if="currentType" class="menu-button title" @click="goToMenu()">
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
        Menu
      </div>
      <div class="lang-button" @click="changeLang()">
        {{ lang == 'fr' ? 'EN' : 'FR' }}
      </div>
      <div v-show="currentType" class="buttons">
        <div
          v-if="slideIndex"
          class="arrow arrow-left"
          @click="changeSlide(-1)"
        >
          <Arrow />
        </div>
        <div v-else></div>
        <div
          v-show="!isLastSlide"
          class="arrow arrow-right"
          @click="changeSlide(1)"
        >
          <Arrow />
        </div>
      </div>
    </div>
    <div class="wrapper">
      <Menu v-if="!currentType" :items="naufrages" />
      <div class="column-wrapper">
        <Intro
          v-if="currentType == 'intro'"
          :text="currentSlide?.text[lang]"
          :header="currentItem.name"
        />
        <Video
          v-if="currentType == 'video'"
          :path="currentSlide?.path[lang]"
          :header="currentItem.name"
        />
        <Tiles
          v-if="currentType == 'tiles'"
          :imagesPath="imagesPath"
          :tiles="currentSlide?.tiles"
          :header="currentItem.name"
          :key="slideIndex"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { naufrages } from '~/static/data/borne_1.json?nocache=123'

export default {
  data() {
    return {
      naufrages: [],
      currentItem: null,
      slideIndex: 0,
    }
  },
  mounted() {
    this.naufrages = JSON.parse(
      JSON.stringify(naufrages.sort((a, b) => a.order - b.order))
    )
    // this.idleTimerActive = true
  },

  methods: {
    changeLang() {
      this.$store.commit('setLang', this.lang == 'fr' ? 'en' : 'fr')
    },
    goToMenu() {
      this.currentItem = null
      this.slideIndex = 0
    },
    changeSlide(value) {
      var newValue = this.slideIndex + value
      //Check if there is slide left, else go to menu
      if (newValue >= this.currentItem.slides.length) {
        this.goToMenu()
      } else {
        this.slideIndex += value
      }
    },
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
    currentSlide() {
      return this.currentItem?.slides[this.slideIndex] || null
    },
    isLastSlide() {
      return this.slideIndex + 1 >= this.currentItem?.slides.length
    },
    currentType() {
      return this.currentSlide?.type || null
    },
    imagesPath() {
      return 'borne_1/' + this.currentItem.slug + '/0' + this.slideIndex
    },
  },
  watch: {
    timeLeft: function (o, n) {
      console.log(o)
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 82%;
  margin: auto;
  margin-top: 5vh;
  //   border: 2px yellow dashed;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .column-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    // align-items: start;
  }
}
.overlay {
  pointer-events: none;
  .arrow,
  .menu-button,
  .lang-button {
    pointer-events: visible;
  }
  .lang-button,
  .menu-button {
    position: absolute;
    bottom: 40px;
  }
  .lang-button {
    font-size: 30px;
    left: 90px;
  }
  .menu-button {
    font-size: 28px;
    z-index: 999;

    right: 90px;
    .arrow {
      transform: scaleX(-1);
      width: 30px;
      margin-top: 3px;
      float: left;
      margin-right: 20px;
    }
  }

  .buttons {
    position: absolute;
    z-index: 800;
    top: 0;
    left: 0;
    height: 100vh;
    align-items: center;
    padding: 20px;
    color: white;
    position: absolute;
    width: 100%;
    padding: 0 60px;
    z-index: 800;
    display: flex;
    justify-content: space-between;
    div {
      width: 60px;
      &.arrow-right {
        transform: scaleX(-1);
      }
    }
  }
}
.main {
  .naufrages {
    div {
      display: flex;
    }
  }
}
</style>
