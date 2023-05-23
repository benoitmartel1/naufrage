<template>
  <div :class="['list', { old: era == 'then' }]">
    <div class="top">
      <div v-if="isCompare" class="title">
        <div v-if="era == 'then'">
          <span v-if="lang == 'fr'"
            >Mon panier
            <div class="annee">1920</div></span
          ><span v-else
            >My basket
            <div class="annee">1920</div></span
          >
        </div>
        <div v-else>
          <span v-if="lang == 'fr'">
            Mon panier
            <div class="annee">aujourd'hui</div></span
          ><span v-else
            >My basket
            <div class="annee">today</div></span
          >
        </div>
      </div>
      <div v-else>
        <span v-if="lang == 'fr'">Mon panier</span><span v-else>My basket</span>
      </div>
      <div :class="['cart', era]">
        <img v-if="era == 'then'" src="img/aliments/VJ_panier1920.png" alt="" />
        <img v-else src="img/aliments/VJ_petit-panier.png" alt="" />
        <div class="nb-wrapper">
          <Transition name="kaching" mode="out-in">
            <div :key="list.length" class="nb">{{ list.length }}</div>
          </Transition>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div v-for="t in types" :key="t.type" :class="['list-type ']">
        <div>
          <Transition name="typeHeader">
            <div v-if="alimentsInListByType(t.type).length" class="type-header">
              {{ t[lang].replace(/<\/?[^>]+(>|$)/g, ' ') }}
            </div>
          </Transition>
          <TransitionGroup name="list" tag="ul">
            <li
              class="btn"
              v-for="i in alimentsInListByType(t.type)"
              :key="i.fr"
              @click="onClick(i)"
            >
              <div class="name-wrapper">
                <span v-html="i[lang]"> </span>
                <div class="remove">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="44"
                    height="44"
                    viewBox="0 0 26 26"
                  >
                    <circle cx="13" cy="13" r="13" fill="black" />
                    <g
                      id="Groupe_83"
                      data-name="Groupe 83"
                      transform="translate(13 13) rotate(45)"
                    >
                      <line
                        id="Ligne_3"
                        data-name="Ligne 3"
                        y2="16"
                        transform="translate(0 -8)"
                        fill="none"
                        stroke="#fff"
                        stroke-width="2"
                      />
                      <line
                        id="Ligne_4"
                        data-name="Ligne 4"
                        y2="16"
                        transform="translate(8 0) rotate(90)"
                        fill="none"
                        stroke="#fff"
                        stroke-width="2"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </li>
          </TransitionGroup>
        </div>
      </div>
    </div>
    <div class="total">
      <div class="title">
        <div v-if="isCompare">
          <span v-if="lang == 'fr'">Coût total</span><span v-else></span>
        </div>
        <div v-else class="budget">
          <span v-if="lang == 'fr'">Budget restant</span
          ><span v-else>Remaining budget</span>
        </div>
      </div>
      <Transition name="kaching" mode="out-in">
        <div v-if="left" :key="left" class="amount">
          {{
            lang == 'fr'
              ? padded(left).replace('.', ',') + ' $'
              : '$' + padded(left)
          }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list', 'types', 'era', 'lang', 'left', 'isCompare'],
  methods: {
    padded(n) {
      return n.toString().split('.')[1].length < 2 ? n.toString() + '0' : n
    },
    alimentsInListByType(type) {
      return this.list.filter((a) => a.type == type)
    },
    onClick(i) {
      if (!this.isCompare) {
        i.sold = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.list {
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border-radius: 12px;
  padding: 30px;
  flex: 1;
  position: relative;
  .budget {
    font-weight: 800;
  }
  .top {
    font-size: 32px;
    font-weight: 700;
    display: flex;
    align-items: flex-end;
    .title {
      padding-bottom: 10px;
      font-size: 37px;
      margin-bottom: 10px;
      .annee {
        margin-top: 0px;
        font-size: 45px;
      }
    }
    // background-color: green;
    .cart {
      .nb-wrapper {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
        font-weight: 400;
        width: 40px;
        height: 40px;
        background-color: #fbf28f;
        border: solid black 3px;
        border-radius: 50%;
        overflow: hidden;
      }
      &.now {
        img {
          width: 118px;
        }

        .nb-wrapper {
          top: 40px;
          right: 65px;
        }
      }
    }

    display: flex;
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px solid #707070;
  }
  .bottom {
    margin: 30px 0;
    // margin-top: 0;
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    font-size: 22px;
    ul {
      padding: 0;
      list-style-type: none;
      margin: 0px;
    }

    .type-header {
      margin-top: 20px;
      font-weight: 700;
      &:first-of-type {
        margin-top: 0;
      }
    }
    li {
      font-weight: 400;
      padding: 0;
      margin: 0;

      width: 100%;
      overflow: hidden;
      //   height: 36px;
      //   border: 1px solid brown;

      .name-wrapper {
        span {
          line-height: 24px;
        }
        // border: 1px solid yellow;
        display: flex;
        align-items: center;
        margin-top: -5px;
        padding: 0;
        line-height: 0.4em;
        opacity: 1;
        .remove {
          margin-left: 12px;
          transform: scale(0.7);
          display: flex;
          align-items: center;
        }
      }
    }
  }

  .total {
    border-top: 1px solid #707070;
    font-size: 32px;
    font-weight: 400;
    display: flex;
    justify-content: space-between;
  }
  .amount {
    font-weight: 800;
  }
}
.old {
  .title {
    font-size: 38px !important;
    .annee {
      font-size: 71px !important;
    }
  }
  font-family: 'Caveat';
  .nb {
    font-family: 'Neulis';
  }
  .bottom {
    font-size: 26px;

    .type-header {
      font-size: 28px;
    }
  }
  .top {
    font-size: 46px;
  }
  .total {
    font-size: 40px;
  }
  .amount {
    font-size: 46px;
  }
}
.list-enter-active {
  transition: all 600ms ease;
  .name-wrapper {
    transition: all 300ms var(--cubic);
  }
}
.list-enter {
  .name-wrapper {
    opacity: 0;
    color: var(--orange);
    transform: translateY(22px);
  }
}
.typeHeader-enter-active,
.typeHeader-leave-active {
  transition: all 300ms var(--cubic);
}

.typeHeader-enter,
.typeHeader-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.kaching-enter-active {
  transition: all 400ms cubic-bezier(0.63, 1.8, 0.6, 0.88);
}

.kaching-enter {
  transform: translateY(22px);
  opacity: 0;
}
</style>
