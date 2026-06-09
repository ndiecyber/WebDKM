<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-1">Daftar Berita</h1>
        <p class="text-gray-500 dark:text-white/50 text-sm">Kelola informasi dan berita masjid</p>
      </div>
      <button 
        @click="openAddModal"
        class="bg-secondary hover:bg-secondary-light text-white dark:text-dark font-bold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-secondary/20 flex items-center gap-2 w-full sm:w-auto justify-center active:scale-95"
      >
        <Plus class="w-5 h-5" />
        <span>Tambah Berita</span>
      </button>
    </div>

    <!-- Table Container -->
    <div class="bg-white dark:bg-white/5 border border-gray-300 dark:border-white/5 rounded-3xl overflow-hidden shadow-md dark:shadow-2xl">
      
      <!-- Table -->
      <div v-if="adminStore.kegiatan.length > 0" class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 dark:bg-dark/50 border-b border-gray-300 dark:border-white/5 text-gray-500 dark:text-white/50 text-sm uppercase tracking-wider">
              <th class="py-5 px-6 font-semibold w-16">No</th>
              <th class="py-5 px-6 font-semibold">Berita</th>
              <th class="py-5 px-6 font-semibold">Waktu & Tempat</th>
              <th class="py-5 px-6 font-semibold text-center">Kategori</th>
              <th class="py-5 px-6 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-white/5 text-gray-900 dark:text-white text-sm">
            <tr v-for="(item, index) in adminStore.kegiatan" :key="item.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors group">
              <td class="py-4 px-6 text-gray-500 dark:text-white/50 font-medium">{{ index + 1 }}</td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-4">
                  <!-- Thumbnail Image if available, otherwise just Date Box -->
                  <div v-if="item.image" class="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-gray-300 dark:border-white/10 relative">
                    <img :src="item.image" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                      <span class="text-[12px] font-bold leading-none">{{ item.day }}</span>
                      <span class="text-[8px] font-bold uppercase">{{ item.month }}</span>
                    </div>
                  </div>
                  <div v-else class="w-14 h-14 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0 border border-gray-300 dark:border-white/10 overflow-hidden text-center">
                    <div>
                      <p class="text-[14px] font-bold text-primary dark:text-secondary leading-none">{{ item.day }}</p>
                      <p class="text-[8px] font-bold text-gray-500 uppercase">{{ item.month }}</p>
                    </div>
                  </div>
                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <p class="font-bold text-gray-900 dark:text-white">{{ item.title }}</p>
                      <span v-if="item.badge" class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-secondary text-dark shrink-0">
                        {{ item.badge }}
                      </span>
                    </div>
                    <span class="text-xs text-gray-500 dark:text-white/50 line-clamp-1 max-w-xs">{{ item.description }}</span>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-2 text-gray-700 dark:text-white/80 mb-1">
                  <Clock class="w-4 h-4 text-secondary/70" />
                  <span>{{ item.time }}</span>
                </div>
                <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-white/50">
                  <MapPin class="w-3.5 h-3.5" />
                  <span>{{ item.location }}</span>
                </div>
              </td>
              <td class="py-4 px-6 text-center">
                <span class="inline-block px-3 py-1 rounded-full border border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-white/90 text-[11px] font-bold tracking-wide shadow-md">
                  {{ item.category }}
                </span>
              </td>
              <td class="py-4 px-6 text-right">
                <div class="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  
                  <div class="relative group/tooltip">
                    <button @click="openEditModal(item)" class="p-2.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-all active:scale-90">
                      <Edit class="w-4 h-4" />
                    </button>
                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-dark text-white text-[10px] font-bold rounded shadow-lg opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                      Edit Data
                    </div>
                  </div>

                  <div class="relative group/tooltip">
                    <button @click="openDeleteModal(item)" class="p-2.5 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl text-gray-500 dark:text-white/60 hover:text-red-600 dark:hover:text-red-400 transition-all active:scale-90">
                      <Trash2 class="w-4 h-4" />
                    </button>
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
          Belum ada berita yang terdaftar bulan ini. Mari buat berita pertama Anda.
        </p>
        <button 
          @click="openAddModal"
          class="bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 active:scale-95"
        >
          <Plus class="w-5 h-5" />
          <span>Buat Berita Baru</span>
        </button>
      </div>

    </div>

    <!-- Form Modal (Tambah/Edit) -->
    <div v-if="showModal" class="fixed inset-0 z-60 flex items-center justify-center px-4">
      <div class="absolute inset-0 bg-gray-900/50 dark:bg-black/60 backdrop-blur-sm transition-opacity" @click="closeModal"></div>
      
      <div class="bg-white dark:bg-[#112323] border border-gray-300 dark:border-white/10 rounded-3xl w-full max-w-xl relative z-10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-modal-enter">
        <div class="p-6 border-b border-gray-300 dark:border-white/10 flex items-center justify-between shrink-0 bg-gray-50 dark:bg-white/5">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
              <Edit v-if="isEditing" class="w-5 h-5" />
              <Plus v-else class="w-5 h-5" />
            </div>
            <h2 class="text-xl font-heading font-bold text-gray-900 dark:text-white">{{ isEditing ? 'Edit Berita' : 'Tambah Berita Baru' }}</h2>
          </div>
          <button @click="closeModal" class="p-2 text-gray-400 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl transition-all active:scale-90">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 overflow-y-auto custom-scrollbar">
          <form @submit.prevent="saveKegiatan" class="space-y-5">
            
            <!-- Image Upload Area -->
            <div>
              <label class="block text-gray-700 dark:text-white/70 text-sm font-medium mb-2">Banner / Foto Berita</label>
              <div 
                class="relative border-2 border-dashed rounded-xl p-6 transition-all text-center flex flex-col items-center justify-center min-h-[160px]"
                :class="[
                  isDragging ? 'border-secondary bg-secondary/5' : 'border-gray-300 dark:border-white/10 hover:border-secondary hover:bg-gray-50 dark:hover:bg-white/5',
                  form.image ? 'p-1' : 'p-6'
                ]"
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="handleDrop"
              >
                <!-- Upload Area -->
                <div v-if="!form.image" class="pointer-events-none flex flex-col items-center">
                  <div class="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-3">
                    <UploadCloud class="w-5 h-5" />
                  </div>
                  <p class="text-sm font-medium text-gray-700 dark:text-white/80 mb-1">
                    Tarik dan lepas foto ke sini
                  </p>
                  <p class="text-xs text-gray-500 dark:text-white/50 mb-3">
                    atau klik tombol di bawah
                  </p>
                  <input type="file" accept="image/*" class="hidden" ref="fileInput" @change="handleFileSelect" />
                  <button type="button" @click="$refs.fileInput.click()" class="pointer-events-auto px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium text-xs transition-transform active:scale-95 shadow-md hover:shadow-md">
                    Pilih File
                  </button>
                </div>

                <!-- Preview Overlay -->
                <div v-if="form.image" class="absolute inset-0 bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center group">
                  <img :src="form.image" class="h-full w-full object-cover opacity-90 dark:opacity-80" />
                  <button @click.prevent="form.image = ''" class="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <X class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="block text-gray-700 dark:text-white/70 text-sm font-medium mb-2">Judul Berita</label>
                <input 
                  v-model="form.title"
                  type="text" 
                  required
                  class="w-full bg-white dark:bg-dark/50 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all"
                  placeholder="Misal: Kajian Akbar Bulanan"
                />
              </div>
              
              <div>
                <label class="block text-gray-700 dark:text-white/70 text-sm font-medium mb-2">Kategori</label>
                <select 
                  v-model="form.category"
                  required
                  class="w-full bg-white dark:bg-dark/50 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all appearance-none"
                >
                  <option class="bg-white dark:bg-slate-800 text-gray-900 dark:text-white" value="Kajian">Kajian</option>
                  <option class="bg-white dark:bg-slate-800 text-gray-900 dark:text-white" value="Pendidikan">Pendidikan</option>
                  <option class="bg-white dark:bg-slate-800 text-gray-900 dark:text-white" value="Sosial">Sosial</option>
                  <option class="bg-white dark:bg-slate-800 text-gray-900 dark:text-white" value="Ibadah">Ibadah</option>
                  <option class="bg-white dark:bg-slate-800 text-gray-900 dark:text-white" value="Umum">Umum</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-gray-700 dark:text-white/70 text-sm font-medium mb-2">Deskripsi Singkat</label>
              <textarea 
                v-model="form.description"
                required
                rows="2"
                class="w-full bg-white dark:bg-dark/50 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all resize-none"
                placeholder="Penjelasan singkat mengenai acara..."
              ></textarea>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-gray-300 dark:border-white/10 pt-5 mt-5">
              <div>
                <label class="block text-gray-700 dark:text-white/70 text-sm font-medium mb-2">Tanggal (Angka)</label>
                <input 
                  v-model="form.day"
                  type="text" 
                  required
                  class="w-full bg-white dark:bg-dark/50 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all text-center"
                  placeholder="15"
                />
              </div>
              <div>
                <label class="block text-gray-700 dark:text-white/70 text-sm font-medium mb-2">Bulan (Singkat)</label>
                <input 
                  v-model="form.month"
                  type="text" 
                  required
                  class="w-full bg-white dark:bg-dark/50 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all text-center uppercase"
                  placeholder="Jun"
                />
              </div>
              <div class="col-span-2">
                <label class="block text-gray-700 dark:text-white/70 text-sm font-medium mb-2">Waktu (Jam)</label>
                <input 
                  v-model="form.time"
                  type="text" 
                  required
                  class="w-full bg-white dark:bg-dark/50 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all"
                  placeholder="09:00 - 12:00"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="block text-gray-700 dark:text-white/70 text-sm font-medium mb-2">Lokasi / Tempat</label>
                <input 
                  v-model="form.location"
                  type="text" 
                  required
                  class="w-full bg-white dark:bg-dark/50 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all"
                  placeholder="Misal: Aula Utama"
                />
              </div>
              <div>
                <label class="block text-gray-700 dark:text-white/70 text-sm font-medium mb-2">Badge / Label (Opsional)</label>
                <input 
                  v-model="form.badge"
                  type="text" 
                  class="w-full bg-white dark:bg-dark/50 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all"
                  placeholder="Misal: Segera, Terbatas"
                />
              </div>
            </div>

          </form>
        </div>
        
        <div class="p-6 border-t border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex items-center justify-end gap-3 shrink-0">
          <button 
            type="button" 
            @click="closeModal"
            class="px-5 py-2.5 rounded-xl text-gray-600 dark:text-white/70 font-semibold hover:bg-gray-200 dark:hover:bg-white/10 transition-all active:scale-95"
          >
            Batal
          </button>
          <button 
            @click="saveKegiatan"
            class="px-6 py-2.5 rounded-xl bg-secondary hover:bg-secondary-light text-white dark:text-dark font-bold shadow-lg shadow-secondary/20 transition-all active:scale-95 flex items-center gap-2"
          >
            <Save class="w-5 h-5" />
            <span>{{ isEditing ? 'Simpan Perubahan' : 'Tambah Berita' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal (Hapus) -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-[70] flex items-center justify-center px-4">
      <div class="absolute inset-0 bg-gray-900/50 dark:bg-black/60 backdrop-blur-sm transition-opacity" @click="closeDeleteModal"></div>
      
      <div class="bg-white dark:bg-[#112323] border border-gray-300 dark:border-red-500/20 rounded-3xl w-full max-w-sm relative z-10 shadow-2xl p-6 text-center animate-modal-enter">
        <div class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center mx-auto mb-4 text-red-500">
          <AlertTriangle class="w-8 h-8 text-red-600 dark:text-red-500" />
        </div>
        <h3 class="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">Hapus Berita?</h3>
        <p class="text-gray-500 dark:text-white/60 text-sm mb-8">
          Tindakan ini tidak dapat dibatalkan. Berita <strong>"{{ itemToDelete?.title }}"</strong> akan dihapus secara permanen.
        </p>
        <div class="flex items-center gap-3 w-full">
          <button 
            @click="closeDeleteModal"
            class="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white/70 font-semibold hover:bg-gray-200 dark:hover:bg-white/10 transition-all active:scale-95 border border-gray-300 dark:border-transparent"
          >
            Batal
          </button>
          <button 
            @click="confirmDelete"
            class="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg shadow-red-500/20 transition-all active:scale-95"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, Edit, Trash2, X, Calendar, Clock, MapPin, UploadCloud, AlertTriangle, Save } from 'lucide-vue-next'
import { useToastStore } from '../../stores/toast'
import { useAdminStore } from '../../stores/admin'

const toastStore = useToastStore()
const adminStore = useAdminStore()

// Modal States
const showModal = ref(false)
const isEditing = ref(false)
const showDeleteModal = ref(false)
const itemToDelete = ref(null)

const isDragging = ref(false)
const fileInput = ref(null)

const getDefaultForm = () => ({
  id: null,
  title: '',
  category: 'Kajian',
  description: '',
  day: '',
  month: '',
  time: '',
  location: '',
  badge: '',
  image: ''
})

const form = ref(getDefaultForm())

const handleDrop = (e) => {
  isDragging.value = false
  const file = e.dataTransfer?.files[0]
  if (file && file.type.startsWith('image/')) {
    form.value.image = URL.createObjectURL(file)
  } else {
    toastStore.addToast('Format file tidak didukung', 'error')
  }
}

const handleFileSelect = (e) => {
  const file = e.target.files[0]
  if (file) {
    form.value.image = URL.createObjectURL(file)
  }
}

const openAddModal = () => {
  isEditing.value = false
  form.value = getDefaultForm()
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

const openEditModal = (item) => {
  isEditing.value = true
  form.value = { ...item }
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  showModal.value = false
  document.body.style.overflow = ''
}

const saveKegiatan = () => {
  if (!form.value.title || !form.value.category || !form.value.description) return
  
  if (isEditing.value) {
    const index = adminStore.kegiatan.findIndex(k => k.id === form.value.id)
    if (index !== -1) {
      adminStore.kegiatan[index] = { ...form.value }
      adminStore.saveKegiatan()
    }
    toastStore.addToast('Berita berhasil diperbarui', 'success')
  } else {
    const newId = adminStore.kegiatan.length > 0 ? Math.max(...adminStore.kegiatan.map(k => k.id)) + 1 : 1
    
    // Pick a default image if available and user didn't upload one
    let defImg = form.value.image
    if (!defImg && adminStore.kegiatan.length > 0) {
      defImg = adminStore.kegiatan[0].image
    }

    adminStore.kegiatan.push({
      ...form.value,
      id: newId,
      image: defImg
    })
    adminStore.saveKegiatan()
    toastStore.addToast('Berita baru berhasil ditambahkan', 'success')
  }
  
  closeModal()
}

const openDeleteModal = (item) => {
  itemToDelete.value = item
  showDeleteModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  itemToDelete.value = null
  document.body.style.overflow = ''
}

const confirmDelete = () => {
  if (itemToDelete.value) {
    adminStore.kegiatan = adminStore.kegiatan.filter(k => k.id !== itemToDelete.value.id)
    adminStore.saveKegiatan()
    toastStore.addToast('Berita berhasil dihapus', 'error')
  }
  closeDeleteModal()
}
</script>

<style scoped>
@keyframes modalEnter {
  0% { opacity: 0; transform: scale(0.95) translateY(10px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}

.animate-modal-enter {
  animation: modalEnter 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
