<template>
  <section id="kegiatan" class="relative py-8 lg:py-10 bg-cream dark:bg-[#121220] overflow-hidden transition-colors duration-500">
    <!-- Animated Islamic Pattern Background -->
    <IslamicPattern pattern-color="#5D2E2E" :show-sparkles="false" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-6" ref="headerRef">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
          <span class="text-primary text-xs font-semibold tracking-wider uppercase">Agenda</span>
        </div>
        <h2 class="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark dark:text-white mb-4 transition-colors duration-500">
          Berita <span class="text-primary dark:text-secondary">Terkait</span>
        </h2>
        <p class="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-4xl mx-auto mb-6 transition-colors duration-500">
          Simak berbagai berita dan informasi terbaru seputar kegiatan di Masjid Jami Kassiti
        </p>
        <!-- Filter Tabs -->
        <div class="flex items-center justify-center gap-2 flex-wrap">
          <button
            v-for="tab in filterTabs"
            :key="tab.value"
            @click="activeTypeFilter = tab.value"
            :class="[
              'px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border',
              activeTypeFilter === tab.value
                ? 'bg-primary dark:bg-secondary text-white dark:text-dark border-primary dark:border-secondary shadow-md'
                : 'bg-white dark:bg-white/5 text-dark dark:text-white border-gray-200 dark:border-white/10 hover:border-primary dark:hover:border-secondary'
            ]"
          >
            <span>{{ tab.label }}</span>
            <span class="ml-1.5 text-[11px] px-1.5 py-0.5 rounded-full" :class="activeTypeFilter === tab.value ? 'bg-white/20' : 'bg-gray-100 dark:bg-white/10'">
              {{ tab.value === 'semua' ? events.length : events.filter(e => e.type === tab.value).length }}
            </span>
          </button>
        </div>
      </div>

      <!-- Events Grid -->
      <TransitionGroup name="event-list" tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative" ref="eventsRef">
        <div
          v-for="(event, index) in visibleEvents"
          :key="event.title"
          @click="openEventModal(event)"
          @mousemove="handleMouseMove($event, event.title)"
          @mouseleave="handleMouseLeave(event.title)"
          :style="{ 
            transform: cardTilts[event.title] || 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)', 
            transition: isHovered[event.title] ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out' 
          }"
          class="group relative cursor-pointer bg-white/70 dark:bg-dark/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/50 dark:border-white/10 hover:border-primary/40 dark:hover:border-secondary/40 transition-colors duration-500 will-change-transform shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex flex-col"
        >
          <!-- Glassmorphism Glow Background -->
          <div class="absolute inset-0 bg-linear-to-br from-primary/0 via-transparent to-secondary/0 group-hover:from-primary/10 group-hover:to-secondary/10 transition-colors duration-700 pointer-events-none z-0"></div>

          <!-- Image Area -->
          <div class="relative h-56 overflow-hidden z-10 shrink-0">
            <img
              :src="event.image"
              :alt="event.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-linear-to-t from-dark/80 via-dark/20 to-transparent"></div>

            <!-- Type + Badge Row -->
            <div class="absolute top-4 left-4 flex items-center gap-2 z-10">
              <!-- Type badge: Berita = emerald, Artikel = gold -->
              <div :class="[
                'px-2.5 py-1 text-white text-[10px] font-bold uppercase tracking-wider rounded-md shadow',
                event.type === 'artikel' ? 'bg-[#C5A55A]' : 'bg-primary'
              ]">
                {{ event.type === 'artikel' ? 'Artikel' : 'Berita' }}
              </div>
              <!-- Status badge -->
              <div
                v-if="event.badge"
                class="px-2.5 py-1 bg-secondary text-dark text-[10px] font-bold rounded-md shadow-lg"
              >
                {{ event.badge }}
              </div>
            </div>
          </div>

          <!-- Date Card (Positioned exactly on the boundary between image and content) -->
          <div class="absolute top-56 left-6 -translate-y-1/2 bg-white dark:bg-slate-800 rounded-2xl px-5 py-2.5 text-center shadow-xl border border-gray-300 dark:border-white/10 transition-colors duration-500 z-20">
            <p class="font-heading text-2xl font-bold text-primary dark:text-secondary leading-none">{{ event.day }}</p>
            <p class="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">{{ event.month }}</p>
          </div>

          <!-- Content -->
          <div class="p-6 pt-10 sm:p-8 sm:pt-12 flex flex-col grow z-10 relative">
            <div class="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-xs font-medium mb-4 transition-colors duration-500">
              <span class="flex items-center gap-1.5">
                <Clock class="w-4 h-4 text-primary dark:text-secondary" />
                {{ event.time }}
              </span>
              <span class="flex items-center gap-1.5">
                <MapPin class="w-4 h-4 text-primary dark:text-secondary" />
                {{ event.location }}
              </span>
            </div>

            <h3 class="font-heading text-xl font-bold text-dark dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-secondary transition-colors duration-300">
              {{ event.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-colors duration-500 line-clamp-3 mb-6">
              {{ event.description }}
            </p>

            <div class="mt-auto">
              <div
                class="inline-flex items-center gap-2 text-primary dark:text-secondary text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all duration-300"
              >
                Detail Berita
                <ArrowRight class="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <!-- View More Button -->
      <div class="mt-12 flex justify-center" v-if="events.length > 3">
        <button 
          @click="toggleEvents"
          class="inline-flex items-center gap-2 px-8 py-3.5 bg-white dark:bg-white/5 border border-primary/20 dark:border-white/10 hover:border-primary text-primary dark:text-white rounded-full font-bold tracking-wide transition-all duration-300 hover:shadow-[0_8px_30px_rgb(20,184,166,0.2)] hover:-translate-y-1"
        >
          <span>{{ showAll ? 'Sembunyikan' : 'Muat Lebih Banyak' }}</span>
          <ArrowRight class="w-4 h-4" :class="{ 'rotate-90': !showAll, '-rotate-90': showAll }" style="transition: transform 0.3s ease" />
        </button>
      </div>
    </div>

    <!-- Event Modal -->
    <EventModal 
      :is-open="isModalOpen" 
      :event="selectedEvent" 
      @close="isModalOpen = false" 
    />
  </section>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { Clock, MapPin, ArrowRight } from 'lucide-vue-next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IslamicPattern from '@/components/ui/IslamicPattern.vue'
import EventModal from '@/components/ui/EventModal.vue'
import { useAdminStore } from '@/stores/admin'

gsap.registerPlugin(ScrollTrigger)

const adminStore = useAdminStore()

const headerRef = ref(null)
const eventsRef = ref(null)
const showAll = ref(false)
const activeTypeFilter = ref('semua')

const filterTabs = [
  { value: 'semua', label: 'Semua' },
  { value: 'berita', label: '📰 Berita' },
  { value: 'artikel', label: '📖 Artikel' },
]


// Modal State
const isModalOpen = ref(false)
const selectedEvent = ref({})

const openEventModal = (event) => {
  selectedEvent.value = event
  isModalOpen.value = true
}

// 3D Tilt State
const cardTilts = ref({})
const isHovered = ref({})

const handleMouseMove = (e, title) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  // Calculate tilt (adjust multipliers for stronger/weaker effect)
  const tiltX = ((y - centerY) / centerY) * -8
  const tiltY = ((x - centerX) / centerX) * 8
  
  cardTilts.value[title] = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`
  isHovered.value[title] = true
}

const handleMouseLeave = (title) => {
  cardTilts.value[title] = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  isHovered.value[title] = false
}

const toggleEvents = async () => {
  showAll.value = !showAll.value
}

const events = computed(() => adminStore.kegiatan)

const filteredEvents = computed(() => {
  if (activeTypeFilter.value === 'semua') return events.value
  return events.value.filter(e => e.type === activeTypeFilter.value)
})

const visibleEvents = computed(() => {
  return showAll.value ? filteredEvents.value : filteredEvents.value.slice(0, 3)
})

onMounted(() => {
  gsap.fromTo(
    headerRef.value,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '#kegiatan', start: 'top 75%', once: true },
    }
  )

  if (eventsRef.value) {
    gsap.fromTo(
      eventsRef.value.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15, delay: 0.2,
        scrollTrigger: { trigger: '#kegiatan', start: 'top 80%', once: true },
      }
    )
  }
})
</script>

<style scoped>
.event-list-move,
.event-list-enter-active,
.event-list-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.event-list-enter-from,
.event-list-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}

/* Ensure leaves don't break the grid layout abruptly if not using absolute positioning,
   we omit position: absolute for a smoother responsive grid flow */
</style>
