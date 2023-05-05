<template>
  <div>
    <div v-if="isGood !== null" class="black"></div>
    <ValidateCroire
      v-if="isGood !== null"
      :isGood="isGood"
      :answer="q.answer"
      @continue="onContinue()"
    />
    <div class="frame">
      <div class="score">{{ score + ' / ' + questions.length }}</div>
      <div class="game">
        <Vache :score="score" />
        <div class="question">{{ q.question[lang] }}</div>
        <div class="answers">
          <div class="btn answer" @click="validate(q.mythe.good)">
            {{ fr ? 'Mythe' : 'EN Myth' }}
          </div>
          <div class="btn answer" @click="validate(q.realite.good)">
            {{ fr ? 'Réalité' : 'EN Reality' }}
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
  },
}
</script>

<style lang="scss" scoped>
.score {
  right: 30px;
  position: absolute;
}
.frame {
  padding: 30px;

  .game {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 60px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 0 200px;
    padding-bottom: 50px;
    // border: solid yellow 1px;
    // height: 75%;
    overflow: hidden;

    .question {
      text-align: center;
      font-weight: 400;
    }
    .answers {
      //   margin: auto;
      //   width: 100%;
      display: flex;

      justify-content: space-between;
      gap: 50px;
      .answer {
        // width: 100%;
        font-size: 60px;
        border-radius: 30px;
        // margin-bottom: 30px;
        background-color: white;
        padding: 30px 40px;
        border: 5px solid var(--brown);
        &:active {
          background-color: var(--orange);
        }
      }
    }
  }
}
</style>
