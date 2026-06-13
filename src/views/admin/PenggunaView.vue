<template>
  <div class="space-y-6 sm:space-y-8">
    <!-- Header & Tabs -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Manajemen Akses</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola pengguna dan hak akses (role) di sistem.</p>
      </div>
      
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
        <!-- Tabs -->
        <div class="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl flex items-center shadow-inner w-full sm:w-auto justify-center">
          <button 
            @click="activeTab = 'users'"
            :class="activeTab === 'users' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm font-semibold' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium'"
            class="flex-1 sm:flex-none px-4 py-2 text-sm rounded-lg transition-all text-center"
          >
            Pengguna
          </button>
          <button 
            @click="activeTab = 'roles'"
            :class="activeTab === 'roles' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm font-semibold' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium'"
            class="flex-1 sm:flex-none px-4 py-2 text-sm rounded-lg transition-all text-center"
          >
            Peran
          </button>
        </div>

        <button 
          @click="activeTab === 'users' ? openUserModal() : openRoleModal()"
          class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2.5 rounded-xl transition-colors shadow-sm text-sm flex items-center justify-center gap-2 shrink-0 w-full sm:w-[190px]"
        >
          <Plus class="w-4 h-4" />
          <span>Tambah {{ activeTab === 'users' ? 'Pengguna' : 'Peran' }}</span>
        </button>
      </div>
    </div>

    <!-- ==================== USERS TAB ==================== -->
    <div v-if="activeTab === 'users'" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm whitespace-nowrap">
          <thead class="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-white/5">
            <tr>
              <th class="px-6 py-4 font-semibold w-16">No</th>
              <th class="px-6 py-4 font-semibold">Nama Lengkap</th>
              <th class="px-6 py-4 font-semibold">Peran</th>
              <th class="px-6 py-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-white/5">
            <tr v-for="(user, index) in sortedUsers" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <td class="px-6 py-4 text-gray-500 dark:text-gray-400">{{ index + 1 }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                    {{ user.name.charAt(0) }}
                  </div>
                  <div>
                    <span class="font-medium text-gray-900 dark:text-white">{{ user.name }}</span>
                    <span v-if="user.id === adminStore.currentUser?.id" class="ml-2 text-[10px] font-bold bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-md">ANDA</span>
                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ user.username }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="px-2.5 py-1 text-xs font-semibold rounded-full border" :class="getRoleStyle(user.role)">
                  {{ getRoleName(user.role) }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2" v-if="user.id !== adminStore.currentUser?.id && canManageTarget(user)">
                  <button 
                    @click="openUserModal(user)" 
                    class="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-colors"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button 
                    @click="confirmDeleteUser(user.id)" 
                    class="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="adminStore.users.length === 0">
              <td colspan="5" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                Belum ada data pengguna.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ==================== ROLES TAB ==================== -->
    <div v-if="activeTab === 'roles'" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm whitespace-nowrap">
          <thead class="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-white/5">
            <tr>
              <th class="px-6 py-4 font-semibold w-16">No</th>
              <th class="px-6 py-4 font-semibold">Nama Role</th>
              <th class="px-6 py-4 font-semibold">Akses Modul</th>
              <th class="px-6 py-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-white/5">
            <tr v-for="(role, index) in sortedRoles" :key="role.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <td class="px-6 py-4 text-gray-500 dark:text-gray-400 font-bold">{{ index + 1 }}</td>
              <td class="px-6 py-4">
                <div class="font-medium text-gray-900 dark:text-white">{{ role.name }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400 font-mono">{{ role.key }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="flex gap-1.5 flex-wrap max-w-xs">
                  <span v-for="mod in role.modules" :key="mod" class="px-2 py-0.5 text-[10px] font-semibold rounded bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 uppercase tracking-wider">
                    {{ mod }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-1.5">
                  <div class="flex flex-col border-r border-gray-200 dark:border-white/10 pr-2 mr-1" v-if="role.key !== 'superadmin'">
                    <button 
                      @click="adminStore.moveRoleUp(role.id)"
                      :disabled="index === 1"
                      class="text-gray-400 hover:text-emerald-600 disabled:opacity-30 disabled:hover:text-gray-400 p-0.5"
                      title="Naikkan Hierarki"
                    >
                      <ArrowUp class="w-3.5 h-3.5" />
                    </button>
                    <button 
                      @click="adminStore.moveRoleDown(role.id)"
                      :disabled="index === sortedRoles.length - 1"
                      class="text-gray-400 hover:text-emerald-600 disabled:opacity-30 disabled:hover:text-gray-400 p-0.5"
                      title="Turunkan Hierarki"
                    >
                      <ArrowDown class="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button 
                    v-if="canManageTarget({ role: role.key })"
                    @click="openRoleModal(role)" 
                    class="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-colors"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button 
                    v-if="role.key !== 'superadmin' && canManageTarget({ role: role.key })"
                    @click="confirmDeleteRole(role.id)" 
                    class="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ==================== USER MODAL ==================== -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="isUserModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div class="absolute inset-0 bg-gray-950/80 backdrop-blur-sm" @click="closeUserModal"></div>
          
          <div class="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden border border-gray-200 dark:border-white/10">
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/5 shrink-0 bg-gray-50/50 dark:bg-white/5">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ isEditingUser ? 'Edit Pengguna' : 'Tambah Pengguna' }}</h3>
              <button @click="closeUserModal" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <X class="w-5 h-5" />
              </button>
            </div>
            
            <!-- Modal Body -->
            <div class="p-6 overflow-y-auto">
              <form @submit.prevent="saveUser" class="space-y-4">
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lengkap</label>
                  <input v-model="userFormData.name" type="text" required class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all text-sm shadow-sm" placeholder="Contoh: Budi Santoso" />
                </div>
                
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                  <input v-model="userFormData.username" type="text" required class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all text-sm shadow-sm" placeholder="Contoh: budi123" />
                </div>

                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                  <input v-model="userFormData.password" type="password" :required="!isEditingUser" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all text-sm shadow-sm" :placeholder="isEditingUser ? 'Biarkan kosong jika tidak diubah' : 'Masukkan password'" />
                </div>

                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Peran</label>
                  <select v-model="userFormData.role" required :disabled="isEditingUser && userFormData.role === 'superadmin'" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all text-sm shadow-sm disabled:opacity-50">
                    <option v-for="role in assignableRoles" :key="role.key" :value="role.key">
                      {{ role.name }} (No. {{ role.hierarchy }})
                    </option>
                  </select>
                </div>
              </form>
            </div>
            
            <!-- Modal Footer -->
            <div class="p-6 border-t border-gray-200 dark:border-white/5 shrink-0 flex justify-end gap-3 bg-gray-50/50 dark:bg-gray-900">
              <button @click="closeUserModal" type="button" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Batal
              </button>
              <button @click="saveUser" type="button" class="px-4 py-2 text-sm font-medium text-white dark:text-gray-950 bg-secondary hover:bg-yellow-500 rounded-lg transition-colors flex items-center gap-2 shadow-sm">
                <Save class="w-4 h-4" />
                <span>Simpan Pengguna</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ==================== ROLE MODAL ==================== -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="isRoleModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div class="absolute inset-0 bg-gray-950/80 backdrop-blur-sm" @click="closeRoleModal"></div>
          
          <div class="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden border border-gray-200 dark:border-white/10">
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/5 shrink-0 bg-gray-50/50 dark:bg-white/5">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ isEditingRole ? 'Edit Peran (Role)' : 'Tambah Peran (Role)' }}</h3>
              <button @click="closeRoleModal" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <X class="w-5 h-5" />
              </button>
            </div>
            
            <!-- Modal Body -->
            <div class="p-6 overflow-y-auto">
              <form @submit.prevent="saveRole" class="space-y-4">
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Peran</label>
                  <input v-model="roleFormData.name" type="text" required class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all text-sm shadow-sm" placeholder="Contoh: Admin Keuangan" />
                </div>
                
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kode Unik (Key)</label>
                  <input v-model="roleFormData.key" type="text" required :disabled="isEditingRole" class="w-full bg-white dark:bg-gray-950 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all text-sm shadow-sm disabled:opacity-50" placeholder="Contoh: adm_keuangan (tanpa spasi)" />
                  <p class="text-[10px] text-gray-500">Kode unik sistem. Tidak bisa diubah setelah dibuat.</p>
                </div>

                <div class="space-y-3 pt-2">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-white/5 pb-2">Hak Akses Modul</label>
                  <div class="space-y-2 max-h-32 overflow-y-auto">
                    <label v-for="mod in availableModules" :key="mod.key" class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer border border-transparent">
                      <input type="checkbox" v-model="roleFormData.modules" :value="mod.key" class="w-4 h-4 rounded text-secondary focus:ring-secondary bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700" />
                      <div>
                        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ mod.name }}</p>
                        <p class="text-xs text-gray-500">{{ mod.desc }}</p>
                      </div>
                    </label>
                  </div>
                </div>
              </form>
            </div>
            
            <!-- Modal Footer -->
            <div class="p-6 border-t border-gray-200 dark:border-white/5 shrink-0 flex justify-end gap-3 bg-gray-50/50 dark:bg-gray-900">
              <button @click="closeRoleModal" type="button" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Batal
              </button>
              <button @click="saveRole" type="button" class="px-4 py-2 text-sm font-medium text-white dark:text-gray-950 bg-secondary hover:bg-yellow-500 rounded-lg transition-colors flex items-center gap-2 shadow-sm">
                <Save class="w-4 h-4" />
                <span>Simpan Role</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { Plus, Edit, Trash2, X, Save, ArrowUp, ArrowDown } from 'lucide-vue-next'
import { useAdminStore } from '../../stores/admin'
import { useToastStore } from '../../stores/toast'

const adminStore = useAdminStore()
const toastStore = useToastStore()

// TABS
const activeTab = ref('users')

// AVAILABLE MODULES
const availableModules = [
  { key: 'web', name: 'Web DKM', desc: 'Akses berita, galeri, dan layanan web publik.' },
  { key: 'keuangan', name: 'Keuangan DKM', desc: 'Akses pencatatan kas, transaksi, dan laporan.' },
  { key: 'qurban', name: 'Tabungan Qurban', desc: 'Akses pendaftaran dan manajemen qurban.' },
  { key: 'sistem', name: 'Sistem & Pengaturan', desc: 'Akses manajemen pengguna, role, dan pengaturan umum.' }
]

// SORTED USERS
const sortedUsers = computed(() => {
  return [...adminStore.users].sort((a, b) => {
    const roleA = adminStore.roles.find(r => r.key === a.role)
    const roleB = adminStore.roles.find(r => r.key === b.role)
    const hierarchyA = roleA ? roleA.hierarchy : 999
    const hierarchyB = roleB ? roleB.hierarchy : 999

    if (hierarchyA !== hierarchyB) {
      return hierarchyA - hierarchyB
    }

    // Fallback: urutkan nama sesuai abjad
    return a.name.localeCompare(b.name)
  })
})

// =================== USERS LOGIC ===================
const isUserModalOpen = ref(false)
const isEditingUser = ref(false)
const editUserId = ref(null)

const userFormData = reactive({
  name: '',
  username: '',
  password: '',
  role: 'bendahara'
})

// RBAC Utilities
function canManageTarget(targetUserOrRole) {
  // Finds target hierarchy
  const targetRoleData = adminStore.roles.find(r => r.key === targetUserOrRole.role)
  const targetHierarchy = targetRoleData ? targetRoleData.hierarchy : 999
  return adminStore.canManageRole(targetHierarchy)
}

const assignableRoles = computed(() => {
  const currentRoleData = adminStore.currentRoleData
  if (!currentRoleData) return []
  
  // You can only assign roles that are strictly lower hierarchy (> value) than yourself
  // Superadmin (hierarchy 1) can assign hierarchy > 1 (e.g. 2, 3, etc.)
  // However, if the user is editing themselves, or if they are superadmin, we might show more.
  // For safety, return all roles if Superadmin, else filter.
  if (currentRoleData.key === 'superadmin') {
    return adminStore.roles
  }
  return adminStore.roles.filter(r => r.hierarchy > currentRoleData.hierarchy)
})

function getRoleName(roleKey) {
  const roleData = adminStore.roles.find(r => r.key === roleKey)
  return roleData ? roleData.name : roleKey
}

function getRoleStyle(roleKey) {
  // Dynamic coloring based on hierarchy could be nice, but fallback mapping is ok
  if (roleKey === 'superadmin') return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20'
  if (roleKey === 'bendahara') return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
  if (roleKey === 'humas') return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20'
  return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400 dark:border-gray-500/20'
}

function openUserModal(user = null) {
  if (user) {
    isEditingUser.value = true
    editUserId.value = user.id
    userFormData.name = user.name
    userFormData.username = user.username
    userFormData.password = ''
    userFormData.role = user.role
  } else {
    isEditingUser.value = false
    editUserId.value = null
    userFormData.name = ''
    userFormData.username = ''
    userFormData.password = ''
    userFormData.role = assignableRoles.value.length > 0 ? assignableRoles.value[0].key : ''
  }
  isUserModalOpen.value = true
}

function closeUserModal() {
  isUserModalOpen.value = false
}

function saveUser() {
  if (!userFormData.name || !userFormData.username || (!isEditingUser.value && !userFormData.password)) {
    toastStore.addToast('Mohon lengkapi semua field yang diperlukan.', 'error')
    return
  }

  const userData = { ...userFormData }
  if (isEditingUser.value && !userData.password) {
    const existingUser = adminStore.users.find(u => u.id === editUserId.value)
    if (existingUser) {
      userData.password = existingUser.password
    }
  }

  if (isEditingUser.value) {
    adminStore.updateUser(editUserId.value, userData)
    toastStore.addToast('Data pengguna berhasil diperbarui.')
  } else {
    adminStore.addUser(userData)
    toastStore.addToast('Pengguna baru berhasil ditambahkan.')
  }
  
  closeUserModal()
}

function confirmDeleteUser(id) {
  if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
    adminStore.deleteUser(id)
    toastStore.addToast('Pengguna berhasil dihapus.')
  }
}

