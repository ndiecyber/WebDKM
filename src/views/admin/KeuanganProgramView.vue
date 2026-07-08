<template>
  <div class="space-y-6 sm:space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Program & Kegiatan</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Kelola kegiatan masjid dan alokasi dana khusus.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button @click="openModal()" class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2 rounded-lg transition-colors shadow-md text-sm flex items-center gap-2">
          <Plus class="w-4 h-4" />
          <span>Buat Program</span>
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
          @input="debouncedSearch"
          type="text" 
          placeholder="Cari program atau kegiatan..." 
          class="block w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary sm:text-sm transition-colors shadow-sm"
        />
      </div>
      <div class="flex items-center gap-2 w-full md:w-auto shrink-0">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Status:</label>
        <select v-model="filterStatus" @change="refetchPrograms" class="w-full md:w-auto bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all shadow-sm">
          <option value="all">Semua Status</option>
          <option value="aktif">Aktif Saja</option>
          <option value="selesai">Selesai</option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="keuanganStore.loading.programs" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl p-12 shadow-md flex items-center justify-center">
      <div class="flex flex-col items-center gap-3">
        <div class="w-8 h-8 border-3 border-gray-200 dark:border-gray-700 border-t-secondary rounded-full animate-spin"></div>
        <p class="text-sm text-gray-500">Memuat program...</p>
      </div>
    </div>

    <!-- View: Table Program -->
    <div v-else-if="keuanganStore.programs.length > 0" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl overflow-hidden shadow-md">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-600 dark:text-gray-400 min-w-[800px]">
          <thead class="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-white/5">
            <tr class="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <th scope="col" class="px-4 py-3 font-bold w-[35%]">Program & Kegiatan</th>
              <th scope="col" class="px-4 py-3 font-bold w-[25%]">Periode & Status</th>
              <th scope="col" class="px-4 py-3 font-bold w-[25%]">Keuangan</th>
              <th scope="col" class="px-4 py-3 font-bold text-right w-[15%]">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-white/5">
            <tr v-for="program in keuanganStore.programs" :key="program.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
              <!-- Program Info -->
              <td class="px-4 py-3">
                <div class="flex items-start gap-3">
                  <div class="bg-emerald-50 dark:bg-emerald-500/10 p-2.5 rounded-xl shrink-0 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20">
                    <CalendarDays class="w-5 h-5" />
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900 dark:text-white leading-tight mb-1">{{ program.name }}</h3>
                    <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2" :title="program.description">{{ program.description }}</p>
                  </div>
                </div>
              </td>
              <!-- Periode & Status -->
              <td class="px-4 py-3 whitespace-nowrap">
                <div class="space-y-2">
                  <p class="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1.5 font-medium">
                    <Clock class="w-3.5 h-3.5" /> {{ formatDate(program.startDate) }} - {{ formatDate(program.endDate) }}
                  </p>
                  <div>
                    <span v-if="program.status === 'Aktif'" class="px-2.5 py-1 text-[10px] font-medium rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 ring-1 ring-emerald-500/20 shadow-sm uppercase tracking-wider">Aktif</span>
                    <span v-else class="px-2.5 py-1 text-[10px] font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 ring-1 ring-gray-300 dark:ring-white/10 shadow-sm uppercase tracking-wider">Selesai</span>
                  </div>
                </div>
              </td>
              <!-- Keuangan -->
              <td class="px-4 py-3 whitespace-nowrap">
                <div class="space-y-1">
                  <div class="flex justify-between items-center text-xs gap-4">
                    <span class="text-gray-500 dark:text-gray-400 flex items-center gap-1"><ArrowDownLeft class="w-3 h-3 text-emerald-500"/> In</span>
                    <span class="font-medium text-emerald-600 dark:text-emerald-400">Rp {{ formatCurrencyLocal(program.pemasukan) }}</span>
                  </div>
                  <div class="flex justify-between items-center text-xs gap-4">
                    <span class="text-gray-500 dark:text-gray-400 flex items-center gap-1"><ArrowUpRight class="w-3 h-3 text-rose-500"/> Out</span>
                    <span class="font-medium text-rose-600 dark:text-rose-400">Rp {{ formatCurrencyLocal(program.pengeluaran) }}</span>
                  </div>
                  <div class="pt-1.5 border-t border-gray-100 dark:border-white/5 flex justify-between items-center gap-4">
                    <span class="text-xs font-semibold text-gray-700 dark:text-gray-300">Sisa</span>
                    <span class="text-sm font-bold text-gray-900 dark:text-white">Rp {{ formatCurrencyLocal(program.sisaSaldo) }}</span>
                  </div>
                </div>
              </td>
              <!-- Aksi -->
              <td class="px-4 py-3 whitespace-nowrap text-right align-top w-[1%]">
                <div class="flex flex-col items-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div class="flex items-center gap-1">
                    <button @click="openDetailModal(program)" class="text-gray-400 hover:text-secondary bg-gray-50 dark:bg-gray-800 hover:bg-yellow-50 dark:hover:bg-yellow-500/10 p-1.5 rounded-lg transition-colors border border-gray-200 dark:border-white/10" title="Detail & Riwayat">
                      <Eye class="w-3.5 h-3.5" />
                    </button>
                    <button @click="openModal(program)" class="text-gray-400 hover:text-blue-500 bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-500/10 p-1.5 rounded-lg transition-colors border border-gray-200 dark:border-white/10" title="Edit">
                      <Pencil class="w-3.5 h-3.5" />
                    </button>
                    <button @click="deleteProgram(program.id)" class="text-gray-400 hover:text-rose-500 bg-gray-50 dark:bg-gray-800 hover:bg-rose-50 dark:hover:bg-rose-500/10 p-1.5 rounded-lg transition-colors border border-gray-200 dark:border-white/10" title="Hapus">
                      <Trash2 class="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button 
                    v-if="program.sisaSaldo > 0"
                    @click="openRolloverModal(program)" 
                    class="text-[10px] font-medium px-2.5 py-1.5 w-full rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 dark:hover:bg-emerald-500/20 transition-colors shadow-sm"
                  >
                    {{ program.status === 'Aktif' ? 'Tutup & Pindahkan Dana' : 'Pindahkan Sisa Dana' }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Pagination -->
      <div class="p-4 border-t border-gray-300 dark:border-white/5 flex items-center justify-between text-xs text-gray-500 bg-gray-50 dark:bg-gray-950/30">
        <span>Menampilkan {{ keuanganStore.programs.length === 0 ? 0 : ((keuanganStore.pagination.programs.page - 1) * keuanganStore.pagination.programs.perPage) + 1 }}-{{ Math.min(keuanganStore.pagination.programs.page * keuanganStore.pagination.programs.perPage, keuanganStore.pagination.programs.total) }} dari {{ keuanganStore.pagination.programs.total }} program</span>
        <div class="flex items-center gap-1">
          <button @click="goToPage(keuanganStore.pagination.programs.page - 1)" :disabled="keuanganStore.pagination.programs.page <= 1" class="p-1 rounded hover:bg-gray-200 dark:hover:bg-white/5 disabled:opacity-50 transition-colors">
            <ChevronLeft class="w-4 h-4" />
          </button>
          <button 
            v-for="page in visiblePages" 
            :key="page"
            @click="goToPage(page)"
            :class="['w-6 h-6 rounded text-sm flex items-center justify-center transition-colors', keuanganStore.pagination.programs.page === page ? 'bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white font-medium' : 'hover:bg-gray-200 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400']"
          >
            {{ page }}
          </button>
          <button @click="goToPage(keuanganStore.pagination.programs.page + 1)" :disabled="keuanganStore.pagination.programs.page >= keuanganStore.pagination.programs.lastPage" class="p-1 rounded hover:bg-gray-200 dark:hover:bg-white/5 disabled:opacity-50 transition-colors">
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-else class="text-center py-16 bg-white dark:bg-gray-900 rounded-xl ring-1 ring-gray-200 dark:ring-white/10 shadow-sm">
      <div class="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-gray-200 dark:ring-white/10">
        <FolderOpen class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Tidak Ada Program</h3>
      <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto mt-2 mb-6 text-sm">
        Data program tidak ditemukan. Buat program untuk memisahkan pencatatan dana secara logis.
      </p>
      <button @click="openModal()" class="bg-secondary hover:bg-yellow-500 text-white font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm text-sm inline-flex items-center gap-2">
        <Plus class="w-4 h-4" />
        <span>Buat Program Baru</span>
      </button>
    </div>

    <!-- Modal Form Program -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
        <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="showModal = false"></div>
      
        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all relative z-10 animate-fade-in-up">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ isEditing ? 'Edit Program' : 'Buat Program Baru' }}</h3>
            <button @click="showModal = false" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              <X class="w-5 h-5" />
            </button>
          </div>
          
          <div class="p-6 space-y-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Program/Kegiatan <span class="text-rose-500">*</span></label>
              <input type="text" v-model="form.name" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" placeholder="Contoh: Panitia Qurban 1446H">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi Singkat</label>
              <textarea v-model="form.description" rows="2" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" placeholder="Keterangan program..."></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mulai <span class="text-rose-500">*</span></label>
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
                <label class="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" v-model="form.status" value="Aktif" class="text-secondary focus:ring-secondary w-4 h-4 bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700">
                  <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">Aktif</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" v-model="form.status" value="Selesai" class="text-secondary focus:ring-secondary w-4 h-4 bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700">
                  <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">Selesai</span>
                </label>
              </div>
            </div>
          </div>
          
          <div class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
            <button @click="showModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Batal</button>
            <button @click="saveProgram" :disabled="isSaving" class="px-4 py-2 text-sm font-medium text-white bg-secondary hover:bg-yellow-500 rounded-lg shadow-sm transition-colors">
              {{ isSaving ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Modal Detail Program -->
    <Teleport to="body">
      <div v-if="showDetailModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
        <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="showDetailModal = false"></div>
      
        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden transform transition-all relative z-10 animate-fade-in-up flex flex-col max-h-[90vh]">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between shrink-0">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Eye class="w-5 h-5 text-gray-500" /> Detail Program
            </h3>
            <button @click="showDetailModal = false" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              <X class="w-5 h-5" />
            </button>
          </div>
          
          <div class="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
            <div v-if="selectedDetailProgram">
              <div class="mb-4">
                <h4 class="text-xl font-bold text-gray-900 dark:text-white">{{ selectedDetailProgram.name }}</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ selectedDetailProgram.description }}</p>
                <div class="flex flex-wrap gap-3 mt-3">
                  <span class="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 ring-1 ring-gray-300 dark:ring-white/10 shadow-sm flex items-center gap-1.5">
                    <Clock class="w-3.5 h-3.5" /> {{ formatDate(selectedDetailProgram.startDate) }} - {{ formatDate(selectedDetailProgram.endDate) }}
                  </span>
                  <span v-if="selectedDetailProgram.status === 'Aktif'" class="px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 ring-1 ring-emerald-500/20 shadow-sm">
                    Aktif
                  </span>
                  <span v-else class="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 ring-1 ring-gray-300 dark:ring-white/10 shadow-sm">
                    Selesai
                  </span>
                </div>
              </div>

              <!-- Financial Summary -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="bg-gray-50 dark:bg-gray-950/50 p-4 rounded-xl ring-1 ring-gray-200 dark:ring-white/5 shadow-sm">
                  <p class="text-xs font-medium text-gray-500 dark:text-gray-400">Total Pemasukan</p>
                  <p class="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1">Rp {{ formatCurrencyLocal(selectedDetailProgram.pemasukan) }}</p>
                </div>
                <div class="bg-gray-50 dark:bg-gray-950/50 p-4 rounded-xl ring-1 ring-gray-200 dark:ring-white/5 shadow-sm">
                  <p class="text-xs font-medium text-gray-500 dark:text-gray-400">Total Pengeluaran</p>
                  <p class="text-lg font-bold text-rose-600 dark:text-rose-400 mt-1">Rp {{ formatCurrencyLocal(selectedDetailProgram.pengeluaran) }}</p>
                </div>
                <div class="bg-blue-50 dark:bg-blue-500/10 p-4 rounded-xl ring-1 ring-blue-200 dark:ring-blue-500/20 shadow-sm">
                  <p class="text-xs font-medium text-blue-700 dark:text-blue-400">Total Sisa Saldo</p>
                  <p class="text-lg font-bold text-blue-800 dark:text-blue-300 mt-1">Rp {{ formatCurrencyLocal(selectedDetailProgram.sisaSaldo) }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50 flex flex-col sm:flex-row gap-2 justify-end shrink-0">
            <button @click="goToTransactions(selectedDetailProgram.id)" class="w-full sm:w-auto px-4 py-2 text-sm font-medium text-secondary hover:text-white border border-secondary hover:bg-secondary rounded-lg transition-colors shadow-sm bg-white dark:bg-gray-900">Lihat Riwayat Transaksi</button>
            <button @click="showDetailModal = false" class="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">Tutup</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Modal Rollover -->
    <Teleport to="body">
      <div v-if="showRolloverModal" class="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-0">
        <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="showRolloverModal = false"></div>
        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all relative z-10 flex flex-col max-h-[90vh]">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex justify-between items-center shrink-0">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Scale class="w-5 h-5 text-secondary" />
              Pindahkan Sisa Dana
            </h3>
            <button @click="showRolloverModal = false" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <X class="w-5 h-5" />
            </button>
          </div>
          
          <div class="p-6 overflow-y-auto custom-scrollbar">
            <div v-if="isRolloverLoading" class="flex justify-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
            </div>
            <form v-else @submit.prevent="submitRollover" class="space-y-4">
              <!-- Warning Banner -->
              <div class="bg-yellow-50 dark:bg-yellow-500/10 p-4 rounded-xl ring-1 ring-yellow-200 dark:ring-yellow-500/20 flex gap-3">
                <AlertCircle class="w-5 h-5 text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5" />
                <p class="text-sm text-yellow-800 dark:text-yellow-200">
                  Proses ini akan menarik seluruh sisa dana yang tersisa dari rekening asalnya. <strong class="font-semibold">Setelah proses ini selesai, program akan otomatis ditutup (berstatus Selesai).</strong>
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Program (Penerima)</label>
                <div class="space-y-2">
                  <label class="flex items-center p-3 border rounded-lg cursor-pointer transition-colors" :class="rolloverForm.target_type === 'umum' ? 'bg-secondary/5 border-secondary dark:bg-secondary/10' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'">
                    <input type="radio" v-model="rolloverForm.target_type" value="umum" class="w-4 h-4 text-secondary border-gray-300 focus:ring-secondary">
                    <span class="ml-3 block text-sm font-medium text-gray-900 dark:text-white">Kembalikan ke Kas Umum</span>
                  </label>
                  <label class="flex items-center p-3 border rounded-lg cursor-pointer transition-colors" :class="rolloverForm.target_type === 'program' ? 'bg-secondary/5 border-secondary dark:bg-secondary/10' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'">
                    <input type="radio" v-model="rolloverForm.target_type" value="program" class="w-4 h-4 text-secondary border-gray-300 focus:ring-secondary">
                    <span class="ml-3 block text-sm font-medium text-gray-900 dark:text-white">Salurkan ke Program Lain</span>
                  </label>
                </div>
                
                <div v-if="rolloverForm.target_type === 'program'" class="mt-3">
                  <select v-model="rolloverForm.target_program_id" required class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
                    <option value="" disabled selected>Pilih Program...</option>
                    <option v-for="p in activeProgramsForRollover" :key="p.id" :value="p.id">{{ p.name }}</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi (Opsional)</label>
                <textarea v-model="rolloverForm.deskripsi" rows="2" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all placeholder-gray-400" placeholder="Catatan mutasi dana..."></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sumber Dana yang Akan Dipindahkan</label>
                <div class="bg-blue-50 dark:bg-blue-500/10 p-4 rounded-xl ring-1 ring-blue-200 dark:ring-blue-500/20 shadow-sm space-y-3">
                  <div v-for="source in rolloverSources" :key="source.bank_kas_id" class="flex justify-between items-center pb-2 border-b border-blue-200/50 dark:border-blue-500/20 last:border-0 last:pb-0">
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ source.nama_kas }}</span>
                    <span class="text-sm font-bold text-gray-900 dark:text-white">Rp {{ formatCurrencyLocal(source.amount) }}</span>
                  </div>
                </div>
              </div>
              
              <div class="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
                <button type="button" @click="showRolloverModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Batal</button>
                <button type="submit" :disabled="isSubmittingRollover" class="px-4 py-2 text-sm font-medium text-white bg-secondary hover:bg-secondary/90 rounded-lg transition-colors flex items-center justify-center min-w-[100px] disabled:opacity-70">
                  <div v-if="isSubmittingRollover" class="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white mr-2"></div>
                  Pindahkan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, X, Pencil, Trash, CalendarDays, Clock, FolderOpen, AlertCircle, Eye, Wallet, ArrowDownLeft, ArrowUpRight, Scale, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useKeuanganStore } from '@/stores/keuangan'
