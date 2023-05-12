<template>
  <div class="main-wrapper">
    <div v-show="step == 'boucher'" class="black"></div>
    <BoucherVore v-show="step == 'boucher'" @continue="onContinue()" />
    <div class="animation">
      <div v-if="step == 'then' || step == 'boucher'">
        <img class="woman" src="img/vore/VJ2_femme-1920.png" alt="" />
      </div>
      <div v-if="step == 'now' || step == 'boucher'">
        <img class="man" src="img/vore/VJ_homme-aujrd.png" alt="" />
      </div>
      <div class="labels">
        <div class="label" v-if="timer >= 0">
          <span>{{ fr ? 'Omnivore' : 'Omnivorus' }}</span>
        </div>
        <div class="label" v-if="timer >= 3">
          <span>{{ fr ? 'Carnivore' : 'Omnivorus' }}</span>
        </div>
        <div class="label" v-if="timer >= 6">
          <span>{{ fr ? 'Ovipare' : 'Omnivorus' }}</span>
        </div>
        <div class="label" v-if="timer >= 8">
          <span>{{ fr ? 'Matador' : 'Omnivorus' }}</span>
        </div>
        <div class="label" v-if="timer >= 9">
          <span>{{ fr ? 'Météore' : 'Omnivorus' }}</span>
        </div>
        <div class="label" v-if="timer >= 10">
          <span>{{ fr ? 'Glouton' : 'Omnivorus' }}</span>
        </div>
      </div>
    </div>

    <div class="bulle" v-if="step !== 'boucher'">
      <div class="message">
        <div v-if="step == 'then'">
          <span v-if="fr"
            ><span class="title">1920</span>Lorem ipsum occati illum estotas
            dolupi- et laut que repudandant. Cipsam faccatur reperum vollum
            incidebis dollamus inustias este vendell uptasperchil int estiatur
            ma.</span
          >
          <span v-else>EN</span>
        </div>
        <div v-else>
          <span v-if="fr"
            ><span class="title">Aujourd'hui</span>Lorem ipsum occati illum
            estotas dolupi- et laut que repudandant. Cipsam faccatur reperum
            vollum incidebis dollamus inustias este vendell uptasperchil int
            estiatur ma.</span
          >
          <span v-else>EN</span>
        </div>
      </div>

      <ContinueButton
        v-if="animationDone || step == 'then'"
        @click.native="onContinue()"
      />
    </div>
    <div class="backdrop"></div>
  </div>
</template>

<script>
let animationTimer

export default {
  data() {
    return {
      timer: 0,
      step: 'then',
      animationDone: false,
    }
  },
  computed: {
    fr() {
      return this.$store.state.lang == 'fr'
    },
    isNow() {
      return !this.$store.state.panier.now.isFull
    },
  },
  watch: {
    step(val) {
      if (val == 'now') {
        animationTimer = setInterval(() => {
          this.timer += 1
          if (this.timer > 20) {
            clearInterval(animationTimer)
            this.animationDone = true
          }
        }, 100)
      }
    },
  },
  methods: {
    onContinue() {
      if (this.step == 'then') {
        this.step = 'now'
      } else if (this.step == 'now') {
        this.step = 'boucher'
      } else {
        this.$router.push('/vore/game')
      }
    },
  },
  beforeDestroy() {
    clearInterval(animationTimer)
  },
}
</script>

<style lang="scss" scoped>
.animation {
  position: relative;
  height: $height;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  .man {
    width: 296px;
    top: 61px;
    left: 358px;
    position: absolute;
  }
  .woman {
    width: 273px;
    top: 112px;
    left: 374px;
    position: absolute;
    // filter: brightness(0);
  }
}
.bulle {
  //   text-align: center;
  left: 1005px;
  top: 158px;
  width: 735px;
  height: 615px;

  .title {
    text-align: center;
    font-size: 2em;
    font-weight: bold;
    display: block;
    margin-bottom: 35px;
  }
  &:after {
    display: none;
  }
}
.labels {
  .label {
    span {
      background: url('~/assets/img/VJ-J2_Étiquette.png');
      width: 292px;
      height: 146px;
      color: #4e2803;
      font-weight: 400;
      font-size: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      //   display: block;
      animation: scaleDown 500ms ease-out;
      //   padding: 20px 50px;
      //   background-color: white;
      //   border: 5px solid black;
    }
    position: absolute;
    left: 344px;
    top: 482px;
    // font-weight: 800;
    transform-origin: center center;

    // font-size: 3em;

    &:nth-child(1) {
      transform: translate(0px, 0px) rotate(0deg);
    }
    &:nth-child(2) {
      transform: translate(150px, -80px) rotate(12deg);
    }
    &:nth-child(3) {
      transform: translate(-110px, -80px) rotate(-18deg);
    }
    &:nth-child(6) {
      transform: translate(-120px, 90px) rotate(14deg);
    }
    &:nth-child(5) {
      transform: translate(100px, 100px) rotate(-20deg);
    }
    &:nth-child(4) {
      transform: translate(140px, -190px) rotate(6deg);
    }
  }
}
@keyframes scaleDown {
  from {
    transform: scale(3);
  }
  to {
    transform: scale(1);
  }
}
</style>
