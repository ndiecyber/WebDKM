<template>
  <section id="keuangan" class="relative py-8 lg:py-10 bg-white dark:bg-dark overflow-hidden transition-colors duration-500">
    <!-- Background Elements -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-100">
      <div class="absolute top-0 right-0 w-96 h-96 bg-primary/10 dark:bg-secondary/10 rounded-full blur-[100px]"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 dark:bg-primary/10 rounded-full blur-[100px]"></div>
    </div>
    <IslamicPattern pattern-color="#C5A55A" :show-sparkles="false" class="opacity-10 dark:opacity-[0.15]" />

    <!-- Floating Particles -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none z-1">
      <div
        v-for="p in particles"
        :key="p.id"
        class="absolute rounded-full"
        :class="p.colorClass"
        :style="{
          width: p.size + 'px',
          height: p.size + 'px',
          left: p.x + '%',
          top: p.y + '%',
          animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          opacity: p.opacity,
        }"
      ></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Header -->
      <div class="text-center mb-6" ref="headerRef">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-secondary/10 border border-primary/20 dark:border-secondary/20 mb-5">
          <span class="w-1.5 h-1.5 rounded-full bg-primary dark:bg-secondary animate-pulse"></span>
          <span class="text-primary dark:text-secondary text-xs font-semibold tracking-wider uppercase">Transparansi</span>
        </div>
        <h2 class="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark dark:text-white transition-colors duration-500 tracking-tight mb-3">
          Laporan <span class="text-primary dark:text-secondary">Keuangan</span>
        </h2>
        <p class="text-dark/50 dark:text-white/50 text-sm sm:text-base max-w-4xl mx-auto transition-colors duration-500">
          Kami berkomitmen menjaga kepercayaan jamaah dengan transparansi pengelolaan dana masjid
        </p>
      </div>

      <!-- Cards Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6 pb-6" ref="cardsRef">
        
        <!-- Saldo Awal -->
        <div 
          @mousemove="handleMouseMove($event, 0)"
          @mouseleave="resetTilt(0)"
          :style="{ transform: cardTilts[0] || 'scale3d(1, 1, 1)' }"
          class="finance-card group w-full bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-gray-300 dark:border-white/20 transition-all duration-300 transform-gpu relative overflow-hidden"
        >
          <div class="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <!-- Decorative Icon -->
          <div class="absolute -right-4 -top-4 w-20 h-20 bg-primary/5 dark:bg-secondary/10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
            <Wallet class="w-8 h-8 text-primary/20 dark:text-secondary/20" />
          </div>
          <div class="relative z-10">
            <div class="flex items-center gap-2.5 mb-1">
              <div class="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-primary/10 dark:bg-secondary/15 flex items-center justify-center">
                <Wallet class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary dark:text-secondary" />
              </div>
              <h3 class="text-dark dark:text-white/90 font-semibold text-sm sm:text-base transition-colors duration-500">Saldo Awal</h3>
            </div>
            <p class="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs mb-2 sm:mb-4 ml-[38px] sm:ml-[46px] transition-colors duration-500">Periode Bulan Lalu</p>
            
            <!-- Sparkline Chart -->
            <div class="mb-2 sm:mb-4 ml-1">
              <svg class="w-full h-6 sm:h-10" viewBox="0 0 200 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="sparkGold" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="currentColor" stop-opacity="0.3"/>
                    <stop offset="100%" stop-color="currentColor" stop-opacity="0"/>
                  </linearGradient>
                </defs>
                <path class="text-primary/30 dark:text-secondary/30" :d="sparklineArea1" fill="url(#sparkGold)" />
                <path ref="sparkline1" class="text-primary dark:text-secondary" :d="sparklinePath1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :stroke-dasharray="sparklineLength1" :stroke-dashoffset="sparklineOffset1" />
              </svg>
            </div>

            <div class="flex items-end gap-1 font-bold font-heading">
              <span class="text-sm sm:text-2xl text-primary dark:text-secondary">Rp</span>
              <span class="text-xl sm:text-4xl leading-none text-gradient-gold" ref="counter1">0</span>
              <span class="text-sm sm:text-xl pb-0.5 text-primary dark:text-secondary">jt</span>
            </div>
            <div class="flex items-center gap-2 mt-2 sm:mt-3">
              <div class="flex-1 h-1 rounded-full bg-primary/10 dark:bg-secondary/10 overflow-hidden">
                <div ref="progressBar1" class="h-full bg-linear-to-r from-primary to-primary-light dark:from-secondary dark:to-secondary-light rounded-full transition-all duration-300" style="width: 0%"></div>
              </div>
              <span class="text-gray-400 dark:text-gray-500 text-[10px] font-medium">Rp {{ adminStore.finance.saldoAwalFull }}</span>
            </div>
          </div>
        </div>

        <!-- Pemasukan -->
        <div 
          @mousemove="handleMouseMove($event, 1)"
          @mouseleave="resetTilt(1)"
          :style="{ transform: cardTilts[1] || 'scale3d(1, 1, 1)' }"
          class="finance-card group w-full bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-gray-300 dark:border-white/20 transition-all duration-300 transform-gpu relative overflow-hidden"
        >
          <div class="absolute inset-0 bg-linear-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="absolute -right-4 -top-4 w-20 h-20 bg-green-500/5 dark:bg-green-500/10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
            <TrendingUp class="w-8 h-8 text-green-500/20 dark:text-green-400/20" />
          </div>
          <div class="relative z-10">
            <div class="flex items-center gap-2.5 mb-1">
              <div class="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-green-500/10 flex items-center justify-center">
                <TrendingUp class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
              </div>
              <h3 class="text-dark dark:text-white/90 font-semibold text-sm sm:text-base transition-colors duration-500">Pemasukan</h3>
            </div>
            <p class="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs mb-2 sm:mb-4 ml-[38px] sm:ml-[46px] transition-colors duration-500">Periode Bulan Lalu</p>
            
            <!-- Sparkline Chart -->
            <div class="mb-2 sm:mb-4 ml-1">
              <svg class="w-full h-6 sm:h-10" viewBox="0 0 200 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="sparkGreen" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#22c55e" stop-opacity="0.3"/>
                    <stop offset="100%" stop-color="#22c55e" stop-opacity="0"/>
                  </linearGradient>
                </defs>
                <path :d="sparklineArea2" fill="url(#sparkGreen)" />
                <path ref="sparkline2" :d="sparklinePath2" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :stroke-dasharray="sparklineLength2" :stroke-dashoffset="sparklineOffset2" />
              </svg>
            </div>

            <div class="flex items-end gap-1 text-green-600 dark:text-green-400 font-bold font-heading">
              <span class="text-sm sm:text-2xl">Rp</span>
              <span class="text-xl sm:text-4xl leading-none drop-shadow-md" ref="counter2">0</span>
            </div>
            <div class="flex items-center gap-2 mt-2 sm:mt-3">
              <div class="flex-1 h-1 rounded-full bg-green-500/10 overflow-hidden">
                <div class="h-full bg-linear-to-r from-green-500 to-emerald-400 rounded-full" style="width: 0%"></div>
              </div>
              <span class="text-gray-400 dark:text-gray-500 text-[10px] font-medium">Rp {{ adminStore.finance.pemasukanFull }}</span>
            </div>
          </div>
        </div>

        <!-- Pengeluaran -->
        <div 
          @mousemove="handleMouseMove($event, 2)"
          @mouseleave="resetTilt(2)"
          :style="{ transform: cardTilts[2] || 'scale3d(1, 1, 1)' }"
          class="finance-card group w-full bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-gray-300 dark:border-white/20 transition-all duration-300 transform-gpu relative overflow-hidden"
        >
          <div class="absolute inset-0 bg-linear-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="absolute -right-4 -top-4 w-20 h-20 bg-red-500/5 dark:bg-red-500/10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
            <TrendingDown class="w-8 h-8 text-red-500/20 dark:text-red-400/20" />
          </div>
          <div class="relative z-10">
            <div class="flex items-center gap-2.5 mb-1">
              <div class="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-red-500/10 flex items-center justify-center">
                <TrendingDown class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 dark:text-red-400" />
              </div>
              <h3 class="text-dark dark:text-white/90 font-semibold text-sm sm:text-base transition-colors duration-500">Pengeluaran</h3>
            </div>
            <p class="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs mb-2 sm:mb-4 ml-[38px] sm:ml-[46px] transition-colors duration-500">Periode Bulan Lalu</p>
            
            <!-- Sparkline Chart -->
            <div class="mb-2 sm:mb-4 ml-1">
              <svg class="w-full h-6 sm:h-10" viewBox="0 0 200 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="sparkRed" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#ef4444" stop-opacity="0.3"/>
                    <stop offset="100%" stop-color="#ef4444" stop-opacity="0"/>
                  </linearGradient>
                </defs>
                <path :d="sparklineArea3" fill="url(#sparkRed)" />
                <path ref="sparkline3" :d="sparklinePath3" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :stroke-dasharray="sparklineLength3" :stroke-dashoffset="sparklineOffset3" />
              </svg>
            </div>

            <div class="flex items-end gap-1 text-red-500 font-bold font-heading">
              <span class="text-sm sm:text-2xl">Rp</span>
              <span class="text-xl sm:text-4xl leading-none drop-shadow-md" ref="counter3">0</span>
            </div>
            <div class="flex items-center gap-2 mt-2 sm:mt-3">
              <div class="flex-1 h-1 rounded-full bg-red-500/10 overflow-hidden">
                <div class="h-full bg-linear-to-r from-red-500 to-orange-400 rounded-full" style="width: 0%"></div>
              </div>
              <span class="text-gray-400 dark:text-gray-500 text-[10px] font-medium">Rp {{ adminStore.finance.pengeluaranFull }}</span>
            </div>
          </div>
        </div>

        <!-- Saldo Akhir -->
        <div 
          @mousemove="handleMouseMove($event, 3)"
          @mouseleave="resetTilt(3)"
          :style="{ transform: cardTilts[3] || 'scale3d(1, 1, 1)' }"
          class="finance-card group w-full bg-linear-to-br from-white/90 to-cyan-50/50 dark:from-[#1a2035]/80 dark:to-[#152030]/80 backdrop-blur-xl rounded-xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-cyan-400 dark:border-cyan-500/50 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-300 transform-gpu relative overflow-hidden"
        >
          <div class="absolute -right-12 -top-12 w-40 h-40 bg-linear-to-br from-cyan-400/20 to-blue-500/20 dark:from-cyan-400/10 dark:to-blue-500/10 rounded-full blur-2xl z-0 transition-all duration-500 group-hover:scale-150"></div>
          <div class="absolute -left-8 -bottom-8 w-32 h-32 bg-linear-to-tr from-blue-400/10 to-transparent rounded-full blur-2xl z-0"></div>
          
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-1">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-linear-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                  <BadgeCheck class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 class="text-dark dark:text-white font-bold text-sm sm:text-base transition-colors duration-500">Saldo Akhir</h3>
              </div>
              <button class="px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800 rounded-full hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-white transition-all duration-300 shrink-0 shadow-md">
                Detail
              </button>
            </div>
            <p class="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs mb-2 sm:mb-4 ml-[38px] sm:ml-[46px] transition-colors duration-500">Periode Bulan Lalu</p>
            
            <!-- Sparkline Chart -->
            <div class="mb-2 sm:mb-4 ml-1">
              <svg class="w-full h-6 sm:h-10" viewBox="0 0 200 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="sparkCyan" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.3"/>
                    <stop offset="100%" stop-color="#06b6d4" stop-opacity="0"/>
                  </linearGradient>
                </defs>
                <path :d="sparklineArea4" fill="url(#sparkCyan)" />
                <path ref="sparkline4" :d="sparklinePath4" fill="none" stroke="#06b6d4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :stroke-dasharray="sparklineLength4" :stroke-dashoffset="sparklineOffset4" />
                <!-- Pulse dot at end -->
                <circle cx="200" :cy="sparklineEndY4" r="3" fill="#06b6d4" class="animate-pulse" />
              </svg>
            </div>
            
            <div class="flex items-end gap-1 font-bold font-heading">
              <span class="text-sm sm:text-2xl text-cyan-600 dark:text-cyan-400">Rp</span>
              <span class="text-xl sm:text-4xl leading-none text-transparent bg-clip-text bg-linear-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 drop-shadow-md" ref="counter4">0</span>
              <span class="text-sm sm:text-xl pb-0.5 text-cyan-600 dark:text-cyan-400">jt</span>
            </div>
            <div class="flex items-center gap-2 mt-2 sm:mt-3">
              <div class="flex-1 h-1 rounded-full bg-cyan-500/10 overflow-hidden">
                <div ref="progressBar4" class="h-full bg-linear-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300" style="width: 0%"></div>
              </div>
              <span class="text-gray-400 dark:text-gray-500 text-[10px] font-medium">Rp {{ adminStore.finance.saldoAkhirFull }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Stats Row -->
      <div ref="summaryRef" class="relative z-[60] mt-4 sm:mt-6 bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-gray-300 dark:border-white/20 shadow-md">
        <div class="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100 dark:divide-white/10">
          <div class="p-3 sm:p-5 lg:p-6 text-center group hover:bg-primary/5 dark:hover:bg-secondary/5 transition-colors duration-300">
            <div class="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
              <CalendarDays class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary dark:text-secondary" />
              <span class="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Periode</span>
            </div>
            <div class="relative inline-block mt-0.5" ref="dropdownRef">
              <!-- Dropdown Button -->
              <button 
                @click="isDropdownOpen = !isDropdownOpen"
                class="flex items-center justify-between gap-3 px-3.5 py-1.5 min-w-[130px] mx-auto rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-primary/30 dark:hover:border-secondary/30 transition-all duration-300 group/btn shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
              >
                <span class="font-bold text-xs sm:text-sm text-dark dark:text-white">{{ selectedMonth }} 2026</span>
                <ChevronDown class="w-4 h-4 text-gray-400 group-hover/btn:text-primary dark:group-hover/btn:text-secondary transition-transform duration-300" :class="{ 'rotate-180': isDropdownOpen }" />
              </button>

              <!-- Dropdown Menu -->
              <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <div v-if="isDropdownOpen" class="absolute left-1/2 -translate-x-1/2 mt-2 w-40 sm:w-48 bg-white dark:bg-[#1a1f2e] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-white/10 overflow-hidden z-50 py-1">
                  <button
                    v-for="month in months"
                    :key="month"
                    @click="selectMonth(month)"
                    class="w-full text-left px-4 py-2 text-xs sm:text-sm transition-colors duration-200"
                    :class="[
                      selectedMonth === month 
                        ? 'bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary font-bold' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                    ]"
                  >
                    {{ month }} 2026
                  </button>
                </div>
              </Transition>
            </div>
          </div>
          <div class="p-3 sm:p-5 lg:p-6 text-center group hover:bg-green-500/5 transition-colors duration-300">
            <div class="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
              <ArrowUpRight class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
              <span class="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Total Masuk</span>
            </div>
            <div class="flex items-end justify-center gap-1 text-green-600 dark:text-green-400 font-bold">
              <span class="text-xs sm:text-sm">Rp</span>
              <span class="text-xs sm:text-base leading-none" ref="sumIn">0</span>
            </div>
          </div>
          <div class="p-3 sm:p-5 lg:p-6 text-center group hover:bg-red-500/5 transition-colors duration-300">
            <div class="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
              <ArrowDownRight class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
              <span class="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Total Keluar</span>
            </div>
            <div class="flex items-end justify-center gap-1 text-red-500 font-bold">
              <span class="text-xs sm:text-sm">Rp</span>
              <span class="text-xs sm:text-base leading-none" ref="sumOut">0</span>
            </div>
          </div>
          <div class="p-3 sm:p-5 lg:p-6 text-center group hover:bg-cyan-500/5 transition-colors duration-300">
            <div class="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
              <Activity class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500" />
              <span class="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Saldo Akhir</span>
            </div>
            <div class="flex items-end justify-center gap-1 text-cyan-600 dark:text-cyan-400 font-bold">
              <span class="text-xs sm:text-sm">Rp</span>
              <span class="text-xs sm:text-base leading-none" ref="sumDiff">0</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Decorative Divider -->
      <div class="flex items-center gap-4 mt-8" ref="dividerRef">
        <div class="flex-1 h-px bg-linear-to-r from-transparent via-primary/20 dark:via-secondary/20 to-transparent"></div>
        <div class="flex items-center gap-2 text-dark/30 dark:text-white/20">
          <ShieldCheck class="w-5 h-5" />
          <span class="text-sm sm:text-base font-bold tracking-widest uppercase text-center text-primary dark:text-secondary">Laporan Keuangan Kegiatan</span>
          <ShieldCheck class="w-5 h-5" />
        </div>
        <div class="flex-1 h-px bg-linear-to-r from-transparent via-primary/20 dark:via-secondary/20 to-transparent"></div>
      </div>

      <!-- Laporan Khusus / Acara -->
      <div class="mt-4 sm:mt-5 max-w-5xl mx-auto" ref="specialReportsRef">
        <!-- Judul lama (Laporan Keuangan Khusus) dihilangkan sesuai request dosen -->
        <div class="text-center mb-6 hidden">
          <h3 class="text-xl sm:text-2xl font-bold font-heading text-dark dark:text-white">Laporan Keuangan Khusus</h3>
          <p class="text-gray-500 dark:text-gray-400 text-sm mt-2">Transparansi pendanaan untuk berbagai acara dan kepanitiaan masjid.</p>
        </div>
        <div class="flex justify-between items-center mb-4 px-2 sm:px-1 relative z-50">
          <h4 class="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400">Rincian Laporan Kegiatan</h4>
          <div class="flex items-center gap-2 sm:gap-3">
            <span class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium hidden sm:inline-block">Pilih Tahun:</span>
          <div class="relative inline-block z-50" ref="yearDropdownRef">
            <button 
              @click="isYearDropdownOpen = !isYearDropdownOpen"
              class="flex items-center justify-between gap-2 px-3 py-1.5 min-w-[90px] rounded-lg border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 group/btn shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
            >
              <span class="font-bold text-xs sm:text-sm text-dark dark:text-white">{{ selectedYear }}</span>
              <ChevronDown class="w-3.5 h-3.5 text-gray-400 group-hover/btn:text-primary transition-transform duration-300" :class="{ 'rotate-180': isYearDropdownOpen }" />
            </button>
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div v-show="isYearDropdownOpen" class="absolute right-0 mt-2 w-full min-w-[90px] bg-white dark:bg-[#1a1f2e] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl z-[60] overflow-hidden">
                <div class="max-h-48 overflow-y-auto custom-scrollbar py-1">
                  <button v-for="year in ['2026', '2025', '2024']" :key="year" @click="selectYear(year)" class="w-full text-left px-4 py-2 text-xs sm:text-sm transition-colors hover:bg-gray-50 dark:hover:bg-white/5" :class="selectedYear === year ? 'text-primary dark:text-secondary font-bold bg-primary/5 dark:bg-secondary/5' : 'text-gray-600 dark:text-gray-400 font-medium'">
                    {{ year }}
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
        </div>
        
        <div class="flex flex-col gap-3 sm:gap-3.5">
          <div 
            v-for="(report, index) in filteredSpecialReports" 
            :key="report.id"
            @click="openSpecialReport(report)"
            class="group cursor-pointer bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 hover:border-primary/50 dark:hover:border-secondary/50 rounded-xl sm:rounded-2xl p-3 sm:px-4 sm:py-2.5 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
          >
            <!-- Title & Icon -->
            <div class="flex items-center gap-3 sm:gap-4 w-full sm:w-[35%] lg:w-[30%] shrink-0">
              <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 dark:bg-secondary/10 flex items-center justify-center text-primary dark:text-secondary group-hover:scale-110 transition-transform duration-300 shrink-0">
                <component :is="report.icon" class="w-4 h-4 sm:w-4 sm:h-4" />
              </div>
              <div class="text-left flex-1">
                <h4 class="font-bold text-xs sm:text-sm text-dark dark:text-white group-hover:text-primary dark:group-hover:text-secondary transition-colors leading-tight">{{ report.title }}</h4>
                <p class="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 uppercase line-clamp-1">{{ report.date }}</p>
              </div>
            </div>

            <!-- Stats (Responsive) -->
            <div class="flex-1 w-full grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-2 sm:gap-4 text-xs items-center border-t sm:border-t-0 border-gray-300 dark:border-white/5 pt-3 sm:pt-0">
              <div class="border-r border-gray-300 dark:border-white/5 pr-2 sm:pr-4 sm:border-l sm:border-gray-300 sm:dark:border-white/10 sm:pl-4">
                <span class="block text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Total Masuk</span>
                <span class="font-bold text-green-600 dark:text-green-400 text-[11px] sm:text-xs">Rp {{ formatRupiah(report.totalPemasukan) }}</span>
              </div>
              <div class="pl-2 sm:pr-4 sm:border-r sm:border-gray-300 sm:dark:border-white/5">
                <span class="block text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Total Keluar</span>
                <span class="font-bold text-red-500 text-[11px] sm:text-xs">Rp {{ formatRupiah(report.totalPengeluaran) }}</span>
              </div>
              <div class="col-span-2 sm:col-span-1 mt-2 sm:mt-0 pt-2 pb-2 px-3 sm:p-0 border border-gray-300 dark:border-white/5 sm:border-0 bg-gray-50 dark:bg-transparent rounded-lg sm:rounded-none flex sm:block justify-between items-center sm:items-start sm:pl-4">
                <span class="block text-[10px] text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wider sm:mb-0.5">Saldo Akhir</span>
                <span class="font-bold text-cyan-600 dark:text-cyan-400 text-sm">Rp {{ formatRupiah(report.sisaSaldo) }}</span>
              </div>
            </div>

            <!-- Action -->
            <div class="hidden sm:flex items-center justify-end shrink-0 pl-2">
              <div class="px-3 py-1 rounded-full border border-gray-300 dark:border-white/10 bg-white dark:bg-transparent group-hover:border-primary/30 dark:group-hover:border-secondary/30 group-hover:bg-primary/5 dark:group-hover:bg-secondary/5 transition-all flex items-center gap-1.5">
                <span class="text-[9px] font-bold text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-secondary uppercase tracking-wider transition-colors">Detail</span>
                <ArrowUpRight class="w-3 h-3 text-gray-400 group-hover:text-primary dark:group-hover:text-secondary transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Special Report Modal -->
    <SpecialReportModal 
      :show="isSpecialReportModalOpen" 
      :report="selectedSpecialReport" 
      @close="closeSpecialReport" 
    />
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Wallet, TrendingUp, TrendingDown, BadgeCheck, ShieldCheck, CalendarDays, ArrowUpRight, ArrowDownRight, Activity, BookOpen, HeartHandshake, Gift, GraduationCap, LayoutList, Star, ChevronDown } from 'lucide-vue-next'
import IslamicPattern from '@/components/ui/IslamicPattern.vue'
import SpecialReportModal from '@/components/ui/SpecialReportModal.vue'
import { useAdminStore } from '@/stores/admin'

