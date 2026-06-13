<template>
  <div class="space-y-6 sm:space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Manajemen Pengguna</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola akses akun admin dan peran masing-masing pengurus.</p>
      </div>
      <button 
        @click="openModal()"
        class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2 rounded-lg transition-colors shadow-md text-sm flex items-center gap-2 justify-center shrink-0"
      >
        <Plus class="w-4 h-4" />
        <span>Tambah Pengguna</span>
      </button>
    </div>

    <!-- Table Section -->
    <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm whitespace-nowrap">
          <thead class="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-white/5">
            <tr>
              <th class="px-6 py-4 font-semibold">Nama Lengkap</th>
              <th class="px-6 py-4 font-semibold">Username</th>
              <th class="px-6 py-4 font-semibold">Peran (Role)</th>
              <th class="px-6 py-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-white/5">
            <tr v-for="user in adminStore.users" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                    {{ user.name.charAt(0) }}
                  </div>
                  <span class="font-medium text-gray-900 dark:text-white">{{ user.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-500 dark:text-gray-400">
                {{ user.username }}
              </td>
              <td class="px-6 py-4">
                <span class="px-2.5 py-1 text-xs font-semibold rounded-full border" :class="getRoleStyle(user.role)">
                  {{ getRoleName(user.role) }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button @click="openModal(user)" class="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-colors">
                    <Edit class="w-4 h-4" />
                  </button>
                  <button v-if="user.id !== adminStore.currentUser?.id" @click="confirmDelete(user.id)" class="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="adminStore.users.length === 0">
              <td colspan="4" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                Belum ada data pengguna.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Form -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div class="absolute inset-0 bg-gray-950/80 backdrop-blur-sm" @click="closeModal"></div>
          
          <div class="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden border border-gray-200 dark:border-white/10">
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/5 shrink-0 bg-gray-50/50 dark:bg-white/5">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ isEditing ? 'Edit Pengguna' : 'Tambah Pengguna' }}</h3>
              <button @click="closeModal" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <X class="w-5 h-5" />
              </button>
            </div>
            
            <!-- Modal Body -->
            <div class="p-6 overflow-y-auto">
              <form @submit.prevent="saveUser" class="space-y-4">
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lengkap</label>
                  <input v-model="formData.name" type="text" required class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all text-sm" placeholder="Contoh: Budi Santoso" />
                </div>
                
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                  <input v-model="formData.username" type="text" required class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all text-sm" placeholder="Contoh: budi123" />
                </div>

                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                  <input v-model="formData.password" type="password" :required="!isEditing" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all text-sm" :placeholder="isEditing ? 'Biarkan kosong jika tidak diubah' : 'Masukkan password'" />
                </div>

                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Peran (Role)</label>
                  <select v-model="formData.role" required class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all appearance-none text-sm">
                    <option value="superadmin">Super Admin (Akses Penuh)</option>
                    <option value="bendahara">Bendahara (Modul Keuangan Saja)</option>
                    <option value="humas">Seksi Humas & Acara (Modul Web Saja)</option>
                  </select>
                </div>
              </form>
            </div>
            
            <!-- Modal Footer -->
            <div class="p-6 border-t border-gray-200 dark:border-white/5 shrink-0 flex justify-end gap-3 bg-gray-50/50 dark:bg-white/5">
              <button @click="closeModal" type="button" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Batal
              </button>
              <button @click="saveUser" type="button" class="px-4 py-2 text-sm font-medium text-white bg-secondary hover:bg-yellow-500 rounded-lg transition-colors flex items-center gap-2">
                <Save class="w-4 h-4" />
                <span>Simpan</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Plus, Edit, Trash2, X, Save } from 'lucide-vue-next'
import { useAdminStore } from '../../stores/admin'
import { useToastStore } from '../../stores/toast'

const adminStore = useAdminStore()
const toastStore = useToastStore()

const isModalOpen = ref(false)
const isEditing = ref(false)
const editId = ref(null)

const formData = reactive({
  name: '',
  username: '',
  password: '',
  role: 'bendahara'
})

function getRoleName(role) {
  const roles = {
    superadmin: 'Super Admin',
    bendahara: 'Bendahara',
    humas: 'Humas & Acara'
  }
  return roles[role] || role
}

function getRoleStyle(role) {
  const styles = {
    superadmin: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20',
    bendahara: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
    humas: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20'
  }
  return styles[role] || 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400 dark:border-gray-500/20'
}

function openModal(user = null) {
  if (user) {
    isEditing.value = true
    editId.value = user.id
    formData.name = user.name
    formData.username = user.username
    formData.password = '' // Leave password empty when editing unless changing
    formData.role = user.role
  } else {
    isEditing.value = false
    editId.value = null
    formData.name = ''
    formData.username = ''
    formData.password = ''
    formData.role = 'bendahara'
  }
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

function saveUser() {
  if (!formData.name || !formData.username || (!isEditing.value && !formData.password)) {
    toastStore.addToast('Mohon lengkapi semua field yang diperlukan.', 'error')
    return
  }

  const userData = { ...formData }
  if (isEditing.value && !userData.password) {
    // If editing and password is empty, keep existing password
    const existingUser = adminStore.users.find(u => u.id === editId.value)
    if (existingUser) {
      userData.password = existingUser.password
    }
  }

  if (isEditing.value) {
    adminStore.updateUser(editId.value, userData)
    toastStore.addToast('Data pengguna berhasil diperbarui.')
  } else {
    adminStore.addUser(userData)
    toastStore.addToast('Pengguna baru berhasil ditambahkan.')
  }
  
  closeModal()
}

function confirmDelete(id) {
  if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
    adminStore.deleteUser(id)
    toastStore.addToast('Pengguna berhasil dihapus.')
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95) translateY(10px);
}
</style>
