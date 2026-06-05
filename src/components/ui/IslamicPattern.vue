<template>
  <div class="absolute inset-0 overflow-hidden pointer-events-none" :class="containerClass">
    <!-- Premium Modern Islamic Geometric Mesh -->
    <div class="absolute inset-y-0 flex opacity-20 animate-pan-smooth w-[200%]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="islamic-mosaic-modern" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
            <g fill="none" :stroke="patternColor">
              <!-- Elegant Sweeping Curved Lattice -->
              <path d="M 80 0 Q 120 40 160 80 Q 120 120 80 160 Q 40 120 0 80 Q 40 40 80 0 Z" stroke-width="1.5" />
              
              <!-- Large Central Khatam (8-Pointed Star) -->
              <rect x="44" y="44" width="72" height="72" stroke-width="1" />
              <rect x="44" y="44" width="72" height="72" stroke-width="1" transform="rotate(45 80 80)" />
              
              <!-- Refined Inner Concentric Details -->
              <circle cx="80" cy="80" r="32" stroke-width="1.5" />
              <circle cx="80" cy="80" r="22" stroke-width="0.5" stroke-dasharray="3 4" />
              <circle cx="80" cy="80" r="8" stroke-width="2" />
              
              <!-- Structural Geometric Connectors -->
              <path d="M0 40 L40 40 L40 0 M160 40 L120 40 L120 0 M0 120 L40 120 L40 160 M160 120 L120 120 L120 160" stroke-width="1" />
              <path d="M44 44 L116 116 M116 44 L44 116" stroke-width="0.5" />
              
              <!-- Seamless Tiling Corner Stars (Smaller Rub el Hizb) -->
              <g stroke-width="1.5">
                <!-- Top Left -->
                <rect x="-12" y="-12" width="24" height="24" />
                <rect x="-12" y="-12" width="24" height="24" transform="rotate(45 0 0)" />
                <circle cx="0" cy="0" r="4" stroke-width="1"/>
                
                <!-- Top Right -->
                <rect x="148" y="-12" width="24" height="24" />
                <rect x="148" y="-12" width="24" height="24" transform="rotate(45 160 0)" />
                <circle cx="160" cy="0" r="4" stroke-width="1"/>
                
                <!-- Bottom Left -->
                <rect x="-12" y="148" width="24" height="24" />
                <rect x="-12" y="148" width="24" height="24" transform="rotate(45 0 160)" />
                <circle cx="0" cy="160" r="4" stroke-width="1"/>
                
                <!-- Bottom Right -->
                <rect x="148" y="148" width="24" height="24" />
                <rect x="148" y="148" width="24" height="24" transform="rotate(45 160 160)" />
                <circle cx="160" cy="160" r="4" stroke-width="1"/>
              </g>
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-mosaic-modern)"/>
      </svg>
    </div>

    <!-- Gold accent sparkles -->
    <div v-if="showSparkles" class="absolute inset-0">
      <div
        v-for="i in 15"
        :key="i"
        class="absolute w-1.5 h-1.5 rounded-full bg-secondary/50 islamic-sparkle"
        :style="{
          left: `${8 + ((i * 7 + 13) % 84)}%`,
          top: `${5 + ((i * 11 + 7) % 90)}%`,
          animationDelay: `${i * 0.8}s`,
          animationDuration: `${4 + (i % 3) * 2}s`,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  patternColor: { type: String, default: '#0D4F4F' },
  containerClass: { type: String, default: '' },
  showSparkles: { type: Boolean, default: true },
})
</script>

<style scoped>
.animate-pan-smooth {
  animation: pan-smooth 50s linear infinite;
}

@keyframes pan-smooth {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes sparkle-float {
  0% { opacity: 0; transform: translateY(0) scale(0); }
  20% { opacity: 1; transform: translateY(-10px) scale(1.2); }
  80% { opacity: 1; transform: translateY(-30px) scale(1.2); }
  100% { opacity: 0; transform: translateY(-50px) scale(0); }
}

.islamic-sparkle {
  animation: sparkle-float 6s ease-in-out infinite;
}
</style>
