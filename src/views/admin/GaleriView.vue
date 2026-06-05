<template>
  <div class="space-y-6 sm:space-y-8">
    <!-- Header Actions (Filament Style) -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">Galeri Foto</h1>
        <p class="text-sm text-gray-400 mt-1">Kelola daftar foto yang tampil di halaman beranda website.</p>
      </div>
      <button 
        @click="openModal()"
        class="bg-secondary hover:bg-yellow-500 text-gray-950 font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm text-sm shrink-0"
      >
        <Plus class="w-4 h-4" />
        <span>Tambah Foto Baru</span>
      </button>
    </div>

    <!-- Gallery Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div 
        v-for="item in gallery" 
        :key="item.id"
        class="bg-gray-900 ring-1 ring-white/10 rounded-xl overflow-hidden group shadow-sm flex flex-col"
      >
        <div class="relative aspect-video overflow-hidden shrink-0 border-b border-white/5">
          <img :src="item.image" :alt="item.caption" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gray-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <!-- Actions Overlay -->
          <div class="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button @click="openModal(item)" class="w-9 h-9 rounded-lg bg-gray-800/90 hover:bg-gray-700 text-white flex items-center justify-center ring-1 ring-white/20 transition-colors" title="Edit">
              <Edit2 class="w-4 h-4" />
            </button>
            <button @click="deleteItem(item.id)" class="w-9 h-9 rounded-lg bg-red-500/90 hover:bg-red-500 text-white flex items-center justify-center ring-1 ring-white/20 transition-colors" title="Hapus">
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
        <div class="p-4 flex-1 flex flex-col justify-between">
          <p class="text-gray-200 text-sm font-medium line-clamp-2" :title="item.caption">{{ item.caption }}</p>
          <div class="flex items-center justify-between mt-4">
            <span class="text-xs text-gray-500">{{ item.date || 'Ditambahkan hari ini' }}</span>
            <span class="px-2 py-0.5 rounded-md text-[10px] font-medium bg-green-500/10 text-green-400 ring-1 ring-green-500/20">Aktif</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="gallery.length === 0" class="text-center py-20 bg-gray-900 ring-1 ring-white/10 rounded-xl border-dashed border-white/10">
      <Image class="w-12 h-12 text-gray-600 mx-auto mb-3" />
      <h3 class="text-gray-200 font-medium text-lg tracking-tight">Belum ada foto galeri</h3>
      <p class="text-gray-500 text-sm mt-1">Klik tombol "Tambah Foto Baru" untuk mulai mengunggah.</p>
    </div>

    <!-- Form Modal (Filament Style) -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div class="absolute inset-0 bg-gray-950/80 backdrop-blur-sm" @click="closeModal"></div>
      
      <div class="relative bg-gray-900 ring-1 ring-white/10 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-white/5 flex items-center justify-between shrink-0 bg-gray-900">
          <h3 class="text-lg font-semibold text-white tracking-tight">{{ isEditing ? 'Edit Foto' : 'Tambah Foto Baru' }}</h3>
          <button @click="closeModal" class="p-2 -mr-2 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-white/5">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <!-- Modal Body -->
        <div class="p-6 overflow-y-auto">
          <form @submit.prevent="saveItem" class="space-y-5">
            
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-300">File Foto</label>
              
              <!-- Drag and Drop UI -->
              <div 
                class="relative mt-2 flex justify-center rounded-xl border border-dashed border-white/20 bg-white/5 px-6 py-10 transition-colors"
                :class="isDragging ? 'border-secondary bg-secondary/5' : 'hover:border-white/40 hover:bg-white/10'"
                @dragenter.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @dragover.prevent
                @drop.prevent="handleDrop"
              >
                <div class="text-center">
                  <div class="mx-auto w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                    <UploadCloud class="w-6 h-6 text-gray-400" :class="{ 'text-secondary': isDragging }" />
                  </div>
                  <div class="mt-4 flex text-sm leading-6 text-gray-400 justify-center">
                    <label for="file-upload" class="relative cursor-pointer rounded-md font-semibold text-secondary focus-within:outline-none hover:text-yellow-400">
                      <span>Pilih file</span>
                      <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="handleFileSelect" accept="image/*" />
                    </label>
                    <p class="pl-1">atau drag & drop ke sini</p>
                  </div>
                  <p class="text-xs leading-5 text-gray-500 mt-2">PNG, JPG, GIF maksimal 10MB</p>
                </div>
                
                <!-- Preview Overlay (Simulated) -->
                <div v-if="form.image" class="absolute inset-0 bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center group">
                  <img :src="form.image" class="h-full object-cover opacity-80" />
                  <button @click.prevent="form.image = ''" class="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <X class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-300">Caption / Keterangan</label>
              <textarea 
                v-model="form.caption"
                required
                rows="3"
                placeholder="Tuliskan keterangan foto di sini..."
                class="w-full bg-white/5 border-0 ring-1 ring-white/10 rounded-lg px-3 py-2 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all resize-none text-sm"
              ></textarea>
            </div>

          </form>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 border-t border-white/5 bg-gray-900/50 shrink-0 flex items-center justify-end gap-3">
          <button 
            type="button" 
            @click="closeModal"
            class="px-4 py-2 rounded-lg font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 ring-1 ring-white/10 transition-colors text-sm"
          >
            Batal
          </button>
          <button 
            @click="saveItem"
            class="px-4 py-2 rounded-lg font-medium bg-secondary hover:bg-yellow-500 text-gray-950 transition-colors flex items-center gap-2 shadow-sm text-sm"
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
import { Plus, Edit2, Trash2, X, Image, UploadCloud } from 'lucide-vue-next'
import { useToastStore } from '../../stores/toast'

