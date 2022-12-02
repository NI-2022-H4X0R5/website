<template>
  <router-view/>
</template>

<style lang="scss">
@use "./assets/css/schemes/dark";
@forward "./assets/css/defaults/normalize";

#app {
  width: 100%;
  color: dark.$text;
  min-height: 100vh;
}
</style>
