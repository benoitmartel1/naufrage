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
        {{ lang == 'fr' ? 'En' : 'Fr' }}
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
    <div v-if="items[0]" class="wrapper">
      <Pastilles
        v-if="!currentType"
        :items="filteredItems"
        :header="items[0]?.name"
      />
      <div class="column-wrapper">
        <Intro
          v-if="currentType == 'intro'"
          :text="currentSlide?.text[lang]"
          :header="items[0]?.name"
        />
        <Video
          v-if="currentType == 'video'"
          :path="currentSlide?.path"
          :header="items[0]?.name"
          :showHeadphones="showHeadphones"
        />
        <Tiles
          v-if="currentType == 'tiles'"
          :imagesPath="imagesPath"
          :tiles="currentSlide?.tiles"
          :header="items[0]?.name"
          :key="slideIndex"
        />
        <Wall
          v-if="currentType == 'wall'"
          :videos="currentSlide?.videos"
          :header="items[0]?.name"
          :key="slideIndex"
          :showHeadphones="showHeadphones"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      currentItem: null,
      slideIndex: 0,
      showHeadphones: true,
    }
  },
  mounted() {
    const items = require(`~/static/data/borne_${
      this.borneIndex + 1
    }.json?nocache=123`).items

    // const { items } from '~/static/data/borne_2.json?nocache=123'
    this.items = JSON.parse(
      JSON.stringify(items.sort((a, b) => a.order - b.order))
    )
    this.currentItem = this.items[0]
    console.log(this.items)
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
    filteredItems() {
      return this.items.filter((i) => i.order > 0)
    },
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
      return (
        'borne_' +
        (this.borneIndex + 1) +
        '/' +
        this.currentItem.slug +
        '/0' +
        (this.slideIndex + 1)
      )
    },
    borneIndex() {
      return this.$store.state.borne - 1
    },
  },
  watch: {
    currentType: {
      handler: function (newVal, oldVal) {
        console.log(newVal)
        if (newVal == null) {
          this.slideIndex = 0
          this.currentItem = null
          console.log(this.slideIndex)
        }
      },
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
    font-size: 60%;
    left: 90px;
  }
  .menu-button {
    font-size: 80%;
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
