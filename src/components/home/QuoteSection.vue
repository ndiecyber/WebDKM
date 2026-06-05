<template>
  <section class="relative py-16 lg:py-24 bg-gray-50 dark:bg-[#061c1c] overflow-hidden transition-colors duration-500" ref="sectionRef">
    <!-- Islamic Pattern -->
    <div class="absolute inset-0 islamic-pattern-bg opacity-5 dark:opacity-10"></div>

    <!-- Enhanced Gradient Orbs for depth -->
    <div ref="orb1Ref" class="absolute top-[-20%] right-[-10%] w-[40rem] h-[40rem] bg-primary/20 dark:bg-secondary/15 rounded-full blur-[120px] transition-colors duration-500"></div>
    <div ref="orb2Ref" class="absolute bottom-[-20%] left-[-10%] w-[40rem] h-[40rem] bg-secondary/20 dark:bg-primary-light/15 rounded-full blur-[120px] transition-colors duration-500"></div>

    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" ref="contentRef">
      <!-- Premium Glass Card with Hover Effects -->
      <div ref="cardRef" class="group bg-white/80 dark:bg-white/5 backdrop-blur-3xl border border-primary/15 dark:border-white/10 border-t-primary/40 dark:border-t-secondary/30 rounded-[2.5rem] p-8 sm:p-12 lg:p-14 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-700 relative overflow-hidden hover:shadow-[0_30px_80px_-15px_rgba(15,118,110,0.15)] dark:hover:shadow-[0_30px_80px_-15px_rgba(217,119,6,0.15)] hover:-translate-y-2">
        
        <!-- Large decorative background quote icons -->
        <Quote ref="quoteIconLeft" class="absolute top-6 left-6 w-24 h-24 lg:w-32 lg:h-32 text-primary/5 dark:text-secondary/5 -rotate-12 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6" />
        <Quote ref="quoteIconRight" class="absolute bottom-6 right-6 w-24 h-24 lg:w-32 lg:h-32 text-secondary/5 dark:text-primary-light/5 rotate-[168deg] transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[174deg]" />

        <!-- Shine effect on card -->
        <div class="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent dark:from-white/10 dark:to-transparent opacity-50 pointer-events-none transition-opacity duration-700 group-hover:opacity-100"></div>

        <div class="relative z-20">
          <!-- Intricate Decorative Lines -->
          <div ref="linesRef" class="relative flex items-center justify-center gap-4 mb-8">
            <div class="w-16 h-px bg-gradient-to-r from-transparent to-primary/40 dark:to-secondary/50"></div>
            <div class="w-3 h-3 rotate-45 border-2 border-primary/40 dark:border-secondary/50 flex items-center justify-center">
              <div class="w-1 h-1 bg-secondary dark:bg-primary-light"></div>
            </div>
            <div class="w-16 h-px bg-gradient-to-l from-transparent to-primary/40 dark:to-secondary/50"></div>
          </div>

          <!-- Arabic Verse with Gradient -->
          <div class="overflow-hidden mb-8">
            <p ref="arabicRef" class="relative font-arabic text-3xl sm:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-primary-dark dark:from-white dark:to-gray-300 leading-[1.6] drop-shadow-sm" dir="rtl">
              إِنَّمَا يَعْمُرُ مَسَاجِدَ اللَّهِ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ
            </p>
          </div>

          <!-- Translation -->
          <div class="overflow-hidden mb-8">
            <p ref="translationRef" class="relative text-primary-dark dark:text-secondary-light text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto font-heading italic">
              "Sesungguhnya yang memakmurkan masjid-masjid Allah hanyalah orang-orang yang beriman kepada Allah dan hari kemudian"
            </p>
          </div>

          <!-- Reference Badge -->
          <div ref="badgeRef" class="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-primary/5 dark:bg-secondary/10 border border-primary/10 dark:border-secondary/20 transition-colors duration-500 group-hover:bg-primary/10 dark:group-hover:bg-secondary/20">
            <p class="text-primary-dark dark:text-secondary-light text-sm font-bold tracking-[0.2em] uppercase">
              QS. At-Taubah: 18
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Quote } from 'lucide-vue-next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const orb1Ref = ref(null)
const orb2Ref = ref(null)
const cardRef = ref(null)
const quoteIconLeft = ref(null)
const quoteIconRight = ref(null)
const linesRef = ref(null)
const arabicRef = ref(null)
const translationRef = ref(null)
const badgeRef = ref(null)

onMounted(() => {
  // Continuous gentle floating animation for the orbs
  gsap.to(orb1Ref.value, {
    x: 40,
    y: 30,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })
  
  gsap.to(orb2Ref.value, {
    x: -40,
    y: -30,
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 1
  })

  // Stunning Entrance Animation Timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 75%',
      once: true,
    }
  })

  // 1. Reveal the card with a slight scale up
  tl.fromTo(cardRef.value,
    { opacity: 0, y: 40, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'expo.out' }
  )
  
  // 2. Animate the decorative quote marks fading and rotating in
  .fromTo([quoteIconLeft.value.$el || quoteIconLeft.value, quoteIconRight.value.$el || quoteIconRight.value],
    { opacity: 0, scale: 0.5, rotate: 0 },
    { opacity: 1, scale: 1, rotate: (i) => i === 0 ? -12 : 168, duration: 1.2, ease: 'back.out(1.5)', stagger: 0.2 },
    '-=0.8'
  )
  
  // 3. Expand the decorative lines
  .fromTo(linesRef.value.children,
    { width: 0, opacity: 0 },
    { width: (i) => i === 1 ? '0.75rem' : '4rem', opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1 },
    '-=1.0'
  )
  
  // 4. Reveal Arabic text beautifully from bottom up with rotation
  .fromTo(arabicRef.value,
    { opacity: 0, y: 60, rotateX: -20 },
    { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: 'power4.out', transformPerspective: 1000 },
    '-=0.8'
  )
  
  // 5. Reveal translation text
  .fromTo(translationRef.value,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
    '-=0.9'
  )
  
  // 6. Pop in the reference badge
  .fromTo(badgeRef.value,
    { opacity: 0, scale: 0.8, y: 20 },
    { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.5)' },
    '-=0.7'
  )
})
</script>
