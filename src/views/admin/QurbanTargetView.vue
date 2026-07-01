<template>
  <div class="space-y-6 sm:space-y-8 pb-10 animate-fade-in">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
          Manajemen Target Hewan
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Atur pembagian kelompok shohibul sapi dan pantau daftar jamaah mandiri kambing.</p>
      </div>
      <button @click="openCreateGroupModal" class="bg-secondary hover:bg-yellow-500 text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-secondary/20 text-sm flex items-center gap-2 shrink-0">
        <Plus class="w-4 h-4" />
        <span>Buat Kelompok Sapi</span>
      </button>
    </div>

    <!-- Skeletons -->
    <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
      <div v-for="i in 2" :key="i" class="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-white/10 h-64 animate-pulse">
        <div class="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-4"></div>
        <div class="space-y-3">
          <div class="h-12 bg-gray-100 dark:bg-gray-800/50 rounded w-full"></div>
          <div class="h-12 bg-gray-100 dark:bg-gray-800/50 rounded w-full"></div>
        </div>
      </div>
    </div>

    <template v-else>
      <!-- Kelompok Sapi Section -->
      <div class="space-y-4">
        <div class="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-800">
          <span class="text-2xl">🐄</span>
          <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200">Kelompok Sapi (Kolektif)</h3>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div v-if="sapiGroups.length === 0" class="col-span-full p-8 text-center bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Belum ada kelompok sapi yang dibuat.</p>
          </div>

          <div 
            v-for="group in sapiGroups" 
            :key="group.id"
            class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl p-5 shadow-md flex flex-col space-y-4 relative overflow-hidden h-full"
          >
            <div class="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-3">
              <div class="flex items-center gap-2">
                <div>
                  <h3 class="font-bold text-gray-900 dark:text-white">{{ group.name }}</h3>
                  <p class="text-[10px] text-gray-500 dark:text-gray-400">Terkumpul: <strong class="text-emerald-600 dark:text-emerald-400">{{ formatRupiah(getGroupTotal(group)) }}</strong></p>
                </div>
              </div>
              <div class="flex flex-col items-end gap-1">
                <span class="px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider"
                      :class="group.shohibuls.length >= 7 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'">
                  {{ group.shohibuls.length }} / 7 Slot
                </span>
                <button v-if="group.shohibuls.length === 0" @click="deleteGroup(group)" class="text-[10px] text-red-500 hover:underline">Hapus Kosong</button>
              </div>
            </div>

            <div class="space-y-2 flex-1">
              <div 
                v-for="(member, idx) in group.shohibuls" 
                :key="member.id"
                class="flex justify-between items-center bg-gray-50 dark:bg-white/[0.02] p-3 rounded-xl border border-gray-100 dark:border-white/5 hover:border-secondary/50 transition-colors group/item"
              >
                <div class="flex items-center gap-3">
                  <span class="w-6 h-6 rounded-md bg-white dark:bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-500 shadow-sm border border-gray-100 dark:border-gray-700">{{ idx + 1 }}</span>
                  <div>
                    <p class="font-bold text-sm text-gray-800 dark:text-white">{{ member.name }}</p>
                    <div class="flex items-center gap-2 mt-0.5">
                      <span class="text-[9px] font-bold text-gray-400 uppercase tracking-wide">ID: {{ member.id }}</span>
                      <span class="text-[9px] px-1.5 py-0.5 rounded uppercase font-bold"
                            :class="member.collected_amount >= member.target_amount ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-amber-100 text-amber-600 border border-amber-200 dark:border-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400'">
                        {{ member.collected_amount >= member.target_amount ? 'Lunas' : 'Proses' }}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button @click="openMoveModal(member, group)" class="p-2 bg-white dark:bg-gray-800 hover:bg-yellow-50 dark:hover:bg-yellow-500/10 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-400 hover:text-secondary transition-colors shadow-sm opacity-0 group-hover/item:opacity-100" title="Pindah Kelompok">
                  <ArrowRightLeft class="w-4 h-4" />
                </button>
              </div>

              <div 
                v-for="i in Math.max(0, 7 - group.shohibuls.length)" 
                :key="'empty-'+group.id+'-'+i" 
                class="flex justify-between items-center bg-transparent border-2 border-dashed border-gray-200 dark:border-white/10 p-3 rounded-xl opacity-60"
              >
                <div class="flex items-center gap-3">
                  <span class="w-6 h-6 rounded-md border border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-[10px] font-bold text-gray-400">{{ group.shohibuls.length + i }}</span>
                  <span class="text-xs italic text-gray-500 dark:text-gray-400 font-medium">Slot Kosong</span>
                </div>
                <span class="text-[9px] font-bold uppercase bg-gray-100 dark:bg-gray-800 text-gray-400 px-2 py-1 rounded">Tersedia</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Kambing Section -->
      <div class="space-y-4 pt-6 mt-6 border-t border-gray-200 dark:border-white/10">
        <div class="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-800">
          <span class="text-2xl">🐐</span>
          <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200">Daftar Kambing (Mandiri)</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="(kambing, idx) in kambingList" 
            :key="kambing.id"
            class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl p-4 shadow-sm flex items-center justify-between hover:ring-secondary/50 dark:hover:ring-secondary/50 transition-all duration-300 group hover:-translate-y-1"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center text-sm font-bold border border-orange-100 dark:border-orange-800/30">
                K-{{ idx + 1 }}
              </div>
              <div>
                <p class="font-bold text-sm text-gray-800 dark:text-white">{{ kambing.name }}</p>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-[10px] font-bold text-gray-400 uppercase">ID: {{ kambing.id }}</span>
                </div>
              </div>
            </div>
            
            <div class="text-right">
              <span class="text-[10px] px-2 py-1 rounded uppercase font-bold"
                    :class="kambing.collected_amount >= kambing.target_amount ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-amber-50 text-amber-600 border border-amber-200 dark:border-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400'">
                {{ kambing.collected_amount >= kambing.target_amount ? 'Lunas' : 'Proses' }}
              </span>
            </div>
          </div>

          <div v-if="kambingList.length === 0" class="col-span-full p-8 text-center bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700">
            <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Belum ada jamaah yang mendaftar qurban kambing.</p>
          </div>
        </div>
      </div>
    </template>
  </div>

  <Teleport to="body">
    
    <!-- Move Modal -->
    <div v-if="moveModal.isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="closeMoveModal"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-xl overflow-hidden ring-1 ring-gray-200 dark:ring-white/10 p-6 animate-fade-in-up relative z-10">
        <div class="flex justify-between items-center mb-4 pb-3 border-b border-gray-100 dark:border-white/5">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ArrowRightLeft class="w-5 h-5 text-secondary" /> Pindah Kelompok Sapi
          </h3>
          <button @click="closeMoveModal" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"><X class="w-5 h-5" /></button>
        </div>

        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Pilih kelompok baru untuk <strong class="text-gray-900 dark:text-white">{{ moveModal.member?.name }}</strong>.<br/>
          <span class="text-xs">Saat ini berada di: <strong class="text-secondary">{{ moveModal.currentGroup?.name }}</strong></span>
        </p>

        <div class="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          <button 
            v-for="group in availableGroups" 
            :key="group.id"
            @click="confirmMove(group)"
            class="w-full p-4 rounded-xl border border-gray-200 dark:border-white/10 hover:border-secondary hover:bg-yellow-50 dark:hover:bg-yellow-500/10 transition-all flex justify-between items-center text-left group/btn shadow-sm"
          >
            <div>
              <p class="text-sm font-bold text-gray-800 dark:text-white">{{ group.name }}</p>
              <p class="text-[10px] text-gray-500 dark:text-gray-400 mt-1">Sisa <strong class="text-amber-600 dark:text-amber-400">{{ 7 - group.shohibuls.length }}</strong> slot kosong</p>
            </div>
            <ArrowRight class="w-4 h-4 text-secondary transform group-hover/btn:translate-x-1 transition-transform" />
          </button>
          
          <div v-if="availableGroups.length === 0" class="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
            <p class="text-xs text-gray-500 dark:text-gray-400">Tidak ada kelompok sapi lain yang memiliki slot kosong.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Group Modal -->
    <div v-if="createModal.isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="createModal.isOpen = false"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden ring-1 ring-gray-200 dark:ring-white/10 animate-fade-in-up relative z-10">
        
        <div class="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
          <div>
            <h3 class="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Users class="w-5 h-5 text-secondary" /> Simulasi Grup Sapi
            </h3>
          </div>
          <button @click="createModal.isOpen = false" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"><X class="w-5 h-5" /></button>
        </div>
        
        <div class="p-6 bg-white dark:bg-gray-900 h-[400px] overflow-y-auto custom-scrollbar">
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            
            <div v-for="group in sapiGroups" :key="group.id" class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm transition-colors group">
              <div class="flex justify-between items-start mb-2">
                <span class="text-2xl group-hover:scale-110 transition-transform origin-left">🐄</span>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded"
                      :class="group.shohibuls.length >= 7 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'">
                  {{ group.shohibuls.length }}/7 Penuh
                </span>
              </div>
              <h4 class="font-bold text-sm text-gray-800 dark:text-white">{{ group.name }}</h4>
            </div>
            
            <button @click="submitCreateGroup" class="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-secondary hover:bg-yellow-50 dark:hover:bg-yellow-500/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-gray-400 hover:text-secondary dark:hover:text-secondary transition-all min-h-[100px]">
              <Plus class="w-8 h-8" />
              <span class="text-xs font-bold">Buat Sapi Baru</span>
            </button>
            
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Users, Plus, ArrowRightLeft, ArrowRight, X } from 'lucide-vue-next'

const formatRupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)

const isLoading = ref(true)

// MOCK DATA RESPONSE API
const mockGroups = ref([])

onMounted(() => {
  setTimeout(() => {
    mockGroups.value = [
      {
        id: 1, name: 'Sapi 1', target_type: 'sapi', shohibuls_count: 3,
        shohibuls: [
          { id: 1, name: 'Bapak Ahmad', phone: '081234567890', collected_amount: 4000000, target_amount: 4000000 },
          { id: 2, name: 'Ibu Fatimah', phone: '089876543210', collected_amount: 2000000, target_amount: 4000000 },
          { id: 4, name: 'Haji Suryana', phone: '08551234', collected_amount: 4000000, target_amount: 4000000 }
        ]
      },
      {
        id: 2, name: 'Sapi 2', target_type: 'sapi', shohibuls_count: 2,
        shohibuls: [
          { id: 6, name: 'Keluarga Budi', phone: '08111222', collected_amount: 1000000, target_amount: 4000000 },
          { id: 7, name: 'Deni Setiawan', phone: '08771122', collected_amount: 0, target_amount: 4000000 }
        ]
      },
      {
        id: 3, name: 'Mandiri Kambing', target_type: 'kambing', shohibuls_count: 3,
        shohibuls: [
          { id: 8, name: 'Bapak Ilham', phone: '0811', collected_amount: 3500000, target_amount: 3500000 },
          { id: 9, name: 'Ibu Siti', phone: '0822', collected_amount: 1500000, target_amount: 3500000 },
          { id: 10, name: 'Kang Ujang', phone: '0833', collected_amount: 3500000, target_amount: 3500000 }
        ]
      }
    ]
    isLoading.value = false
  }, 1000)
})

