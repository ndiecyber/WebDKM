<template>
  <div class="space-y-6 sm:space-y-8 animate-fade-in">
    <!-- Welcome Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Bank & Kas</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Pantau saldo, rekonsiliasi, dan mutasi seluruh rekening bank dan kas fisik.
        </p>
      </div>
      <div class="flex sm:items-center gap-3 w-full sm:w-auto">
        <button @click="openMutasiModal" class="flex-1 sm:flex-none justify-center bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium px-4 py-2 rounded-lg transition-colors ring-1 ring-gray-300 dark:ring-white/10 shadow-md text-sm flex items-center gap-2">
          <ArrowLeftRight class="w-4 h-4 shrink-0" />
          <span>Mutasi Kas</span>
        </button>
        <button @click="openTambahRekeningModal" class="flex-1 sm:flex-none justify-center bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2 rounded-lg transition-colors shadow-md text-sm flex items-center gap-2">
          <Plus class="w-4 h-4 shrink-0" />
          <span>Tambah Rekening</span>
        </button>
      </div>
    </div>

    <!-- Cards Section -->
    <div class="relative group/scroll">
      <div 
        class="flex gap-4 sm:gap-6 overflow-x-auto pt-4 pb-6 custom-scrollbar-x snap-x snap-mandatory scroll-smooth"
        @wheel="handleHorizontalScroll"
        ref="cardContainerRef"
      >
      <div 
        v-for="rek in sortedRekening" 
        :key="rek.id"
        @click="openDetailRekening(rek)"
        class="relative shrink-0 w-[280px] sm:w-[320px] snap-center overflow-hidden rounded-2xl text-white p-6 shadow-lg group cursor-pointer ring-1 ring-black/5 dark:ring-white/10 transition-transform hover:-translate-y-1"
        :class="getBgClass(rek.color, rek.isActive)"
      >
        <!-- Pin Button -->
        <button 
          @click.stop="togglePin(rek.id)" 
          class="absolute top-4 right-4 z-20 p-2 rounded-full transition-colors"
          :class="rek.isPinned ? 'bg-white/30 text-white' : 'text-white/40 hover:bg-white/10 hover:text-white'"
          title="Sematkan / Lepaskan"
        >
          <Pin class="w-4 h-4" :class="{'fill-current': rek.isPinned}" />
        </button>

        <div class="absolute -bottom-4 -right-4 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <component :is="getIcon(rek.type)" class="w-32 h-32" />
        </div>
        
        <div class="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
          <div class="flex items-center justify-between pr-10">
            <h3 class="font-medium tracking-wide truncate pr-2 text-white/90" :class="{'line-through opacity-75': !rek.isActive}">{{ rek.name }}</h3>
          </div>
          <div class="mt-2 flex gap-2">
            <span class="px-2.5 py-1 text-xs font-semibold rounded-md backdrop-blur-sm border border-white/20 bg-white/10">{{ rek.type }}</span>
            <span v-if="!rek.isActive" class="px-2.5 py-1 text-xs font-semibold rounded-md backdrop-blur-sm border border-rose-500/30 bg-rose-500/30 text-rose-50">Nonaktif</span>
          </div>
          <div class="mt-8">
            <p class="text-3xl font-bold tracking-tight">Rp {{ formatCurrency(rek.balance) }}</p>
            <p class="text-white/70 text-sm mt-1 font-mono tracking-wider">{{ rek.accountNo || rek.desc }}</p>
          </div>
        </div>
      </div>
      </div>
      
      <!-- Arrow Buttons -->
      <button v-if="canScrollLeft" @click="scrollCards('left')" class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md ring-1 ring-gray-200 dark:ring-white/10 text-gray-500 hover:text-gray-900 dark:hover:text-white opacity-0 group-hover/scroll:opacity-100 transition-opacity hidden sm:flex">
        <ChevronLeft class="w-5 h-5" />
      </button>
      <button v-if="canScrollRight" @click="scrollCards('right')" class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md ring-1 ring-gray-200 dark:ring-white/10 text-gray-500 hover:text-gray-900 dark:hover:text-white opacity-0 group-hover/scroll:opacity-100 transition-opacity hidden sm:flex">
        <ChevronRight class="w-5 h-5" />
      </button>
    </div>

    <!-- Riwayat Aktivitas Kas -->
    <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl overflow-hidden shadow-md">
      <div class="p-6 border-b border-gray-300 dark:border-white/5 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Riwayat Aktivitas Kas</h3>
        <button class="text-sm font-medium text-secondary hover:text-yellow-600 transition-colors">Lihat Semua</button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-600 dark:text-gray-400 min-w-[800px]">
          <thead class="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-950/50 border-b border-gray-300 dark:border-white/5">
            <tr>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Tanggal</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Tipe</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Dari / Rekening Terkait</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Ke Tujuan</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Nominal</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-white/5">
            <tr v-for="act in activityData" :key="act.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
              <td class="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white font-medium">{{ act.date }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'px-2.5 py-1 text-xs font-semibold rounded-md',
                  act.activityType === 'mutasi' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 ring-1 ring-blue-500/20' : 
                  (act.subType === 'plus' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 ring-1 ring-emerald-500/20' : 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 ring-1 ring-rose-500/20')
                ]">
                  {{ act.activityType === 'mutasi' ? 'Mutasi Antar Kas' : 'Penyesuaian Saldo' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center gap-2">
                  <span v-if="act.activityType === 'mutasi'" class="w-2 h-2 rounded-full bg-rose-400"></span>
                  <Scale v-else class="w-4 h-4 text-gray-400" />
                  {{ act.from }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span v-if="act.activityType === 'mutasi'" class="inline-flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  {{ act.to }}
                </span>
                <span v-else class="text-gray-400 dark:text-gray-500 italic">- N/A -</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap font-semibold" :class="act.subType === 'minus' ? 'text-rose-600 dark:text-rose-400' : (act.subType === 'plus' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white')">
                {{ act.subType === 'minus' ? '-' : (act.subType === 'plus' ? '+' : '') }} Rp {{ formatCurrency(act.amount) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <button @click="openDetailActivity(act)" class="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                  Detail
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modals -->
    
    <!-- Modal Tambah / Edit Rekening -->
    <div v-if="showFormRekeningModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="showFormRekeningModal = false"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all relative z-10 animate-fade-in-up">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ isEditRekeningMode ? 'Edit Rekening/Kas' : 'Tambah Rekening/Kas' }}</h3>
          <button @click="showFormRekeningModal = false" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar-y">
          <!-- Toggle Status for Edit Mode -->
          <div v-if="isEditRekeningMode" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 mb-2">
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">Status Aktif</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Rekening nonaktif tidak bisa digunakan untuk transaksi baru.</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="rekForm.isActive" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-secondary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondary"></div>
            </label>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Rekening/Kas <span class="text-rose-500">*</span></label>
              <input type="text" v-model="rekForm.name" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" placeholder="Contoh: Bank BSI Masjid">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipe Rekening <span class="text-rose-500">*</span></label>
              <select v-model="rekForm.type" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
                <option value="Bank">Bank</option>
                <option value="Kas Tunai">Kas Tunai</option>
                <option value="Dompet Digital">Dompet Digital</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Warna Label</label>
              <select v-model="rekForm.color" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
                <option value="emerald">Emerald (BSI)</option>
                <option value="blue">Blue (Kas)</option>
                <option value="purple">Purple (Muamalat)</option>
                <option value="amber">Amber (Pembangunan)</option>
                <option value="gray">Gray (Petty Cash)</option>
                <option value="rose">Rose (Merah)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nomor Rekening</label>
              <input type="text" v-model="rekForm.accountNo" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" placeholder="Misal: 7123 4567 8900">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Atas Nama</label>
              <input type="text" v-model="rekForm.ownerName" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" placeholder="Misal: Masjid Kassiti">
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi Singkat</label>
              <input type="text" v-model="rekForm.desc" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" placeholder="Misal: Dihitung setiap Jumat">
            </div>
            <div class="sm:col-span-2" v-if="!isEditRekeningMode">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Saldo Awal (Rp) <span class="text-rose-500">*</span></label>
              <input type="number" v-model="rekForm.balance" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" placeholder="0">
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Saldo awal tidak bisa diubah setelah dibuat. Gunakan Penyesuaian Saldo nanti.</p>
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload QR Code / Image (Opsional)</label>
              <div class="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                <p class="text-xs text-gray-500 dark:text-gray-400">Klik atau drop file gambar QR (Maks 2MB)</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
          <button @click="showFormRekeningModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Batal</button>
          <button @click="showFormRekeningModal = false" class="px-4 py-2 text-sm font-medium text-white bg-secondary hover:bg-yellow-500 rounded-lg shadow-sm transition-colors">Simpan Rekening</button>
        </div>
      </div>
    </div>

    <!-- Modal Detail Rekening -->
    <div v-if="selectedDetailRekening" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="selectedDetailRekening = null"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden transform transition-all relative z-10 animate-fade-in-up">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">Detail Rekening</h3>
          <button @click="selectedDetailRekening = null" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar-y">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full flex items-center justify-center text-white" :class="getBgClass(selectedDetailRekening.color, selectedDetailRekening.isActive)">
              <component :is="getIcon(selectedDetailRekening.type)" class="w-6 h-6" />
            </div>
            <div>
              <h4 class="font-bold text-gray-900 dark:text-white text-lg leading-tight">{{ selectedDetailRekening.name }}</h4>
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">{{ selectedDetailRekening.type }} <span v-if="!selectedDetailRekening.isActive" class="text-rose-500 ml-1">(Nonaktif)</span></p>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-3">
            <div class="flex justify-between items-center text-sm border-b border-gray-200 dark:border-gray-700 pb-2">
              <span class="text-gray-500 dark:text-gray-400">Total Saldo Fisik</span>
              <span class="font-bold text-lg text-gray-900 dark:text-white">Rp {{ formatCurrency(getAccountTotalBalance(selectedDetailRekening.name)) }}</span>
            </div>
            <!-- Rincian Alokasi Dana (Fund Accounting) -->
            <div class="pt-1 pb-2">
              <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Komposisi Saldo</p>
              
              <!-- Visual Stacked Bar -->
              <div class="w-full h-2.5 rounded-full overflow-hidden flex mb-3 bg-gray-200 dark:bg-gray-700" v-if="getAccountTotalBalance(selectedDetailRekening.name) > 0">
                <div 
                  class="h-full bg-gray-400 dark:bg-gray-500 transition-all duration-500" 
                  :style="{ width: getPercentage(getAccountGeneralBalance(selectedDetailRekening.name), getAccountTotalBalance(selectedDetailRekening.name)) + '%' }"
                  title="Kas Umum"
                ></div>
                <div 
                  v-for="(amount, progId, index) in getAccountProgramBalances(selectedDetailRekening.name)" 
                  :key="progId"
                  class="h-full transition-all duration-500"
                  :class="getColorClass(index)"
                  :style="{ width: getPercentage(amount, getAccountTotalBalance(selectedDetailRekening.name)) + '%' }"
                  :title="getProgramName(progId)"
                ></div>
              </div>

              <!-- List Nominal -->
              <div class="space-y-2.5 max-h-36 overflow-y-auto custom-scrollbar-y pr-1.5">
                <div class="flex justify-between text-sm items-center">
                  <div class="flex items-center gap-2 shrink-0">
                    <span class="w-2.5 h-2.5 rounded-full bg-gray-400 dark:bg-gray-500 shrink-0"></span>
                    <span class="text-gray-600 dark:text-gray-300 truncate max-w-[140px]" title="Kas Umum">Kas Umum</span>
                  </div>
                  <span class="font-medium text-gray-900 dark:text-white text-right">Rp {{ formatCurrency(getAccountGeneralBalance(selectedDetailRekening.name)) }}</span>
                </div>
                <div v-for="(amount, progId, index) in getAccountProgramBalances(selectedDetailRekening.name)" :key="progId" class="flex justify-between text-sm items-center">
                  <div class="flex items-center gap-2 shrink-0">
                    <span class="w-2.5 h-2.5 rounded-full shrink-0" :class="getColorClass(index)"></span>
                    <span class="text-gray-600 dark:text-gray-300 truncate max-w-[140px]" :title="getProgramName(progId)">{{ getProgramName(progId) }}</span>
                  </div>
                  <span class="font-medium text-gray-900 dark:text-white text-right">Rp {{ formatCurrency(amount) }}</span>
                </div>
              </div>
            </div>

            <div class="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-700" v-if="selectedDetailRekening.accountNo">
              <span class="text-gray-500 dark:text-gray-400">No. Rekening</span>
              <span class="font-medium text-gray-900 dark:text-white font-mono">{{ selectedDetailRekening.accountNo }}</span>
            </div>
            <div class="flex justify-between text-sm" v-if="selectedDetailRekening.ownerName">
              <span class="text-gray-500 dark:text-gray-400">Atas Nama</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ selectedDetailRekening.ownerName }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">Keterangan</span>
              <span class="font-medium text-gray-900 dark:text-white text-right max-w-[150px]">{{ selectedDetailRekening.desc }}</span>
            </div>
          </div>

          <!-- Dummy QR Placeholder if exists -->
          <div v-if="selectedDetailRekening.type === 'Dompet Digital' || selectedDetailRekening.type === 'Bank'" class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center">
            <QrCode class="w-20 h-20 text-gray-300 dark:text-gray-600 mb-2" />
            <p class="text-xs text-gray-500">QR Code tersedia</p>
          </div>
        </div>
        
        <div class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50 flex flex-col gap-2">
          <button @click="openPenyesuaianModal(selectedDetailRekening)" class="w-full px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-100 hover:bg-emerald-200 dark:text-emerald-300 dark:bg-emerald-500/20 dark:hover:bg-emerald-500/30 rounded-lg transition-colors flex items-center justify-center gap-2">
            <Scale class="w-4 h-4" /> Penyesuaian Saldo (Rekonsiliasi)
          </button>
          <button @click="openEditRekeningModal(selectedDetailRekening)" class="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
            <Pencil class="w-4 h-4" /> Edit Rekening
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Penyesuaian Saldo -->
    <div v-if="showPenyesuaianModal && penyesuaianTarget" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="showPenyesuaianModal = false"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all relative z-10 animate-fade-in-up">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Scale class="w-5 h-5 text-emerald-600" /> Penyesuaian Saldo
          </h3>
          <button @click="showPenyesuaianModal = false" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar-y">
          <div class="bg-amber-50 dark:bg-amber-500/10 p-3 rounded-lg flex items-start gap-3 border border-amber-200 dark:border-amber-500/20">
            <AlertTriangle class="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p class="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              Gunakan fitur ini hanya jika Saldo Sistem tidak sama dengan Saldo Fisik di lapangan. Sistem akan mengkalkulasi selisih dan mencatatnya sebagai riwayat penyesuaian.
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Rekening / Kas Terpilih</label>
            <p class="font-bold text-gray-900 dark:text-white text-lg">{{ penyesuaianTarget.name }}</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Saldo Sistem Saat Ini</label>
              <div class="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300 font-mono">
                Rp {{ formatCurrency(getAccountTotalBalance(penyesuaianTarget.name)) }}
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-900 dark:text-white mb-1">Saldo Fisik/Asli (Rp)</label>
              <input type="number" v-model="penyesuaianForm.actualBalance" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-lg font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
            </div>
          </div>

          <!-- Diff Calculation -->
          <div v-if="penyesuaianForm.actualBalance !== ''" class="p-4 rounded-lg flex justify-between items-center" :class="penyesuaianDiff === 0 ? 'bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700' : (penyesuaianDiff > 0 ? 'bg-emerald-50 border border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20' : 'bg-rose-50 border border-rose-200 dark:bg-rose-500/10 dark:border-rose-500/20')">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Selisih Penyesuaian</span>
            <span class="font-bold" :class="penyesuaianDiff === 0 ? 'text-gray-900 dark:text-white' : (penyesuaianDiff > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')">
              {{ penyesuaianDiff > 0 ? '+' : '' }}Rp {{ formatCurrency(penyesuaianDiff) }}
            </span>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alasan Penyesuaian <span class="text-rose-500">*</span></label>
            <input type="text" v-model="penyesuaianForm.reason" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" placeholder="Misal: Uang fisik kurang karena kembalian">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bebankan selisih pada Program (Opsional)</label>
            <select v-model="penyesuaianForm.program_id" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
              <option :value="null">Kas Umum (Default)</option>
              <option v-for="p in activePrograms" :key="p.id" :value="p.id">{{ p.name }}</option>
            </select>
          </div>
        </div>
        
        <div class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
          <button @click="showPenyesuaianModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Batal</button>
          <button @click="simpanPenyesuaian" :disabled="penyesuaianDiff === 0" class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg shadow-sm transition-colors">Sesuaikan Saldo</button>
        </div>
      </div>
    </div>

    <!-- Modal Mutasi Kas -->
    <div v-if="showMutasiModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="showMutasiModal = false"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all relative z-10 animate-fade-in-up">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ArrowLeftRight class="w-5 h-5 text-secondary" /> Mutasi Antar Kas
          </h3>
          <button @click="showMutasiModal = false" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar-y">
          <div class="bg-blue-50 dark:bg-blue-500/10 p-3 rounded-lg flex items-start gap-3 border border-blue-200 dark:border-blue-500/20 text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
            <Info class="w-4 h-4 shrink-0 mt-0.5" />
            <p>Jika mutasi antar bank dikenakan potongan, masukkan di kolom <b>Biaya Admin</b>. Biaya ini akan dicatat sebagai Pengeluaran Operasional secara otomatis.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="block text-sm font-medium text-rose-600 dark:text-rose-400">Dari Rekening</label>
              <select v-model="mutasiForm.from" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
                <option v-for="rek in sortedRekening" :key="rek.id" :value="rek.id">{{ rek.name }} (Rp {{ formatCurrency(rek.balance) }})</option>
              </select>
            </div>
            <div class="space-y-1">
              <label class="block text-sm font-medium text-emerald-600 dark:text-emerald-400">Ke Rekening</label>
              <select v-model="mutasiForm.to" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
                <option v-for="rek in sortedRekening" :key="rek.id" :value="rek.id">{{ rek.name }}</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nominal Mutasi <span class="text-rose-500">*</span></label>
              <input type="number" v-model="mutasiForm.amount" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-lg font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" placeholder="0">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Biaya Admin (Opsional)</label>
              <input type="number" v-model="mutasiForm.adminFee" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-lg font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" placeholder="0">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
              <input type="date" v-model="mutasiForm.date" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all [color-scheme:light] dark:[color-scheme:dark]">
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Keterangan Tambahan</label>
              <textarea v-model="mutasiForm.desc" rows="2" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" placeholder="Misal: Setor tunai hasil infaq jumat"></textarea>
            </div>
          </div>
          
          <div v-if="mutasiForm.amount && mutasiForm.adminFee" class="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center text-sm">
            <span class="text-gray-600 dark:text-gray-400">Total Potongan Kas Asal:</span>
            <span class="font-bold text-rose-600 dark:text-rose-400">Rp {{ formatCurrency(Number(mutasiForm.amount) + Number(mutasiForm.adminFee)) }}</span>
          </div>

        </div>
        
        <div class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
          <button @click="showMutasiModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Batal</button>
          <button @click="showMutasiModal = false" class="px-4 py-2 text-sm font-medium text-white bg-secondary hover:bg-yellow-500 rounded-lg shadow-sm transition-colors">Proses Mutasi</button>
        </div>
      </div>
    </div>

    <!-- Modal Detail Aktivitas -->
    <div v-if="selectedActivity" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="selectedActivity = null"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden transform transition-all relative z-10 animate-fade-in-up">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">Detail {{ selectedActivity.activityType === 'mutasi' ? 'Mutasi' : 'Penyesuaian' }}</h3>
          <button @click="selectedActivity = null" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar-y">
          <div class="text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Nominal</p>
            <p class="text-3xl font-bold" :class="selectedActivity.subType === 'minus' ? 'text-rose-600 dark:text-rose-400' : (selectedActivity.subType === 'plus' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white')">
              {{ selectedActivity.subType === 'minus' ? '-' : (selectedActivity.subType === 'plus' ? '+' : '') }}Rp {{ formatCurrency(selectedActivity.amount) }}
            </p>
            <span class="inline-block mt-2 px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300">Selesai / Valid</span>
          </div>

          <!-- Timeline mutasi -->
          <div v-if="selectedActivity.activityType === 'mutasi'" class="space-y-4 relative">
            <div class="absolute left-3 top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-700"></div>
            <div class="relative flex items-start gap-4">
              <div class="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center shrink-0 z-10 ring-4 ring-white dark:ring-gray-900">
                <ArrowUpRight class="w-3 h-3 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <p class="text-xs text-gray-500 dark:text-gray-400">Dari</p>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedActivity.from }}</p>
              </div>
            </div>
            <div class="relative flex items-start gap-4">
              <div class="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0 z-10 ring-4 ring-white dark:ring-gray-900">
                <ArrowDownLeft class="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p class="text-xs text-gray-500 dark:text-gray-400">Ke</p>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedActivity.to }}</p>
              </div>
            </div>
          </div>
          
          <!-- Or single info for penyesuaian -->
          <div v-else class="flex flex-col items-center justify-center text-center">
            <Scale class="w-8 h-8 text-gray-400 mb-2" />
            <p class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedActivity.from }}</p>
            <p class="text-xs text-gray-500 mt-1">Rekonsiliasi / Penyesuaian Saldo</p>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">Tanggal</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ selectedActivity.date }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">Keterangan</span>
              <span class="font-medium text-gray-900 dark:text-white text-right max-w-[150px]">{{ selectedActivity.desc }}</span>
            </div>
            <div class="flex justify-between text-sm" v-if="selectedActivity.adminFee">
              <span class="text-gray-500 dark:text-gray-400">Biaya Admin</span>
              <span class="font-medium text-rose-600 dark:text-rose-400">Rp {{ formatCurrency(selectedActivity.adminFee) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  Plus, ArrowLeftRight, Landmark, Wallet, Briefcase, HardHat, X, 
  ArrowUpRight, ArrowDownLeft, Pin, Scale, Pencil, QrCode, AlertTriangle, Info, ChevronLeft, ChevronRight 
} from 'lucide-vue-next'
import { useKeuanganStore } from '@/stores/keuangan'
import { useToastStore } from '@/stores/toast'

const keuanganStore = useKeuanganStore()
const toast = useToastStore()

const activePrograms = computed(() => keuanganStore.programs.filter(p => p.status === 'Aktif'))
const getProgramName = (id) => keuanganStore.programs.find(p => p.id === Number(id))?.name || ''


// State untuk Modal & Mode
const showMutasiModal = ref(false)
const showFormRekeningModal = ref(false)
const isEditRekeningMode = ref(false)
const selectedDetailRekening = ref(null)
const showPenyesuaianModal = ref(false)
const penyesuaianTarget = ref(null)
const selectedActivity = ref(null)

const closeAllModals = () => {
  showMutasiModal.value = false
  showFormRekeningModal.value = false
  selectedDetailRekening.value = null
  showPenyesuaianModal.value = false
  selectedActivity.value = null
}

const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    closeAllModals()
  }
}

