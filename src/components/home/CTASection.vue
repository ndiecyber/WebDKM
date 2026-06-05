<template>
  <section id="donasi" class="relative py-20 lg:py-32 bg-slate-50 dark:bg-[#0B1120] transition-colors duration-500 overflow-hidden">
    
    <!-- Animated Islamic Pattern Background for the section -->
    <IslamicPattern pattern-color="#0D4F4F" pattern-opacity="opacity-[0.25] dark:opacity-20" class="absolute inset-0 w-full h-full" />

    <!-- Main Container Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Immersive CTA Container -->
      <div ref="containerRef" class="relative w-full rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-2xl bg-slate-900">
        
        <!-- Background Image Slider with Parallax effect -->
        <div ref="bgImageRef" class="absolute inset-[-10%] w-[120%] h-[120%]">
          <TransitionGroup name="slider">
            <img
              v-for="(img, index) in sliderImages"
              :key="img"
              v-show="currentImageIndex === index"
              :src="img"
              alt="Masjid Exterior"
              class="absolute inset-0 w-full h-full object-cover object-center"
            />
          </TransitionGroup>
        </div>
        
        <!-- Dark Overlay for Readability -->
        <div class="absolute inset-0 bg-linear-to-r from-slate-900/95 via-slate-900/80 to-slate-900/30"></div>
        <div class="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
        
        <!-- Content Grid -->
        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 p-6 sm:p-12 lg:p-20 items-center">
          
          <!-- Left Column: Copywriting & CTA -->
          <div class="relative z-20 text-center lg:text-left">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6 sm:mb-8">
              <Heart class="w-4 h-4 text-primary animate-pulse fill-primary" />
              <span class="text-white text-xs font-bold tracking-widest uppercase">Peluang Amal Jariyah</span>
            </div>

            <h2 class="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
              Investasi Terbaik <br class="hidden sm:block" />
              <span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-amber-200">Untuk Akhirat</span>
            </h2>

            <p class="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0">
              Setiap rupiah yang Anda sedekahkan tidak hanya memakmurkan masjid, tapi juga mengalirkan pahala yang tak terputus bagi Anda dan keluarga.
            </p>

            <button
              @click="isDonationModalOpen = true"
              class="group relative inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-2.5 sm:py-4 bg-primary text-white font-bold text-sm sm:text-lg rounded-full overflow-hidden transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_40px_rgba(197,165,90,0.3)] w-auto max-w-full"
            >
              <!-- Shine Effect -->
              <div class="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
              
              <HandCoins class="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:scale-110 transition-transform" />
              <span class="relative z-10">Tunaikan Infaq Sekarang</span>
            </button>

            <!-- Supported Payments -->
            <div class="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-white/50 text-xs">
              <span class="uppercase tracking-widest font-semibold text-white/70">Mendukung:</span>
              <div class="flex flex-wrap justify-center items-center gap-2">
                <div class="px-2.5 py-1 bg-white/10 rounded backdrop-blur-sm border border-white/10 font-bold text-white">QRIS</div>
                <div class="px-2.5 py-1 bg-white/10 rounded backdrop-blur-sm border border-white/10 font-bold text-white">Transfer Bank</div>
                <div class="px-2.5 py-1 bg-white/10 rounded backdrop-blur-sm border border-white/10 font-bold text-white">E-Wallet</div>
              </div>
            </div>
          </div>

          <!-- Right Column: Glassmorphism Info Panel with 3D Tilt -->
          <div class="w-full flex justify-center lg:justify-end perspective-1000 mt-8 lg:mt-0">
            <div 
              ref="cardRef"
              @mousemove="handleMouseMove"
              @mouseleave="handleMouseLeave"
              :style="{ transform: cardTilt, transition: isMouseOver ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out' }"
              class="w-full max-w-[20rem] sm:max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden will-change-transform"
            >
              <!-- Decorative element -->
              <div class="absolute -top-24 -right-24 w-48 h-48 bg-primary/30 rounded-full blur-3xl pointer-events-none"></div>

              <!-- Hadith Quote -->
              <div class="mb-5 sm:mb-8 relative z-10">
                <Quote class="w-6 h-6 sm:w-8 sm:h-8 text-primary/40 mb-2 sm:mb-3" />
                <p class="text-white/90 font-serif italic leading-relaxed mb-2 sm:mb-3 text-sm sm:text-base">
                  "Barang siapa yang membangun masjid karena Allah, maka Allah akan membangunkan baginya rumah di surga."
                </p>
                <p class="text-primary text-xs sm:text-sm font-semibold tracking-wider">
                  — HR. Bukhari & Muslim
                </p>
              </div>

              <!-- Progress Tracking -->
              <div class="space-y-4 sm:space-y-6 relative z-10">
                <!-- Program 1 -->
                <div>
                  <div class="flex justify-between items-end mb-1.5 sm:mb-2">
                    <span class="text-white font-medium text-xs sm:text-sm">Renovasi Aula Utama</span>
                    <span class="text-primary font-bold text-xs sm:text-sm">75%</span>
                  </div>
                  <div class="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden">
                    <div ref="progressBar1" class="h-full bg-linear-to-r from-primary to-amber-300 rounded-full relative" style="width: 0%">
                       <!-- Moving light effect on progress bar -->
                       <div class="absolute top-0 right-0 bottom-0 left-0 bg-linear-to-r from-transparent via-white/50 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                  </div>
                </div>

                <!-- Program 2 -->
                <div>
                  <div class="flex justify-between items-end mb-1.5 sm:mb-2">
                    <span class="text-white font-medium text-xs sm:text-sm">Sarana Pendidikan TPQ</span>
                    <span class="text-primary font-bold text-xs sm:text-sm">60%</span>
                  </div>
                  <div class="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden">
                    <div ref="progressBar2" class="h-full bg-linear-to-r from-primary to-amber-300 rounded-full relative" style="width: 0%">
                      <div class="absolute top-0 right-0 bottom-0 left-0 bg-linear-to-r from-transparent via-white/50 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Stats & Social Proof -->
              <div class="mt-5 pt-4 sm:mt-8 sm:pt-6 border-t border-white/10 relative z-10">
                <p class="text-white/60 text-[10px] sm:text-xs uppercase tracking-widest mb-1.5 sm:mb-2">Total Donatur Bulan Ini</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-baseline gap-1.5 sm:gap-2">
                    <span ref="donationCount" class="text-3xl sm:text-4xl font-heading font-extrabold text-white">0</span>
                    <span class="text-primary text-xs sm:text-sm font-medium">Orang</span>
                  </div>
                  
                  <!-- Overlapping Avatars -->
                  <div class="flex -space-x-2 sm:-space-x-3 pointer-events-none">
                    <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-slate-800 bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-[10px] sm:text-xs text-white font-bold z-30 shadow-lg">IH</div>
                    <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-slate-800 bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-[10px] sm:text-xs text-white font-bold z-20 shadow-lg">PD</div>
                    <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-slate-800 bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[10px] sm:text-xs text-white font-bold z-10 shadow-lg">+126</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <DonationModal :is-open="isDonationModalOpen" @close="isDonationModalOpen = false" />
  </section>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Heart, HandCoins, Quote } from 'lucide-vue-next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IslamicPattern from '@/components/ui/IslamicPattern.vue'
