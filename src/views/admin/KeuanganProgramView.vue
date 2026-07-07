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
    <div v-if="keuanganStore.programs.length > 0" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-4 shadow-md relative z-20">
      
      <div class="relative flex-1">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search class="w-4 h-4 text-gray-400" />
        </div>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Cari program atau kegiatan..." 
          class="block w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary sm:text-sm transition-colors shadow-sm"
        />
      </div>
      <div class="flex items-center gap-2 w-full md:w-auto shrink-0">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">Status:</label>
        <select v-model="filterStatus" class="w-full md:w-auto bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all shadow-sm">
          <option value="all">Semua Status</option>
          <option value="Aktif">Aktif Saja</option>
          <option value="Selesai">Selesai</option>
        </select>
      </div>
    </div>

    <!-- View: Table Program -->
    <div v-if="filteredPrograms.length > 0" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl overflow-hidden shadow-md">
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
            <tr v-for="program in filteredPrograms" :key="program.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
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
                    <span class="font-medium text-emerald-600 dark:text-emerald-400">Rp {{ formatCurrency(getProgramBalance(program.id).in) }}</span>
                  </div>
                  <div class="flex justify-between items-center text-xs gap-4">
                    <span class="text-gray-500 dark:text-gray-400 flex items-center gap-1"><ArrowUpRight class="w-3 h-3 text-rose-500"/> Out</span>
                    <span class="font-medium text-rose-600 dark:text-rose-400">Rp {{ formatCurrency(getProgramBalance(program.id).out) }}</span>
                  </div>
                  <div class="pt-1.5 border-t border-gray-100 dark:border-white/5 flex justify-between items-center gap-4">
                    <span class="text-xs font-semibold text-gray-700 dark:text-gray-300">Sisa</span>
                    <span class="text-sm font-bold text-gray-900 dark:text-white">Rp {{ formatCurrency(getProgramBalance(program.id).total) }}</span>
                  </div>
                </div>
              </td>
              <!-- Aksi -->
              <td class="px-4 py-3 whitespace-nowrap text-right align-top w-[1%]">
                <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
                <div v-if="program.status === 'Selesai' && getProgramBalance(program.id).total > 0" class="mt-2 flex justify-end">
                  <button @click="openRolloverModal(program)" class="px-3 py-1.5 text-[11px] font-medium bg-white dark:bg-gray-800 text-secondary border border-secondary/30 rounded-md hover:bg-secondary hover:text-white transition-colors">
                    Salurkan Sisa Dana
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty State for Search -->
    <div v-else-if="keuanganStore.programs.length > 0 && filteredPrograms.length === 0" class="py-12 flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
      <Search class="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Tidak ada program yang cocok</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Coba ubah kata kunci pencarian atau filter status.</p>
    </div>
    
    <!-- Empty State -->
    <div v-else class="text-center py-16 bg-white dark:bg-gray-900 rounded-xl ring-1 ring-gray-200 dark:ring-white/10 shadow-sm">
      <div class="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-gray-200 dark:ring-white/10">
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
              <p v-if="form.status === 'Selesai'" class="text-xs text-amber-600 dark:text-amber-500 mt-2 flex items-start gap-1">
                <AlertCircle class="w-3.5 h-3.5 shrink-0" /> Program yang selesai akan memunculkan opsi penyaluran sisa dana.
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
                  <p class="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1">Rp {{ formatCurrency(getProgramBalance(selectedDetailProgram.id).in) }}</p>
                </div>
                <div class="bg-gray-50 dark:bg-gray-950/50 p-4 rounded-xl ring-1 ring-gray-200 dark:ring-white/5 shadow-sm">
                  <p class="text-xs font-medium text-gray-500 dark:text-gray-400">Total Pengeluaran</p>
                  <p class="text-lg font-bold text-rose-600 dark:text-rose-400 mt-1">Rp {{ formatCurrency(getProgramBalance(selectedDetailProgram.id).out) }}</p>
                </div>
                <div class="bg-blue-50 dark:bg-blue-500/10 p-4 rounded-xl ring-1 ring-blue-200 dark:ring-blue-500/20 shadow-sm">
                  <p class="text-xs font-medium text-blue-700 dark:text-blue-400">Total Sisa Saldo</p>
                  <p class="text-lg font-bold text-blue-800 dark:text-blue-300 mt-1">Rp {{ formatCurrency(getProgramBalance(selectedDetailProgram.id).total) }}</p>
                </div>
              </div>

              <!-- Komposisi Saldo Rekening Fisik -->
              <div class="mt-6">
                <h5 class="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Wallet class="w-4 h-4 text-gray-500" /> Posisi Saldo Fisik
                </h5>
                <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-white/10 rounded-xl overflow-hidden shadow-sm">
                  <table class="w-full text-left text-sm">
                    <thead class="bg-gray-50 dark:bg-gray-950/50 text-gray-500 text-xs uppercase">
                      <tr>
                        <th class="px-4 py-2.5 font-medium border-b border-gray-200 dark:border-white/5">Rekening / Kas Fisik</th>
                        <th class="px-4 py-2.5 font-medium text-right border-b border-gray-200 dark:border-white/5">Porsi Saldo Program</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 dark:divide-white/5">
                      <tr v-for="item in getPhysicalBalances(selectedDetailProgram.id)" :key="item.account" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                        <td class="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">{{ item.account }}</td>
                        <td class="px-4 py-3 text-right font-bold text-gray-900 dark:text-white">Rp {{ formatCurrency(item.amount) }}</td>
                      </tr>
                      <tr v-if="getPhysicalBalances(selectedDetailProgram.id).length === 0">
                        <td colspan="2" class="px-4 py-6 text-center text-gray-500 dark:text-gray-400">Tidak ada saldo tersisa di rekening manapun.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-start gap-1.5">
                  <AlertCircle class="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  Rincian ini menunjukkan secara fisik di mana uang program tersebut mengendap berdasarkan mutasi yang pernah terjadi.
                </p>
              </div>

            </div>
          </div>
          
          <div class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50 flex justify-between shrink-0">
            <button @click="goToTransactions(selectedDetailProgram.id)" class="px-4 py-2 text-sm font-medium text-secondary hover:text-white border border-secondary hover:bg-secondary rounded-lg transition-colors shadow-sm bg-white dark:bg-gray-900">Lihat Riwayat Transaksi</button>
            <button @click="showDetailModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">Tutup</button>
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
            <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Scale class="w-5 h-5 text-gray-500" /> Salurkan Sisa Dana
            </h3>
            <button @click="showRolloverModal = false" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              <X class="w-5 h-5" />
            </button>
          </div>
          
          <div class="p-6 space-y-5">
            <div class="bg-blue-50 dark:bg-blue-500/10 p-4 rounded-xl border border-blue-100 dark:border-blue-500/20 text-center relative overflow-hidden shadow-inner">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-transparent dark:from-blue-500/10 opacity-50"></div>
              <div class="relative z-10">
                <p class="text-sm font-medium text-blue-700 dark:text-blue-400">Total Sisa Dana Program</p>
                <p class="text-2xl font-bold text-blue-800 dark:text-blue-300 mt-1">Rp {{ formatCurrency(getProgramBalance(selectedProgram.id).total) }}</p>
                <p class="text-xs text-blue-600 dark:text-blue-500 mt-1 font-medium">{{ selectedProgram.name }}</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pilih Rekening & Nominal Penyaluran <span class="text-rose-500">*</span></label>
              
              <div class="space-y-3">
                <div v-for="(source, index) in rolloverForm.sources" :key="index" class="bg-gray-50 dark:bg-gray-950/50 p-3 rounded-xl ring-1 ring-gray-200 dark:ring-white/10 flex flex-col sm:flex-row sm:items-center gap-3">
                  <label class="flex items-center gap-3 flex-1 cursor-pointer">
                    <input type="checkbox" v-model="source.selected" class="text-secondary focus:ring-secondary w-4 h-4 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded">
                    <div>
                      <p class="text-sm font-medium text-gray-900 dark:text-white">{{ source.account }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">Saldo: Rp {{ formatCurrency(source.maxAmount) }}</p>
                    </div>
                  </label>
                  <div class="w-full sm:w-40 shrink-0">
                    <div class="relative" :class="{ 'opacity-50 pointer-events-none': !source.selected }">
                      <div class="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                        <span class="text-gray-500 dark:text-gray-400 text-xs font-medium">Rp</span>
                      </div>
                      <input type="number" v-model="source.amount" :max="source.maxAmount" class="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg pl-7 pr-2.5 py-1.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" placeholder="0">
                    </div>
                  </div>
                </div>
              </div>
              
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-start gap-1">
                <AlertCircle class="w-3.5 h-3.5 shrink-0 mt-0.5" /> Pilih rekening yang ingin dikurangi saldonya, dan sesuaikan nominal jika perlu.
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tujuan Penyaluran <span class="text-rose-500">*</span></label>
              <select v-model="rolloverForm.targetProgramId" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
                <option value="general">Kas Umum (Default)</option>
                <optgroup label="Program Aktif">
                  <option v-for="p in activePrograms" :key="p.id" :value="p.id" :disabled="p.id === selectedProgram.id">
                    {{ p.name }}
                  </option>
                </optgroup>
              </select>
            </div>
            
          </div>
          
          <div class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
            <button @click="showRolloverModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">Batal</button>
            <button @click="executeRollover" :disabled="!isRolloverValid" :class="['px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm transition-colors', isRolloverValid ? 'bg-secondary hover:bg-yellow-500' : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-50']">Proses Penyaluran</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, X, Pencil, Trash, CalendarDays, Clock, FolderOpen, AlertCircle, Eye, Wallet, ArrowDownLeft, ArrowUpRight, Scale, Trash2, Search } from 'lucide-vue-next'
