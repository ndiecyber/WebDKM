<template>
  <div class="fixed top-6 right-6 z-100 flex flex-col gap-3 pointer-events-none">
    <TransitionGroup name="toast">
      <div 
        v-for="toast in toastStore.toasts" 
        :key="toast.id"
        class="bg-[#1A2525]/90 backdrop-blur-xl border px-5 py-3.5 rounded-2xl flex items-center gap-3 shadow-2xl min-w-[300px] pointer-events-auto overflow-hidden relative"
        :class="toast.type === 'success' ? 'border-green-500/30' : 'border-red-500/30'"
      >
        <!-- Progress bar effect -->
        <div class="absolute bottom-0 left-0 h-0.5 bg-linear-to-r"
             :class="toast.type === 'success' ? 'from-green-500/50 to-green-400' : 'from-red-500/50 to-red-400'"
             style="width: 100%; animation: toast-progress 3.5s linear forwards;">
        </div>
        
        <!-- Icon -->
        <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
             :class="toast.type === 'success' ? 'bg-green-500/10' : 'bg-red-500/10'">
          <CheckCircle2 v-if="toast.type === 'success'" class="w-5 h-5 text-green-400" />
          <AlertCircle v-else class="w-5 h-5 text-red-400" />
        </div>
        
        <!-- Message & Action -->
        <div class="flex-1 min-w-0">
          <p class="text-white text-sm font-medium">{{ toast.message }}</p>
          <router-link 
            v-if="toast.action" 
            :to="toast.action.route" 
            class="inline-block mt-1.5 text-xs font-bold text-yellow-400 hover:text-yellow-300 transition-colors uppercase tracking-wide"
            @click="toastStore.removeToast(toast.id)"
          >
            {{ toast.action.label }} &rarr;
          </router-link>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useToastStore } from '../../stores/toast'
import { CheckCircle2, AlertCircle } from 'lucide-vue-next'

const toastStore = useToastStore()
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.9);
}

@keyframes toast-progress {
  from { width: 100%; }
  to { width: 0%; }
}
</style>