// Scroll Handling
const cardContainerRef = ref(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)

const checkScroll = () => {
  if (cardContainerRef.value) {
    const { scrollLeft, scrollWidth, clientWidth } = cardContainerRef.value
    canScrollLeft.value = scrollLeft > 0
    canScrollRight.value = Math.ceil(scrollLeft + clientWidth) < scrollWidth
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', checkScroll)
  if (cardContainerRef.value) {
    cardContainerRef.value.addEventListener('scroll', checkScroll)
    setTimeout(checkScroll, 100) // Initial check
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', checkScroll)
  if (cardContainerRef.value) {
    cardContainerRef.value.removeEventListener('scroll', checkScroll)
  }
})

const handleHorizontalScroll = (e) => {
  if (cardContainerRef.value) {
    // Check if the scroll is primarily horizontal (e.g. from a trackpad swipe)
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      return; // Allow native horizontal scrolling to handle it
    }
    
    // If it's a vertical mouse wheel, translate to horizontal
    e.preventDefault();
    cardContainerRef.value.scrollBy({
      left: e.deltaY > 0 ? 100 : -100,
      behavior: 'auto'
    })
  }
}

const scrollCards = (direction) => {
  if (cardContainerRef.value) {
    const scrollAmount = 300 // default scroll
    cardContainerRef.value.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }
}

