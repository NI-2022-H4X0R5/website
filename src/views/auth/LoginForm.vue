<template>
  <form class="form">
    <RouterLink to="/" class="form__back">&times;</RouterLink>

    <h1 class="form__title">Connexion</h1>

    <div class="form__fields">
      <div class="form__fields__input">
        <input type="text" id="username" name="username" ref="username" required class="form__fields__input__field" />
        <label for="username" class="form__fields__input__label">Nom d'utilisateur</label>
      </div>
      <div class="form__fields__input">
        <input type="password" id="passwd" name="passwd" ref="passwd" required class="form__fields__input__field" />
        <label for="passwd" class="form__fields__input__label">Mot de passe</label>
      </div>

      <button type="button" class="form__fields__submit" @click.prevent="sendForm">Connexion</button>

      <RouterLink to="/auth/register" class="form__fields__account">Je n'ai pas de compte.</RouterLink>
    </div>
  </form>
</template>

<script lang="ts">
import axios from 'axios'
import { Options, Vue } from 'vue-class-component'

@Options({
  data: () => ({

  }),
  methods: {
    sendForm (): void {
      if (!this.$refs.username.value || this.$refs.username.value === '' || !this.$refs.passwd.value || this.$refs.passwd.value === '') {
        return
      }

      axios.post('http://194.9.172.252:10000/api/login', {
        username: this.$refs.username.value,
        password: this.$refs.passwd.value
      }).then(res => {
        localStorage.setItem('userID', res.data.data.id)
        localStorage.setItem('userName', res.data.data.username)
        localStorage.setItem('token', res.data.token)
        this.$router.push('/')
      })
    }
  }
})
export default class LoginForm extends Vue {}
</script>

<style lang="scss" src="../../assets/css/auth/common-style.scss" scoped>
@use '../../assets/css/schemes/dark';
</style>
