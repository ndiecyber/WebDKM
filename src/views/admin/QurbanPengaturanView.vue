<template>
  <form @submit.prevent="saveSettings" class="space-y-6 sm:space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Pengaturan Qurban</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Konfigurasi pengaturan umum sistem Qurban DKM.</p>
      </div>
      <button 
        type="submit"
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
      <div class="w-full md:w-64 shrink-0 bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 p-2 rounded-xl shadow-sm md:sticky md:top-6 overflow-x-auto md:overflow-visible">
        <div class="flex md:flex-col gap-1 min-w-max md:min-w-0">
          <button 
            type="button"
            @click="activeTab = 'contact'"
            class="flex items-center gap-3 px-4 md:px-3 py-2.5 rounded-lg transition-all text-sm text-left whitespace-nowrap md:whitespace-normal"
            :class="activeTab === 'contact' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold w-full' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 w-full'"
          >
            <Phone class="w-4 h-4 shrink-0" :class="activeTab === 'contact' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'" />
            <span>Kontak & Layanan</span>
          </button>
          
          <button 
            type="button"
            @click="activeTab = 'payment'"
            class="flex items-center gap-3 px-4 md:px-3 py-2.5 rounded-lg transition-all text-sm text-left whitespace-nowrap md:whitespace-normal"
            :class="activeTab === 'payment' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold w-full' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 w-full'"
          >
            <CreditCard class="w-4 h-4 shrink-0" :class="activeTab === 'payment' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'" />
            <span>Mode Pembayaran</span>
          </button>
        </div>
      </div>

      <!-- Area Konten Kanan -->
      <div class="flex-1 w-full min-w-0">
        
        <!-- Tab: Kontak & Layanan -->
        <section v-if="activeTab === 'contact'" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md animate-fade-in">
          <div class="p-6 sm:p-8 border-b border-gray-300 dark:border-white/5">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
              <Phone class="w-5 h-5 text-gray-400" />
              Kontak Layanan Qurban
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Atur nomor WhatsApp Customer Service yang akan dihubungi oleh jamaah pada aplikasi Tabungan Qurban.</p>
          </div>
          
          <div class="p-6 sm:p-8 space-y-6">
            <div class="space-y-4">
              <div class="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/30">
                 <!-- Radio 1: Global -->
                 <label class="flex items-start gap-3 cursor-pointer group flex-1">
                   <input type="radio" v-model="settings.whatsappType" value="global" class="mt-1 text-emerald-600 focus:ring-emerald-500" />
                   <div>
                     <span class="block text-sm font-medium text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">Gunakan Kontak Tersimpan</span>
                     <span class="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">Pilih dari daftar kontak di pengaturan web utama</span>
                   </div>
                 </label>

                 <!-- Radio 2: Custom -->
                 <label class="flex items-start gap-3 cursor-pointer group flex-1">
                   <input type="radio" v-model="settings.whatsappType" value="custom" class="mt-1 text-emerald-600 focus:ring-emerald-500" />
                   <div>
                     <span class="block text-sm font-medium text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">Gunakan Nomor Lain</span>
                     <span class="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">Masukkan nama dan nomor WA khusus panitia qurban</span>
                   </div>
                 </label>
              </div>

              <!-- Input untuk Global -->
              <div v-if="settings.whatsappType === 'global'" class="space-y-3 pt-2 animate-fade-in">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Pilih Kontak WhatsApp</label>
                <div v-if="globalWhatsappList.length > 0">
                  <select v-model="settings.selectedGlobalWaId" class="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all text-sm shadow-sm">
                    <option v-for="wa in globalWhatsappList" :key="wa.id" :value="wa.id">
                      {{ wa.name }} ({{ wa.number }})
                    </option>
                  </select>
                  <p class="text-xs text-gray-500 mt-1.5">Daftar ini diambil dari menu Web > Pengaturan > Kontak & Lokasi.</p>
                </div>
                <div v-else class="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm border border-red-100 dark:border-red-900/30">
                  Belum ada kontak WhatsApp yang tersimpan di pengaturan web.
                </div>
              </div>

              <!-- Input untuk Custom -->
              <div v-if="settings.whatsappType === 'custom'" class="space-y-4 pt-2 animate-fade-in">
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama / Bagian</label>
                  <input 
                    v-model="settings.customWaName"
                    type="text" 
                    class="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 transition-all text-sm shadow-sm"
                    placeholder="Misal: Panitia Qurban / CS Tabungan"
                  />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nomor Telepon (Awali dengan 62)</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-4 w-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    </div>
                    <input 
                      v-model="settings.customWaNumber"
                      type="tel" 
                      class="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg pl-9 pr-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 transition-all text-sm shadow-sm"
                      placeholder="628..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Tab: Mode Pembayaran -->
        <section v-if="activeTab === 'payment'" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md animate-fade-in">
          <div class="p-6 sm:p-8 border-b border-gray-300 dark:border-white/5">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
              <CreditCard class="w-5 h-5 text-gray-400" />
              Mode Pembayaran
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Pilih mode pembayaran yang digunakan oleh jamaah pada aplikasi Tabungan Qurban.</p>
          </div>
          
          <div class="p-6 sm:p-8 space-y-6">
            <!-- Toggle -->
            <div class="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/30">
              <label class="flex items-start gap-3 cursor-pointer group flex-1">
                <input type="radio" v-model="settings.payment_mode" value="manual" class="mt-1 text-emerald-600 focus:ring-emerald-500" />
                <div>
                  <span class="block text-sm font-medium text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">Manual (QRIS & Transfer BSI)</span>
                  <span class="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">Jamaah bayar via QRIS statis atau transfer ke rekening masjid, lalu upload bukti</span>
                </div>
              </label>
              <label class="flex items-start gap-3 cursor-pointer group flex-1">
                <input type="radio" v-model="settings.payment_mode" value="gateway" class="mt-1 text-emerald-600 focus:ring-emerald-500" />
                <div>
                  <span class="block text-sm font-medium text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">Payment Gateway (PaKasir)</span>
                  <span class="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">Pembayaran otomatis via QRIS dinamis dan Virtual Account</span>
                </div>
              </label>
            </div>

            <!-- Manual Config (conditional) -->
            <div v-if="settings.payment_mode === 'manual'" class="space-y-6 pt-2 animate-fade-in">
              
              <!-- QRIS Config -->
              <div class="space-y-4">
                <h4 class="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <QrCode class="w-4 h-4 text-gray-400" />
                  Konfigurasi QRIS
                </h4>
                <div class="space-y-3">
                  <div class="space-y-1.5">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">QRIS String</label>
                    <textarea 
                      v-model="settings.manual_qris_string"
                      rows="3"
                      class="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 transition-all text-sm shadow-sm font-mono"
                      placeholder="00020101021126..."
                    ></textarea>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="space-y-1.5">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Merchant</label>
                      <input 
                        v-model="settings.manual_qris_name"
                        type="text" 
                        class="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 transition-all text-sm shadow-sm"
                        placeholder="DKM JAMI KASSITI"
                      />
                    </div>
                    <div class="space-y-1.5">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">NMID <span class="text-gray-400 text-xs">(opsional)</span></label>
                      <input 
                        v-model="settings.manual_qris_nmid"
                        type="text" 
                        class="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 transition-all text-sm shadow-sm"
                        placeholder="ID 1023262832646"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Bank Config -->
              <div class="space-y-4">
                <h4 class="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Landmark class="w-4 h-4 text-gray-400" />
                  Konfigurasi Rekening Bank
                </h4>
                <div class="space-y-3">
                  <div class="space-y-1.5">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Bank</label>
                    <input 
                      v-model="settings.manual_bank_name"
                      type="text" 
                      class="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 transition-all text-sm shadow-sm"
                      placeholder="BSI"
                    />
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="space-y-1.5">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nomor Rekening</label>
                      <input 
                        v-model="settings.manual_bank_account"
                        type="text" 
                        class="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 transition-all text-sm shadow-sm"
                        placeholder="7453555555"
                      />
                    </div>
                    <div class="space-y-1.5">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Atas Nama</label>
                      <input 
                        v-model="settings.manual_bank_holder"
                        type="text" 
                        class="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 transition-all text-sm shadow-sm"
                        placeholder="DKM Masjid Jami Kassiti"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Save, Phone, CreditCard, Landmark, QrCode } from 'lucide-vue-next'
