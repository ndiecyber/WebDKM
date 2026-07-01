<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="dialog.isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-[#0F1717]/60 dark:bg-[#080C0C]/80 backdrop-blur-sm transition-opacity" @click="dialog.cancel()"></div>

        <!-- Modal Content -->
        <div 
          class="modal-content relative w-full max-w-md bg-white dark:bg-[#152020] rounded-3xl shadow-2xl flex flex-col border border-gray-200 dark:border-white/10 overflow-hidden text-left"
        >
          <!-- Header Area -->
          <div class="p-5 pb-3 sm:p-6 sm:pb-4">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <!-- Icon container based on type -->
                <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                     :class="{
                       'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400': dialog.type === 'confirm' || dialog.type === 'alert',
                       'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400': dialog.type === 'prompt'
                     }">
                  <AlertTriangle v-if="dialog.type === 'confirm' || dialog.type === 'alert'" class="w-5 h-5" />
                  <MessageSquare v-if="dialog.type === 'prompt'" class="w-5 h-5" />
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                    {{ dialog.title }}
                  </h3>
                </div>
              </div>
              
              <!-- Close Button -->
              <button @click="dialog.cancel()" class="p-1.5 -mr-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                <X class="w-5 h-5" />
              </button>
            </div>
            
            <div class="mt-3 pl-[52px]">
              <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                {{ dialog.message }}
              </p>
              
              <!-- Prompt Input -->
              <div v-if="dialog.type === 'prompt'" class="mt-3">
                <input 
                  type="text" 
                  ref="promptInput"
                  v-model="inputValue"
                  @keyup.enter="handleConfirm"
                  class="w-full bg-gray-50 dark:bg-[#0F1717] border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm"
                  :placeholder="dialog.inputPlaceholder"
                />
              </div>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="p-4 sm:p-5 bg-gray-50/50 dark:bg-black/20 flex gap-2 justify-end items-center border-t border-gray-100 dark:border-white/5">
            <button 
              v-if="dialog.type !== 'alert'"
              @click="dialog.cancel()" 
              class="px-4 py-2 rounded-lg font-medium text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-transparent border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              {{ dialog.cancelText }}
            </button>
            
            <button 
              @click="handleConfirm"
              class="px-4 py-2 rounded-lg font-medium text-sm text-white shadow-md transition-all active:scale-95"
              :class="{
                'bg-red-600 hover:bg-red-700 shadow-red-500/20': dialog.type === 'confirm' || dialog.type === 'alert',
                'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20': dialog.type === 'prompt'
              }"
            >
              {{ dialog.confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useDialogStore } from '../../stores/dialog'
import { AlertTriangle, MessageSquare, X } from 'lucide-vue-next'

const dialog = useDialogStore()
const inputValue = ref('')
const promptInput = ref(null)

// Reset input when modal opens
watch(() => dialog.isOpen, async (isOpen) => {
  if (isOpen) {
    inputValue.value = ''
    if (dialog.type === 'prompt') {
      // Focus input on next tick
      await nextTick()
      if (promptInput.value) promptInput.value.focus()
    }
  }
})

const handleConfirm = () => {
  if (dialog.type === 'prompt') {
    dialog.confirm(inputValue.value)
  } else {
    dialog.confirm(true)
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease-out;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .modal-content {
  animation: modalBounce 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.modal-leave-active .modal-content {
  transform: scale(0.95);
  opacity: 0;
  transition: all 0.3s ease-in;
}
@keyframes modalBounce {
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
