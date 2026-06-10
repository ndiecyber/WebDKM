<template>
  <section class="relative py-8 lg:py-10 bg-gray-50 dark:bg-[#0A0F16] overflow-hidden transition-colors duration-500 perspective-1000" ref="sectionRef" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <!-- Deep Space/Aurora Background Elements -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-80"></div>
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/5 via-transparent to-transparent opacity-80"></div>

    <!-- Islamic Pattern Overlay -->
    <IslamicPattern pattern-color="#0D4F4F" class="absolute inset-0 opacity-5 dark:opacity-5 mix-blend-overlay" />

    <!-- Enhanced Aurora Orbs -->
    <div ref="orb1Ref" class="absolute top-[-10%] right-[10%] w-[40rem] h-[40rem] bg-linear-to-br from-primary/30 to-secondary/10 rounded-full blur-[100px] mix-blend-screen opacity-60 dark:opacity-20 transition-transform duration-1000"></div>
    <div ref="orb2Ref" class="absolute bottom-[-10%] left-[10%] w-[40rem] h-[40rem] bg-linear-to-tr from-secondary/20 to-primary/20 rounded-full blur-[100px] mix-blend-screen opacity-60 dark:opacity-20 transition-transform duration-1000"></div>

    <!-- Floating Sparkles -->
    <Sparkles class="absolute top-1/4 left-1/4 w-4 h-4 text-secondary/40 animate-[ping_3s_ease-in-out_infinite]" />
    <Sparkles class="absolute bottom-1/3 right-1/4 w-6 h-6 text-primary-light/30 animate-[ping_4s_ease-in-out_infinite_1s]" />

    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" ref="contentRef">
      
      <!-- 3D Card Container -->
      <div 
        ref="cardContainerRef" 
        class="relative transition-transform duration-300 ease-out preserve-3d"
        :style="{ transform: `rotateY(${mouseX}deg) rotateX(${mouseY}deg)` }"
      >
        <!-- The Premium Glass Card -->
        <div ref="cardRef" class="group relative bg-white/70 dark:bg-[#111827]/60 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-[2rem] p-6 sm:p-10 lg:p-14 shadow-2xl transition-all duration-700 hover:shadow-[0_0_80px_rgba(217,119,6,0.15)] overflow-hidden">
          
          <!-- Animated Glow Border Reflection -->
          <div class="absolute inset-0 rounded-[2rem] bg-linear-to-br from-white/40 via-transparent to-white/10 dark:from-white/5 dark:to-transparent opacity-50 pointer-events-none transition-opacity duration-700 group-hover:opacity-100"></div>

          <!-- Decorative Large Quotes -->
          <Quote ref="quoteIconLeft" class="absolute top-6 left-6 w-12 h-12 sm:w-16 sm:h-16 text-primary/10 dark:text-secondary/10 -rotate-12 transition-all duration-700 group-hover:scale-125 group-hover:-rotate-6 group-hover:text-secondary/20" />
          <Quote ref="quoteIconRight" class="absolute bottom-6 right-6 w-12 h-12 sm:w-16 sm:h-16 text-secondary/10 dark:text-primary-light/10 rotate-[168deg] transition-all duration-700 group-hover:scale-125 group-hover:rotate-[174deg] group-hover:text-primary-light/20" />

          <div class="relative z-20">
            <!-- Decorative Top Line -->
            <div ref="linesRef" class="flex items-center justify-center gap-6 mb-8">
              <div class="h-px w-12 sm:w-20 bg-linear-to-r from-transparent to-secondary/60"></div>
              <div class="w-2.5 h-2.5 rotate-45 border border-secondary/60 flex items-center justify-center group-hover:animate-spin transition-all duration-500">
                <div class="w-1 h-1 bg-secondary shadow-[0_0_10px_rgba(234,179,8,1)]"></div>
              </div>
              <div class="h-px w-12 sm:w-20 bg-linear-to-l from-transparent to-secondary/60"></div>
            </div>

            <!-- Arabic Verse -->
            <div class="overflow-hidden mb-8">
              <p ref="arabicRef" class="relative font-arabic text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white leading-[1.8] drop-shadow-md dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-700 group-hover:drop-shadow-[0_0_25px_rgba(217,119,6,0.4)] group-hover:-translate-y-1" dir="rtl">
                <span v-if="isLoading" class="animate-pulse opacity-50 block h-14 w-64 mx-auto bg-gray-300 dark:bg-gray-700 rounded-lg"></span>
                <span v-else>{{ quoteData.arabic }}</span>
              </p>
            </div>

            <!-- Translation -->
            <div class="overflow-hidden mb-8">
              <p ref="translationRef" class="relative text-gray-700 dark:text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-heading italic transition-all duration-700 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-secondary-light group-hover:to-primary-light">
                <span v-if="isLoading" class="animate-pulse opacity-50">Memuat kutipan hari ini...</span>
                <span v-else>{{ quoteData.translation }}</span>
              </p>
            </div>

            <!-- Reference Badge -->
            <div ref="badgeRef" class="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-linear-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 border border-secondary/20 transition-all duration-500 group-hover:border-secondary/50 group-hover:shadow-[0_0_20px_rgba(217,119,6,0.2)] group-hover:-translate-y-1">
              <span class="text-primary-dark dark:text-secondary-light text-xs sm:text-sm font-bold tracking-[0.2em] uppercase flex items-center gap-2">
                <span v-if="isLoading" class="w-32 h-4 bg-primary/20 dark:bg-secondary/20 animate-pulse rounded"></span>
                <span v-else>{{ quoteData.reference }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Quote, Sparkles } from 'lucide-vue-next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IslamicPattern from '@/components/ui/IslamicPattern.vue'
