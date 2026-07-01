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
      <!-- Tabs Navigation and Action -->
      <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 mb-6">
        <div class="flex flex-wrap items-center gap-2 sm:gap-6">
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
        
        <button v-if="activeTab === 'sapi'" @click="openCreateGroupModal" class="bg-secondary hover:bg-yellow-500 text-white font-bold px-4 py-2 rounded-xl shadow-md shadow-secondary/20 transition-all text-sm flex items-center justify-center gap-2 mb-2">
          <Plus class="w-4 h-4" />
          <span class="hidden sm:inline">Tambah Sapi</span>
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

          <div class="flex items-center gap-2 w-full md:w-auto">
            <div class="relative shrink-0 w-full md:w-auto">
              <button 
                @click="isSapiStatusFilterOpen = !isSapiStatusFilterOpen" 
                class="w-full md:w-auto px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 flex justify-between items-center gap-2 border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-800 shadow-sm"
              >
                <div class="flex items-center gap-2">
                  <Filter class="w-4 h-4 text-gray-400" />
                  <span>{{ selectedSapiStatusFilter.label }}</span>
                </div>
                <ChevronDown class="w-4 h-4 text-gray-400" />
              </button>

              <div v-if="isSapiStatusFilterOpen" class="absolute right-0 left-0 md:left-auto mt-2 w-full md:w-48 bg-white dark:bg-gray-800 border border-gray-100 dark:border-white/10 rounded-xl shadow-lg z-50 py-1 animate-fade-in-down overflow-hidden">
                <button 
                  v-for="filter in sapiStatusFilters" 
                  :key="filter.value"
                  @click="selectSapiStatusFilter(filter.value)"
                  class="w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-2"
                  :class="sapiStatusFilter === filter.value ? 'bg-secondary/10 text-secondary dark:bg-secondary/20' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'"
                >
                  <span v-if="filter.icon" class="w-4 text-center">{{ filter.icon }}</span>
                  <span v-else class="w-4"></span> 
                  {{ filter.label }}
                  <Check v-if="sapiStatusFilter === filter.value" class="w-4 h-4 ml-auto text-secondary" />
                </button>
              </div>
              <div v-if="isSapiStatusFilterOpen" @click="isSapiStatusFilterOpen = false" class="fixed inset-0 z-40"></div>
            </div>
          </div>
        </div>

        <!-- Sapi Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-white/10 p-4 shadow-sm flex flex-col items-center justify-center text-center">
            <span class="text-xs text-gray-500 font-semibold uppercase mb-1">Total Sapi</span>
            <span class="text-xl font-bold text-gray-900 dark:text-white">{{ totalSapiCount }} Ekor</span>
          </div>
          <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-white/10 p-4 shadow-sm flex flex-col items-center justify-center text-center">
            <span class="text-xs text-gray-500 font-semibold uppercase mb-1">Total Shohibul</span>
            <span class="text-xl font-bold text-gray-900 dark:text-white">{{ totalSapiShohibulCount }} Orang</span>
          </div>
          <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-white/10 p-4 shadow-sm flex flex-col items-center justify-center text-center">
            <span class="text-xs text-gray-500 font-semibold uppercase mb-1">Harga Sapi</span>
            <span class="text-xl font-bold text-gray-900 dark:text-white">{{ formatRupiah(sapiPrice) }}</span>
          </div>
          <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-white/10 p-4 shadow-sm flex flex-col items-center justify-center text-center">
            <span class="text-xs text-gray-500 font-semibold uppercase mb-1">Harga / Orang</span>
            <span class="text-xl font-bold text-gray-900 dark:text-white">{{ formatRupiah(sapiShohibulPrice) }}</span>
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
        
        <!-- Search & Filter Bar Kambing -->
        <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-4 shadow-sm relative z-20">
          <div class="relative flex-1">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search class="w-4 h-4 text-gray-400" />
            </div>
            <input 
              v-model="searchKambingQuery"
              type="text" 
              class="block w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary sm:text-sm transition-colors shadow-sm" 
              placeholder="Cari nama jamaah..." 
            />
          </div>

          <div class="flex items-center gap-2 w-full md:w-auto">
            <div class="relative shrink-0 w-full md:w-auto">
              <button 
                @click="isKambingStatusFilterOpen = !isKambingStatusFilterOpen" 
                class="w-full md:w-auto px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 flex justify-between items-center gap-2 border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-800 shadow-sm"
              >
                <div class="flex items-center gap-2">
                  <Filter class="w-4 h-4 text-gray-400" />
                  <span>{{ selectedKambingStatusFilter.label }}</span>
                </div>
                <ChevronDown class="w-4 h-4 text-gray-400" />
              </button>

              <div v-if="isKambingStatusFilterOpen" class="absolute right-0 left-0 md:left-auto mt-2 w-full md:w-48 bg-white dark:bg-gray-800 border border-gray-100 dark:border-white/10 rounded-xl shadow-lg z-50 py-1 animate-fade-in-down overflow-hidden">
                <button 
                  v-for="filter in kambingStatusFilters" 
                  :key="filter.value"
                  @click="selectKambingStatusFilter(filter.value)"
                  class="w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-2"
                  :class="kambingStatusFilter === filter.value ? 'bg-secondary/10 text-secondary dark:bg-secondary/20' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'"
                >
                  <span v-if="filter.icon" class="w-4 text-center">{{ filter.icon }}</span>
                  <span v-else class="w-4"></span> 
                  {{ filter.label }}
                  <Check v-if="kambingStatusFilter === filter.value" class="w-4 h-4 ml-auto text-secondary" />
                </button>
              </div>
              <div v-if="isKambingStatusFilterOpen" @click="isKambingStatusFilterOpen = false" class="fixed inset-0 z-40"></div>
            </div>
          </div>
        </div>

        <!-- Kambing Stats -->
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-white/10 p-4 shadow-sm flex flex-col items-center justify-center text-center">
            <span class="text-xs text-gray-500 font-semibold uppercase mb-1">Total Kambing</span>
            <span class="text-xl font-bold text-gray-900 dark:text-white">{{ totalKambingCount }} Ekor</span>
          </div>
          <div class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-white/10 p-4 shadow-sm flex flex-col items-center justify-center text-center">
            <span class="text-xs text-gray-500 font-semibold uppercase mb-1">Harga Per Ekor</span>
            <span class="text-xl font-bold text-gray-900 dark:text-white">{{ formatRupiah(kambingPrice) }}</span>
          </div>
        </div>

        <div v-if="kambingList.length === 0" class="p-8 text-center bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700">
          <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Data jamaah kambing tidak ditemukan.</p>
        </div>
        
        <div v-else class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl overflow-hidden shadow-sm">
          <div class="overflow-x-auto custom-scrollbar">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-white/5 text-left border-collapse">
              <thead class="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-white/5">
                <tr class="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th scope="col" class="px-4 py-3 font-bold w-16 text-center">No</th>
                  <th scope="col" class="px-4 py-3 font-bold">Identitas Shohibul</th>
                  <th scope="col" class="px-4 py-3 font-bold">Alamat</th>
                  <th scope="col" class="px-4 py-3 font-bold">Terkumpul</th>
                  <th scope="col" class="px-4 py-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-white/5">
                <tr 
                  v-for="(kambing, idx) in kambingList" 
                  :key="kambing.id" 
                  class="hover:bg-gray-50/80 dark:hover:bg-white/[0.02] transition-colors group"
                >
                  <td class="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {{ idx + 1 }}
                  </td>
                  
                  <td class="px-4 py-3 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="shrink-0 h-8 w-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-100 dark:border-emerald-500/20">
                        {{ getInitials(kambing.name) }}
                      </div>
                      <div class="ml-3">
                        <div class="text-sm font-bold text-gray-900 dark:text-white">
                          {{ kambing.name }}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td class="px-4 py-3">
                    <div class="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1.5 truncate max-w-[200px]" :title="kambing.address">
                      <MapPin class="w-3.5 h-3.5 text-gray-400 shrink-0" /> <span class="truncate">{{ kambing.address }}</span>
                    </div>
                  </td>

                  <td class="px-4 py-3 whitespace-nowrap">
                    <div class="flex items-center gap-1.5 mb-1.5">
                      <span class="text-sm font-bold text-gray-900 dark:text-white">{{ formatRupiah(kambing.collected_amount) }}</span>
                      <span class="text-[10px] text-gray-500 dark:text-gray-400 font-medium">/ {{ formatRupiah(kambing.target_amount) }}</span>
                    </div>
                    <div class="w-full max-w-[140px] h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden border border-gray-200 dark:border-white/5">
                      <div class="h-full rounded-full transition-all duration-500"
                           :class="kambing.collected_amount >= kambing.target_amount ? 'bg-emerald-500' : 'bg-secondary'"
                           :style="{ width: getPercentage(kambing) + '%' }">
                      </div>
                    </div>
                  </td>

                  <td class="px-4 py-3 whitespace-nowrap">
                    <div class="flex flex-col gap-1.5 items-start">
                      <span v-if="kambing.transactions && kambing.transactions.some(tx => tx.status === 'pending')" class="px-2 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 text-[10px] uppercase tracking-wider rounded-md font-bold animate-pulse border border-amber-200 dark:border-amber-500/20" title="Ada tagihan pending">
                        Pending
                      </span>
                      <span v-else-if="kambing.collected_amount >= kambing.target_amount" class="px-2 py-0.5 inline-flex text-[10px] font-bold rounded-md uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                        Lunas
                      </span>
                      <span v-else class="px-2 py-0.5 inline-flex text-[10px] font-bold rounded-md uppercase tracking-wider bg-amber-50 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
                        Proses
                      </span>
                    </div>
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
import { Users, Plus, ArrowRightLeft, ArrowRight, X, Trash2, Search, Filter, ChevronDown, Check, MapPin } from 'lucide-vue-next'
import { qurbanMockData } from '@/utils/qurbanMock'

const formatRupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
const getPercentage = (peserta) => Math.min(Math.round((peserta.collected_amount / peserta.target_amount) * 100), 100)
const getInitials = (name) => {
  const split = name.split(' ')
  return split.length >= 2 ? (split[0][0] + split[1][0]).toUpperCase() : name.slice(0, 2).toUpperCase()
}

const isLoading = ref(true)
const activeTab = ref('sapi')

const totalSapiCount = computed(() => sapiGroups.value.length)
const totalSapiShohibulCount = computed(() => sapiGroups.value.reduce((acc, g) => acc + g.shohibuls.length, 0))
const sapiPrice = 28000000
const sapiShohibulPrice = 4000000

const totalKambingCount = computed(() => {
  let count = 0
  mockGroups.value.forEach(g => {
    if (g.target_type === 'kambing') count += g.shohibuls.length
  })
  return count
})
const kambingPrice = 3500000

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
const sapiStatusFilter = ref('all')
const isSapiStatusFilterOpen = ref(false)

const sapiStatusFilters = [
  { label: 'Semua Status', value: 'all', icon: '' },
  { label: 'Lunas', value: 'lunas', icon: '✓' },
  { label: 'Proses', value: 'proses', icon: '⏳' }
]

const selectedSapiStatusFilter = computed(() => sapiStatusFilters.find(f => f.value === sapiStatusFilter.value) || sapiStatusFilters[0])

