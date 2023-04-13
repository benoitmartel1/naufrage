<template>
  <div>
    <div v-show="step == 'boucher'" class="black"></div>
    <Nav />

    <BoucherVore v-show="step == 'boucher'" @continue="onContinue()" />
    <div class="animation">
      <div v-if="step == 'then' || step == 'boucher'">
        <img class="woman" src="@/assets/images/boucher.png" alt="" />
      </div>
      <div v-else>
        <img class="man" src="@/assets/images/boucher.png" alt="" />
      </div>
      <div class="labels">
        <div v-if="timer >= 0">
          <span>{{ fr ? 'Omnivore' : 'Omnivorus' }}</span>
        </div>
        <div v-if="timer >= 3">
          <span>{{ fr ? 'Carnivore' : 'Omnivorus' }}</span>
        </div>
        <div v-if="timer >= 6">
          <span>{{ fr ? 'Ovipare' : 'Omnivorus' }}</span>
        </div>
        <div v-if="timer >= 8">
          <span>{{ fr ? 'Matador' : 'Omnivorus' }}</span>
        </div>
        <div v-if="timer >= 9">
          <span>{{ fr ? 'Météore' : 'Omnivorus' }}</span>
        </div>
        <div v-if="timer >= 10">
          <span>{{ fr ? 'Glouton' : 'Omnivorus' }}</span>
        </div>
      </div>
    </div>
    <div class="header">
      <span v-if="fr">QUEL VORE ES-TU?</span
      ><span v-else>WHAT TYPE OF VORE ARE YA?</span>
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

      <ContinueButton @click.native="onContinue()" />
    </div>
  </div>
</template>

<script>
let animationTimer
export default {
  data() {
    return {
      timer: 0,
      step: 'then',
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
          if (this.timer > 30) {
            clearInterval(animationTimer)
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
}
</script>

<style lang="scss" scoped>
.header {
  position: absolute;
  top: 30px;
  width: 100%;
  text-align: center;
}
.animation {
  position: relative;
  height: $height;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  .man {
    transform: scaleX(-1);
  }
  .woman {
    filter: brightness(0);
  }
}
.bulle {
  text-align: center;
  left: 50%;
  width: 45%;
  .title {
    font-size: 2em;
    font-weight: bold;
    display: block;
  }
  &:after {
    display: none;
  }
}
.labels {
  div {
    span {
      display: block;
      animation: scaleDown 500ms ease-out;
      padding: 20px 50px;
      background-color: white;
      border: 5px solid black;
    }
    position: absolute;
    left: 30%;
    font-weight: 800;
    transform-origin: center center;

    // font-size: 3em;

    &:nth-child(1) {
      transform: translate(0px, 0px) rotate(-10deg);
    }
    &:nth-child(2) {
      transform: translate(-60px, 200px) rotate(-15deg);
    }
    &:nth-child(3) {
      transform: translate(-100px, -200px) rotate(10deg);
    }
    &:nth-child(4) {
      transform: translate(200px, -350px) rotate(7deg);
    }
    &:nth-child(5) {
      transform: translate(-200px, -300px) rotate(6deg);
    }
    &:nth-child(6) {
      transform: translate(-200px, -300px) rotate(6deg);
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