// =================== ROLES LOGIC ===================
const sortedRoles = computed(() => {
  return [...adminStore.roles].sort((a, b) => a.hierarchy - b.hierarchy)
})

const isRoleModalOpen = ref(false)
const isEditingRole = ref(false)
const editRoleId = ref(null)

const roleFormData = reactive({
  key: '',
  name: '',
  modules: []
})

function openRoleModal(role = null) {
  if (role) {
    isEditingRole.value = true
    editRoleId.value = role.id
    roleFormData.key = role.key
    roleFormData.name = role.name
    roleFormData.modules = [...role.modules]
  } else {
    isEditingRole.value = false
    editRoleId.value = null
    roleFormData.key = ''
    roleFormData.name = ''
    roleFormData.modules = []
  }
  isRoleModalOpen.value = true
}

function closeRoleModal() {
  isRoleModalOpen.value = false
}

function saveRole() {
  if (!roleFormData.key || !roleFormData.name) {
    toastStore.addToast('Mohon lengkapi data role.', 'error')
    return
  }
  
  // Format key
  roleFormData.key = roleFormData.key.toLowerCase().replace(/[^a-z0-9_]/g, '_')

  if (isEditingRole.value) {
    adminStore.updateRole(editRoleId.value, { ...roleFormData })
    toastStore.addToast('Peran berhasil diperbarui.')
  } else {
    // Cek duplikasi key
    if (adminStore.roles.some(r => r.key === roleFormData.key)) {
      toastStore.addToast('Kode unik (Key) sudah digunakan!', 'error')
      return
    }
    adminStore.addRole({ ...roleFormData })
    toastStore.addToast('Peran baru berhasil ditambahkan.')
  }
  closeRoleModal()
}

function confirmDeleteRole(id) {
  const role = adminStore.roles.find(r => r.id === id)
  if (role && role.key === 'superadmin') {
    toastStore.addToast('Super Admin tidak bisa dihapus!', 'error')
    return
  }
  
  // Cek apakah ada user yg masih menggunakan role ini
  if (adminStore.users.some(u => u.role === role.key)) {
    toastStore.addToast('Gagal: Masih ada pengguna dengan peran ini.', 'error')
    return
  }

  if (confirm(`Apakah Anda yakin ingin menghapus peran "${role.name}"?`)) {
    adminStore.deleteRole(id)
    toastStore.addToast('Peran berhasil dihapus.')
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
