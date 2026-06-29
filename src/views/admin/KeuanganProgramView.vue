<template>
  <div class="space-y-6 sm:space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Program & Kegiatan</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Kelola kegiatan masjid dan alokasi dana khusus (Fund Accounting).
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button @click="openModal()" class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2 rounded-lg transition-colors shadow-md text-sm flex items-center gap-2">
          <Plus class="w-4 h-4" />
          <span>Buat Program</span>
        </button>
      </div>
    </div>

    <!-- Grid Program -->
    <div v-if="keuanganStore.programs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="program in keuanganStore.programs" :key="program.id" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl overflow-hidden shadow-sm flex flex-col relative group">
        <!-- Badge Status -->
        <div class="absolute top-4 right-4">
          <span v-if="program.status === 'Aktif'" class="px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 ring-1 ring-emerald-500/20 shadow-sm">
            Aktif
          </span>
          <span v-else class="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 ring-1 ring-gray-300 dark:ring-white/10 shadow-sm">
            Selesai
          </span>
        </div>

        <div class="p-5 flex-1">
          <div class="flex items-start gap-3 mb-3">
            <div class="bg-emerald-50 dark:bg-emerald-500/10 p-2.5 rounded-xl shrink-0 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20">
              <CalendarDays class="w-5 h-5" />
            </div>
            <div>
              <h3 class="font-bold text-gray-900 dark:text-white leading-tight pr-12">{{ program.name }}</h3>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1.5">
                <Clock class="w-3.5 h-3.5" /> {{ formatDate(program.startDate) }} - {{ formatDate(program.endDate) }}
              </p>
            </div>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">{{ program.description }}</p>

          <!-- Financial Dashboard Mini -->
          <div class="bg-gray-50 dark:bg-gray-950/50 rounded-lg p-3 space-y-2 ring-1 ring-black/5 dark:ring-white/5">
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-500 dark:text-gray-400">Pemasukan</span>
              <span class="font-medium text-emerald-600 dark:text-emerald-400">Rp {{ formatCurrency(getProgramBalance(program.id).in) }}</span>
            </div>
            <div class="flex justify-between items-center text-xs">
              <span class="text-gray-500 dark:text-gray-400">Pengeluaran</span>
              <span class="font-medium text-rose-600 dark:text-rose-400">Rp {{ formatCurrency(getProgramBalance(program.id).out) }}</span>
            </div>
            <div class="pt-2 border-t border-gray-200 dark:border-white/10 flex justify-between items-center">
              <span class="text-xs font-semibold text-gray-700 dark:text-gray-300">Sisa Saldo</span>
              <span class="text-sm font-bold text-gray-900 dark:text-white">Rp {{ formatCurrency(getProgramBalance(program.id).total) }}</span>
            </div>
          </div>
        </div>
        
        <div class="p-4 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-gray-800/30 flex items-center justify-between gap-2">
          <div class="flex gap-2">
            <button @click="openModal(program)" class="p-2 text-gray-400 hover:text-secondary dark:hover:text-yellow-500 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-all" title="Edit">
              <Pencil class="w-4 h-4" />
            </button>
            <button @click="deleteProgram(program.id)" class="p-2 text-gray-400 hover:text-rose-500 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-all" title="Hapus">
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
          <button 
            v-if="program.status === 'Selesai' && getProgramBalance(program.id).total > 0"
            @click="openRolloverModal(program)"
            class="px-3 py-1.5 text-xs font-medium bg-white dark:bg-gray-800 text-secondary border border-secondary/30 rounded-md hover:bg-secondary hover:text-white transition-colors"
          >
            Salurkan Sisa Dana
          </button>
        </div>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-else class="text-center py-16 bg-white dark:bg-gray-900 rounded-xl ring-1 ring-gray-200 dark:ring-white/10">
      <div class="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
        <FolderOpen class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Belum Ada Program</h3>
      <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto mt-2 mb-6 text-sm">
        Buat program untuk memisahkan pencatatan dana secara logis, misalnya untuk kegiatan santunan, Qurban, atau pembangunan masjid.
      </p>
      <button @click="openModal()" class="bg-secondary hover:bg-yellow-500 text-white font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm text-sm inline-flex items-center gap-2">
        <Plus class="w-4 h-4" />
        <span>Buat Program Pertama</span>
      </button>
    </div>

    <!-- Modal Form Program -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
        <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="showModal = false"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all relative z-10 animate-fade-in-up">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ isEditing ? 'Edit Program' : 'Buat Program Baru' }}</h3>
          <button @click="showModal = false" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Program/Kegiatan</label>
            <input type="text" v-model="form.name" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" placeholder="Contoh: Panitia Qurban 1446H">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi Singkat</label>
            <textarea v-model="form.description" rows="2" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" placeholder="Keterangan program..."></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mulai</label>
              <input type="date" v-model="form.startDate" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all [color-scheme:light] dark:[color-scheme:dark]">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Selesai (Opsional)</label>
              <input type="date" v-model="form.endDate" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all [color-scheme:light] dark:[color-scheme:dark]">
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
            <div class="flex gap-4">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" v-model="form.status" value="Aktif" class="text-secondary focus:ring-secondary w-4 h-4 bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700">
                <span class="text-sm text-gray-700 dark:text-gray-300">Aktif</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" v-model="form.status" value="Selesai" class="text-secondary focus:ring-secondary w-4 h-4 bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700">
                <span class="text-sm text-gray-700 dark:text-gray-300">Selesai</span>
              </label>
            </div>
            <p v-if="form.status === 'Selesai'" class="text-xs text-amber-600 dark:text-amber-500 mt-2">
              <AlertCircle class="w-3.5 h-3.5 inline mr-1" /> Program yang selesai akan memunculkan opsi penyaluran sisa dana.
            </p>
          </div>
        </div>
        
        <div class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
          <button @click="showModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Batal</button>
          <button @click="saveProgram" class="px-4 py-2 text-sm font-medium text-white bg-secondary hover:bg-yellow-500 rounded-lg shadow-sm transition-colors">Simpan</button>
        </div>
      </div>
      </div>
    </Teleport>

    <!-- Modal Rollover -->
    <Teleport to="body">
      <div v-if="showRolloverModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
        <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="showRolloverModal = false"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all relative z-10 animate-fade-in-up">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">Salurkan Sisa Dana</h3>
          <button @click="showRolloverModal = false" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 space-y-4">
          <div class="bg-blue-50 dark:bg-blue-500/10 p-4 rounded-xl border border-blue-100 dark:border-blue-500/20 text-center">
            <p class="text-sm text-blue-700 dark:text-blue-400">Total Sisa Dana Program</p>
            <p class="text-2xl font-bold text-blue-800 dark:text-blue-300 mt-1">Rp {{ formatCurrency(getProgramBalance(selectedProgram.id).total) }}</p>
            <p class="text-xs text-blue-600 dark:text-blue-500 mt-1">Program: {{ selectedProgram.name }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tujuan Penyaluran</label>
            <select v-model="rolloverForm.targetProgramId" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
              <option value="">Kas Umum (Default)</option>
              <optgroup label="Program Aktif">
                <option v-for="p in activePrograms" :key="p.id" :value="p.id" :disabled="p.id === selectedProgram.id">
                  {{ p.name }}
                </option>
              </optgroup>
            </select>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Pilih kemana sisa uang ini akan dialokasikan secara logis.</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sumber Rekening Fisik</label>
            <select v-model="rolloverForm.accountName" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
              <option v-for="a in keuanganStore.accounts" :key="a.id" :value="a.name">{{ a.name }}</option>
            </select>
          </div>
        </div>
        
        <div class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
          <button @click="showRolloverModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Batal</button>
          <button @click="executeRollover" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors">Proses Penyaluran</button>
        </div>
      </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Plus, X, Pencil, Trash2, CalendarDays, Clock, FolderOpen, AlertCircle } from 'lucide-vue-next'
