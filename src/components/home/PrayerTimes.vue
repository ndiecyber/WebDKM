<template>
  <section id="jadwal" :class="['relative pt-32 pb-28 lg:pt-32 lg:pb-24 transition-all duration-1000 overflow-hidden', skyThemeClass]" @mousemove="handleSectionMouseMove">
    <!-- Layer 0: Sky Gradient & Base Pattern -->
    <div class="absolute inset-0 z-0">
      <IslamicPattern pattern-color="#C5A55A" :show-sparkles="true" class="opacity-30 dark:opacity-50" />
      <div class="absolute inset-0 bg-linear-to-b from-transparent to-black/20 dark:to-black/50 pointer-events-none"></div>
    </div>
    
    <!-- Layer 1: Deep Stars -->
    <div ref="layerStars" class="absolute inset-0 z-0 transition-opacity duration-1000 pointer-events-none" :class="showStars ? 'opacity-100' : 'opacity-0'">
      <div v-for="(star, i) in stars" :key="'star'+i" 
        class="absolute bg-white rounded-full animate-pulse shadow-[0_0_8px_2px_rgba(255,255,255,0.4)]"
        :style="{ left: star.left, top: star.top, width: star.size, height: star.size, animationDelay: star.delay, animationDuration: star.duration }"
      ></div>
    </div>

    <!-- Layer 1.2: Shooting Stars -->
    <div v-if="showStars" class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div v-for="star in shootingStars" :key="star.id" class="absolute h-0.5 bg-white shooting-star origin-right"
        :style="{ top: star.top, left: star.left }">
      </div>
    </div>

    <!-- Layer 1.5: Birds (Only visible during daytime) -->
    <div ref="layerBirds" class="absolute inset-0 z-0 transition-opacity duration-1000 pointer-events-none" :class="showBirds ? 'opacity-100' : 'opacity-0'">
      <div v-for="(bird, i) in birds" :key="'bird'+i" class="absolute text-slate-900"
        :style="{ top: bird.top, left: '-10%', transform: `scale(${bird.scale})`, animation: `bird-fly ${bird.duration} linear infinite ${bird.delay}` }">
        <svg viewBox="0 0 24 24" class="w-8 h-8 sm:w-12 sm:h-12 drop-shadow-[0_1px_2px_rgba(255,255,255,0.1)]" fill="currentColor">
          <path d="M11.97 10.45l-3.32 4.45c-1.32 1.77-3.8 2.37-5.75 1.4-1.28-.64-1.92-2.12-1.32-3.41L5.5 4.31c.4-1.2 1.94-1.63 2.9-.81l3.57 3.06z"/>
          <path d="M12.03 10.45l3.32 4.45c1.32 1.77 3.8 2.37 5.75 1.4 1.28-.64 1.92-2.12 1.32-3.41L18.5 4.31c-.4-1.2-1.94-1.63-2.9-.81l-3.57 3.06z"/>
        </svg>
      </div>
    </div>

    <!-- Layer 2: Celestial Body (Sun / Moon) -->
    <div ref="layerCelestial" class="absolute inset-0 z-10 pointer-events-none">
      <div class="absolute transition-all duration-1000 ease-in-out"
        :style="{ left: celestialBody.x, top: celestialBody.y, transform: 'translate(-50%, -50%)' }">
        
        <!-- Detailed Sun -->
        <div v-if="celestialBody.type === 'sun'" class="relative w-20 h-20 sm:w-32 sm:h-32 flex items-center justify-center scale-90 sm:scale-100">
          <!-- Deep Glow -->
          <div class="absolute inset-0 bg-orange-500 rounded-full blur-[20px] opacity-70 animate-pulse" :style="{ boxShadow: celestialBody.glow }"></div>
          <div class="absolute inset-0 bg-yellow-400 rounded-full blur-[10px]"></div>
          


          <!-- Corona Rays (Inner) -->
          <svg class="absolute w-[180%] h-[180%] animate-spin-slow text-yellow-300 opacity-90" style="animation-direction: reverse; animation-duration: 25s;" viewBox="0 0 100 100">
            <g transform="translate(50,50)">
              <polygon v-for="i in 12" :key="'ray'+i" :transform="`rotate(${i * 30})`" points="-3,-25 3,-25 0,-45" fill="currentColor"/>
              <polygon v-for="i in 12" :key="'ray2'+i" :transform="`rotate(${i * 30 + 15})`" points="-1,-25 1,-25 0,-35" fill="currentColor" class="text-orange-300"/>
            </g>
          </svg>

          <!-- Sun Body -->
          <div class="relative w-12 h-12 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-[inset_0_0_20px_rgba(255,255,255,0.9),0_0_30px_rgba(252,211,77,0.6)] border border-yellow-200/50 bg-linear-to-br from-yellow-50 via-yellow-400 to-orange-600">
            <!-- Surface texture/spots -->
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.9)_0%,transparent_60%)]"></div>
            <div class="absolute w-[150%] h-[150%] -top-1/4 -left-1/4 bg-[radial-gradient(circle,rgba(255,255,255,0.4)_10%,transparent_10%)] bg-[length:12px_12px] opacity-20 rotate-45 mix-blend-overlay"></div>
          </div>
        </div>

        <!-- Detailed Moon -->
        <div v-else class="relative w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center scale-90 sm:scale-100">
          <!-- Moonlight Glow -->
          <div class="absolute inset-0 bg-blue-200/40 rounded-full blur-[25px] animate-pulse" :style="{ boxShadow: celestialBody.glow }"></div>
          <div class="absolute inset-0 bg-slate-100/60 rounded-full blur-[10px]"></div>

          <!-- Moon Surface -->
          <div class="relative w-full h-full rounded-full overflow-hidden bg-linear-to-br from-slate-100 via-slate-300 to-slate-600 shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.6),inset_5px_5px_15px_rgba(255,255,255,0.9),0_0_20px_rgba(226,232,240,0.4)] border border-slate-200/40">
            <!-- Craters using SVG for exact placement -->
            <svg class="absolute inset-0 w-full h-full opacity-70 mix-blend-multiply" viewBox="0 0 100 100">
              <filter id="craterBlur">
                <feGaussianBlur stdDeviation="1.5" />
              </filter>
              <!-- Large crater -->
              <circle cx="30" cy="35" r="14" fill="#64748b" filter="url(#craterBlur)"/>
              <circle cx="31" cy="36" r="11" fill="#94a3b8" />
              <!-- Medium craters -->
              <circle cx="65" cy="25" r="9" fill="#64748b" filter="url(#craterBlur)"/>
              <circle cx="66" cy="26" r="7" fill="#94a3b8" />
              
              <circle cx="70" cy="65" r="18" fill="#64748b" filter="url(#craterBlur)"/>
              <circle cx="71" cy="66" r="14" fill="#94a3b8" />
              
              <!-- Small craters -->
              <circle cx="45" cy="75" r="6" fill="#64748b" filter="url(#craterBlur)"/>
              <circle cx="46" cy="76" r="4" fill="#94a3b8" />
              
              <circle cx="20" cy="65" r="7" fill="#64748b" filter="url(#craterBlur)"/>
              <circle cx="21" cy="66" r="5" fill="#94a3b8" />
            </svg>
            
            <!-- Phase Mask Overlay (darkens part of the moon based on phase) -->
            <div v-if="celestialBody.phase !== 'full'" class="absolute inset-0 bg-[#0f172a]/95 rounded-full blur-[4px] transition-transform duration-1000"
                 :class="{
                   'translate-x-[30%] -translate-y-[15%]': celestialBody.phase === 'crescent',
                   'translate-x-[50%] -translate-y-[10%]': celestialBody.phase === 'quarter',
                   'translate-x-[75%] -translate-y-[5%]': celestialBody.phase === 'gibbous'
                 }"></div>
          </div>
        </div>
      </div>
      
      <!-- Sunrays / Ambient Light Overlay -->
      <div class="absolute pointer-events-none transition-all duration-1000"
        :style="{ left: celestialBody.x, top: celestialBody.y, width: '300vw', height: '300vw', transform: 'translate(-50%, -50%)', background: `radial-gradient(circle, ${celestialBody.rayColor} 0%, transparent 40%)`, opacity: celestialBody.rayOpacity }">
      </div>
    </div>

    <!-- Layer 3: Back Clouds -->
    <div ref="layerBackClouds" class="absolute inset-0 z-20 transition-opacity duration-1000 pointer-events-none" :class="showClouds ? 'opacity-100' : 'opacity-0'">
      <div v-for="(cloud, i) in clouds.back" :key="'bcloud'+i" class="absolute mix-blend-overlay"
        :style="{ top: cloud.top, opacity: cloud.opacity, transform: `scale(${cloud.scale})`, animation: `cloud-drift ${cloud.duration} linear infinite ${cloud.delay}` }">
        <svg viewBox="0 0 24 24" class="w-40 h-40 sm:w-64 sm:h-64 text-white" fill="currentColor">
          <path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.1384 20.1837 10.2017 17.8697 10.0152C17.3483 6.6433 14.394 4 10.875 4C7.14708 4 4.125 7.02208 4.125 10.75C4.125 10.9859 4.13702 11.2189 4.16042 11.4484C2.33878 12.016 1 13.7083 1 15.75C1 18.0972 2.90279 20 5.25 20H17.5V19Z" />
        </svg>
      </div>
    </div>

    <!-- Layer 4: Front Clouds & Weather Overlay (Rain/Fog) -->
    <div ref="layerFrontClouds" class="absolute inset-0 z-30 transition-opacity duration-1000 pointer-events-none" :class="showClouds ? 'opacity-100' : 'opacity-0'">
      <div v-for="(cloud, i) in clouds.front" :key="'fcloud'+i" class="absolute text-white mix-blend-soft-light"
        :style="{ top: cloud.top, opacity: cloud.opacity, transform: `scale(${cloud.scale})`, animation: `cloud-drift ${cloud.duration} linear infinite ${cloud.delay}` }">
        <svg viewBox="0 0 24 24" class="w-56 h-56 sm:w-96 sm:h-96 drop-shadow-xl" fill="currentColor">
          <path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.1384 20.1837 10.2017 17.8697 10.0152C17.3483 6.6433 14.394 4 10.875 4C7.14708 4 4.125 7.02208 4.125 10.75C4.125 10.9859 4.13702 11.2189 4.16042 11.4484C2.33878 12.016 1 13.7083 1 15.75C1 18.0972 2.90279 20 5.25 20H17.5V19Z" />
        </svg>
      </div>
    </div>

    <!-- Layer 5: Weather Particle Overlay (Rain / Fog) -->
    <div ref="layerWeather" class="absolute inset-0 z-40 pointer-events-none overflow-hidden transition-opacity duration-1000" :class="weatherOverlay.opacity">
      <!-- Rain / Storm -->
      <div v-if="weatherOverlay.type === 'rain' || weatherOverlay.type === 'storm'" class="absolute inset-0 opacity-40 pointer-events-none">
        <div v-for="i in 60" :key="'rain'+i" class="absolute w-px bg-linear-to-b from-transparent via-white/20 to-white/40"
          :style="{ 
            left: `${Math.random() * 120 - 10}%`, 
            top: `-${Math.random() * 20 + 10}%`, 
            height: `${Math.random() * 20 + 10}%`, 
            animation: `rain-fall ${Math.random() * 0.5 + 0.6}s linear infinite ${Math.random()}s`,
            willChange: 'transform, opacity'
          }">
        </div>
      </div>
      <!-- Lightning (only for storm) -->
      <div v-if="weatherOverlay.type === 'storm'" class="absolute inset-0 bg-white lightning-flash mix-blend-overlay pointer-events-none"></div>
      <!-- Fog -->
      <div v-if="weatherOverlay.type === 'fog'" class="w-full h-full bg-white/20 backdrop-blur-md"></div>
    </div>

    <!-- Layer 5.5: Mosque Horizon Silhouette -->
    <div class="absolute bottom-0 left-0 w-full z-[35] pointer-events-none overflow-hidden opacity-95 transition-colors duration-1000" :class="silhouetteColor">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" class="w-full h-[15vh] sm:h-[20vh] fill-current">
        <!-- Background layer (distant trees/buildings) -->
        <path d="M0,120 L0,70 Q50,60 100,80 T300,75 T500,85 T700,70 T900,85 T1100,65 L1200,80 L1200,120 Z" opacity="0.5" />
        
        <!-- Mosque Silhouette -->
        <!-- Left Minaret -->
        <rect x="250" y="40" width="10" height="80" />
        <path d="M250,40 L255,20 L260,40 Z" />
        <!-- Main Dome -->
        <path d="M300,120 L300,80 Q350,20 400,80 L400,120 Z" />
        <!-- Finial on Dome -->
        <path d="M348,25 L350,10 L352,25 Z" />
        <circle cx="350" cy="8" r="2" />
        
        <!-- Center Large Dome -->
        <path d="M450,120 L450,70 Q550,-10 650,70 L650,120 Z" />
        <path d="M547,15 L550,-5 L553,15 Z" />
        <path d="M550,-8 A 5 5 0 0 1 550,-18 A 6 6 0 0 0 548,-6 Z" /> <!-- Crescent -->
        
        <!-- Right Small Dome -->
        <path d="M700,120 L700,80 Q750,20 800,80 L800,120 Z" />
        <path d="M748,25 L750,10 L752,25 Z" />
        <circle cx="750" cy="8" r="2" />
        
        <!-- Right Minaret -->
        <rect x="850" y="40" width="10" height="80" />
        <path d="M850,40 L855,20 L860,40 Z" />
        
        <!-- Base ground -->
        <rect x="0" y="100" width="1200" height="20" />
      </svg>
    </div>

    <!-- UI Content -->
    <div class="relative z-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-8" ref="headerRef">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-secondary/20 mb-6 shadow-lg shadow-black/20">
          <span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          <span class="text-secondary text-xs font-semibold tracking-wider uppercase drop-shadow-sm">Jadwal Sholat</span>
        </div>
        <h2 class="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          Waktu <span class="text-gradient-gold drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">Sholat</span> Hari Ini
        </h2>
        <p class="text-white/80 text-base sm:text-lg max-w-2xl mx-auto font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {{ currentDate }}
        </p>
      </div>

      <!-- Location Info -->
      <div class="flex flex-wrap items-center justify-center gap-3 mb-6" ref="locationRef">
        <div
          @click="requestLocation"
          :class="[
            'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border backdrop-blur-md shadow-md transition-all duration-300',
            locationError
              ? 'bg-red-500/20 border-red-500/30 text-red-200 cursor-pointer hover:bg-red-500/30'
              : 'bg-black/30 border-white/10 text-white/80 cursor-pointer hover:bg-black/50 hover:border-white/30',
          ]"
          title="Klik untuk memperbarui lokasi"
        >
          <MapPin class="w-4 h-4 shrink-0" :class="locationError ? 'text-red-400' : 'text-secondary'" />
          <span v-if="loading" class="flex items-center gap-2">
            <span class="w-3 h-3 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin"></span>
            Mendeteksi lokasi...
          </span>
          <span v-else-if="locationError">{{ locationError }}</span>
          <span v-else>{{ locationName }}</span>
        </div>
        <!-- Method badge -->
        <div class="inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs bg-black/30 backdrop-blur-md shadow-md border border-white/10 text-white/70">
          <Globe class="w-3.5 h-3.5 text-white/50" />
          Kemenag RI
        </div>
        <!-- Qibla Compass -->
        <div 
          v-if="qiblaDirection > 0"
          class="inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs bg-black/30 backdrop-blur-md shadow-md border border-white/10 text-white/80 group cursor-help"
          title="Arah Kiblat dari lokasi Anda"
        >
          <Compass 
            class="w-4 h-4 text-secondary transition-transform duration-1000"
            :style="{ transform: `rotate(${qiblaDirection}deg)` }"
          />
          {{ qiblaDirection.toFixed(1) }}° Kiblat
        </div>
        <!-- Live Weather -->
        <div 
          v-if="weather.temp !== null"
          class="inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs bg-black/30 backdrop-blur-md shadow-md border border-white/10 text-white/80"
          :title="weather.desc"
        >
          <component :is="weather.icon" class="w-4 h-4 text-secondary" />
          {{ weather.temp }}°C
        </div>
      </div>


      <!-- Countdown to Next Prayer -->
      <div v-if="nextPrayer && !loading" class="flex justify-center mb-12" ref="countdownRef">
        <div 
          class="relative border rounded-2xl px-8 py-5 text-center transition-all duration-500 overflow-hidden backdrop-blur-xl"
          :class="isPrayerTimeNow ? 'bg-secondary/20 border-secondary/50 shadow-[0_0_50px_rgba(197,165,90,0.5)] animate-pulse' : 'bg-dark/40 dark:bg-dark-light/40 border-secondary/20 shadow-xl'"
        >
          <!-- Alert overlay when prayer time -->
          <div v-if="isPrayerTimeNow" class="absolute inset-0 bg-secondary/10 animate-ping" style="animation-duration: 2s;"></div>
          
          <div class="relative z-10">
            <p v-if="isPrayerTimeNow" class="text-secondary font-bold text-sm tracking-wider uppercase mb-2 animate-bounce">
              Waktunya Sholat {{ nextPrayer.name }}
            </p>
            <p v-else class="text-white/50 text-xs uppercase tracking-wider mb-2">Waktu menuju {{ nextPrayer.name }}</p>
            
            <div class="flex items-center justify-center gap-2 sm:gap-3">
              <div class="text-center w-16 sm:w-20 shrink-0">
                <p class="font-mono text-3xl sm:text-4xl font-bold" :class="isPrayerTimeNow ? 'text-white' : 'text-secondary'">{{ countdown.hours }}</p>
                <p class="text-white/30 text-[10px] uppercase tracking-wider mt-1">Jam</p>
              </div>
            <span class="text-secondary/50 text-2xl font-bold pb-4">:</span>
            <div class="text-center w-16 sm:w-20 shrink-0">
              <p class="font-mono text-3xl sm:text-4xl font-bold" :class="isPrayerTimeNow ? 'text-white' : 'text-secondary'">{{ countdown.minutes }}</p>
              <p class="text-white/30 text-[10px] uppercase tracking-wider mt-1">Menit</p>
            </div>
            <span class="text-secondary/50 text-2xl font-bold pb-4">:</span>
            <div class="text-center w-16 sm:w-20 shrink-0">
              <p class="font-mono text-3xl sm:text-4xl font-bold text-white">{{ countdown.seconds }}</p>
              <p class="text-white/30 text-[10px] uppercase tracking-wider mt-1">Detik</p>
            </div>
          </div>
        </div>
        </div>
      </div>

      <!-- Prayer Cards -->
      <div class="flex flex-wrap justify-center gap-2 sm:gap-4 lg:gap-6 py-4 lg:py-0 pb-6 lg:pb-0" ref="cardsRef" style="perspective: 1000px;">
        <div
          v-for="(prayer, index) in prayers"
          :key="prayer.name"
          @mousemove="handleMouseMove($event, index)"
          @mouseleave="resetTilt(index)"
          :style="{ transform: cardTilts[index] || 'scale3d(1, 1, 1)' }"
          :class="[
            'w-[calc(33.333%-0.4rem)] sm:w-[calc(33.333%-0.666rem)] md:w-[calc(25%-0.75rem)] lg:w-auto lg:flex-1 relative group rounded-xl sm:rounded-2xl p-2 sm:p-6 text-center transition-all duration-300 border cursor-default backdrop-blur-md transform-gpu',
            prayer.isNext
              ? (isPrayerTimeNow 
                  ? 'bg-secondary/30 dark:bg-secondary/20 border-secondary shadow-[0_0_40px_rgba(200,160,80,0.6)] z-10 ring-2 sm:ring-4 ring-secondary animate-pulse' 
                  : 'bg-secondary/20 dark:bg-secondary/15 border-secondary/40 shadow-[0_0_30px_rgba(197,165,90,0.2)] z-10 ring-1 sm:ring-2 ring-secondary/50')
              : prayer.isPassed
                ? 'bg-dark/20 dark:bg-dark/40 border-white/[0.06] opacity-60'
                : 'bg-dark/40 dark:bg-dark/60 border-white/10 hover:bg-dark/60 hover:border-white/20',
          ]"
        >
          <!-- Next indicator -->
          <div
            v-if="prayer.isNext"
            class="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 px-2 sm:px-3 py-0.5 sm:py-1 bg-secondary text-dark text-[8px] sm:text-[10px] font-bold rounded-full uppercase tracking-wider whitespace-nowrap"
          >
            Selanjutnya
          </div>

          <!-- Passed check -->
          <div
            v-if="prayer.isPassed && !prayer.isNext"
            class="absolute top-1.5 right-1.5 sm:top-3 sm:right-3"
          >
            <Check class="w-3 h-3 sm:w-4 sm:h-4 text-green-400/50" />
          </div>

          <!-- Icon -->
          <div
            :class="[
              'w-8 h-8 sm:w-14 sm:h-14 mx-auto rounded-lg sm:rounded-2xl flex items-center justify-center mb-1.5 sm:mb-4 transition-all duration-300',
              prayer.isNext
                ? (isPrayerTimeNow ? 'bg-secondary/40 scale-110' : 'bg-secondary/20')
                : 'bg-white/5 group-hover:bg-primary/20',
            ]"
          >
            <component
              :is="prayer.icon"
              :class="[
                'w-4 h-4 sm:w-6 sm:h-6 transition-colors duration-300',
                prayer.isNext ? (isPrayerTimeNow ? 'text-white' : 'text-secondary') : 'text-white/60 group-hover:text-primary-light',
              ]"
            />
          </div>

          <!-- Name -->
          <h3
            :class="[
              'font-heading text-xs sm:text-lg font-semibold mb-0.5 sm:mb-2',
              prayer.isNext ? 'text-secondary' : 'text-white',
            ]"
          >
            {{ prayer.name }}
          </h3>

          <!-- Time -->
          <p
            :class="[
              'font-mono text-sm sm:text-3xl font-bold leading-tight sm:leading-normal',
              prayer.isNext ? 'text-white' : 'text-white/80',
            ]"
          >
            <span v-if="loading" class="inline-block w-8 sm:w-16 h-3 sm:h-8 bg-white/10 rounded animate-pulse"></span>
            <span v-else>{{ prayer.time }}</span>
          </p>

          <!-- Arabic -->
          <p class="text-white/30 text-[9px] sm:text-sm font-arabic mt-0.5 sm:mt-2 leading-tight sm:leading-normal">{{ prayer.arabic }}</p>
        </div>
      </div>



      <!-- Hijri Date + Data Source -->
      <div class="mt-12 text-center space-y-6">
        <button 
          @click="isCalendarOpen = true"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-md"
        >
          <CalendarDays class="w-5 h-5 text-secondary" />
          Lihat Jadwal Sebulan
        </button>

        <div class="space-y-1">
          <p v-if="hijriDate" class="text-white/50 font-medium text-sm">
            {{ hijriDate }}
          </p>
          <p class="text-white/30 text-xs">
            Sumber data: Aladhan API • Metode: Kementerian Agama RI
          </p>
        </div>
      </div>
    </div>

    <!-- Calendar Modal -->
    <PrayerCalendarModal 
      :is-open="isCalendarOpen"
      :lat="userLat"
      :lng="userLng"
      @close="isCalendarOpen = false"
    />
    <!-- Audio for Prayer Time Notification -->
    <audio ref="prayerAudio" src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" preload="auto"></audio>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { MapPin, Globe, Compass, Sun, Moon, Cloud, CloudRain, CloudLightning, CloudSnow, CloudSun, Sunrise, Sunset, MoonStar, Check, CalendarDays, Thermometer } from 'lucide-vue-next'
