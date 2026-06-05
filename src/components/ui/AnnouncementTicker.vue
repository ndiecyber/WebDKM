<template>
  <div class="relative bg-primary overflow-hidden py-3">
    <div class="ticker-container flex">
      <div class="ticker-content flex items-center gap-8 whitespace-nowrap">
        <template v-for="n in 2" :key="n">
          <div
            v-for="(item, index) in announcements"
            :key="`${n}-${index}`"
            class="flex items-center gap-3 px-4"
          >
            <span class="w-2 h-2 rounded-full shrink-0" :class="item.urgent ? 'bg-red-400 animate-pulse' : 'bg-secondary'"></span>
            <span class="text-white/80 text-sm font-medium">{{ item.text }}</span>
            <span class="text-white/30 text-xs">•</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
const announcements = [
  { text: '🕌 Kajian Akbar Bulanan — 15 Juni 2026, Aula Utama', urgent: true },
  { text: '📖 Pendaftaran TPA/TPQ Semester Baru Telah Dibuka', urgent: false },
  { text: '💛 Program Donasi Renovasi Aula — Target 75% Tercapai!', urgent: false },
  { text: '🌙 Jadwal Sholat Otomatis Berdasarkan Lokasi Anda', urgent: false },
  { text: '📢 Wisuda Santri TPA/TPQ — 22 Juni 2026', urgent: false },
]
</script>

<style scoped>
.ticker-container {
  display: flex;
  width: max-content;
}

.ticker-content {
  animation: ticker-scroll 40s linear infinite;
}

@keyframes ticker-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.ticker-container:hover .ticker-content {
  animation-play-state: paused;
}
</style>