// Data Mockup Rekening
const rekeningData = ref([
  { id: 1, name: 'BSI Masjid Jami Kassiti', type: 'Bank', accountNo: '7123 4567 8900', ownerName: 'Masjid Kassiti', desc: 'Rekening penerimaan utama', balance: 45250000, color: 'emerald', isPinned: true, isActive: true },
  { id: 2, name: 'Kotak Amal Utama', type: 'Kas Tunai', accountNo: '', ownerName: '', desc: 'Dihitung setiap Jumat', balance: 5150000, color: 'blue', isPinned: true, isActive: true },
  { id: 3, name: 'Kas Kecil Operasional', type: 'Kas Tunai', accountNo: '', ownerName: '', desc: 'Dipegang Bendahara', balance: 850000, color: 'gray', isPinned: false, isActive: true },
  { id: 4, name: 'Kas Pembangunan', type: 'Kas Tunai', accountNo: '', ownerName: '', desc: 'Renovasi area wudhu', balance: 12000000, color: 'amber', isPinned: false, isActive: true },
  { id: 5, name: 'Bank Muamalat', type: 'Bank', accountNo: '312 445 6678', ownerName: 'DKM Kassiti', desc: 'Dana Cadangan', balance: 20000000, color: 'purple', isPinned: false, isActive: false },
])

