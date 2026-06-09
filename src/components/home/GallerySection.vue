<template>
  <section id="galeri" class="relative py-8 lg:py-10 bg-gray-50 dark:bg-dark overflow-hidden transition-colors duration-500">
    <!-- Animated Islamic Pattern Background -->
    <IslamicPattern pattern-color="#5D2E2E" :show-sparkles="true" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-6" ref="headerRef">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
          <span class="text-primary text-xs font-semibold tracking-wider uppercase">Galeri</span>
        </div>
        <h2 class="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark dark:text-white mb-4 transition-colors duration-500">
          Galeri <span class="text-primary dark:text-secondary">Masjid</span>
        </h2>
        <p class="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-4xl mx-auto transition-colors duration-500">
          Momen-momen berharga dalam berbagai kegiatan di Masjid Jami Kassiti
        </p>
      </div>

      <!-- New Gallery Carousel -->
      <div class="max-w-5xl mx-auto" ref="galleryRef">
        <!-- Featured Image -->
        <div 
          class="relative w-full h-[350px] sm:h-[450px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl mb-6 cursor-pointer group bg-dark"
          @click="openLightbox(activeIndex)"
          @mouseenter="pauseAutoPlay"
          @mouseleave="startAutoPlay"
          @touchstart="pauseAutoPlay"
          @touchend="startAutoPlay"
        >
          <Transition name="cinematic" mode="out-in">
            <div :key="activeIndex" class="absolute inset-0 w-full h-full">
              <img 
                :src="gallery[activeIndex].image" 
                :alt="gallery[activeIndex].caption" 
                class="w-full h-full object-cover transition-transform duration-10000 ease-out hover:scale-110" 
              />
            </div>
          </Transition>
          
          <!-- Glassmorphism Overlay -->
          <div class="absolute inset-x-0 bottom-0 pt-32 pb-6 px-6 sm:pb-10 sm:px-10 bg-linear-to-t from-dark/95 via-dark/50 to-transparent">
            <Transition name="slide-up" mode="out-in">
              <div :key="activeIndex" class="relative">
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary/20 backdrop-blur-md flex items-center justify-center border border-secondary/30 text-secondary">
                    <component :is="iconMap[gallery[activeIndex].iconName] || iconMap.Camera" class="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span class="text-white/90 text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-black/50 drop-shadow-md">{{ gallery[activeIndex].tag }}</span>
                </div>
                <h3 class="text-xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-1 sm:mb-2 shadow-black/50 drop-shadow-lg">{{ gallery[activeIndex].caption }}</h3>
                <p class="text-white/80 text-xs sm:text-base max-w-xl shadow-black/50 drop-shadow-md line-clamp-2 sm:line-clamp-none">{{ gallery[activeIndex].subcaption }}</p>
              </div>
            </Transition>
          </div>

          <!-- Top Right Zoom Icon -->
          <div class="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <ZoomIn class="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        <!-- Pagination Dots -->
        <div class="flex items-center justify-center gap-2 sm:gap-3 mb-6 mt-4 sm:mt-6">
          <button 
            v-for="(_, index) in gallery" 
            :key="'dot-'+index"
            @click="goToSlide(index)"
            :class="[
              'h-2 rounded-full transition-all duration-500',
              activeIndex === index ? 'w-8 bg-secondary' : 'w-2 bg-gray-300 dark:bg-white/20 hover:bg-secondary/50'
            ]"
            :aria-label="`Go to slide ${index + 1}`"
          ></button>
        </div>

        <!-- Thumbnails Row -->
        <div class="flex flex-wrap justify-center gap-3 sm:gap-4 pb-4 px-2 -mx-2">
          <button
            v-for="(item, index) in gallery"
            :key="'thumb-'+index"
            @click="goToSlide(index)"
            :class="[
              'relative shrink-0 w-24 sm:w-36 h-16 sm:h-24 rounded-xl overflow-hidden snap-center transition-all duration-300 border-2',
              activeIndex === index ? 'border-secondary opacity-100 scale-105 shadow-lg shadow-secondary/20 z-10' : 'border-transparent opacity-50 hover:opacity-100 grayscale hover:grayscale-0'
            ]"
          >
            <img :src="item.image" :alt="item.caption" class="w-full h-full object-cover" />
            <div :class="['absolute inset-0 bg-dark transition-opacity duration-300', activeIndex === index ? 'opacity-0' : 'opacity-20']"></div>
          </button>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="lightboxOpen"
        class="fixed inset-0 z-60 bg-dark/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        @click.self="closeLightbox"
      >
        <!-- Close Button -->
        <button @click="closeLightbox" class="absolute top-6 right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-10">
          <X class="w-5 h-5" />
        </button>

        <!-- Navigation -->
        <button
          @click.stop="prevImage"
          class="absolute left-4 sm:left-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
        >
          <ChevronLeft class="w-5 h-5" />
        </button>

        <button
          @click.stop="nextImage"
          class="absolute right-4 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
        >
          <ChevronRight class="w-5 h-5" />
        </button>

        <!-- Image -->
        <div class="max-w-5xl max-h-[80vh] w-full">
          <img
            :src="gallery[lightboxIndex].image"
            :alt="gallery[lightboxIndex].caption"
            class="w-full h-full object-contain rounded-2xl"
          />
          <div class="text-center mt-4">
            <p class="text-white font-heading text-lg font-semibold">{{ gallery[lightboxIndex].caption }}</p>
            <p class="text-white/50 text-sm">{{ gallery[lightboxIndex].subcaption }}</p>
            <p class="text-white/30 text-xs mt-2">{{ lightboxIndex + 1 }} / {{ gallery.length }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { ZoomIn, X, ChevronLeft, ChevronRight, Camera, Users, BookOpen, MapPin, Building } from 'lucide-vue-next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAdminStore } from '@/stores/admin'
import IslamicPattern from '@/components/ui/IslamicPattern.vue'

gsap.registerPlugin(ScrollTrigger)

const adminStore = useAdminStore()
const gallery = computed(() => adminStore.gallery)

const iconMap = {
  Camera, Users, BookOpen, MapPin, Building
}

const headerRef = ref(null)
const galleryRef = ref(null)
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
const activeIndex = ref(0)
let autoPlayInterval = null

const goToSlide = (index) => {
  activeIndex.value = index
  resetAutoPlay()
}

const startAutoPlay = () => {
  autoPlayInterval = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % gallery.value.length
  }, 5000)
}

const pauseAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}

const resetAutoPlay = () => {
  pauseAutoPlay()
  startAutoPlay()
}

const openLightbox = (index) => {
  lightboxIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
  pauseAutoPlay()
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
  startAutoPlay()
}

const nextImage = () => {
  lightboxIndex.value = (lightboxIndex.value + 1) % gallery.value.length
}

const prevImage = () => {
  lightboxIndex.value = (lightboxIndex.value - 1 + gallery.value.length) % gallery.value.length
}

const handleKeydown = (e) => {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  startAutoPlay()

  gsap.fromTo(headerRef.value, { opacity: 0, y: 40 }, {
    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '#galeri', start: 'top 75%', once: true },
  })
  gsap.fromTo(galleryRef.value, { opacity: 0, y: 50 }, {
    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
    scrollTrigger: { trigger: '#galeri', start: 'top 65%', once: true },
  })
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  pauseAutoPlay()
})
</script>

<style scoped>
.cinematic-enter-active,
.cinematic-leave-active {
  transition: opacity 1.5s ease-in-out, transform 1.5s cubic-bezier(0.25, 1, 0.5, 1);
}
.cinematic-enter-from {
  opacity: 0;
  transform: scale(1.1) rotate(1deg);
}
.cinematic-leave-to {
  opacity: 0;
  transform: scale(0.95) rotate(-1deg);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(15px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