const toastStore = useToastStore()

// Mock Data
const gallery = ref([
  { id: 1, image: 'https://images.unsplash.com/photo-1564683214965-3619addd900d?q=80&w=1470&auto=format&fit=crop', caption: 'Masjid tampak depan saat senja' },
  { id: 2, image: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1470&auto=format&fit=crop', caption: 'Suasana sholat Jumat berjamaah' },
  { id: 3, image: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=1470&auto=format&fit=crop', caption: 'Kajian rutin mingguan' },
  { id: 4, image: 'https://images.unsplash.com/photo-1579487785973-74d2ca7ab4eb?q=80&w=1470&auto=format&fit=crop', caption: 'Interior kubah utama masjid' },
])

const showModal = ref(false)
const isEditing = ref(false)
const isDragging = ref(false)
const form = ref({ id: null, image: '', caption: '' })

function openModal(item = null) {
  if (item) {
    isEditing.value = true
    form.value = { ...item }
  } else {
    isEditing.value = false
    form.value = { id: null, image: '', caption: '' }
  }
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  showModal.value = false
  document.body.style.overflow = ''
}

function saveItem() {
  if (!form.value.image || !form.value.caption) return
  
  if (isEditing.value) {
    const index = gallery.value.findIndex(g => g.id === form.value.id)
    if (index !== -1) {
      gallery.value[index] = { ...form.value }
    }
  } else {
    gallery.value.push({
      id: Date.now(),
      image: form.value.image,
      caption: form.value.caption,
      date: 'Baru saja'
    })
  }
  
  toastStore.addToast(isEditing.value ? 'Foto berhasil diperbarui' : 'Foto baru berhasil ditambahkan')
  closeModal()
}

function handleDrop(e) {
  isDragging.value = false
  const file = e.dataTransfer?.files[0]
  if (file && file.type.startsWith('image/')) {
    // Simulate upload by creating object URL
    form.value.image = URL.createObjectURL(file)
  } else {
    toastStore.addToast('Format file tidak didukung', 'error')
  }
}

function handleFileSelect(e) {
  const file = e.target.files[0]
  if (file) {
    form.value.image = URL.createObjectURL(file)
  }
}

function deleteItem(id) {
  if (confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
    gallery.value = gallery.value.filter(g => g.id !== id)
    toastStore.addToast('Foto berhasil dihapus', 'error')
  }
}
</script>
