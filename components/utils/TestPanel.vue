<template>
  <div class="testPanel">
    <div class="video">
      <label for="">Temps avant la vidéo</label>
      <input id="videoInput" type="text" value="10" />
      <button @click="startVideo()">Lancer vidéo</button>
    </div>
    <div class="croire">
      <fieldset>
        <legend>J'sais pas si...</legend>
        <div>
          <input
            type="radio"
            id="huey"
            name="drone"
            value=""
            checked
            @input="onInput(6)"
          />
          <label for="huey">6 questions au hasard</label>
        </div>
        <div>
          <input
            type="radio"
            id="dewey"
            name="drone"
            value="dewey"
            @input="onInput(null)"
          />
          <label for="dewey">Toutes les questions</label>
        </div>
      </fieldset>
    </div>
    <div class="volume">
      <button @click="setVolume(0)">Volume 0</button>
      <button @click="setVolume(0.5)">Volume 0.5</button>
      <button @click="setVolume(1)">Volume 1</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    setVolume(value) {
      this.$parent.onWsMessage({ type: 'volume', value: value })
    },
    startVideo() {
      let value = document.querySelector('#videoInput').value
      this.$parent.onWsMessage({ type: 'start', value: value })
    },
    onInput(e) {
      this.$store.commit('setCroireMax', e)
    },
  },
}
</script>

<style lang="scss" scoped>
input[type='radio'] {
  border: 0px;
  //   width: 100%;
  height: 1em;
}

.testPanel {
  color: white;
  //   position: absolute;
  display: flex;
  z-index: 200;
  width: $width;
  align-items: center;
  justify-content: space-between;
  opacity: 0.4;
  margin-top: 50px;
}
button,
input {
  font-size: 0.8em;
}
input {
  width: 80px;
}
button {
  width: 150px;
  height: 150px;
}
</style>
