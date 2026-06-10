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
        <!-- View Toggle (Gabung/Terpisah) -->
        <div class="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg flex items-center text-sm font-medium shadow-inner">
          <button @click="viewMode = 'gabung'" :class="['px-3 py-1.5 rounded-md transition-all', viewMode === 'gabung' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300']">Gabung</button>
          <button @click="viewMode = 'terpisah'" :class="['px-3 py-1.5 rounded-md transition-all', viewMode === 'terpisah' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300']">Terpisah</button>
        </div>
        
        <button @click="showCatatModal = true" class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2 rounded-lg transition-colors shadow-md text-sm flex items-center gap-2">
          <Plus class="w-4 h-4" />
          <span class="hidden sm:inline">Catat Transaksi</span>
        </button>
      </div>
    </div>

    <!-- Filter & Search Bar -->
    <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-md">
      <div class="relative w-full md:w-96">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search class="h-4 w-4 text-gray-400 dark:text-gray-500" />
        </div>
        <input 
          type="text" 
          placeholder="Cari deskripsi atau nominal..." 
          class="w-full bg-gray-50 dark:bg-gray-950 border-0 ring-1 ring-gray-300 dark:ring-white/10 rounded-lg pl-9 pr-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
        />
      </div>
      <div class="flex items-center gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar pb-1 md:pb-0">
        <button v-if="viewMode === 'gabung'" class="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white ring-1 ring-gray-300 dark:ring-white/5 whitespace-nowrap">
          Semua
        </button>
        <button v-if="viewMode === 'gabung'" class="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 whitespace-nowrap">
          Pemasukan
        </button>
        <button v-if="viewMode === 'gabung'" class="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 whitespace-nowrap">
          Pengeluaran
        </button>
        <div v-if="viewMode === 'gabung'" class="w-px h-6 bg-gray-200 dark:bg-white/10 mx-2 hidden md:block"></div>
        <button @click="showFilterModal = true" class="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 whitespace-nowrap flex items-center gap-2 ring-1 ring-gray-300 dark:ring-white/10 bg-white dark:bg-gray-800 shadow-sm">
          <Filter class="w-4 h-4" />
          Filter Lanjutan
        </button>
      </div>
    </div>

    <!-- View: Gabung -->
    <div v-if="viewMode === 'gabung'" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl overflow-hidden shadow-md">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-600 dark:text-gray-400">
          <thead class="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-950/50 border-b border-gray-300 dark:border-white/5">
            <tr>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Tanggal</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Deskripsi</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider">Kas/Rekening</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider text-right">Nominal</th>
              <th scope="col" class="px-6 py-4 font-semibold tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-white/5">
            <tr v-for="tx in transactions" :key="tx.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-gray-900 dark:text-white font-medium">{{ tx.date }}</div>
                <div class="text-xs text-gray-500">{{ tx.time }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div :class="[
                    'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                    tx.type === 'in' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                  ]">
                    <ArrowDownLeft v-if="tx.type === 'in'" class="w-4 h-4" />
                    <ArrowUpRight v-else class="w-4 h-4" />
                  </div>
                  <div>
                    <p class="text-gray-900 dark:text-gray-200 font-medium">{{ tx.description }}</p>
                    <p class="text-xs text-gray-500">{{ tx.category }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 ring-1 ring-gray-300 dark:ring-white/10">
                  {{ tx.account }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <span :class="[
                  'font-semibold',
                  tx.type === 'in' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                ]">
                  {{ tx.type === 'in' ? '+' : '-' }} Rp {{ tx.amount }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <button class="text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-white p-1 rounded transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                  <MoreHorizontal class="w-5 h-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4 border-t border-gray-300 dark:border-white/5 flex items-center justify-between text-xs text-gray-500 bg-gray-50 dark:bg-gray-950/30">
        <span>Menampilkan 1-5 dari 45 transaksi</span>
        <div class="flex items-center gap-1">
          <button class="p-1 rounded hover:bg-gray-200 dark:hover:bg-white/5 disabled:opacity-50" disabled>
            <ChevronLeft class="w-4 h-4" />
          </button>
          <button class="w-6 h-6 rounded bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white font-medium flex items-center justify-center">1</button>
          <button class="w-6 h-6 rounded hover:bg-gray-200 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 flex items-center justify-center">2</button>
          <button class="p-1 rounded hover:bg-gray-200 dark:hover:bg-white/5">
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
          <table class="w-full text-left text-sm text-gray-600 dark:text-gray-400">
            <thead class="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-950/30 border-b border-gray-200 dark:border-white/5">
              <tr>
                <th scope="col" class="px-6 py-3 font-semibold tracking-wider">Tanggal</th>
                <th scope="col" class="px-6 py-3 font-semibold tracking-wider">Deskripsi</th>
                <th scope="col" class="px-6 py-3 font-semibold tracking-wider">Kas/Rekening</th>
                <th scope="col" class="px-6 py-3 font-semibold tracking-wider text-right">Nominal</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-white/5">
              <tr v-for="tx in pemasukanTransactions" :key="tx.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                <td class="px-6 py-3 whitespace-nowrap">
                  <div class="text-gray-900 dark:text-white font-medium">{{ tx.date }}</div>
                </td>
                <td class="px-6 py-3">
                  <p class="text-gray-900 dark:text-gray-200 font-medium">{{ tx.description }}</p>
                  <p class="text-xs text-gray-500">{{ tx.category }}</p>
                </td>
                <td class="px-6 py-3 whitespace-nowrap">
                  <span class="px-2 py-1 text-xs font-medium rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{{ tx.account }}</span>
                </td>
                <td class="px-6 py-3 whitespace-nowrap text-right font-semibold text-emerald-600 dark:text-emerald-400">
                  + Rp {{ tx.amount }}
                </td>
              </tr>
            </tbody>
          </table>
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
          <table class="w-full text-left text-sm text-gray-600 dark:text-gray-400">
            <thead class="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-950/30 border-b border-gray-200 dark:border-white/5">
              <tr>
                <th scope="col" class="px-6 py-3 font-semibold tracking-wider">Tanggal</th>
                <th scope="col" class="px-6 py-3 font-semibold tracking-wider">Deskripsi</th>
                <th scope="col" class="px-6 py-3 font-semibold tracking-wider">Kas/Rekening</th>
                <th scope="col" class="px-6 py-3 font-semibold tracking-wider text-right">Nominal</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-white/5">
              <tr v-for="tx in pengeluaranTransactions" :key="tx.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                <td class="px-6 py-3 whitespace-nowrap">
                  <div class="text-gray-900 dark:text-white font-medium">{{ tx.date }}</div>
                </td>
                <td class="px-6 py-3">
                  <p class="text-gray-900 dark:text-gray-200 font-medium">{{ tx.description }}</p>
                  <p class="text-xs text-gray-500">{{ tx.category }}</p>
                </td>
                <td class="px-6 py-3 whitespace-nowrap">
                  <span class="px-2 py-1 text-xs font-medium rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{{ tx.account }}</span>
                </td>
                <td class="px-6 py-3 whitespace-nowrap text-right font-semibold text-rose-600 dark:text-rose-400">
                  - Rp {{ tx.amount }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <!-- Modal Catat Transaksi -->
    <div v-if="showCatatModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="showCatatModal = false"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all relative z-10 animate-fade-in-up">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">Catat Transaksi Baru</h3>
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
              <input type="number" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-secondary transition-all" placeholder="0">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
              <input type="date" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-secondary transition-all">
            </div>
          </div>

          <!-- Rekening & Kategori -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kas / Rekening</label>
              <select class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
                <option>Kotak Amal Utama</option>
                <option>BSI Masjid Jami Kassiti</option>
                <option>Kas Kecil Operasional</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kategori</label>
              <select class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
                <option v-if="catatForm.tipe === 'in'">Infaq Mingguan</option>
                <option v-if="catatForm.tipe === 'in'">Donasi Umum</option>
                <option v-if="catatForm.tipe === 'out'">Operasional</option>
                <option v-if="catatForm.tipe === 'out'">Dakwah & Kajian</option>
                <option v-if="catatForm.tipe === 'out'">Pemeliharaan</option>
              </select>
            </div>
          </div>

          <!-- Deskripsi -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi / Keterangan</label>
            <textarea rows="3" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all" placeholder="Tulis rincian transaksi..."></textarea>
          </div>
        </div>
        
        <div class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
          <button @click="showCatatModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Batal</button>
          <button @click="showCatatModal = false" class="px-4 py-2 text-sm font-medium text-white bg-secondary hover:bg-yellow-500 rounded-lg shadow-sm transition-colors">Simpan Transaksi</button>
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

          <!-- Rentang Tanggal -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rentang Tanggal</label>
            <div class="flex items-center gap-2">
              <input type="date" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white">
              <span class="text-gray-500">-</span>
              <input type="date" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white">
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
import { ref, computed } from 'vue'
import { Search, Filter, Plus, ArrowDownLeft, ArrowUpRight, MoreHorizontal, ChevronLeft, ChevronRight, X } from 'lucide-vue-next'

const viewMode = ref('gabung') // 'gabung' | 'terpisah'
const showCatatModal = ref(false)
const showFilterModal = ref(false)
const catatForm = ref({ tipe: 'in' })

const transactions = [
  { id: 1, date: '12 Okt 2023', time: '13:45', description: 'Infaq Kotak Amal Jumat', category: 'Infaq Mingguan', account: 'Kotak Amal Utama', type: 'in', amount: '3.450.000' },
  { id: 2, date: '10 Okt 2023', time: '09:00', description: 'Pembayaran Listrik & Air PLN/PDAM', category: 'Operasional', account: 'BSI Masjid', type: 'out', amount: '1.250.000' },
  { id: 3, date: '08 Okt 2023', time: '16:30', description: 'Donasi Hamba Allah (Transfer)', category: 'Infaq Umum', account: 'BSI Masjid', type: 'in', amount: '5.000.000' },
  { id: 4, date: '05 Okt 2023', time: '10:00', description: 'Honor Penceramah Kajian', category: 'Dakwah & Kajian', account: 'Kas Tunai', type: 'out', amount: '500.000' },
  { id: 5, date: '01 Okt 2023', time: '08:15', description: 'Pembelian Alat Kebersihan', category: 'Pemeliharaan', account: 'Kas Tunai', type: 'out', amount: '350.000' },
]

const pemasukanTransactions = computed(() => transactions.filter(t => t.type === 'in'))
const pengeluaranTransactions = computed(() => transactions.filter(t => t.type === 'out'))
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