gsap.registerPlugin(ScrollTrigger)

const adminStore = useAdminStore()
const headerRef = ref(null)
const cardsRef = ref(null)
const dividerRef = ref(null)
const summaryRef = ref(null)
const specialReportsRef = ref(null)

const isSpecialReportModalOpen = ref(false)
const selectedSpecialReport = ref(null)

const openSpecialReport = (report) => {
  selectedSpecialReport.value = report
  isSpecialReportModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeSpecialReport = () => {
  isSpecialReportModalOpen.value = false
  setTimeout(() => {
    selectedSpecialReport.value = null
  }, 300)
  document.body.style.overflow = ''
}

const formatRupiah = (angka) => {
  if (angka === undefined || angka === null) return '0'
  return new Intl.NumberFormat('id-ID').format(angka)
}

// Tambahkan ref untuk filter bulan
const selectedMonth = ref('Mei');
const isDropdownOpen = ref(false);
const dropdownRef = ref(null);
const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

const selectMonth = (month) => {
  selectedMonth.value = month;
  isDropdownOpen.value = false;
};

// Handle click outside to close dropdown
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
      isDropdownOpen.value = false;
    }
    if (yearDropdownRef.value && !yearDropdownRef.value.contains(e.target)) {
      isYearDropdownOpen.value = false;
    }
  });
});

