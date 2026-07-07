<template>
  <div class="space-y-6 sm:space-y-8 animate-fade-in">
    <!-- Welcome Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Data Transaksi</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Kelola pencatatan semua uang masuk dan keluar.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button @click="openCatatModal" class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2 rounded-lg transition-colors shadow-md text-sm flex items-center gap-2">
          <Plus class="w-4 h-4" />
          <span class="hidden sm:inline">Catat Transaksi</span>
        </button>
      </div>
    </div>

    <!-- Filter & Search Bar -->
    <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-4 shadow-md relative z-20">
      
      <div class="relative flex-1">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search class="w-4 h-4 text-gray-400" />
        </div>
        <input 
          type="text" 
          placeholder="Cari deskripsi atau nominal..." 
          class="block w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary sm:text-sm transition-colors shadow-sm"
        />
      </div>
      
      <div class="flex items-center gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar py-0.5">
        <template v-if="viewMode === 'gabung'">
          <button @click="setFilter('semua')" :class="['px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap', activeFilter === 'semua' ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white border border-gray-300 dark:border-white/10' : 'hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 border border-transparent']">
            Semua
          </button>
          <button @click="setFilter('in')" :class="['px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap', activeFilter === 'in' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30' : 'hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 border border-transparent']">
            Pemasukan
          </button>
          <button @click="setFilter('out')" :class="['px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap', activeFilter === 'out' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/30' : 'hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 border border-transparent']">
            Pengeluaran
          </button>
          <div class="w-px h-6 bg-gray-200 dark:bg-white/10 mx-2 hidden md:block"></div>
        </template>
        
        <button @click="viewMode = viewMode === 'gabung' ? 'terpisah' : 'gabung'" class="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-800 shadow-sm" :title="viewMode === 'gabung' ? 'Ubah ke Tampilan Terpisah' : 'Ubah ke Tampilan Gabung'">
          <Layers v-if="viewMode === 'gabung'" class="w-5 h-5" />
          <Table v-else class="w-5 h-5" />
        </button>

        <button @click="showFilterModal = true" class="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 whitespace-nowrap flex items-center gap-2 border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-800 shadow-sm">
          <Filter class="w-4 h-4" />
          Filter Lanjutan
        </button>
      </div>
    </div>

    <!-- Global Program Filter & Summary Dashboard -->
    <div class="bg-white dark:bg-gray-900 rounded-2xl ring-1 ring-gray-200 dark:ring-white/10 shadow-sm p-4 relative overflow-hidden z-0">
        <!-- Header & Filter -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 mb-4">
          <div>
            <h2 class="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <div class="p-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg ring-1 ring-gray-200 dark:ring-white/10">
                <PieChart class="w-4 h-4 text-secondary" />
              </div>
              Ringkasan Saldo Terkini
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Data: <span class="font-semibold text-secondary">{{ getActiveFilterName }}</span>
            </p>
          </div>
          
          <div class="relative w-full md:w-72 shadow-sm rounded-xl">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Filter class="w-4 h-4 text-gray-400" />
            </div>
            <select v-model="activeProgramFilter" class="w-full appearance-none bg-none bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl pl-10 pr-10 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all cursor-pointer hover:border-gray-300 dark:hover:border-gray-700 relative z-0" style="background-image: none;">
              <option value="all">Semua Data (Global)</option>
              <option value="general">Hanya Kas Umum</option>
              <optgroup label="Berdasarkan Program Khusus">
                <option v-for="p in keuanganStore.programs" :key="p.id" :value="p.id">{{ p.name }}</option>
              </optgroup>
            </select>
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none z-10">
              <ChevronDown class="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>

        <!-- Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 relative z-10">
          <div class="bg-white dark:bg-gray-900 ring-1 ring-emerald-500/20 rounded-xl p-3 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <p class="text-xs font-medium text-emerald-600 dark:text-emerald-400">Total Pemasukan</p>
              <p class="text-lg font-bold text-gray-900 dark:text-white mt-0.5">Rp {{ formatCurrency(summaryPemasukan) }}</p>
            </div>
            <div class="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg ring-1 ring-emerald-500/20 shadow-sm"><ArrowDownLeft class="w-4 h-4 text-emerald-600 dark:text-emerald-400" /></div>
          </div>
          <div class="bg-white dark:bg-gray-900 ring-1 ring-rose-500/20 rounded-xl p-3 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <p class="text-xs font-medium text-rose-600 dark:text-rose-400">Total Pengeluaran</p>
              <p class="text-lg font-bold text-gray-900 dark:text-white mt-0.5">Rp {{ formatCurrency(summaryPengeluaran) }}</p>
            </div>
            <div class="p-2 bg-rose-50 dark:bg-rose-500/10 rounded-lg ring-1 ring-rose-500/20 shadow-sm"><ArrowUpRight class="w-4 h-4 text-rose-600 dark:text-rose-400" /></div>
          </div>
          <div class="bg-white dark:bg-gray-900 ring-1 ring-blue-500/20 rounded-xl p-3 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <p class="text-xs font-medium text-blue-600 dark:text-blue-400">Saldo Akhir</p>
              <p class="text-[10px] text-blue-500/80 dark:text-blue-400/80 mt-0.5">Pemasukan - Pengeluaran</p>
              <p class="text-lg font-bold text-gray-900 dark:text-white mt-0.5">Rp {{ formatCurrency(summarySaldo) }}</p>
            </div>
            <div class="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg ring-1 ring-blue-500/30 shadow-sm"><Scale class="w-4 h-4 text-blue-600 dark:text-blue-400" /></div>
          </div>
        </div>
    </div>

    <!-- View: Gabung -->
    <div v-if="viewMode === 'gabung'" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl overflow-hidden shadow-md">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-600 dark:text-gray-400 min-w-[800px]">
          <thead class="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-950/50 border-b border-gray-300 dark:border-white/5">
            <tr class="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <th scope="col" class="px-4 py-3 font-bold">Tanggal</th>
              <th scope="col" class="px-4 py-3 font-bold">Deskripsi</th>
              <th scope="col" class="px-4 py-3 font-bold">Kategori</th>
              <th scope="col" class="px-4 py-3 font-bold">Kas/Rekening</th>
              <th scope="col" class="px-4 py-3 font-bold">Status</th>
              <th scope="col" class="px-4 py-3 font-bold text-right">Nominal</th>
              <th scope="col" class="px-4 py-3 font-bold text-right w-[1%] whitespace-nowrap">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-white/5">
            <tr v-for="tx in paginatedFilteredTransactions" :key="tx.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
              <td class="px-4 py-3 whitespace-nowrap">
                <div class="text-gray-900 dark:text-white font-medium">{{ tx.date }}</div>
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div :class="[
                    'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                    tx.type === 'in' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                  ]">
                    <ArrowDownLeft v-if="tx.type === 'in'" class="w-4 h-4" />
                    <ArrowUpRight v-else class="w-4 h-4" />
                  </div>
                  <p class="text-gray-900 dark:text-gray-200 font-medium truncate max-w-[200px]" :title="tx.description">{{ tx.description }}</p>
                </div>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span class="text-gray-600 dark:text-gray-400">{{ tx.category }}</span>
                <span v-if="tx.program_id" class="ml-2 px-2 py-0.5 text-[10px] font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-200 dark:border-blue-800/30">
                  {{ getProgramName(tx.program_id) }}
                </span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span class="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 ring-1 ring-gray-300 dark:ring-white/10">
                  {{ tx.account }}
                </span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span v-if="tx.status === 'approved'" class="px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 ring-1 ring-emerald-500/20">
                  Approved
                </span>
                <span v-else class="px-2.5 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 ring-1 ring-amber-500/20">
                  Pending
                </span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-right">
                <span :class="[
                  'font-semibold',
                  tx.status === 'pending' ? 'text-gray-500 dark:text-gray-400' : (tx.type === 'in' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')
                ]">
                  {{ tx.type === 'in' ? '+' : '-' }} Rp {{ formatCurrency(tx.amount) }}
                </span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-right w-[1%]">
                <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click="openEditModal(tx)" class="text-gray-400 hover:text-blue-500 bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-500/10 p-1.5 rounded-lg transition-colors border border-gray-200 dark:border-white/10" title="Edit Transaksi">
                    <Pencil class="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4 border-t border-gray-300 dark:border-white/5 flex items-center justify-between text-xs text-gray-500 bg-gray-50 dark:bg-gray-950/30">
        <span>Menampilkan {{ filteredTransactions.length === 0 ? 0 : (currentPage - 1) * 10 + 1 }}-{{ Math.min(currentPage * 10, filteredTransactions.length) }} dari {{ filteredTransactions.length }} transaksi</span>
        <div class="flex items-center gap-1">
          <button @click="currentPage--" :disabled="currentPage === 1" class="p-1 rounded hover:bg-gray-200 dark:hover:bg-white/5 disabled:opacity-50 transition-colors">
            <ChevronLeft class="w-4 h-4" />
          </button>
          <button 
            v-for="page in totalPages" 
            :key="page"
            @click="currentPage = page"
            :class="['w-6 h-6 rounded text-sm flex items-center justify-center transition-colors', currentPage === page ? 'bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white font-medium' : 'hover:bg-gray-200 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400']"
          >
            {{ page }}
          </button>
          <button @click="currentPage++" :disabled="currentPage === totalPages || totalPages === 0" class="p-1 rounded hover:bg-gray-200 dark:hover:bg-white/5 disabled:opacity-50 transition-colors">
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- View: Terpisah -->
    <div v-else class="space-y-6">

      <!-- Pemasukan -->
      <div class="bg-white dark:bg-gray-900 ring-1 ring-emerald-500/30 rounded-xl overflow-hidden shadow-md relative">
        <div class="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
        <div class="px-6 py-4 border-b border-gray-200 dark:border-white/5 flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/5">
          <div class="bg-emerald-100 dark:bg-emerald-500/20 p-1.5 rounded-lg">
            <ArrowDownLeft class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 class="font-semibold text-emerald-900 dark:text-emerald-100">Pemasukan</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-gray-600 dark:text-gray-400 min-w-[700px]">
            <thead class="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-950/30 border-b border-gray-200 dark:border-white/5">
            <tr class="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <th scope="col" class="px-4 py-3 font-bold">Tanggal</th>
                <th scope="col" class="px-4 py-3 font-bold">Deskripsi</th>
                <th scope="col" class="px-4 py-3 font-bold">Kategori</th>
                <th scope="col" class="px-4 py-3 font-bold">Kas/Rekening</th>
                <th scope="col" class="px-4 py-3 font-bold">Status</th>
                <th scope="col" class="px-4 py-3 font-bold text-right">Nominal</th>
                <th scope="col" class="px-4 py-3 font-bold text-right w-[1%] whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-white/5">
              <tr v-for="tx in paginatedPemasukanTransactions" :key="tx.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="text-gray-900 dark:text-white font-medium">{{ tx.date }}</div>
                </td>
                <td class="px-4 py-3">
                  <p class="text-gray-900 dark:text-gray-200 font-medium truncate max-w-[200px]" :title="tx.description">{{ tx.description }}</p>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <span class="text-gray-600 dark:text-gray-400">{{ tx.category }}</span>
                  <span v-if="tx.program_id" class="ml-2 px-2 py-0.5 text-[10px] font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-200 dark:border-blue-800/30">
                    {{ getProgramName(tx.program_id) }}
                  </span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <span class="px-2 py-1 text-xs font-medium rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{{ tx.account }}</span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <span v-if="tx.status === 'approved'" class="px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 ring-1 ring-emerald-500/20">
                    Approved
                  </span>
                  <span v-else class="px-2.5 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 ring-1 ring-amber-500/20">
                    Pending
                  </span>
                </td>
                <td :class="['px-4 py-3 whitespace-nowrap text-right font-semibold', tx.status === 'pending' ? 'text-gray-500 dark:text-gray-400' : 'text-emerald-600 dark:text-emerald-400']">
                  + Rp {{ formatCurrency(tx.amount) }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-right w-[1%]">
                  <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button @click="openEditModal(tx)" class="text-gray-400 hover:text-blue-500 bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-500/10 p-1.5 rounded-lg transition-colors border border-gray-200 dark:border-white/10" title="Edit Transaksi">
                      <Pencil class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="p-4 border-t border-gray-200 dark:border-white/5 flex items-center justify-between text-xs text-gray-500 bg-emerald-50/50 dark:bg-emerald-500/5">
          <span>Menampilkan {{ pemasukanTransactions.length === 0 ? 0 : (currentPagePemasukan - 1) * 5 + 1 }}-{{ Math.min(currentPagePemasukan * 5, pemasukanTransactions.length) }} dari {{ pemasukanTransactions.length }} transaksi</span>
          <div class="flex items-center gap-1">
            <button @click="currentPagePemasukan--" :disabled="currentPagePemasukan === 1" class="p-1 rounded hover:bg-emerald-100 dark:hover:bg-emerald-500/20 disabled:opacity-50 transition-colors">
              <ChevronLeft class="w-4 h-4" />
            </button>
            <button 
              v-for="page in totalPagesPemasukan" 
              :key="page"
              @click="currentPagePemasukan = page"
              :class="['w-6 h-6 rounded text-sm flex items-center justify-center transition-colors', currentPagePemasukan === page ? 'bg-emerald-200 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 font-medium' : 'hover:bg-emerald-100 dark:hover:bg-emerald-500/10 text-gray-600 dark:text-gray-400']"
            >
              {{ page }}
            </button>
            <button @click="currentPagePemasukan++" :disabled="currentPagePemasukan === totalPagesPemasukan || totalPagesPemasukan === 0" class="p-1 rounded hover:bg-emerald-100 dark:hover:bg-emerald-500/20 disabled:opacity-50 transition-colors">
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Pengeluaran -->
      <div class="bg-white dark:bg-gray-900 ring-1 ring-rose-500/30 rounded-xl overflow-hidden shadow-md relative">
        <div class="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
        <div class="px-6 py-4 border-b border-gray-200 dark:border-white/5 flex items-center gap-2 bg-rose-50 dark:bg-rose-500/5">
          <div class="bg-rose-100 dark:bg-rose-500/20 p-1.5 rounded-lg">
            <ArrowUpRight class="w-5 h-5 text-rose-600 dark:text-rose-400" />
          </div>
          <h2 class="font-semibold text-rose-900 dark:text-rose-100">Pengeluaran</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-gray-600 dark:text-gray-400 min-w-[700px]">
            <thead class="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-950/30 border-b border-gray-200 dark:border-white/5">
              <tr class="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <th scope="col" class="px-4 py-3 font-bold">Tanggal</th>
                <th scope="col" class="px-4 py-3 font-bold">Deskripsi</th>
                <th scope="col" class="px-4 py-3 font-bold">Kategori</th>
                <th scope="col" class="px-4 py-3 font-bold">Kas/Rekening</th>
                <th scope="col" class="px-4 py-3 font-bold">Status</th>
                <th scope="col" class="px-4 py-3 font-bold text-right">Nominal</th>
                <th scope="col" class="px-4 py-3 font-bold text-right w-[1%] whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-white/5">
              <tr v-for="tx in paginatedPengeluaranTransactions" :key="tx.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="text-gray-900 dark:text-white font-medium">{{ tx.date }}</div>
                </td>
                <td class="px-4 py-3">
                  <p class="text-gray-900 dark:text-gray-200 font-medium truncate max-w-[200px]" :title="tx.description">{{ tx.description }}</p>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <span class="text-gray-600 dark:text-gray-400">{{ tx.category }}</span>
                  <span v-if="tx.program_id" class="ml-2 px-2 py-0.5 text-[10px] font-medium rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-200 dark:border-blue-800/30">
                    {{ getProgramName(tx.program_id) }}
                  </span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <span class="px-2 py-1 text-xs font-medium rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{{ tx.account }}</span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <span v-if="tx.status === 'approved'" class="px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 ring-1 ring-emerald-500/20">
                    Approved
                  </span>
                  <span v-else class="px-2.5 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 ring-1 ring-amber-500/20">
                    Pending
                  </span>
                </td>
                <td :class="['px-4 py-3 whitespace-nowrap text-right font-semibold', tx.status === 'pending' ? 'text-gray-500 dark:text-gray-400' : 'text-rose-600 dark:text-rose-400']">
                  - Rp {{ formatCurrency(tx.amount) }}
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-right w-[1%]">
                  <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button @click="openEditModal(tx)" class="text-gray-400 hover:text-blue-500 bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-500/10 p-1.5 rounded-lg transition-colors border border-gray-200 dark:border-white/10" title="Edit Transaksi">
                      <Pencil class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="p-4 border-t border-gray-200 dark:border-white/5 flex items-center justify-between text-xs text-gray-500 bg-rose-50/50 dark:bg-rose-500/5">
          <span>Menampilkan {{ pengeluaranTransactions.length === 0 ? 0 : (currentPagePengeluaran - 1) * 5 + 1 }}-{{ Math.min(currentPagePengeluaran * 5, pengeluaranTransactions.length) }} dari {{ pengeluaranTransactions.length }} transaksi</span>
          <div class="flex items-center gap-1">
            <button @click="currentPagePengeluaran--" :disabled="currentPagePengeluaran === 1" class="p-1 rounded hover:bg-rose-100 dark:hover:bg-rose-500/20 disabled:opacity-50 transition-colors">
              <ChevronLeft class="w-4 h-4" />
            </button>
            <button 
              v-for="page in totalPagesPengeluaran" 
              :key="page"
              @click="currentPagePengeluaran = page"
              :class="['w-6 h-6 rounded text-sm flex items-center justify-center transition-colors', currentPagePengeluaran === page ? 'bg-rose-200 dark:bg-rose-500/20 text-rose-900 dark:text-rose-300 font-medium' : 'hover:bg-rose-100 dark:hover:bg-rose-500/10 text-gray-600 dark:text-gray-400']"
            >
              {{ page }}
            </button>
            <button @click="currentPagePengeluaran++" :disabled="currentPagePengeluaran === totalPagesPengeluaran || totalPagesPengeluaran === 0" class="p-1 rounded hover:bg-rose-100 dark:hover:bg-rose-500/20 disabled:opacity-50 transition-colors">
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <!-- Modal Catat / Edit Transaksi -->
    <div v-if="showCatatModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="showCatatModal = false"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all relative z-10 animate-fade-in-up">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ isEditMode ? 'Edit Transaksi' : 'Catat Transaksi Baru' }}</h3>
          <button @click="showCatatModal = false" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
          <!-- Tipe Transaksi Toggle -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipe Transaksi</label>
            <div class="grid grid-cols-2 gap-3">
              <button @click="catatForm.tipe = 'in'" :class="['py-2 px-3 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition-all', catatForm.tipe === 'in' ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300']">
                <ArrowDownLeft class="w-4 h-4" /> Pemasukan
              </button>
              <button @click="catatForm.tipe = 'out'" :class="['py-2 px-3 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition-all', catatForm.tipe === 'out' ? 'bg-rose-50 border-rose-500 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300']">
                <ArrowUpRight class="w-4 h-4" /> Pengeluaran
              </button>
            </div>
          </div>

          <!-- Nominal & Tanggal -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nominal (Rp)</label>
              <input type="number" v-model="catatForm.amount" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-secondary transition-all" placeholder="0">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
              <input type="date" v-model="catatForm.date" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-secondary transition-all [color-scheme:light] dark:[color-scheme:dark]">
            </div>
          </div>

          <!-- Rekening & Kategori -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kas / Rekening</label>
              <select v-model="catatForm.account" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
                <option>Kotak Amal Utama</option>
                <option>BSI Masjid Jami Kassiti</option>
                <option>Kas Kecil Operasional</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kategori</label>
              <select v-model="catatForm.category" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
                <option v-if="catatForm.tipe === 'in'">Infaq Mingguan</option>
                <option v-if="catatForm.tipe === 'in'">Donasi Umum</option>
                <option v-if="catatForm.tipe === 'out'">Operasional</option>
                <option v-if="catatForm.tipe === 'out'">Dakwah & Kajian</option>
                <option v-if="catatForm.tipe === 'out'">Pemeliharaan</option>
              </select>
            </div>
          </div>

          <!-- Program Opsional -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
              Alokasi Kegiatan / Program (Opsional)
              <span class="group relative cursor-help">
                <HelpCircle class="w-3.5 h-3.5 text-gray-400" />
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20 text-center">
                  Kosongkan jika dana masuk ke/berasal dari Kas Umum.
                </div>
              </span>
            </label>
            <select v-model="catatForm.program_id" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
              <option :value="null">-- Tidak ada (Kas Umum) --</option>
              <option v-for="p in activePrograms" :key="p.id" :value="p.id">{{ p.name }}</option>
            </select>
          </div>

          <!-- Deskripsi -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi / Keterangan</label>
            <textarea v-model="catatForm.description" rows="3" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" placeholder="Tulis rincian transaksi..."></textarea>
          </div>

          <!-- Status -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status Transaksi</label>
            <div class="flex gap-4">
              <label class="flex items-center gap-2 cursor-pointer group">
                <input type="radio" v-model="catatForm.status" value="approved" class="text-secondary focus:ring-secondary w-4 h-4 bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700">
                <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">Approved</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer group">
                <input type="radio" v-model="catatForm.status" value="pending" class="text-secondary focus:ring-secondary w-4 h-4 bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700">
                <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">Pending</span>
              </label>
            </div>
          </div>
        </div>
        
        <div class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
          <button @click="showCatatModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Batal</button>
          <button @click="saveTransaction" class="px-4 py-2 text-sm font-medium text-white bg-secondary hover:bg-yellow-500 rounded-lg shadow-sm transition-colors">{{ isEditMode ? 'Simpan Perubahan' : 'Simpan Transaksi' }}</button>
        </div>
      </div>
    </div>

    <!-- Modal Filter Lanjutan -->
    <div v-if="showFilterModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="showFilterModal = false"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all relative z-10 animate-fade-in-up">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Filter class="w-5 h-5 text-gray-500" /> Filter Lanjutan
          </h3>
          <button @click="showFilterModal = false" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 space-y-5">
          <!-- Status -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status Transaksi</label>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1.5 rounded-md text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 cursor-pointer ring-1 ring-emerald-500/50">Semua Status</span>
              <span class="px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Pending</span>
              <span class="px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Approved</span>
            </div>
          </div>

          <!-- Rentang Tanggal / Bulan -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Waktu</label>
              <div class="flex bg-gray-100 dark:bg-gray-800 p-0.5 rounded-md">
                <button @click="filterDateMode = 'bulan'" :class="['px-2.5 py-1 text-xs font-medium rounded transition-colors', filterDateMode === 'bulan' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300']">Pilih Bulan</button>
                <button @click="filterDateMode = 'rentang'" :class="['px-2.5 py-1 text-xs font-medium rounded transition-colors', filterDateMode === 'rentang' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300']">Rentang Custom</button>
              </div>
            </div>
            
            <div v-if="filterDateMode === 'bulan'">
              <input type="month" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all [color-scheme:light] dark:[color-scheme:dark]">
            </div>
            <div v-else class="flex items-center gap-2">
              <input type="date" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all [color-scheme:light] dark:[color-scheme:dark]">
              <span class="text-gray-500">-</span>
              <input type="date" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all [color-scheme:light] dark:[color-scheme:dark]">
            </div>
          </div>

          <!-- Rekening -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kas / Rekening</label>
            <select class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
              <option>Semua Rekening</option>
              <option>Kotak Amal Utama</option>
              <option>BSI Masjid Jami Kassiti</option>
            </select>
          </div>
          
          <!-- Kategori -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kategori</label>
            <select class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
              <option>Semua Kategori</option>
              <option>Infaq Mingguan</option>
              <option>Operasional</option>
            </select>
          </div>
        </div>
        
        <div class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50 flex justify-between gap-3">
          <button class="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">Reset Filter</button>
          <button @click="showFilterModal = false" class="px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-white rounded-lg shadow-sm transition-colors">Terapkan</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { Search, Filter, Plus, ArrowDownLeft, ArrowUpRight, ChevronLeft, ChevronRight, X, Pencil, Scale, HelpCircle, PieChart, ChevronDown, Wallet, Layers, Table } from 'lucide-vue-next'
