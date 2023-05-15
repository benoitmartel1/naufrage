<template>
  <div class="main-wrapper">
    <div v-if="isGood !== null" class="black"></div>
    <Validate
      v-if="isGood !== null"
      :isGood="isGood"
      :question="q"
      @continue="onContinue()"
    />
    <div class="backdrop frame">
      <div class="score">{{ score + '/' + questions.length }}</div>
      <div class="game">
        <div class="question">{{ q.question[lang] }}</div>
        <div class="answers">
          <div
            class="btn answer"
            v-for="(a, index) in q.answers"
            :key="a + index"
            @click="validate(a.good)"
            v-html="a[lang]"
          ></div>
        </div>
      </div>
    </div>
    <!-- <div class="frame"></div> -->
  </div>
</template>

<script>
import { questions } from '~/static/data/vore.json'

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
      console.log(isGood)
      if (isGood) {
        this.score++
        this.isGood = true
      } else {
        this.isGood = false
      }
    },
    onContinue() {
      this.currentQuestionIndex++
      if (this.questions.length <= this.currentQuestionIndex) {
        this.$store.commit('setScore', this.score)
        this.$router.push('/vore/outro')
      } else {
      }

      this.isGood = null
    },
  },
}
</script>

<style lang="scss" scoped>
.frame {
  font-weight: 700;
  padding: 30px 60px;
  //   display: flex;
  .score {
    font-size: 88px;
    line-height: 65px;
    font-weight: 400;
    float: right;
  }

  .game {
    // border: 1px solid yellow;
    display: flex;

    flex-direction: column;
    justify-content: center;
    align-items: center;
    // padding: 50px 70px;
    width: 100%;

    .question {
      margin-top: -30px;
      font-size: 48px;
      font-weight: 800;
      left: 66px;
      margin-bottom: 50px;
    }
    .answers {
      font-weight: 400;
      //   margin: auto;
      width: 100%;
      .answer {
        // width: 100%;
        text-align: center;
        font-size: 36px;
        line-height: 48px;
        border-radius: 30px;
        margin-bottom: 25px;
        background-color: white;
        padding: 20px 80px;
        border: 5px solid var(--brown);
        &:active {
          background-color: var(--orange);
        }
      }
    }
  }
}
</style>
