<template>
  <section class="enigme">
    <div class="enigme__content" v-if="question !== undefined">
      <h1 class="enigme__question">{{ question }}</h1>
      <ul class="enigme__answers">
        <li class="enigme__answers-item" :key="answer" v-for="answer in this.answers">
          <button class="enigme__answers-item__select" @click.prevent="sendAnswer(answer.id)">{{ answer.content }}</button>
        </li>
      </ul>
    </div>
    <div class="enigme__loader" v-else>
      LOADING...
    </div>
  </section>
</template>

<script lang="ts">
import axios from 'axios'
import { Options, Vue } from 'vue-class-component'

@Options({
  data: () => ({
    questionId: -1,
    questionScore: -1,
    question: undefined,
    answers: [],
    right_answer: undefined
  }),
  props: {
    parent: {
      type: Object,
      required: true
    }
  },
  created () {
    this.loadQuestion()
  },
  methods: {
    loadQuestion (): void {
      axios.get('http://194.9.172.252:10000/api/questions').then(res => {
        this.questionId = res.data.id
        this.question = res.data.content
        this.answers = res.data.responses
        this.right_answer = this.answers.find((a: {id: number, score: string, content: string}) => parseInt(a.score) === 1)
      }).catch(err => console.log(err))
    },
    sendAnswer (answerId: number): void {
      if (answerId === this.right_answer.id) {
        this.$emit('updateScore', { newScore: this.parent.getScore() + parseInt(this.right_answer.score), question: this.questionId, score: this.right_answer.score })
      }

      this.question = undefined
      this.answers = []
      this.right_answer = -1

      this.loadQuestion()
    }
  }
})
export default class GameRound extends Vue {}
</script>

<style lang="scss" scoped>
@use '../assets/css/schemes/dark';

.enigme {
  flex: 1 1;
  width: 100%;
  height: 100vh;
  display: flex;
  grid-gap: 2em;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &__question {
    font-size: 2.5em;
    font-weight: 800;
    text-align: center;
  }

  &__answers {
    right: 1em;
    bottom: 1em;
    grid-gap: 1em;
    display: flex;
    flex-wrap: wrap;
    max-width: 75%;
    position: absolute;
    align-items: center;
    justify-content: flex-end;

    &-item {
      &__select {
        padding: 1em 3em;
        font-weight: 600;
        border-radius: .75em;
        background-color: dark.$button-hover;
        transition: background-color 250ms ease-in-out;

        &:hover, &:focus {
          background-color: dark.$chat-bg-other;
        }
      }
    }
  }
}
</style>
