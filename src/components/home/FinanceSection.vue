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
            <p class="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs mb-2 sm:mb-4 ml-[38px] sm:ml-[46px] transition-colors duration-500">{{ getCardSubtitle }}</p>
            
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
              <span class="text-gray-400 dark:text-gray-500 text-[10px] font-medium">Rp {{ currentMonthData.saldoAwalFull }}</span>
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
            <p class="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs mb-2 sm:mb-4 ml-[38px] sm:ml-[46px] transition-colors duration-500">{{ getCardSubtitle }}</p>
            
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
              <span class="text-sm sm:text-xl pb-0.5">jt</span>
            </div>
            <div class="flex items-center gap-2 mt-2 sm:mt-3">
              <div class="flex-1 h-1 rounded-full bg-green-500/10 overflow-hidden">
                <div class="h-full bg-linear-to-r from-green-500 to-emerald-400 rounded-full" style="width: 0%"></div>
              </div>
              <span class="text-gray-400 dark:text-gray-500 text-[10px] font-medium">Rp {{ currentMonthData.pemasukanFull }}</span>
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
            <p class="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs mb-2 sm:mb-4 ml-[38px] sm:ml-[46px] transition-colors duration-500">{{ getCardSubtitle }}</p>
            
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
              <span class="text-sm sm:text-xl pb-0.5">jt</span>
            </div>
            <div class="flex items-center gap-2 mt-2 sm:mt-3">
              <div class="flex-1 h-1 rounded-full bg-red-500/10 overflow-hidden">
                <div class="h-full bg-linear-to-r from-red-500 to-orange-400 rounded-full" style="width: 0%"></div>
              </div>
              <span class="text-gray-400 dark:text-gray-500 text-[10px] font-medium">Rp {{ currentMonthData.pengeluaranFull }}</span>
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
            </div>
            <p class="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs mb-2 sm:mb-4 ml-[38px] sm:ml-[46px] transition-colors duration-500">{{ getCardSubtitle }}</p>
            
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
              <span class="text-gray-400 dark:text-gray-500 text-[10px] font-medium">Rp {{ currentMonthData.saldoAkhirFull }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Stats Row -->
      <div ref="summaryRef" class="relative z-[60] mt-3 sm:mt-4 bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-[10px] sm:rounded-2xl border border-gray-300 dark:border-white/20 shadow-md">
        <div class="grid grid-cols-2 lg:grid-cols-4">
          <!-- Cell 1: Periode -->
          <div class="p-2.5 sm:p-3 lg:p-4 group hover:bg-primary/5 dark:hover:bg-secondary/5 transition-colors duration-300 flex flex-col justify-center items-center h-full min-h-[85px] sm:min-h-[110px] border-r border-b lg:border-b-0 border-gray-300 dark:border-white/20">
            <div class="flex items-center justify-center gap-1.5 mb-1">
              <CalendarDays class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary dark:text-secondary" />
              <span class="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Periode</span>
            </div>
            <div class="relative flex items-center justify-center gap-1.5 mt-0.5">
              <!-- Dropdown Bulan -->
              <div class="relative inline-block" ref="dropdownRef">
                <button 
                  @click="isDropdownOpen = !isDropdownOpen"
                  class="flex items-center justify-between gap-1 px-2 py-1 min-w-[70px] sm:min-w-[80px] rounded-md border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-primary/30 dark:hover:border-secondary/30 transition-all duration-300 group/btn shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
                >
                  <span class="font-bold text-[11px] sm:text-xs text-dark dark:text-white">{{ selectedMonth }}</span>
                  <ChevronDown class="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 group-hover/btn:text-primary dark:group-hover/btn:text-secondary transition-transform duration-300" :class="{ 'rotate-180': isDropdownOpen }" />
                </button>

                <Transition
                  enter-active-class="transition duration-200 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <div v-if="isDropdownOpen" class="absolute left-1/2 -translate-x-1/2 mt-1.5 w-28 bg-white dark:bg-[#1a1f2e] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-white/10 overflow-hidden z-[60] py-1">
                    <div class="max-h-40 overflow-y-auto custom-scrollbar">
                      <button
                        v-for="month in months"
                        :key="month"
                        @click="selectMonth(month)"
                        class="w-full text-left px-3 py-1.5 text-xs transition-colors duration-200"
                        :class="[
                          selectedMonth === month 
                            ? 'bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary font-bold' 
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                        ]"
                      >
                        {{ month }}
                      </button>
                    </div>
                  </div>
                </Transition>
              </div>

              <!-- Dropdown Tahun -->
              <div class="relative inline-block" ref="summaryYearDropdownRef">
                <button 
                  @click="isSummaryYearDropdownOpen = !isSummaryYearDropdownOpen"
                  class="flex items-center justify-between gap-1 px-2 py-1 min-w-[65px] sm:min-w-[70px] rounded-md border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-primary/30 dark:hover:border-secondary/30 transition-all duration-300 group/btn shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
                >
                  <span class="font-bold text-[11px] sm:text-xs text-dark dark:text-white">{{ summarySelectedYear }}</span>
                  <ChevronDown class="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 group-hover/btn:text-primary dark:group-hover/btn:text-secondary transition-transform duration-300" :class="{ 'rotate-180': isSummaryYearDropdownOpen }" />
                </button>

                <Transition
                  enter-active-class="transition duration-200 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <div v-if="isSummaryYearDropdownOpen" class="absolute left-1/2 -translate-x-1/2 mt-1.5 w-24 bg-white dark:bg-[#1a1f2e] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-white/10 overflow-hidden z-[60] py-1">
                    <button
                      v-for="year in summaryYears"
                      :key="year"
                      @click="selectSummaryYear(year)"
                      class="w-full text-left px-3 py-1.5 text-xs transition-colors duration-200"
                      :class="[
                        summarySelectedYear === year 
                          ? 'bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary font-bold' 
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                      ]"
                    >
                      {{ year }}
                    </button>
                  </div>
                </Transition>
              </div>
            </div>

            <!-- Tombol Detail Ringkasan Laporan -->
            <div class="mt-2 flex justify-center">
              <button 
                @click="openMonthlyReport"
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-primary/30 dark:border-secondary/30 bg-primary/5 dark:bg-secondary/5 hover:bg-primary/10 dark:hover:bg-secondary/10 hover:border-primary dark:hover:border-secondary transition-all duration-300 cursor-pointer shadow-xs text-[10px] sm:text-[11px] font-bold text-primary dark:text-secondary uppercase tracking-wider"
              >
                <span>Detail Laporan</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary dark:text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Cell 2: Total Masuk -->
          <div class="p-2.5 sm:p-3 lg:p-4 group hover:bg-green-500/5 transition-colors duration-300 flex flex-col justify-center items-center h-full min-h-[85px] sm:min-h-[110px] border-b lg:border-b-0 lg:border-r border-gray-300 dark:border-white/20">
            <div class="flex items-center justify-center gap-1.5 mb-1">
              <ArrowUpRight class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
              <span class="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Total Masuk</span>
            </div>
            <div class="flex items-end justify-center gap-1 text-green-600 dark:text-green-400 font-bold">
              <span class="text-xs sm:text-sm">Rp</span>
              <span class="text-xs sm:text-base leading-none" ref="sumIn">0</span>
            </div>
          </div>

          <!-- Cell 3: Total Keluar -->
          <div class="p-2.5 sm:p-3 lg:p-4 group hover:bg-red-500/5 transition-colors duration-300 flex flex-col justify-center items-center h-full min-h-[85px] sm:min-h-[110px] border-r border-gray-300 dark:border-white/20">
            <div class="flex items-center justify-center gap-1.5 mb-1">
              <ArrowDownRight class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
              <span class="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Total Keluar</span>
            </div>
            <div class="flex items-end justify-center gap-1 text-red-500 font-bold">
              <span class="text-xs sm:text-sm">Rp</span>
              <span class="text-xs sm:text-base leading-none" ref="sumOut">0</span>
            </div>
          </div>

          <!-- Cell 4: Saldo Akhir -->
          <div class="p-2.5 sm:p-3 lg:p-4 group hover:bg-cyan-500/5 transition-colors duration-300 flex flex-col justify-center items-center h-full min-h-[85px] sm:min-h-[110px]">
            <div class="flex items-center justify-center gap-1.5 mb-1">
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
          <div class="flex items-center gap-2 sm:gap-3" v-if="isLatestMode">
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
                  <button v-for="year in summaryYears" :key="year" @click="selectYear(year)" class="w-full text-left px-4 py-2 text-xs sm:text-sm transition-colors hover:bg-gray-50 dark:hover:bg-white/5" :class="selectedYear === year ? 'text-primary dark:text-secondary font-bold bg-primary/5 dark:bg-secondary/5' : 'text-gray-600 dark:text-gray-400 font-medium'">
                    {{ year }}
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
        </div>
        
        <div class="flex flex-col gap-3 sm:gap-3.5">
          <!-- Empty State -->
          <div v-if="filteredSpecialReports.length === 0" class="flex flex-col items-center justify-center py-10 px-4 border border-dashed border-gray-300 dark:border-white/10 rounded-xl bg-gray-50/30 dark:bg-white/5 transition-all duration-300">
            <LayoutList class="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2.5" />
            <p class="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 text-center">Tidak ada rincian laporan kegiatan untuk tahun {{ selectedYear }}</p>
          </div>

          <div 
            v-for="(report, index) in filteredSpecialReports" 
            :key="report.id"
            class="group bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 hover:border-primary/40 dark:hover:border-secondary/40 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden flex flex-col lg:flex-row p-3 sm:p-4 gap-2 sm:gap-4 lg:gap-6 cursor-pointer lg:items-center"
            @click="openSpecialReport(report)"
          >
            <!-- Top Row (Mobile) / Left Side (Desktop) -->
            <div class="flex items-center justify-between w-full lg:w-[35%] shrink-0">
              <!-- Icon + Title -->
              <div class="flex items-center gap-2.5 sm:gap-4 min-w-0">
                <div class="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-dark/5 dark:bg-white/5 flex items-center justify-center text-primary dark:text-secondary group-hover:scale-110 group-hover:bg-primary/10 dark:group-hover:bg-secondary/10 transition-all duration-300 shrink-0">
                  <component :is="report.icon" class="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-bold text-xs sm:text-base text-dark dark:text-white group-hover:text-primary dark:group-hover:text-secondary transition-colors leading-tight line-clamp-1">{{ report.title }}</h4>
                  <p class="text-[9px] sm:text-xs text-gray-500 mt-0.5 uppercase tracking-wide">{{ report.date }}</p>
                </div>
              </div>
              
              <!-- Detail Button (Mobile Only) -->
              <div class="lg:hidden shrink-0 ml-2">
                <button
                  class="flex items-center gap-1 px-2.5 py-1 rounded-full border border-gray-200 dark:border-white/10 bg-transparent hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 shrink-0"
                >
                  <span class="text-[8px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Detail</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-2.5 h-2.5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                </button>
              </div>
            </div>

            <!-- Middle: Stats Grid -->
            <div class="flex-1 w-full grid grid-cols-3 items-center divide-x divide-gray-200 dark:divide-white/10 py-1 pt-2.5 mt-0.5 border-t border-gray-100 dark:border-white/5 lg:border-t-0 lg:pt-1 lg:mt-0">
              <!-- Total Masuk -->
              <div class="flex flex-col pr-2 sm:pr-4">
                <span class="block text-[8px] sm:text-[9px] text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1 font-semibold">Total Masuk</span>
                <span class="font-bold text-emerald-600 dark:text-emerald-400 text-[10px] sm:text-sm leading-none">Rp {{ formatRupiah(report.totalPemasukan) }}</span>
              </div>
              <!-- Total Keluar -->
              <div class="flex flex-col px-2 sm:px-4">
                <span class="block text-[8px] sm:text-[9px] text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1 font-semibold">Total Keluar</span>
                <span class="font-bold text-rose-500 dark:text-rose-400 text-[10px] sm:text-sm leading-none">Rp {{ formatRupiah(report.totalPengeluaran) }}</span>
              </div>
              <!-- Saldo Akhir -->
              <div class="flex flex-col pl-2 sm:pl-4">
                <span class="block text-[8px] sm:text-[9px] text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1 font-semibold">Saldo Akhir</span>
                <span class="font-bold text-cyan-600 dark:text-cyan-400 text-[10px] sm:text-sm leading-none">Rp {{ formatRupiah(report.sisaSaldo) }}</span>
              </div>
            </div>

            <!-- Right: Detail Button (Desktop Only) -->
            <div class="hidden lg:flex shrink-0">
              <button
                class="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/10 bg-transparent hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 shrink-0"
              >
                <span class="text-[10px] font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Detail</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
              </button>
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
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Wallet, TrendingUp, TrendingDown, BadgeCheck, ShieldCheck, CalendarDays, ArrowUpRight, ArrowDownRight, Activity, BookOpen, HeartHandshake, Gift, GraduationCap, LayoutList, Star, ChevronDown } from 'lucide-vue-next'
import IslamicPattern from '@/components/ui/IslamicPattern.vue'
import SpecialReportModal from '@/components/ui/SpecialReportModal.vue'
import { useAdminStore } from '@/stores/admin'
import { useKeuanganStore } from '@/stores/keuangan'
import { formatDateId } from '@/utils/keuangan-mapper'

