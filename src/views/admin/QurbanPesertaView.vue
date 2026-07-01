<template>
  <div class="space-y-6 sm:space-y-8 animate-fade-in">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Data Peserta Qurban</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola data pendaftar shohibul qurban tahun ini.</p>
      </div>
      <button @click="openAddModal" class="px-5 py-2.5 bg-secondary hover:bg-yellow-500 text-white text-sm font-bold rounded-xl shadow-md shadow-secondary/20 transition-all flex items-center gap-2">
        <Plus class="w-4 h-4" />
        <span>Tambah Peserta</span>
      </button>
    </div>

    <!-- Search & Filter Bar -->
    <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-4 shadow-md relative z-20">
      
      <div class="relative flex-1">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search class="w-4 h-4 text-gray-400" />
        </div>
        <input 
          v-model="searchQuery"
          type="text" 
          class="block w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary sm:text-sm transition-colors shadow-sm" 
          placeholder="Cari nama, no. WA, atau ID..." 
        />
      </div>

      <div class="relative shrink-0">
        <button 
          @click="isFilterOpen = !isFilterOpen" 
          class="w-full sm:w-auto px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 shadow-sm flex items-center justify-between gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div class="flex items-center gap-2">
            <Filter class="w-4 h-4 text-gray-400" />
            <span v-if="selectedFilter.icon" class="mr-0.5">{{ selectedFilter.icon }}</span>
            <span>{{ selectedFilter.label }}</span>
          </div>
          <ChevronDown class="w-4 h-4 text-gray-400" />
        </button>

        <div v-if="isFilterOpen" class="absolute right-0 left-0 sm:left-auto mt-2 w-full sm:w-56 bg-white dark:bg-gray-800 border border-gray-100 dark:border-white/10 rounded-xl shadow-lg z-50 py-1 animate-fade-in-down overflow-hidden">
          <button 
            v-for="filter in filters" 
            :key="filter.value"
            @click="selectFilter(filter.value)"
            class="w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-2"
            :class="activeFilter === filter.value ? 'bg-secondary/10 text-secondary dark:bg-secondary/20' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'"
          >
            <span v-if="filter.icon" class="w-5 text-center">{{ filter.icon }}</span>
            <span v-else class="w-5"></span> 
            {{ filter.label }}
            <Check v-if="activeFilter === filter.value" class="w-4 h-4 ml-auto text-secondary" />
          </button>
        </div>
        <div v-if="isFilterOpen" @click="isFilterOpen = false" class="fixed inset-0 z-40"></div>
      </div>
    </div>

    <!-- Tabel Data -->
    <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md overflow-hidden relative z-0">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-white/5 text-left border-collapse">
          <thead class="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-white/5">
            <tr class="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <th scope="col" class="px-6 py-4 font-bold">Identitas Shohibul</th>
              <th scope="col" class="px-6 py-4 font-bold">Kontak & Alamat</th>
              <th scope="col" class="px-6 py-4 font-bold">Target Hewan</th>
              <th scope="col" class="px-6 py-4 font-bold">Terkumpul</th>
              <th scope="col" class="px-6 py-4 font-bold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-white/5">
            
            <template v-if="isLoading">
              <tr v-for="i in 4" :key="i" class="animate-pulse">
                <td class="px-6 py-5 flex items-center gap-3"><div class="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div><div><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div><div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div></div></td>
                <td class="px-6 py-5"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div><div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-40"></div></td>
                <td class="px-6 py-5"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2"></div><div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div></td>
                <td class="px-6 py-5"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div><div class="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full"></div></td>
                <td class="px-6 py-5"><div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 mx-auto"></div></td>
              </tr>
            </template>

            <tr v-else-if="filteredPeserta.length === 0">
              <td colspan="5" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                  <Search class="w-8 h-8 mb-3 opacity-50" />
                  <p class="text-sm font-medium">Data peserta tidak ditemukan.</p>
                </div>
              </td>
            </tr>

            <tr v-else v-for="peserta in filteredPeserta" :key="peserta.id" class="hover:bg-gray-50/80 dark:hover:bg-white/[0.02] transition-colors group">
              
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="shrink-0 h-10 w-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm border border-emerald-100 dark:border-emerald-500/20">
                    {{ getInitials(peserta.name) }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      {{ peserta.name }}
                      <span v-if="peserta.transactions && peserta.transactions.some(tx => tx.status === 'pending')" class="px-1.5 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 text-[9px] uppercase tracking-wider rounded-md font-bold animate-pulse" title="Ada tagihan pending">
                        Ada Tagihan
                      </span>
                    </div>
                    <div class="text-[10px] font-mono text-gray-400 mt-0.5 uppercase tracking-wide">ID: {{ peserta.id }}</div>
                  </div>
                </div>
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5 mb-1">
                  <Phone class="w-3.5 h-3.5 text-gray-400" /> {{ peserta.phone }}
                </div>
                <div class="text-[11px] text-gray-500 flex items-center gap-1.5 truncate max-w-[200px]" :title="peserta.address">
                  <MapPin class="w-3.5 h-3.5 text-gray-400 shrink-0" /> <span class="truncate">{{ peserta.address }}</span>
                </div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5 mb-1">
                  <span>{{ peserta.target_type === 'sapi' ? '🐄' : '🐐' }}</span>
                  <span class="capitalize">{{ peserta.target_type }}</span>
                </div>
                <div class="text-[11px] text-gray-500">{{ peserta.animal_group?.name || 'Belum diatur' }}</div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex justify-between items-end mb-1.5">
                  <span class="text-sm font-black text-gray-900 dark:text-white">{{ formatRupiah(peserta.collected_amount) }}</span>
                  <span class="px-2 py-0.5 inline-flex text-[9px] font-bold rounded-md uppercase tracking-wider"
                        :class="peserta.collected_amount >= peserta.target_amount ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20'">
                    {{ peserta.collected_amount >= peserta.target_amount ? 'Lunas' : 'Proses' }}
                  </span>
                </div>
                <div class="w-full max-w-[160px] h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden border border-gray-200 dark:border-white/5">
                  <div class="h-full rounded-full transition-all duration-500"
                       :class="peserta.collected_amount >= peserta.target_amount ? 'bg-emerald-500' : 'bg-secondary'"
                       :style="{ width: getPercentage(peserta) + '%' }">
                  </div>
                </div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click="openDetails(peserta)" class="text-gray-400 hover:text-secondary bg-gray-50 dark:bg-gray-800 hover:bg-yellow-50 dark:hover:bg-yellow-500/10 p-2 rounded-lg transition-colors border border-gray-200 dark:border-white/10" title="Lihat Detail">
                    <Eye class="w-4 h-4" />
                  </button>
                  <button @click="openEditModal(peserta)" class="text-gray-400 hover:text-blue-500 bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-500/10 p-2 rounded-lg transition-colors border border-gray-200 dark:border-white/10" title="Edit Peserta">
                    <Edit2 class="w-4 h-4" />
                  </button>
                  <button @click="confirmDelete(peserta)" class="text-gray-400 hover:text-red-500 bg-gray-50 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-500/10 p-2 rounded-lg transition-colors border border-gray-200 dark:border-white/10" title="Hapus Peserta">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="!isLoading" class="px-6 py-4 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-500 dark:text-gray-400 font-medium flex justify-between items-center">
        <p>Menampilkan <span class="font-bold text-gray-900 dark:text-white">{{ filteredPeserta.length }}</span> dari {{ mockPeserta.length }} peserta.</p>
      </div>
    </div>
  </div>

  <!-- MODALS DI-TELEPORT KE BODY -->
  <Teleport to="body">
    
    <!-- Modal Detail Shohibul -->
    <div v-if="selectedPeserta && modalType === 'detail'" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="closeModal"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all relative z-10 animate-fade-in-up">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <User class="w-5 h-5 text-secondary" />
            Detail Shohibul
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"><X class="w-5 h-5" /></button>
        </div>
        
        <div class="p-6 space-y-6">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-2xl border border-emerald-100 dark:border-emerald-500/20">
              {{ getInitials(selectedPeserta.name) }}
            </div>
            <div>
              <h4 class="text-xl font-bold text-gray-900 dark:text-white">{{ selectedPeserta.name }}</h4>
              <div class="flex items-center gap-2 mt-1">
                <span class="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-[10px] text-gray-500 font-mono font-bold rounded uppercase border border-gray-200 dark:border-gray-700">ID: {{ selectedPeserta.id }}</span>
                <span v-if="selectedPeserta.transactions && selectedPeserta.transactions.some(tx => tx.status === 'pending')" class="px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 text-[10px] font-bold rounded uppercase border border-amber-200 dark:border-amber-500/20">Ada Transaksi Pending</span>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-white/5 p-4 rounded-xl space-y-3">
            <div class="flex items-start gap-3">
              <Phone class="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p class="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Nomor WhatsApp</p>
                <p class="text-sm font-bold text-gray-800 dark:text-gray-200">{{ selectedPeserta.phone }}</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <MapPin class="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p class="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Alamat</p>
                <p class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ selectedPeserta.address }}</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-white/5 p-4 rounded-xl text-center">
              <span class="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">Hewan Target</span>
              <span class="text-lg font-black text-gray-900 dark:text-white flex items-center justify-center gap-1.5 capitalize">
                {{ selectedPeserta.target_type === 'sapi' ? '🐄' : '🐐' }} {{ selectedPeserta.target_type }}
              </span>
              <span class="text-[10px] text-gray-500 dark:text-gray-400 font-medium block mt-1">{{ selectedPeserta.animal_group?.name || 'Belum Diatur' }}</span>
            </div>
            <div class="bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-white/5 p-4 rounded-xl text-center">
              <span class="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">Sisa Target</span>
              <span class="text-lg font-black text-secondary flex items-center justify-center">
                {{ formatRupiah(Math.max(0, selectedPeserta.target_amount - selectedPeserta.collected_amount)) }}
              </span>
              <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium block mt-1">Total: {{ formatRupiah(selectedPeserta.target_amount) }}</span>
            </div>
          </div>
        </div>

        <div class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 flex justify-end gap-3">
          <button @click="closeModal" class="px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 shadow-sm transition-colors">Tutup</button>
        </div>
      </div>
    </div>

    <!-- Modal Form Tambah/Edit -->
    <div v-if="(modalType === 'add' || modalType === 'edit')" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="closeModal"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all relative z-10 animate-fade-in-up">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">
            {{ modalType === 'add' ? 'Tambah Shohibul Manual' : 'Edit Data Shohibul' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"><X class="w-5 h-5" /></button>
        </div>
        
        <form @submit.prevent="submitForm">
          <div class="p-6 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lengkap</label>
                <input v-model="formData.name" type="text" required class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-secondary transition-all">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nomor WhatsApp</label>
                <input v-model="formData.phone" type="text" required class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-secondary transition-all">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alamat</label>
              <input type="text" v-model="formData.address" required class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-secondary transition-all">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pilihan Target Hewan</label>
              <select v-model="formData.target_type" :disabled="modalType === 'edit'" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:opacity-70">
                <option value="sapi">🐄 Sapi (Kolektif)</option>
                <option value="kambing">🐐 Kambing (Mandiri)</option>
              </select>
            </div>

            <div v-if="modalType === 'add'">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-5 border-t border-gray-200 dark:border-white/10">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Setoran Awal (Rp)</label>
                  <input 
                    v-model.number="formData.initial_amount" 
                    type="number" 
                    step="50000" 
                    required 
                    placeholder="0" 
                    @invalid="e => {
                      if (e.target.validity.valueMissing) e.target.setCustomValidity('Setoran awal wajib diisi.')
                      else if (e.target.validity.stepMismatch) e.target.setCustomValidity('Nominal harus kelipatan Rp 50.000')
                    }"
                    @input="e => e.target.setCustomValidity('')"
                    class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Metode Pembayaran</label>
                  <select v-model="formData.payment_method" required class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all">
                    <option value="tunai">Tunai (Diterima Langsung)</option>
                    <option value="transfer">Transfer Bank (Cek Mutasi)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
            <button type="button" @click="closeModal" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Batal</button>
            <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-secondary hover:bg-yellow-500 rounded-lg shadow-sm transition-colors">Simpan Data</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Konfirmasi Hapus -->
    <div v-if="modalType === 'delete'" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" @click="closeModal"></div>
      
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden transform transition-all relative z-10 animate-fade-in-up p-6 text-center">
        <div class="w-16 h-16 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mx-auto mb-4 border border-red-100 dark:border-red-500/20">
          <Trash2 class="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Hapus Peserta Qurban?</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">Apakah Anda yakin ingin menghapus data <strong>{{ selectedPeserta?.name }}</strong>? Data ini akan dihapus secara permanen.</p>
        
        <div class="flex gap-3 w-full">
          <button @click="closeModal" class="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-bold rounded-xl transition-colors">Batal</button>
          <button @click="executeDelete" class="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm">Ya, Hapus</button>
        </div>
      </div>
    </div>

  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Users, Search, Eye, X, Plus, Edit2, Trash2, MapPin, Phone, User, Filter, ChevronDown, Check } from 'lucide-vue-next'
