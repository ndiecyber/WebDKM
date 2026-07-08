<template>
  <div class="space-y-6 sm:space-y-8 animate-fade-in">
    <!-- Header -->
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Cetak Laporan</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Buat dan ekspor laporan keuangan dalam format PDF.
      </p>
    </div>

    <!-- Main Workspace -->
    <div class="flex flex-col xl:flex-row gap-6 items-start">
      
      <!-- Left Panel: Live Preview -->
      <div class="w-full xl:flex-1 bg-gray-100 dark:bg-gray-950 rounded-2xl ring-1 ring-gray-300 dark:ring-white/10 overflow-hidden flex flex-col relative shadow-inner h-[800px]">
        <div class="px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-white/10 flex items-center justify-between z-10 shrink-0">
          <div class="flex items-center gap-2">
            <Monitor class="w-4 h-4 text-gray-500" />
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Live Preview</span>
          </div>
          <span class="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">Ukuran A4</span>
        </div>
        
        <!-- Preview Container -->
        <div class="flex-1 overflow-auto custom-scrollbar-y p-4 sm:p-8 bg-gray-100/50 dark:bg-[#0a0a0a]">
          <div id="report-paper" class="flex flex-col items-center gap-8 pb-8 min-w-max">
            
            <div v-if="isLoadingReport" class="h-full w-full max-w-[794px] min-h-[800px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center text-gray-500 space-y-4">
              <Loader2 class="w-12 h-12 animate-spin text-secondary" />
              <p class="font-medium text-sm">Menyusun Laporan...</p>
            </div>
            
            <ReportKegiatanTemplate v-else-if="processedReport" :report="processedReport" :showQR="showQR" :customQR="customQRUrl" />
            
            <div v-else class="h-full w-full max-w-[794px] min-h-[800px] bg-white/50 dark:bg-gray-900/50 border-2 border-dashed border-gray-300 dark:border-gray-800 rounded-2xl flex flex-col items-center justify-center text-gray-400 opacity-80 space-y-4">
              <FileText class="w-16 h-16" />
              <p class="font-medium text-sm">Pilih laporan kegiatan di panel kanan untuk melihat preview</p>
            </div>
            
          </div>
        </div>
      </div>

      <!-- Right Panel: Parameters -->
      <div class="w-full xl:w-80 shrink-0 flex flex-col gap-4 relative z-10">
        <div class="bg-white dark:bg-gray-900 rounded-2xl ring-1 ring-gray-300 dark:ring-white/10 p-6 shadow-md flex flex-col">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-3">Pengaturan Ekspor</h3>
          
          <div class="space-y-5 flex-1">
            <!-- Jenis Laporan -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Jenis Laporan</label>
              <select class="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all">
                <option value="kegiatan">Kegiatan Khusus / Program</option>
                <option value="mutasi" disabled>Mutasi Rekening (Segera)</option>
                <option value="kas" disabled>Buku Kas Umum (Segera)</option>
              </select>
            </div>

            <!-- Pilih Program -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nama Kegiatan / Program</label>
              <select v-model="selectedReportId" class="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all">
                <option value="">-- Pilih Kegiatan --</option>
                <optgroup label="Program Tersedia">
                  <option v-for="program in keuanganStore.programs" :key="program.id" :value="program.id">
                    {{ program.name }} ({{ program.status }})
                  </option>
                </optgroup>
              </select>
            </div>
            
            <div v-if="selectedReportId && dynamicReportTemplate" class="space-y-4 pt-4 border-t border-gray-200 dark:border-white/10 mt-4">
              <h4 class="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Kustomisasi Dokumen</h4>
              
              <!-- Override Tanggal -->
              <div>
                <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal Cetak</label>
                <input v-model="overrideDate" type="text" class="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-lg px-3 py-1.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all" placeholder="Contoh: 10 Januari 2026" />
              </div>
              
              <!-- Override Ketua -->
              <div>
                <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Ketua Panitia</label>
                <input v-model="overrideKetua" type="text" class="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-lg px-3 py-1.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all" />
              </div>

              <!-- Override Bendahara -->
              <div>
                <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Bendahara Panitia</label>
                <input v-model="overrideBendahara" type="text" class="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-lg px-3 py-1.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all" />
              </div>

              <!-- Custom Notes -->
              <div>
                <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Catatan Tambahan</label>
                <textarea v-model="customNote" rows="2" class="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-lg px-3 py-1.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all resize-none" placeholder="Isi catatan tambahan laporan..."></textarea>
              </div>

              <!-- QR Code Toggle -->
              <div class="flex items-center justify-between pt-1">
                <label class="text-xs font-medium text-gray-700 dark:text-gray-300 cursor-pointer" @click="showQR = !showQR">Stempel QR Code</label>
                <button 
                  @click="showQR = !showQR"
                  :class="showQR ? 'bg-secondary' : 'bg-gray-300 dark:bg-gray-700'"
                  class="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                >
                  <span 
                    :class="showQR ? 'translate-x-4' : 'translate-x-0'"
                    class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  />
                </button>
              </div>

              <!-- QR Code Upload -->
              <div v-if="showQR" class="pt-2 border-t border-gray-100 dark:border-white/5">
                <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Upload QR Kustom (Opsional)</label>
                <div v-if="!customQRUrl" class="flex items-center justify-center w-full">
                  <label class="flex flex-col items-center justify-center w-full h-14 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-950 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                    <div class="flex flex-col items-center justify-center pt-2 pb-2">
                      <p class="text-[10px] text-gray-500 dark:text-gray-400 font-medium">Klik untuk upload gambar</p>
                    </div>
                    <input type="file" class="hidden" accept="image/*" @change="handleQRUpload" />
                  </label>
                </div>
                <div v-else class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-lg">
                  <div class="flex items-center gap-2">
                    <img :src="customQRUrl" class="w-8 h-8 object-contain rounded bg-white" />
                    <span class="text-[10px] font-medium text-gray-600 dark:text-gray-400">QR Kustom Aktif</span>
                  </div>
                  <button @click="removeCustomQR" class="text-[10px] text-red-500 hover:text-red-600 font-bold px-2 py-1 bg-red-50 rounded">Hapus</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="pt-6 mt-6 border-t border-gray-200 dark:border-white/10">
            <button 
              @click="exportToPDF" 
              :disabled="!selectedReportId || isExporting || isLoadingReport"
              class="w-full justify-center bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-bold px-4 py-3 rounded-xl transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <Loader2 v-if="isExporting" class="w-5 h-5 animate-spin" />
              <Download v-else class="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              <span>{{ isExporting ? 'Memproses PDF...' : 'Ekspor ke PDF' }}</span>
            </button>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { Download, Monitor, FileText, Info, Loader2 } from 'lucide-vue-next'
