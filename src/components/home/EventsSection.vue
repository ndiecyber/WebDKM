<template>
  <section id="kegiatan" class="relative py-16 lg:py-20 bg-cream dark:bg-[#121220] overflow-hidden transition-colors duration-500">
    <!-- Animated Islamic Pattern Background -->
    <IslamicPattern pattern-color="#5D2E2E" :show-sparkles="false" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16" ref="headerRef">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
          <span class="text-primary text-xs font-semibold tracking-wider uppercase">Agenda</span>
        </div>
        <h2 class="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark dark:text-white mb-4 transition-colors duration-500">
          Kegiatan <span class="text-primary dark:text-secondary">Mendatang</span>
        </h2>
        <p class="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto transition-colors duration-500">
          Ikuti berbagai kegiatan dan acara yang diselenggarakan oleh Masjid Jami Kassiti
        </p>
      </div>

      <!-- Events -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" ref="eventsRef">
        <div
          v-for="event in events"
          :key="event.title"
          class="group bg-white/90 dark:bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden card-hover border-2 border-primary/20 dark:border-white/20 hover:border-primary/50 dark:hover:border-secondary/50 transition-colors duration-500"
        >
          <!-- Image -->
          <div class="relative h-48 overflow-hidden">
            <img
              :src="event.image"
              :alt="event.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>

            <!-- Badge -->
            <div
              v-if="event.badge"
              class="absolute top-4 left-4 px-3 py-1 bg-secondary text-dark text-xs font-bold rounded-full shadow-md"
            >
              {{ event.badge }}
            </div>

            <!-- Date Card -->
            <div class="absolute bottom-4 left-4 bg-white dark:bg-dark rounded-xl px-4 py-2 text-center shadow-lg transition-colors duration-500">
              <p class="font-heading text-2xl font-bold text-primary dark:text-secondary leading-none">{{ event.day }}</p>
              <p class="text-gray-600 dark:text-gray-400 text-xs font-medium uppercase">{{ event.month }}</p>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <div class="flex items-center gap-4 text-dark/40 dark:text-white/40 text-xs mb-3 transition-colors duration-500">
              <span class="flex items-center gap-1">
                <Clock class="w-3.5 h-3.5" />
                {{ event.time }}
              </span>
              <span class="flex items-center gap-1">
                <MapPin class="w-3.5 h-3.5" />
                {{ event.location }}
              </span>
            </div>

            <h3 class="font-heading text-lg font-bold text-dark dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-secondary transition-colors duration-300">
              {{ event.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 transition-colors duration-500">
              {{ event.description }}
            </p>

            <a
              href="#"
              class="inline-flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all duration-300"
            >
              Detail Acara
              <ArrowRight class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Clock, MapPin, ArrowRight } from 'lucide-vue-next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IslamicPattern from '@/components/ui/IslamicPattern.vue'
import communityImg from '@/assets/images/community-prayer.png'
import quranStudyImg from '@/assets/images/quran-study.png'
import exteriorImg from '@/assets/images/mosque-exterior.png'

gsap.registerPlugin(ScrollTrigger)

const headerRef = ref(null)
const eventsRef = ref(null)

const events = [
  {
    title: 'Kajian Akbar Bulanan',
    description: 'Kajian ilmu agama bersama ustadz ternama membahas fiqih ibadah dan muamalah kontemporer.',
    image: communityImg,
    day: '15',
    month: 'Jun',
    time: '09:00 - 12:00',
    location: 'Aula Utama',
    badge: 'Segera',
  },
  {
    title: 'Wisuda Santri TPA/TPQ',
    description: 'Perayaan kelulusan para santri TPA/TPQ yang telah menyelesaikan program tahfidz dan tilawah.',
    image: quranStudyImg,
    day: '22',
    month: 'Jun',
    time: '08:00 - 11:00',
    location: 'Masjid Utama',
    badge: null,
  },
  {
    title: 'Bakti Sosial Ramadhan',
    description: 'Kegiatan bakti sosial pembagian sembako dan santunan untuk dhuafa dan yatim piatu.',
    image: exteriorImg,
    day: '01',
    month: 'Jul',
    time: '07:00 - 10:00',
    location: 'Halaman Masjid',
    badge: null,
  },
]

onMounted(() => {
  gsap.fromTo(
    headerRef.value,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '#kegiatan', start: 'top 75%', once: true },
    }
  )

  gsap.fromTo(
    eventsRef.value.children,
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: { trigger: '#kegiatan', start: 'top 65%', once: true },
    }
  )
})
</script>