// Dropdown state untuk tahun
const isYearDropdownOpen = ref(false);
const yearDropdownRef = ref(null);
const selectedYear = ref('2026');

const selectYear = (year) => {
  selectedYear.value = year;
  isYearDropdownOpen.value = false;
};

// Data Mockup Laporan Khusus
const specialReports = [
  {
    id: 'isra-miraj',
    title: 'PHBI Isra’ Mi’raj',
    year: '2026',
    icon: Star,
    subtitle: 'PERUM ARJAMUKTI KENCANA RAYA',
    date: '18 Januari 2026M / 1447H',
    pemasukan: [
      { no: 1, tanggal: '10 Jan 2026', uraian: 'Total Open Donasi Warga Perum Arjamukti', jumlah: 6682000 }
    ],
    pengeluaran: [
      { no: 1, tanggal: '12 Jan 2026', uraian: '170 Box Nasi Kuning Dewasa', jumlah: 1360000 },
      { no: 2, tanggal: '12 Jan 2026', uraian: '150 Box Nasi Kuning Anak', jumlah: 900000 },
      { no: 3, tanggal: '12 Jan 2026', uraian: '25 Porsi Paket Nasi Prasmanan', jumlah: 500000 },
      { no: 4, tanggal: '15 Jan 2026', uraian: 'Mubaligh / Penceramah', jumlah: 700000 },
      { no: 5, tanggal: '15 Jan 2026', uraian: 'Qori Al-Quran', jumlah: 100000 },
      { no: 6, tanggal: '16 Jan 2026', uraian: 'Bingkisan Mubalig', jumlah: 110000 },
      { no: 7, tanggal: '16 Jan 2026', uraian: '2 Runtuy Kopi dan Rokok', jumlah: 97000 },
      { no: 8, tanggal: '17 Jan 2026', uraian: 'Air Mineral 4 Dus @18.000', jumlah: 72000 },
      { no: 9, tanggal: '17 Jan 2026', uraian: 'Air Mineral 8 Dus @17.000', jumlah: 136000 },
      { no: 10, tanggal: '17 Jan 2026', uraian: '1 Banner Frontlite 280 (3x2M) @25.000', jumlah: 150000 },
      { no: 11, tanggal: '18 Jan 2026', uraian: 'TIM Petugas Kebersihan', jumlah: 100000 },
      { no: 12, tanggal: '18 Jan 2026', uraian: 'Akomodasi', jumlah: 20000 }
    ],
    totalPemasukan: 6682000,
    totalPengeluaran: 4245000,
    sisaSaldo: 2437000,
    terbilang: 'Dua Juta Empat Ratus Tiga Puluh Tujuh Ribu Rupiah',
    keterangan: '',
    ketua: 'Irvan Ruchiat',
    bendahara: 'Randi Rizal',
    ttdKiriTitle: 'Ketua Panitia'
  },
  {
    id: 'maulid-nabi',
    title: 'PHBI Maulid Nabi',
    year: '2026',
    icon: BookOpen,
    subtitle: 'PERUM ARJAMUKTI KENCANA RAYA',
    date: '12 Rabiul Awal 1447H',
    pemasukan: [
      { no: 1, tanggal: '01 Rabiul Awal', uraian: 'Infaq Jamaah Pengajian Rutin', jumlah: 4500000 },
      { no: 2, tanggal: '05 Rabiul Awal', uraian: 'Donasi Hamba Allah', jumlah: 1500000 }
    ],
    pengeluaran: [
      { no: 1, tanggal: '10 Rabiul Awal', uraian: 'Honor Penceramah', jumlah: 1000000 },
      { no: 2, tanggal: '11 Rabiul Awal', uraian: 'Konsumsi (200 Box @15.000)', jumlah: 3000000 },
      { no: 3, tanggal: '11 Rabiul Awal', uraian: 'Dekorasi & Tenda', jumlah: 1200000 },
      { no: 4, tanggal: '12 Rabiul Awal', uraian: 'Kebersihan', jumlah: 200000 }
    ],
    totalPemasukan: 6000000,
    totalPengeluaran: 5400000,
    sisaSaldo: 600000,
    terbilang: 'Enam Ratus Ribu Rupiah',
    keterangan: 'Sisa dana disetorkan ke Kas Utama DKM',
    ketua: 'Ahmad Syafiq',
    bendahara: 'Randi Rizal',
    ttdKiriTitle: 'Ketua Panitia'
  },
  {
    id: 'kegiatan-zakat',
    title: 'Kegiatan Zakat',
    year: '2026',
    icon: HeartHandshake,
    subtitle: 'PANITIA ZAKAT 1447 H / 2026 M PERUM ARJAMUKTI KENCANA RAYA',
    date: 'Sabtu, 21 Maret 2026',
    pemasukan: [
      { no: 1, tanggal: '01 Mar 2026', uraian: 'Zakat Fitrah 493 Jiwa', jumlah: 12654000 },
      { no: 2, tanggal: '15 Mar 2026', uraian: 'Total Infaq / Sedekah', jumlah: 1498000 }
    ],
    pengeluaran: [
      { no: 1, tanggal: '18 Mar 2026', uraian: 'Fotocopy Formulir Zakat (Diambil dari pos sedekah)', jumlah: 38500 },
      { no: 2, tanggal: '18 Mar 2026', uraian: '2 Pack Paperline (Diambil dari pos sedekah)', jumlah: 28000 },
      { no: 3, tanggal: '19 Mar 2026', uraian: '3 Pack K.30 Piala (Diambil dari pos sedekah)', jumlah: 69000 },
      { no: 4, tanggal: '20 Mar 2026', uraian: 'Bensin Akomodasi (Diambil dari pos sedekah)', jumlah: 10000 },
      { no: 5, tanggal: '20 Mar 2026', uraian: 'Setoran ke Desa (Baznas)', jumlah: 250000 },
      { no: 6, tanggal: '21 Mar 2026', uraian: '92 Amplop x @100.000 (Mustahik Zakat Dalam Perum)', jumlah: 9200000 },
      { no: 7, tanggal: '21 Mar 2026', uraian: '33 Amplop x @100.000 (Mustahik Zakat Luar Perum)', jumlah: 3300000 },
      { no: 8, tanggal: '21 Mar 2026', uraian: '6 Amil Zakat Inti (Diambil dari pos sedekah)', jumlah: 800000 }
    ],
    totalPemasukan: 14152000,
    totalPengeluaran: 13695500,
    sisaSaldo: 456500,
    terbilang: 'Empat Ratus Lima Puluh Enam Ribu Lima Ratus Rupiah',
    keterangan: 'Sisa saldo disetorkan ke KAS DKMJ KASSITI',
    ketua: 'H. Redi Sasriandi',
    bendahara: 'Randi Rizal',
    ttdKiriTitle: 'Ketua Panitia'
  },
  {
    id: 'kegiatan-qurban',
    title: 'Kegiatan Qurban',
    year: '2026',
    icon: Gift,
    subtitle: 'PANITIA QURBAN DKMJ KASSITI 1447H / 2026M',
    date: 'Perum Arjamukti Kencana Raya',
    pemasukan: [
      { no: 1, uraian: 'Kas awal dari DKM Kassiti', jumlah: 1000000 },
      { no: 2, uraian: 'Titipan 21 Peserta Qurban Hewan Sapi', jumlah: 81900000 },
      { no: 3, uraian: 'Infak OPS 24 Peserta Qurban Hewan Sapi & Domba', jumlah: 2550000 },
      { no: 4, uraian: 'Penjualan Kulit Hewan Qurban Sapi & Domba', jumlah: 437000 }
    ],
    pengeluaran: [
      { no: 1, uraian: 'DP Pembelian 3 Ekor Hewan Qurban Sapi', jumlah: 6000000 },
      { no: 2, uraian: 'Biaya Mempertajam Perkakas Pisau & Kapak', jumlah: 150000 },
      { no: 3, uraian: 'ATK, Print dan Foto Copy', jumlah: 50000 },
      { no: 4, uraian: 'Pelunasan Pembelian 3 Ekor Hewan Qurban Sapi', jumlah: 76500000 },
      { no: 5, uraian: '5 Karung BB 6 @12.000', jumlah: 60000 },
      { no: 6, uraian: '6 Pack Keresek Apel 26 Hitam', jumlah: 90000 },
      { no: 7, uraian: '5 Leunjer Bambu Haur', jumlah: 75000 },
      { no: 8, uraian: '3 Pack Cup Gelas Plastik Zetta', jumlah: 21000 },
      { no: 9, uraian: 'Gas Elpiji 3 Kg', jumlah: 21000 },
      { no: 10, uraian: 'Isi Ulang Galon Aqua', jumlah: 23000 },
      { no: 11, uraian: '1/2 ons Karet Hijau', jumlah: 3000 },
      { no: 12, uraian: 'Tenda 120 Meter', jumlah: 1000000 },
      { no: 13, uraian: 'Konsumsi Makan & Snack Hari Raya', jumlah: 693700 },
      { no: 14, uraian: 'Mata Gerinda WD 5 Inch', jumlah: 30000 },
      { no: 15, uraian: '2 Petugas Tim Kebersihan', jumlah: 150000 },
      { no: 16, uraian: 'Pengembalian Kas awal ke DKM Kassiti', jumlah: 1000000 }
    ],
    totalPemasukan: 85887000,
    totalPengeluaran: 85866700,
    sisaSaldo: 20300,
    terbilang: 'Dua Puluh Ribu Tiga Ratus Rupiah',
    keterangan: 'Sisa saldo KAS Kegiatan Qurban di Infaqkan ke Masjid Kassiti.',
    ketua: 'H. Redi Sasriandi',
    bendahara: 'Randi Rizal',
    ttdKiriTitle: 'Mengetahui, Ketua Panitia'
  },
  {
    id: 'imtihan-akhirussanah',
    title: 'Imtihan Akhirussanah',
    year: '2025',
    icon: GraduationCap,
    subtitle: 'TPQ / MADRASAH DKMJ KASSITI',
    date: 'Tahun Ajaran 2025/2026',
    pemasukan: [
      { no: 1, uraian: 'Iuran Wali Santri', jumlah: 3500000 },
      { no: 2, uraian: 'Donasi Simpatisan', jumlah: 1200000 },
      { no: 3, uraian: 'Subsidi Kas DKM', jumlah: 500000 }
    ],
    pengeluaran: [
      { no: 1, uraian: 'Sewa Tenda & Panggung', jumlah: 1500000 },
      { no: 2, uraian: 'Piala dan Piagam Penghargaan', jumlah: 800000 },
      { no: 3, uraian: 'Konsumsi Santri dan Undangan', jumlah: 1800000 },
      { no: 4, uraian: 'Dokumentasi', jumlah: 300000 },
      { no: 5, uraian: 'Hadiah Lomba', jumlah: 500000 }
    ],
    totalPemasukan: 5200000,
    totalPengeluaran: 4900000,
    sisaSaldo: 300000,
    terbilang: 'Tiga Ratus Ribu Rupiah',
    keterangan: 'Disimpan untuk kas TPQ',
    ketua: 'Ust. Hasan Basri',
    bendahara: 'Randi Rizal',
    ttdKiriTitle: 'Kepala TPQ'
  }
];

