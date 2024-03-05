<template>
  <div>
    <the-header></the-header>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from './components/nav/TheHeader.vue';
import TheFooter from './components/nav/TheFooter.vue';

export default {
  components: {
    TheHeader,
    TheFooter
  },
  created() {
    localStorage.clear();
    localStorage.setItem('loglevel:webpack-dev-server', 'SILENT');
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Madimi+One&family=Noto+Sans+TC:wght@100..900&family=Noto+Serif+TC&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>