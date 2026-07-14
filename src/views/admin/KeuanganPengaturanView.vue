<template>
  <div class="space-y-6 sm:space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Pengaturan Keuangan</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola master data dan referensi transaksi keuangan DKM.</p>
      </div>
      <button 
        type="button"
        @click="saveSettings"
        :disabled="isSaving"
        class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2 rounded-lg transition-colors shadow-md text-sm flex items-center gap-2 justify-center shrink-0 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <span v-if="isSaving" class="w-4 h-4 border-2 border-white/30 dark:border-gray-950/30 border-t-white dark:border-t-gray-950 rounded-full animate-spin"></span>
        <Save v-else class="w-4 h-4" />
        <span>{{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}</span>
      </button>
    </div>

    <!-- 2-Column Layout -->
    <div class="flex flex-col md:flex-row gap-6 md:gap-8 items-start relative">
      
      <!-- Navigasi Kiri (Sidebar) -->
      <div class="w-full md:w-64 shrink-0 bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 p-2 rounded-xl shadow-sm md:sticky md:top-6 overflow-x-auto md:overflow-visible z-10">
        <div class="flex md:flex-col gap-1 min-w-max md:min-w-0">
          <button 
            type="button"
            @click="activeTab = 'master_data'"
            :class="[
              'flex items-center gap-3 px-4 md:px-3 py-2.5 rounded-lg transition-all text-sm text-left whitespace-nowrap md:whitespace-normal font-semibold',
              activeTab === 'master_data' 
                ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            ]"
          >
            <Database class="w-4 h-4 shrink-0" :class="activeTab === 'master_data' ? 'text-emerald-600 dark:text-emerald-400' : ''" />
            <span>Master Data</span>
          </button>

          <button 
            type="button"
            @click="activeTab = 'donasi_publik'"
            :class="[
              'flex items-center gap-3 px-4 md:px-3 py-2.5 rounded-lg transition-all text-sm text-left whitespace-nowrap md:whitespace-normal font-semibold',
              activeTab === 'donasi_publik' 
                ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            ]"
          >
            <CreditCard class="w-4 h-4 shrink-0" :class="activeTab === 'donasi_publik' ? 'text-emerald-600 dark:text-emerald-400' : ''" />
            <span>Pembayaran Donasi</span>
          </button>
        </div>
      </div>

      <!-- Area Konten Kanan -->
      <div class="flex-1 w-full min-w-0">
        
        <!-- Tab: Master Data -->
        <section v-if="activeTab === 'master_data'" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md animate-fade-in">
          <div class="p-6 sm:p-8 border-b border-gray-300 dark:border-white/5 flex justify-between items-center">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                <Tags class="w-5 h-5 text-gray-400" />
                Kategori Transaksi
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola jenis kategori pemasukan dan pengeluaran agar pencatatan lebih teratur.</p>
            </div>
          </div>
          
          <div v-if="isLoading" class="p-12 flex justify-center items-center">
            <div class="w-8 h-8 border-3 border-gray-200 dark:border-gray-700 border-t-secondary rounded-full animate-spin"></div>
          </div>

          <div v-else class="p-6 sm:p-8 space-y-8">
            
            <!-- Kategori Pemasukan -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <ArrowDownLeft class="w-4 h-4 text-emerald-500" /> Pemasukan
                </h4>
                <button type="button" @click="addCategory('pemasukan')" class="text-xs font-medium bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ring-1 ring-emerald-500/20">
                  <Plus class="w-3.5 h-3.5" /> Tambah
                </button>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div v-for="(cat, index) in kategoriPemasukan" :key="'in-'+index" class="group flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 transition-colors hover:border-emerald-300 dark:hover:border-emerald-500/50">
                  <input 
                    v-model="cat.name" 
                    type="text" 
                    class="w-full bg-transparent border-none focus:ring-0 px-0 py-0 text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400"
                    placeholder="Nama Kategori..."
                    @input="cat.isDirty = true"
                  />
                  <button type="button" @click="removeCategory('pemasukan', index)" class="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all shrink-0 ml-2" title="Hapus">
                    <Trash2 class="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div class="h-px bg-gray-200 dark:bg-white/10 w-full"></div>

            <!-- Kategori Pengeluaran -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <ArrowUpRight class="w-4 h-4 text-rose-500" /> Pengeluaran
                </h4>
                <button type="button" @click="addCategory('pengeluaran')" class="text-xs font-medium bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ring-1 ring-rose-500/20">
                  <Plus class="w-3.5 h-3.5" /> Tambah
                </button>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div v-for="(cat, index) in kategoriPengeluaran" :key="'out-'+index" class="group flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 transition-colors hover:border-rose-300 dark:hover:border-rose-500/50">
                  <input 
                    v-model="cat.name" 
                    type="text" 
                    class="w-full bg-transparent border-none focus:ring-0 px-0 py-0 text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400"
                    placeholder="Nama Kategori..."
                    @input="cat.isDirty = true"
                  />
                  <button type="button" @click="removeCategory('pengeluaran', index)" class="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all shrink-0 ml-2" title="Hapus">
                    <Trash2 class="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        <!-- Tab: Mode Pembayaran Donasi -->
        <section v-else-if="activeTab === 'donasi_publik'" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md animate-fade-in">
          <div class="p-6 sm:p-8 border-b border-gray-300 dark:border-white/5 flex justify-between items-center">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                <CreditCard class="w-5 h-5 text-gray-400" />
                Pembayaran Donasi
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Konfigurasi rekening tujuan transfer dan QRIS yang akan ditampilkan pada Halaman Donasi Publik.</p>
            </div>
          </div>
          
          <div v-if="isLoading" class="p-12 flex justify-center items-center">
            <div class="w-8 h-8 border-3 border-gray-200 dark:border-gray-700 border-t-secondary rounded-full animate-spin"></div>
          </div>

          <div v-else class="p-6 sm:p-8 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Bank / Dompet Digital</label>
                  <input v-model="donationSettings.donation_payment_bank" type="text" placeholder="Cth: Bank Syariah Indonesia (BSI), BCA, OVO" class="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nomor Rekening</label>
                  <input v-model="donationSettings.donation_payment_account" type="text" placeholder="Cth: 1234567890" class="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Atas Nama</label>
                  <input v-model="donationSettings.donation_payment_name" type="text" placeholder="Cth: DKM Masjid Jami Kassiti" class="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" />
                </div>
              </div>
              
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Gambar QRIS (Opsional)</label>
                <div class="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl transition-all overflow-hidden group" :class="qrImagePreviewUrl ? 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800' : 'border-gray-300 dark:border-gray-700 hover:border-secondary hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer'">
                  
                  <template v-if="qrImagePreviewUrl">
                    <img :src="qrImagePreviewUrl" class="w-full h-full object-contain p-2" alt="QRIS Preview" />
                    <button type="button" @click="removeQrisImage" class="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600 z-10">
                      <X class="w-4 h-4" />
                    </button>
                  </template>
                  
                  <template v-else>
                    <input type="file" @change="handleFileUpload" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div class="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 pointer-events-none p-4 text-center">
                      <UploadCloud class="w-8 h-8 mb-2" />
                      <p class="text-sm font-medium"><span class="text-secondary">Klik untuk unggah</span> atau seret gambar</p>
                      <p class="text-xs mt-1">SVG, PNG, JPG atau WEBP</p>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Database, Tags, Save, Plus, Trash2, ArrowDownLeft, ArrowUpRight, CreditCard, UploadCloud, X } from 'lucide-vue-next'
