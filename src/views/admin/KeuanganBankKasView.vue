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
    
    <!-- Filter & Search Section -->
    <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-4 shadow-md relative z-20">
      <div class="relative flex-1">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search class="w-4 h-4 text-gray-400" />
        </div>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Cari rekening atau kas..." 
          class="block w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary sm:text-sm transition-colors shadow-sm"
        />
      </div>
      <div class="flex items-center gap-2 w-full md:w-auto">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Status:</label>
        <select v-model="filterStatus" class="w-full md:w-auto bg-gray-50 dark:bg-gray-950 border-0 ring-1 ring-gray-300 dark:ring-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all shadow-md">
          <option value="all">Semua Status</option>
          <option value="active">Aktif Saja</option>
          <option value="inactive">Nonaktif</option>
        </select>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="keuanganStore.loading.bankKas" class="flex gap-4 sm:gap-6 overflow-x-auto pt-2 pb-4">
      <div v-for="i in 3" :key="i" class="relative shrink-0 w-[280px] sm:w-[320px] h-[180px] bg-white dark:bg-gray-800 rounded-2xl animate-pulse">
        <div class="p-5 h-full flex flex-col justify-between">
          <div class="w-2/3 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div class="w-1/3 h-4 bg-gray-200 dark:bg-gray-700 rounded mt-2"></div>
          <div class="w-3/4 h-8 bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>
        </div>
      </div>
    </div>

    <!-- Cards Section -->
    <div class="relative group/scroll" v-else-if="sortedRekening.length > 0">
      <div 
        class="flex gap-4 sm:gap-6 overflow-x-auto pt-2 pb-4 custom-scrollbar-x snap-x snap-mandatory scroll-smooth"
        @wheel="handleHorizontalScroll"
        ref="cardContainerRef"
      >
      <div 
        v-for="rek in sortedRekening" 
        :key="rek.id"
        @click="openDetailRekening(rek)"
        class="relative shrink-0 w-[280px] sm:w-[320px] snap-center overflow-hidden rounded-2xl text-white p-5 shadow-lg group cursor-pointer ring-1 ring-black/5 dark:ring-white/10 transition-transform hover:-translate-y-1"
        :class="getBgClass(rek.color, rek.isActive)"
      >
        <!-- Pin Button -->
        <button 
          @click.stop="togglePin(rek)" 
          class="absolute top-4 right-4 z-20 p-2 rounded-full transition-colors"
          :class="rek.isPinned ? 'bg-white/30 text-white' : 'text-white/40 hover:bg-white/10 hover:text-white'"
          title="Sematkan / Lepaskan"
        >
          <Pin class="w-4 h-4" :class="{'fill-current': rek.isPinned}" />
        </button>

        <div class="absolute -bottom-4 -right-4 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <component :is="getIcon(rek.type)" class="w-32 h-32" />
        </div>
        
        <div class="relative z-10 flex flex-col h-full justify-between min-h-[140px]">
          <div class="flex items-center justify-between pr-10">
            <h3 class="font-medium tracking-wide truncate pr-2 text-white/90" :class="{'line-through opacity-75': !rek.isActive}">{{ rek.name }}</h3>
          </div>
          <div class="mt-2 flex gap-2">
            <span class="px-2.5 py-1 text-xs font-semibold rounded-md backdrop-blur-sm border border-white/20 bg-white/10">{{ rek.type }}</span>
            <span v-if="!rek.isActive" class="px-2.5 py-1 text-xs font-semibold rounded-md backdrop-blur-sm border border-rose-500/30 bg-rose-500/30 text-rose-50">Nonaktif</span>
          </div>
          <div class="mt-4">
            <p class="text-3xl font-bold tracking-tight">Rp {{ formatCurrencyLocal(rek.balance) }}</p>
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

    <!-- Empty State if no accounts found -->
    <div v-else class="py-12 flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
      <Search class="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Tidak ada rekening yang cocok</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Coba ubah kata kunci pencarian atau filter status.</p>
    </div>

    <!-- Riwayat Aktivitas Kas -->
    <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl overflow-hidden shadow-md">
      <div class="p-6 border-b border-gray-300 dark:border-white/5 flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Riwayat Mutasi & Aktivitas Kas</h3>
        <RouterLink to="/admin/keuangan-transaksi?tipe=transfer" class="text-sm font-medium text-secondary hover:text-yellow-600 transition-colors">Lihat Semua</RouterLink>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-white/5 text-left border-collapse">
          <thead class="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-white/5">
            <tr class="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <th scope="col" class="px-4 py-3 font-bold">Tanggal</th>
              <th scope="col" class="px-4 py-3 font-bold">Tipe</th>
              <th scope="col" class="px-4 py-3 font-bold">Dari / Rekening Terkait</th>
              <th scope="col" class="px-4 py-3 font-bold">Ke Tujuan</th>
              <th scope="col" class="px-4 py-3 font-bold">Nominal</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-white/5 text-sm text-gray-600 dark:text-gray-400">
            <tr v-if="!activityData.length" class="text-center">
              <td colspan="5" class="px-4 py-8 text-gray-400">Belum ada riwayat mutasi / aktivitas kas terkini.</td>
            </tr>
            <tr v-for="act in activityData" :key="act.id" class="hover:bg-gray-50/80 dark:hover:bg-white/[0.02] transition-colors group">
              <td class="px-4 py-3 whitespace-nowrap text-gray-900 dark:text-white font-medium">{{ act.date }}</td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span class="px-2.5 py-1 text-xs font-semibold rounded-md ring-1" :class="{
                  'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 ring-emerald-500/20': act.type === 'in',
                  'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 ring-rose-500/20': act.type === 'out',
                  'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 ring-blue-500/20': act.type === 'transfer'
                }">
                  {{ act.type === 'in' ? 'Pemasukan' : (act.type === 'out' ? 'Pengeluaran' : 'Mutasi Kas') }}
                </span>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ act.name }}</p>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span v-if="act.bankKasAsal" class="inline-flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-rose-400"></span>
                  {{ act.bankKasAsal }}
                </span>
                <span v-else class="text-gray-400">-</span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span v-if="act.bankKasTujuan" class="inline-flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  {{ act.bankKasTujuan }}
                </span>
                <span v-else class="text-gray-400">-</span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap font-semibold text-gray-900 dark:text-white">
                Rp {{ formatCurrencyLocal(act.amount) }}
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
              <input type="number" v-model="rekForm.initialBalance" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" placeholder="0">
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Saldo awal tidak bisa diubah setelah dibuat. Gunakan Penyesuaian Saldo nanti.</p>
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">QR Code / Logo Bank (Opsional)</label>
              <input type="file" @change="handleFileUpload" accept="image/*" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1" v-if="rekForm.qrImage">QR Code/Logo sudah tersimpan. Unggah yang baru untuk mengganti.</p>
            </div>
            <div v-if="false" class="sm:col-span-2 flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Visibilitas Publik</label>
                <p class="text-xs text-gray-500 dark:text-gray-400">Tampilkan rekening ini di halaman donasi publik</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="rekForm.visibilitasPublik" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary/30 dark:peer-focus:ring-secondary/80 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondary"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
          <button @click="showFormRekeningModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Batal</button>
          <button @click="saveRekening" :disabled="isSaving" class="px-4 py-2 text-sm font-medium text-white bg-secondary hover:bg-yellow-500 rounded-lg shadow-sm transition-colors disabled:opacity-70">
            {{ isSaving ? 'Menyimpan...' : 'Simpan Rekening' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Detail Rekening -->
    <div v-if="selectedDetailRekening" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="selectedDetailRekening = null"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all relative z-10 animate-fade-in-up">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-white/10">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">Detail Rekening</h3>
            <button @click="selectedDetailRekening = null" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              <X class="w-5 h-5" />
            </button>
          </div>
          <div class="flex space-x-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button @click="detailTab = 'info'" :class="['flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors', detailTab === 'info' ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200']">Info Umum</button>
            <button @click="detailTab = 'aktivitas'" :class="['flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors', detailTab === 'aktivitas' ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200']">Aktivitas</button>
            <button @click="detailTab = 'program'" :class="['flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors', detailTab === 'program' ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200']">Alokasi Saldo</button>
          </div>
        </div>
        
        <div class="p-6 space-y-5 max-h-[60vh] overflow-y-auto custom-scrollbar-y">
          <template v-if="detailTab === 'info'">
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
              <span class="font-bold text-lg text-gray-900 dark:text-white">Rp {{ formatCurrencyLocal(selectedDetailRekening.balance) }}</span>
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
          </template>

          <template v-else-if="detailTab === 'aktivitas'">
            <div v-if="isDetailLoading" class="flex justify-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
            </div>
            <div v-else-if="!detailActivities.length" class="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>Belum ada aktivitas pada rekening ini.</p>
            </div>
            <div v-else class="space-y-4">
              <div v-for="act in detailActivities" :key="act.id" class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-white/5 flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ act.nama || (act.is_pemasukan ? 'Pemasukan' : 'Pengeluaran') }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ new Date(act.tanggal).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'}) }}</p>
                  <p v-if="act.deskripsi" class="text-xs text-gray-600 dark:text-gray-300 mt-1">{{ act.deskripsi }}</p>
                </div>
                <div class="text-right">
                  <p :class="['font-bold text-sm', act.is_pemasukan ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400']">
                    {{ act.is_pemasukan ? '+' : '-' }}{{ formatCurrencyLocal(Math.abs(act.nominal)) }}
                  </p>
                </div>
              </div>
            </div>
          </template>

          <template v-else-if="detailTab === 'program'">
            <div v-if="isDetailLoading" class="flex justify-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
            </div>
            <div v-else-if="!detailProgramBalances.length" class="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>Tidak ada saldo program yang tercatat di rekening ini.</p>
            </div>
            <div v-else class="space-y-4">
              <div class="flex justify-center mb-4">
                <apexchart type="donut" width="300" :options="programChartOptions" :series="programChartSeries"></apexchart>
              </div>
              <div class="space-y-3">
                <div v-for="pb in detailProgramBalances" :key="pb.program_id" class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-white/5">
                  <div>
                    <h4 class="font-medium text-gray-900 dark:text-white">{{ pb.nama_program || 'Program (Terhapus)' }}</h4>
                  </div>
                  <span class="font-bold" :class="pb.saldo >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'">
                    {{ pb.saldo < 0 ? '- ' : '' }}Rp {{ formatCurrencyLocal(Math.abs(pb.saldo)) }}
                  </span>
                </div>
              </div>
            </div>
          </template>
        </div>
        
        <div v-if="detailTab === 'info'" class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50 flex flex-col sm:flex-row gap-2 justify-end">
          <button @click="openEditRekeningModal(selectedDetailRekening)" class="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
            <Pencil class="w-4 h-4" /> Edit
          </button>
          <button @click="openPenyesuaianModal(selectedDetailRekening)" class="w-full sm:w-auto px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-100 hover:bg-emerald-200 dark:text-emerald-300 dark:bg-emerald-500/20 dark:hover:bg-emerald-500/30 rounded-lg transition-colors flex items-center justify-center gap-2">
            <Scale class="w-4 h-4" /> Penyesuaian Saldo
          </button>
        </div>
        <div v-else class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50 flex justify-end">
          <button @click="selectedDetailRekening = null" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Tutup</button>
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
                Rp {{ formatCurrencyLocal(penyesuaianTarget.balance) }}
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
              {{ penyesuaianDiff > 0 ? '+ ' : (penyesuaianDiff < 0 ? '- ' : '') }}Rp {{ formatCurrencyLocal(Math.abs(penyesuaianDiff)) }}
            </span>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bebankan/Tambahkan ke Program (Opsional)</label>
            <div v-if="isPenyesuaianLoading" class="text-sm text-gray-500 flex items-center gap-2 py-2">
              <div class="animate-spin rounded-full h-4 w-4 border-2 border-secondary/50 border-t-secondary"></div>
              Memuat data program...
            </div>
            <div v-else>
              <select v-model="penyesuaianForm.program_id" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
                <option value="">Kas Umum / Tanpa Program (Alokasi: {{ penyesuaianKasUmumBalance < 0 ? '-' : '' }}Rp {{ formatCurrencyLocal(Math.abs(penyesuaianKasUmumBalance)) }})</option>
                <option v-for="p in penyesuaianProgramOptions" :key="p.program_id" :value="p.program_id">{{ p.nama_program }} (Alokasi: {{ p.saldo < 0 ? '-' : '' }}Rp {{ formatCurrencyLocal(Math.abs(p.saldo)) }})</option>
              </select>
              <div v-if="penyesuaianDiff < 0 && ((penyesuaianForm.program_id === '' && penyesuaianKasUmumBalance < Math.abs(penyesuaianDiff)) || (penyesuaianForm.program_id !== '' && penyesuaianProgramOptions.find(p => p.program_id === penyesuaianForm.program_id)?.saldo < Math.abs(penyesuaianDiff)))" class="mt-2 text-xs text-rose-600 dark:text-rose-400 flex items-start gap-1">
                <AlertTriangle class="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>Peringatan: Pemotongan dana melebihi alokasi yang dipilih. Alokasi ini akan menjadi minus (defisit).</span>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alasan Penyesuaian <span class="text-rose-500">*</span></label>
            <input type="text" v-model="penyesuaianForm.reason" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" placeholder="Misal: Uang fisik kurang karena kembalian">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
            <input type="date" v-model="penyesuaianForm.date" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all [color-scheme:light] dark:[color-scheme:dark]">
          </div>
        </div>
        
        <div class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
          <button @click="showPenyesuaianModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Batal</button>
          <button @click="simpanPenyesuaian" :disabled="penyesuaianDiff === 0 || isSaving" class="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg shadow-sm transition-colors">
            {{ isSaving ? 'Memproses...' : 'Sesuaikan Saldo' }}
          </button>
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
                <option value="">Pilih Rekening Asal</option>
                <option v-for="rek in keuanganStore.activeBankKas" :key="rek.id" :value="rek.id">{{ rek.name }} (Rp {{ formatCurrencyLocal(rek.balance) }})</option>
              </select>
            </div>
            <div class="space-y-1">
              <label class="block text-sm font-medium text-emerald-600 dark:text-emerald-400">Ke Rekening</label>
              <select v-model="mutasiForm.to" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
                <option value="">Pilih Rekening Tujuan</option>
                <option v-for="rek in keuanganStore.activeBankKas" :key="rek.id" :value="rek.id" :disabled="rek.id === mutasiForm.from">{{ rek.name }}</option>
              </select>
            </div>
            <div class="sm:col-span-2 space-y-1">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Alokasi Dana <span v-if="isMutasiLoading" class="inline-block animate-spin w-3 h-3 border-2 border-secondary border-t-transparent rounded-full ml-2"></span></label>
              <select v-model="mutasiForm.program_id" :disabled="!mutasiForm.from || isMutasiLoading" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-900">
                <option value="" disabled v-if="!mutasiForm.from">Pilih rekening asal terlebih dahulu</option>
                <template v-else>
                  <option value="ALL" class="font-bold text-secondary">Pindahkan Seluruh Saldo & Program</option>
                  <option value="">Kas Umum / Tanpa Program (Saldo: {{ mutasiKasUmumBalance < 0 ? '-' : '' }}Rp {{ formatCurrencyLocal(Math.abs(mutasiKasUmumBalance)) }})</option>
                  <option v-for="p in mutasiProgramOptions" :key="p.program_id" :value="p.program_id">
                    {{ p.nama_program }} (Saldo: {{ p.saldo < 0 ? '-' : '' }}Rp {{ formatCurrencyLocal(Math.abs(p.saldo)) }})
                  </option>
                </template>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nominal Mutasi <span class="text-rose-500">*</span></label>
                <button v-if="mutasiForm.from && mutasiForm.program_id !== 'ALL'" @click="mutasiForm.amount = Math.max(0, mutasiSelectedBalance - (mutasiForm.adminFee || 0))" class="text-xs font-medium text-secondary hover:text-yellow-600 transition-colors">Mutasi Semua</button>
              </div>
              <input type="number" v-model="mutasiForm.amount" :disabled="mutasiForm.program_id === 'ALL'" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-lg font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-900" placeholder="0">
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
          
          <div v-if="mutasiForm.amount && (Number(mutasiForm.amount) + Number(mutasiForm.adminFee || 0) > mutasiSelectedBalance)" class="bg-rose-50 dark:bg-rose-500/10 p-3 rounded-lg flex items-start gap-3 border border-rose-200 dark:border-rose-500/20 text-xs text-rose-600 dark:text-rose-400 leading-relaxed">
            <AlertTriangle class="w-4 h-4 shrink-0 mt-0.5" />
            <p>Total mutasi (termasuk biaya admin) melebihi saldo alokasi yang dipilih (Rp {{ formatCurrencyLocal(mutasiSelectedBalance) }}). Mutasi tidak dapat diproses.</p>
          </div>
          <div v-else-if="mutasiForm.amount && mutasiForm.adminFee" class="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center text-sm">
            <span class="text-gray-600 dark:text-gray-400">Total Potongan Kas Asal:</span>
            <span class="font-bold text-rose-600 dark:text-rose-400">Rp {{ formatCurrencyLocal(Number(mutasiForm.amount) + Number(mutasiForm.adminFee)) }}</span>
          </div>

        </div>
        
        <div class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
          <button @click="showMutasiModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Batal</button>
          <button @click="simpanMutasi" :disabled="isSaving || (mutasiForm.amount && (Number(mutasiForm.amount) + Number(mutasiForm.adminFee || 0) > mutasiSelectedBalance))" class="px-4 py-2 text-sm font-medium text-white bg-secondary hover:bg-yellow-500 rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-secondary">
            {{ isSaving ? 'Memproses...' : 'Proses Mutasi' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { 
  Plus, ArrowLeftRight, Landmark, Wallet, Briefcase, X, 
  Pin, Scale, Pencil, AlertTriangle, Info, ChevronLeft, ChevronRight, Search 
} from 'lucide-vue-next'
import { useKeuanganStore } from '@/stores/keuangan'
import { useToastStore } from '@/stores/toast'
import { formatCurrency as formatCurrencyLocal } from '@/utils/keuangan-mapper'

const keuanganStore = useKeuanganStore()
const toast = useToastStore()

// State untuk Modal & Mode
const showMutasiModal = ref(false)
const showFormRekeningModal = ref(false)
const isEditRekeningMode = ref(false)
const selectedDetailRekening = ref(null)
const showPenyesuaianModal = ref(false)
const penyesuaianTarget = ref(null)
const isSaving = ref(false)

const detailTab = ref('info')
const detailActivities = ref([])
const detailProgramBalances = ref([])
const isDetailLoading = ref(false)

const validChartData = computed(() => detailProgramBalances.value.filter(pb => pb.saldo > 0))
const programChartSeries = computed(() => validChartData.value.map(pb => pb.saldo))
const programChartOptions = computed(() => {
  const isDark = document.documentElement.classList.contains('dark')
  return {
    chart: { type: 'donut', background: 'transparent' },
    labels: validChartData.value.map(pb => pb.nama_program || 'Unknown'),
    theme: { mode: isDark ? 'dark' : 'light' },
    stroke: { show: true, colors: isDark ? ['#1f2937'] : ['#ffffff'], width: 2 },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: { show: true, fontSize: '12px', color: isDark ? '#9ca3af' : '#6b7280' },
            value: {
              show: true,
              fontSize: '14px',
              fontWeight: 600,
              color: isDark ? '#f3f4f6' : '#111827',
              formatter: (val) => 'Rp ' + parseInt(val).toLocaleString('id-ID')
            },
            total: {
              show: true,
              label: 'Total Alokasi',
              color: isDark ? '#9ca3af' : '#6b7280',
              formatter: () => {
                const total = detailProgramBalances.value.reduce((sum, pb) => sum + pb.saldo, 0)
                return 'Rp ' + total.toLocaleString('id-ID')
              }
            }
          }
        }
      }
    },
    tooltip: {
      y: { formatter: (val) => 'Rp ' + parseInt(val).toLocaleString('id-ID') }
    },
    legend: { show: false }
  }
})

