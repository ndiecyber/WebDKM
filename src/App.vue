<template>
  <div class="min-h-screen bg-light dark:bg-dark transition-colors duration-500">
    <LoadingScreen v-if="!isAdminRoute" />
    <Navbar v-if="!isAdminRoute" />
    <RouterView />
    <Footer v-if="!isAdminRoute" />
    <BackToTop v-if="!isAdminRoute" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import BackToTop from '@/components/ui/BackToTop.vue'
import LoadingScreen from '@/components/ui/LoadingScreen.vue'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
</script>
