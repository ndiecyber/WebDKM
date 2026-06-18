<template>
  <div class="space-y-6">
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
      <div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Users class="w-6 h-6 text-emerald-500" />
          Manajemen Kelompok Sapi
        </h2>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Atur pembagian kelompok shohibul sapi dan pindahkan anggota jika diperlukan.</p>
      </div>
      <button @click="createNewGroup" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-sm transition-colors flex items-center gap-2">
        <Plus class="w-4 h-4" />
        Buat Kelompok Baru
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <div 
        v-for="(group, gIdx) in sapiGroups" 
        :key="group.name"
        class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-2xl p-5 shadow-sm flex flex-col space-y-4"
      >
        <div class="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-3">
          <div class="flex items-center gap-2">
            <span class="text-xl">🐄</span>
            <div>
              <h3 class="font-bold text-gray-900 dark:text-white">{{ group.name }}</h3>
              <p class="text-[10px] text-gray-500">Terkumpul: <strong class="text-emerald-600 dark:text-emerald-400">{{ formatRupiah(getGroupTotal(group)) }}</strong></p>
            </div>
          </div>
          <div class="flex flex-col items-end gap-1">
            <span class="px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider"
                  :class="group.members.length === 7 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'">
              {{ group.members.length }} / 7 Slot
            </span>
            <button v-if="group.members.length === 0" @click="deleteGroup(group.name)" class="text-[10px] text-red-500 hover:underline">Hapus Kosong</button>
          </div>
        </div>

        <div class="space-y-2">
          <div 
            v-for="(member, idx) in group.members" 
            :key="member.id"
            class="flex justify-between items-center bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors"
          >
            <div class="flex items-center gap-3">
              <span class="w-6 h-6 rounded-md bg-white dark:bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-500 shadow-sm border border-gray-100 dark:border-gray-700">{{ idx + 1 }}</span>
              <div>
                <p class="font-bold text-sm text-gray-800 dark:text-white">{{ member.name }}</p>
                <div class="flex items-center gap-2 mt-0.5">
                  <span class="text-[9px] font-bold text-gray-400">{{ member.code }}</span>
                  <span class="text-[9px] px-1.5 py-0.5 rounded uppercase font-bold"
                        :class="member.collected >= member.target ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400'">
                    {{ member.collected >= member.target ? 'Lunas' : 'Proses' }}
                  </span>
                </div>
              </div>
            </div>
            
            <button @click="openMoveModal(member, group.name)" class="p-2 bg-white dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shadow-sm" title="Pindah Kelompok">
              <ArrowRightLeft class="w-4 h-4" />
            </button>
          </div>

          <div 
            v-for="i in Math.max(0, 7 - group.members.length)" 
            :key="'empty-'+gIdx+'-'+i" 
            class="flex justify-between items-center bg-transparent border-2 border-dashed border-gray-200 dark:border-white/10 p-3 rounded-xl opacity-60"
          >
            <div class="flex items-center gap-3">
              <span class="w-6 h-6 rounded-md border border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-[10px] font-bold text-gray-400">{{ group.members.length + i }}</span>
              <span class="text-xs italic text-gray-500 font-medium">Slot Kosong</span>
            </div>
            <span class="text-[9px] font-bold uppercase bg-gray-100 dark:bg-gray-800 text-gray-400 px-2 py-1 rounded">Tersedia</span>
          </div>
        </div>
      </div>

    </div>

    <div v-if="moveModal.isOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div class="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10 p-6 animate-in zoom-in-95 duration-200">
        
        <div class="flex justify-between items-center mb-4 pb-3 border-b border-gray-100 dark:border-white/5">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ArrowRightLeft class="w-5 h-5 text-emerald-500" /> Pindah Kelompok
          </h3>
          <button @click="closeMoveModal" class="text-gray-400 hover:text-gray-500 transition-colors"><X class="w-5 h-5" /></button>
        </div>

        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Pilih kelompok baru untuk <strong class="text-gray-900 dark:text-white">{{ moveModal.member?.name }}</strong>.<br/>
          <span class="text-xs">Saat ini berada di: <strong class="text-emerald-600">{{ moveModal.currentGroup }}</strong></span>
        </p>

        <div class="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          <button 
            v-for="group in availableGroups" 
            :key="group.name"
            @click="confirmMove(group.name)"
            class="w-full p-4 rounded-xl border border-gray-200 dark:border-white/10 hover:border-emerald-500 dark:hover:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors flex justify-between items-center text-left"
          >
            <div>
              <p class="text-sm font-bold text-gray-800 dark:text-white">{{ group.name }}</p>
              <p class="text-[10px] text-gray-500 mt-1">Sisa <strong class="text-amber-600">{{ 7 - group.count }}</strong> slot kosong</p>
            </div>
            <ArrowRight class="w-4 h-4 text-emerald-500" />
          </button>
          
          <div v-if="availableGroups.length === 0" class="text-center p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-dashed border-gray-200">
            <p class="text-xs text-gray-500">Tidak ada kelompok sapi lain yang memiliki slot kosong.</p>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Users, Plus, ArrowRightLeft, ArrowRight, X } from 'lucide-vue-next'

const formatRupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)

// MOCK DATA SHOHIBUL SAPI (Data Admin Fase 9)
const mockShohibuls = ref([
  { id: 1, name: 'Bapak Ahmad', code: 'QUR-001', type: 'sapi', animalGroup: 'Sapi 1', target: 4000000, collected: 4000000 },
  { id: 2, name: 'Ibu Fatimah', code: 'QUR-002', type: 'sapi', animalGroup: 'Sapi 1', target: 4000000, collected: 2000000 },
  { id: 4, name: 'Haji Suryana', code: 'QUR-004', type: 'sapi', animalGroup: 'Sapi 1', target: 4000000, collected: 4000000 },
  { id: 6, name: 'Keluarga Budi', code: 'QUR-006', type: 'sapi', animalGroup: 'Sapi 2', target: 4000000, collected: 1000000 },
  { id: 7, name: 'Deni Setiawan', code: 'QUR-007', type: 'sapi', animalGroup: 'Sapi 2', target: 4000000, collected: 0 },
])

// COMPUTED GROUPS
const sapiGroups = computed(() => {
  const groups = {}
  mockShohibuls.value.forEach(member => {
    if (member.type === 'sapi' && member.animalGroup !== 'Belum Ditentukan') {
      if (!groups[member.animalGroup]) groups[member.animalGroup] = { name: member.animalGroup, members: [] }
      groups[member.animalGroup].members.push(member)
    }
  })
  return Object.values(groups).sort((a, b) => a.name.localeCompare(b.name))
})

const getGroupTotal = (group) => group.members.reduce((sum, member) => sum + member.collected, 0)

// MOVE MODAL LOGIC
const moveModal = ref({ isOpen: false, member: null, currentGroup: '' })

const availableGroups = computed(() => {
  return sapiGroups.value
    .filter(g => g.name !== moveModal.value.currentGroup && g.members.length < 7)
    .map(g => ({ name: g.name, count: g.members.length }))
})

const openMoveModal = (member, currentGroup) => {
  moveModal.value = { isOpen: true, member, currentGroup }
  document.body.style.overflow = 'hidden'
}

const closeMoveModal = () => {
  moveModal.value.isOpen = false
  document.body.style.overflow = ''
}

const confirmMove = (targetGroupName) => {
  const memberIndex = mockShohibuls.value.findIndex(m => m.id === moveModal.value.member.id)
  if (memberIndex !== -1) {
    mockShohibuls.value[memberIndex].animalGroup = targetGroupName
    alert(`Berhasil memindahkan ${moveModal.value.member.name} ke ${targetGroupName}`)
  }
  closeMoveModal()
}

// ADMIN ACTIONS
const createNewGroup = () => {
  const nextNumber = sapiGroups.value.length + 1
  alert(`Sistem akan otomatis membuat kelompok "Sapi ${nextNumber}" saat Anda memindahkan peserta atau menambah shohibul sapi baru yang grupnya penuh.`)
}

const deleteGroup = (groupName) => {
  if (confirm(`Hapus kelompok kosong ${groupName}?`)) alert(`${groupName} berhasil dihapus.`)
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(156, 163, 175, 0.3); border-radius: 4px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); }
</style>