import { useKeuanganStore } from '@/stores/keuangan'
import { useToastStore } from '@/stores/toast'

const keuanganStore = useKeuanganStore()
const toast = useToastStore()
import api from '@/utils/api'
const baseUrl = api.defaults.baseURL.replace(/\/v1\/?$/, '').replace(/\/api\/?$/, '')

const activeTab = ref('master_data')
const isSaving = ref(false)
const isLoading = ref(true)

// Master Data State
const kategoriPemasukan = ref([])
const kategoriPengeluaran = ref([])
const deletedCategories = ref([])

// Donation Settings State
const donationSettings = ref({
  donation_payment_bank: '',
  donation_payment_account: '',
  donation_payment_name: '',
})
const qrImageFile = ref(null)
const qrImagePreviewUrl = ref(null)

onMounted(async () => {
  isLoading.value = true
  try {
    await Promise.all([
      keuanganStore.fetchCategories(),
      keuanganStore.fetchSettings()
    ])
    populateCategories()
    populateSettings()
  } catch (err) {
    toast.addToast('Gagal memuat pengaturan', 'error')
  } finally {
    isLoading.value = false
  }
})

const populateSettings = () => {
  const s = keuanganStore.settings || {}
  donationSettings.value.donation_payment_bank = s.donation_payment_bank || ''
  donationSettings.value.donation_payment_account = s.donation_payment_account || ''
  donationSettings.value.donation_payment_name = s.donation_payment_name || ''
  if (s.donation_qris_image_path) {
    qrImagePreviewUrl.value = `${baseUrl}/storage/${s.donation_qris_image_path}`
  } else {
    qrImagePreviewUrl.value = null
  }
}

