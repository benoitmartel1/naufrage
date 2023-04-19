<template>
  <div>
    <div v-if="isGood !== null" class="black"></div>
    <Validate
      v-if="isGood !== null"
      :isGood="isGood"
      @continue="onContinue()"
    />
    <div class="main">
      <div class="score">{{ score + ' / ' + questions.length }}</div>
      <div class="game">
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
      if (isGood) {
        this.score++
        this.isGood = true
      } else {
        this.isGood = false
      }
    },
    onContinue() {
      if (this.isGood) {
        this.currentQuestionIndex++
        if (this.questions.length <= this.currentQuestionIndex) {
          this.$router.push('/vore/outro')
        } else {
        }
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
