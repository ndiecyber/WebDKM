<template>
  <div id="app-root" class="min-h-screen bg-light dark:bg-dark transition-colors duration-500 overflow-x-hidden relative">
    <LoadingScreen v-if="!isAdminRoute" />
    <Navbar v-if="!isAdminRoute" />
    <RouterView />
    <Footer v-if="!isAdminRoute" />
    <BackToTop v-if="!isAdminRoute" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import BackToTop from '@/components/ui/BackToTop.vue'
import LoadingScreen from '@/components/ui/LoadingScreen.vue'
import { useAdminStore } from '@/stores/admin'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
const adminStore = useAdminStore()

onMounted(() => {
  // Fetch real database data for the public website sections
  adminStore.fetchLayanan()
  adminStore.fetchKegiatan()
  adminStore.fetchGallery()
  adminStore.fetchCommittee()
})
</script>
