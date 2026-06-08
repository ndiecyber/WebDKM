<template>
  <div class="min-h-screen relative flex items-center justify-center overflow-hidden bg-gray-950">
    <!-- Stunning Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <img src="@/assets/images/mosque-exterior.png" alt="Background" class="w-full h-full object-cover opacity-40 scale-105 animate-pulse-slow" />
      <div class="absolute inset-0 bg-linear-to-br from-gray-950/90 via-emerald-950/80 to-gray-950/90 mix-blend-multiply"></div>
      <div class="absolute inset-0 bg-linear-to-t from-gray-950 via-transparent to-transparent"></div>
    </div>

    <!-- Animated Ambient Glows -->
    <div class="absolute inset-0 z-0 opacity-30 pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] animate-blob"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
    </div>

    <!-- Login Card -->
    <div class="w-full max-w-[420px] p-6 relative z-10 perspective-1000">
      <div class="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-8 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transform transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_64px_0_rgba(16,185,129,0.2)]">
        
        <!-- Header -->
        <div class="text-center mb-10">
          <div class="w-24 h-24 mx-auto mb-6 relative group">
            <div class="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:bg-emerald-400/30 transition-colors duration-500"></div>
            <div class="relative w-full h-full bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center p-3 shadow-inner overflow-hidden">
              <img src="@/assets/images/logo-kustom2.png" alt="Logo" class="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>
          <h1 class="font-heading text-3xl font-extrabold text-white tracking-tight drop-shadow-sm mb-2">Admin Portal</h1>
          <p class="text-gray-300 text-sm font-medium">Sistem Manajemen Masjid Jami Kassiti</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Error Message -->
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform -translate-y-2 opacity-0"
            enter-to-class="transform translate-y-0 opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="transform translate-y-0 opacity-100"
            leave-to-class="transform -translate-y-2 opacity-0"
          >
            <div v-if="errorMsg" class="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-4 rounded-xl flex items-center gap-3 backdrop-blur-md shadow-inner">
              <AlertCircle class="w-5 h-5 shrink-0 text-red-400" />
              <span class="font-medium">{{ errorMsg }}</span>
            </div>
          </Transition>

          <!-- Username Input -->
          <div class="space-y-2 relative group">
            <label class="block text-gray-300 text-xs font-bold uppercase tracking-widest pl-1">Username</label>
            <div class="relative overflow-hidden rounded-xl">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <User class="w-5 h-5 text-gray-400 group-focus-within:text-emerald-400 transition-colors" />
              </div>
              <input 
                v-model="username"
                type="text" 
                class="w-full bg-gray-900/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:bg-gray-900/80 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner relative z-0"
                placeholder="Masukkan username"
                required
              />
            </div>
          </div>

          <!-- Password Input -->
          <div class="space-y-2 relative group">
            <label class="block text-gray-300 text-xs font-bold uppercase tracking-widest pl-1">Password</label>
            <div class="relative overflow-hidden rounded-xl">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <Lock class="w-5 h-5 text-gray-400 group-focus-within:text-emerald-400 transition-colors" />
              </div>
              <input 
                v-model="password"
                type="password" 
                class="w-full bg-gray-900/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:bg-gray-900/80 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner relative z-0"
                placeholder="Masukkan password"
                required
              />
            </div>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            class="w-full relative group overflow-hidden bg-linear-to-r from-emerald-600 to-teal-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-2 mt-8 border border-white/10"
          >
            <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            <span class="relative z-10 tracking-wide text-sm">Masuk Sistem</span>
            <ArrowRight class="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <!-- Footer / Demo Credentials -->
        <div class="mt-8 text-center text-[10px] text-gray-400 uppercase tracking-widest">
          <p>Kredensial Demo:</p>
          <p class="mt-1 font-bold text-gray-300"><span class="text-emerald-400">admin</span> / <span class="text-emerald-400">admin123</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../../stores/admin'
import { Shield, User, Lock, ArrowRight, AlertCircle } from 'lucide-vue-next'

const router = useRouter()
const adminStore = useAdminStore()

const username = ref('')
const password = ref('')
const errorMsg = ref('')

function handleLogin() {
  errorMsg.value = ''
  const success = adminStore.login(username.value, password.value)
  
  if (success) {
    router.push({ name: 'admin-dashboard' })
  } else {
    errorMsg.value = 'Username atau password salah.'
  }
}
</script>