import { useQurbanStore } from '@/stores/qurban'
import { useAdminStore } from '@/stores/admin'
import { useToastStore } from '@/stores/toast'
import api from '@/utils/api'

const qurbanStore = useQurbanStore()
const adminStore = useAdminStore()
const toast = useToastStore()

const isSaving = ref(false)
const activeTab = ref('contact')

const settings = ref({
  whatsappType: 'global',
  selectedGlobalWaId: 1,
  customWaName: '',
  customWaNumber: '',
  // Mode Pembayaran
  payment_mode: 'manual',
  manual_qris_string: '',
  manual_qris_name: '',
  manual_qris_nmid: '',
  manual_bank_name: '',
  manual_bank_account: '',
  manual_bank_holder: '',
})

const globalWhatsappList = computed(() => {
  return adminStore.generalSettings?.whatsapp || []
})

const fetchSettings = async () => {
  try {
    const res = await api.get('/qurban/admin/settings')
    if (res.data?.success && res.data.data) {
      const dbSettings = res.data.data
      settings.value = {
        whatsappType: dbSettings.whatsappType || 'global',
        selectedGlobalWaId: dbSettings.selectedGlobalWaId || 1,
        customWaName: dbSettings.customWaName || '',
        customWaNumber: dbSettings.customWaNumber || '',
        payment_mode: dbSettings.payment_mode || 'manual',
        manual_qris_string: dbSettings.manual_qris_string || '',
        manual_qris_name: dbSettings.manual_qris_name || '',
        manual_qris_nmid: dbSettings.manual_qris_nmid || '',
        manual_bank_name: dbSettings.manual_bank_name || '',
        manual_bank_account: dbSettings.manual_bank_account || '',
        manual_bank_holder: dbSettings.manual_bank_holder || '',
      }
    }
  } catch (err) {
    console.error('Failed to fetch qurban settings', err)
  }
}