import { useKeuanganStore } from '@/stores/keuangan'
import { useToastStore } from '@/stores/toast'

const keuanganStore = useKeuanganStore()
const toast = useToastStore()

const showModal = ref(false)
const isEditing = ref(false)
const form = ref({ id: null, name: '', description: '', startDate: '', endDate: '', status: 'Aktif' })

const showRolloverModal = ref(false)
const selectedProgram = ref(null)
const rolloverForm = ref({ targetProgramId: '', accountName: 'BSI Masjid Jami Kassiti' })

const activePrograms = computed(() => keuanganStore.programs.filter(p => p.status === 'Aktif'))

const formatCurrency = (val) => {
  return val ? val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "0"
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(date)
}

const getProgramBalance = (id) => {
  return keuanganStore.programBalances[id] || { in: 0, out: 0, total: 0 }
}

const openModal = (program = null) => {
  if (program) {
    isEditing.value = true
    form.value = { ...program }
  } else {
    isEditing.value = false
    form.value = { id: null, name: '', description: '', startDate: new Date().toISOString().split('T')[0], endDate: '', status: 'Aktif' }
  }
  showModal.value = true
}

const saveProgram = () => {
  if (!form.value.name || !form.value.startDate) {
    toast.showToast('Harap lengkapi nama dan tanggal mulai', 'error')
    return
  }
  if (isEditing.value) {
    keuanganStore.updateProgram(form.value.id, form.value)
    toast.showToast('Program berhasil diperbarui', 'success')
  } else {
    keuanganStore.addProgram(form.value)
    toast.showToast('Program baru berhasil dibuat', 'success')
  }
  showModal.value = false
}

const deleteProgram = (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus program ini? Transaksi terkait mungkin akan kehilangan relasi logisnya.')) {
    keuanganStore.deleteProgram(id)
    toast.showToast('Program berhasil dihapus', 'success')
  }
}

const openRolloverModal = (program) => {
  selectedProgram.value = program
  rolloverForm.value = { targetProgramId: '', accountName: keuanganStore.accounts[0].name }
  showRolloverModal.value = true
}

const executeRollover = () => {
  const balance = getProgramBalance(selectedProgram.value.id).total
  keuanganStore.rolloverProgram(
    selectedProgram.value.id, 
    rolloverForm.value.targetProgramId ? parseInt(rolloverForm.value.targetProgramId) : null,
    balance,
    rolloverForm.value.accountName
  )
  showRolloverModal.value = false
  toast.showToast('Dana berhasil disalurkan', 'success')
}
</script>

<style scoped>
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
</style>
