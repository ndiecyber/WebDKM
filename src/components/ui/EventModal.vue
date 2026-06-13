<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      >
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-dark/85 backdrop-blur-md"
          @click="$emit('close')"
        ></div>

        <!-- Modal Content -->
        <div 
          class="modal-content relative w-full max-w-3xl bg-white dark:bg-[#152020] rounded-3xl shadow-2xl flex flex-col h-[calc(100vh-3rem)] sm:h-auto sm:max-h-[90vh] border border-gray-200 dark:border-white/10 overflow-hidden text-left"
          role="dialog"
          aria-modal="true"
        >
          <!-- Header (Title & Metadata) with Islamic Pattern & Dark Emerald/Gold Theme -->
          <div class="relative shrink-0 bg-[#072F2F] dark:bg-[#091717] p-6 sm:p-8 pt-10 text-left border-b border-primary/20 dark:border-white/10">
            <!-- Background pattern -->
            <div class="absolute inset-0 z-0 opacity-10 mix-blend-overlay">
              <IslamicPattern pattern-color="#C5A55A" :show-sparkles="false" class="scale-125 pointer-events-none" />
            </div>
            
            <!-- Close Button -->
            <button 
              @click="$emit('close')"
              class="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors z-20"
              aria-label="Tutup"
            >
              <X class="w-4 h-4" />
            </button>

            <!-- Category Tag & Status Badge -->
            <div class="relative z-10 flex items-center gap-2 mb-3">
              <div class="inline-block px-2.5 py-1 bg-[#C5A55A] text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
                {{ event.category }}
              </div>
              <span v-if="event.badge" class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[#5c2323] text-white border border-[#8b3131]">
                {{ event.badge }}
              </span>
            </div>

            <!-- Title -->
            <h3 class="relative z-10 font-heading text-lg sm:text-2xl font-extrabold text-white leading-snug">
              {{ event.title }}
            </h3>

            <!-- Metadata Row (Matches UIN KHAS Jember reference style) -->
            <div class="relative z-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/70 mt-4 font-medium">
              <div class="flex items-center gap-1.5">
                <Calendar class="w-3.5 h-3.5 text-[#C5A55A]" />
                <span>{{ event.day }} {{ event.month }} 2026</span>
              </div>
              <span class="text-white/30 hidden sm:inline">|</span>
              <div class="flex items-center gap-1.5">
                <User class="w-3.5 h-3.5 text-[#C5A55A]" />
                <span>{{ event.author || 'DKM Jami Kassiti' }}</span>
              </div>
              <span class="text-white/30 hidden sm:inline">|</span>
              <div class="flex items-center gap-1.5">
                <Eye class="w-3.5 h-3.5 text-[#C5A55A]" />
                <span>{{ event.hits || 88 }} dibaca</span>
              </div>
              <span class="text-white/30 hidden sm:inline">|</span>
              <div class="flex items-center gap-1.5">
                <Folder class="w-3.5 h-3.5 text-[#C5A55A]" />
                <span>{{ event.category }}</span>
              </div>
            </div>
          </div>

          <!-- Body Scrollable Content -->
          <div class="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar bg-white dark:bg-[#152020]">
            <!-- Center Article Image (Inside scrollable content like UIN Khas) -->
            <div class="relative w-full rounded-2xl overflow-hidden shadow-md mb-6 border border-gray-150 dark:border-white/5 bg-gray-100 dark:bg-dark-light">
              <img 
                v-if="event.image"
                :src="event.image" 
                :alt="event.title" 
                class="w-full h-auto max-h-[360px] object-cover"
              />
            </div>

            <!-- Info Grid (Waktu & Lokasi) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <!-- Schedule -->
              <div class="p-4 rounded-xl bg-[#072F2F]/5 dark:bg-[#C5A55A]/5 border border-[#072F2F]/10 dark:border-[#C5A55A]/10">
                <div class="flex items-center gap-2 text-[#072F2F] dark:text-[#C5A55A] mb-2">
                  <Clock class="w-4 h-4" />
                  <span class="font-bold text-xs uppercase tracking-wider">Waktu</span>
                </div>
                <p class="text-dark dark:text-white font-semibold text-sm">{{ event.time }}</p>
              </div>

              <!-- Location -->
              <div class="p-4 rounded-xl bg-[#072F2F]/5 dark:bg-[#C5A55A]/5 border border-[#072F2F]/10 dark:border-[#C5A55A]/10">
                <div class="flex items-center gap-2 text-[#072F2F] dark:text-[#C5A55A] mb-2">
                  <MapPin class="w-4 h-4" />
                  <span class="font-bold text-xs uppercase tracking-wider">Lokasi</span>
                </div>
                <p class="text-dark dark:text-white font-semibold text-sm">{{ event.location }}</p>
              </div>
            </div>

            <!-- Body Description Content -->
            <div 
              class="article-content text-dark/80 dark:text-white/80 leading-relaxed text-sm sm:text-base space-y-4"
              v-html="event.description"
            ></div>

            <!-- Share / Footer Details inside Modal -->
            <div class="mt-8 pt-6 border-t border-gray-150 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div class="text-xs text-gray-400 dark:text-gray-500">
                Kategori: <span class="font-semibold text-[#072F2F] dark:text-[#C5A55A]">{{ event.category }}</span>
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
import { onMounted, onUnmounted, watch } from 'vue'
import { X, Calendar, User, Eye, Folder, Clock, MapPin } from 'lucide-vue-next'
import IslamicPattern from '@/components/ui/IslamicPattern.vue'

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
