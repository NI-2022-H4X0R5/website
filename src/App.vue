<template>
  <RouterView />
</template>

<style lang="scss">
@use './assets/css/schemes/dark';
@forward './assets/css/defaults/normalize';

#app {
  width: 100%;
  min-height: 100vh;
  color: dark.$text;
  background-color: dark.$background;
}
</style>