onMounted(() => {
  fetchSettings()
  
  // Set default selection if empty
  if (settings.value.whatsappType === 'global' && !settings.value.selectedGlobalWaId && globalWhatsappList.value.length > 0) {
    settings.value.selectedGlobalWaId = globalWhatsappList.value[0].id
  }
})

const saveSettings = async () => {
  isSaving.value = true
  
  // Validate custom number if WhatsApp custom is chosen
  if (settings.value.whatsappType === 'custom') {
    if (!settings.value.customWaName || !settings.value.customWaNumber) {
      toast.addToast('Harap lengkapi nama dan nomor WA khusus panitia.', 'error')
      isSaving.value = false
      return
    }
  }

  // Validate manual config if manual mode is chosen
  if (settings.value.payment_mode === 'manual') {
    if (!settings.value.manual_qris_string || !settings.value.manual_qris_name || 
        !settings.value.manual_bank_name || !settings.value.manual_bank_account || !settings.value.manual_bank_holder) {
      toast.addToast('Harap lengkapi semua isian konfigurasi pembayaran manual.', 'error')
      isSaving.value = false
      return
    }
  }

  try {
    const payload = {
      settings: settings.value
    }
    const res = await api.put('/qurban/admin/settings', payload)
    if (res.data?.success) {
      toast.addToast('Pengaturan Qurban berhasil disimpan!', 'success')
      qurbanStore.settings = settings.value
    }
  } catch (err) {
    toast.addToast(err.response?.data?.message || 'Gagal menyimpan pengaturan', 'error')
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>