gsap.registerPlugin(ScrollTrigger)

const adminStore = useAdminStore()
const keuanganStore = useKeuanganStore()
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

// Tambahkan ref untuk filter bulan dan rincian data bulanan
const monthNamesFull = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const currentDate = new Date();
const selectedMonth = ref(monthNamesFull[currentDate.getMonth()]);
const isDropdownOpen = ref(false);
const dropdownRef = ref(null);
const months = monthNamesFull;
const activeTab = ref('Semua');

const monthlyFinanceData = ref({})
const currentReportData = ref({
  saldoAwal: 0,
  pemasukan: 0,
  pengeluaran: 0,
  saldoAkhir: 0,
  transactions: []
})

const currentMonthData = computed(() => {
  return monthlyFinanceData.value[selectedMonth.value] || {
    saldoAwal: '0,00',
    saldoAwalFull: '0',
    pemasukan: '0,00',
    pemasukanFull: '0',
    pengeluaran: '0,00',
    pengeluaranFull: '0',
    saldoAkhir: '0,00',
    saldoAkhirFull: '0',
    selisihBersih: '0',
    transactions: [],
    trend: {
      saldo: [0, 0, 0, 0, 0, 0, 0],
      income: [0, 0, 0, 0, 0, 0, 0],
      expense: [0, 0, 0, 0, 0, 0, 0]
    }
  }
})