const sortedRekening = computed(() => {
  return [...rekeningData.value].map(r => ({
    ...r,
    // Sync balance with store
    balance: getAccountTotalBalance(r.name) || r.balance
  })).sort((a, b) => {
    if (a.isPinned === b.isPinned) return 0;
    return a.isPinned ? -1 : 1;
  });
})

// Pin Logic
const togglePin = (id) => {
  const index = rekeningData.value.findIndex(r => r.id === id)
  if (index === -1) return

  if (rekeningData.value[index].isPinned) {
    rekeningData.value[index].isPinned = false
  } else {
    // Cek jumlah pinned saat ini
    const pinnedCount = rekeningData.value.filter(r => r.isPinned).length
    if (pinnedCount >= 3) {
      // Cari pinned pertama/paling lama untuk di-unpin (asumsi: yang pertama ditemukan di array)
      const firstPinned = rekeningData.value.find(r => r.isPinned)
      if (firstPinned) firstPinned.isPinned = false
    }
    rekeningData.value[index].isPinned = true
  }
}

// Modal Data Models
const rekForm = ref({ id: null, name: '', type: 'Bank', color: 'emerald', accountNo: '', ownerName: '', desc: '', balance: '', isActive: true })

const getTodayDate = () => {
  const d = new Date();
  const month = '' + (d.getMonth() + 1);
  const day = '' + d.getDate();
  const year = d.getFullYear();
  return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
}

