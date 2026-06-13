<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
      >
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-dark/80 backdrop-blur-md"
          @click="$emit('close')"
        ></div>

        <!-- Modal Content -->
        <div 
          class="modal-content relative w-full max-w-3xl bg-white dark:bg-[#152020] rounded-3xl shadow-2xl flex flex-col h-[calc(100vh-3rem)] sm:h-auto sm:max-h-[90vh] border border-gray-200 dark:border-white/10 overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          <!-- Header Banner (Dynamic Image) -->
          <div class="relative shrink-0 h-48 sm:h-64 bg-dark">
            <img 
              v-if="item.image"
              :src="item.image" 
              :alt="item.title" 
              class="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div class="absolute inset-0 bg-linear-to-t from-white dark:from-[#152020] via-black/40 to-black/60"></div>
            
            <IslamicPattern pattern-color="#C5A55A" :show-sparkles="false" class="opacity-10 mix-blend-overlay" />
            
            <!-- Close Button -->
            <button 
              @click="$emit('close')"
              class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors z-10"
              aria-label="Tutup"
            >
              <X class="w-5 h-5" />
            </button>

            <!-- Category Tag on Image -->
            <div class="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-md">
              {{ item.category }}
            </div>
            
            <!-- Title Inside Banner Overlay -->
            <div class="absolute bottom-4 left-6 right-6 sm:left-8 sm:right-8 text-left z-10">
              <h3 class="font-heading text-xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow-md">
                {{ item.title }}
              </h3>
            </div>
          </div>

          <!-- Metadata & Body Content -->
          <div class="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
            <!-- Metadata Row -->
            <div class="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-6 border-b border-gray-150 dark:border-white/10 pb-4">
              <div class="flex items-center gap-1.5 font-medium">
                <Calendar class="w-4 h-4 text-primary dark:text-secondary" />
                <span>{{ item.date }}</span>
              </div>
              <span class="text-gray-300 dark:text-white/10 hidden sm:inline">•</span>
              <div class="flex items-center gap-1.5 font-medium">
                <User class="w-4 h-4 text-primary dark:text-secondary" />
                <span>Ditulis oleh: <strong class="text-dark dark:text-white">{{ item.author }}</strong></span>
              </div>
              <span class="text-gray-300 dark:text-white/10 hidden sm:inline">•</span>
              <div class="flex items-center gap-1.5 font-medium">
                <Clock class="w-4 h-4 text-primary dark:text-secondary" />
                <span>3 Menit Baca</span>
              </div>
            </div>

            <!-- Rich Body Content -->
            <div 
              class="article-content text-dark/80 dark:text-white/80 leading-relaxed text-sm sm:text-base space-y-4"
              v-html="item.content || item.excerpt"
            ></div>

            <!-- Share / Footer Details inside Modal -->
            <div class="mt-8 pt-6 border-t border-gray-150 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div class="text-xs text-gray-400 dark:text-gray-500">
                Kategori: <span class="font-semibold text-primary dark:text-secondary">{{ item.category }}</span>
              </div>
              <button 
                @click="$emit('close')"
                class="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-sm transition-colors shadow-md shadow-primary/10"
              >
                Tutup Artikel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch, onMounted, onUnmounted } from 'vue'
import { X, Calendar, User, Clock } from 'lucide-vue-next'
import IslamicPattern from '@/components/ui/IslamicPattern.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  item: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close'])

watch(() => props.isOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

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
/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content {
  animation: modalBounce 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.modal-leave-active .modal-content {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  transform: scale(0.95) translateY(15px);
  opacity: 0;
}

@keyframes modalBounce {
  0% { 
    opacity: 0; 
    transform: scale(0.92) translateY(30px); 
  }
  100% { 
    opacity: 1; 
    transform: scale(1) translateY(0); 
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  border-radius: 20px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Styled HTML content classes */
:deep(.article-content p) {
  margin-bottom: 1.25rem;
  text-align: justify;
}
:deep(.article-content ol), :deep(.article-content ul) {
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
}
:deep(.article-content ul) {
  list-style-type: disc;
}
:deep(.article-content ol) {
  list-style-type: decimal;
}
:deep(.article-content li) {
  margin-bottom: 0.5rem;
}
:deep(.article-content blockquote) {
  border-left: 4px solid var(--color-primary, #0D4F4F);
  padding-left: 1rem;
  font-style: italic;
  color: rgba(156, 163, 175, 0.9);
  margin: 1.5rem 0;
}
.dark :deep(.article-content blockquote) {
  border-left-color: var(--color-secondary, #C5A55A);
}
</style>
