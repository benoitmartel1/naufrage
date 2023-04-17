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
              class="aliment btn"
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
            <li v-for="(i, index) in list" :key="i.fr + index">
              {{ i[lang] }}
              <div class="btn remove" @click="removeItem(index)">X</div>
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
      aliments: aliments,
      types: types,
      type: 'fruit',
      isNow: this.$store.state.panier.now.isFull == false,
      panierFull: false,
    }
  },
  computed: {
    panier() {
      return this.$store.state.panier
    },
    lang() {
      return this.$store.state.lang
    },
    era() {
      return this.$store.state.panier.now.isFull == false ? 'then' : 'now'
    },
    list() {
      return this.panier[this.isNow ? 'now' : 'then'].list
    },
    left() {
      let total = this.panier[this.isNow ? 'now' : 'then'].max
      let sum = this.list.reduce(
        (accumulator, currentValue) => accumulator - currentValue.now,
        total
      )
      return sum < 0 ? 0 : sum
    },
    total() {
      let total = 0
      let sum = this.list.reduce(
        (accumulator, currentValue) => accumulator + currentValue.now,
        total
      )
      return sum
    },
    alimentsInType() {
      return aliments.filter((a) => a.type == this.type)
    },
  },
  methods: {
    addItem(a) {
      a.sold = true
      let payload = { list: this.isNow ? 'now' : 'then', item: a }
      this.$store.commit('addItem', payload)
    },
    removeItem(index) {
      let payload = { list: this.isNow ? 'now' : 'then', item: index }
      this.$store.commit('removeItem', payload)
      //   console.log(a.now)
    },
    handleContinue() {
      if (this.isNow) {
        this.$router.push('/panier/')
      } else {
        this.$router.push('/panier/compare')
      }
    },
  },
  watch: {
    left(val) {
      if (val <= 0) {
        this.panierFull = true
        this.$store.commit('setPanierFullStatus', {
          list: this.isNow ? 'now' : 'then',
          status: true,
        })
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
        background-color: white;
        display: flex;

        padding: 120px 250px;
        height: 100%;
        .aliment {
          flex-direction: column;
          margin-right: 90px;
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