const filteredSpecialReports = computed(() => {
  return specialReports.filter(report => report.year === selectedYear.value);
});

const counter1 = ref(null)
const counter2 = ref(null)
const counter3 = ref(null)
const counter4 = ref(null)
const progressBar1 = ref(null)
const progressBar4 = ref(null)

const sumIn = ref(null)
const sumOut = ref(null)
const sumDiff = ref(null)

// Sparkline refs
const sparkline1 = ref(null)
const sparkline2 = ref(null)
const sparkline3 = ref(null)
const sparkline4 = ref(null)

// Sparkline draw offsets (start fully hidden, animate to 0)
const sparklineOffset1 = ref(500)
const sparklineOffset2 = ref(500)
const sparklineOffset3 = ref(500)
const sparklineOffset4 = ref(500)
const sparklineLength1 = ref(500)
const sparklineLength2 = ref(500)
const sparklineLength3 = ref(500)
const sparklineLength4 = ref(500)

// Sparkline data — simulated weekly saldo trend
const saldoData = [78, 80, 79, 82, 81, 83, 84.74]
const incomeData = [5, 8, 3, 6, 4, 7, 0]
const expenseData = [3, 5, 2, 4, 6, 3, 0]
const balanceData = [78, 80, 79, 82, 81, 83, 84.74]

