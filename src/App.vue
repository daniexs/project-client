<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { RouterLink, RouterView } from 'vue-router'
export default {
  components: {RouterView,Navbar,Footer}
}
</script>

<template>
  <Navbar v-if="$route.path != '/login' && $route.path != '/register'"/>
  <RouterView />
  <Footer v-if="$route.path != '/login' && $route.path != '/register'" />
</template>