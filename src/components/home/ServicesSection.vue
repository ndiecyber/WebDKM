<template>
  <section id="layanan" class="relative py-8 lg:py-10 bg-white dark:bg-dark overflow-hidden transition-colors duration-500">
    <!-- Animated Islamic Pattern Background -->
    <IslamicPattern pattern-color="#C5A55A" :show-sparkles="false" />
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-6" ref="headerRef">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
          <span class="text-primary text-xs font-semibold tracking-wider uppercase">Layanan Kami</span>
        </div>
        <h2 class="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark dark:text-white mb-4 transition-colors duration-500">
          Layanan <span class="text-primary dark:text-secondary">Masjid</span>
        </h2>
        <p class="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-4xl mx-auto transition-colors duration-500">
          Berbagai program dan layanan untuk memenuhi kebutuhan spiritual dan sosial umat
        </p>
      </div>

      <!-- Filters -->
      <div class="flex justify-center mb-8 w-full px-4" ref="filterRef">
        <div class="inline-flex flex-wrap justify-center gap-1 p-1 sm:p-1.5 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-2xl sm:rounded-full w-full sm:w-auto shadow-md">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="activeCategory = cat"
            :class="[
              'px-3 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl sm:rounded-full transition-all duration-300 shrink-0 flex-1 sm:flex-none text-center',
              activeCategory === cat 
                ? 'bg-primary text-white shadow-md' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-white/5'
            ]"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Services Grid -->
      <div 
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-8" 
        ref="gridRef" 
        style="perspective: 1000px;"
      >
        <div
          v-for="(service, index) in filteredServices"
          :key="service.title"
          @click="openModal(service)"
          @mousemove="handleMouseMove($event, index)"
          @mouseleave="resetTilt(index)"
          :style="{ transform: cardTilts[index] || 'scale3d(1, 1, 1)' }"
          class="group bg-light/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-8 border-2 border-primary/20 dark:border-white/20 relative overflow-hidden transition-all duration-300 transform-gpu cursor-pointer shadow-md hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 dark:hover:border-secondary/50"
        >
          <!-- Watermark Background -->
          <div class="absolute inset-0 z-0 pointer-events-none">
            <img :src="service.bgImage" alt="" class="w-full h-full object-cover opacity-5 group-hover:opacity-[0.15] dark:mix-blend-screen transition-all duration-700 scale-110 group-hover:scale-100" />
            <div class="absolute inset-0 bg-linear-to-t from-white dark:from-dark via-white/80 dark:via-dark/80 to-transparent"></div>
          </div>

          <!-- Hover Gradient -->
          <div class="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <!-- Decorative corner -->
          <div class="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-bl-[50px] -translate-y-2 translate-x-2 group-hover:bg-secondary/20 group-hover:scale-110 transition-all duration-500"></div>
          
          <!-- Badge -->
          <div 
            v-if="service.badge"
            :class="`absolute top-4 right-4 sm:top-6 sm:right-6 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full ${service.badgeColor}`"
          >
            {{ service.badge }}
          </div>

          <div class="relative z-10">
            <!-- Icon -->
            <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-500">
              <component :is="iconMap[service.iconName] || iconMap.Users" class="w-7 h-7 text-primary group-hover:text-white transition-colors duration-500" />
            </div>

            <h3 class="font-heading text-xl font-bold text-dark dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-secondary transition-colors duration-300">
              {{ service.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 transition-colors duration-500">
              {{ service.description }}
            </p>

            <div class="flex items-center gap-2 text-primary/80 group-hover:text-primary transition-colors duration-300 font-medium">
              <span class="text-sm">Selengkapnya</span>
              <ArrowRight class="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Service Detail Modal -->
    <ServiceModal 
      :is-open="isModalOpen"
      :service="selectedService"
      @close="closeModal"
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Users, BookOpen, GraduationCap, Heart, HandCoins, Gem, ArrowRight } from 'lucide-vue-next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IslamicPattern from '@/components/ui/IslamicPattern.vue'
import ServiceModal from '@/components/ui/ServiceModal.vue'

import communityImg from '@/assets/images/community-prayer.png'
import quranImg from '@/assets/images/quran-study.png'
import interiorImg from '@/assets/images/mosque-interior.png'
import exteriorImg from '@/assets/images/mosque-exterior.png'
import heroImg from '@/assets/images/hero-mosque.png'
import { useAdminStore } from '@/stores/admin'

gsap.registerPlugin(ScrollTrigger)

const adminStore = useAdminStore()
const iconMap = {
  Users, BookOpen, GraduationCap, Heart, HandCoins, Gem
}

const headerRef = ref(null)
const filterRef = ref(null)
const gridRef = ref(null)

const isModalOpen = ref(false)
const selectedService = ref({})
const cardTilts = ref({})

const categories = ['Semua', 'Ibadah', 'Pendidikan', 'Sosial']
const activeCategory = ref('Semua')

const services = computed(() => adminStore.layanan)

const filteredServices = computed(() => {
  if (activeCategory.value === 'Semua') return services.value
  return services.value.filter(s => s.category === activeCategory.value)
})

const openModal = (service) => {
  selectedService.value = service
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  setTimeout(() => {
    selectedService.value = {}
  }, 300)
}

const handleMouseMove = (e, index) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const tiltX = ((y - centerY) / centerY) * -10
  const tiltY = ((x - centerX) / centerX) * 10
  
  cardTilts.value[index] = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`
}

const resetTilt = (index) => {
  cardTilts.value[index] = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
} 

onMounted(() => {
  if (headerRef.value) {
    gsap.fromTo(headerRef.value, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '#layanan', start: 'top 75%', once: true },
    })
  }
  if (filterRef.value && filterRef.value.children) {
    gsap.fromTo(filterRef.value.children, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: '#layanan', start: 'top 70%', once: true },
    })
  }
  if (gridRef.value && gridRef.value.children) {
    gsap.fromTo(gridRef.value.children, { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
      scrollTrigger: { trigger: '#layanan', start: 'top 65%', once: true },
    })
  }
})
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