const mutasiForm = ref({ from: null, to: null, amount: '', adminFee: '', date: getTodayDate(), desc: '' })

const penyesuaianForm = ref({ actualBalance: '', reason: '', program_id: null })

const penyesuaianDiff = computed(() => {
  if (!penyesuaianTarget.value || penyesuaianForm.value.actualBalance === '') return 0;
  return Number(penyesuaianForm.value.actualBalance) - getAccountTotalBalance(penyesuaianTarget.value.name);
})

// Store Integration Helpers
const getAccountTotalBalance = (accountName) => {
  return keuanganStore.accountBalances[accountName]?.total || 0
}

const getAccountGeneralBalance = (accountName) => {
  return keuanganStore.accountBalances[accountName]?.general || 0
}

const getAccountProgramBalances = (accountName) => {
  return keuanganStore.accountBalances[accountName]?.programs || {}
}

const getPercentage = (part, total) => {
  if (total === 0) return 0
  return (part / total) * 100
}

const getColorClass = (index) => {
  const colors = ['bg-emerald-500', 'bg-blue-500', 'bg-amber-500', 'bg-purple-500', 'bg-rose-500', 'bg-teal-500']
  // Use index instead of array order since object keys iteration order might not be strictly an array index, but vue v-for with object gives (value, key, index)
  const safeIndex = typeof index === 'number' ? index : 0;
  return colors[safeIndex % colors.length]
}