import { getStorage, setStorage } from '@/utils/storage'

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
const cardContainerRef = ref(null)

const mouseX = ref(0)
const mouseY = ref(0)

const quoteData = ref({
  arabic: 'إِنَّمَا يَعْمُرُ مَسَاجِدَ اللَّهِ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ',
  translation: '"Sesungguhnya yang memakmurkan masjid-masjid Allah hanyalah orang-orang yang beriman kepada Allah dan hari kemudian"',
  reference: 'QS. At-Taubah: 18'
})
const isLoading = ref(true)

const handleMouseMove = (e) => {
  // Hanya aktif di perangkat non-touch (desktop)
  if (window.matchMedia('(hover: none)').matches) return
  
  const x = e.clientX / window.innerWidth - 0.5
  const y = e.clientY / window.innerHeight - 0.5
  // Batasi rotasi maksimal 8 derajat
  mouseX.value = x * 16
  mouseY.value = -(y * 16)
}

const handleMouseLeave = () => {
  mouseX.value = 0
  mouseY.value = 0
}

const fetchDailyAyah = async () => {
  try {
    // Koleksi ayat-ayat indah tentang ibadah, sabar, sedekah, dll
    const curatedAyahs = [
      "9:18", "2:43", "2:152", "2:153", "2:255", "2:261", "2:286", 
      "3:133", "3:134", "3:190", "14:40", "24:36", "24:37", "29:45", "62:9",
      "13:28", "40:60", "94:5", "94:6"
    ]
    
    const now = new Date()
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
    const ayahToFetch = curatedAyahs[dayOfYear % curatedAyahs.length]

    const cachedDate = getStorage('daily_ayah_date')
    const cachedAyah = getStorage('daily_ayah_data')
    
    if (cachedDate === now.toDateString() && cachedAyah) {
      quoteData.value = JSON.parse(cachedAyah)
      isLoading.value = false
      return
    }

    const response = await fetch(`https://api.alquran.cloud/v1/ayah/${ayahToFetch}/editions/quran-uthmani,id.indonesian`)
    const data = await response.json()
    
    if (data.code === 200) {
      const newQuote = {
        arabic: data.data[0].text,
        translation: `"${data.data[1].text}"`,
        reference: `QS. ${data.data[1].surah.englishName}: ${data.data[1].numberInSurah}`
      }
      
      quoteData.value = newQuote
      setStorage('daily_ayah_date', now.toDateString())
      setStorage('daily_ayah_data', JSON.stringify(newQuote))
    }
  } catch (error) {
    console.error('Gagal memuat ayat harian:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchDailyAyah()
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
  if (
    sectionRef.value &&
    cardRef.value &&
    quoteIconLeft.value &&
    quoteIconRight.value &&
    linesRef.value &&
    linesRef.value.children &&
    arabicRef.value &&
    translationRef.value &&
    badgeRef.value
  ) {
    const leftIcon = quoteIconLeft.value.$el || quoteIconLeft.value
    const rightIcon = quoteIconRight.value.$el || quoteIconRight.value

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 75%',
        once: true,
      }
    })

    // 1. Reveal the card with a slight scale up
    tl.fromTo(cardRef.value,
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
    )
    
    // 2. Animate the decorative quote marks fading and rotating in
    .fromTo([leftIcon, rightIcon],
      { opacity: 0, scale: 0.8, rotate: 0 },
      { opacity: 1, scale: 1, rotate: (i) => i === 0 ? -12 : 168, duration: 0.8, ease: 'back.out(1.2)', stagger: 0.1 },
      '-=0.6'
    )
    
    // 3. Expand the decorative lines
    .fromTo(linesRef.value.children,
      { width: 0, opacity: 0 },
      { width: (i) => i === 1 ? '0.75rem' : '4rem', opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1 },
      '-=0.6'
    )
    
    // 4. Reveal Arabic text beautifully from bottom up with rotation
    .fromTo(arabicRef.value,
      { opacity: 0, y: 40, rotateX: -15 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'power3.out', transformPerspective: 1000 },
      '-=0.5'
    )
    
    // 5. Reveal translation text
    .fromTo(translationRef.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.6'
    )
    
    // 6. Pop in the reference badge
    .fromTo(badgeRef.value,
      { opacity: 0, scale: 0.9, y: 15 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' },
      '-=0.5'
    )
  }
})
</script>
