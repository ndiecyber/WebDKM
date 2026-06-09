<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      >
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-dark/80 backdrop-blur-md"
          @click="$emit('close')"
        ></div>

        <!-- Modal Content -->
        <div 
          class="modal-content relative w-full max-w-2xl bg-white dark:bg-dark-light rounded-3xl shadow-2xl flex flex-col h-[calc(100vh-3rem)] sm:h-auto sm:max-h-[90vh] border border-white/20 dark:border-white/10 overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          <!-- Header Image & Close Button -->
          <div class="relative shrink-0 h-48 sm:h-56 bg-dark rounded-t-3xl overflow-hidden">
            <img 
              v-if="event.image"
              :src="event.image" 
              :alt="event.title" 
              class="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
            />
            <div class="absolute inset-0 bg-linear-to-t from-white dark:from-dark-light via-black/20 to-black/60"></div>
            
            <!-- Date Badge -->
            <div class="absolute top-4 left-6 bg-white dark:bg-slate-800 rounded-2xl px-4 py-2 text-center shadow-lg border border-white/10 z-10">
              <p class="font-heading text-xl font-bold text-primary dark:text-secondary leading-none">{{ event.day }}</p>
              <p class="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">{{ event.month }}</p>
            </div>

            <button 
              @click="$emit('close')"
              class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors z-20"
              aria-label="Tutup"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <div class="flex-1 overflow-y-auto pt-6 pb-8 px-6 sm:px-8">
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-heading text-2xl sm:text-3xl font-bold text-dark dark:text-white leading-tight">
                {{ event.title }}
              </h3>
              <!-- Badge -->
              <span v-if="event.badge" class="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-secondary text-dark shrink-0">
                {{ event.badge }}
              </span>
            </div>
            
            <p class="text-dark/70 dark:text-white/70 leading-relaxed mb-6">
              {{ event.description }}
            </p>

            <!-- Info Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <!-- Schedule -->
              <div class="p-4 rounded-xl bg-dark/5 dark:bg-white/5 border border-dark/10 dark:border-white/10 animate-slide-up" style="animation-delay: 0.1s; animation-fill-mode: both;">
                <div class="flex items-center gap-2 text-primary mb-2">
                  <Clock class="w-4 h-4" />
                  <span class="font-bold text-sm uppercase tracking-wider">Waktu</span>
                </div>
                <p class="text-dark dark:text-white font-medium text-sm">{{ event.time }}</p>
              </div>

              <!-- Location -->
              <div class="p-4 rounded-xl bg-dark/5 dark:bg-white/5 border border-dark/10 dark:border-white/10 animate-slide-up" style="animation-delay: 0.2s; animation-fill-mode: both;">
                <div class="flex items-center gap-2 text-primary mb-2">
                  <MapPin class="w-4 h-4" />
                  <span class="font-bold text-sm uppercase tracking-wider">Lokasi</span>
                </div>
                <p class="text-dark dark:text-white font-medium text-sm">{{ event.location }}</p>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="pt-4 border-t border-dark/10 dark:border-white/10 animate-slide-up" style="animation-delay: 0.4s; animation-fill-mode: both;">
              <button 
                @click="$emit('close')"
                class="w-full px-6 py-3 bg-dark/5 dark:bg-white/5 hover:bg-dark/10 dark:hover:bg-white/10 text-dark dark:text-white rounded-xl font-bold transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { X, Clock, MapPin, MessageCircle } from 'lucide-vue-next'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  event: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close'])

// Prevent background scrolling when modal is open
watch(() => props.isOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// Handle escape key
const handleEscape = (e) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Backdrop transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Modal container bouncy pop */
.modal-enter-active .modal-content {
  animation: modalBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.modal-leave-active .modal-content {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

@keyframes modalBounce {
  0% { 
    opacity: 0; 
    transform: scale(0.8) translateY(40px); 
  }
  100% { 
    opacity: 1; 
    transform: scale(1) translateY(0); 
  }
}

/* Staggered inner elements fade up */
@keyframes slideUpFade {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.animate-slide-up {
  animation: slideUpFade 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
</style>