function generateSparklinePath(data) {
  const maxVal = Math.max(...data)
  const minVal = Math.min(...data)
  const range = maxVal - minVal || 1
  const w = 200
  const h = 40
  const padding = 4
  const stepX = w / (data.length - 1)

  const points = data.map((val, i) => ({
    x: i * stepX,
    y: padding + (h - 2 * padding) * (1 - (val - minVal) / range)
  }))

  // Build smooth curve using cubic bezier
  let path = `M ${points[0].x},${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const cpx1 = prev.x + stepX * 0.4
    const cpx2 = curr.x - stepX * 0.4
    path += ` C ${cpx1},${prev.y} ${cpx2},${curr.y} ${curr.x},${curr.y}`
  }
  return { path, points, lastY: points[points.length - 1].y }
}

function generateSparklineArea(data) {
  const { path } = generateSparklinePath(data)
  return path + ` L 200,40 L 0,40 Z`
}

const spark1 = computed(() => generateSparklinePath(saldoData))
const spark2 = computed(() => generateSparklinePath(incomeData))
const spark3 = computed(() => generateSparklinePath(expenseData))
const spark4 = computed(() => generateSparklinePath(balanceData))

const sparklinePath1 = computed(() => spark1.value.path)
const sparklinePath2 = computed(() => spark2.value.path)
const sparklinePath3 = computed(() => spark3.value.path)
const sparklinePath4 = computed(() => spark4.value.path)

const sparklineArea1 = computed(() => generateSparklineArea(saldoData))
const sparklineArea2 = computed(() => generateSparklineArea(incomeData))
const sparklineArea3 = computed(() => generateSparklineArea(expenseData))
const sparklineArea4 = computed(() => generateSparklineArea(balanceData))

const sparklineEndY4 = computed(() => spark4.value.lastY)

// Floating particles
const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 3 + Math.random() * 5,
  duration: 4 + Math.random() * 4,
  delay: Math.random() * 3,
  opacity: 0.15 + Math.random() * 0.25,
  colorClass: i % 3 === 0 ? 'bg-primary/30 dark:bg-secondary/30' : i % 3 === 1 ? 'bg-cyan-400/20' : 'bg-green-400/20'
}))

// 3D Tilt Effect
const cardTilts = ref({})

const handleMouseMove = (e, index) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const tiltX = ((y - centerY) / centerY) * -8
  const tiltY = ((x - centerX) / centerX) * 8
  cardTilts.value[index] = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`
}

