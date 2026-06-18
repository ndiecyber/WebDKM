<template>
  <section id="beranda" class="relative min-h-screen flex items-center overflow-hidden">
    <!-- Background Image Slider -->
    <div class="absolute inset-0 bg-dark overflow-hidden">
      <div ref="bgImage" class="absolute -inset-[5%] w-[110%] h-[110%]">
        <TransitionGroup name="slider">
          <img
            v-for="(img, index) in settings.heroImages"
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
      <div class="max-w-3xl lg:pl-24 2xl:pl-0">
        <!-- Badge -->
        <div ref="badge" class="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-secondary/15 border border-secondary/30 mb-6 sm:mb-8 max-w-full overflow-hidden">
          <MapPin class="w-3 h-3 sm:w-4 sm:h-4 text-secondary shrink-0" />
          <span class="text-secondary text-[10px] sm:text-xs font-semibold tracking-wider uppercase whitespace-nowrap truncate">{{ adminStore.generalSettings.name }}</span>
        </div>

        <!-- Heading -->
        <h2
          ref="heading"
          class="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white font-bold leading-[1.2] sm:leading-[1.1] mb-4 sm:mb-6"
          v-html="parsedSlogan"
        >
        </h2>

        <!-- Subtitle -->
        <p
          ref="subtitle"
          class="text-white/70 text-sm sm:text-base md:text-xl leading-relaxed max-w-2xl mb-8 sm:mb-10"
        >
          {{ adminStore.generalSettings.description }}
        </p>

        <!-- CTA Buttons -->
        <div ref="ctas" class="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-4">
          <button
            @click="scrollToSection('keuangan')"
            class="w-full sm:w-auto px-3 py-2 sm:px-8 sm:py-4 bg-white/10 text-white text-xs sm:text-base font-bold rounded-full border border-white/20 hover:bg-white/20 transition-colors duration-300 backdrop-blur-md flex items-center justify-center gap-1.5 sm:gap-2 group"
          >
            <Wallet class="w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform shrink-0" />
            <span>Keuangan</span>
          </button>

          <a
            href="https://qurban.masjidkassiti.id"
            class="w-full sm:w-auto px-3 py-2 sm:px-8 sm:py-4 bg-secondary text-white hover:text-dark text-xs sm:text-base font-bold rounded-full hover:bg-white transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 group shadow-lg shadow-secondary/20"
          >
            <svg class="w-3.5 h-3.5 sm:w-5 sm:h-5 transition-transform group-hover:scale-110 group-hover:rotate-3 shrink-0" viewBox="0 0 231 261" fill="currentColor">
              <path d="M 3 109 L 3 114 L 4 116 L 6 118 L 6 119 L 16 129 L 27 135 L 31 136 L 31 127 L 32 126 L 33 120 L 36 114 L 34 113 L 30 113 L 29 112 L 23 112 L 22 111 L 16 111 L 15 110 L 8 110 L 7 109 Z M 199 3 L 166 3 L 165 4 L 158 5 L 157 6 L 155 6 L 154 7 L 146 9 L 143 11 L 141 11 L 131 16 L 129 18 L 126 19 L 124 21 L 117 25 L 109 32 L 108 32 L 96 44 L 96 45 L 89 53 L 89 54 L 85 59 L 84 62 L 82 64 L 79 70 L 79 72 L 76 77 L 76 79 L 75 80 L 75 82 L 74 83 L 74 85 L 73 86 L 72 90 L 70 92 L 66 93 L 57 98 L 52 103 L 51 103 L 51 104 L 44 112 L 39 122 L 39 124 L 38 125 L 38 129 L 37 130 L 37 137 L 38 138 L 38 151 L 37 152 L 37 156 L 36 157 L 35 162 L 33 165 L 32 170 L 30 173 L 30 175 L 28 178 L 28 180 L 27 181 L 27 183 L 26 184 L 26 186 L 25 187 L 25 189 L 24 190 L 24 192 L 22 196 L 22 200 L 21 202 L 22 203 L 22 206 L 23 207 L 23 209 L 25 213 L 30 219 L 38 219 L 39 218 L 44 217 L 50 214 L 55 210 L 56 210 L 60 206 L 61 207 L 61 208 L 57 212 L 57 213 L 55 214 L 50 219 L 39 224 L 41 226 L 45 227 L 46 228 L 55 228 L 56 227 L 59 227 L 68 222 L 70 224 L 71 228 L 72 229 L 72 233 L 73 234 L 73 242 L 72 243 L 72 247 L 70 250 L 70 252 L 66 257 L 70 256 L 79 248 L 85 237 L 85 235 L 87 233 L 88 234 L 89 241 L 93 233 L 94 227 L 95 226 L 95 213 L 94 212 L 94 207 L 99 203 L 105 200 L 107 200 L 111 198 L 116 194 L 117 194 L 123 188 L 123 187 L 127 182 L 128 178 L 129 177 L 129 175 L 130 174 L 130 171 L 131 170 L 131 159 L 132 158 L 131 157 L 131 155 L 132 154 L 134 156 L 134 158 L 135 159 L 135 163 L 136 164 L 136 179 L 135 180 L 135 183 L 131 191 L 123 200 L 122 200 L 119 203 L 106 209 L 114 217 L 114 218 L 119 224 L 124 234 L 124 236 L 126 240 L 126 243 L 127 243 L 129 235 L 131 232 L 131 230 L 133 227 L 133 225 L 138 215 L 140 213 L 142 209 L 153 196 L 158 186 L 159 179 L 160 178 L 160 176 L 162 172 L 165 169 L 172 165 L 175 165 L 176 164 L 181 164 L 147 131 L 142 129 L 136 132 L 132 132 L 131 133 L 129 133 L 128 132 L 136 128 L 138 126 L 141 125 L 143 123 L 147 121 L 157 111 L 157 110 L 161 105 L 163 101 L 164 96 L 165 95 L 165 92 L 166 91 L 166 83 L 163 83 L 160 85 L 158 85 L 155 87 L 153 87 L 133 97 L 131 99 L 128 100 L 122 105 L 121 105 L 116 110 L 115 108 L 118 105 L 118 104 L 121 100 L 114 94 L 114 90 L 115 89 L 115 86 L 116 85 L 117 79 L 120 73 L 120 71 L 126 59 L 128 57 L 132 50 L 136 46 L 136 45 L 147 34 L 148 34 L 156 27 L 157 27 L 162 23 L 165 22 L 167 20 L 177 15 L 179 15 L 182 13 L 184 13 L 185 12 L 187 12 L 191 10 L 198 9 L 198 4 Z M 42 195 L 43 196 L 42 199 L 32 208 L 31 207 L 31 204 L 32 202 L 37 198 L 40 197 L 41 195 Z M 102 134 L 101 140 L 95 146 L 93 147 L 83 147 L 80 149 L 79 148 L 80 143 L 88 134 L 92 133 L 93 132 L 98 132 Z M 114 3 L 101 3 L 100 4 L 98 4 L 97 5 L 89 7 L 79 12 L 77 14 L 74 15 L 68 20 L 67 20 L 55 32 L 55 33 L 49 40 L 43 52 L 43 54 L 41 57 L 41 60 L 40 61 L 40 64 L 39 65 L 39 69 L 38 70 L 37 88 L 38 89 L 38 99 L 39 100 L 39 105 L 40 107 L 42 105 L 42 104 L 52 94 L 53 94 L 58 90 L 67 86 L 67 83 L 66 82 L 66 76 L 65 75 L 65 63 L 66 62 L 66 56 L 67 55 L 67 52 L 68 51 L 69 46 L 73 38 L 75 36 L 76 33 L 79 30 L 79 29 L 92 16 L 93 16 L 96 13 L 97 13 L 102 9 L 105 8 L 107 6 Z" fill-rule="evenodd" />
            </svg>
            <span>Qurban</span>
          </a>

          <button
            @click="scrollToSection('layanan')"
            class="w-full sm:w-auto px-3 py-2 sm:px-8 sm:py-4 bg-white/10 text-white text-xs sm:text-base font-bold rounded-full border border-white/20 hover:bg-white/20 transition-colors duration-300 backdrop-blur-md flex items-center justify-center gap-1.5 sm:gap-2 group"
          >
            <HeartHandshake class="w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform shrink-0" />
            <span>Zakat</span>
          </button>

          <!-- Donasi Mobile Only -->
          <button
            @click="isDonationModalOpen = true"
            class="w-full sm:w-auto px-3 py-2 sm:px-8 sm:py-4 bg-secondary text-white hover:text-dark text-xs sm:text-base font-bold rounded-full hover:bg-white transition-colors duration-300 flex items-center justify-center gap-1.5 sm:gap-2 group shadow-lg shadow-secondary/20 lg:hidden"
          >
            <HandCoins class="w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform shrink-0" />
            <span>Donasi</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Floating Left Sidebar (Jadwal & Sosmed) -->
    <div class="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-start gap-4 z-20">
      <button @click="scrollToSection('jadwal')" class="flex items-center overflow-hidden h-12 w-12 hover:w-[155px] rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-500 group shadow-lg shadow-black/20">
        <div class="flex items-center justify-center min-w-[48px] h-full shrink-0">
          <Clock class="w-5 h-5 group-hover:scale-110 transition-transform" />
        </div>
        <span class="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 whitespace-nowrap">Jadwal Sholat</span>
      </button>
      
      <div class="w-px h-10 bg-white/20 ml-6"></div>
      
      <a :href="settings.instagram || '#'" target="_blank" rel="noopener noreferrer" class="flex items-center overflow-hidden h-10 w-10 hover:w-[110px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-500 group shadow-lg">
        <div class="flex items-center justify-center min-w-[40px] h-full shrink-0">
          <Instagram class="w-4 h-4 group-hover:scale-110 transition-transform" />
        </div>
        <span class="text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 whitespace-nowrap">Instagram</span>
      </a>
      
      <a :href="settings.facebook || '#'" target="_blank" rel="noopener noreferrer" class="flex items-center overflow-hidden h-10 w-10 hover:w-[105px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-500 group shadow-lg">
        <div class="flex items-center justify-center min-w-[40px] h-full shrink-0">
          <Facebook class="w-4 h-4 group-hover:scale-110 transition-transform" />
        </div>
        <span class="text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 whitespace-nowrap">Facebook</span>
      </a>
      
      <a :href="settings.youtube || '#'" target="_blank" rel="noopener noreferrer" class="flex items-center overflow-hidden h-10 w-10 hover:w-[105px] rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-500 group shadow-lg">
        <div class="flex items-center justify-center min-w-[40px] h-full shrink-0">
          <Youtube class="w-4 h-4 group-hover:scale-110 transition-transform" />
        </div>
        <span class="text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 whitespace-nowrap">YouTube</span>
      </a>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ArrowRight, Clock, MapPin, Gift, HeartHandshake, Instagram, Facebook, Youtube, Wallet, HandCoins } from 'lucide-vue-next'
