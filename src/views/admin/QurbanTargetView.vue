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
      <!-- Tabs Navigation -->
      <div class="flex flex-wrap items-center gap-2 sm:gap-6 border-b border-gray-200 dark:border-gray-800 mb-6">
        <button 
          @click="activeTab = 'sapi'"
          class="pb-3 text-sm sm:text-base font-bold transition-colors relative flex items-center gap-2 px-2"
          :class="activeTab === 'sapi' ? 'text-secondary' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'"
        >
          <span class="text-lg sm:text-xl">🐄</span> Sapi
          <div v-if="activeTab === 'sapi'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-t-full"></div>
        </button>
        <button 
          @click="activeTab = 'kambing'"
          class="pb-3 text-sm sm:text-base font-bold transition-colors relative flex items-center gap-2 px-2"
          :class="activeTab === 'kambing' ? 'text-secondary' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'"
        >
          <span class="text-lg sm:text-xl">🐐</span> Kambing
          <div v-if="activeTab === 'kambing'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-t-full"></div>
        </button>
      </div>

      <!-- Kelompok Sapi Section -->
      <div v-if="activeTab === 'sapi'" class="space-y-6 animate-fade-in-up">
        
        <!-- Sapi Action Bar -->
        <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-4 shadow-sm relative z-20">
          <div class="relative flex-1">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search class="w-4 h-4 text-gray-400" />
            </div>
            <input 
              v-model="searchSapiQuery"
              type="text" 
              class="block w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary sm:text-sm transition-colors shadow-sm" 
              placeholder="Cari nama kelompok atau shohibul..." 
            />
          </div>

          <div class="shrink-0 w-full md:w-auto">
            <button @click="openCreateGroupModal" class="w-full md:w-auto bg-secondary hover:bg-yellow-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-md shadow-secondary/20 transition-all text-sm flex items-center justify-center gap-2">
              <Plus class="w-4 h-4" />
              <span>Tambah Sapi</span>
            </button>
          </div>
        </div>
        
        <div class="pt-2">
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-start">
            <div v-if="filteredSapiGroups.length === 0" class="col-span-full p-8 text-center bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
              <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Data kelompok sapi tidak ditemukan.</p>
            </div>

            <div 
              v-for="group in filteredSapiGroups" 
              :key="group.id"
              class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div class="flex justify-between items-start border-b border-gray-100 dark:border-white/5 pb-3 mb-3">
                <div>
                  <h3 class="font-bold text-gray-900 dark:text-white text-lg">{{ group.name }}</h3>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Terkumpul: <strong :class="getGroupTotal(group) >= getGroupTargetTotal(group) ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-500'">{{ formatRupiah(getGroupTotal(group)) }}</strong> <span class="font-normal opacity-70">/ {{ formatRupiah(getGroupTargetTotal(group)) }}</span></p>
                </div>
                <div class="flex flex-col items-end gap-1.5">
                  <span class="px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider"
                        :class="getGroupTotal(group) >= getGroupTargetTotal(group) ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'">
                    {{ getGroupTotal(group) >= getGroupTargetTotal(group) ? 'Lunas' : 'Proses' }}
                  </span>
                  <button v-if="group.shohibuls.length === 0" @click="deleteGroup(group)" class="text-xs text-red-500 hover:underline">Hapus</button>
                </div>
              </div>

              <div class="space-y-1.5">
                <button 
                  v-for="(member, idx) in group.shohibuls" 
                  :key="member.id"
                  @click="openMoveModal(member, group)"
                  class="w-full text-left flex justify-between items-center bg-gray-50/50 dark:bg-white/[0.02] py-2.5 px-3 rounded-lg border border-gray-100 dark:border-white/5 hover:border-secondary/50 hover:bg-yellow-50/30 dark:hover:bg-yellow-500/5 transition-colors group/item cursor-pointer"
                >
                  <div class="flex items-center gap-3 min-w-0 pr-2">
                    <span class="text-xs font-bold text-gray-400 w-4 text-right">{{ idx + 1 }}.</span>
                    <div class="truncate">
                      <p class="font-bold text-sm text-gray-800 dark:text-white truncate" :title="member.name">{{ member.name }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate" :title="member.address">{{ member.address }}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-2.5 shrink-0">
                    <span class="text-[10px] px-2 py-1 rounded uppercase font-bold"
                          :class="member.collected_amount >= member.target_amount ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-amber-100 text-amber-600 border border-amber-200 dark:border-amber-500/20 dark:bg-amber-500/20'">
                      {{ member.collected_amount >= member.target_amount ? 'Lunas' : 'Proses' }}
                    </span>
                    <div class="p-2 text-gray-400 group-hover/item:text-secondary group-hover/item:bg-white dark:group-hover/item:bg-gray-800 rounded-md transition-colors" title="Pindah Kelompok">
                      <ArrowRightLeft class="w-4 h-4" />
                    </div>
                  </div>
                </button>

                <div 
                  v-for="i in Math.max(0, 7 - group.shohibuls.length)" 
                  :key="'empty-'+group.id+'-'+i" 
                  class="flex items-center gap-3 py-2.5 px-3 rounded-lg border border-dashed border-gray-200 dark:border-white/10 opacity-60"
                >
                  <span class="text-xs font-bold text-gray-300 dark:text-gray-600 w-4 text-right">{{ group.shohibuls.length + i }}.</span>
                  <span class="text-xs italic text-gray-400 font-medium">Slot Tersedia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Kambing Section -->
      <div v-if="activeTab === 'kambing'" class="space-y-4 animate-fade-in-up">
        <div v-if="kambingList.length === 0" class="p-8 text-center bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700">
          <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Belum ada jamaah yang mendaftar qurban kambing.</p>
        </div>
        
        <div v-else class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl overflow-hidden shadow-sm">
          <div class="overflow-x-auto custom-scrollbar">
            <table class="w-full text-left text-sm whitespace-nowrap">
              <thead class="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                <tr>
                  <th class="px-6 py-4 font-medium w-20 text-center">No</th>
                  <th class="px-6 py-4 font-medium">Nama Jamaah</th>
                  <th class="px-6 py-4 font-medium">ID Pendaftaran</th>
                  <th class="px-6 py-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-white/5">
                <tr 
                  v-for="(kambing, idx) in kambingList" 
                  :key="kambing.id" 
                  class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                >
                  <td class="px-6 py-4 text-gray-500 dark:text-gray-400 text-center font-medium">K-{{ idx + 1 }}</td>
                  <td class="px-6 py-4 font-bold text-gray-800 dark:text-white flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xs font-bold border border-orange-100 dark:border-orange-800/30">
                      🐐
                    </div>
                    {{ kambing.name }}
                  </td>
                  <td class="px-6 py-4 text-xs font-mono text-gray-500">{{ kambing.id }}</td>
                  <td class="px-6 py-4 text-right">
                    <span class="text-[10px] px-2.5 py-1 rounded-md uppercase font-bold"
                          :class="kambing.collected_amount >= kambing.target_amount ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-amber-50 text-amber-600 border border-amber-200 dark:border-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400'">
                      {{ kambing.collected_amount >= kambing.target_amount ? 'Lunas' : 'Proses' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
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
            Pindah Kelompok Sapi
          </h3>
          <button @click="closeMoveModal" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"><X class="w-5 h-5" /></button>
        </div>

        <div class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          <p>Pilih kelompok baru untuk <strong class="text-gray-900 dark:text-white">{{ moveModal.member?.name }}</strong>.</p>
          <div class="text-xs p-3 mt-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-white/5 space-y-1.5">
            <p>Kelompok saat ini: <strong class="text-gray-900 dark:text-white">{{ moveModal.currentGroup?.name }}</strong></p>
            <p>Terkumpul: <strong :class="(moveModal.member?.collected_amount || 0) >= (moveModal.member?.target_amount || 1) ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-500'">{{ formatRupiah(moveModal.member?.collected_amount || 0) }}</strong> <span class="font-normal opacity-70">/ {{ formatRupiah(moveModal.member?.target_amount || 0) }}</span></p>
          </div>
        </div>

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
              Tambah Sapi
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
              <span class="text-xs font-bold">Tambah Sapi Baru</span>
            </button>
            
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Users, Plus, ArrowRightLeft, ArrowRight, X, Trash2, Search } from 'lucide-vue-next'
import { qurbanMockData } from '@/utils/qurbanMock'

const formatRupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)

const isLoading = ref(true)
const activeTab = ref('sapi')

// MOCK DATA RESPONSE API
const mockGroups = ref([])

onMounted(() => {
  setTimeout(() => {
    // Generate groups that match the view's expected format 
    // Target view expects both sapi groups and a pseudo kambing group
    
    let simulatedGroups = qurbanMockData.animalGroups.map(g => ({
      ...g,
      shohibuls_count: g.shohibuls.length
    }));
    
    // Add Kambing pseudo-group
    const kambingShohibuls = qurbanMockData.shohibuls.filter(s => s.target_type === 'kambing');
    simulatedGroups.push({
      id: 'kambing-group-1',
      name: 'Mandiri Kambing',
      target_type: 'kambing',
      shohibuls_count: kambingShohibuls.length,
      shohibuls: kambingShohibuls
    });
    
    mockGroups.value = simulatedGroups;
    isLoading.value = false;
  }, 1000)
})

const sapiGroups = computed(() => mockGroups.value.filter(g => g.target_type === 'sapi'))

const searchSapiQuery = ref('')

const filteredSapiGroups = computed(() => {
  const query = searchSapiQuery.value.toLowerCase()
  if (!query) return sapiGroups.value
  
  return sapiGroups.value.filter(group => {
    const matchGroupName = group.name.toLowerCase().includes(query)
    const matchMember = group.shohibuls.some(m => m.name.toLowerCase().includes(query) || m.id.toLowerCase().includes(query))
    return matchGroupName || matchMember
  })
})

const kambingList = computed(() => {
  let kambings = []
  mockGroups.value.forEach(g => {
    if (g.target_type === 'kambing') kambings = kambings.concat(g.shohibuls)
  })
  return kambings
})

const getGroupTotal = (group) => group.shohibuls.reduce((sum, member) => sum + member.collected_amount, 0)
const getGroupTargetTotal = (group) => {
  const pricePerSlot = group.shohibuls.length > 0 ? group.shohibuls[0].target_amount : 4000000;
  return pricePerSlot * 7;
}

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