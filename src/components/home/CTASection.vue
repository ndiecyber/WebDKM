<template>
  <section id="donasi" class="relative py-8 lg:py-10 bg-slate-50 dark:bg-[#0B1120] transition-colors duration-500 overflow-hidden">
    
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

            <h2 class="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-[1.1] mb-6" v-html="cta.title"></h2>
            
            <p class="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              {{ cta.subtitle }}
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
                <p class="text-white/90 text-sm sm:text-base italic leading-relaxed mb-3">
                  {{ cta.quote }}
                </p>
                <div class="flex items-center gap-2">
                  <div class="w-6 h-px bg-primary/50"></div>
                  <span class="text-primary/80 text-xs font-semibold tracking-wider uppercase">{{ cta.quoteSource }}</span>
                </div>
              </div>

              <!-- Progress Tracking -->
              <div class="space-y-6 mb-8 relative z-10">
                <div v-for="prog in cta.programs" :key="prog.id" class="space-y-2">
                  <div class="flex justify-between text-xs sm:text-sm font-semibold">
                    <span class="text-white">{{ prog.name }}</span>
                    <span class="text-primary">{{ prog.progress }}%</span>
                  </div>
                  <div class="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div class="h-full bg-linear-to-r from-primary to-amber-300 rounded-full progress-bar" :data-width="prog.progress" style="width: 0%;"></div>
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
import { useAdminStore } from '@/stores/admin'
import IslamicPattern from '@/components/ui/IslamicPattern.vue'
import DonationModal from '@/components/ui/DonationModal.vue'
import img1 from '@/assets/images/mosque-exterior.png'
import img2 from '@/assets/images/hero-mosque.png'
import img3 from '@/assets/images/community-prayer.png'
import { isDonationModalOpen } from '@/composables/useDonationModal'

gsap.registerPlugin(ScrollTrigger)

const adminStore = useAdminStore()
const cta = ref(adminStore.ctaSettings)

const sliderImages = [img1, img2, img3]
const currentImageIndex = ref(0)
let sliderInterval = null

const containerRef = ref(null)
const bgImageRef = ref(null)
const cardRef = ref(null)
const donationCount = ref(null)

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
  if (containerRef.value) {
    gsap.fromTo(
      containerRef.value,
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: triggerConfig }
    )
  }

  // Subtle parallax effect on the background image wrapper
  if (bgImageRef.value) {
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
  }

  // Animate progress bars
  gsap.utils.toArray('.progress-bar').forEach((el, index) => {
    gsap.to(el, {
      width: el.dataset.width + '%',
      duration: 1.5,
      ease: 'power2.out',
      delay: 0.5 + (index * 0.2),
      scrollTrigger: triggerConfig,
    })
  })

  // Animate counter
  const counter = { value: 0 }
  gsap.to(counter, {
    value: cta.value.totalDonors,
    duration: 2,
    ease: 'power2.out',
    snap: { value: 1 },
    scrollTrigger: triggerConfig,
    onUpdate: () => {
      if (donationCount.value) {
        donationCount.value.textContent = Math.round(counter.value)
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