const resetTilt = (index) => {
  cardTilts.value[index] = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
}

onMounted(() => {
  // Header animation
  gsap.fromTo(headerRef.value.children, { opacity: 0, y: 40 }, {
    opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', stagger: 0.2,
    scrollTrigger: { trigger: '#keuangan', start: 'top 80%', once: true },
  })
  
  // Cards smooth entrance
  gsap.fromTo(cardsRef.value.children, { opacity: 0, y: 40, scale: 0.98 }, {
    opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out', stagger: 0.1,
    scrollTrigger: { trigger: '#keuangan', start: 'top 75%', once: true },
  })

  // Special Reports entrance
  if (specialReportsRef.value) {
    gsap.fromTo(specialReportsRef.value.children, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', stagger: 0.15,
      scrollTrigger: { trigger: specialReportsRef.value, start: 'top 85%', once: true },
    })
  }

  // Sparkline draw animations
  const stConfig = { trigger: '#keuangan', start: 'top 75%', once: true }
  
  // Calculate actual path lengths after mount
  setTimeout(() => {
    if (sparkline1.value) {
      const len = sparkline1.value.getTotalLength()
      sparklineLength1.value = len
      sparklineOffset1.value = len
      gsap.to(sparklineOffset1, { value: 0, duration: 1.5, ease: 'power3.out', delay: 0.2, scrollTrigger: stConfig })
    }
    if (sparkline2.value) {
      const len = sparkline2.value.getTotalLength()
      sparklineLength2.value = len
      sparklineOffset2.value = len
      gsap.to(sparklineOffset2, { value: 0, duration: 1.5, ease: 'power3.out', delay: 0.3, scrollTrigger: stConfig })
    }
    if (sparkline3.value) {
      const len = sparkline3.value.getTotalLength()
      sparklineLength3.value = len
      sparklineOffset3.value = len
      gsap.to(sparklineOffset3, { value: 0, duration: 1.5, ease: 'power3.out', delay: 0.4, scrollTrigger: stConfig })
    }
    if (sparkline4.value) {
      const len = sparkline4.value.getTotalLength()
      sparklineLength4.value = len
      sparklineOffset4.value = len
      gsap.to(sparklineOffset4, { value: 0, duration: 1.5, ease: 'power3.out', delay: 0.5, scrollTrigger: stConfig })
    }
  }, 100)

  // Progress bars
  if (progressBar1.value) {
    gsap.to(progressBar1.value, { width: '100%', duration: 1.2, ease: 'power3.out', delay: 0.3, scrollTrigger: stConfig })
  }
  if (progressBar4.value) {
    gsap.to(progressBar4.value, { width: '100%', duration: 1.2, ease: 'power3.out', delay: 0.6, scrollTrigger: stConfig })
  }

  // Summary row
  if (summaryRef.value) {
    gsap.fromTo(summaryRef.value, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: 0.4,
      scrollTrigger: { trigger: summaryRef.value, start: 'top 90%', once: true }
    })
  }

  // Divider
  if (dividerRef.value) {
    gsap.fromTo(dividerRef.value, { opacity: 0, scaleX: 0 }, {
      opacity: 1, scaleX: 1, duration: 1.0, ease: 'power3.out', delay: 0.5,
      scrollTrigger: { trigger: dividerRef.value, start: 'top 90%', once: true }
    })
  }

  // Counter animations
  const animateCounter = (element, targetValue, duration = 1.5, isDecimal = false) => {
    gsap.to(element, {
      innerHTML: targetValue,
      duration: duration,
      ease: 'power3.out',
      snap: { innerHTML: isDecimal ? 0.01 : 1 },
      onUpdate: function() {
        if (isDecimal) {
          element.innerHTML = Number(this.targets()[0].innerHTML).toFixed(2).replace('.', ',')
        } else {
          element.innerHTML = Math.round(this.targets()[0].innerHTML).toLocaleString('id-ID')
        }
      },
      scrollTrigger: stConfig
    })
  }

  const parseNumber = (val) => parseFloat(val.toString().replace(/\./g, '').replace(',', '.')) || 0

  if (counter1.value) animateCounter(counter1.value, parseNumber(adminStore.finance.saldoAwal), 1.5, true)
  if (counter2.value) animateCounter(counter2.value, parseNumber(adminStore.finance.pemasukan), 1.2, false)
  if (counter3.value) animateCounter(counter3.value, parseNumber(adminStore.finance.pengeluaran), 1.2, false)
  if (counter4.value) animateCounter(counter4.value, parseNumber(adminStore.finance.saldoAkhir), 1.5, true)
  
  // Summary counters
  if (sumIn.value) animateCounter(sumIn.value, parseNumber(adminStore.finance.pemasukanFull), 1.2, false)
  if (sumOut.value) animateCounter(sumOut.value, parseNumber(adminStore.finance.pengeluaranFull), 1.2, false)
  if (sumDiff.value) animateCounter(sumDiff.value, parseNumber(adminStore.finance.selisihBersih), 1.2, false)
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
.text-gradient-gold {
  background: linear-gradient(135deg, #E6C875 0%, #C5A55A 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
:deep(.dark) .text-gradient-gold,
.dark .text-gradient-gold {
  background: linear-gradient(135deg, #F9DF9F 0%, #D4B56A 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes float-particle {
  0% { transform: translateY(0px) translateX(0px); }
  100% { transform: translateY(-20px) translateX(10px); }
}
</style>