import { useKeuanganStore } from '@/stores/keuangan'
import { useToastStore } from '@/stores/toast'
import { useDialogStore } from '@/stores/dialog'

const router = useRouter()
const keuanganStore = useKeuanganStore()
const toast = useToastStore()
const dialog = useDialogStore()

const showModal = ref(false)
const isEditing = ref(false)
const form = ref({ id: null, name: '', description: '', startDate: '', endDate: '', status: 'Aktif' })

const showDetailModal = ref(false)
const selectedDetailProgram = ref(null)

const showRolloverModal = ref(false)
const selectedProgram = ref(null)
const rolloverForm = ref({ targetProgramId: 'general', sources: [] })

const activePrograms = computed(() => keuanganStore.programs.filter(p => p.status === 'Aktif'))

const searchQuery = ref('')
const filterStatus = ref('all') // 'Aktif', 'Selesai', 'all'

const filteredPrograms = computed(() => {
  return keuanganStore.programs.filter(p => {
    // Filter Status
    if (filterStatus.value !== 'all' && p.status !== filterStatus.value) return false
    
    // Filter Search
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      const matchName = p.name.toLowerCase().includes(query)
      const matchDesc = p.description && p.description.toLowerCase().includes(query)
      return matchName || matchDesc
    }
    return true
  }).sort((a, b) => {
    if (a.status === b.status) return b.id - a.id;
    return a.status === 'Aktif' ? -1 : 1;
  });
})

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

