<template>
  <div>
    <div class="main">
      <div class="btn panier" @click="$router.push('/panier')">
        <img src="img/common/jeu_1.png" alt="" />
        <div class="title">
          <span v-if="lang == 'fr'">Dans mon<br />p'tit panier...</span>
          <span v-else>EN Dans mon p'tit panier...</span>
        </div>
        <div class="icon"></div>
      </div>
      <div class="btn croire" @click="$router.push('/croire')">
        <img src="img/common/jeu_3.png" alt="" />
        <div class="title">
          <span v-if="lang == 'fr'">J'sais pas si<br />tu vas m'croire?</span>
          <span v-else>EN Dans mon p'tit panier...</span>
        </div>
        <div class="icon"></div>
      </div>
      <div class="btn vore" @click="$router.push('/vore')">
        <img src="img/common/jeu_2.png" alt="" />
        <div class="title">
          <span v-if="lang == 'fr'">Quel <i>vore</i><br />es-tu ?</span>
          <span v-else>EN Dans mon p'tit panier...</span>
        </div>
        <div class="icon"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  async created() {
    let baseURL =
      process.env.NODE_ENV == 'development'
        ? 'http://localhost:8080'
        : 'file:///opt/par/resources'
    // this.approMode = process.env.NODE_ENV == 'development';

    //For web export appro
    baseURL = window.location.origin + '/vj'

    //Load settings in external json file
    this.settings = await this.$axios
      .get('extraResources/settings.json', { baseURL: baseURL })
      .then((res) => {
        return res.data.settings
      })
  },
  computed: {
    lang() {
      return this.$store.state.lang
    },
  },

  beforeMount() {
    this.$store.commit('resetGameData')
  },
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  width: 82%;
  margin: auto;
  justify-content: space-between;
  margin-top: 220px;
  //   padding: 20px;

  justify-content: space-between;

  .btn {
    font-size: 54px;
    line-height: 60px;
    font-weight: 800;
    max-width: 472px;
    max-height: 526px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 40px 30px;
    text-align: center;
    // height: 520px;
    border-radius: 50% 50% 20px 20px;
    border: 5px solid var(--caramel);
    background-color: var(--orange);
    transform: translate(0px, 0px);
    img {
      width: 390px;
      margin-bottom: 50px;
      animation: rotate 6s infinite ease;
    }

    @for $i from 1 through 3 {
      &:nth-child(#{$i}) {
        animation: #{'slideIn' + $i} ease-out both;
        animation-duration: 300ms + $i * 50ms;
      }
    }
  }
  .btn:nth-child(2) {
    img {
      animation-delay: 1s;
      width: 415px;
      margin-bottom: 90px;
    }
  }
  .btn:nth-child(3) {
    img {
      animation-delay: 3s;
    }
  }
  .btn:active {
    background-color: var(--red);
  }
}
@keyframes slideIn1 {
  from {
    transform: translate(-60px, -40px) rotate(-8deg);
  }
}
@keyframes slideIn2 {
  from {
    transform: translate(30px, -100px) rotate(10deg);
  }
}
@keyframes slideIn3 {
  from {
    transform: translate(80px, 80px) rotate(6deg);
  }
}
@keyframes rotate {
  0%,
  100% {
    // transform: rotate(-6deg);
    transform: translateY(0);
  }
  50% {
    transform: translateY(20px);
    // transform: rotate(6deg);
  }
}
</style>
