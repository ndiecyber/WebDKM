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
          class="modal-content relative w-full max-w-3xl bg-white dark:bg-[#152020] rounded-3xl shadow-2xl flex flex-col h-[calc(100vh-3rem)] sm:h-auto sm:max-h-[90vh] border border-gray-200 dark:border-white/10 overflow-hidden text-left"
          role="dialog"
          aria-modal="true"
        >
          <!-- Header (Title & Metadata) -->
          <div class="relative shrink-0 overflow-hidden rounded-t-3xl p-6 sm:p-8 pt-10 text-left border-b border-gray-200 dark:border-white/10">
            <!-- Rich Gradient Background -->
            <div class="absolute inset-0 bg-linear-to-r from-emerald-950 via-emerald-850 to-emerald-900"></div>
            
            <!-- Calligraphy / Mosaic Background Image (Clear and Elegant) -->
            <div class="absolute inset-0 opacity-15 dark:opacity-20 mix-blend-overlay">
              <img :src="kaligrafiImg" class="w-full h-full object-cover scale-105 pointer-events-none select-none" alt="" />
            </div>
            
            <!-- Subtle Islamic Pattern Overlay -->
            <IslamicPattern pattern-color="#C5A55A" :show-sparkles="true" class="opacity-25 mix-blend-overlay scale-110 transform-gpu animate-[pulse_5s_ease-in-out_infinite]" />
            
            <!-- Dark gradient overlay to ensure text readability -->
            <div class="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent"></div>
            
            <!-- Close Button -->
            <button 
              @click="$emit('close')"
              class="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/10 backdrop-blur-md transition-colors z-20"
              aria-label="Tutup"
            >
              <X class="w-4 h-4" />
            </button>

            <!-- Category Tag -->
            <div class="relative z-10 inline-block px-2.5 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold uppercase tracking-wider rounded-md mb-3">
              {{ item.category }}
            </div>

            <!-- Title -->
            <h3 class="relative z-10 font-heading text-lg sm:text-2xl font-extrabold text-white leading-snug drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.5)]">
              {{ item.title }}
            </h3>

            <!-- Metadata Row -->
            <div class="relative z-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-emerald-100/90 mt-4 font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              <div class="flex items-center gap-1.5">
                <Calendar class="w-3.5 h-3.5 text-amber-400" />
                <span>{{ item.date }}</span>
              </div>
              <span class="text-emerald-700/50 hidden sm:inline">|</span>
              <div class="flex items-center gap-1.5">
                <User class="w-3.5 h-3.5 text-amber-400" />
                <span>{{ item.author }}</span>
              </div>
              <span class="text-emerald-700/50 hidden sm:inline">|</span>
              <div class="flex items-center gap-1.5">
                <Eye class="w-3.5 h-3.5 text-amber-400" />
                <span>{{ item.hits || 88 }} dibaca</span>
              </div>
              <span class="text-emerald-700/50 hidden sm:inline">|</span>
              <div class="flex items-center gap-1.5">
                <Folder class="w-3.5 h-3.5 text-amber-400" />
                <span>{{ item.category }}</span>
              </div>
            </div>
          </div>

          <!-- Body Scrollable Content -->
          <div class="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar bg-white dark:bg-[#152020]">


            <!-- Rich Body Content -->
            <div 
              class="article-content flow-root text-dark/80 dark:text-white/80 leading-relaxed text-sm sm:text-base space-y-4"
              v-html="item.content || item.excerpt"
            ></div>

            <!-- Share / Footer Details inside Modal -->
            <div class="mt-8 pt-6 border-t border-gray-150 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div class="text-xs text-gray-400 dark:text-gray-500">
                Kategori: <span class="font-semibold text-[#072F2F] dark:text-[#C5A55A]">{{ item.category }}</span>
              </div>
              <button 
                @click="$emit('close')"
                class="px-6 py-2.5 bg-[#072F2F] dark:bg-[#C5A55A] hover:bg-emerald-900 dark:hover:bg-[#b0934d] text-white dark:text-[#072F2F] rounded-xl font-bold text-sm transition-colors shadow-md"
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
import { X, Calendar, User, Eye, Folder } from 'lucide-vue-next'
import IslamicPattern from '@/components/ui/IslamicPattern.vue'
import kaligrafiImage from '@/assets/images/kaligrafi_masjid.webp'

const kaligrafiImg = kaligrafiImage

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
