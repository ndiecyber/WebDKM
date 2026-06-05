<template>
  <section id="tentang" class="relative py-20 lg:py-28 bg-cream dark:bg-[#121220] overflow-hidden transition-colors duration-500">
    <!-- Animated Islamic Pattern Background -->
    <IslamicPattern pattern-color="#0D4F4F" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <!-- Left: Text Content -->
        <div ref="textContent">
          <!-- Section Label -->
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span class="text-primary text-xs font-semibold tracking-wider uppercase">Tentang Kami</span>
          </div>

          <h2 class="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark dark:text-white mb-6 leading-tight transition-colors duration-500">
            Selamat Datang di
            <span class="text-primary dark:text-secondary">Masjid Jami Kassiti</span>
          </h2>

          <div class="section-divider mb-8"></div>

          <p class="text-dark/60 dark:text-white/60 text-base sm:text-lg leading-relaxed mb-6 transition-colors duration-500">
            Masjid Jami Kassiti yang berlokasi di Perumahan Arjamukti, Desa Arjasari, adalah pusat ibadah dan kegiatan keislaman yang melayani umat dengan penuh dedikasi. Kami berkomitmen untuk menjadi rumah Allah yang menyejukkan, tempat berkumpulnya jamaah dalam menuntut ilmu, beribadah, dan mempererat ukhuwah islamiah.
          </p>

          <p class="text-dark/60 dark:text-white/60 text-base sm:text-lg leading-relaxed mb-10 transition-colors duration-500">
            Dengan berbagai program kegiatan rutin seperti kajian, TPA/TPQ, dan kegiatan sosial, kami berusaha membangun generasi muslim yang beriman, berilmu, dan bermanfaat bagi masyarakat sekitar.
          </p>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4 sm:gap-6">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="text-center p-4 rounded-2xl bg-light dark:bg-white/5 shadow-sm border border-primary/5 dark:border-white/10 hover:shadow-md hover:border-primary/10 transition-all duration-300"
            >
              <div class="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-primary dark:text-secondary mb-1">
                {{ stat.prefix }}{{ stat.displayValue }}{{ stat.suffix }}
              </div>
              <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium transition-colors">{{ stat.label }}</p>
            </div>
          </div>
        </div>

        <!-- Right: Image -->
        <div ref="imageContent" class="relative">
          <div class="relative rounded-3xl overflow-hidden shadow-2xl">
            <img :src="interiorImg" alt="Interior Masjid Jami Kassiti" class="w-full h-[400px] lg:h-[550px] object-cover" />
            <div class="absolute inset-0 bg-linear-to-t from-primary/30 to-transparent"></div>
          </div>

          <!-- Floating Card -->
          <div class="absolute -bottom-4 left-4 sm:-bottom-6 sm:-left-6 bg-white dark:bg-[#1A2525] rounded-2xl p-4 sm:p-5 shadow-xl border border-primary/10 dark:border-white/10 w-[80%] sm:w-auto max-w-[220px] z-10 transition-colors duration-500">
            <div class="flex items-center gap-3 mb-2">
              <MosqueLogo variant="icon" :icon-size="32" />
              <p class="font-heading text-lg font-bold text-dark dark:text-white">Alhamdulillah</p>
            </div>
            <p class="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">Melayani umat dengan sepenuh hati sejak tahun berdiri</p>
          </div>

          <!-- Decorative Element -->
          <div class="absolute -top-4 -right-4 w-24 h-24 border-2 border-secondary/30 rounded-3xl -z-10"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IslamicPattern from '@/components/ui/IslamicPattern.vue'
import MosqueLogo from '@/components/ui/MosqueLogo.vue'
import interiorImage from '@/assets/images/mosque-interior.png'

gsap.registerPlugin(ScrollTrigger)

const interiorImg = interiorImage
const textContent = ref(null)
const imageContent = ref(null)

const stats = reactive([
  { label: 'Tahun Berdiri', value: 1990, displayValue: 0, prefix: '', suffix: '' },
  { label: 'Jamaah Aktif', value: 500, displayValue: 0, prefix: '+', suffix: '' },
  { label: 'Kegiatan/Bulan', value: 30, displayValue: 0, prefix: '', suffix: '+' },
])

onMounted(() => {
  gsap.fromTo(textContent.value, { opacity: 0, x: -60 }, {
    opacity: 1, x: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '#tentang', start: 'top 75%', once: true },
  })

  gsap.fromTo(imageContent.value, { opacity: 0, x: 60 }, {
    opacity: 1, x: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '#tentang', start: 'top 75%', once: true },
  })

  stats.forEach((stat) => {
    gsap.to(stat, {
      displayValue: stat.value, duration: 2, ease: 'power2.out',
      snap: { displayValue: 1 },
      scrollTrigger: { trigger: '#tentang', start: 'top 70%', once: true },
    })
  })
})
</script>
