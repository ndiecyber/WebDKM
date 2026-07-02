<template>
  <div class="space-y-6 sm:space-y-8">
    <!-- Header Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Layanan & Fasilitas</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola daftar layanan dan fasilitas yang disediakan oleh masjid.</p>
      </div>
      <button 
        @click="openModal()"
        class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md text-sm shrink-0"
      >
        <Plus class="w-4 h-4" />
        <span>Tambah Layanan Baru</span>
      </button>
    </div>

    <!-- Services Table -->
    <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md overflow-hidden flex flex-col">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-900 border-b border-gray-300 dark:border-white/5">
              <th class="py-3 px-4 sm:px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Layanan</th>
              <th class="py-3 px-4 sm:px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kategori</th>
              <th class="py-3 px-4 sm:px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">Status</th>
              <th class="py-3 px-4 sm:px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-white/5 bg-white dark:bg-gray-900">
            <tr v-for="item in adminStore.layanan" :key="item.id" class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
              <td class="py-4 px-4 sm:px-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-300 dark:ring-white/10 flex items-center justify-center shrink-0 text-gray-600 dark:text-gray-400">
                    <component :is="iconMap[getCategoryIcon(item.category)] || iconMap.Briefcase" class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="text-sm font-medium text-gray-900 dark:text-white block">{{ item.title }}</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 max-w-xs sm:max-w-sm mt-0.5">{{ item.description }}</span>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4 sm:px-6">
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ item.category }}</span>
              </td>
              <td class="py-4 px-4 sm:px-6 text-center">
                <span :class="['inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[11px] font-medium border', getLabelColorClass(item.badge)]">{{ item.badge }}</span>
              </td>
              <td class="py-4 px-4 sm:px-6">
                <div class="flex items-center justify-end gap-1">
                  <button @click="openModal(item)" class="p-2 rounded-lg text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors" title="Edit">
                    <Edit2 class="w-4 h-4" />
                  </button>
                  <button @click="deleteItem(item.id)" class="p-2 rounded-lg text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors" title="Hapus">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Empty State -->
      <div v-if="adminStore.layanan.length === 0" class="text-center py-16">
        <div class="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-300 dark:ring-white/10 flex items-center justify-center mx-auto mb-3">
          <Briefcase class="w-5 h-5 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 class="text-sm font-medium text-gray-900 dark:text-white">Belum ada layanan</h3>
        <p class="text-xs text-gray-500 mt-1">Tambahkan layanan pertama Anda sekarang.</p>
      </div>

      <!-- Footer Pagination -->
      <div class="px-4 sm:px-6 py-3 border-t border-gray-300 dark:border-white/5 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50">
        <span>Menampilkan 1 hingga {{ adminStore.layanan.length }} dari {{ adminStore.layanan.length }} layanan</span>
        <div class="flex gap-1">
          <button disabled class="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border border-gray-300 dark:border-white/5">Sebelumnya</button>
          <button disabled class="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border border-gray-300 dark:border-white/5">Selanjutnya</button>
        </div>
      </div>
    </div>

    <!-- Form Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div class="absolute inset-0 bg-gray-900/50 dark:bg-gray-950/80 backdrop-blur-sm" @click="closeModal"></div>
      
      <div class="relative bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl w-full max-w-2xl md:max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-gray-300 dark:border-white/5 flex items-center justify-between shrink-0 bg-white dark:bg-gray-900">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">{{ isEditing ? 'Edit Layanan' : 'Tambah Layanan Baru' }}</h3>
          <button @click="closeModal" class="p-2 -mr-2 text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-white/5">
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <!-- Modal Body -->
        <div class="p-6 overflow-y-auto">
          <form @submit.prevent="saveItem" class="space-y-6">
            
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Gambar Utama (Background)</label>
              <div 
                class="relative flex justify-center rounded-xl border border-dashed border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-white/5 px-6 py-6 transition-colors"
                :class="isDraggingBg ? 'border-secondary bg-secondary/5' : 'hover:border-gray-400 dark:hover:border-white/40 hover:bg-gray-100 dark:hover:bg-white/10'"
                @dragenter.prevent="isDraggingBg = true"
                @dragleave.prevent="isDraggingBg = false"
                @dragover.prevent
                @drop.prevent="handleBgDrop"
              >
                <div class="text-center">
                  <div class="mx-auto w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-300 dark:border-transparent flex items-center justify-center mb-3">
                    <UploadCloud class="w-5 h-5 text-gray-400" :class="{ 'text-secondary': isDraggingBg }" />
                  </div>
                  <div class="flex text-sm leading-6 text-gray-500 dark:text-gray-400 justify-center">
                    <label class="relative cursor-pointer rounded-md font-semibold text-secondary focus-within:outline-none hover:text-yellow-600 dark:hover:text-yellow-400">
                      <span>Pilih file</span>
                      <input type="file" class="sr-only" @change="handleBgSelect" accept="image/*" />
                    </label>
                    <p class="pl-1">atau drag & drop</p>
                  </div>
                </div>
                <div v-if="form.bgImage" class="absolute inset-0 bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center group">
                  <img :src="form.bgImage" class="w-full h-full object-cover opacity-90 dark:opacity-80" />
                  <button @click.prevent="form.bgImage = null" class="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <X class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Layanan</label>
                <input 
                  v-model="form.title"
                  type="text" 
                  required
                  placeholder="Misal: Konsultasi Agama"
                  class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all text-sm"
                />
              </div>
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kategori</label>
                <select 
                  v-model="form.category"
                  required
                  class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm"
                >
                  <option class="bg-white dark:bg-slate-800" value="Ibadah">Ibadah</option>
                  <option class="bg-white dark:bg-slate-800" value="Pendidikan">Pendidikan</option>
                  <option class="bg-white dark:bg-slate-800" value="Sosial">Sosial</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Ikon Layanan</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <component :is="iconMap[form.iconName] || iconMap.Briefcase" class="w-4 h-4 text-gray-400" />
                  </div>
                  <select 
                    v-model="form.iconName"
                    required
                    class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg pl-9 pr-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm"
                  >
                    <option v-for="(comp, name) in iconMap" :key="name" :value="name" class="bg-white dark:bg-slate-800">{{ name }}</option>
                  </select>
                </div>
              </div>
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Label (Badge)</label>
                <select 
                  v-model="form.badge"
                  required
                  class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm"
                >
                  <option class="bg-white dark:bg-slate-800 text-gray-900 dark:text-white" value="">Tanpa Label</option>
                  <option v-for="label in adminStore.masterData.label" :key="label.id" :value="label.name" class="bg-white dark:bg-slate-800 text-gray-900 dark:text-white">{{ label.name }}</option>
                </select>
              </div>
            </div>
            
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi Singkat (Tampil di Kartu Depan)</label>
              <textarea 
                v-model="form.description"
                required
                rows="2"
                placeholder="Penjelasan singkat sekitar 1-2 kalimat..."
                class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all resize-none text-sm"
              ></textarea>
            </div>

            <div class="border-t border-gray-300 dark:border-white/5 pt-6 mt-6">
              <h4 class="text-base font-semibold text-gray-900 dark:text-white mb-4">Detail Lengkap (Tampil di Popup Modal)</h4>
              
              <div class="space-y-4">
                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Penjelasan Penuh</label>
                  <textarea 
                    v-model="form.details.fullDescription"
                    required
                    rows="4"
                    placeholder="Jelaskan secara lengkap semua informasi mengenai layanan ini..."
                    class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all resize-none text-sm outline-none"
                  ></textarea>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="space-y-1">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Jadwal / Waktu</label>
                    <input 
                      v-model="form.details.schedule"
                      type="text" 
                      required
                      placeholder="Misal: Setiap Ahad"
                      class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all text-sm"
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Lokasi</label>
                    <input 
                      v-model="form.details.location"
                      type="text" 
                      required
                      placeholder="Misal: Ruang Utama"
                      class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all text-sm"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="space-y-1">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Penanggung Jawab</label>
                    <input 
                      v-model="form.details.supervisor"
                      type="text" 
                      required
                      placeholder="Misal: Ust. Ahmad"
                      class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all text-sm"
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Foto Penanggung Jawab</label>
                    <div class="flex items-center gap-3 mt-1">
                      <div class="w-10 h-10 rounded-full border border-gray-300 dark:border-white/20 overflow-hidden shrink-0 bg-gray-50 dark:bg-gray-800">
                        <img v-if="form.details.supervisorImage" :src="form.details.supervisorImage" class="w-full h-full object-cover" />
                        <User v-else class="w-5 h-5 m-2.5 text-gray-400" />
                      </div>
                      <label class="cursor-pointer px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-white/10 transition-colors">
                        Pilih Foto
                        <input type="file" class="sr-only" @change="handleContactSelect" accept="image/*" />
                      </label>
                      <button v-if="form.details.supervisorImage" @click.prevent="form.details.supervisorImage = null" class="text-xs text-red-500 hover:text-red-700">Hapus</button>
                    </div>
                  </div>
                </div>

                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nomor WhatsApp Pengurus</label>
                  <div class="flex flex-col sm:flex-row gap-3">
                    <select 
                      v-model="form.details.supervisorWa"
                      class="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm"
                    >
                      <option value="" class="bg-white dark:bg-slate-800">Pilih dari daftar kontak...</option>
                      <option v-for="wa in adminStore.generalSettings.whatsapp" :key="wa.number" :value="wa.number" class="bg-white dark:bg-slate-800">{{ wa.name }} (+{{ wa.number }})</option>
                    </select>
                    <input 
                      v-model="form.details.supervisorWa"
                      type="text" 
                      placeholder="Atau ketik manual (Awali 62...)"
                      class="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all text-sm"
                    />
                  </div>
                  <p class="text-xs text-gray-500 mt-1">Nomor ini akan digunakan untuk tombol "Hubungi Pengurus (WA)" pada layanan ini.</p>
                </div>

                <div class="space-y-1">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Persyaratan / Catatan Khusus</label>
                  <textarea 
                    v-model="form.details.requirementsStr"
                    rows="3"
                    placeholder="Masukkan poin persyaratan (pisahkan tiap poin dengan baris baru/Enter)..."
                    class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all resize-none text-sm outline-none"
                  ></textarea>
                </div>
                
                <div class="pt-4 border-t border-gray-300 dark:border-white/5">
                  <div class="flex items-center justify-between mb-3">
                    <h5 class="text-sm font-semibold text-gray-900 dark:text-white">Tim Pengelola & Pengajar (Staff)</h5>
                    <button type="button" @click="addStaff" class="text-xs font-medium bg-secondary/10 hover:bg-secondary/20 text-secondary px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
                      <Plus class="w-3.5 h-3.5" /> Tambah Staff
                    </button>
                  </div>
                  
                  <div v-if="form.details.staff.length > 0" class="space-y-3">
                    <div v-for="(member, idx) in form.details.staff" :key="idx" class="flex flex-col sm:flex-row gap-3 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-200 dark:border-white/10 relative">
                      <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-full border border-gray-300 dark:border-white/20 overflow-hidden shrink-0 bg-white dark:bg-gray-900">
                          <img v-if="member.image" :src="member.image" class="w-full h-full object-cover" />
                          <User v-else class="w-6 h-6 m-3 text-gray-400" />
                        </div>
                        <div class="flex flex-col gap-1">
                          <label class="cursor-pointer text-[10px] font-medium bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 px-2 py-1 rounded text-gray-700 dark:text-gray-300 text-center transition-colors">
                            Ganti Foto
                            <input type="file" class="sr-only" @change="e => handleStaffSelect(e, idx)" accept="image/*" />
                          </label>
                          <button v-if="member.image" @click.prevent="member.image = null" class="text-[10px] text-red-500 hover:text-red-700 text-center">Hapus</button>
                        </div>
                      </div>
                      
                      <div class="flex-1 space-y-1">
                        <label class="block text-xs font-medium text-gray-500 dark:text-gray-400">Nama Lengkap</label>
                        <input v-model="member.name" type="text" required placeholder="Nama" class="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-xs" />
                      </div>
                      <div class="flex-1 space-y-1">
                        <label class="block text-xs font-medium text-gray-500 dark:text-gray-400">Jabatan / Peran</label>
                        <input v-model="member.role" type="text" required placeholder="Misal: Pengajar" class="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-xs" />
                      </div>
                      
                      <button @click.prevent="removeStaff(idx)" class="absolute top-3 right-3 sm:static sm:self-end sm:mb-1 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash2 class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div v-else class="text-center py-6 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-dashed border-gray-300 dark:border-white/20">
                    <Users class="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p class="text-xs text-gray-500">Belum ada data staff/pengelola.</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 border-t border-gray-300 dark:border-white/5 bg-gray-50 dark:bg-gray-900/50 shrink-0 flex items-center justify-end gap-3">
          <button 
            type="button" 
            @click="closeModal"
            class="px-4 py-2 rounded-lg font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 transition-colors text-sm"
          >
            Batal
          </button>
          <button 
            @click="saveItem"
            class="px-4 py-2 rounded-lg font-medium bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 transition-colors flex items-center gap-2 shadow-md text-sm"
          >
            <span>{{ isEditing ? 'Simpan Perubahan' : 'Tambahkan' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Plus, Edit2, Trash2, X, Briefcase, Users, User, BookOpen, GraduationCap, Heart, HandCoins, Gem, MapPin, Building, UploadCloud } from 'lucide-vue-next'
import { useToastStore } from '../../stores/toast'
import { useAdminStore } from '../../stores/admin'
import { useDialogStore } from '../../stores/dialog'
import { validateFileSize } from '@/utils/fileValidator'

const toastStore = useToastStore()
const adminStore = useAdminStore()
const dialog = useDialogStore()

onMounted(() => {
  adminStore.fetchLayanan()
})

const iconMap = {
  Users, BookOpen, GraduationCap, Heart, HandCoins, Gem, Briefcase, MapPin, Building
}

const showModal = ref(false)
const isEditing = ref(false)

const getDefaultForm = () => ({ 
  id: null, 
  title: '', 
  category: 'Ibadah',
  iconName: 'Briefcase',
  bgImage: null,
  description: '', 
  badge: '', 
  details: {
    fullDescription: '',
    schedule: '',
    location: '',
    supervisor: '',
    supervisorWa: '',
    supervisorImage: null,
    requirementsStr: '',
    staff: []
  }
})

const form = ref(getDefaultForm())

function openModal(item = null) {
  if (item) {
    isEditing.value = true
    form.value = { 
      ...getDefaultForm(),
      ...item, 
      details: {
        ...getDefaultForm().details,
        ...(item.details || {}),
        requirementsStr: item.details?.requirements?.join('\n') || ''
      }
    }
    if (form.value.details.staff) {
      form.value.details.staff = JSON.parse(JSON.stringify(form.value.details.staff))
    }
  } else {
    isEditing.value = false
    form.value = getDefaultForm()
  }
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

// Upload Handlers
const isDraggingBg = ref(false)
function handleBgDrop(e) {
  isDraggingBg.value = false
  const file = e.dataTransfer?.files[0]
  if (file && file.type.startsWith('image/')) {
    if (!validateFileSize(file)) return
    form.value.bgImage = URL.createObjectURL(file)
  }
}
function handleBgSelect(e) {
  const file = e.target.files[0]
  if (file) {
    if (!validateFileSize(file)) {
      e.target.value = ''
      return
    }
    form.value.bgImage = URL.createObjectURL(file)
  }
}

const isDraggingContact = ref(false)
function handleContactDrop(e) {
  isDraggingContact.value = false
  const file = e.dataTransfer?.files[0]
  if (file && file.type.startsWith('image/')) {
    if (!validateFileSize(file)) return
    form.value.details.supervisorImage = URL.createObjectURL(file)
  }
}
function handleContactSelect(e) {
  const file = e.target.files[0]
  if (file) {
    if (!validateFileSize(file)) {
      e.target.value = ''
      return
    }
    form.value.details.supervisorImage = URL.createObjectURL(file)
  }
}

function handleStaffSelect(e, index) {
  const file = e.target.files[0]
  if (file) {
    if (!validateFileSize(file)) {
      e.target.value = ''
      return
    }
    form.value.details.staff[index].image = URL.createObjectURL(file)
  }
}

// Staff Management
function addStaff() {
  form.value.details.staff.push({ name: '', role: '', image: null })
}
function removeStaff(index) {
  form.value.details.staff.splice(index, 1)
}

function closeModal() {
  showModal.value = false
  document.body.style.overflow = ''
}

function saveItem() {
  if (!form.value.title || !form.value.description) return
  
  const reqs = form.value.details.requirementsStr
    .split('\n')
    .map(r => r.trim())
    .filter(r => r !== '')
    
  const dataToSave = {
    ...form.value,
    details: {
      ...form.value.details,
      requirements: reqs
    }
  }
  delete dataToSave.details.requirementsStr
  
  if (isEditing.value) {
    adminStore.updateLayanan(form.value.id, dataToSave)
  } else {
    adminStore.addLayanan(dataToSave)
  }
  
  toastStore.addToast(isEditing.value ? 'Layanan berhasil diperbarui' : 'Layanan baru berhasil ditambahkan')
  closeModal()
}

async function deleteItem(id) {
  const confirmed = await dialog.open({
    title: 'Hapus Layanan',
    message: 'Apakah Anda yakin ingin menghapus layanan ini?',
    type: 'confirm'
  })
  if (confirmed) {
    adminStore.deleteLayanan(id)
    toastStore.addToast('Layanan berhasil dihapus', 'error')
  }
}

const getCategoryIcon = (categoryName) => {
  const cat = adminStore.masterData.kategori.find(k => k.name === categoryName)
  return cat ? cat.iconName : 'Briefcase'
}

const getLabelColorClass = (labelName) => {
  const label = adminStore.masterData.label.find(l => l.name === labelName)
  const color = label ? label.color : 'gray'
  
  const colorMap = {
    red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
    yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
    green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800',
    gray: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800',
  }
  
  return colorMap[color] || colorMap.gray
}
</script>