import { qurbanMockData } from '@/utils/qurbanMock'

// STATE
const isLoading = ref(true)
const searchQuery = ref('')
const isFilterOpen = ref(false)
const activeFilter = ref('all')
const modalType = ref(null) 
const selectedPeserta = ref(null)

const formData = ref({ name: '', phone: '', address: '', target_type: 'sapi', initial_amount: 0, payment_method: 'tunai' })

const filters = [
  { label: 'Semua Kategori', value: 'all', icon: '' },
  { label: 'Sapi (Kolektif)', value: 'sapi', icon: '🐄' },
  { label: 'Kambing (Mandiri)', value: 'kambing', icon: '🐐' },
  { label: 'Sudah Lunas', value: 'lunas', icon: '✓' }
]

const selectedFilter = computed(() => filters.find(f => f.value === activeFilter.value) || filters[0])

const selectFilter = (value) => {
  activeFilter.value = value
  isFilterOpen.value = false
}

// MOCK DATA 
const mockPeserta = ref([])

onMounted(() => {
  setTimeout(() => {
    mockPeserta.value = qurbanMockData.shohibuls;
    isLoading.value = false
  }, 1000)
})

// COMPUTED FILTERS
const filteredPeserta = computed(() => {
  return mockPeserta.value.filter(p => {
    const q = searchQuery.value.toLowerCase()
    const matchesSearch = p.name.toLowerCase().includes(q) || p.id.toString().includes(q) || p.phone.includes(q)
    
    let matchesFilter = true
    if (activeFilter.value === 'sapi') matchesFilter = p.target_type === 'sapi'
    if (activeFilter.value === 'kambing') matchesFilter = p.target_type === 'kambing'
    if (activeFilter.value === 'lunas') matchesFilter = p.collected_amount >= p.target_amount
    
    return matchesSearch && matchesFilter
  })
})

