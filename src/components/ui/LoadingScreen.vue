<template>
  <Transition
    leave-active-class="transition-all duration-700 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0 scale-105"
  >
    <div
      v-if="show"
      class="fixed inset-0 z-[100] bg-gradient-to-br from-[#0f1423] to-[#0a0d16] flex flex-col items-center justify-center overflow-hidden"
    >
      <!-- Subtle Background Glow -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div class="relative z-10 flex flex-col items-center w-full">
        <!-- Logo -->
        <div class="relative w-48 sm:w-64 h-28 mb-10" ref="logoRef">
          <img
            :src="logoImg"
            alt="Logo Masjid Jami Kassiti"
            class="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(197,165,90,0.3)]"
          />
          <!-- Sparkle overlay on logo -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer mix-blend-overlay"></div>
        </div>

        <!-- Title -->
        <div ref="textRef" class="flex flex-col items-center">
          <h2 class="font-heading text-2xl sm:text-4xl font-bold text-white mb-2 text-center px-4 tracking-wide drop-shadow-lg">Masjid Jami Kassiti</h2>
          <p class="text-secondary text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-12 text-center px-4 leading-relaxed font-semibold">Perumahan Arjamukti • Desa Arjasari</p>
        </div>

        <!-- Premium Loading Bar -->
        <div ref="barRef" class="w-64 sm:w-80 h-[3px] bg-white/5 rounded-full overflow-hidden relative mb-12 shadow-[0_0_10px_rgba(197,165,90,0.2)]">
          <!-- Glow behind bar -->
          <div class="absolute top-0 left-0 h-full bg-secondary loading-glow blur-[3px]"></div>
          <!-- Actual solid bar -->
          <div class="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-secondary to-[#FFE299] loading-bar rounded-full"></div>
        </div>

        <!-- Bismillah -->
        <p ref="bismillahRef" class="font-arabic text-secondary/50 text-2xl drop-shadow-sm">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import logoImg from '@/assets/images/logo-kustom2.png'

const show = ref(true)
const logoRef = ref(null)
const textRef = ref(null)
const barRef = ref(null)
const bismillahRef = ref(null)

onMounted(() => {
  const tl = gsap.timeline()

  // Entry Animations
  tl.fromTo(logoRef.value, 
    { opacity: 0, scale: 0.8, y: 20 },
    { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' }
  )
  .fromTo(textRef.value.children,
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
    '-=0.6'
  )
  .fromTo(bismillahRef.value,
    { opacity: 0, filter: 'blur(8px)' },
    { opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power2.inOut' },
    '-=0.5'
  )
  .fromTo(barRef.value,
    { opacity: 0, scaleX: 0, transformOrigin: 'center' },
    { opacity: 1, scaleX: 1, duration: 0.8, ease: 'power2.out' },
    '-=1.5'
  )

  // Exit Animations perfectly timed to match HeroSection entry
  setTimeout(() => {
    // Fade out internal elements slightly before the whole screen fades
    gsap.to([logoRef.value, textRef.value, barRef.value, bismillahRef.value], {
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      stagger: 0.05,
      ease: 'power2.in'
    })
    
    setTimeout(() => {
      show.value = false
    }, 200)
  }, 1800)
})
</script>

<style scoped>
@keyframes loading-progress {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.loading-bar, .loading-glow {
  width: 100%;
  animation: loading-progress 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%) skewX(-15deg); }
  50%, 100% { transform: translateX(200%) skewX(-15deg); }
}
.animate-shimmer {
  width: 50%;
  animation: shimmer 3s infinite;
}
</style>