import { isDonationModalOpen } from '@/composables/useDonationModal'
import { gsap } from 'gsap'
import { useAdminStore } from '@/stores/admin'
import heroImg1 from '@/assets/images/hero-mosque.webp'
import heroImg2 from '@/assets/images/mosque-exterior.webp'
import heroImg3 from '@/assets/images/community-prayer.webp'
import heroImg4 from '@/assets/images/mosque-interior.webp'
import logoImg from '@/assets/images/logo-kustom.webp'
import { scrollToSection } from '@/utils/scroll'

const adminStore = useAdminStore()
const settings = computed(() => adminStore.generalSettings)

const parsedSlogan = computed(() => {
  const slogan = settings.value.slogan
  if (!slogan) return ''
  // Convert *word* to gold span and \n to <br>
  return slogan
    .replace(/\*(.*?)\*/g, '<strong class="text-gradient-gold font-black drop-shadow-md">$1</strong>')
    .replace(/\n/g, '<br />')
})

const currentImageIndex = ref(0)
let sliderInterval = null
const badge = ref(null)
const heading = ref(null)
const subtitle = ref(null)
const ctas = ref(null)
const bgImage = ref(null)


onMounted(() => {
  // Setup Image Slider Interval
  sliderInterval = setInterval(() => {
    if (settings.value.heroImages && settings.value.heroImages.length > 0) {
      currentImageIndex.value = (currentImageIndex.value + 1) % settings.value.heroImages.length
    }
  }, 6000)

  // Cinematic background zoom effect
  if (bgImage.value) {
    gsap.fromTo(bgImage.value,
      { scale: 1.1, filter: 'blur(8px)' },
      { scale: 1, filter: 'blur(0px)', duration: 3, ease: 'power2.out', delay: 1.8 }
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
  }

  // Sync with LoadingScreen fade out (2000ms timeout + 700ms fade = 2.7s)
  // We start slightly before it completely disappears (2.2s) for a seamless handoff
  const hasAnimated = sessionStorage.getItem('heroAnimated')
  const initialDelay = hasAnimated ? 0 : 2.2
  if (!hasAnimated) sessionStorage.setItem('heroAnimated', 'true')

  if (badge.value && heading.value && subtitle.value && ctas.value) {
    const tl = gsap.timeline({ delay: initialDelay })
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
  }
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