const getPhysicalBalances = (programId) => {
  const accountBals = keuanganStore.accountBalances
  const results = []
  for (const accName in accountBals) {
    if (accountBals[accName].programs[programId] && accountBals[accName].programs[programId] > 0) {
      results.push({
        account: accName,
        amount: accountBals[accName].programs[programId]
      })
    }
  }
  return results
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

const deleteProgram = async (id) => {
  const confirmed = await dialog.open({
    title: 'Hapus Program',
    message: 'Apakah Anda yakin ingin menghapus program ini? Transaksi terkait mungkin akan kehilangan relasi logisnya.',
    type: 'confirm',
    confirmText: 'Hapus',
    cancelText: 'Batal'
  })
  if (confirmed) {
    keuanganStore.deleteProgram(id)
    toast.showToast('Program berhasil dihapus', 'success')
  }
}

const openRolloverModal = (program) => {
  selectedProgram.value = program
  const sources = getPhysicalBalances(program.id)
  
  rolloverForm.value = { 
    targetProgramId: 'general', 
    sources: sources.map(s => ({
      account: s.account,
      amount: s.amount,
      maxAmount: s.amount,
      selected: true
    }))
  }
  showRolloverModal.value = true
}

const isRolloverValid = computed(() => {
  const activeSources = rolloverForm.value.sources.filter(s => s.selected)
  if (activeSources.length === 0) return false
  
  return activeSources.every(s => s.amount > 0 && s.amount <= s.maxAmount)
})

const executeRollover = () => {
  if (!isRolloverValid.value) return

  const targetId = rolloverForm.value.targetProgramId === 'general' ? null : parseInt(rolloverForm.value.targetProgramId)
  
  const activeSources = rolloverForm.value.sources.filter(s => s.selected && s.amount > 0)
  
  activeSources.forEach(source => {
    keuanganStore.rolloverProgram(
      selectedProgram.value.id, 
      targetId,
      source.amount,
      source.account
    )
  })

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
