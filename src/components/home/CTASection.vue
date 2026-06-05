<template>
  <section id="donasi" class="relative py-16 lg:py-20 bg-cream dark:bg-[#121220] overflow-hidden transition-colors duration-500">
    <!-- Animated Islamic Pattern Background -->
    <IslamicPattern pattern-color="#C5A55A" :show-sparkles="false" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <!-- Left: Content -->
        <div ref="contentRef">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span class="text-primary text-xs font-semibold tracking-wider uppercase">Donasi & Infaq</span>
          </div>

          <h2 class="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark dark:text-white mb-6 leading-tight transition-colors duration-500">
            Mari Bersama
            <span class="text-primary dark:text-secondary">Memakmurkan</span>
            <br />Masjid
          </h2>

          <p class="text-dark/60 dark:text-white/60 text-base sm:text-lg leading-relaxed mb-8 transition-colors duration-500">
            Setiap kontribusi Anda memiliki dampak besar dalam menjaga dan mengembangkan fasilitas masjid, program pendidikan, dan kegiatan sosial untuk umat.
          </p>

          <!-- Hadith -->
          <div class="bg-white/80 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 dark:border-white/10 mb-8 transition-colors duration-500">
            <p class="text-dark/70 dark:text-white/70 text-sm italic leading-relaxed mb-2 font-heading transition-colors duration-500">
              "Barang siapa yang membangun masjid karena Allah, maka Allah akan membangunkan baginya rumah di surga."
            </p>
            <p class="text-dark/40 dark:text-white/40 text-xs transition-colors duration-500">— HR. Bukhari & Muslim</p>
          </div>

          <!-- Progress Stats -->
          <div class="space-y-4 mb-8">
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-dark/70 dark:text-white/70 text-sm font-medium transition-colors duration-500">Renovasi Aula</span>
                <span class="text-primary dark:text-secondary font-semibold text-sm transition-colors duration-500">75%</span>
              </div>
              <div class="h-2.5 bg-dark/10 dark:bg-white/10 rounded-full overflow-hidden transition-colors duration-500">
                <div ref="progressBar1" class="h-full bg-gradient-to-r from-primary to-primary-light dark:from-secondary dark:to-secondary-light rounded-full" style="width: 0%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-dark/70 dark:text-white/70 text-sm font-medium transition-colors duration-500">Sarana Pendidikan</span>
                <span class="text-secondary font-semibold text-sm">60%</span>
              </div>
              <div class="h-2.5 bg-dark/10 dark:bg-white/10 rounded-full overflow-hidden transition-colors duration-500">
                <div ref="progressBar2" class="h-full bg-gradient-to-r from-secondary to-secondary-light rounded-full" style="width: 0%"></div>
              </div>
            </div>
          </div>

          <!-- CTA -->
          <button
            @click="isDonationModalOpen = true"
            class="inline-flex items-center gap-3 px-10 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-light transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 pulse-glow text-base"
          >
            <Heart class="w-5 h-5" />
            Donasi Sekarang
          </button>
        </div>

        <!-- Right: Visual -->
        <div ref="visualRef" class="relative">
          <div class="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              :src="exteriorImg"
              alt="Masjid Jami Kassiti"
              class="w-full h-[400px] lg:h-[550px] object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
          </div>

          <!-- Floating Stats Card -->
          <div class="absolute -bottom-6 -right-4 sm:-right-6 bg-white dark:bg-dark-light rounded-2xl p-6 shadow-xl border border-primary/10 dark:border-white/10 transition-colors duration-500">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center">
                <HandCoins class="w-7 h-7 text-secondary" />
              </div>
              <div>
                <p ref="donationCount" class="font-heading text-3xl font-bold text-dark dark:text-white transition-colors duration-500">0</p>
                <p class="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-500">Donatur Bulan Ini</p>
              </div>
            </div>
          </div>

          <!-- Decorative -->
          <div class="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/20 rounded-3xl -z-10"></div>
        </div>
      </div>
    </div>

    <DonationModal :is-open="isDonationModalOpen" @close="isDonationModalOpen = false" />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Heart, HandCoins } from 'lucide-vue-next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IslamicPattern from '@/components/ui/IslamicPattern.vue'
import DonationModal from '@/components/ui/DonationModal.vue'
import exteriorImage from '@/assets/images/mosque-exterior.png'
import { isDonationModalOpen } from '@/composables/useDonationModal'

gsap.registerPlugin(ScrollTrigger)

const exteriorImg = exteriorImage
const contentRef = ref(null)
const visualRef = ref(null)
const progressBar1 = ref(null)
const progressBar2 = ref(null)
const donationCount = ref(null)

onMounted(() => {
  const triggerConfig = {
    trigger: '#donasi',
    start: 'top 70%',
    once: true,
  }

  gsap.fromTo(
    contentRef.value,
    { opacity: 0, x: -50 },
    { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: triggerConfig }
  )

  gsap.fromTo(
    visualRef.value,
    { opacity: 0, x: 50 },
    { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: triggerConfig }
  )

  // Progress bars
  gsap.to(progressBar1.value, {
    width: '75%',
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: triggerConfig,
  })

  gsap.to(progressBar2.value, {
    width: '60%',
    duration: 1.5,
    ease: 'power2.out',
    delay: 0.3,
    scrollTrigger: triggerConfig,
  })

  // Counter
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
</script>