import DonationModal from '@/components/ui/DonationModal.vue'
import img1 from '@/assets/images/mosque-exterior.png'
import img2 from '@/assets/images/hero-mosque.png'
import img3 from '@/assets/images/community-prayer.png'
import { isDonationModalOpen } from '@/composables/useDonationModal'

gsap.registerPlugin(ScrollTrigger)

const sliderImages = [img1, img2, img3]
const currentImageIndex = ref(0)
let sliderInterval = null

const containerRef = ref(null)
const bgImageRef = ref(null)
const progressBar1 = ref(null)
const progressBar2 = ref(null)
const donationCount = ref(null)
const cardRef = ref(null)

// 3D Tilt Effect Logic
const cardTilt = ref('perspective(1000px) rotateX(0deg) rotateY(0deg)')
const isMouseOver = ref(false)

const handleMouseMove = (e) => {
  const card = cardRef.value
  if (!card) return
  isMouseOver.value = true
  
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  // Calculate tilt (max 8 degrees)
  const tiltX = ((y - centerY) / centerY) * -8
  const tiltY = ((x - centerX) / centerX) * 8
  
  cardTilt.value = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
}

const handleMouseLeave = () => {
  isMouseOver.value = false
  cardTilt.value = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
}

onMounted(() => {
  sliderInterval = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % sliderImages.length
  }, 6000)

  const triggerConfig = {
    trigger: '#donasi',
    start: 'top 80%',
    once: true,
  }

  // Fade in and scale up the container
  gsap.fromTo(
    containerRef.value,
    { opacity: 0, y: 50, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: triggerConfig }
  )

  // Subtle parallax effect on the background image wrapper
  gsap.to(bgImageRef.value, {
    y: '-10%',
    ease: 'none',
    scrollTrigger: {
      trigger: '#donasi',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  })

  // Animate progress bars
  gsap.to(progressBar1.value, {
    width: '75%',
    duration: 1.5,
    ease: 'power2.out',
    delay: 0.5,
    scrollTrigger: triggerConfig,
  })

  gsap.to(progressBar2.value, {
    width: '60%',
    duration: 1.5,
    ease: 'power2.out',
    delay: 0.7,
    scrollTrigger: triggerConfig,
  })

  // Animate counter
  const counter = { value: 0 }
  gsap.to(counter, {
    value: 128,
    duration: 2,
    ease: 'power2.out',
    snap: { value: 1 },
    scrollTrigger: triggerConfig,
    onUpdate: () => {
      if (donationCount.value) {
        donationCount.value.textContent = counter.value
      }
    },
  })
})

onUnmounted(() => {
  if (sliderInterval) clearInterval(sliderInterval)
})
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* Slider CSS for smooth auto-slide */
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
