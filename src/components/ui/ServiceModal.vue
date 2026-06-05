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
          class="modal-content relative w-full max-w-2xl bg-white dark:bg-dark-light rounded-3xl shadow-2xl flex flex-col max-h-[90vh] border border-white/20 dark:border-white/10"
          role="dialog"
          aria-modal="true"
        >
          <!-- Header Pattern & Close Button -->
          <div class="relative shrink-0 h-32 sm:h-40 bg-dark rounded-t-3xl">
            <!-- Dynamic Background Image -->
            <img 
              v-if="service.bgImage"
              :src="service.bgImage" 
              alt="" 
              class="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-screen"
            />
            
            <IslamicPattern pattern-color="#C5A55A" :show-sparkles="false" class="opacity-20 mix-blend-overlay" />
            <div class="absolute inset-0 bg-gradient-to-t from-white dark:from-dark-light via-transparent to-black/40"></div>
            
            <button 
              @click="$emit('close')"
              class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors z-10"
              aria-label="Tutup"
            >
              <X class="w-5 h-5" />
            </button>
            
            <!-- Icon floating -->
            <div class="absolute -bottom-8 left-6 sm:left-8 w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-xl border-4 border-white dark:border-dark-light z-10">
              <component :is="service.icon" class="w-10 h-10 text-dark" />
            </div>
          </div>

          <div class="flex-1 overflow-y-auto pt-12 pb-8 px-6 sm:px-8">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-heading text-2xl sm:text-3xl font-bold text-dark dark:text-white">
                {{ service.title }}
              </h3>
              <!-- Badge -->
              <span v-if="service.badge" :class="`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${service.badgeColor}`">
                {{ service.badge }}
              </span>
            </div>
            
            <p class="text-dark/70 dark:text-white/70 leading-relaxed mb-8">
              {{ service.details?.fullDescription || service.description }}
            </p>

            <!-- Info Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <!-- Schedule -->
              <div v-if="service.details?.schedule" class="p-4 rounded-xl bg-dark/5 dark:bg-white/5 border border-dark/10 dark:border-white/10 animate-slide-up" style="animation-delay: 0.1s; animation-fill-mode: both;">
                <div class="flex items-center gap-2 text-primary mb-2">
                  <Calendar class="w-4 h-4" />
                  <span class="font-bold text-sm uppercase tracking-wider">Jadwal</span>
                </div>
                <p class="text-dark dark:text-white font-medium text-sm">{{ service.details.schedule }}</p>
              </div>

              <!-- Location -->
              <div v-if="service.details?.location" class="p-4 rounded-xl bg-dark/5 dark:bg-white/5 border border-dark/10 dark:border-white/10 animate-slide-up" style="animation-delay: 0.2s; animation-fill-mode: both;">
                <div class="flex items-center gap-2 text-primary mb-2">
                  <MapPin class="w-4 h-4" />
                  <span class="font-bold text-sm uppercase tracking-wider">Lokasi</span>
                </div>
                <p class="text-dark dark:text-white font-medium text-sm">{{ service.details.location }}</p>
              </div>

              <!-- Contact / Supervisor -->
              <div v-if="service.details?.contact" class="p-4 rounded-xl bg-dark/5 dark:bg-white/5 border border-dark/10 dark:border-white/10 animate-slide-up" style="animation-delay: 0.3s; animation-fill-mode: both;">
                <div class="flex items-center gap-2 text-primary mb-2">
                  <User class="w-4 h-4" />
                  <span class="font-bold text-sm uppercase tracking-wider">Penanggung Jawab</span>
                </div>
                <p class="text-dark dark:text-white font-medium text-sm">{{ service.details.contact }}</p>
              </div>

              <!-- Requirements -->
              <div v-if="service.details?.requirements" class="p-4 rounded-xl bg-dark/5 dark:bg-white/5 border border-dark/10 dark:border-white/10 animate-slide-up" style="animation-delay: 0.4s; animation-fill-mode: both;">
                <div class="flex items-center gap-2 text-primary mb-2">
                  <FileText class="w-4 h-4" />
                  <span class="font-bold text-sm uppercase tracking-wider">Persyaratan</span>
                </div>
                <ul class="text-dark dark:text-white font-medium text-sm list-disc pl-4 space-y-1">
                  <li v-for="(req, i) in service.details.requirements" :key="i">{{ req }}</li>
                </ul>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-dark/10 dark:border-white/10 animate-slide-up" style="animation-delay: 0.5s; animation-fill-mode: both;">
              <a 
                href="https://wa.me/6281234567890?text=Assalamu%27alaikum%20Admin%20Masjid%20Jami%20Kassiti%2C%20saya%20ingin%20bertanya%20mengenai%20layanan..." 
                target="_blank"
                class="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-colors"
              >
                <MessageCircle class="w-5 h-5" />
                Hubungi Pengurus (WA)
              </a>
              <button 
                @click="$emit('close')"
                class="w-full sm:w-auto px-6 py-3 bg-dark/5 dark:bg-white/5 hover:bg-dark/10 dark:hover:bg-white/10 text-dark dark:text-white rounded-xl font-bold transition-colors"
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
import { X, Calendar, MapPin, User, FileText, MessageCircle } from 'lucide-vue-next'
import IslamicPattern from '@/components/ui/IslamicPattern.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  service: {
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