import { usePrayerStore } from '@/stores/prayer'
import IslamicPattern from '@/components/ui/IslamicPattern.vue'
import PrayerCalendarModal from '@/components/ui/PrayerCalendarModal.vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const headerRef = ref(null)
const locationRef = ref(null)
const countdownRef = ref(null)
const cardsRef = ref(null)

const loading = ref(true)
const locationName = ref('Memuat lokasi...')
const locationError = ref('')
const prayerStore = usePrayerStore()
const hijriDate = ref('')
const hijriDay = ref(15) // Default to full moon
const qiblaDirection = ref(0)
const userLat = ref(-7.0355)
const userLng = ref(107.6578)
let countdownInterval = null

const skyThemeClass = ref('bg-dark dark:bg-[#121220]')
const isCalendarOpen = ref(false)
const showStars = ref(true)
const showClouds = ref(false)
const showBirds = ref(false)

const weather = ref({ temp: null, icon: null, desc: '' })


const stars = ref([])
const shootingStars = ref([])
const clouds = ref({ front: [], back: [] })
const birds = ref([])
const weatherOverlay = ref({ type: 'none', opacity: 'opacity-0' })
const silhouetteColor = ref('text-black')

// Layer Refs for Parallax
const layerStars = ref(null)
const layerCelestial = ref(null)
const layerBackClouds = ref(null)
const layerFrontClouds = ref(null)
const prayerAudio = ref(null)