import ReportKegiatanTemplate from '@/components/ui/ReportKegiatanTemplate.vue'
import { useKeuanganStore } from '@/stores/keuangan'
import { useDialogStore } from '@/stores/dialog'
import { useToastStore } from '@/stores/toast'
import { validateFileSize } from '@/utils/fileValidator'
import api from '@/utils/api'

const keuanganStore = useKeuanganStore()
const dialog = useDialogStore()
const toast = useToastStore()

// --- State ---
const selectedReportId = ref('')
const isExporting = ref(false)
const isLoadingReport = ref(false)

// --- Dynamic Report State ---
const dynamicReportTemplate = ref(null)

// --- Export Override State ---
const overrideKetua = ref('')
const overrideBendahara = ref('')
const customNote = ref('')
const overrideDate = ref('')
const showQR = ref(true)
const customQRUrl = ref(null)

onMounted(async () => {
  if (keuanganStore.programs.length === 0) {
    await keuanganStore.fetchPrograms({ per_page: 100 })
  }
})

// Build report by fetching transactions for the selected program
watch(selectedReportId, async (newVal) => {
  if (!newVal) {
    dynamicReportTemplate.value = null
    return
  }
  
  const program = keuanganStore.programs.find(p => p.id === newVal)
  if (!program) return
  
  isLoadingReport.value = true
  try {
    // Fetch all approved transactions for this program
    const res = await api.get('/keuangan/transactions', { 
      params: { 
        program_id: program.id, 
        per_page: 500, // large enough to cover typical program transactions
        status: 'approved' 
      } 
    })
    
    const txs = res.data.data.data // Access paginated data items
    
    const pemasukan = txs.filter(t => t.tipe === 'in').map((t, idx) => ({ no: idx+1, tanggal: t.tanggal, uraian: t.deskripsi, jumlah: t.nominal }))
    const pengeluaran = txs.filter(t => t.tipe === 'out').map((t, idx) => ({ no: idx+1, tanggal: t.tanggal, uraian: t.deskripsi, jumlah: t.nominal }))
    
    const totalPemasukan = pemasukan.reduce((sum, item) => sum + item.jumlah, 0)
    const totalPengeluaran = pengeluaran.reduce((sum, item) => sum + item.jumlah, 0)
    
    dynamicReportTemplate.value = {
      id: `prog-${program.id}`,
      title: `${program.name.toUpperCase()}`,
      year: program.startDate ? program.startDate.substring(0, 4) : new Date().getFullYear().toString(),
      subtitle: 'DKM MASJID',
      date: `Periode: ${program.startDate} s.d ${program.endDate || 'Sekarang'}`,
      pemasukan,
      pengeluaran,
      totalPemasukan,
      totalPengeluaran,
      sisaSaldo: totalPemasukan - totalPengeluaran,
      terbilang: '-', 
      keterangan: program.description || '',
      ketua: 'Ketua Panitia',
      bendahara: 'Bendahara Panitia',
      ttdKiriTitle: 'Ketua Panitia'
    }
    
    // Auto-fill overrides
    overrideKetua.value = dynamicReportTemplate.value.ketua
    overrideBendahara.value = dynamicReportTemplate.value.bendahara
    customNote.value = dynamicReportTemplate.value.keterangan
    overrideDate.value = dynamicReportTemplate.value.date
    showQR.value = true
    
  } catch (err) {
    toast.showToast('Gagal memuat data laporan', 'error')
    selectedReportId.value = ''
  } finally {
    isLoadingReport.value = false
  }
})

