<template>
  <div class="min-h-screen bg-dark flex items-center justify-center relative overflow-hidden">
    <!-- Background Decor -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <div class="absolute top-0 left-0 w-96 h-96 bg-primary/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
    </div>

    <!-- Login Card -->
    <div class="w-full max-w-md p-8 relative z-10">
      <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield class="w-8 h-8 text-white" />
          </div>
          <h1 class="font-heading text-2xl font-bold text-white mb-2">Admin Portal</h1>
          <p class="text-white/50 text-sm">Masuk untuk mengelola sistem website Masjid Jami Kassiti</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Error Message -->
          <div v-if="errorMsg" class="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl flex items-start gap-2">
            <AlertCircle class="w-5 h-5 shrink-0" />
            <span>{{ errorMsg }}</span>
          </div>

          <!-- Username -->
          <div>
            <label class="block text-white/70 text-sm font-medium mb-2">Username</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User class="w-5 h-5 text-white/40" />
              </div>
              <input 
                v-model="username"
                type="text" 
                class="w-full bg-dark/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                placeholder="Masukkan username"
                required
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-white/70 text-sm font-medium mb-2">Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock class="w-5 h-5 text-white/40" />
              </div>
              <input 
                v-model="password"
                type="password" 
                class="w-full bg-dark/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                placeholder="Masukkan password"
                required
              />
            </div>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            class="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary text-dark font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-secondary/20 flex items-center justify-center gap-2 mt-4"
          >
            <span>Masuk</span>
            <ArrowRight class="w-5 h-5" />
          </button>
        </form>

        <div class="mt-8 text-center text-xs text-white/30">
          <p>Gunakan kredensial default untuk demo:</p>
          <p class="mt-1">Username: <strong>admin</strong> | Password: <strong>admin123</strong></p>
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
