<template>
  <div class="fixed bottom-6 left-6 z-[90] flex items-center gap-3">
    <!-- Visualizer / Label -->
    <div 
      class="bg-dark/80 backdrop-blur-xl border border-white/10 px-4 py-2.5 rounded-full flex items-center gap-3 shadow-2xl transition-all duration-500 origin-left"
      :class="isPlaying ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'"
    >
      <div class="flex items-end gap-1 h-4">
        <span class="w-1 bg-secondary rounded-full animate-audio-bar" style="animation-delay: 0.0s"></span>
        <span class="w-1 bg-secondary rounded-full animate-audio-bar" style="animation-delay: 0.2s"></span>
        <span class="w-1 bg-secondary rounded-full animate-audio-bar" style="animation-delay: 0.4s"></span>
        <span class="w-1 bg-secondary rounded-full animate-audio-bar" style="animation-delay: 0.1s"></span>
        <span class="w-1 bg-secondary rounded-full animate-audio-bar" style="animation-delay: 0.3s"></span>
      </div>
      <div class="flex flex-col">
        <span class="text-white text-xs font-bold tracking-wide leading-tight">Surah An-Nas</span>
        <span class="text-white/50 text-[10px] leading-tight">Misyari Rasyid Al-Afasi</span>
      </div>
    </div>

    <!-- Play/Pause Button -->
    <button 
      @click="togglePlay"
      class="relative w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-secondary-light flex items-center justify-center text-dark shadow-[0_0_30px_rgba(197,165,90,0.3)] hover:shadow-[0_0_40px_rgba(197,165,90,0.5)] transition-all duration-300 active:scale-90 z-10"
      aria-label="Putar Murottal"
    >
      <!-- Pulse rings when playing -->
      <div v-if="isPlaying" class="absolute inset-0 rounded-full border border-secondary/50 animate-ping" style="animation-duration: 2s;"></div>
      
      <Play v-if="!isPlaying" class="w-6 h-6 ml-1" />
      <Pause v-else class="w-6 h-6" />
    </button>
    
    <audio ref="audioRef" src="https://server8.mp3quran.net/afs/114.mp3" loop></audio>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Play, Pause } from 'lucide-vue-next'

const isPlaying = ref(false)
const audioRef = ref(null)

const togglePlay = () => {
  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play()
  }
  isPlaying.value = !isPlaying.value
}
</script>

<style scoped>
.animate-audio-bar {
  animation: audio-bar 1s ease-in-out infinite alternate;
  height: 4px;
}
@keyframes audio-bar {
  0% { height: 4px; }
  100% { height: 16px; }
}
</style>
