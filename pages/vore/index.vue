<template>
  <div class="main-wrapper">
    <div v-show="step == 'boucher'" class="black"></div>
    <BoucherVore v-show="step == 'boucher'" @continue="onContinue()" />
    <div :class="['animation', { boucher: step == 'boucher' }]">
      <div v-if="step == 'then' || step == 'boucher'">
        <img class="woman" src="img/vore/VJ2_femme-1920.png" alt="" />
      </div>
      <div v-if="step == 'now' || step == 'boucher'">
        <img class="man" src="img/vore/VJ_homme-aujrd.png" alt="" />
      </div>
      <div class="labels">
        <div class="label" v-if="timer >= 0">
          <span>{{ fr ? 'Omnivore' : 'Omnivore' }}</span>
        </div>
        <div class="label" v-if="timer >= 3">
          <span>{{ fr ? 'Végétarien' : 'Vegetarian' }}</span>
        </div>
        <div class="label" v-if="timer >= 6">
          <span>{{ fr ? 'Végan' : 'Vegan' }}</span>
        </div>
        <div class="label" v-if="timer >= 8">
          <span>{{ fr ? 'Flexitarien' : 'Flexitarian' }}</span>
        </div>
        <div class="label" v-if="timer >= 9">
          <span>{{ fr ? 'Méditerranéen' : 'Mediterranean' }}</span>
        </div>
        <div class="label" v-if="timer >= 10">
          <span>{{ fr ? 'Crudivore' : 'Crudivore' }}</span>
        </div>
      </div>
    </div>
    <div class="bulle-wrapper">
      <div class="bulle" v-if="step !== 'boucher'">
        <div class="message">
          <div v-if="step == 'then'">
            <span v-if="fr"
              ><span class="title">1920</span>En 1920, lorsqu’on invite famille
              et amis à partager un bon repas chez soi, il n’y a pas trop de
              questions à se poser afin que tous soient heureux du menu de la
              soirée! À Val-Jalbert, les habitants aiment manger de la viande.
              Pas de chicane dans la cabane : tout le monde est omnivore.</span
            >
            <span v-else
              ><span class="title">1920</span>When family and friends were
              invited over to share a good meal, there weren't many questions to
              ask before everyone was perfectly happy with the menu! In
              Val-Jalbert, people really enjoyed eating meat. There was no
              argument: everyone was an omnivore.</span
            >
          </div>
          <div v-else>
            <span v-if="fr"
              ><span class="title">Aujourd'hui</span>Aujourd’hui, avant
              d’inviter des proches à partager un repas, il est maintenant
              habituel de se poser des questions telles que : « Est-ce que Gaby
              mange de la viande? » ou encore « Est-ce que Maude mange du pain
              au blé entier? » Intolérances, préférences et régimes alimentaires
              spécifiques sont dorénavant des facteurs déterminants dans le
              choix du menu.
            </span>
            <span v-else
              ><span class="title">Today</span>Today, before inviting loved ones
              to share a meal, it is now common to ask oneself questions like:
              "Does Gaby eat meat?" or "Does Maude eat whole wheat bread?". Food
              intolerances, preferences, and particular diets are now important
              factors in the choice of a shared meal.
            </span>
          </div>
        </div>

        <ContinueButton
          v-if="animationDone || step == 'then'"
          @click.native="onContinue()"
        />
      </div>
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
.boucher {
  .man {
    left: 241px;
  }
  .woman {
    left: 469px;
  }
}
.bulle-wrapper {
  top: 0;
  left: 0;
  position: absolute;
  height: 93%;
  width: 92%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.bulle {
  position: unset;
  //   text-align: center;
  //   left: 1005px;
  //   top: 158px;
  width: 735px;
  font-size: 32px;
  line-height: 44px;
  //   height: 615px;

  .title {
    text-align: center;
    font-size: 66px;
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