const handleFileUpload = (e) => {
  if (e.target.files.length > 0) {
    qrImageFile.value = e.target.files[0]
    qrImagePreviewUrl.value = URL.createObjectURL(qrImageFile.value)
  }
}

const removeQrisImage = () => {
  qrImageFile.value = null
  qrImagePreviewUrl.value = null
}

const populateCategories = () => {
  kategoriPemasukan.value = keuanganStore.categories
    .filter(c => c.tipe === 'pemasukan')
    .map(c => ({ id: c.id, name: c.name, tipe: c.tipe, isNew: false, isDirty: false }))
    
  kategoriPengeluaran.value = keuanganStore.categories
    .filter(c => c.tipe === 'pengeluaran')
    .map(c => ({ id: c.id, name: c.name, tipe: c.tipe, isNew: false, isDirty: false }))
}

const addCategory = (type) => {
  if (type === 'pemasukan') {
    kategoriPemasukan.value.push({ id: `new-${Date.now()}`, name: '', tipe: 'pemasukan', isNew: true, isDirty: true })
  } else {
    kategoriPengeluaran.value.push({ id: `new-${Date.now()}`, name: '', tipe: 'pengeluaran', isNew: true, isDirty: true })
  }
}

const removeCategory = (type, index) => {
  let targetArr = type === 'pemasukan' ? kategoriPemasukan.value : kategoriPengeluaran.value
  const cat = targetArr[index]
  
  if (!cat.isNew) {
    deletedCategories.value.push(cat.id)
  }
  
  targetArr.splice(index, 1)
}

const saveSettings = async () => {
  if (isSaving.value) return
  isSaving.value = true
  try {
    if (activeTab.value === 'master_data') {
      const deletePromises = []
      
      // Handle Deletions
      for (const id of deletedCategories.value) {
        deletePromises.push(keuanganStore.deleteCategory(id))
      }
      if (deletePromises.length > 0) {
        await Promise.all(deletePromises)
      }
      
      // Handle Additions and Updates via Batch
      const allCats = [...kategoriPemasukan.value, ...kategoriPengeluaran.value]
        .filter(cat => cat.name.trim())
        .map(cat => ({
          id: cat.isNew ? null : cat.id,
          nama: cat.name,
          tipe: cat.tipe
        }))
      
      if (allCats.length > 0) {
        await keuanganStore.batchUpdateCategories(allCats)
      } else {
        await keuanganStore.fetchCategories()
      }
      
      populateCategories()
      deletedCategories.value = [] // Reset deleted list
      
      toast.addToast('Kategori berhasil disimpan', 'success')
      
    } else if (activeTab.value === 'donasi_publik') {
      const formData = new FormData()
      formData.append('settings[donation_payment_bank]', donationSettings.value.donation_payment_bank)
      formData.append('settings[donation_payment_account]', donationSettings.value.donation_payment_account)
      formData.append('settings[donation_payment_name]', donationSettings.value.donation_payment_name)
      
      if (!qrImagePreviewUrl.value && !qrImageFile.value) {
        formData.append('settings[donation_qris_image_path]', '')
      }
      
      if (qrImageFile.value) {
        formData.append('qris_image', qrImageFile.value)
      }
      
      await keuanganStore.updateSettings(formData)
      populateSettings()
      toast.addToast('Mode Pembayaran berhasil disimpan', 'success')
    }
  } catch (err) {
    toast.addToast('Terjadi kesalahan saat menyimpan', 'error')
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
</style>