const processedReport = computed(() => {
  if (!dynamicReportTemplate.value) return null
  return {
    ...dynamicReportTemplate.value,
    ketua: overrideKetua.value || dynamicReportTemplate.value.ketua,
    bendahara: overrideBendahara.value || dynamicReportTemplate.value.bendahara,
    keterangan: customNote.value !== '' ? customNote.value : dynamicReportTemplate.value.keterangan,
    date: overrideDate.value || dynamicReportTemplate.value.date
  }
})

// --- QR Upload Logic ---
const handleQRUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    if (!validateFileSize(file)) {
      e.target.value = '' 
      return
    }
    if (customQRUrl.value) URL.revokeObjectURL(customQRUrl.value)
    customQRUrl.value = URL.createObjectURL(file)
  }
}

const removeCustomQR = () => {
  if (customQRUrl.value) URL.revokeObjectURL(customQRUrl.value)
  customQRUrl.value = null
}

// --- Export Logic ---
const exportToPDF = () => {
  if (!processedReport.value) return
  isExporting.value = true
  
  setTimeout(() => {
    try {
      const paper = document.getElementById('report-paper')
      
      const printContainer = document.createElement('div')
      printContainer.id = 'print-container'
      printContainer.innerHTML = paper.innerHTML
      
      Object.assign(printContainer.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '210mm',
        minHeight: '297mm',
        background: 'white',
        color: 'black',
        zIndex: '999999',
        padding: '15mm'
      })
      
      document.body.appendChild(printContainer)
      
      const style = document.createElement('style')
      style.id = 'print-style'
      style.innerHTML = `
        @media print {
          body > *:not(#print-container) { display: none !important; }
          @page { size: A4 portrait; margin: 0; }
          #print-container { 
            padding: 0 !important; 
            box-shadow: none !important; 
            border: none !important; 
            background: transparent !important;
            width: 100%;
          }
          .a4-page {
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `
      document.head.appendChild(style)
      
      window.print()
      
      document.body.removeChild(printContainer)
      document.head.removeChild(style)
      
    } catch (error) {
      console.error('Error printing:', error)
      dialog.open({
        title: 'Gagal Mencetak',
        message: 'Terjadi kesalahan saat mencetak laporan.',
        type: 'alert'
      })
    } finally {
      isExporting.value = false
    }
  }, 150)
}
</script>

<style scoped>
.custom-scrollbar-y::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar-y::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar-y::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.4);
  border-radius: 20px;
}
.dark .custom-scrollbar-y::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.15);
}
.custom-scrollbar-y::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.6);
}
.dark .custom-scrollbar-y::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.25);
}
</style>
