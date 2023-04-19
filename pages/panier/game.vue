<template>
  <div>
    <div v-if="panierFull" class="black"></div>
    <div class="main">
      <div class="game">
        <PanierFull
          v-if="panierFull"
          :total="total"
          @continue="handleContinue()"
        />
        <NotAvailable v-if="notAvailable" />
        <div class="left">
          <div class="types">
            <div
              v-for="t in types"
              :key="t.type"
              :class="['btn type ', type == t.type ? 'active' : '']"
              @click="type = t.type"
            >
              <div class="icon"></div>
              <div class="title">
                {{ t[lang] }}
              </div>
            </div>
          </div>
          <div class="aliments">
            <div
              :class="['aliment btn', { sold: a.sold }]"
              v-for="a in alimentsInType"
              :key="a.fr"
              @click="addItem(a)"
            >
              {{ a[lang] }}
              <div class="price">{{ a[era] }}</div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="header">
            <div class="title">
              <span v-if="lang == 'fr'">Mon panier</span><span v-else></span>
            </div>
            <div class="cart">
              <div class="nb">{{ list.length }}</div>
            </div>
          </div>
          <ul class="list">
            <li
              class="btn"
              v-for="(i, index) in list"
              :key="i.fr + index"
              @click="i.sold = false"
            >
              {{ i[lang] }}
              <div class="remove">X</div>
            </li>
          </ul>
          <div class="total">
            <div class="title">
              <span v-if="lang == 'fr'">Budget restant</span
              ><span v-else></span>
            </div>
            <div class="amount">
              {{ left + '$' }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Nav />
  </div>
</template>

<script>
import { aliments } from '~/static/data/aliments.json'
import { types } from '~/static/data/types.json'

export default {
  data() {
    return {
      aliments: [],
      types: types,
      type: 'fruit',
      era: this.$store.state.panier.now.list.length ? 'then' : 'now',
      notAvailable: false,
    }
  },
  beforeMount() {
    this.aliments = JSON.parse(JSON.stringify(aliments))
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
      return this.aliments.filter((a) => a.sold == true && a[this.era] !== null)
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
  methods: {
    addItem(a) {
      if (a[this.era]) {
        a.sold = true
      } else {
        // alert('not available!')
        this.notAvailable = true
        a.sold = true
      }
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
  },
  watch: {
    left(val) {
      if (val <= 0) {
        this.checkout()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  padding: 30px;
  width: $width;
  height: $height;
  .game {
    @include bordered;
    width: 100%;
    height: 75%;
    overflow: hidden;
    position: relative;
    display: flex;

    .left {
      width: 70%;
      @include bordered;
      .types {
        font-size: 18px;
        display: flex;
        justify-content: space-between;
        @include bordered;
        .type {
          background-color: none;
          flex: 1;
          padding: 20px;

          @include bordered;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 180px;
          &.active {
            background-color: white;
          }
        }
      }
      .aliments {
        @for $i from 1 through 6 {
          .aliment:nth-child(#{$i}) {
            animation-delay: calc($i - 1) * 100ms;
          }
        }
        background-color: white;
        display: flex;
        justify-content: space-between;
        padding: 120px 150px;
        height: 100%;
        .aliment {
          animation: fadeIn 400ms forwards ease-out;
          //   animation-delay: 2s;
          opacity: 0;
          flex-direction: column;
          //   margin-right: 60px;
          width: 200px;
          height: 200px;
          background-color: cyan;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          .price {
            display: block;
          }
          &.sold {
            background-color: #ddd;
            opacity: 0.5;
          }
        }
      }
    }
    .right {
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      padding: 30px;
      flex: 1;
      .header {
        .nb {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 36px;
          font-weight: 900;
          width: 50px;
          height: 50px;

          &:after {
            content: '';
            width: 50px;
            height: 50px;
            position: absolute;

            border: solid black 2px;
            border-radius: 50%;
            left: 0;
            top: 0;
          }
        }
        display: flex;
        width: 100%;
        // background-color: green;
        justify-content: space-between;
        border-bottom: 2px solid black;
      }
      .list {
        overflow-y: scroll;
        flex: 1;
        li {
          display: flex;
          width: 100%;
          justify-content: space-between;
        }
      }

      .total {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
