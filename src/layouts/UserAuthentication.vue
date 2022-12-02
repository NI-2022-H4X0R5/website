<template>
  <section class="form">
    <RouterView />
  </section>
</template>

<script>
import { Options, Vue } from 'vue-class-component'

@Options({

})
export default class UserAuthentication extends Vue {}
</script>

<style lang="scss" scoped>
@use '../assets/css/schemes/dark';

.form {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