import { useToastStore } from '@/stores/toast'
import { useDialogStore } from '@/stores/dialog'
import { formatCurrency as formatCurrencyLocal } from '@/utils/keuangan-mapper'

const router = useRouter()
const keuanganStore = useKeuanganStore()
const toast = useToastStore()
const dialog = useDialogStore()

const showModal = ref(false)
const isEditing = ref(false)
const isSaving = ref(false)
const form = ref({ id: null, name: '', description: '', startDate: '', endDate: '', status: 'Aktif' })

const showDetailModal = ref(false)
const selectedDetailProgram = ref(null)

const showRolloverModal = ref(false)
const rolloverForm = ref({ target_type: 'umum', target_program_id: '', deskripsi: '' })
const rolloverSources = ref([])
const isRolloverLoading = ref(false)
const isSubmittingRollover = ref(false)
const rolloverProgramId = ref(null)

const activeProgramsForRollover = computed(() => {
  if (!rolloverProgramId.value) return []
  return keuanganStore.programs.filter(p => p.status === 'Aktif' && p.id !== rolloverProgramId.value)
})

const openRolloverModal = async (program) => {
  if (showDetailModal.value) showDetailModal.value = false
  rolloverProgramId.value = program.id
  showRolloverModal.value = true
  rolloverForm.value = { target_type: 'umum', target_program_id: '', deskripsi: '' }
  rolloverSources.value = []
  isRolloverLoading.value = true
  
  try {
    const balances = await keuanganStore.fetchProgramPhysicalBalances(program.id)
    rolloverSources.value = balances.map(b => ({
      bank_kas_id: b.bank_kas_id,
      nama_kas: b.nama_kas,
      amount: b.saldo
    }))
  } catch (err) {
    toast.addToast('Gagal memuat rincian saldo fisik', 'error')
    showRolloverModal.value = false
  } finally {
    isRolloverLoading.value = false
  }
}

