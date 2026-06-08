<template>
  <div class="space-y-6 sm:space-y-8">
    <!-- Header Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Layanan & Fasilitas</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola daftar layanan dan fasilitas yang disediakan oleh masjid.</p>
      </div>
      <button 
        @click="openModal()"
        class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm text-sm shrink-0"
      >
        <Plus class="w-4 h-4" />
        <span>Tambah Layanan Baru</span>
      </button>
    </div>

    <!-- Services Table -->
    <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-white/10 rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-white/5">
              <th class="py-3 px-4 sm:px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Layanan</th>
              <th class="py-3 px-4 sm:px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Deskripsi Singkat</th>
              <th class="py-3 px-4 sm:px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-24 text-center">Status</th>
              <th class="py-3 px-4 sm:px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-24 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-white/5 bg-white dark:bg-gray-900">
            <tr v-for="item in services" :key="item.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
              <td class="py-4 px-4 sm:px-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-white/10 flex items-center justify-center shrink-0">
                    <span class="text-lg">{{ item.icon }}</span>
                  </div>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">{{ item.title }}</span>
                </div>
              </td>
              <td class="py-4 px-4 sm:px-6">
                <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 max-w-md">{{ item.description }}</p>
              </td>
              <td class="py-4 px-4 sm:px-6 text-center">
                <span class="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 ring-1 ring-green-200 dark:ring-green-500/20">Aktif</span>
              </td>
              <td class="py-4 px-4 sm:px-6">
                <div class="flex items-center justify-end gap-1">
                  <button @click="openModal(item)" class="p-2 rounded-lg text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors" title="Edit">
                    <Edit2 class="w-4 h-4" />
                  </button>
                  <button @click="deleteItem(item.id)" class="p-2 rounded-lg text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors" title="Hapus">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Empty State -->
      <div v-if="services.length === 0" class="text-center py-16">
        <div class="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-white/10 flex items-center justify-center mx-auto mb-3">
          <Briefcase class="w-5 h-5 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 class="text-sm font-medium text-gray-900 dark:text-white">Belum ada layanan</h3>
        <p class="text-xs text-gray-500 mt-1">Tambahkan layanan pertama Anda sekarang.</p>
      </div>

      <!-- Footer Pagination -->
      <div class="px-4 sm:px-6 py-3 border-t border-gray-200 dark:border-white/5 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50">
        <span>Menampilkan 1 hingga {{ services.length }} dari {{ services.length }} layanan</span>
        <div class="flex gap-1">
          <button disabled class="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border border-gray-200 dark:border-white/5">Sebelumnya</button>
          <button disabled class="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border border-gray-200 dark:border-white/5">Selanjutnya</button>
        </div>
      </div>
    </div>

    <!-- Form Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div class="absolute inset-0 bg-gray-900/50 dark:bg-gray-950/80 backdrop-blur-sm" @click="closeModal"></div>
      
      <div class="relative bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-white/10 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-gray-200 dark:border-white/5 flex items-center justify-between shrink-0 bg-white dark:bg-gray-900">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">{{ isEditing ? 'Edit Layanan' : 'Tambah Layanan Baru' }}</h3>
          <button @click="closeModal" class="p-2 -mr-2 text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-white/5">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <!-- Modal Body -->
        <div class="p-6 overflow-y-auto">
          <form @submit.prevent="saveItem" class="space-y-5">
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Layanan</label>
              <input 
                v-model="form.title"
                type="text" 
                required
                placeholder="Misal: Konsultasi Agama"
                class="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all text-sm"
              />
            </div>
            
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Emoji Ikon</label>
              <input 
                v-model="form.icon"
                type="text" 
                required
                maxlength="2"
                placeholder="🕌"
                class="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all text-xl"
              />
              <p class="text-xs text-gray-500 mt-1">Satu karakter emoji untuk merepresentasikan layanan.</p>
            </div>

            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi Layanan</label>
              
              <!-- Rich Text Editor UI -->
              <div class="border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-secondary transition-all bg-gray-50 dark:bg-white/5">
                <!-- Toolbar -->
                <div class="flex items-center gap-1 p-2 border-b border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-gray-900/50">
                  <button type="button" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors" title="Bold">
                    <Bold class="w-4 h-4" />
                  </button>
                  <button type="button" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors" title="Italic">
                    <Italic class="w-4 h-4" />
                  </button>
                  <button type="button" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors" title="Underline">
                    <Underline class="w-4 h-4" />
                  </button>
                  <div class="w-px h-4 bg-gray-300 dark:bg-white/10 mx-1"></div>
                  <button type="button" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors" title="Bullet List">
                    <List class="w-4 h-4" />
                  </button>
                  <button type="button" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors" title="Numbered List">
                    <ListOrdered class="w-4 h-4" />
                  </button>
                  <div class="w-px h-4 bg-gray-300 dark:bg-white/10 mx-1"></div>
                  <button type="button" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors" title="Link">
                    <LinkIcon class="w-4 h-4" />
                  </button>
                </div>
                <!-- Editor Area -->
                <textarea 
                  v-model="form.description"
                  required
                  rows="4"
                  placeholder="Jelaskan secara singkat tentang layanan ini..."
                  class="w-full bg-transparent border-0 px-3 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-0 resize-none text-sm outline-none"
                ></textarea>
              </div>
            </div>
          </form>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-gray-900/50 shrink-0 flex items-center justify-end gap-3">
          <button 
            type="button" 
            @click="closeModal"
            class="px-4 py-2 rounded-lg font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 border border-gray-200 dark:border-transparent dark:ring-1 dark:ring-white/10 transition-colors text-sm"
          >
            Batal
          </button>
          <button 
            @click="saveItem"
            class="px-4 py-2 rounded-lg font-medium bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 transition-colors flex items-center gap-2 shadow-sm text-sm"
          >
            <span>{{ isEditing ? 'Simpan Perubahan' : 'Tambahkan' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, Edit2, Trash2, X, Briefcase, Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon } from 'lucide-vue-next'
import { useToastStore } from '../../stores/toast'

const toastStore = useToastStore()

// Mock Data
const services = ref([
  { id: 1, title: 'Kajian Rutin & Tabligh Akbar', icon: '📖', description: 'Program kajian keislaman rutin mingguan dan tabligh akbar bulanan untuk memperdalam ilmu agama.' },
  { id: 2, title: 'Taman Pendidikan Al-Qur\'an', icon: '🎓', description: 'Pendidikan baca tulis Al-Qur\'an untuk anak-anak dan remaja dengan metode Iqro dan bimbingan akhlak.' },
  { id: 3, title: 'Ambulans & Pengurusan Jenazah', icon: '🚑', description: 'Layanan ambulans gratis untuk warga sekitar dan tim profesional untuk pengurusan jenazah sesuai syariat.' },
  { id: 4, title: 'Konsultasi Syariah', icon: '💡', description: 'Ruang konsultasi pribadi dengan ustadz kompeten untuk masalah keluarga, fiqih, dan kehidupan sehari-hari.' },
])

const showModal = ref(false)
const isEditing = ref(false)
const form = ref({ id: null, title: '', icon: '', description: '' })

function openModal(item = null) {
  if (item) {
    isEditing.value = true
    form.value = { ...item }
  } else {
    isEditing.value = false
    form.value = { id: null, title: '', icon: '', description: '' }
  }
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  showModal.value = false
  document.body.style.overflow = ''
}

function saveItem() {
  if (!form.value.title || !form.value.description || !form.value.icon) return
  
  if (isEditing.value) {
    const index = services.value.findIndex(s => s.id === form.value.id)
    if (index !== -1) {
      services.value[index] = { ...form.value }
    }
  } else {
    services.value.push({
      id: Date.now(),
      title: form.value.title,
      icon: form.value.icon,
      description: form.value.description
    })
  }
  
  toastStore.addToast(isEditing.value ? 'Layanan berhasil diperbarui' : 'Layanan baru berhasil ditambahkan')
  closeModal()
}

function deleteItem(id) {
  if (confirm('Apakah Anda yakin ingin menghapus layanan ini?')) {
    services.value = services.value.filter(s => s.id !== id)
    toastStore.addToast('Layanan berhasil dihapus', 'error')
  }
}
</script>
