<template>
  <main class="home">
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  data: () => ({
    userName: null
  }),
  created () {
    this.userName = this.getUserName()
  },
  methods: {
    getUserName (): string | null {
      return localStorage.getItem('userName')
    }
  }
})
export default class HomeView extends Vue {}
</script>

<style lang="scss">

</style>