const selectSapiStatusFilter = (value) => {
  sapiStatusFilter.value = value
  isSapiStatusFilterOpen.value = false
}

const filteredSapiGroups = computed(() => {
  let groups = sapiGroups.value
  
  const query = searchSapiQuery.value.toLowerCase()
  if (query) {
    groups = groups.filter(group => {
      const matchGroupName = group.name.toLowerCase().includes(query)
      const matchMember = group.shohibuls.some(m => m.name.toLowerCase().includes(query) || m.id.toString().toLowerCase().includes(query))
      return matchGroupName || matchMember
    })
  }

  if (sapiStatusFilter.value === 'lunas') {
    groups = groups.filter(g => getGroupTotal(g) >= getGroupTargetTotal(g))
  } else if (sapiStatusFilter.value === 'proses') {
    groups = groups.filter(g => getGroupTotal(g) < getGroupTargetTotal(g))
  }
  
  return groups
})

const searchKambingQuery = ref('')
const kambingStatusFilter = ref('all')
const isKambingStatusFilterOpen = ref(false)

const kambingStatusFilters = [
  { label: 'Semua Status', value: 'all', icon: '' },
  { label: 'Lunas', value: 'lunas', icon: '✓' },
  { label: 'Proses', value: 'proses', icon: '⏳' }
]

const selectedKambingStatusFilter = computed(() => kambingStatusFilters.find(f => f.value === kambingStatusFilter.value) || kambingStatusFilters[0])

const selectKambingStatusFilter = (value) => {
  kambingStatusFilter.value = value
  isKambingStatusFilterOpen.value = false
}

const kambingList = computed(() => {
  let kambings = []
  mockGroups.value.forEach(g => {
    if (g.target_type === 'kambing') kambings = kambings.concat(g.shohibuls)
  })
  
  const query = searchKambingQuery.value.toLowerCase()
  if (query) {
    kambings = kambings.filter(k => 
      k.name.toLowerCase().includes(query) || 
      k.id.toString().toLowerCase().includes(query)
    )
  }
  
  if (kambingStatusFilter.value === 'lunas') {
    kambings = kambings.filter(k => k.collected_amount >= k.target_amount)
  } else if (kambingStatusFilter.value === 'proses') {
    kambings = kambings.filter(k => k.collected_amount < k.target_amount)
  }
  
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