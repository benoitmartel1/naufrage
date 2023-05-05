<template>
  <div>
    <div class="main">
      <div class="btn panier" @click="$router.push('/panier')">
        <div class="title">
          <span v-if="lang == 'fr'">Dans mon p'tit panier...</span>
          <span v-else>EN Dans mon p'tit panier...</span>
        </div>
        <div class="icon"></div>
      </div>
      <div class="btn vore" @click="$router.push('/vore')">
        <div class="title">
          <span v-if="lang == 'fr'">Quel <i>vore</i> es-tu ?</span>
          <span v-else>EN Dans mon p'tit panier...</span>
        </div>
        <div class="icon"></div>
      </div>
      <div class="btn croire" @click="$router.push('/croire')">
        <div class="title">
          <span v-if="lang == 'fr'">J'sais pas si tu vas m'croire?</span>
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
  data() {
    return {}
  },
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
        console.log(76)
        console.log(res.data.settings)
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
  gap: 80px;
  margin-top: 220px;
  //   padding: 20px;

  justify-content: space-between;
  .btn {
    font-weight: 800;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 40px;
    text-align: center;
    height: 520px;
    border-radius: 50% 50% 20px 20px;
    border: 5px solid var(--beige);
    background-color: var(--orange);
    transform: translate(0px, 0px);
    @for $i from 1 through 3 {
      &:nth-child(#{$i}) {
        animation: #{'slideIn' + $i} ease-out both;
        animation-duration: 300ms + $i * 50ms;
      }
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
</style>
