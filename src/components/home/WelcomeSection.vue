<template>
  <section id="tentang" class="relative py-8 lg:py-10 bg-cream dark:bg-[#121220] overflow-hidden transition-colors duration-500">
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

          <p class="text-dark/60 dark:text-white/60 text-base sm:text-lg leading-relaxed mb-6 transition-colors duration-500 whitespace-pre-line">
            {{ settings.history }}
          </p>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4 sm:gap-6">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="text-center p-4 rounded-2xl bg-light dark:bg-white/5 shadow-md border border-primary/5 dark:border-white/10 hover:shadow-md hover:border-primary/10 transition-all duration-300"
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

          <!-- Floating Card (Clickable) -->
          <button @click="isCommitteeModalOpen = true" class="text-left absolute -bottom-4 left-4 sm:-bottom-6 sm:-left-6 bg-white/90 dark:bg-[#1A2525]/90 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-xl border border-primary/20 dark:border-white/10 w-[85%] sm:w-auto max-w-[280px] sm:max-w-[320px] z-10 hover:shadow-primary/30 dark:hover:shadow-secondary/20 hover:-translate-y-2 transition-all duration-500 group overflow-hidden">
            <!-- Decorative gradient blob -->
            <div class="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 dark:bg-secondary/10 rounded-full blur-2xl group-hover:bg-primary/20 dark:group-hover:bg-secondary/20 transition-colors duration-500"></div>
            
            <div class="relative flex items-center justify-between gap-3 mb-2">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 shrink-0 rounded-full bg-linear-to-br from-primary/20 to-primary/5 dark:from-secondary/20 dark:to-secondary/5 flex items-center justify-center text-primary dark:text-secondary group-hover:scale-110 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-secondary dark:group-hover:text-dark transition-all duration-300">
                  <Users class="w-5 h-5" />
                </div>
                <h4 class="font-heading text-lg sm:text-xl font-bold text-dark dark:text-white group-hover:text-primary dark:group-hover:text-secondary transition-colors whitespace-nowrap">Pengurus DKM</h4>
              </div>
              <div class="w-6 h-6 shrink-0 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-primary dark:group-hover:bg-secondary text-gray-400 group-hover:text-white dark:group-hover:text-dark transition-colors">
                <ArrowRight class="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
            <p class="relative text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">Lihat struktur kepengurusan DKM Masjid Jami Kassiti</p>
            
            <!-- Click Clue -->
            <div class="absolute bottom-0 left-0 h-1 bg-linear-to-r from-primary to-secondary w-0 group-hover:w-full transition-all duration-500"></div>
          </button>

          <!-- Decorative Element -->
          <div class="absolute -top-4 -right-4 w-24 h-24 border-2 border-secondary/30 rounded-3xl -z-10"></div>
        </div>
      </div>
    </div>

    <!-- Committee Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="isCommitteeModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div class="absolute inset-0 bg-dark/80 backdrop-blur-md" @click="isCommitteeModalOpen = false"></div>
          
          <div class="modal-content relative w-full max-w-5xl bg-white dark:bg-dark-light rounded-3xl shadow-2xl flex flex-col h-[calc(100vh-3rem)] sm:h-auto sm:max-h-[90vh] border border-white/20 dark:border-white/10 overflow-hidden" role="dialog" aria-modal="true">
            <!-- Modal Background Pattern (Unique & Animated) -->
            <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <!-- Background Image -->
              <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] mix-blend-luminosity">
                <img :src="interiorImg" class="w-full h-full object-cover blur-sm scale-110" alt="" />
              </div>
              
              <!-- Animated Glowing Blobs -->
              <div class="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-primary/20 dark:bg-primary/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] sm:blur-[120px] animate-[pulse_8s_ease-in-out_infinite]"></div>
              <div class="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-secondary/20 dark:bg-secondary/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] sm:blur-[120px] animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>
              
              <!-- Islamic Pattern -->
              <IslamicPattern pattern-color="#C5A55A" :show-sparkles="true" class="absolute inset-0 opacity-10 dark:opacity-10 mix-blend-multiply dark:mix-blend-screen scale-150 transform-gpu animate-[pulse_6s_ease-in-out_infinite]" />
              
              <!-- Overlay Gradients for Readability -->
              <div class="absolute inset-0 bg-linear-to-b from-white/40 via-white/80 to-white dark:from-dark-light/60 dark:via-dark-light/90 dark:to-dark-light"></div>
            </div>

            <!-- Header -->
            <div class="relative shrink-0 h-32 sm:h-48 z-10">
              <div class="absolute inset-0 bg-linear-to-br from-primary via-primary-dark to-dark dark:from-[#112222] dark:via-[#1A3333] dark:to-dark"></div>
              <IslamicPattern pattern-color="#C5A55A" :show-sparkles="true" class="opacity-30 mix-blend-overlay animate-[pulse_4s_ease-in-out_infinite]" />
              <div class="absolute inset-0 bg-linear-to-t from-white dark:from-dark-light via-transparent to-transparent"></div>
              
              <button @click="isCommitteeModalOpen = false" class="absolute top-4 right-4 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-colors z-20" aria-label="Tutup">
                <X class="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              
              <!-- Content Header -->
              <div class="absolute inset-0 flex flex-col items-center justify-center z-10 pt-4">
                <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl mb-2 sm:mb-3 group">
                  <Users class="w-6 h-6 sm:w-8 sm:h-8 text-secondary group-hover:scale-110 transition-transform" />
                </div>
                <h3 class="font-heading text-xl sm:text-3xl font-bold text-white mb-0.5 sm:mb-1 drop-shadow-md">Pengurus DKM</h3>
                <p class="text-white/80 text-[10px] sm:text-sm text-center px-4 max-w-lg leading-tight">Mengenal lebih dekat para pelayan jamaah Masjid Jami Kassiti periode 2024-2027.</p>
              </div>
            </div>

            <!-- Content -->
            <div class="relative flex-1 overflow-y-auto pt-6 pb-10 px-6 sm:px-8 hide-scrollbar z-10">
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 mt-2">
                <div v-for="(member, index) in committee" :key="member.name" class="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
                  <!-- Image Container with Premium Overlay -->
                  <div class="relative h-40 sm:h-80 overflow-hidden bg-gray-200 dark:bg-gray-800">
                    <img v-if="member.image" :src="member.image" :alt="member.name" class="w-full h-full object-cover object-top filter grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                    <!-- Silhouette Placeholder -->
                    <div v-else class="w-full h-full flex flex-col items-center justify-end pt-4 bg-[#E2E8F0] dark:bg-[#1E293B] group-hover:scale-105 transition-all duration-700 overflow-hidden">
                      <div class="w-[45%] aspect-square rounded-t-full bg-[#CBD5E1] dark:bg-[#334155] translate-y-1/4"></div>
                      <div class="w-[85%] h-[50%] bg-[#CBD5E1] dark:bg-[#334155] rounded-t-[40%] translate-y-2"></div>
                    </div>
                    
                    <div class="absolute inset-0 bg-linear-to-t from-dark/95 via-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                    <div class="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 rounded-2xl transition-colors duration-500 z-10 pointer-events-none"></div>
                    
                    <!-- Content inside the image overlay -->
                    <div class="absolute inset-x-0 bottom-0 p-3 sm:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 z-20">
                      <h3 class="font-heading text-sm sm:text-xl font-bold text-white mb-0.5 sm:mb-1 drop-shadow-md leading-tight">{{ member.name }}</h3>
                      <div class="h-0.5 w-6 sm:w-12 bg-secondary mb-1.5 sm:mb-3 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100"></div>
                      <p class="text-secondary font-semibold uppercase tracking-wider text-[9px] sm:text-xs drop-shadow-sm">{{ member.role }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Users, User, X, ArrowRight } from 'lucide-vue-next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IslamicPattern from '@/components/ui/IslamicPattern.vue'
