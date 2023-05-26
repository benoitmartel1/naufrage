<template>
  <div class="testPanel">
    <div class="video">
      <label for="">Temps avant la vidéo</label>
      <input id="videoInput" type="text" value="10" />
      <button @click="startVideo()">Lancer vidéo</button>
    </div>
    <!-- <div class="full btn" @click="setFullscreen()">
      <svg
        height="140px"
        version="1.1"
        viewBox="0 0 14 14"
        width="140px"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <title />
        <desc />
        <defs />
        <g
          fill="none"
          fill-rule="evenodd"
          id="Page-1"
          stroke="none"
          stroke-width="1"
        >
          <g
            fill="#fff"
            id="Core"
            transform="translate(-215.000000, -257.000000)"
          >
            <g id="fullscreen" transform="translate(215.000000, 257.000000)">
              <path
                d="M2,9 L0,9 L0,14 L5,14 L5,12 L2,12 L2,9 L2,9 Z M0,5 L2,5 L2,2 L5,2 L5,0 L0,0 L0,5 L0,5 Z M12,12 L9,12 L9,14 L14,14 L14,9 L12,9 L12,12 L12,12 Z M9,0 L9,2 L12,2 L12,5 L14,5 L14,0 L9,0 L9,0 Z"
                id="Shape"
              />
            </g>
          </g>
        </g>
      </svg>
    </div> -->
    <!-- <div class="croire">
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
    </div> -->
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
    setFullscreen() {
      document.getElementById('app').requestFullscreen()
    },
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
  margin-top: 10px;
  transform: scale(0.8);
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