onMounted(() => {
  // Generate random stars once
  stars.value = Array.from({ length: 60 }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 60}%`, // Top 60% of sky
    size: `${Math.random() * 2 + 1}px`,
    delay: `${Math.random() * 5}s`,
    duration: `${Math.random() * 3 + 2}s`
  }))

  // Generate dynamic layered clouds
  clouds.value = {
    back: [
      { top: '15%', scale: 0.6, delay: '0s', duration: '120s', opacity: 0.3 },
      { top: '5%', scale: 0.8, delay: '-40s', duration: '150s', opacity: 0.2 },
      { top: '30%', scale: 0.5, delay: '-80s', duration: '100s', opacity: 0.4 },
    ],
    front: [
      { top: '10%', scale: 1.2, delay: '0s', duration: '60s', opacity: 0.7 },
      { top: '25%', scale: 1.5, delay: '-20s', duration: '80s', opacity: 0.5 },
      { top: '40%', scale: 1.1, delay: '-40s', duration: '45s', opacity: 0.8 },
    ]
  }

  // Generate birds
  birds.value = [
    { top: '15%', scale: 0.8, delay: '0s', duration: '25s' },
    { top: '22%', scale: 0.6, delay: '3s', duration: '30s' },
    { top: '12%', scale: 1.0, delay: '15s', duration: '20s' },
    { top: '35%', scale: 0.5, delay: '8s', duration: '35s' },
  ]

  // Shooting stars logic
  setInterval(() => {
    if (showStars.value && Math.random() > 0.6) {
      const id = Date.now()
      shootingStars.value.push({
        id,
        top: `${Math.random() * 30}%`,
        left: `${40 + Math.random() * 60}%`, // Start mostly from right half
      })
      setTimeout(() => {
        shootingStars.value = shootingStars.value.filter(s => s.id !== id)
      }, 1000)
    }
  }, 2500)
})

const cardTilts = ref({}) // Store tilt transforms for each card index

const handleSectionMouseMove = (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2
  const y = (e.clientY / window.innerHeight - 0.5) * 2

  // Parallax depths (using GSAP for smooth interpolation)
  if (layerStars.value) gsap.to(layerStars.value, { x: x * 10, y: y * 10, duration: 1, ease: 'power2.out' })
  if (layerCelestial.value) gsap.to(layerCelestial.value, { x: x * 20, y: y * 20, duration: 1, ease: 'power2.out' })
  if (layerBackClouds.value) gsap.to(layerBackClouds.value, { x: x * -15, y: y * -15, duration: 1, ease: 'power2.out' })
  if (layerFrontClouds.value) gsap.to(layerFrontClouds.value, { x: x * -40, y: y * -40, duration: 1, ease: 'power2.out' })
}

const handleMouseMove = (e, index) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  // Calculate tilt (max 15 degrees)
  const tiltX = ((y - centerY) / centerY) * -15
  const tiltY = ((x - centerX) / centerX) * 15
  
  cardTilts.value[index] = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`
}

const resetTilt = (index) => {
  cardTilts.value[index] = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
}

const currentDate = computed(() => {
  const now = new Date()
  return now.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

const prayers = ref([
  { name: 'Imsak', time: '--:--', arabic: 'الإمساك', icon: MoonStar, isNext: false, isPassed: false, timeMinutes: 0 },
  { name: 'Subuh', time: '--:--', arabic: 'الفجر', icon: Sunrise, isNext: false, isPassed: false, timeMinutes: 0 },
  { name: 'Terbit', time: '--:--', arabic: 'الشروق', icon: Sun, isNext: false, isPassed: false, timeMinutes: 0 },
  { name: 'Dzuhur', time: '--:--', arabic: 'الظهر', icon: Sun, isNext: false, isPassed: false, timeMinutes: 0 },
  { name: 'Ashar', time: '--:--', arabic: 'العصر', icon: CloudSun, isNext: false, isPassed: false, timeMinutes: 0 },
  { name: 'Maghrib', time: '--:--', arabic: 'المغرب', icon: Sunset, isNext: false, isPassed: false, timeMinutes: 0 },
  { name: 'Isya', time: '--:--', arabic: 'العشاء', icon: Moon, isNext: false, isPassed: false, timeMinutes: 0 },
])


const nextPrayer = ref(null)
const countdown = ref({ hours: '00', minutes: '00', seconds: '00' })
const isPrayerTimeNow = ref(false)

// Watcher for prayer time now to play audio
watch(isPrayerTimeNow, (newValue, oldValue) => {
  if (newValue === true && oldValue === false) {
    if (prayerAudio.value) {
      prayerAudio.value.currentTime = 0
      prayerAudio.value.play().catch(e => console.log('Audio autoplay blocked', e))
    }
  }
})

const celestialBody = ref({
  type: 'sun',
  x: '50%',
  y: '100%',
  size: '120px',
  color: 'bg-amber-400',
  glow: '0 0 80px 30px rgba(251, 191, 36, 0.4)',
  rayColor: 'rgba(255,255,255,0.2)',
  rayOpacity: 0
})

// Parse time string "HH:MM" to total minutes since midnight
function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + m
}

// Determine which prayer is next and which have passed
function updatePrayerStatus() {
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  let foundNext = false
  prayers.value.forEach((prayer) => {
    if (prayer.time === '--:--') return
    const prayerMin = timeToMinutes(prayer.time)
    prayer.timeMinutes = prayerMin
    prayer.isPassed = currentMinutes >= prayerMin
    prayer.isNext = false
  })

  for (let i = 0; i < prayers.value.length; i++) {
    if (!prayers.value[i].isPassed) {
      prayers.value[i].isNext = true
      prayers.value[i].isPassed = false
      nextPrayer.value = prayers.value[i]
      foundNext = true
      break
    }
  }

  // If all prayers have passed, next is Subuh tomorrow
  if (!foundNext && prayers.value[1].time !== '--:--') {
    nextPrayer.value = { ...prayers.value[1], name: 'Subuh (besok)' }
  }

  if (nextPrayer.value) {
    prayerStore.setNextPrayer(nextPrayer.value)
  }
}

// Update countdown timer
function updateCountdown() {
  if (!nextPrayer.value || nextPrayer.value.time === '--:--') return

  const now = new Date()
  const [targetH, targetM] = nextPrayer.value.time.split(':').map(Number)
  let target = new Date(now)
  target.setHours(targetH, targetM, 0, 0)

  // If target has passed (all prayers done today), set to tomorrow
  if (target <= now) {
    target.setDate(target.getDate() + 1)
  }

  const diff = target - now
  const totalSeconds = Math.max(0, Math.floor(diff / 1000))
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60

  countdown.value = {
    hours: String(h).padStart(2, '0'),
    minutes: String(m).padStart(2, '0'),
    seconds: String(s).padStart(2, '0'),
  }

  // Check if time is now (within 1 minute)
  if (totalSeconds === 0 || (h === 0 && m === 0 && s < 60 && !nextPrayer.value.name.includes('besok'))) {
    isPrayerTimeNow.value = true
  } else {
    isPrayerTimeNow.value = false
  }
}

// Update celestial body (sun/moon) position and type based on time
function updateCelestialBody() {
  if (prayers.value[0].time === '--:--') return
  
  const fajr = prayers.value[1].timeMinutes || 270 // Subuh
  const dhuhr = prayers.value[3].timeMinutes || 715 // Dzuhur
  const asr = prayers.value[4].timeMinutes || 915 // Ashar
  const maghrib = prayers.value[5].timeMinutes || 1065 // Maghrib
  const isha = prayers.value[6].timeMinutes || 1138 // Isya
  
  const now = new Date()
  let currentMinutes = now.getHours() * 60 + now.getMinutes()


  
  let type = 'sun'
  let progress = 0 // 0 to 1 across the sky
  let yOffset = 1 // 0 (high noon) to 1 (horizon)
  let color = 'bg-amber-400'
  let glow = '0 0 100px 40px rgba(251, 191, 36, 0.5)'
  let size = '150px'
  let skyClass = 'bg-dark dark:bg-[#121220]'
  
  let sStars = false
  let sClouds = false
  let rayOpacity = 0
  let rayColor = 'rgba(255,255,255,0.1)'
  
  let silhouette = 'text-slate-800' // default dark silhouette
  
  if (currentMinutes < fajr) {
    // Malam / Dini Hari (Midnight to Fajr)
    type = 'moon'
    color = 'bg-slate-100'
    glow = '0 0 80px 20px rgba(241, 245, 249, 0.4)'
    progress = 0.5 + (currentMinutes / fajr) * 0.5 // 50% to 100%
    yOffset = 1 - Math.sin(progress * Math.PI)
    skyClass = 'bg-linear-to-b from-[#0f172a] to-[#020617]'
    silhouette = 'text-slate-800'
    sStars = true; sClouds = false; rayOpacity = 0.2; rayColor = 'rgba(200,220,255,0.05)'
  } else if (currentMinutes < dhuhr) {
    // Pagi (Fajr to Dhuhr)
    progress = (currentMinutes - fajr) / (dhuhr - fajr) * 0.5 // 0% to 50%
    yOffset = 1 - Math.sin(progress * Math.PI)
    skyClass = 'bg-linear-to-b from-sky-900 to-slate-800'
    silhouette = 'text-slate-900'
    sStars = false; sClouds = true; rayOpacity = 0.7; rayColor = 'rgba(255,255,255,0.1)'
  } else if (currentMinutes < maghrib) {
    // Siang / Sore (Dhuhr to Maghrib)
    progress = 0.5 + (currentMinutes - dhuhr) / (maghrib - dhuhr) * 0.5 // 50% to 100%
    yOffset = 1 - Math.sin(progress * Math.PI)
    if (currentMinutes >= asr) {
      // Sore (Late afternoon / Orange Sun)
      color = 'bg-orange-500'
      glow = '0 0 150px 60px rgba(249, 115, 22, 0.5)'
      skyClass = 'bg-linear-to-b from-orange-950 to-slate-900'
      silhouette = 'text-slate-950'
      sStars = false; sClouds = true; rayOpacity = 0.5; rayColor = 'rgba(249,115,22,0.1)'
    } else {
      // Siang (Noon)
      color = 'bg-amber-200'
      glow = '0 0 120px 40px rgba(253, 230, 138, 0.4)'
      skyClass = 'bg-linear-to-b from-slate-800 to-slate-700'
      silhouette = 'text-slate-900'
      sStars = false; sClouds = true; rayOpacity = 0.8; rayColor = 'rgba(255,255,255,0.1)'
    }
  } else if (currentMinutes < isha) {
    // Senja / Malam Awal (Maghrib to Isha)
    type = 'moon'
    color = 'bg-slate-100'
    glow = '0 0 80px 20px rgba(241, 245, 249, 0.4)'
    progress = (currentMinutes - maghrib) / (isha - maghrib) * 0.2 // 0% to 20%
    yOffset = 1 - Math.sin(progress * Math.PI)
    skyClass = 'bg-linear-to-b from-indigo-950 to-slate-900'
    silhouette = 'text-slate-900'
    sStars = true; sClouds = true; rayOpacity = 0.1; rayColor = 'rgba(200,200,255,0.05)'
  } else {
    // Malam (Isha to Midnight)
    type = 'moon'
    color = 'bg-slate-100'
    glow = '0 0 80px 20px rgba(241, 245, 249, 0.4)'
    progress = 0.2 + (currentMinutes - isha) / (24 * 60 - isha) * 0.3 // 20% to 50%
    yOffset = 1 - Math.sin(progress * Math.PI)
    skyClass = 'bg-linear-to-b from-[#0f172a] to-[#020617]'
    silhouette = 'text-slate-800'
    sStars = true; sClouds = false; rayOpacity = 0.2; rayColor = 'rgba(200,220,255,0.05)'
  }
  
  // Weather Overrides
  let desc = weather.value.desc
  


  let wType = 'none'
  let wOpacity = 'opacity-0'
  
  if (desc === 'Cerah') {
    sClouds = false
  } else if (desc === 'Berawan') {
    sClouds = true
  } else if (desc === 'Berkabut') {
    sClouds = true
    wType = 'fog'
    wOpacity = 'opacity-100'
  } else if (desc === 'Hujan' || desc === 'Hujan Deras') {
    sClouds = true
    sStars = false
    wType = 'rain'
    wOpacity = 'opacity-100'
    rayOpacity = rayOpacity * 0.3
    skyClass = 'bg-linear-to-b from-slate-800 to-slate-900' // Make it dark
    silhouette = 'text-slate-950'
  } else if (desc === 'Badai Petir') {
    sClouds = true
    sStars = false
    wType = 'storm'
    wOpacity = 'opacity-100'
    rayOpacity = rayOpacity * 0.2
    skyClass = 'bg-linear-to-b from-[#0a0f18] to-slate-900' // Very dark
    silhouette = 'text-black'
  }
  
  // Calculate moon phase based on hijri day
  let mPhase = 'full'
  
  const hd = hijriDay.value
  if (hd <= 4 || hd >= 26) mPhase = 'crescent'
  else if ((hd >= 5 && hd <= 9) || (hd >= 21 && hd <= 25)) mPhase = 'quarter'
  else if ((hd >= 10 && hd <= 12) || (hd >= 18 && hd <= 20)) mPhase = 'gibbous'
  else mPhase = 'full'

  // Calculate final X and Y
  const x = (10 + progress * 80) + '%' // 10% to 90% width
  const y = (15 + yOffset * 75) + '%' // 15% (highest) to 90% (horizon)
  
  celestialBody.value = { type, x, y, size, color, glow, rayColor, rayOpacity, phase: mPhase }
  skyThemeClass.value = skyClass
  showStars.value = sStars
  showClouds.value = sClouds
  silhouetteColor.value = silhouette
  showBirds.value = (type === 'sun' && desc !== 'Hujan' && desc !== 'Hujan Deras' && desc !== 'Badai Petir')
  weatherOverlay.value = { type: wType, opacity: wOpacity }
}

// Fetch prayer times from Aladhan API
async function fetchPrayerTimes(lat, lng) {
  try {
    const now = new Date()
    const dd = String(now.getDate()).padStart(2, '0')
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const yyyy = now.getFullYear()

    // Method 20 = Kementerian Agama RI
    const url = `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lng}&method=20`
    const res = await fetch(url)
    const data = await res.json()

    if (data.code === 200 && data.data) {
      const timings = data.data.timings
      prayers.value[0].time = timings.Imsak.substring(0, 5)
      prayers.value[1].time = timings.Fajr.substring(0, 5)
      prayers.value[2].time = timings.Sunrise.substring(0, 5)
      prayers.value[3].time = timings.Dhuhr.substring(0, 5)
      prayers.value[4].time = timings.Asr.substring(0, 5)
      prayers.value[5].time = timings.Maghrib.substring(0, 5)
      prayers.value[6].time = timings.Isha.substring(0, 5)

      // Hijri date
      const hijri = data.data.date.hijri
      if (hijri) {
        hijriDay.value = parseInt(hijri.day) || 15
        hijriDate.value = `${hijri.day} ${hijri.month.en} ${hijri.year} H`
      }

      updatePrayerStatus()
      updateCountdown()
      updateCelestialBody()
    }
  } catch (err) {
    console.error('Failed to fetch prayer times:', err)
    // Fallback to static times
    setFallbackTimes()
  } finally {
    loading.value = false
  }
}

// Fetch live weather from Open-Meteo API
async function fetchWeather(lat, lng) {
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`)
    const data = await res.json()
    if (data.current_weather) {
      const temp = Math.round(data.current_weather.temperature)
      const code = data.current_weather.weathercode
      
      let icon = Sun
      let desc = 'Cerah'
      
      // WMO Weather interpretation codes
      if (code === 0) { icon = Sun; desc = 'Cerah' }
      else if (code >= 1 && code <= 3) { icon = CloudSun; desc = 'Berawan' }
      else if (code === 45 || code === 48) { icon = Cloud; desc = 'Berkabut' }
      else if (code >= 51 && code <= 67) { icon = CloudRain; desc = 'Hujan' }
      else if (code >= 71 && code <= 77) { icon = CloudSnow; desc = 'Salju' }
      else if (code >= 80 && code <= 82) { icon = CloudRain; desc = 'Hujan Deras' }
      else if (code >= 95 && code <= 99) { icon = CloudLightning; desc = 'Badai Petir' }
      
      weather.value = { temp, icon, desc }
    }
  } catch (err) {
    console.error('Failed to fetch weather:', err)
  }
}

// Reverse geocode to get location name and Qibla
async function reverseGeocode(lat, lng) {
  try {
    const res = await fetch(`https://api.aladhan.com/v1/qibla/${lat}/${lng}`)
    const data = await res.json()
    if (data.code === 200 && data.data) {
      qiblaDirection.value = data.data.direction
    }
    
    // Use a simpler approach - just show coordinates city
    locationName.value = `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`

    // Try nominatim for city name
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=id`)
    const geoData = await geoRes.json()
    if (geoData.address) {
      const city = geoData.address.city || geoData.address.town || geoData.address.village || geoData.address.county || ''
      const state = geoData.address.state || ''
      if (city) {
        locationName.value = state ? `${city}, ${state}` : city
      }
    }
  } catch (e) {
    // Keep coordinates as fallback
  }
}

function setFallbackTimes() {
  // Default: Perumahan Arjamukti, Desa Arjasari area
  prayers.value[0].time = '04:20' // Imsak
  prayers.value[1].time = '04:30' // Subuh
  prayers.value[2].time = '05:45' // Terbit
  prayers.value[3].time = '11:55' // Dzuhur
  prayers.value[4].time = '15:12' // Ashar
  prayers.value[5].time = '17:45' // Maghrib
  prayers.value[6].time = '18:58' // Isya
  locationName.value = 'Arjasari, Jawa Barat (default)'
  qiblaDirection.value = 295.14
  updatePrayerStatus()
  updateCountdown()
  updateCelestialBody()
}

function requestLocation() {
  loading.value = true
  locationError.value = ''
  
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        userLat.value = latitude
        userLng.value = longitude
        try {
          await Promise.all([
            fetchPrayerTimes(latitude, longitude),
            reverseGeocode(latitude, longitude),
            fetchWeather(latitude, longitude)
          ])
        } catch (err) {
          console.error(err)
        } finally {
          loading.value = false
        }
      },
      (err) => {
        console.warn('Geolocation error:', err)
        locationError.value = 'Akses lokasi ditolak'
        loading.value = false
        setFallbackTimes()
      },
      { timeout: 8000, maximumAge: 300000 }
    )
  } else {
    locationError.value = 'Browser tidak mendukung lokasi'
    loading.value = false
    setFallbackTimes()
  }
}

onMounted(() => {
  // Start with fallback so it's not empty initially while loading
  setFallbackTimes()
  requestLocation()

  // Countdown timer
  countdownInterval = setInterval(() => {
    updatePrayerStatus()
    updateCountdown()
    updateCelestialBody()
  }, 1000)

  // GSAP Animations
  gsap.fromTo(
    headerRef.value,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '#jadwal', start: 'top 75%', once: true },
    }
  )

  gsap.fromTo(
    cardsRef.value.children,
    { opacity: 0, y: 40, scale: 0.9 },
    {
      opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.5)',
      stagger: 0.1,
      scrollTrigger: { trigger: '#jadwal', start: 'top 65%', once: true },
    }
  )
})

onUnmounted(() => {
  if (countdownInterval) clearInterval(countdownInterval)
})
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<style>
@keyframes cloud-drift {
  0% { transform: translateX(-50vw); }
  100% { transform: translateX(100vw); }
}

@keyframes bird-fly {
  0% { transform: translateX(-10vw) translateY(0) scale(var(--tw-scale-x)); }
  25% { transform: translateX(25vw) translateY(-20px) scale(var(--tw-scale-x)); }
  50% { transform: translateX(50vw) translateY(10px) scale(var(--tw-scale-x)); }
  75% { transform: translateX(75vw) translateY(-10px) scale(var(--tw-scale-x)); }
  100% { transform: translateX(110vw) translateY(0) scale(var(--tw-scale-x)); }
}

@keyframes shoot {
  0% { transform: translateX(0) translateY(0) rotate(-35deg) scaleX(1); opacity: 1; }
  100% { transform: translateX(-30vw) translateY(20vw) rotate(-35deg) scaleX(0); opacity: 0; }
}

.shooting-star {
  width: 150px;
  background: linear-gradient(90deg, rgba(255,255,255,1), transparent);
  animation: shoot 1s ease-out forwards;
  filter: drop-shadow(0 0 6px white);
}

@keyframes rain-fall {
  0% { transform: translate3d(0, 0, 0) rotate(15deg); opacity: 0; }
  10% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translate3d(0, 100vh, 0) rotate(15deg); opacity: 0; }
}

@keyframes lightning {
  0% { opacity: 0; }
  1% { opacity: 0.3; }
  2% { opacity: 0; }
  3% { opacity: 0.4; }
  4% { opacity: 0; }
  100% { opacity: 0; }
}

.lightning-flash {
  animation: lightning 7s infinite;
  opacity: 0;
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}
</style>