const loadMonthlyReport = async () => {
  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const monthIndex = monthNames.indexOf(selectedMonth.value) + 1;
  const year = summarySelectedYear.value; 
  
  const report = await keuanganStore.fetchPublicMonthlyReport(monthIndex, year);
  if (report) {
    currentReportData.value = report;
    
    // Transaksi sudah di-map di store (mapTransactionFromApi), jadi kita gunakan field FE
    const mappedTransactions = report.transactions.map(t => ({
      date: t.date,
      description: t.description || t.name || 'Transaksi',
      category: t.category || 'Lainnya',
      type: t.type,
      amount: t.amount
    }));

    monthlyFinanceData.value = {
      ...monthlyFinanceData.value,
      [selectedMonth.value]: {
        saldoAwal: (report.saldoAwal / 1000000).toFixed(2).replace('.', ','),
      saldoAwalFull: formatRupiah(report.saldoAwal),
      pemasukan: (report.pemasukan / 1000000).toFixed(2).replace('.', ','),
      pemasukanFull: formatRupiah(report.pemasukan),
      pengeluaran: (report.pengeluaran / 1000000).toFixed(2).replace('.', ','),
      pengeluaranFull: formatRupiah(report.pengeluaran),
      saldoAkhir: (report.saldoAkhir / 1000000).toFixed(2).replace('.', ','),
      saldoAkhirFull: formatRupiah(report.saldoAkhir),
      selisihBersih: formatRupiah(Math.abs(report.pemasukan - report.pengeluaran)),
      transactions: mappedTransactions,
      trend: {
        saldo: [0, 0, 0, 0, 0, 0, report.saldoAkhir / 1000000],
        income: [0, 0, 0, 0, 0, 0, report.pemasukan / 1000000],
        expense: [0, 0, 0, 0, 0, 0, report.pengeluaran / 1000000]
      }
      }
    };
    
    await nextTick();
    animateAllCounters(false);
    animateSparklines(false);
    animateProgressBars(false);
  }
}

