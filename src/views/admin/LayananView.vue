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
        class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md text-sm shrink-0"
      >
        <Plus class="w-4 h-4" />
        <span>Tambah Layanan Baru</span>
      </button>
    </div>

    <!-- Services Table -->
    <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md overflow-hidden flex flex-col">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-900 border-b border-gray-300 dark:border-white/5">
              <th class="py-3 px-4 sm:px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Layanan</th>
              <th class="py-3 px-4 sm:px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kategori</th>
              <th class="py-3 px-4 sm:px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">Status</th>
              <th class="py-3 px-4 sm:px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-white/5 bg-white dark:bg-gray-900">
            <tr v-for="item in adminStore.layanan" :key="item.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
              <td class="py-4 px-4 sm:px-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-300 dark:ring-white/10 flex items-center justify-center shrink-0 text-gray-600 dark:text-gray-400">
                    <component :is="iconMap[item.iconName] || iconMap.Briefcase" class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="text-sm font-medium text-gray-900 dark:text-white block">{{ item.title }}</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 max-w-xs sm:max-w-sm mt-0.5">{{ item.description }}</span>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4 sm:px-6">
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ item.category }}</span>
              </td>
              <td class="py-4 px-4 sm:px-6 text-center">
                <span :class="['inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[11px] font-medium', item.badgeColor]">{{ item.badge }}</span>
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
      <div v-if="adminStore.layanan.length === 0" class="text-center py-16">
        <div class="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-300 dark:ring-white/10 flex items-center justify-center mx-auto mb-3">
          <Briefcase class="w-5 h-5 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 class="text-sm font-medium text-gray-900 dark:text-white">Belum ada layanan</h3>
        <p class="text-xs text-gray-500 mt-1">Tambahkan layanan pertama Anda sekarang.</p>
      </div>

      <!-- Footer Pagination -->
      <div class="px-4 sm:px-6 py-3 border-t border-gray-300 dark:border-white/5 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50">
        <span>Menampilkan 1 hingga {{ adminStore.layanan.length }} dari {{ adminStore.layanan.length }} layanan</span>
        <div class="flex gap-1">
          <button disabled class="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border border-gray-300 dark:border-white/5">Sebelumnya</button>
          <button disabled class="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border border-gray-300 dark:border-white/5">Selanjutnya</button>
        </div>
      </div>
    </div>

    <!-- Form Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div class="absolute inset-0 bg-gray-900/50 dark:bg-gray-950/80 backdrop-blur-sm" @click="closeModal"></div>
      
      <div class="relative bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-gray-300 dark:border-white/5 flex items-center justify-between shrink-0 bg-white dark:bg-gray-900">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">{{ isEditing ? 'Edit Layanan' : 'Tambah Layanan Baru' }}</h3>
          <button @click="closeModal" class="p-2 -mr-2 text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-white/5">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <!-- Modal Body -->
        <div class="p-6 overflow-y-auto">
          <form @submit.prevent="saveItem" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Layanan</label>
                <input 
                  v-model="form.title"
                  type="text" 
                  required
                  placeholder="Misal: Konsultasi Agama"
                  class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all text-sm"
                />
              </div>
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kategori</label>
                <select 
                  v-model="form.category"
                  required
                  class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm appearance-none"
                >
                  <option class="bg-white dark:bg-slate-800" value="Ibadah">Ibadah</option>
                  <option class="bg-white dark:bg-slate-800" value="Pendidikan">Pendidikan</option>
                  <option class="bg-white dark:bg-slate-800" value="Sosial">Sosial</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ikon Tema</label>
                <select 
                  v-model="form.iconName"
                  required
                  class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm appearance-none"
                >
                  <option class="bg-white dark:bg-slate-800" value="Users">Orang / Sosial</option>
                  <option class="bg-white dark:bg-slate-800" value="BookOpen">Buku / Ilmu</option>
                  <option class="bg-white dark:bg-slate-800" value="GraduationCap">Topi Toga / Edukasi</option>
                  <option class="bg-white dark:bg-slate-800" value="Heart">Hati / Kepedulian</option>
                  <option class="bg-white dark:bg-slate-800" value="HandCoins">Tangan Koin / Zakat</option>
                  <option class="bg-white dark:bg-slate-800" value="Gem">Permata / Spesial</option>
                  <option class="bg-white dark:bg-slate-800" value="Briefcase">Tas Kerja / Umum</option>
                </select>
              </div>
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Label (Badge)</label>
                <input 
                  v-model="form.badge"
                  type="text" 
                  required
                  placeholder="Misal: Tersedia"
                  class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all text-sm"
                />
              </div>
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Warna Label</label>
                <select 
                  v-model="form.badgeColor"
                  required
                  class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm appearance-none"
                >
                  <option class="bg-white dark:bg-slate-800" value="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">Hijau</option>
                  <option class="bg-white dark:bg-slate-800" value="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800">Biru</option>
                  <option class="bg-white dark:bg-slate-800" value="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800">Oranye</option>
                  <option class="bg-white dark:bg-slate-800" value="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">Zamrud</option>
                  <option class="bg-white dark:bg-slate-800" value="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800">Ungu</option>
                  <option class="bg-white dark:bg-slate-800" value="bg-primary/10 text-primary-dark dark:text-primary-light border border-primary/20">Emas (Primer)</option>
                </select>
              </div>
            </div>
            
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi Singkat (Tampil di Kartu Depan)</label>
              <textarea 
                v-model="form.description"
                required
                rows="2"
                placeholder="Penjelasan singkat sekitar 1-2 kalimat..."
                class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all resize-none text-sm"
              ></textarea>
            </div>

            <div class="border-t border-gray-300 dark:border-white/5 pt-6 mt-6">
              <h4 class="text-base font-semibold text-gray-900 dark:text-white mb-4">Detail Lengkap (Tampil di Popup Modal)</h4>
              
              <div class="space-y-4">
                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Penjelasan Penuh</label>
                  <textarea 
                    v-model="form.details.fullDescription"
                    required
                    rows="4"
                    placeholder="Jelaskan secara lengkap semua informasi mengenai layanan ini..."
                    class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all resize-none text-sm outline-none"
                  ></textarea>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div class="space-y-1">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Jadwal / Waktu</label>
                    <input 
                      v-model="form.details.schedule"
                      type="text" 
                      required
                      placeholder="Misal: Setiap Ahad"
                      class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all text-sm"
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Lokasi</label>
                    <input 
                      v-model="form.details.location"
                      type="text" 
                      required
                      placeholder="Misal: Ruang Utama"
                      class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all text-sm"
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kontak Person</label>
                    <input 
                      v-model="form.details.contact"
                      type="text" 
                      required
                      placeholder="Misal: Ust. Ahmad"
                      class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all text-sm"
                    />
                  </div>
                </div>

                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Persyaratan / Catatan Khusus</label>
                  <textarea 
                    v-model="form.details.requirementsStr"
                    rows="3"
                    placeholder="Masukkan poin persyaratan (pisahkan tiap poin dengan baris baru/Enter)..."
                    class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all resize-none text-sm outline-none"
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 border-t border-gray-300 dark:border-white/5 bg-gray-50 dark:bg-gray-900/50 shrink-0 flex items-center justify-end gap-3">
          <button 
            type="button" 
            @click="closeModal"
            class="px-4 py-2 rounded-lg font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 transition-colors text-sm"
          >
            Batal
          </button>
          <button 
            @click="saveItem"
            class="px-4 py-2 rounded-lg font-medium bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 transition-colors flex items-center gap-2 shadow-md text-sm"
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
import { Plus, Edit2, Trash2, X, Briefcase, Users, BookOpen, GraduationCap, Heart, HandCoins, Gem, MapPin, Building } from 'lucide-vue-next'
import { useToastStore } from '../../stores/toast'
import { useAdminStore } from '../../stores/admin'