watch(selectedDetailRekening, (newVal) => {
  if (newVal) {
    detailTab.value = 'info'
    detailActivities.value = []
    detailProgramBalances.value = []
  }
})

watch(detailTab, async (newVal) => {
  if (!selectedDetailRekening.value) return
  const id = selectedDetailRekening.value.id
  if (newVal === 'aktivitas' && !detailActivities.value.length) {
    isDetailLoading.value = true
    try {
      detailActivities.value = await keuanganStore.fetchBankKasActivities(id)
    } finally {
      isDetailLoading.value = false
    }
  } else if (newVal === 'program' && !detailProgramBalances.value.length) {
    isDetailLoading.value = true
    try {
      detailProgramBalances.value = await keuanganStore.fetchBankKasProgramBalances(id)
    } finally {
      isDetailLoading.value = false
    }
  }
})

const closeAllModals = () => {
  showMutasiModal.value = false
  showFormRekeningModal.value = false
  selectedDetailRekening.value = null
  showPenyesuaianModal.value = false
}

const handleKeydown = (e) => {
  if (e.key === 'Escape') closeAllModals()
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

onMounted(async () => {
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', checkScroll)
  if (cardContainerRef.value) {
    cardContainerRef.value.addEventListener('scroll', checkScroll)
    setTimeout(checkScroll, 100)
  }

  await Promise.all([
    keuanganStore.fetchBankKas(),
    keuanganStore.fetchTransactions({ per_page: 5 }) // Fetch all latest activities
  ])
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
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
    e.preventDefault()
    cardContainerRef.value.scrollBy({ left: e.deltaY > 0 ? 100 : -100, behavior: 'auto' })
  }
}

const scrollCards = (direction) => {
  if (cardContainerRef.value) {
    cardContainerRef.value.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' })
  }
}

// Data Handling
const searchQuery = ref('')
const filterStatus = ref('all') // 'active', 'inactive', 'all'

const sortedRekening = computed(() => {
  return [...keuanganStore.bankKasList]
    .filter(r => {
      const matchSearch = r.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          (r.accountNo && r.accountNo.includes(searchQuery.value))
      if (!matchSearch) return false
      if (filterStatus.value === 'active' && !r.isActive) return false
      if (filterStatus.value === 'inactive' && r.isActive) return false
      return true
    })
    .sort((a, b) => {
      if (a.isPinned !== b.isPinned) return b.isPinned ? 1 : -1
      if (a.isActive !== b.isActive) return b.isActive ? 1 : -1
      return b.balance - a.balance
    })
})

const activityData = computed(() => {
  return keuanganStore.transactions.slice(0, 5)
})

// Modals
const rekForm = ref({ name: '', type: 'Bank', color: 'emerald', accountNo: '', ownerName: '', desc: '', initialBalance: '', isActive: true, qrImage: null, visibilitasPublik: false })
const qrFile = ref(null)

const handleFileUpload = (e) => {
  if (e.target.files.length > 0) {
    qrFile.value = e.target.files[0]
  } else {
    qrFile.value = null
  }
}

const openTambahRekeningModal = () => {
  isEditRekeningMode.value = false
  rekForm.value = { name: '', type: 'Bank', color: 'emerald', accountNo: '', ownerName: '', desc: '', initialBalance: '', isActive: true, qrImage: null, visibilitasPublik: false }
  qrFile.value = null
  showFormRekeningModal.value = true
}

const openEditRekeningModal = (rek) => {
  isEditRekeningMode.value = true
  rekForm.value = { ...rek }
  qrFile.value = null
  selectedDetailRekening.value = null
  showFormRekeningModal.value = true
}

const saveRekening = async () => {
  if (isSaving.value) return
  if (!rekForm.value.name) {
    toast.addToast('Nama rekening wajib diisi', 'error')
    return
  }

  isSaving.value = true
  try {
    if (isEditRekeningMode.value) {
      await keuanganStore.updateBankKas(rekForm.value.id, rekForm.value, qrFile.value)
      toast.addToast('Rekening berhasil diubah', 'success')
    } else {
      await keuanganStore.createBankKas(rekForm.value, qrFile.value)
      toast.addToast('Rekening berhasil ditambahkan', 'success')
    }
    showFormRekeningModal.value = false
  } catch (err) {
    toast.addToast(err.response?.data?.message || 'Gagal menyimpan rekening', 'error')
  } finally {
    isSaving.value = false
  }
}

const openDetailRekening = (rek) => {
  selectedDetailRekening.value = rek
}

const togglePin = async (rek) => {
  try {
    await keuanganStore.updateBankKas(rek.id, { isPinned: !rek.isPinned })
    toast.addToast(rek.isPinned ? 'Rekening dilepaskan' : 'Rekening disematkan', 'success')
  } catch (err) {
    toast.addToast('Gagal merubah status semat', 'error')
  }
}

// Penyesuaian Saldo (Rekonsiliasi)
const penyesuaianForm = ref({ actualBalance: '', reason: '', date: new Date().toISOString().split('T')[0], program_id: '' })
const penyesuaianProgramOptions = ref([])
const isPenyesuaianLoading = ref(false)

const penyesuaianDiff = computed(() => {
  if (!penyesuaianTarget.value || penyesuaianForm.value.actualBalance === '') return 0
  return Number(penyesuaianForm.value.actualBalance) - Number(penyesuaianTarget.value.balance)
})

const penyesuaianKasUmumBalance = computed(() => {
  if (!penyesuaianTarget.value) return 0
  const programTotal = penyesuaianProgramOptions.value.reduce((sum, p) => sum + Number(p.saldo), 0)
  return Number(penyesuaianTarget.value.balance) - programTotal
})

const openPenyesuaianModal = async (rek) => {
  penyesuaianTarget.value = rek
  penyesuaianForm.value = { actualBalance: '', reason: '', date: new Date().toISOString().split('T')[0], program_id: '' }
  penyesuaianProgramOptions.value = []
  showPenyesuaianModal.value = true

  isPenyesuaianLoading.value = true
  try {
    const balances = await keuanganStore.fetchBankKasProgramBalances(rek.id)
    penyesuaianProgramOptions.value = balances.filter(b => b.program_id !== null)
  } catch (err) {
    toast.addToast('Gagal memuat opsi program', 'error')
  } finally {
    isPenyesuaianLoading.value = false
  }
}

const simpanPenyesuaian = async () => {
  if (isSaving.value) return
  if (!penyesuaianForm.value.reason) {
    toast.addToast('Alasan penyesuaian wajib diisi', 'error')
    return
  }
  if (penyesuaianDiff.value !== 0) {
    isSaving.value = true
    try {
      await keuanganStore.adjustBalance(penyesuaianTarget.value.id, {
        targetSaldo: penyesuaianForm.value.actualBalance,
        deskripsi: penyesuaianForm.value.reason,
        date: penyesuaianForm.value.date,
        program_id: penyesuaianForm.value.program_id || null
      })
      toast.addToast('Penyesuaian saldo berhasil disimpan', 'success')
      showPenyesuaianModal.value = false
      selectedDetailRekening.value = null
    } catch (err) {
      toast.addToast(err.response?.data?.message || 'Gagal menyimpan penyesuaian', 'error')
    } finally {
      isSaving.value = false
    }
  }
}

// Mutasi
const mutasiForm = ref({ from: '', to: '', amount: '', adminFee: '', date: new Date().toISOString().split('T')[0], desc: '', program_id: '' })
const mutasiProgramOptions = ref([])
const isMutasiLoading = ref(false)

watch(() => mutasiForm.value.from, async (newVal) => {
  mutasiForm.value.program_id = ''
  mutasiProgramOptions.value = []
  if (newVal) {
    isMutasiLoading.value = true
    try {
      const balances = await keuanganStore.fetchBankKasProgramBalances(newVal)
      mutasiProgramOptions.value = balances.filter(b => b.program_id !== null)
    } catch (err) {
      toast.addToast('Gagal memuat opsi program', 'error')
    } finally {
      isMutasiLoading.value = false
    }
  }
})

const mutasiKasUmumBalance = computed(() => {
  if (!mutasiForm.value.from) return 0
  const fromRek = keuanganStore.activeBankKas.find(r => r.id === mutasiForm.value.from)
  if (!fromRek) return 0
  const programTotal = mutasiProgramOptions.value.reduce((sum, p) => sum + Number(p.saldo), 0)
  return Number(fromRek.balance) - programTotal
})

const mutasiKasTotalBalance = computed(() => {
  if (!mutasiForm.value.from) return 0
  const fromRek = keuanganStore.activeBankKas.find(r => r.id === mutasiForm.value.from)
  return fromRek ? Number(fromRek.balance) : 0
})

const mutasiSelectedBalance = computed(() => {
  if (mutasiForm.value.program_id === 'ALL') {
    return mutasiKasTotalBalance.value
  }
  if (mutasiForm.value.program_id === '') {
    return mutasiKasUmumBalance.value
  }
  const prog = mutasiProgramOptions.value.find(p => p.program_id === mutasiForm.value.program_id)
  return prog ? Number(prog.saldo) : 0
})

watch(() => mutasiForm.value.program_id, (newVal) => {
  if (newVal === 'ALL') {
    mutasiForm.value.amount = Math.max(0, mutasiKasTotalBalance.value - (mutasiForm.value.adminFee || 0))
  }
})

watch(() => mutasiForm.value.adminFee, (newVal) => {
  if (mutasiForm.value.program_id === 'ALL') {
    mutasiForm.value.amount = Math.max(0, mutasiKasTotalBalance.value - (newVal || 0))
  }
})

const openMutasiModal = () => {
  mutasiForm.value = { from: '', to: '', amount: '', adminFee: '', date: new Date().toISOString().split('T')[0], desc: '', program_id: '' }
  mutasiProgramOptions.value = []
  showMutasiModal.value = true
}

const simpanMutasi = async () => {
  if (isSaving.value) return
  if (!mutasiForm.value.from || !mutasiForm.value.to || !mutasiForm.value.amount) {
    toast.addToast('Mohon lengkapi rekening asal, tujuan, dan nominal', 'error')
    return
  }
  if (mutasiForm.value.from === mutasiForm.value.to) {
    toast.addToast('Rekening asal dan tujuan tidak boleh sama', 'error')
    return
  }

  const totalDeduction = Number(mutasiForm.value.amount) + Number(mutasiForm.value.adminFee || 0)
  if (totalDeduction > mutasiSelectedBalance.value) {
    toast.addToast('Saldo alokasi tidak mencukupi untuk mutasi ini', 'error')
    return
  }

  isSaving.value = true
  try {
    if (mutasiForm.value.program_id === 'ALL') {
      await keuanganStore.transferAllBankKas(mutasiForm.value.from, {
        bankKasTujuanId: mutasiForm.value.to,
        biayaAdmin: mutasiForm.value.adminFee,
        description: mutasiForm.value.desc,
        date: mutasiForm.value.date
      })
    } else {
      await keuanganStore.createTransaction({
        type: 'transfer',
        name: 'Mutasi Kas',
        description: mutasiForm.value.desc,
        amount: mutasiForm.value.amount,
        biayaAdmin: mutasiForm.value.adminFee,
        bankKasAsalId: mutasiForm.value.from,
        bankKasTujuanId: mutasiForm.value.to,
        programId: mutasiForm.value.program_id || null,
        date: mutasiForm.value.date
      })
    }
    toast.addToast('Mutasi kas berhasil dicatat', 'success')
    showMutasiModal.value = false
    // Refresh bank_kas to update balances
    await keuanganStore.fetchBankKas()
    // Refresh transactions to show recent transfer in activity table
    await keuanganStore.fetchTransactions({ per_page: 5 })
  } catch (err) {
    toast.addToast(err.response?.data?.message || 'Gagal memproses mutasi', 'error')
  } finally {
    isSaving.value = false
  }
}

// Helpers
const getIcon = (type) => {
  if (type === 'Bank' || type === 'rekening') return Landmark
  if (type === 'Kas Tunai' || type === 'tunai') return Wallet
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
    default: return 'bg-gradient-to-br from-emerald-600 to-teal-800 shadow-emerald-900/20' + opacity
  }
}
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
