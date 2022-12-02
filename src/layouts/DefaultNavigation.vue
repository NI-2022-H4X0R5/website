<template>
  <header class="header">
    <div class="header__brand">
      <!-- <img src="" alt="" class="header__brand__logo" /> -->
      <h3 class="header__brand__name">EscapIST</h3>
    </div>

    <nav class="header__menu">
      <ul class="header__menu__items">
        <li class="header__menu__items-link">
          <RouterLink to="/" active-class="active" class="header__menu__items-link__content">Accueil</RouterLink>
        </li>
        <li class="header__menu__items-link">
          <RouterLink to="/" active-class="active" class="header__menu__items-link__content">Liste des MST</RouterLink>
        </li>
        <li class="header__menu__items-link">
          <RouterLink to="/" active-class="active" class="header__menu__items-link__content">Mon compte</RouterLink>
        </li>
      </ul>
    </nav>
  </header>

  <RouterView />
</template>

<script>
import { Vue } from 'vue-class-component'

export default class DefaultNavigation extends Vue {}
</script>

<style scoped>

</style>