const toastStore = useToastStore()
const adminStore = useAdminStore()

const iconMap = {
  Users, BookOpen, GraduationCap, Heart, HandCoins, Gem, Briefcase, MapPin, Building
}

const showModal = ref(false)
const isEditing = ref(false)

const getDefaultForm = () => ({ 
  id: null, 
  title: '', 
  category: 'Ibadah', 
  bgImage: '',
  description: '', 
  iconName: 'Users', 
  badge: 'Tersedia', 
  badgeColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800', 
  details: {
    fullDescription: '',
    schedule: '',
    location: '',
    contact: '',
    requirementsStr: ''
  }
})

const form = ref(getDefaultForm())

function openModal(item = null) {
  if (item) {
    isEditing.value = true
    form.value = { 
      ...item, 
      details: {
        ...item.details,
        requirementsStr: item.details?.requirements?.join('\n') || ''
      }
    }
  } else {
    isEditing.value = false
    form.value = getDefaultForm()
  }
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  showModal.value = false
  document.body.style.overflow = ''
}

function saveItem() {
  if (!form.value.title || !form.value.description) return
  
  const reqs = form.value.details.requirementsStr
    .split('\n')
    .map(r => r.trim())
    .filter(r => r !== '')
    
  const dataToSave = {
    ...form.value,
    details: {
      ...form.value.details,
      requirements: reqs
    }
  }
  delete dataToSave.details.requirementsStr
  
  if (isEditing.value) {
    adminStore.updateLayanan(form.value.id, dataToSave)
  } else {
    // Gunakan background image default agar tidak kosong di frontend
    if (adminStore.layanan.length > 0) {
      dataToSave.bgImage = adminStore.layanan[0].bgImage
    }
    adminStore.addLayanan(dataToSave)
  }
  
  toastStore.addToast(isEditing.value ? 'Layanan berhasil diperbarui' : 'Layanan baru berhasil ditambahkan')
  closeModal()
}

function deleteItem(id) {
  if (confirm('Apakah Anda yakin ingin menghapus layanan ini?')) {
    adminStore.deleteLayanan(id)
    toastStore.addToast('Layanan berhasil dihapus', 'error')
  }
}
</script>