import MosqueLogo from '@/components/ui/MosqueLogo.vue'
import interiorImage from '@/assets/images/mosque-interior.png'
import { useAdminStore } from '@/stores/admin'

gsap.registerPlugin(ScrollTrigger)

const adminStore = useAdminStore()
const settings = adminStore.generalSettings

const interiorImg = interiorImage
const textContent = ref(null)
const imageContent = ref(null)
const isCommitteeModalOpen = ref(false)

const committee = [
  {
    name: 'H. Ahmad Abdullah, Lc.',
    role: 'Ketua DKM',
    image: ''
  },
  {
    name: 'Ust. Budi Santoso',
    role: 'Wakil Ketua',
    image: ''
  },
  {
    name: 'M. Ikhsan Fauzi',
    role: 'Sekretaris',
    image: ''
  },
  {
    name: 'Rhafi Decul',
    role: 'Bendahara',
    image: ''
  },
  {
    name: 'Arief Rahman',
    role: 'Seksi Dakwah',
    image: ''
  },
  {
    name: 'H. Suryana',
    role: 'Seksi Pembangunan',
    image: ''
  },
  {
    name: 'M. Yusuf',
    role: 'Seksi Sosial',
    image: ''
  },
  {
    name: 'Dimas Aditya',
    role: 'Remaja Masjid',
    image: ''
  }
]

const stats = reactive([
  { label: 'Tahun Berdiri', value: 2015, displayValue: 0, prefix: '', suffix: '' },
  { label: 'Jamaah Aktif', value: 200, displayValue: 0, prefix: '', suffix: '+' },
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

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