const filteredTransactions = computed(() => {
  const txs = currentMonthData.value.transactions || []
  if (activeTab.value === 'Pemasukan') {
    return txs.filter(t => t.type === 'in')
  } else if (activeTab.value === 'Pengeluaran') {
    return txs.filter(t => t.type === 'out')
  }
  return txs
});

const selectMonth = (month) => {
  selectedMonth.value = month;
  isDropdownOpen.value = false;
  loadMonthlyReport();
};

// Computed property untuk menentukan teks label bulan secara dinamis pada kartu utama
const getCardSubtitle = computed(() => {
  if (selectedMonth.value === 'Mei' || selectedMonth.value === 'April') {
    return `Bulan lalu (${selectedMonth.value})`
  } else if (selectedMonth.value === 'Juni') {
    return `Bulan ini (${selectedMonth.value})`
  }
  return `Bulan ${selectedMonth.value}`
})

// Algoritma konversi angka ke teks terbilang Bahasa Indonesia secara rekursif
const angkaKeTeks = (n) => {
  const bilangan = [
    '', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 
    'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh', 'Sebelas'
  ]
  
  const bantu = (val) => {
    if (val < 12) {
      return ' ' + bilangan[Math.floor(val)]
    } else if (val < 20) {
      return bantu(val - 10) + ' Belas'
    } else if (val < 100) {
      return bantu(val / 10) + ' Puluh' + bantu(val % 10)
    } else if (val < 200) {
      return ' Seratus' + bantu(val - 100)
    } else if (val < 1000) {
      return bantu(val / 100) + ' Ratus' + bantu(val % 100)
    } else if (val < 2000) {
      return ' Seribu' + bantu(val - 1000)
    } else if (val < 1000000) {
      return bantu(val / 1000) + ' Ribu' + bantu(val % 1000)
    } else if (val < 1000000000) {
      return bantu(val / 1000000) + ' Juta' + bantu(val % 1000000)
    } else if (val < 1000000000000) {
      return bantu(val / 1000000000) + ' Milyar' + bantu(val % 1000000000)
    }
    return ''
  }

  return bantu(n).trim()
}