// METHODS
const formatRupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
const getPercentage = (peserta) => Math.min(Math.round((peserta.collected_amount / peserta.target_amount) * 100), 100)
const getInitials = (name) => {
  const split = name.split(' ')
  return split.length >= 2 ? (split[0][0] + split[1][0]).toUpperCase() : name.slice(0, 2).toUpperCase()
}

// Modal Handlers
const openDetails = (peserta) => { selectedPeserta.value = peserta; modalType.value = 'detail'; document.body.style.overflow = 'hidden' }
const openAddModal = () => { 
  formData.value = { name: '', phone: '', address: '', target_type: 'sapi', initial_amount: 0, payment_method: 'tunai' }
  modalType.value = 'add'; document.body.style.overflow = 'hidden' 
}
const openEditModal = (peserta) => { 
  selectedPeserta.value = peserta; 
  formData.value = { ...peserta }
  modalType.value = 'edit'; document.body.style.overflow = 'hidden' 
}

const confirmDelete = (peserta) => { 
  if (peserta.collected_amount > 0 || (peserta.transactions && peserta.transactions.some(tx => tx.status === 'pending'))) {
    alert(`DITOLAK SISTEM: Shohibul ${peserta.name} memiliki saldo aktif (${formatRupiah(peserta.collected_amount)}) atau transaksi yang masih pending. Batalkan transaksi atau selesaikan refund sebelum menghapus peserta!`)
    return
  }
  selectedPeserta.value = peserta; modalType.value = 'delete'; document.body.style.overflow = 'hidden' 
}
const closeModal = () => { modalType.value = null; selectedPeserta.value = null; document.body.style.overflow = '' }

// Actions
const submitForm = () => {
  if (modalType.value === 'add') {
    alert(`Fungsi Register API dipanggil! Peserta baru dibuat dan setoran awal Rp ${formData.value.initial_amount} berhasil dicatat melalui ${formData.value.payment_method}.`)
  } else if (modalType.value === 'edit') {
    alert(`Fungsi Update API dipanggil! Berhasil menyimpan perubahan identitas peserta.`)
  }
  closeModal()
}

const executeDelete = () => {
  alert('Fungsi Destroy API dipanggil! Peserta berhasil dihapus.')
  closeModal()
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { height: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(156, 163, 175, 0.3); border-radius: 4px; }

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