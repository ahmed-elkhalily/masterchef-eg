<script setup>
import NavBar from './components/NavBar.vue'
import ErrorMessage from './components/ErrorMessage.vue'
import Footer from './components/AppFooter.vue'
import Cart from './components/AppCart.vue'
import { useI18n } from 'vue-i18n';

const { locale } = useI18n({ useScope: 'global' })

locale.value = localStorage.getItem("siteLang") || 'en'

</script>
<template>
  <v-app>
    <v-system-bar window>
      <v-spacer />
      <h2 v-if="locale === 'ar'">نسخة تجريبية</h2>
      <h2 v-else>Trail Version</h2>
      <v-spacer />
    </v-system-bar>
    <Suspense>
      <NavBar />
    </Suspense>
    <Suspense>
      <Cart />
    </Suspense>
    <v-main>
      <ErrorMessage />
      <Suspense>
        <router-view />
      </Suspense>
    </v-main>
    <Suspense>
      <Footer />
    </Suspense>
  </v-app>
</template>

<style>
.sweetAlertZConfig {
  z-index: 100000000 !important;
}

.pulse:hover {
  border-color: #00AADC;
  overflow: inherit;
  z-index: 0;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  -webkit-animation-name: animate;
  -webkit-animation-duration: 2s;
  -webkit-animation-iteration-count: 1;
}

.v-application .py-1:hover {
  background-color: #ffc120;
}

.img-fit:hover {
  border-color: #00AADC;
  overflow: inherit;
  z-index: 10;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  -webkit-animation-name: animate;
  -webkit-animation-duration: 2s;
  -webkit-animation-iteration-count: 1;
}

@keyframes animate {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

body {
  font-family: 'Cairo', 'sans-serif';
}
</style>