// Helper untuk mendapatkan tanggal akhir bulan
const getLastDayOfMonth = (month) => {
  if (month === 'Februari') return '28'
  if (['April', 'Juni', 'September', 'November'].includes(month)) return '30'
  return '31'
}

// Computed property untuk memetakan dataset transaksi ke format template A4 Laporan Kegiatan
const monthlyReportObj = computed(() => {
  const monthData = currentMonthData.value
  const monthName = selectedMonth.value
  const year = summarySelectedYear.value

  const parseNumber = (val) => {
    if (!val) return 0
    return parseFloat(val.toString().replace(/\./g, '').replace(',', '.')) || 0
  }

  const saldoAwalNum = parseNumber(monthData.saldoAwalFull)
  const totalPemasukanNum = parseNumber(monthData.pemasukanFull)
  const totalPengeluaranNum = parseNumber(monthData.pengeluaranFull)
  const saldoAkhirNum = parseNumber(monthData.saldoAkhirFull)

  // Pemasukan: masukkan Saldo Awal jika tidak nol
  const monthNamesFull = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
  const monthIdx = monthNamesFull.indexOf(monthName) + 1
  const monthStr = monthIdx.toString().padStart(2, '0')
  
  const pemasukanList = []
  let inIdx = 1
  
  if (saldoAwalNum !== 0) {
    pemasukanList.push({
      no: inIdx++,
      tanggal: `${year}-${monthStr}-01`,
      uraian: 'Saldo Awal Kas & Bank',
      jumlah: saldoAwalNum
    })
  }

  if (monthData.transactions) {
    monthData.transactions
      .filter(t => t.type === 'in')
      .forEach(t => {
        pemasukanList.push({
          no: inIdx++,
          tanggal: t.date,
          uraian: t.description,
          jumlah: t.amount
        })
      })
  }

  // Pengeluaran
  const pengeluaranList = []
  let outIdx = 1
  if (monthData.transactions) {
    monthData.transactions
      .filter(t => t.type === 'out')
      .forEach(t => {
        pengeluaranList.push({
          no: outIdx++,
          tanggal: t.date,
          uraian: t.description,
          jumlah: t.amount
        })
      })
  }

  const terbilangStr = angkaKeTeks(saldoAkhirNum) + ' Rupiah'

  return {
    id: `finance-${monthName.toLowerCase()}-${year}`,
    title: `Kas & Bank Bulanan (${monthName} ${year})`,
    subtitle: 'MASJID JAMI KASSITI',
    date: `01 ${monthName} ${year} - ${getLastDayOfMonth(monthName)} ${monthName} ${year}`,
    pemasukan: pemasukanList,
    pengeluaran: pengeluaranList,
    totalPemasukan: saldoAwalNum + totalPemasukanNum,
    totalPengeluaran: totalPengeluaranNum,
    sisaSaldo: saldoAkhirNum,
    terbilang: terbilangStr,
    keterangan: `Laporan keuangan resmi DKM Masjid Jami Kassiti untuk bulan ${monthName} ${year}.`
  }
})

