<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-gray-950/80 backdrop-blur-sm" @click="$emit('close')"></div>
      
      <!-- Modal Content -->
      <div class="relative bg-white dark:bg-gray-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-gray-300 dark:border-white/10 flex flex-col h-[calc(100vh-3rem)] sm:h-auto sm:max-h-[90vh]">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-300 dark:border-white/10 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart class="w-5 h-5 text-primary animate-pulse" />
            </div>
            <h3 class="font-heading font-bold text-lg text-gray-900 dark:text-white">Salurkan Donasi Anda</h3>
          </div>
          <button @click="$emit('close')" class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors">
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 overflow-y-auto custom-scrollbar">
          <!-- Tabs -->
          <div class="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6">
            <button 
              @click="activeTab = 'bank'" 
              :class="['flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300', activeTab === 'bank' ? 'bg-white dark:bg-gray-700 text-primary shadow-md' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300']"
            >
              Transfer Bank
            </button>
            <button 
              @click="activeTab = 'qris'" 
              :class="['flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300', activeTab === 'qris' ? 'bg-white dark:bg-gray-700 text-primary shadow-md' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300']"
            >
              Scan QRIS
            </button>
          </div>

          <!-- Tab Content: Bank -->
          <div v-if="activeTab === 'bank'" class="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <!-- Bank 1 -->
            <div class="p-4 rounded-2xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50 hover:border-primary/30 transition-colors group">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                    <img :src="bsiLogo" alt="BSI Logo" class="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900 dark:text-white text-lg">Bank Syariah Indonesia (BSI)</h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400">a.n. DKM Masjid Jami Kassiti</p>
                  </div>
                </div>
                <div class="flex items-center gap-2 bg-white dark:bg-gray-900 px-4 py-2 rounded-xl shadow-inner border border-gray-300 dark:border-white/5">
                  <span class="font-mono font-bold text-base sm:text-lg text-primary tracking-wider">7453 555 555</span>
                  <button @click="copyText('7453555555')" class="p-2 text-gray-400 hover:text-primary transition-colors" title="Salin Nomor Rekening">
                    <Copy class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>



            <p class="text-center text-xs text-gray-500 mt-4">Mohon sertakan kode unik <b class="text-primary">001</b> di akhir nominal (Contoh: Rp 50.001) untuk donasi operasional masjid.</p>
          </div>

          <!-- Tab Content: QRIS -->
          <div v-else-if="activeTab === 'qris'" class="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div class="flex justify-center">
              <!-- QRIS 1 -->
              <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-3xl border border-gray-300 dark:border-white/10 text-center hover:border-primary/30 transition-colors w-full max-w-[280px]">
                <p class="font-bold text-gray-900 dark:text-white mb-3 text-sm">QRIS Zakat, Infaq & Sedekah</p>
                <div class="bg-white p-1 rounded-2xl shadow-lg inline-block cursor-pointer hover:scale-105 transition-transform duration-300 w-full" @click="expandedImage = qris1" title="Perbesar Gambar">
                  <img :src="qris1" alt="QRIS DKMJ" class="w-full h-auto object-contain rounded-xl" />
                </div>
                <div class="flex items-center justify-center gap-4 mt-4">
                  <button @click="expandedImage = qris1" class="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                    <Maximize2 class="w-3 h-3" /> Perbesar
                  </button>
                  <a :href="qris1" download="QRIS_Operasional_DKMJ.webp" class="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary-light transition-colors">
                    <Download class="w-3 h-3" /> Simpan
                  </a>
                </div>
              </div>
            </div>
            <div class="bg-primary/5 border border-primary/20 rounded-xl p-3 mt-6 flex items-start gap-3">
              <Info class="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p class="text-left text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                Buka aplikasi e-Wallet atau Mobile Banking Anda (GoPay, OVO, Dana, M-BCA, dll), pilih opsi <b>Scan QRIS</b>, lalu arahkan kamera atau upload gambar kode di atas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </Transition>

  <!-- Image Lightbox -->
  <Transition name="fade">
    <div v-if="expandedImage" class="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" @click="expandedImage = null">
      <button class="absolute top-6 right-6 p-2 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors z-[120]">
        <X class="w-6 h-6" />
      </button>
      <img :src="expandedImage" class="max-w-full max-h-full object-contain rounded-xl shadow-2xl" @click.stop />
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
import { X, Heart, Copy, Download, Info, Maximize2 } from 'lucide-vue-next'
import qris1 from '@/assets/images/QRIS DKMJ.webp'
import qris2 from '@/assets/images/QRIS DKMJ2.webp'
import bsiLogo from '@/assets/images/bsi-logo.webp'
import { useToastStore } from '@/stores/toast'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])

const activeTab = ref('bank')
const expandedImage = ref(null)

const copyText = (text) => {
  navigator.clipboard.writeText(text)
  const toastStore = useToastStore()
  toastStore.addToast('Nomor rekening berhasil disalin: ' + text)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
