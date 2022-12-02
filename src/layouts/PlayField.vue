<template>
  <div class="overlay">
    <!-- <img src="" alt="" class="overlay__brand" /> -->

    <section v-if="username !== undefined && username !== null" style="position: fixed; top: 0; left: 0; padding: 1.5em">
      {{ username }}
    </section>

    <section class="overlay__score">
      <span class="overlay__score__content">{{ score }}</span>
      <span class="overlay__score__content-best">Best score : <b>{{ best_score }}</b></span>
    </section>
  </div>

  <main class="content">
    <div class="content__container">
      <RouterView :parent="this" @updateScore="handleNewScore" />
    </div>
  </main>
</template>

<script lang="ts">
import axios from 'axios'
import { ages } from '@/assets/js/mock-ages'
import { Options, Vue } from 'vue-class-component'

@Options({
  data: () => ({
    score: 0,
    best_score: 0,
    username: undefined
  }),
  created () {
    this.score = this.getScore()
    this.best_score = this.getBestScore()

    if (localStorage.getItem('token')) {
      const alphabet = 'abcdefijklmnopqrstuvwxyz'
      let random = ''

      for (let i = 0; i < 6; i++) {
        random += alphabet[Math.floor(Math.random() * alphabet.length)]
      }

      this.$store.state.game = random
      console.log(random, this.$store.state.game)
      axios.post('http://194.9.172.252:10000/api/games', {
        code: random
      }, { headers: { authorization: `Bearer: ${localStorage.getItem('token')}` } }).then(_ => console.log('CREATED!'))
    }
  },
  mounted () {
    this.username = localStorage.getItem('userName')
  },
  methods: {
    getAgePart (): string {
      const agePart: { label: string, ages: number[]} | undefined = ages.find(part => this.age >= part.ages[0] && this.age < part.ages[1])
      return agePart ? agePart?.label : 'undefined'
    },
    getScore (): number {
      if (!localStorage.getItem('score')) {
        localStorage.setItem('score', '0')
      }

      const score: string | null = localStorage.getItem('score')
      return score ? parseInt(score) : 0
    },
    getBestScore (): number {
      if (!localStorage.getItem('best_score')) {
        localStorage.setItem('best_score', '0')
      }

      const localBestScore: string | null = localStorage.getItem('best_score')
      return localBestScore ? parseInt(localBestScore) : 0
    },
    setScores (question: number, score: number, questionScore: number, best?: boolean) {
      this.score = score
      localStorage.setItem('score', `${this.score}`)
      console.log(`GAME CODE: ${this.$store.state.game}`)
      if (this.$store.state.game) {
        axios.post('http://194.9.172.252:10000/api/scores', {
          questionId: question,
          gameCode: this.$store.state.game,
          score: questionScore
        }, { headers: { authorization: `Bearer: ${localStorage.getItem('token')}` } }).then(_ => console.log('PUSHED!'))
      }

      if (best) {
        this.best_score = score
        localStorage.setItem('best_score', `${this.best_score}`)
      }
    },
    handleNewScore (event: any) {
      this.setScores(event.question, event.newScore, event.score, event.newScore > this.best_score)
    }
  }
})
export default class PlayField extends Vue {}
</script>

<style lang="scss" scoped>
@use '../assets/css/schemes/dark';

.overlay {
  &__score {
    left: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    position: fixed;
    padding: 1.5em 3.5em;
    flex-direction: column;

    &__content {
      font-size: 2em;
      font-weight: 700;
      line-height: 115%;

      &-best {
        opacity: .5;
        font-style: italic;

        > b {
          font-weight: 700;
          font-style: italic;
        }
      }
    }
  }
}

.content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: stretch;
  flex-direction: row-reverse;

  &__container {
    width: 100%;
    height: 100vh;
    display: flex;
    overflow-y: hidden;
    align-items: center;
    justify-content: center;
  }
}
</style>