const openMonthlyReport = () => {
  selectedSpecialReport.value = monthlyReportObj.value
  isSpecialReportModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

// Handle click outside to close dropdown
onMounted(() => {
  loadMonthlyReport();
  
  document.addEventListener('click', (e) => {
    if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
      isDropdownOpen.value = false;
    }
    if (summaryYearDropdownRef.value && !summaryYearDropdownRef.value.contains(e.target)) {
      isSummaryYearDropdownOpen.value = false;
    }
    if (yearDropdownRef.value && !yearDropdownRef.value.contains(e.target)) {
      isYearDropdownOpen.value = false;
    }
  });
});

// Dropdown state untuk summary tahun
const isSummaryYearDropdownOpen = ref(false);
const summaryYearDropdownRef = ref(null);
const currentYearStr = new Date().getFullYear().toString();
const summarySelectedYear = ref(currentYearStr);
const summaryYears = [currentYearStr, (new Date().getFullYear() - 1).toString(), (new Date().getFullYear() - 2).toString()];

const selectSummaryYear = (year) => {
  summarySelectedYear.value = year;
  isSummaryYearDropdownOpen.value = false;
  loadMonthlyReport();
};

// Dropdown state untuk tahun
const isYearDropdownOpen = ref(false);
const yearDropdownRef = ref(null);
const selectedYear = ref(currentYearStr);

const selectYear = (year) => {
  selectedYear.value = year;
  isYearDropdownOpen.value = false;
  loadPublicPrograms();
};

const isLatestMode = ref(false);
const specialReports = ref([]);

const loadPublicPrograms = async () => {
  try {
    const settings = await keuanganStore.fetchPublicSettings();
    isLatestMode.value = settings.landing_program_mode === 'latest';
    
    const yearParam = isLatestMode.value ? selectedYear.value : null;
    const programs = await keuanganStore.fetchPublicPrograms({ year: yearParam });
    
    const universalIcons = [Star, HeartHandshake, Gift, Wallet, Activity, BadgeCheck, ShieldCheck];
    
    specialReports.value = programs.map((p, index) => {
      // Pick a pseudo-random icon based on index or just random
      const randomIcon = universalIcons[index % universalIcons.length];
      
      // Pisahkan dan format transaksi
      let noPemasukan = 1;
      const pemasukanData = (p.transactions || [])
        .filter(t => t.type === 'in' || t.type === 'pemasukan')
        .map(t => ({
          no: noPemasukan++,
          tanggal: t.date,
          uraian: t.name || t.description,
          jumlah: t.amount,
        }));
        
      let noPengeluaran = 1;
      const pengeluaranData = (p.transactions || [])
        .filter(t => t.type === 'out' || t.type === 'pengeluaran')
        .map(t => ({
          no: noPengeluaran++,
          tanggal: t.date,
          uraian: t.name || t.description,
          jumlah: t.amount,
        }));

      return {
        id: p.id,
        title: p.name || 'Program DKM',
        year: p.startDate ? p.startDate.substring(0,4) : (p.createdAt ? p.createdAt.substring(0,4) : ''),
        icon: randomIcon,
        subtitle: p.description || 'Kegiatan DKM',
        date: p.startDate ? (p.endDate ? `${formatDateId(p.startDate)} - ${formatDateId(p.endDate)}` : `${formatDateId(p.startDate)}`) : 'Sepanjang Waktu',
        pemasukan: pemasukanData,
        pengeluaran: pengeluaranData,
        totalPemasukan: p.pemasukan || 0,
        totalPengeluaran: p.pengeluaran || 0,
        sisaSaldo: p.sisaSaldo || 0,
        terbilang: (p.sisaSaldo || 0) < 0 ? 'Minus ' + angkaKeTeks(Math.abs(p.sisaSaldo || 0)) + ' Rupiah' : angkaKeTeks(p.sisaSaldo || 0) + ' Rupiah',
      };
    });
  } catch (err) {
    console.error('Failed to load public programs:', err);
  }
};

