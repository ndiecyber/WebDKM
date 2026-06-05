<template>
  <nav
    ref="navRef"
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      navBgClass
    ]"
  >
    <!-- Top Announcement Bar (Prayer Time) -->
    <div v-if="nextPrayer" :class="['border-b bg-transparent transition-all duration-300', (!scrolled || isDark) ? 'border-white/10' : 'border-gray-400']">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-center sm:justify-end py-1.5">
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
            <span :class="['text-[10px] sm:text-[11px] font-medium tracking-wide uppercase', (!scrolled || isDark) ? 'text-white/60' : 'text-gray-500']">Waktu Berikutnya:</span>
            <span class="text-secondary font-bold text-[11px] sm:text-xs">{{ nextPrayer.name }} {{ nextPrayer.time }}</span>
          </div>
        </div>
      </div>
    </div>

    <div :class="['max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500', scrolled ? 'py-2' : 'py-4']">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <a href="#beranda" class="flex items-center group" @click.prevent="scrollToSection('beranda')">
          <img :src="(isDark || !scrolled) ? logoDark : logoLight" alt="Logo Masjid Jami Kassiti" class="h-14 sm:h-16 w-auto object-contain transition-all duration-300" />
        </a>

        <!-- Desktop Menu -->
        <div class="hidden lg:flex items-center gap-1">
          <a
            v-for="item in menuItems"
            :key="item.id"
            :href="'#' + item.id"
            :class="[
              'px-4 py-2 text-sm rounded-lg transition-all duration-300 font-medium',
              activeSection === item.id ? activeTextClass : textClass,
            ]"
            @click.prevent="scrollToSection(item.id)"
          >
            {{ item.label }}
          </a>
          
          <!-- Dark Mode Toggle -->
          <button 
            @click="toggleDark()" 
            :class="['ml-2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95', buttonClass]"
            :aria-label="isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'"
          >
            <Sun v-if="isDark" class="w-5 h-5 text-secondary" />
            <Moon v-else class="w-5 h-5" />
          </button>

          <a
            href="#"
            class="ml-4 px-6 py-2.5 bg-secondary text-dark font-semibold text-sm rounded-full hover:bg-secondary-light transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30"
            @click.prevent="isDonationModalOpen = true"
          >
            💛 Donasi
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="lg:hidden relative w-10 h-10 flex items-center justify-center"
          @click="mobileOpen = !mobileOpen"
          :aria-label="mobileOpen ? 'Tutup menu' : 'Buka menu'"
        >
          <span class="sr-only">Menu</span>
          <div class="w-6 flex flex-col gap-1.5">
            <span :class="['block h-0.5 rounded transition-all duration-300 origin-center', (!scrolled || isDark) ? 'bg-white' : 'bg-gray-900', mobileOpen ? 'rotate-45 translate-y-2' : '']"></span>
            <span :class="['block h-0.5 rounded transition-all duration-300', (!scrolled || isDark) ? 'bg-white' : 'bg-gray-900', mobileOpen ? 'opacity-0 scale-0' : '']"></span>
            <span :class="['block h-0.5 rounded transition-all duration-300 origin-center', (!scrolled || isDark) ? 'bg-white' : 'bg-gray-900', mobileOpen ? '-rotate-45 -translate-y-2' : '']"></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="mobileOpen" class="lg:hidden glass-dark mt-2 mx-4 rounded-2xl p-4 border border-white/10">
        <a
          v-for="item in menuItems"
          :key="item.id"
          :href="'#' + item.id"
          :class="['block px-4 py-3 rounded-xl transition-all duration-300 font-medium', activeSection === item.id ? 'text-secondary bg-white/10' : 'text-white/80 hover:text-secondary hover:bg-white/5']"
          @click.prevent="scrollToSection(item.id); mobileOpen = false"
        >{{ item.label }}</a>
        
        <!-- Mobile Dark Mode Toggle -->
        <button 
          @click="toggleDark()" 
          class="w-full mt-2 flex items-center justify-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/80 hover:bg-white/10 transition-all duration-300"
        >
          <Sun v-if="isDark" class="w-5 h-5 text-secondary" />
          <Moon v-else class="w-5 h-5" />
          <span class="font-medium">{{ isDark ? 'Mode Terang' : 'Mode Gelap' }}</span>
        </button>

        <a href="#" class="block mt-2 px-4 py-3 bg-secondary text-dark font-semibold rounded-xl text-center hover:bg-secondary-light transition-all duration-300" @click.prevent="isDonationModalOpen = true; mobileOpen = false">
          💛 Donasi
        </a>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { gsap } from 'gsap'
import { useDark, useToggle } from '@vueuse/core'
import { Sun, Moon } from 'lucide-vue-next'
import MosqueLogo from '@/components/ui/MosqueLogo.vue'
import logoLight from '@/assets/images/logo-kustom.png'
import logoDark from '@/assets/images/logo-kustom2.png'
import { usePrayerStore } from '@/stores/prayer'
import { isDonationModalOpen } from '@/composables/useDonationModal'

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
})
const toggleDark = useToggle(isDark)

const scrolled = ref(false)
const mobileOpen = ref(false)
const activeSection = ref('beranda')
const navRef = ref(null)
const prayerStore = usePrayerStore()

// Dynamic Navbar Styling Logic
const navBgClass = computed(() => {
  if (!scrolled.value) return 'bg-transparent'
  return isDark.value 
    ? 'bg-[#111827]/95 backdrop-blur-md shadow-lg border-b border-white/5' 
    : 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-400'
})

const textClass = computed(() => {
  if (!scrolled.value) return 'text-white/90 hover:text-white hover:bg-white/10'
  return isDark.value
    ? 'text-white/80 hover:text-white hover:bg-white/10'
    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
})

const activeTextClass = computed(() => {
  if (!scrolled.value) return 'text-white bg-white/20 shadow-lg shadow-white/10'
  return isDark.value
    ? 'text-secondary bg-white/10 shadow-md shadow-secondary/10'
    : 'text-primary bg-primary/10 shadow-md shadow-primary/20 ring-1 ring-primary/20'
})

const buttonClass = computed(() => {
  if (!scrolled.value || isDark.value) return 'bg-white/10 text-white/90 hover:bg-white/20 border border-white/20'
  return 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
})

// Mini Prayer Logic synced from global store
const nextPrayer = computed(() => prayerStore.nextPrayer)

const menuItems = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'tentang', label: 'Tentang' },
  { id: 'jadwal', label: 'Jadwal Sholat' },
  { id: 'layanan', label: 'Layanan' },
  { id: 'kegiatan', label: 'Kegiatan' },
  { id: 'galeri', label: 'Galeri' },
  { id: 'kontak', label: 'Kontak' },
]

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 50

  // Check if user is near the bottom of the page (for footer/kontak detection)
  const isNearBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 100)
  
  if (isNearBottom) {
    activeSection.value = 'kontak'
    return
  }

  const sections = menuItems.map((item) => item.id)
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i])
    if (el && el.getBoundingClientRect().top <= 150) {
      activeSection.value = sections[i]
      break
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Drop down animation synced with LoadingScreen
  gsap.fromTo(navRef.value, 
    { y: -100, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 2.2 }
  )
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
