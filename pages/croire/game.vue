<template>
  <div class="main-wrapper">
    <div v-if="isGood !== null" class="black"></div>
    <ValidateCroire
      v-if="isGood !== null"
      :isGood="isGood"
      :resolve="q.resolve"
      @continue="onContinue()"
    />
    <div class="backdrop">
      <div class="score">{{ score + '/' + questions.length }}</div>
      <div class="game">
        <Vache :score="score" />
        <div class="question">{{ q.question[lang] }}</div>
        <div class="answers">
          <div
            class="btn answer"
            v-for="(a, index) in q.answers"
            :key="a + index"
            @click="validate(a.good)"
          >
            {{ a[lang] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { questions } from '~/static/data/croire.json'

export default {
  data() {
    return {
      score: 0,
      currentQuestionIndex: 0,
      isGood: null,
    }
  },
  computed: {
    questions() {
      return this.shuffleArray(questions).slice(0, 6)
    },
    q() {
      return this.questions[this.currentQuestionIndex]
    },
    lang() {
      return this.$store.state.lang
    },
    fr() {
      return this.$store.state.lang == 'fr'
    },
  },
  methods: {
    validate(isGood) {
      if (isGood) {
        this.score++
        this.isGood = true
      } else {
        this.isGood = false
      }
    },
    onContinue() {
      console.log(this.currentQuestionIndex)
      if (this.questions.length - 1 == this.currentQuestionIndex) {
        this.$store.commit('setScore', this.score)
        this.$router.push('/croire/outro')
      } else {
        this.currentQuestionIndex++
      }

      this.isGood = null
    },
    shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        // Generate random number
        var j = Math.floor(Math.random() * (i + 1))

        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }

      return array
    },
  },
}
</script>

<style lang="scss" scoped>
.score {
  right: 30px;
  position: absolute;
}
.backdrop {
  padding: 30px;
  .score {
    font-size: 88px;
    line-height: 65px;
    font-weight: 400;
    float: right;
  }
  .game {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 60px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 0 100px;
    padding-bottom: 50px;
    // border: solid yellow 1px;
    // height: 75%;
    overflow: hidden;

    .question {
      text-align: center;
      font-weight: 400;
      font-size: 50px;
      line-height: 60px;
    }
    .answers {
      //   margin: auto;
      //   width: 100%;
      display: flex;

      justify-content: space-between;
      gap: 50px;
      .answer {
        // width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 56px;
        line-height: 60px;
        border-radius: 30px;
        // margin-bottom: 30px;

        background-color: white;
        padding: 25px 30px;
        border: 5px solid var(--brown);
        &:active {
          background-color: var(--orange);
        }
      }
    }
  }
}
</style>