const filteredSpecialReports = computed(() => {
  return specialReports.value; // Filter dilakukan di backend
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
const saldoData = computed(() => currentMonthData.value.trend.saldo)
const incomeData = computed(() => currentMonthData.value.trend.income)
const expenseData = computed(() => currentMonthData.value.trend.expense)
const balanceData = computed(() => currentMonthData.value.trend.saldo)

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

const spark1 = computed(() => generateSparklinePath(saldoData.value))
const spark2 = computed(() => generateSparklinePath(incomeData.value))
const spark3 = computed(() => generateSparklinePath(expenseData.value))
const spark4 = computed(() => generateSparklinePath(balanceData.value))

const sparklinePath1 = computed(() => spark1.value.path)
const sparklinePath2 = computed(() => spark2.value.path)
const sparklinePath3 = computed(() => spark3.value.path)
const sparklinePath4 = computed(() => spark4.value.path)

const sparklineArea1 = computed(() => generateSparklineArea(saldoData.value))
const sparklineArea2 = computed(() => generateSparklineArea(incomeData.value))
const sparklineArea3 = computed(() => generateSparklineArea(expenseData.value))
const sparklineArea4 = computed(() => generateSparklineArea(balanceData.value))

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


const animateCounter = (element, targetValue, duration = 1.0, isDecimal = false, useScrollTrigger = false) => {
  if (!element) return
  const options = {
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
    }
  }
  
  if (useScrollTrigger) {
    options.scrollTrigger = { trigger: '#keuangan', start: 'top 75%', once: true }
  }
  
  gsap.killTweensOf(element)
  gsap.to(element, options)
}

const animateAllCounters = (useScrollTrigger = false) => {
  const parseNumber = (val) => parseFloat(val.toString().replace(/\./g, '').replace(',', '.')) || 0
  const data = currentMonthData.value

  animateCounter(counter1.value, parseNumber(data.saldoAwal), 1.0, true, useScrollTrigger)
  animateCounter(counter2.value, parseNumber(data.pemasukan), 1.0, true, useScrollTrigger)
  animateCounter(counter3.value, parseNumber(data.pengeluaran), 1.0, true, useScrollTrigger)
  animateCounter(counter4.value, parseNumber(data.saldoAkhir), 1.0, true, useScrollTrigger)
  
  animateCounter(sumIn.value, parseNumber(data.pemasukanFull), 1.0, false, useScrollTrigger)
  animateCounter(sumOut.value, parseNumber(data.pengeluaranFull), 1.0, false, useScrollTrigger)
  animateCounter(sumDiff.value, parseNumber(data.selisihBersih), 1.0, false, useScrollTrigger)
}

const animateSparklines = (useScrollTrigger = false) => {
  const stConfig = { trigger: '#keuangan', start: 'top 75%', once: true }
  
  const drawSparkline = (sparkEl, lengthRef, offsetRef, delay) => {
    if (sparkEl) {
      const len = sparkEl.getTotalLength()
      lengthRef.value = len
      offsetRef.value = len
      
      const animOpts = { value: 0, duration: 1.5, ease: 'power3.out', delay }
      if (useScrollTrigger) {
        animOpts.scrollTrigger = stConfig
      }
      gsap.killTweensOf(offsetRef)
      gsap.to(offsetRef, animOpts)
    }
  }

  setTimeout(() => {
    drawSparkline(sparkline1.value, sparklineLength1, sparklineOffset1, 0.2)
    drawSparkline(sparkline2.value, sparklineLength2, sparklineOffset2, 0.3)
    drawSparkline(sparkline3.value, sparklineLength3, sparklineOffset3, 0.4)
    drawSparkline(sparkline4.value, sparklineLength4, sparklineOffset4, 0.5)
  }, 100)
}

const animateProgressBars = (useScrollTrigger = false) => {
  const stConfig = { trigger: '#keuangan', start: 'top 75%', once: true }
  
  const animateBar = (barEl, delay) => {
    if (barEl) {
      const animOpts = { width: '100%', duration: 1.2, ease: 'power3.out', delay }
      if (useScrollTrigger) {
        animOpts.scrollTrigger = stConfig
      }
      gsap.fromTo(barEl, { width: '0%' }, animOpts)
    }
  }
  
  animateBar(progressBar1.value, 0.3)
  animateBar(progressBar4.value, 0.6)
}

watch(selectedMonth, () => {
  animateAllCounters(false)
  animateSparklines(false)
  animateProgressBars(false)
})

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

  // Initial trigger
  animateAllCounters(true)
  animateSparklines(true)
  animateProgressBars(true)
  
  loadPublicPrograms()
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
