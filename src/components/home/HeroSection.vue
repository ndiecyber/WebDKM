<template>
  <section id="beranda" class="relative min-h-screen flex items-center overflow-hidden">
    <!-- Background Image Slider -->
    <div class="absolute inset-0 bg-dark overflow-hidden">
      <div ref="bgImage" class="absolute -inset-[5%] w-[110%] h-[110%]">
        <TransitionGroup name="slider">
          <img
            v-for="(img, index) in sliderImages"
            :key="img"
            v-show="currentImageIndex === index"
            :src="img"
            alt="Masjid Jami Kassiti"
            class="absolute inset-0 w-full h-full object-cover origin-center"
          />
        </TransitionGroup>
      </div>
      <div class="gradient-overlay absolute inset-0"></div>
    </div>

    <!-- Floating Particles -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        v-for="i in 6"
        :key="i"
        class="absolute w-2 h-2 bg-secondary/20 rounded-full animate-float"
        :style="{
          left: `${15 + i * 14}%`,
          top: `${20 + (i % 3) * 25}%`,
          animationDelay: `${i * 0.5}s`,
          animationDuration: `${3 + i * 0.5}s`,
        }"
      ></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
      <div class="max-w-3xl">
        <!-- Badge -->
        <div ref="badge" class="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-secondary/15 border border-secondary/30 mb-6 sm:mb-8 opacity-0 max-w-full overflow-hidden">
          <MapPin class="w-3 h-3 sm:w-4 sm:h-4 text-secondary shrink-0" />
          <span class="text-secondary text-[10px] sm:text-xs font-semibold tracking-wider uppercase whitespace-nowrap truncate">Perumahan Arjamukti • Desa Arjasari</span>
        </div>

        <!-- Heading -->
        <h2
          ref="heading"
          class="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white font-bold leading-[1.2] sm:leading-[1.1] mb-4 sm:mb-6 opacity-0"
          v-html="settings.slogan"
        >
        </h2>

        <!-- Subtitle -->
        <p
          ref="subtitle"
          class="text-white/70 text-sm sm:text-base md:text-xl leading-relaxed max-w-2xl mb-8 sm:mb-10 opacity-0"
        >
          {{ settings.description }}
        </p>

        <!-- CTA Buttons -->
        <div ref="ctas" class="flex flex-wrap items-center gap-3 sm:gap-4 opacity-0">
          <button
            @click="scrollToSection('layanan')"
            class="px-6 py-2.5 sm:px-8 sm:py-4 bg-secondary text-dark text-sm sm:text-base font-bold rounded-full hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-secondary/20"
          >
            Jelajahi Layanan
            <ArrowRight class="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            @click="scrollToSection('jadwal')"
            class="px-6 py-2.5 sm:px-8 sm:py-4 bg-white/10 text-white text-sm sm:text-base font-bold rounded-full border border-white/20 hover:bg-white/20 transition-colors duration-300 backdrop-blur-md flex items-center justify-center gap-2"
          >
            <Clock class="w-4 h-4 sm:w-5 sm:h-5" />
            Jadwal Sholat
          </button>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
      <span class="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
      <div class="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
        <div class="w-1.5 h-3 rounded-full bg-secondary scroll-indicator"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowRight, Clock, MapPin } from 'lucide-vue-next'
import { gsap } from 'gsap'
import { useAdminStore } from '@/stores/admin'
import heroImg1 from '@/assets/images/hero-mosque.png'
import heroImg2 from '@/assets/images/mosque-exterior.png'
import heroImg3 from '@/assets/images/community-prayer.png'
import heroImg4 from '@/assets/images/mosque-interior.png'
import logoImg from '@/assets/images/logo-kustom.png'

const adminStore = useAdminStore()
const settings = adminStore.generalSettings

const sliderImages = [heroImg1, heroImg2, heroImg3, heroImg4]
const currentImageIndex = ref(0)
let sliderInterval = null
const badge = ref(null)
const heading = ref(null)
const subtitle = ref(null)
const ctas = ref(null)
const bgImage = ref(null)

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  // Sync with LoadingScreen fade out (2000ms timeout + 700ms fade = 2.7s)
  // We start slightly before it completely disappears (2.2s) for a seamless handoff
  const tl = gsap.timeline({ delay: 2.2 })

  // Cinematic background zoom effect
  gsap.fromTo(bgImage.value,
    { scale: 1.1, filter: 'blur(8px)' },
    { scale: 1, filter: 'blur(0px)', duration: 3, ease: 'power2.out', delay: 1.8 }
  )

  // Setup Image Slider Interval
  sliderInterval = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % sliderImages.length
  }, 6000)

  tl.fromTo(badge.value,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
  )
    .fromTo(
      heading.value,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(
      subtitle.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(
      ctas.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )

  // Parallax on scroll
  gsap.to(bgImage.value, {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '#beranda',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  })
})

onUnmounted(() => {
  if (sliderInterval) clearInterval(sliderInterval)
})
</script>

<style scoped>
.slider-enter-active,
.slider-leave-active {
  transition: opacity 1.5s ease-in-out, transform 6s ease-out;
}
.slider-enter-from {
  opacity: 0;
  transform: scale(1.1);
}
.slider-leave-to {
  opacity: 0;
  transform: scale(1);
}
.slider-enter-to,
.slider-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
