<template>
  <Transition
    leave-active-class="transition-all duration-1000 ease-in-out"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0 scale-105 blur-lg"
  >
    <div
      v-if="show"
      class="fixed inset-0 z-100 bg-[#07080a] flex flex-col items-center justify-center overflow-hidden"
    >
      <!-- Refined Radial Background -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/15 via-[#07080a]/95 to-[#07080a]"></div>

      <!-- Islamic Pattern Overlay -->
      <div class="absolute inset-0 opacity-[0.07] mix-blend-screen">
        <IslamicPattern pattern-color="#D4AF37" :show-sparkles="false" />
      </div>

      <!-- Soft Ambient Dust -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div v-for="(p, i) in particles" :key="i" 
             class="absolute rounded-full bg-[#FFF3B0] blur-[1px]"
             :style="{
               width: p.size + 'px',
               height: p.size + 'px',
               left: p.left + '%',
               top: p.top + '%',
               animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
               opacity: p.opacity
             }">
        </div>
      </div>

      <!-- Majestic Deep Aura -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <!-- Content Wrapper -->
      <div class="relative z-10 flex flex-col items-center w-full max-w-lg px-6">
        
        <!-- Logo -->
        <div class="relative w-48 sm:w-64 h-24 sm:h-28 mb-8" ref="logoRef">
          <img
            :src="logoImg"
            alt="Logo Masjid Jami Kassiti"
            class="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          />
        </div>

        <!-- Elegant Divider -->
        <div class="flex items-center gap-4 w-full justify-center mb-8 opacity-80" ref="dividerRef">
          <div class="h-px w-12 sm:w-20 bg-linear-to-r from-transparent to-[#D4AF37]/70"></div>
          <div class="w-2 h-2 rotate-45 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
          <div class="h-px w-12 sm:w-20 bg-linear-to-l from-transparent to-[#D4AF37]/70"></div>
        </div>

        <!-- Typography -->
        <div ref="textRef" class="flex flex-col items-center w-full">
          <h2 class="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4E3B2] mb-3 tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] text-center">
            Masjid Jami Kassiti
          </h2>
          <p class="text-[#D4AF37]/70 text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] uppercase mb-12 text-center font-medium">
            Pusat Ibadah & Peradaban
          </p>
        </div>

        <!-- Synchronized Loading Bar -->
        <div ref="barContainerRef" class="w-full max-w-[280px] sm:max-w-[320px] flex flex-col items-center mb-8">
          <div class="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <!-- Solid Bar that fills up -->
            <div ref="progressRef" class="absolute top-0 left-0 h-full bg-linear-to-r from-secondary/50 via-[#FFF3B0] to-white rounded-full w-0 shadow-[0_0_10px_#FFF3B0]"></div>
          </div>
          <div class="mt-4 text-[#D4AF37]/50 text-[10px] font-mono tracking-widest uppercase">
            Memuat Sistem
          </div>
        </div>

        <!-- Bismillah -->
        <p ref="bismillahRef" class="font-arabic text-[#D4AF37]/80 text-2xl sm:text-3xl drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import IslamicPattern from '@/components/ui/IslamicPattern.vue'
import logoImg from '@/assets/images/logo-kustom2.webp'

const show = ref(true)
const logoRef = ref(null)
const dividerRef = ref(null)
const textRef = ref(null)
const barContainerRef = ref(null)
const progressRef = ref(null)
const bismillahRef = ref(null)

// Refined, softer particles
const particles = Array.from({ length: 35 }).map(() => ({
  size: Math.random() * 2 + 1,
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: Math.random() * 5 + 5, // Slower, elegant floating
  delay: Math.random() * 5,
  opacity: Math.random() * 0.4 + 0.1
}))

onMounted(() => {
  if (sessionStorage.getItem('hasSeenSplash')) {
    show.value = false
    return
  }
  sessionStorage.setItem('hasSeenSplash', 'true')

  if (
    logoRef.value &&
    dividerRef.value &&
    textRef.value &&
    textRef.value.children &&
    bismillahRef.value &&
    barContainerRef.value &&
    progressRef.value
  ) {
    const tl = gsap.timeline()

    // 1. Elegantly fade in elements
    tl.fromTo(logoRef.value, 
      { opacity: 0, scale: 0.9, y: 15, filter: 'blur(8px)' },
      { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }
    )
    .fromTo(dividerRef.value,
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    )
    .fromTo(textRef.value.children,
      { opacity: 0, y: 15, filter: 'blur(4px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0, stagger: 0.2, ease: 'power2.out' },
      '-=0.6'
    )
    .fromTo(bismillahRef.value,
      { opacity: 0, filter: 'blur(10px)' },
      { opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power2.inOut' },
      '-=0.8'
    )
    .fromTo(barContainerRef.value,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=1.0'
    )

    // 2. Synchronous Progress Bar Fill
    // Progress takes exactly 2 seconds to reach 100%
    gsap.to(progressRef.value, {
      width: '100%',
      duration: 2.2,
      ease: 'power2.inOut',
      onComplete: () => {
        // 3. Graceful Exit Sequence triggered exactly when loading completes
        gsap.to([logoRef.value, dividerRef.value, textRef.value, barContainerRef.value, bismillahRef.value], {
          opacity: 0,
          scale: 1.02,
          y: -10,
          filter: 'blur(5px)',
          duration: 0.7,
          stagger: 0.05,
          ease: 'power2.in'
        })
        
        // Hide completely after fade out
        setTimeout(() => {
          // Force scroll to absolute top - CRITICAL for iOS Safari
          window.scrollTo(0, 0)
          document.documentElement.scrollTop = 0
          document.body.scrollTop = 0
          show.value = false
        }, 700)
      }
    })
  } else {
    // If refs are missing (e.g. server-side rendering or template mismatch), turn off loading screen immediately
    show.value = false
  }
})
</script>

<style scoped>
@keyframes float-up {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  10% { opacity: var(--opacity, 0.5); }
  90% { opacity: var(--opacity, 0.5); }
  100% { transform: translateY(-100vh) scale(0.8); opacity: 0; }
}
</style>
