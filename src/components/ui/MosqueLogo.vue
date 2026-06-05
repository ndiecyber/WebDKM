<template>
  <!-- Full horizontal logo with text -->
  <div v-if="variant === 'full'" class="flex items-center gap-4">
    <div class="shrink-0">
      <svg :width="iconSize" :height="iconSize * 1.15" viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Mosque Arch Body -->
        <path d="M50 2 C50 2 8 30 8 65 L8 105 C8 107 9 108 11 108 L28 108 C30 108 31 107 31 105 L31 82 C31 72 38 65 50 65 C62 65 69 72 69 82 L69 105 C69 107 70 108 72 108 L89 108 C91 108 92 107 92 105 L92 65 C92 30 50 2 50 2Z" :fill="maroon"/>
        <!-- Inner Arch Cutout -->
        <path d="M50 18 C50 18 22 40 22 65 L22 95 L38 95 L38 82 C38 68 42 58 50 58 C58 58 62 68 62 82 L62 95 L78 95 L78 65 C78 40 50 18 50 18Z" fill="white" :fill-opacity="darkMode ? 0.1 : 1"/>
        <!-- Crescent Moon -->
        <path d="M42 38 C42 30 48 24 56 24 C50 24 44 28 44 36 C44 44 50 48 56 48 C48 48 42 44 42 38Z" :fill="gold" transform="rotate(-15 48 36)"/>
        <!-- Star -->
        <polygon points="62,28 63.5,33 68,33 64.5,36 65.5,41 62,38 58.5,41 59.5,36 56,33 60.5,33" :fill="gold"/>
        <!-- Arabic Calligraphy (Kufi style bars) -->
        <rect x="20" y="96" width="4" height="10" rx="1" :fill="maroon"/>
        <rect x="26" y="93" width="3" height="13" rx="1" :fill="maroon"/>
        <rect x="31" y="96" width="6" height="10" rx="1" :fill="maroon"/>
        <rect x="39" y="90" width="3" height="16" rx="1" :fill="maroon"/>
        <rect x="44" y="96" width="4" height="10" rx="1" :fill="maroon"/>
        <rect x="50" y="93" width="5" height="13" rx="1" :fill="maroon"/>
        <rect x="57" y="96" width="3" height="10" rx="1" :fill="maroon"/>
        <rect x="62" y="90" width="4" height="16" rx="1" :fill="maroon"/>
        <rect x="68" y="96" width="3" height="10" rx="1" :fill="maroon"/>
        <rect x="73" y="93" width="5" height="13" rx="1" :fill="maroon"/>
        <!-- Dots on bars -->
        <circle cx="33" cy="94" r="1.5" :fill="maroon"/>
        <circle cx="46" cy="94" r="1.5" :fill="maroon"/>
        <circle cx="64" cy="94" r="1.5" :fill="maroon"/>
      </svg>
    </div>
    <!-- Separator Line -->
    <div class="w-px self-stretch" :class="darkMode ? 'bg-white/20' : 'bg-[#5D2E2E]/20'"></div>
    <!-- Text -->
    <div>
      <p class="font-heading text-sm sm:text-base font-bold tracking-wide leading-tight" :class="darkMode ? 'text-white' : 'text-[#5D2E2E]'">MASJID JAMI</p>
      <p class="font-heading text-xl sm:text-2xl font-black tracking-wider leading-tight text-secondary">KASSITI</p>
      <p class="text-[9px] sm:text-[10px] tracking-[0.15em] uppercase mt-0.5 font-medium" :class="darkMode ? 'text-white/40' : 'text-[#5D2E2E]/50'">Perumahan Arjamukti Desa Arjasari</p>
    </div>
  </div>

  <!-- Icon only (for small spaces) -->
  <div v-else-if="variant === 'icon'">
    <svg :width="iconSize" :height="iconSize * 1.15" viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 2 C50 2 8 30 8 65 L8 105 C8 107 9 108 11 108 L28 108 C30 108 31 107 31 105 L31 82 C31 72 38 65 50 65 C62 65 69 72 69 82 L69 105 C69 107 70 108 72 108 L89 108 C91 108 92 107 92 105 L92 65 C92 30 50 2 50 2Z" :fill="maroon"/>
      <path d="M50 18 C50 18 22 40 22 65 L22 95 L38 95 L38 82 C38 68 42 58 50 58 C58 58 62 68 62 82 L62 95 L78 95 L78 65 C78 40 50 18 50 18Z" fill="white" :fill-opacity="darkMode ? 0.1 : 1"/>
      <path d="M42 38 C42 30 48 24 56 24 C50 24 44 28 44 36 C44 44 50 48 56 48 C48 48 42 44 42 38Z" :fill="gold" transform="rotate(-15 48 36)"/>
      <polygon points="62,28 63.5,33 68,33 64.5,36 65.5,41 62,38 58.5,41 59.5,36 56,33 60.5,33" :fill="gold"/>
      <rect x="20" y="96" width="4" height="10" rx="1" :fill="maroon"/>
      <rect x="26" y="93" width="3" height="13" rx="1" :fill="maroon"/>
      <rect x="31" y="96" width="6" height="10" rx="1" :fill="maroon"/>
      <rect x="39" y="90" width="3" height="16" rx="1" :fill="maroon"/>
      <rect x="44" y="96" width="4" height="10" rx="1" :fill="maroon"/>
      <rect x="50" y="93" width="5" height="13" rx="1" :fill="maroon"/>
      <rect x="57" y="96" width="3" height="10" rx="1" :fill="maroon"/>
      <rect x="62" y="90" width="4" height="16" rx="1" :fill="maroon"/>
      <rect x="68" y="96" width="3" height="10" rx="1" :fill="maroon"/>
      <rect x="73" y="93" width="5" height="13" rx="1" :fill="maroon"/>
      <circle cx="33" cy="94" r="1.5" :fill="maroon"/>
      <circle cx="46" cy="94" r="1.5" :fill="maroon"/>
      <circle cx="64" cy="94" r="1.5" :fill="maroon"/>
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({
  variant: { type: String, default: 'full' }, // 'full' | 'icon'
  iconSize: { type: Number, default: 48 },
  darkMode: { type: Boolean, default: false },
})

const maroon = '#5D2E2E'
const gold = '#C5A55A'
</script>
