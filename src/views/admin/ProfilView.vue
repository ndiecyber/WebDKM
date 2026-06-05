<template>
  <div class="space-y-6 sm:space-y-8">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">Profil Saya</h1>
        <p class="text-sm text-gray-400 mt-1">Kelola informasi pribadi dan pengaturan keamanan akun Anda.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
      
      <!-- Left Column: Avatar & Summary -->
      <div class="space-y-6">
        <div class="bg-gray-900 ring-1 ring-white/10 rounded-xl shadow-sm overflow-hidden relative">
          <div class="h-24 bg-gradient-to-r from-gray-800 to-gray-700 w-full border-b border-white/5"></div>
          <div class="px-6 pb-6 relative">
            <div class="flex justify-between items-end -mt-10 mb-4">
              <div class="relative group">
                <div class="w-20 h-20 rounded-xl bg-gray-800 ring-4 ring-gray-900 flex items-center justify-center overflow-hidden">
                  <User class="w-10 h-10 text-gray-500" />
                </div>
                <button class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                  <Camera class="w-6 h-6 text-white" />
                </button>
              </div>
              <span class="px-3 py-1 bg-yellow-500/10 text-yellow-500 text-xs font-semibold tracking-wider uppercase rounded-lg ring-1 ring-yellow-500/20 mb-2">Superadmin</span>
            </div>
            
            <h3 class="text-xl font-bold text-white">{{ profile.name }}</h3>
            <p class="text-sm text-gray-400 mt-1">{{ profile.email }}</p>
            
            <div class="mt-6 pt-6 border-t border-white/5 flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <ShieldCheck class="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-300">Akun Terverifikasi</p>
                <p class="text-xs text-gray-500">Sejak 12 Jan 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Settings Forms -->
      <div class="lg:col-span-2 space-y-6">
        
        <!-- Form: Informasi Pribadi -->
        <form @submit.prevent="saveProfile" class="bg-gray-900 ring-1 ring-white/10 rounded-xl shadow-sm">
          <div class="p-6 sm:p-8 border-b border-white/5">
            <h3 class="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              <UserCircle class="w-5 h-5 text-gray-400" />
              Informasi Pribadi
            </h3>
            <p class="text-sm text-gray-400 mt-1">Perbarui nama lengkap dan alamat email Anda.</p>
          </div>
          
          <div class="p-6 sm:p-8 space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-300">Nama Lengkap</label>
                <input 
                  v-model="profile.name"
                  type="text" 
                  required
                  class="w-full bg-white/5 border-0 ring-1 ring-white/10 rounded-lg px-3 py-2 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all text-sm shadow-sm"
                />
              </div>
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-300">Alamat Email</label>
                <input 
                  v-model="profile.email"
                  type="email" 
                  required
                  class="w-full bg-white/5 border-0 ring-1 ring-white/10 rounded-lg px-3 py-2 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all text-sm shadow-sm"
                />
              </div>
            </div>
          </div>

          <div class="px-6 py-4 border-t border-white/5 bg-gray-900/50 flex justify-end">
            <button 
              type="submit"
              :disabled="isSavingProfile"
              class="bg-white/5 hover:bg-white/10 ring-1 ring-white/10 text-gray-200 font-medium px-4 py-2 rounded-lg transition-colors shadow-sm text-sm flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span v-if="isSavingProfile" class="w-4 h-4 border-2 border-gray-400 border-t-gray-100 rounded-full animate-spin"></span>
              <Save v-else class="w-4 h-4 text-gray-400" />
              <span>Simpan Profil</span>
            </button>
          </div>
        </form>

        <!-- Form: Keamanan Akun -->
        <form @submit.prevent="savePassword" class="bg-gray-900 ring-1 ring-white/10 rounded-xl shadow-sm">
          <div class="p-6 sm:p-8 border-b border-white/5">
            <h3 class="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              <Lock class="w-5 h-5 text-gray-400" />
              Ubah Password
            </h3>
            <p class="text-sm text-gray-400 mt-1">Pastikan akun Anda menggunakan kata sandi yang panjang dan acak.</p>
          </div>
          
          <div class="p-6 sm:p-8 space-y-6">
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-300">Password Saat Ini</label>
              <input 
                v-model="passwordForm.current"
                type="password" 
                required
                class="w-full sm:max-w-md bg-white/5 border-0 ring-1 ring-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-secondary transition-all text-sm shadow-sm"
              />
            </div>
            
            <div class="border-t border-white/5 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-300">Password Baru</label>
                <input 
                  v-model="passwordForm.new"
                  type="password" 
                  required
                  class="w-full bg-white/5 border-0 ring-1 ring-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-secondary transition-all text-sm shadow-sm"
                />
              </div>
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-300">Konfirmasi Password Baru</label>
                <input 
                  v-model="passwordForm.confirm"
                  type="password" 
                  required
                  class="w-full bg-white/5 border-0 ring-1 ring-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-secondary transition-all text-sm shadow-sm"
                />
              </div>
            </div>
          </div>

          <div class="px-6 py-4 border-t border-white/5 bg-gray-900/50 flex justify-end">
            <button 
              type="submit"
              :disabled="isSavingPassword"
              class="bg-secondary hover:bg-yellow-500 text-gray-950 font-medium px-4 py-2 rounded-lg transition-colors shadow-sm text-sm flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span v-if="isSavingPassword" class="w-4 h-4 border-2 border-gray-950/30 border-t-gray-950 rounded-full animate-spin"></span>
              <Lock v-else class="w-4 h-4" />
              <span>Perbarui Password</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { User, Camera, ShieldCheck, UserCircle, Lock, Save } from 'lucide-vue-next'
import { useToastStore } from '../../stores/toast'

const toastStore = useToastStore()
const isSavingProfile = ref(false)
const isSavingPassword = ref(false)

// Mock Data
const profile = ref({
  name: 'Admin Utama',
  email: 'admin@masjidkassiti.com'
})

const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
})

function saveProfile() {
  isSavingProfile.value = true
  setTimeout(() => {
    isSavingProfile.value = false
    toastStore.addToast('Profil berhasil diperbarui')
  }, 800)
}

function savePassword() {
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    toastStore.addToast('Konfirmasi password baru tidak cocok', 'error')
    return
  }
  
  isSavingPassword.value = true
  setTimeout(() => {
    isSavingPassword.value = false
    toastStore.addToast('Password berhasil diubah')
    passwordForm.value = { current: '', new: '', confirm: '' }
  }, 1000)
}
</script>