const submitRollover = async () => {
  if (isSubmittingRollover.value) return
  isSubmittingRollover.value = true
  
  try {
    const payload = {
      target_program_id: rolloverForm.value.target_type === 'program' ? rolloverForm.value.target_program_id : null,
      deskripsi: rolloverForm.value.deskripsi,
      sources: rolloverSources.value.map(s => ({
        bank_kas_id: s.bank_kas_id,
        amount: s.amount
      }))
    }
    await keuanganStore.rolloverProgram(rolloverProgramId.value, payload)
    toast.addToast('Sisa dana berhasil dipindahkan, program selesai', 'success')
    showRolloverModal.value = false
    rolloverProgramId.value = null
    refetchPrograms(keuanganStore.pagination.programs.page)
  } catch (err) {
    toast.addToast(err.response?.data?.message || 'Gagal memindahkan sisa dana', 'error')
  } finally {
    isSubmittingRollover.value = false
  }
}

const searchQuery = ref('')
const filterStatus = ref('all') // 'aktif', 'selesai', 'all'

let searchTimeout = null
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => refetchPrograms(), 400)
}

onMounted(() => {
  refetchPrograms()
})

onUnmounted(() => {
  clearTimeout(searchTimeout)
})

const buildQueryParams = () => {
  const params = {}
  if (searchQuery.value) params.search = searchQuery.value
  if (filterStatus.value !== 'all') params.status = filterStatus.value
  return params
}

