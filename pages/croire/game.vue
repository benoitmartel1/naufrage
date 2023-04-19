<template>
  <div>
    <Vache :score="score" />
    <div v-if="isGood !== null" class="black"></div>
    <ValidateCroire
      v-if="isGood !== null"
      :isGood="isGood"
      :answer="q.answer"
      @continue="onContinue()"
    />
    <div class="main">
      <div class="score">{{ score + ' / ' + questions.length }}</div>
      <div class="game">
        <div class="question">{{ q.question[lang] }}</div>
        <div class="answers">
          <div class="btn answer" @click="validate(q.mythe.good)">
            {{ q.mythe[lang] }}
          </div>
          <div class="btn answer" @click="validate(q.realite.good)">
            {{ q.realite[lang] }}
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
      questions: questions,
      score: 0,
      currentQuestionIndex: 0,
      isGood: null,
    }
  },
  computed: {
    q() {
      return this.questions[this.currentQuestionIndex]
    },
    lang() {
      return this.$store.state.lang
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
  },
}
</script>

<style lang="scss" scoped>
.score {
  float: right;
}
.main {
  padding: 30px;
  width: $width;
  height: $height;
  .game {
    text-align: center;
    width: 100%;
    height: 75%;
    overflow: hidden;

    .question {
      display: block;
    }
    .answers {
      margin: auto;
      width: 80%;
      .answer {
        width: 100%;
        font-size: 0.8em;
        border-radius: 30px;
        margin-bottom: 30px;
        background-color: white;
        padding: 20px 80px;
        @include bordered;
      }
    }
  }
}
</style>
