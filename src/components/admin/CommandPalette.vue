<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-100 flex items-start justify-center pt-[15vh] px-4 sm:px-6">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-gray-950/80 backdrop-blur-sm" @click="close"></div>
      
      <!-- Palette Dialog -->
      <div class="relative bg-gray-900 w-full max-w-2xl rounded-xl shadow-2xl ring-1 ring-white/10 overflow-hidden flex flex-col">
        
        <!-- Search Input -->
        <div class="flex items-center px-4 border-b border-white/5">
          <Search class="w-5 h-5 text-gray-500 shrink-0" />
          <input 
            ref="searchInput"
            v-model="searchQuery"
            type="text" 
            placeholder="Cari menu atau fitur... (Ketik 'Galeri', 'Layanan', dll)"
            class="w-full bg-transparent border-0 px-4 py-4 text-white placeholder:text-gray-500 focus:ring-0 text-lg outline-none"
            @keydown.esc="close"
          />
          <div class="hidden sm:flex items-center gap-1 shrink-0">
            <kbd class="px-2 py-1 rounded bg-white/5 text-xs text-gray-500 font-mono ring-1 ring-white/10">ESC</kbd>
          </div>
        </div>

        <!-- Results / Suggestions -->
        <div class="max-h-[60vh] overflow-y-auto p-2">
          
          <div v-if="filteredCommands.length > 0">
            <div class="px-3 py-2 text-xs font-semibold text-gray-500 tracking-wider uppercase">Saran Navigasi</div>
            <div class="space-y-1">
              <button 
                v-for="cmd in filteredCommands" 
                :key="cmd.id"
                @click="executeCommand(cmd)"
                class="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white/5 group transition-colors text-left"
              >
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-gray-800 ring-1 ring-white/10 flex items-center justify-center shrink-0 text-gray-400 group-hover:text-secondary group-hover:bg-secondary/10 transition-colors">
                    <component :is="cmd.icon" class="w-4 h-4" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-white group-hover:text-secondary transition-colors">{{ cmd.title }}</p>
                    <p class="text-xs text-gray-500 mt-0.5">{{ cmd.description }}</p>
                  </div>
                </div>
                <ChevronRight class="w-4 h-4 text-gray-600 group-hover:text-secondary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </button>
            </div>
          </div>
          
          <div v-else class="py-14 text-center">
            <Search class="w-8 h-8 text-gray-600 mx-auto mb-3" />
            <h3 class="text-white font-medium">Pencarian tidak ditemukan</h3>
            <p class="text-sm text-gray-500 mt-1">Coba gunakan kata kunci lain seperti 'Profil' atau 'Kegiatan'</p>
          </div>

        </div>
        
        <!-- Footer Info -->
        <div class="px-4 py-3 bg-gray-900/50 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1.5">
              <kbd class="px-1.5 py-0.5 rounded bg-white/5 font-mono ring-1 ring-white/10">↑</kbd>
              <kbd class="px-1.5 py-0.5 rounded bg-white/5 font-mono ring-1 ring-white/10">↓</kbd>
              Navigasi
            </span>
            <span class="flex items-center gap-1.5">
              <kbd class="px-1.5 py-0.5 rounded bg-white/5 font-mono ring-1 ring-white/10">Enter</kbd>
              Pilih
            </span>
          </div>
          <span class="font-medium text-gray-600 tracking-widest text-[10px] uppercase">Kassiti OS</span>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Home, Calendar, Image, Briefcase, Wallet, Settings, UserCircle, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])
const router = useRouter()

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const searchQuery = ref('')
const searchInput = ref(null)

const commands = [
  { id: 'dashboard', title: 'Dashboard', description: 'Kembali ke ringkasan utama', icon: Home, route: 'admin-dashboard' },
  { id: 'kegiatan', title: 'Kegiatan Masjid', description: 'Kelola jadwal dan agenda kegiatan', icon: Calendar, route: 'admin-kegiatan' },
  { id: 'galeri', title: 'Galeri Foto', description: 'Unggah dan kelola album galeri', icon: Image, route: 'admin-galeri' },
  { id: 'layanan', title: 'Layanan & Fasilitas', description: 'Daftar layanan yang disediakan masjid', icon: Briefcase, route: 'admin-layanan' },
  { id: 'keuangan', title: 'Laporan Keuangan', description: 'Input data saldo akhir dan kas', icon: Wallet, route: 'admin-keuangan' },
  { id: 'pengaturan', title: 'Pengaturan Umum', description: 'Ubah teks beranda dan sosial media', icon: Settings, route: 'admin-pengaturan' },
  { id: 'profil', title: 'Profil Saya', description: 'Ubah password dan alamat email', icon: UserCircle, route: 'admin-profil' },
]

const filteredCommands = computed(() => {
  if (!searchQuery.value) return commands
  const query = searchQuery.value.toLowerCase()
  return commands.filter(cmd => 
    cmd.title.toLowerCase().includes(query) || 
    cmd.description.toLowerCase().includes(query)
  )
})

function close() {
  isOpen.value = false
  searchQuery.value = ''
}

function executeCommand(cmd) {
  router.push({ name: cmd.route })
  close()
}

watch(isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
    nextTick(() => {
      if (searchInput.value) searchInput.value.focus()
    })
  } else {
    document.body.style.overflow = ''
  }
})

// Keyboard shortcuts (Ctrl+K)
function handleKeydown(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    isOpen.value = !isOpen.value
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
