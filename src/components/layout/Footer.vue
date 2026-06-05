<template>
  <footer id="kontak" class="relative bg-dark dark:bg-[#0a0a0a] text-white overflow-hidden transition-colors duration-500">
    <!-- Islamic Pattern Overlay -->
    <div class="absolute inset-0 islamic-pattern-bg opacity-5"></div>

    <!-- Top Gold Line -->
    <div class="h-1 bg-linear-to-r from-transparent via-secondary to-transparent"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <!-- Column 1: About -->
        <div>
          <div class="mb-6">
            <img
              :src="logoImg"
              alt="Logo Masjid Jami Kassiti"
              class="h-16 sm:h-20 w-auto object-contain"
            />
          </div>
          <p class="text-white/60 text-sm leading-relaxed mb-4">
            Pusat ibadah, pendidikan, dan kegiatan sosial untuk membangun umat yang beriman, berilmu, dan berakhlak mulia.
          </p>
          <p class="text-white/40 text-xs leading-relaxed">
            Perumahan Arjamukti, Desa Arjasari
          </p>
          
          <!-- Social Media -->
          <div class="flex gap-3 mt-5">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener"
              class="w-10 h-10 rounded-full bg-white/5 dark:bg-white/10 border border-white/10 flex items-center justify-center hover:bg-secondary hover:border-secondary hover:text-dark dark:hover:text-black transition-all duration-300"
              :aria-label="social.name"
            >
              <component :is="social.icon" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Column 2: Kemakmuran Masjid -->
        <div>
          <h4 class="text-secondary font-heading text-lg font-semibold mb-6">Kemakmuran Masjid</h4>
          <div class="space-y-3">
            <div class="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-4 hover:border-secondary/30 transition-all duration-300 group">
              <div class="w-10 h-10 shrink-0 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <Users class="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p class="text-white/50 text-[10px] font-semibold uppercase tracking-wider mb-0.5">Kapasitas</p>
                <p class="text-white font-bold text-base leading-none">500+ <span class="text-white/50 text-xs font-normal">Jamaah</span></p>
              </div>
            </div>
            
            <div class="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-4 hover:border-secondary/30 transition-all duration-300 group">
              <div class="w-10 h-10 shrink-0 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <BookOpen class="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p class="text-white/50 text-[10px] font-semibold uppercase tracking-wider mb-0.5">Kajian Rutin</p>
                <p class="text-white font-bold text-base leading-none">12+ <span class="text-white/50 text-xs font-normal">Sesi/Bulan</span></p>
              </div>
            </div>

            <div class="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-4 hover:border-secondary/30 transition-all duration-300 group">
              <div class="w-10 h-10 shrink-0 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <HeartHandshake class="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p class="text-white/50 text-[10px] font-semibold uppercase tracking-wider mb-0.5">Mustahik Terbantu</p>
                <p class="text-white font-bold text-base leading-none">200+ <span class="text-white/50 text-xs font-normal">Keluarga</span></p>
              </div>
            </div>
          </div>
        </div>

        <!-- Column 3: Donasi -->
        <div>
          <h4 class="text-secondary font-heading text-lg font-semibold mb-6">Infaq & Zakat</h4>
          <p class="text-white/60 text-sm leading-relaxed mb-4">
            Salurkan donasi terbaik Anda untuk kemakmuran masjid dan kesejahteraan umat.
          </p>
          <div class="bg-white/5 border border-white/10 rounded-xl p-4 mt-2 hover:border-secondary/30 hover:bg-white/10 transition-all duration-300 group">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <Heart class="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p class="text-white/90 text-sm font-medium">Bank Syariah Indonesia</p>
                <p class="text-white/50 text-xs">a.n DKM Masjid Jami Kassiti</p>
              </div>
            </div>
            <div class="flex items-center justify-between mt-3 bg-dark/50 rounded-lg p-3 border border-white/5">
              <span class="text-secondary font-mono font-bold tracking-widest text-sm sm:text-base">{{ bankAccount }}</span>
              <button 
                @click="copyAccount"
                class="p-2 rounded-md hover:bg-white/10 transition-all active:scale-90 text-white/70 hover:text-white"
                :title="isCopied ? 'Tersalin!' : 'Salin Rekening'"
              >
                <CheckCircle2 v-if="isCopied" class="w-4 h-4 text-green-400" />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Column 4: Contact -->
        <div>
          <h4 class="text-secondary font-heading text-lg font-semibold mb-6">Kontak</h4>
          <ul class="space-y-4">
            <li class="flex items-start gap-3 group">
              <MapPin class="w-5 h-5 text-secondary mt-0.5 shrink-0 group-hover:animate-bounce" />
              <div class="flex flex-col gap-2">
                <span class="text-white/60 text-sm leading-relaxed group-hover:text-white transition-colors">Perumahan Arjamukti, Desa Arjasari, Kab. Bandung, Jawa Barat</span>
                <a 
                  href="https://maps.app.goo.gl/HMDmpx7zZFn8GRUaA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-white transition-colors w-fit bg-secondary/10 hover:bg-secondary/20 px-3 py-1.5 rounded-md border border-secondary/20"
                >
                  <Map class="w-3.5 h-3.5" />
                  Buka di Google Maps
                </a>
              </div>
            </li>
            <li class="flex items-center gap-3 group">
              <Phone class="w-5 h-5 text-secondary shrink-0 group-hover:animate-pulse" />
              <a href="https://wa.me/6285320132014" target="_blank" rel="noopener noreferrer" class="text-secondary hover:text-white underline decoration-secondary/50 hover:decoration-white underline-offset-4 transition-all text-sm font-medium">
                0853-2013-2014 (Ustadz Randi Rizal)
              </a>
            </li>
            <li class="flex items-center gap-3">
              <Mail class="w-5 h-5 text-secondary shrink-0" />
              <span class="text-white/60 text-sm">info@masjidjamikassiti.id</span>
            </li>
            <li class="flex items-center gap-3">
              <Clock class="w-5 h-5 text-secondary shrink-0" />
              <span class="text-white/60 text-sm">Buka 24 Jam</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-white/40 text-sm text-center md:text-left">
          &copy; {{ currentYear }} Masjid Jami Kassiti. Hak Cipta Dilindungi.
        </p>
        <p class="text-white/30 text-xs flex items-center gap-1">
          Dibuat dengan
          <Heart class="w-3 h-3 text-red-400 inline" />
          untuk umat
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { MapPin, Phone, Mail, Clock, Heart, Facebook, Instagram, Youtube, Copy, CheckCircle2, Map, Users, BookOpen, HeartHandshake } from 'lucide-vue-next'
import logoImg from '@/assets/images/logo-kustom.png'

const currentYear = computed(() => new Date().getFullYear())

// Copy Bank Account Logic
const isCopied = ref(false)
const bankAccount = '7453 555 555'

const copyAccount = () => {
  navigator.clipboard.writeText('7453555555')
  isCopied.value = true
  setTimeout(() => {
    isCopied.value = false
  }, 2500)
}

const socials = [
  { name: 'Facebook', url: '#', icon: Facebook },
  { name: 'Instagram', url: '#', icon: Instagram },
  { name: 'YouTube', url: '#', icon: Youtube },
]

const quickLinks = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'tentang', label: 'Tentang Kami' },
  { id: 'jadwal', label: 'Jadwal Sholat' },
  { id: 'layanan', label: 'Layanan' },
  { id: 'kegiatan', label: 'Kegiatan' },
  { id: 'galeri', label: 'Galeri' },
  { id: 'donasi', label: 'Donasi' },
]

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>
