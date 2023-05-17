<template>
  <div class="main-wrapper">
    <div v-if="panierFull" :class="['black', { old: era == 'then' }]"></div>
    <PanierFull v-if="panierFull" :total="total" @continue="handleContinue()" />
    <div :class="['main', { old: era == 'then' }]">
      <div :class="['game', { old: era == 'then' }]">
        <div class="left">
          <div class="left-back-mask">
            <div class="top"></div>
            <div class="bottom"></div>
          </div>
          <div class="types">
            <div
              v-for="t in types"
              :key="t.type"
              :class="['btn type ', type == t.type ? 'active' : '']"
              @click="type = t.type"
            >
              <div class="img-wrapper">
                <img :src="'img/aliments/' + t.img" />
              </div>
              <div class="title" v-html="t[lang]"></div>
            </div>
          </div>
          <div class="aliments-wrapper" @click="notAvailable = undefined">
            <NotAvailable
              v-if="notAvailable"
              :text="notAvailable.notAvailable[lang]"
            />
            <div class="aliments">
              <div
                :class="['aliment btn', { sold: a.sold }]"
                v-for="(a, index) in alimentsInType"
                :key="a.fr"
                @click.stop="addItem(a, index)"
              >
                <div class="circle"></div>
                <div class="img-wrapper">
                  <div v-if="era == 'then' && a.img_1920">
                    <img :src="'img/aliments/' + a.img_1920" />
                  </div>
                  <div v-else>
                    <img :src="'img/aliments/' + a.img" />
                  </div>
                </div>
                <div class="name" v-html="a[lang]"></div>
                <div class="price">
                  {{ formatPrice(a) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <List
          :list="list"
          :types="types"
          :era="era"
          :lang="lang"
          :left="left"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { aliments } from '~/static/data/aliments.json?nocache=123'
import { types } from '~/static/data/types.json'
let notAvailableTimeout
export default {
  data() {
    return {
      aliments: [],
      types: types,
      type: 'fruit',
      era: this.$store.state.panier.now.list.length ? 'then' : 'now',
      notAvailable: undefined,
    }
  },
  beforeMount() {
    this.aliments = JSON.parse(
      JSON.stringify(aliments.sort((a, b) => a.order - b.order))
    )
  },
  computed: {
    panier() {
      return this.$store.state.panier
    },
    panierFull() {
      return this.panier[this.era].list.length > 0
    },
    lang() {
      return this.$store.state.lang
    },
    list() {
      if (this.era == 'now') {
        return this.aliments.filter((a) => a.sold == true)
      } else {
        return this.aliments.filter((a) => a.sold == true && !a.notAvailable)
      }
    },
    alimentsInType() {
      return this.aliments.filter((a) => a.type == this.type)
    },
    left() {
      let total = this.panier[this.era].max
      let sum = this.list.reduce(
        (accumulator, currentValue) => accumulator - currentValue[this.era],
        total
      )
      return sum < 0 ? 0 : sum.toFixed(2)
    },
    total() {
      let total = 0
      let sum = this.list.reduce(
        (accumulator, currentValue) => accumulator + currentValue[this.era],
        total
      )
      return sum.toFixed(2)
    },
  },

  beforeDestroy() {
    // this.clearNotAvailableTimeout()
    this.notAvailable = undefined
  },
  methods: {
    formatPrice(a) {
      let number = a[this.era] * 100
      if (this.era == 'now') {
        let decimals = number.toString().slice(-2, number.length)
        let units = number.toString().slice(0, -2)

        number = units + (this.lang == 'fr' ? ',' : '.') + decimals
        return this.lang == 'fr' ? number + ' $' : '$' + number
      } else {
        return this.lang == 'fr'
          ? Math.round(number) + ' ¢'
          : '¢' + Math.round(number)
      }
    },
    addItem(a, index) {
      this.notAvailable = undefined
      if (this.era == 'now' || !a.notAvailable) {
        a.sold = !a.sold
      } else {
        if (!a.sold) {
          this.notAvailable = a
          this.styleBulle(index)
          a.sold = true
        }
      }
    },
    styleBulle(i) {
      let bullePos, afterPos
      switch (i) {
        case 0:
          bullePos = [20, 440] //left top
          afterPos = [135, -80]
          break
        case 1:
          bullePos = [50, 440]
          afterPos = [546, -80]
          break
        case 2:
          bullePos = [80, 440]
          afterPos = [956, -80]
          break
        case 3:
          bullePos = [20, 290]
          afterPos = [135, -80]
          break
        case 4:
          bullePos = [50, 290]
          afterPos = [546, -80]
          break
        case 5:
          bullePos = [80, 290]
          afterPos = [950, -80]
          break
      }
      let isInverted = i < 3 ? 'transform:scaleY(-1)' : ''
      this.$nextTick(() => {
        document.querySelector('.bulle').style.cssText = `left: ${
          bullePos[0]
        }px; ${i > 2 ? 'bottom' : 'top'}: ${bullePos[1]}px;`
        document.querySelector(
          '.pointe'
        ).style.cssText = `${isInverted};left: ${afterPos[0]}px; ${
          i > 2 ? 'bottom' : 'top'
        }: ${afterPos[1]}px;`
      })
    },
    checkout() {
      let payload = { list: this.era, content: this.list }
      this.$store.commit('checkoutList', payload)
    },
    handleContinue() {
      if (this.era == 'now') {
        this.$router.push('/panier/')
      } else {
        this.$router.push('/panier/compare')
      }
    },
    clearNotAvailableTimeout() {
      this.notAvailable = undefined
      clearTimeout(notAvailableTimeout)
    },
  },
  watch: {
    list(val) {
      this.$nextTick(() => {
        let elem = document.querySelector('.list .bottom')
        elem.scrollTop = elem.scrollHeight + 100
      })
    },
    left(val) {
      if (val <= 0) {
        this.checkout()
      }
    },
    type(val) {
      this.clearNotAvailableTimeout()
    },
  },
}
</script>

<style lang="scss" scoped>
.black.old {
  background-color: #79613e;
  opacity: 0.7;
}
.list {
  border: 6px solid var(--red);
}

.main {
  padding: 40px 40px 170px 40px;
  width: $width;
  height: $height;
  .game {
    height: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
    .left {
      .left-back-mask {
        border: 6px solid var(--red);
        position: absolute;

        z-index: -1;
        width: 90%;
        height: calc(100% - 60px);
        overflow: hidden;
        border-radius: 30px 0 0 30px;
        background-color: var(--red);
        .top {
          width: 100%;
          height: calc(131px - 6px);
          background-color: var(--red);
        }
        .bottom {
          width: 100%;
          height: 100%;
          background-color: white;
        }
      }
      //   overflow: hidden;
      //
      //   border-right: none;
      margin-top: 60px;
      width: 70%;

      .types {
        padding: 6px;
        padding-bottom: 0;
        font-size: 22px;
        line-height: 28px;
        height: 131px;
        // background-color: green;
        display: flex;
        justify-content: space-between;

        .type {
          flex: 1;

          //   background-color: var(--red);
          //   padding-bottom: 20px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          //   overflow: visible;
          text-align: center;

          &.active {
            animation: typeIn both ease-out 300ms;
            border-radius: 20px 20px 0 0;
            background-color: white;
          }
          .title {
            margin-top: 4px;
            min-height: 58px;
          }
          .img-wrapper {
            width: 145px;
            height: 115px;

            img {
              height: 100%;
              width: 100%;
              object-fit: contain;
            }
          }
        }
      }
      .aliments-wrapper {
        // overflow: hidden;
        .aliments {
          @for $i from 1 through 6 {
            .aliment:nth-child(#{$i}) {
              animation-delay: calc(random() * 2) * 100ms;
            }
          }
          //   background-color: white;
          // width: 600px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          padding: 30px 70px 70px 70px;
          box-sizing: border-box;
          width: 100%;
          gap: 30px;
          height: 100%;
          .aliment {
            transition: all 300ms ease;
            line-height: 1.2em;
            // border: solid red 2px;
            font-size: 22px;
            animation: fadeIn 300ms forwards ease-out;
            //   animation-delay: 2s;
            opacity: 0;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            //   margin-right: 60px;
            min-width: 270px;
            height: 270px;
            //   flex-basis: 33.33333%;
            //   margin-right: 100px;
            display: flex;
            position: relative;
            .circle {
              border-radius: 50%;
              width: 270px;
              height: 270px;
              position: absolute;
              z-index: -1;
              transition: all 300ms ease;
              transform: scale(1.2);
            }
            //   justify-content: center;
            //   align-items: center;
            &:active {
              .circle {
                background-color: var(--orange);
              }
            }
            .img-wrapper {
              max-width: 220px;
              max-height: 175px;
              img {
                object-fit: contain;
              }
            }
            .name {
              font-weight: 400;
              margin: 8px 0;
            }
            .price {
              margin-bottom: 30px;
            }
            &.sold {
              transform: scale(0.8);
              img {
                filter: saturate(0);
              }
              .circle {
                // transform: scale(1);
                background-color: #c4b6a8;
                opacity: 0.55;
              }
            }
          }
        }
      }
    }
  }
}
.old .aliments,
.old .types {
  font-family: 'Caveat';
  .type {
    font-size: 32px;
  }
  .name,
  .price {
    font-size: 36px;
  }
}

.old {
  .list,
  .game .left .left-back-mask {
    border-color: var(--beige) !important;
  }
  .types {
    background-color: var(--beige) !important;
  }
  .right,
  .left {
    border-color: var(--beige);
  }
}
@keyframes typeIn {
  from {
    transform: translateY(30px);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes moveFromBottom {
  from {
    transform: translateY(22px);
  }
  to {
    transform: translateY(0);
  }
}
</style>