// Actions
const formatCurrency = (val) => {
  return new Intl.NumberFormat('id-ID').format(val || 0)
}

const openTambahRekeningModal = () => {
  isEditRekeningMode.value = false
  rekForm.value = { id: null, name: '', type: 'Bank', color: 'emerald', accountNo: '', ownerName: '', desc: '', balance: '', isActive: true }
  showFormRekeningModal.value = true
}

const openDetailRekening = (rek) => {
  selectedDetailRekening.value = rek
}

const openEditRekeningModal = (rek) => {
  selectedDetailRekening.value = null
  isEditRekeningMode.value = true
  rekForm.value = { ...rek }
  showFormRekeningModal.value = true
}

const openPenyesuaianModal = (rek) => {
  selectedDetailRekening.value = null
  penyesuaianTarget.value = rek
  penyesuaianForm.value = { actualBalance: '', reason: '', program_id: null }
  showPenyesuaianModal.value = true
}

const simpanPenyesuaian = () => {
  if (penyesuaianDiff.value !== 0) {
    keuanganStore.addBalanceAdjustment(
      penyesuaianTarget.value.name, 
      penyesuaianDiff.value, 
      penyesuaianForm.value.program_id
    )
    toast.showToast('Penyesuaian saldo berhasil disimpan', 'success')
  }
  showPenyesuaianModal.value = false
}

