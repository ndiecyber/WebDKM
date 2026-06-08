<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-1">Daftar Kegiatan</h1>
        <p class="text-gray-500 dark:text-white/50 text-sm">Kelola jadwal kajian dan kegiatan masjid</p>
      </div>
      <button 
        @click="openAddModal"
        class="bg-secondary hover:bg-secondary-light text-white dark:text-dark font-bold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-secondary/20 flex items-center gap-2 w-full sm:w-auto justify-center active:scale-95"
      >
        <Plus class="w-5 h-5" />
        <span>Tambah Kegiatan</span>
      </button>
    </div>

    <!-- Table Container -->
    <div class="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm dark:shadow-2xl">
      
      <!-- Table -->
      <div v-if="adminStore.kegiatan.length > 0" class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 dark:bg-dark/50 border-b border-gray-200 dark:border-white/5 text-gray-500 dark:text-white/50 text-sm uppercase tracking-wider">
              <th class="py-5 px-6 font-semibold w-16">No</th>
              <th class="py-5 px-6 font-semibold">Judul Kegiatan</th>
              <th class="py-5 px-6 font-semibold">Waktu</th>
              <th class="py-5 px-6 font-semibold">Pemateri / Ustadz</th>
              <th class="py-5 px-6 font-semibold text-center">Status</th>
              <th class="py-5 px-6 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-white/5 text-gray-900 dark:text-white text-sm">
            <tr v-for="(item, index) in adminStore.kegiatan" :key="item.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors group">
              <td class="py-4 px-6 text-gray-500 dark:text-white/50 font-medium">{{ index + 1 }}</td>
              <td class="py-4 px-6">
                <p class="font-bold text-gray-900 dark:text-white mb-1">{{ item.title }}</p>
                <span class="inline-block px-2.5 py-0.5 rounded-full border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60 text-[11px] font-medium tracking-wide">
                  {{ item.type }}
                </span>
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-2 text-gray-700 dark:text-white/80 mb-1">
                  <Calendar class="w-4 h-4 text-secondary/70" />
                  <span>{{ item.date }}</span>
                </div>
                <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-white/50">
                  <Clock class="w-3.5 h-3.5" />
                  <span>{{ item.time }}</span>
                </div>
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-2 text-gray-700 dark:text-white/80">
                  <User class="w-4 h-4 text-gray-400 dark:text-white/40" />
                  <span>{{ item.ustadz || '-' }}</span>
                </div>
              </td>
              <td class="py-4 px-6 text-center">
                <span 
                  class="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold tracking-wide"
                  :class="item.status === 'Aktif' ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20' : 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20'"
                >
                  <span class="w-1.5 h-1.5 rounded-full mr-2" :class="item.status === 'Aktif' ? 'bg-green-500 dark:bg-green-400' : 'bg-red-500 dark:bg-red-400'"></span>
                  {{ item.status }}
                </span>
              </td>
              <td class="py-4 px-6 text-right">
                <div class="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  
                  <!-- Edit Button with Tooltip -->
                  <div class="relative group/tooltip">
                    <button @click="openEditModal(item)" class="p-2.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-all active:scale-90">
                      <Edit class="w-4 h-4" />
                    </button>
                    <!-- Tooltip -->
                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-dark text-white text-[10px] font-bold rounded shadow-lg opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                      Edit Data
                    </div>
                  </div>

                  <!-- Delete Button with Tooltip -->
                  <div class="relative group/tooltip">
                    <button @click="openDeleteModal(item)" class="p-2.5 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl text-gray-500 dark:text-white/60 hover:text-red-600 dark:hover:text-red-400 transition-all active:scale-90">
                      <Trash2 class="w-4 h-4" />
                    </button>
                    <!-- Tooltip -->
                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-dark text-white text-[10px] font-bold rounded shadow-lg opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                      Hapus
                    </div>
                  </div>

                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="py-24 px-6 text-center flex flex-col items-center justify-center">
        <!-- Abstract Calendar SVG Illustration -->
        <div class="w-48 h-48 mb-6 relative">
          <div class="absolute inset-0 bg-secondary/10 rounded-full blur-[40px]"></div>
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="relative z-10 w-full h-full opacity-60">
            <rect x="50" y="60" width="100" height="100" rx="16" class="fill-gray-900/5 dark:fill-white/5 stroke-gray-900/20 dark:stroke-white/20" stroke-width="4"/>
            <path d="M50 90H150" class="stroke-gray-900/20 dark:stroke-white/20" stroke-width="4"/>
            <rect x="70" y="40" width="12" height="40" rx="6" fill="#D4AF37"/>
            <rect x="118" y="40" width="12" height="40" rx="6" fill="#D4AF37"/>
            <!-- Sparkles -->
            <path d="M30 40 L35 55 L50 60 L35 65 L30 80 L25 65 L10 60 L25 55 Z" fill="#D4AF37" fill-opacity="0.5"/>
            <path d="M170 120 L172 128 L180 130 L172 132 L170 140 L168 132 L160 130 L168 128 Z" class="fill-gray-900/30 dark:fill-white/30"/>
          </svg>
        </div>
        <h3 class="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">Jadwal Masih Kosong</h3>
        <p class="text-gray-500 dark:text-white/50 max-w-sm mx-auto mb-8">
          Belum ada agenda atau kegiatan yang terdaftar bulan ini. Mari buat jadwal kegiatan pertama Anda.
        </p>
        <button 
          @click="openAddModal"
          class="bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 active:scale-95"
        >
          <Plus class="w-5 h-5" />
          <span>Buat Kegiatan Baru</span>
        </button>
      </div>

    </div>

    <!-- Form Modal (Tambah/Edit) -->
    <div v-if="showModal" class="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div class="absolute inset-0 bg-gray-900/50 dark:bg-black/60 backdrop-blur-sm transition-opacity" @click="closeModal"></div>
      
      <div class="bg-white dark:bg-[#112323] border border-gray-200 dark:border-white/10 rounded-3xl w-full max-w-lg relative z-10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-modal-enter">
        <div class="p-6 border-b border-gray-200 dark:border-white/10 flex items-center justify-between shrink-0 bg-gray-50 dark:bg-white/5">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
              <Edit v-if="isEditing" class="w-5 h-5" />
              <Plus v-else class="w-5 h-5" />
            </div>
            <h2 class="text-xl font-heading font-bold text-gray-900 dark:text-white">{{ isEditing ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru' }}</h2>
          </div>
          <button @click="closeModal" class="p-2 text-gray-400 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl transition-all active:scale-90">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 overflow-y-auto custom-scrollbar">
          <form @submit.prevent="saveKegiatan" class="space-y-5">
            <div>
              <label class="block text-gray-700 dark:text-white/70 text-sm font-medium mb-2">Judul Kegiatan</label>
              <input v-model="formData.title" type="text" required class="w-full bg-white dark:bg-dark/50 border border-gray-200 dark:border-white/10 rounded-xl py-3 px-4 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder-white/30 focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" placeholder="Contoh: Kajian Rutin Ahad Pagi">
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-gray-700 dark:text-white/70 text-sm font-medium mb-2">Kategori</label>
                <div class="relative">
                  <select v-model="formData.type" required class="w-full bg-white dark:bg-dark/50 border border-gray-200 dark:border-white/10 rounded-xl py-3 px-4 text-gray-900 dark:text-white focus:border-secondary transition-all appearance-none cursor-pointer">
                    <option>Kajian Rutin</option>
                    <option>Kajian Tematik</option>
                    <option>Pendidikan</option>
                    <option>Sosial</option>
                    <option>Lainnya</option>
                  </select>
                  <ChevronDown class="w-4 h-4 text-gray-400 dark:text-white/40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <div>
                <label class="block text-gray-700 dark:text-white/70 text-sm font-medium mb-2">Status</label>
                <div class="relative">
                  <select v-model="formData.status" class="w-full bg-white dark:bg-dark/50 border border-gray-200 dark:border-white/10 rounded-xl py-3 px-4 text-gray-900 dark:text-white focus:border-secondary transition-all appearance-none cursor-pointer">
                    <option>Aktif</option>
                    <option>Nonaktif</option>
                  </select>
                  <ChevronDown class="w-4 h-4 text-gray-400 dark:text-white/40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-gray-700 dark:text-white/70 text-sm font-medium mb-2">Hari / Tanggal</label>
                <div class="relative">
                  <input v-model="formData.date" type="text" required class="w-full bg-white dark:bg-dark/50 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder-white/30 focus:border-secondary transition-all" placeholder="Setiap Ahad">
                  <Calendar class="w-4 h-4 text-gray-400 dark:text-white/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <div>
                <label class="block text-gray-700 dark:text-white/70 text-sm font-medium mb-2">Waktu</label>
                <div class="relative">
                  <input v-model="formData.time" type="text" required class="w-full bg-white dark:bg-dark/50 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder-white/30 focus:border-secondary transition-all" placeholder="05:00 - Selesai">
                  <Clock class="w-4 h-4 text-gray-400 dark:text-white/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label class="block text-gray-700 dark:text-white/70 text-sm font-medium mb-2">Pemateri / Ustadz (Opsional)</label>
              <div class="relative">
                <input v-model="formData.ustadz" type="text" class="w-full bg-white dark:bg-dark/50 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder-white/30 focus:border-secondary transition-all" placeholder="Contoh: Ust. Abdul Somad">
                <User class="w-4 h-4 text-gray-400 dark:text-white/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </form>
        </div>

        <div class="p-6 border-t border-gray-200 dark:border-white/10 flex items-center justify-end gap-3 shrink-0 bg-gray-50 dark:bg-dark/30">
          <button @click="closeModal" class="px-6 py-3 rounded-xl text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 font-medium transition-all active:scale-95 border border-gray-200 dark:border-transparent">
            Batal
          </button>
          <button @click="saveKegiatan" class="px-6 py-3 rounded-xl bg-secondary hover:bg-secondary-light text-white dark:text-dark font-bold transition-all shadow-lg hover:shadow-secondary/20 active:scale-95 flex items-center gap-2">
            <Save class="w-5 h-5" />
            <span>Simpan Data</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Custom Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-[70] flex items-center justify-center px-4">
      <div class="absolute inset-0 bg-gray-900/50 dark:bg-black/70 backdrop-blur-sm" @click="closeDeleteModal"></div>
      
      <div class="bg-white dark:bg-[#112323] border border-gray-200 dark:border-red-500/20 rounded-3xl w-full max-w-sm relative z-10 shadow-2xl p-8 text-center animate-modal-enter">
        <div class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center mx-auto mb-5">
          <AlertTriangle class="w-8 h-8 text-red-600 dark:text-red-500" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Hapus Kegiatan?</h2>
        <p class="text-gray-500 dark:text-white/60 mb-8 text-sm leading-relaxed">
          Apakah Anda yakin ingin menghapus <strong>"{{ itemToDelete?.title }}"</strong>? Data yang sudah dihapus tidak dapat dikembalikan.
        </p>
        <div class="flex items-center gap-3">
          <button @click="closeDeleteModal" class="flex-1 px-5 py-3 rounded-xl text-gray-700 dark:text-white font-medium bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-all active:scale-95 border border-gray-200 dark:border-transparent">
            Batal
          </button>
          <button @click="confirmDelete" class="flex-1 px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-all shadow-lg shadow-red-500/20 active:scale-95">
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAdminStore } from '../../stores/admin'
import { useToastStore } from '../../stores/toast'
import { Plus, Edit, Trash2, X, Calendar, Clock, User, ChevronDown, Save, AlertTriangle } from 'lucide-vue-next'

const adminStore = useAdminStore()
const toastStore = useToastStore()

const showModal = ref(false)
const isEditing = ref(false)
const formData = ref({
  id: null,
  title: '',
  type: 'Kajian Rutin',
  date: '',
  time: '',
  ustadz: '',
  status: 'Aktif'
})

// Delete Modal State
const showDeleteModal = ref(false)
const itemToDelete = ref(null)

function openAddModal() {
  isEditing.value = false
  formData.value = {
    id: null,
    title: '',
    type: 'Kajian Rutin',
    date: '',
    time: '',
    ustadz: '',
    status: 'Aktif'
  }
  showModal.value = true
}

function openEditModal(item) {
  isEditing.value = true
  formData.value = { ...item }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function saveKegiatan() {
  if (!formData.value.title || !formData.value.date || !formData.value.time) {
    toastStore.addToast('Mohon lengkapi judul, tanggal, dan waktu', 'error')
    return
  }

  if (isEditing.value) {
    adminStore.updateKegiatan(formData.value.id, formData.value)
    toastStore.addToast('Jadwal kegiatan berhasil diperbarui!')
  } else {
    adminStore.addKegiatan(formData.value)
    toastStore.addToast('Kegiatan baru berhasil ditambahkan!')
  }
  
  closeModal()
}

function openDeleteModal(item) {
  itemToDelete.value = item
  showDeleteModal.value = true
}

function closeDeleteModal() {
  showDeleteModal.value = false
  itemToDelete.value = null
}

function confirmDelete() {
  if (itemToDelete.value) {
    adminStore.deleteKegiatan(itemToDelete.value.id)
    toastStore.addToast(`Kegiatan "${itemToDelete.value.title}" berhasil dihapus.`)
    closeDeleteModal()
  }
}
</script>

<style scoped>
.animate-modal-enter {
  animation: modalEnter 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Custom Scrollbar for modal content */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5); /* gray-400 */
  border-radius: 10px;
}
:deep(.dark) .custom-scrollbar::-webkit-scrollbar-thumb,
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.8);
}
:deep(.dark) .custom-scrollbar::-webkit-scrollbar-thumb:hover,
.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