const refetchPrograms = (page = 1) => {
  const params = buildQueryParams()
  params.page = page
  keuanganStore.fetchPrograms(params)
}

// Pagination
const visiblePages = computed(() => {
  const { page, lastPage } = keuanganStore.pagination.programs
  const pages = []
  const start = Math.max(1, page - 2)
  const end = Math.min(lastPage, page + 2)
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})

const goToPage = (page) => {
  if (page < 1 || page > keuanganStore.pagination.programs.lastPage) return
  refetchPrograms(page)
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(date)
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

const openDetailModal = (program) => {
  selectedDetailProgram.value = program
  showDetailModal.value = true
}

const goToTransactions = (programId) => {
  showDetailModal.value = false
  router.push({ name: 'admin-keuangan-transaksi', query: { program_id: programId } })
}

const saveProgram = async () => {
  if (!form.value.name || !form.value.startDate) {
    toast.addToast('Harap lengkapi nama dan tanggal mulai', 'error')
    return
  }
  isSaving.value = true
  try {
    if (isEditing.value) {
      await keuanganStore.updateProgram(form.value.id, form.value)
      toast.addToast('Program berhasil diperbarui', 'success')
    } else {
      await keuanganStore.createProgram(form.value)
      toast.addToast('Program baru berhasil dibuat', 'success')
    }
    showModal.value = false
    refetchPrograms(keuanganStore.pagination.programs.page)
  } catch (err) {
    toast.addToast(err.response?.data?.message || 'Gagal menyimpan program', 'error')
  } finally {
    isSaving.value = false
  }
}

const deleteProgram = async (id) => {
  const confirmed = await dialog.open({
    title: 'Hapus Program',
    message: 'Apakah Anda yakin ingin menghapus program ini?',
    type: 'confirm',
    confirmText: 'Hapus',
    cancelText: 'Batal'
  })
  if (confirmed) {
    try {
      await keuanganStore.deleteProgram(id)
      toast.addToast('Program berhasil dihapus', 'success')
      refetchPrograms(keuanganStore.pagination.programs.page)
    } catch (err) {
      toast.addToast('Gagal menghapus program', 'error')
    }
  }
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
