<template>
  <nav
    ref="navRef"
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      navBgClass
    ]"
  >
    <!-- Top Announcement Bar (Prayer Time) -->
    <div 
      class="h-8 border-b bg-transparent transition-all duration-500"
      :class="isDark ? 'border-white/10' : 'border-gray-300'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div class="flex justify-center sm:justify-end items-center h-full">
          <div class="flex items-center gap-2" v-if="nextPrayer">
            <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
            <span 
              v-if="hijriDate"
              class="text-[10px] sm:text-[11px] font-medium tracking-wide uppercase transition-colors duration-500" 
              :class="(!scrolled || isDark) ? 'text-white/80' : 'text-gray-600'"
            >
              {{ hijriDate }} <span class="mx-0.5 opacity-50">|</span>
            </span>
            <span class="text-secondary font-bold text-[11px] sm:text-xs tracking-wide uppercase">{{ nextPrayer.name }} {{ nextPrayer.time }}</span>
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
            class="relative px-3.5 py-2 text-sm font-semibold transition-colors duration-300 group"
            :class="[
              activeSection === item.id 
                ? (!scrolled ? 'text-white' : (isDark ? 'text-secondary' : 'text-primary'))
                : (!scrolled ? 'text-white/80 hover:text-white' : (isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'))
            ]"
            @click.prevent="scrollToSection(item.id)"
          >
            {{ item.label }}
            <!-- Animated Underline -->
            <span 
              class="absolute bottom-1 left-0 w-full h-[2px] rounded-full transition-transform duration-300 origin-center"
              :class="[
                !scrolled ? 'bg-white' : (isDark ? 'bg-secondary' : 'bg-primary'),
                activeSection === item.id ? 'scale-x-50' : 'scale-x-0 group-hover:scale-x-25'
              ]"
            ></span>
          </a>
          
          <!-- Dark Mode Toggle -->
          <button 
            @click="toggleDark()" 
            class="ml-2 relative flex items-center h-8 w-24 rounded-full p-1 transition-all duration-300 overflow-hidden shrink-0 border"
            :class="isDark ? 'bg-[#1e1e1e] border-white/10' : 'bg-gray-200 border-gray-300'"
            :aria-label="isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'"
          >
            <!-- Text Day Mode -->
            <span 
              class="absolute left-2 text-[7.5px] font-bold tracking-wider transition-opacity duration-300"
              :class="isDark ? 'opacity-0' : 'opacity-100 text-gray-800'"
            >
              MODE TERANG
            </span>
            <!-- Text Night Mode -->
            <span 
              class="absolute right-1.5 text-[7.5px] font-bold tracking-wider transition-opacity duration-300"
              :class="isDark ? 'opacity-100 text-white' : 'opacity-0'"
            >
              MODE GELAP
            </span>

            <!-- Sliding Knob -->
            <div 
              class="absolute w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md transition-all duration-300 z-10"
              :class="isDark ? 'left-1' : 'left-[68px]'"
            >
              <Moon v-if="isDark" class="w-3.5 h-3.5 text-gray-900" />
              <Sun v-else class="w-3.5 h-3.5 text-gray-900" />
            </div>
          </button>

          <a
            href="#"
            class="ml-3 px-6 py-2.5 bg-secondary text-white font-semibold text-sm rounded-full hover:bg-white hover:text-dark transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30 flex items-center gap-2 group shrink-0"
            @click.prevent="isDonationModalOpen = true"
          >
            <HandCoins class="w-5 h-5 text-current group-hover:-translate-y-1 group-hover:scale-110 transition-transform duration-300 animate-[pulse_2s_ease-in-out_infinite]" />
            Donasi
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
          class="w-full mt-2 flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 border"
          :class="isDark ? 'bg-dark-light border-white/10' : 'bg-gray-100 border-gray-300'"
        >
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full flex items-center justify-center transition-colors" :class="isDark ? 'bg-white/10' : 'bg-white shadow-md'">
              <Moon v-if="isDark" class="w-4 h-4 text-white" />
              <Sun v-else class="w-4 h-4 text-gray-700" />
            </div>
            <span class="text-sm font-semibold tracking-wide" :class="isDark ? 'text-white' : 'text-gray-800'">
              {{ isDark ? 'Mode Gelap' : 'Mode Terang' }}
            </span>
          </div>
          
          <!-- Small Switch Indicator -->
          <div 
            class="relative flex items-center h-6 w-11 rounded-full p-0.5 transition-colors duration-300"
            :class="isDark ? 'bg-secondary' : 'bg-gray-300'"
          >
            <div 
              class="w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300"
              :class="isDark ? 'translate-x-5' : 'translate-x-0'"
            ></div>
          </div>
        </button>

        <a href="#" class="flex items-center justify-center gap-2 mt-2 px-4 py-3 bg-secondary text-dark font-semibold rounded-xl hover:bg-secondary-light transition-all duration-300 group" @click.prevent="isDonationModalOpen = true; mobileOpen = false">
          <HandCoins class="w-5 h-5 text-dark group-hover:-translate-y-1 group-hover:scale-110 transition-transform duration-300 animate-[pulse_2s_ease-in-out_infinite]" />
          Donasi
        </a>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { gsap } from 'gsap'
import { useDark, useToggle } from '@vueuse/core'
import { Sun, Moon, HandCoins, ShieldCheck } from 'lucide-vue-next'
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
    ? 'bg-[#111827]/98 shadow-lg border-b border-white/5' 
    : 'bg-white/98 shadow-md border-b border-gray-400'
})

const textClass = computed(() => '') // Deprecated
const activeTextClass = computed(() => '') // Deprecated

const buttonClass = computed(() => {
  if (!scrolled.value || isDark.value) return 'bg-white/10 text-white/90 hover:bg-white/20 border border-white/20'
  return 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-md hover:shadow-md'
})

// Mini Prayer Logic synced from global store
const nextPrayer = computed(() => prayerStore.nextPrayer)
const hijriDate = computed(() => prayerStore.hijriDate)

const menuItems = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'tentang', label: 'Tentang' },
  { id: 'layanan', label: 'Layanan' },
  { id: 'kegiatan', label: 'Berita' },
  { id: 'keuangan', label: 'Keuangan' },
  { id: 'galeri', label: 'Galeri' },
  { id: 'kontak', label: 'Kontak' },
]

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  // iOS Safari: scrollIntoView unreliable with position:fixed navbar
  // Use window.scrollTo with manual offset instead
  const navHeight = navRef.value ? navRef.value.offsetHeight : 88
  const elTop = el.getBoundingClientRect().top + window.pageYOffset - navHeight
  window.scrollTo({ top: Math.max(0, elTop), behavior: 'smooth' })
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
  if (navRef.value) {
    gsap.fromTo(navRef.value, 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 2.2 }
    )
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