const openMutasiModal = () => {
  mutasiForm.value = { from: null, to: null, amount: '', adminFee: '', date: getTodayDate(), desc: '' }
  showMutasiModal.value = true
}

const openDetailActivity = (act) => {
  selectedActivity.value = act
}

// Helpers
const getIcon = (type) => {
  if (type === 'Bank') return Landmark
  if (type === 'Kas Tunai') return Wallet
  return Briefcase
}

const getBgClass = (color, isActive = true) => {
  const opacity = isActive ? '' : ' grayscale opacity-80'
  switch(color) {
    case 'emerald': return 'bg-gradient-to-br from-emerald-600 to-teal-800 shadow-emerald-900/20' + opacity
    case 'blue': return 'bg-gradient-to-br from-blue-600 to-indigo-800 shadow-blue-900/20' + opacity
    case 'purple': return 'bg-gradient-to-br from-purple-600 to-indigo-900 shadow-purple-900/20' + opacity
    case 'amber': return 'bg-gradient-to-br from-amber-600 to-orange-800 shadow-amber-900/20' + opacity
    case 'rose': return 'bg-gradient-to-br from-rose-600 to-red-800 shadow-rose-900/20' + opacity
    case 'gray': return 'bg-gradient-to-br from-gray-700 to-gray-900 shadow-gray-900/20' + opacity
    default: return 'bg-gradient-to-br from-gray-700 to-gray-900 shadow-gray-900/20' + opacity
  }
}