import { useKeuanganStore } from '@/stores/keuangan'
import { useToastStore } from '@/stores/toast'
import { useDialogStore } from '@/stores/dialog'

const keuanganStore = useKeuanganStore()
const toast = useToastStore()
const dialog = useDialogStore()
const route = useRoute()

const activePrograms = computed(() => keuanganStore.programs.filter(p => p.status === 'Aktif'))
const getProgramName = (id) => keuanganStore.programs.find(p => p.id === id)?.name || ''


const viewMode = ref('terpisah') // Default terpisah sesuai permintaan
const showCatatModal = ref(false)
const showFilterModal = ref(false)
const filterDateMode = ref('bulan') // 'bulan' | 'rentang'
const activeFilter = ref('semua') // 'semua' | 'in' | 'out'
const isEditMode = ref(false)
const currentPage = ref(1)
const currentPagePemasukan = ref(1)
const currentPagePengeluaran = ref(1)

const closeAllModals = () => {
  showCatatModal.value = false
  showFilterModal.value = false
}

const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    closeAllModals()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  if (route.query.program_id) {
    activeProgramFilter.value = parseInt(route.query.program_id)
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

const setFilter = (filter) => {
  activeFilter.value = filter
  currentPage.value = 1
}

const catatForm = ref({ 
  tipe: 'in',
  status: 'approved',
  amount: '',
  date: '',
  account: '',
  category: '',
  description: '',
  program_id: null
})

const activeProgramFilter = ref('all')
const searchQuery = ref('')

const formatCurrency = (val) => {
  return val ? val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "0"
}

const getActiveFilterName = computed(() => {
  if (activeProgramFilter.value === 'all') return 'Semua Data (Global)'
  if (activeProgramFilter.value === 'general') return 'Hanya Kas Umum'
  const p = keuanganStore.programs.find(p => p.id === activeProgramFilter.value)
  return p ? p.name : ''
})

const transactions = computed(() => {
  let result = [...keuanganStore.transactions].sort((a, b) => b.id - a.id)
  if (activeProgramFilter.value !== 'all') {
    if (activeProgramFilter.value === 'general') {
      result = result.filter(t => !t.program_id)
    } else {
      result = result.filter(t => t.program_id === activeProgramFilter.value)
    }
  }
  return result
})

const filteredTransactions = computed(() => {
  let result = transactions.value;
  if (activeFilter.value !== 'semua') {
    result = result.filter(t => t.type === activeFilter.value);
  }
  return result;
})

const pemasukanTransactions = computed(() => transactions.value.filter(t => t.type === 'in'))
const pengeluaranTransactions = computed(() => transactions.value.filter(t => t.type === 'out'))

const summaryPemasukan = computed(() => {
  return transactions.value.filter(t => t.type === 'in' && t.status === 'approved').reduce((sum, t) => sum + t.amount, 0)
})
const summaryPengeluaran = computed(() => {
  return transactions.value.filter(t => t.type === 'out' && t.status === 'approved').reduce((sum, t) => sum + t.amount, 0)
})
const summarySaldo = computed(() => summaryPemasukan.value - summaryPengeluaran.value)

const totalPages = computed(() => Math.ceil(filteredTransactions.value.length / 10))
const totalPagesPemasukan = computed(() => Math.ceil(pemasukanTransactions.value.length / 5))
const totalPagesPengeluaran = computed(() => Math.ceil(pengeluaranTransactions.value.length / 5))

// Untuk keperluan mockup, batasi tampilan per tabel agar tidak perlu scroll panjang.
// Nantinya ini akan di-handle oleh Pagination Backend (misal: tx.data dari response API)
const paginatedFilteredTransactions = computed(() => {
  const start = (currentPage.value - 1) * 10
  const end = start + 10
  return filteredTransactions.value.slice(start, end)
})
const paginatedPemasukanTransactions = computed(() => {
  const start = (currentPagePemasukan.value - 1) * 5
  const end = start + 5
  return pemasukanTransactions.value.slice(start, end)
})
const paginatedPengeluaranTransactions = computed(() => {
  const start = (currentPagePengeluaran.value - 1) * 5
  const end = start + 5
  return pengeluaranTransactions.value.slice(start, end)
})

const openCatatModal = () => {
  isEditMode.value = false;
  catatForm.value = {
    tipe: 'in',
    status: 'approved',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    account: keuanganStore.accounts[0].name,
    category: 'Infaq Mingguan',
    description: '',
    program_id: null
  };
  showCatatModal.value = true;
}

const openEditModal = (tx) => {
  isEditMode.value = true;
  catatForm.value = {
    id: tx.id,
    tipe: tx.type,
    status: tx.status || 'approved',
    amount: tx.amount,
    date: tx.date,
    account: tx.account,
    category: tx.category,
    description: tx.description,
    program_id: tx.program_id || null
  };
  showCatatModal.value = true;
}

const saveTransaction = async () => {
  // Validasi Program Balance
  if (catatForm.value.tipe === 'out' && catatForm.value.program_id) {
    const progBal = keuanganStore.programBalances[catatForm.value.program_id] || { total: 0 }
    let currentBal = progBal.total
    
    // If editing, add back the old amount before checking
    if (isEditMode.value) {
      const oldTx = keuanganStore.transactions.find(t => t.id === catatForm.value.id)
      if (oldTx && oldTx.type === 'out' && oldTx.program_id === catatForm.value.program_id) {
        currentBal += oldTx.amount
      }
    }
    
    if (catatForm.value.amount > currentBal) {
      const program = activePrograms.value.find(p => p.id === catatForm.value.program_id)
      const confirmed = await dialog.open({
        title: 'Peringatan Saldo',
        message: `Saldo Program ${program?.name || ''} tidak mencukupi!\nSisa saldo: Rp ${currentBal}\n\nApakah Anda yakin ingin menutupi kekurangan ini menggunakan dana Kas Umum?`,
        type: 'confirm'
      })
      if (!confirmed) {
        return
      }
    }
  }

  const txData = {
    ...catatForm.value,
    type: catatForm.value.tipe,
  }

  if (isEditMode.value) {
    keuanganStore.updateTransaction(txData.id, txData)
    toast.showToast('Transaksi berhasil diubah', 'success')
  } else {
    keuanganStore.addTransaction(txData)
    toast.showToast('Transaksi berhasil ditambahkan', 'success')
  }
  
  showCatatModal.value = false
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.5);
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