const sapiGroups = computed(() => mockGroups.value.filter(g => g.target_type === 'sapi'))

const kambingList = computed(() => {
  let kambings = []
  mockGroups.value.forEach(g => {
    if (g.target_type === 'kambing') kambings = kambings.concat(g.shohibuls)
  })
  return kambings
})

const getGroupTotal = (group) => group.shohibuls.reduce((sum, member) => sum + member.collected_amount, 0)

// MODAL PINDAH KELOMPOK
const moveModal = ref({ isOpen: false, member: null, currentGroup: null })

const availableGroups = computed(() => {
  if (!moveModal.value.currentGroup) return []
  return sapiGroups.value.filter(g => g.id !== moveModal.value.currentGroup.id && g.shohibuls.length < 7)
})

const openMoveModal = (member, currentGroup) => {
  moveModal.value = { isOpen: true, member, currentGroup }
  document.body.style.overflow = 'hidden'
}

const closeMoveModal = () => {
  moveModal.value.isOpen = false
  document.body.style.overflow = ''
}

const confirmMove = (targetGroup) => {
  const oldGroup = mockGroups.value.find(g => g.id === moveModal.value.currentGroup.id)
  const newGroup = mockGroups.value.find(g => g.id === targetGroup.id)
  
  if (oldGroup && newGroup) {
    oldGroup.shohibuls = oldGroup.shohibuls.filter(m => m.id !== moveModal.value.member.id)
    newGroup.shohibuls.push(moveModal.value.member)
  }
  closeMoveModal()
}

// MODAL SIMULASI & BUAT KELOMPOK
const createModal = ref({ isOpen: false })

const openCreateGroupModal = () => {
  createModal.value.isOpen = true
}

const submitCreateGroup = () => {
  const groupName = prompt("Masukkan nama kelompok sapi baru:")
  
  if (groupName && groupName.trim() !== '') {
    // Eksekusi API
    alert(`Memanggil API Store AnimalGroup... \nNama: ${groupName}`)
    
    mockGroups.value.push({
      id: Math.floor(Math.random() * 1000),
      name: groupName,
      target_type: 'sapi',
      shohibuls_count: 0,
      shohibuls: []
    })
  }
}

const deleteGroup = (group) => {
  if (confirm(`Apakah Anda yakin ingin menghapus kelompok ${group.name} secara permanen?`)) {
    mockGroups.value = mockGroups.value.filter(g => g.id !== group.id)
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(156, 163, 175, 0.4); border-radius: 10px; }

@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes fade-in-down {
  0% { opacity: 0; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-down {
  animation: fade-in-down 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>