// Activity Data Mockup
const activityData = [
  { id: 1, activityType: 'mutasi', subType: 'none', date: '10 Okt 2023', from: 'Kotak Amal Utama', to: 'BSI Masjid Jami Kassiti', amount: 3000000, desc: 'Setor tunai hasil Jumat', adminFee: 0 },
  { id: 2, activityType: 'penyesuaian', subType: 'plus', date: '08 Okt 2023', from: 'Kas Kecil Operasional', to: null, amount: 50000, desc: 'Ditemukan selisih lebih di laci', adminFee: 0 },
  { id: 3, activityType: 'mutasi', subType: 'none', date: '05 Okt 2023', from: 'BSI Masjid Jami Kassiti', to: 'Kas Kecil Operasional', amount: 1000000, desc: 'Tarik tunai untuk operasional', adminFee: 5000 },
  { id: 4, activityType: 'penyesuaian', subType: 'minus', date: '01 Okt 2023', from: 'Kotak Amal Utama', to: null, amount: 20000, desc: 'Terselip kembalian', adminFee: 0 },
]

</script>

<style scoped>
.custom-scrollbar-x::-webkit-scrollbar {
  height: 8px;
}
.custom-scrollbar-x::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar-x::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.4);
  border-radius: 20px;
}
.custom-scrollbar-x::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.6);
}
.dark .custom-scrollbar-x::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.4);
}
.dark .custom-scrollbar-x::-webkit-scrollbar-thumb:hover {
  background-color: rgba(75, 85, 99, 0.6);
}

.custom-scrollbar-y::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar-y::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar-y::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
}

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
</style>
