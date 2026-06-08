<template>
  <section id="keuangan" class="relative py-16 lg:py-24 bg-white dark:bg-dark overflow-hidden transition-colors duration-500">
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
      <div class="text-center mb-14" ref="headerRef">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-secondary/10 border border-primary/20 dark:border-secondary/20 mb-5">
          <span class="w-1.5 h-1.5 rounded-full bg-primary dark:bg-secondary animate-pulse"></span>
          <span class="text-primary dark:text-secondary text-xs font-semibold tracking-wider uppercase">Transparansi</span>
        </div>
        <h2 class="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark dark:text-white transition-colors duration-500 tracking-tight mb-3">
          Laporan <span class="text-primary dark:text-secondary">Keuangan</span>
        </h2>
        <p class="text-dark/50 dark:text-white/50 text-sm sm:text-base max-w-xl mx-auto transition-colors duration-500">
          Kami berkomitmen menjaga kepercayaan jamaah dengan transparansi pengelolaan dana masjid
        </p>
      </div>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 pb-6" ref="cardsRef">
        
        <!-- Saldo Awal -->
        <div 
          @mousemove="handleMouseMove($event, 0)"
          @mouseleave="resetTilt(0)"
          :style="{ transform: cardTilts[0] || 'scale3d(1, 1, 1)' }"
          class="finance-card group w-full bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-gray-300 dark:border-white/20 transition-all duration-300 transform-gpu relative overflow-hidden"
        >
          <div class="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <!-- Decorative Icon -->
          <div class="absolute -right-4 -top-4 w-20 h-20 bg-primary/5 dark:bg-secondary/10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
            <Wallet class="w-8 h-8 text-primary/20 dark:text-secondary/20" />
          </div>
          <div class="relative z-10">
            <div class="flex items-center gap-2.5 mb-1">
              <div class="w-9 h-9 rounded-xl bg-primary/10 dark:bg-secondary/15 flex items-center justify-center">
                <Wallet class="w-4 h-4 text-primary dark:text-secondary" />
              </div>
              <h3 class="text-dark dark:text-white/90 font-semibold text-base transition-colors duration-500">Saldo Awal</h3>
            </div>
            <p class="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs mb-3 sm:mb-4 ml-[46px] transition-colors duration-500">{{ adminStore.finance.periodeAwal }}</p>
            
            <!-- Sparkline Chart -->
            <div class="mb-3 sm:mb-4 ml-1">
              <svg class="w-full h-8 sm:h-10" viewBox="0 0 200 40" preserveAspectRatio="none">
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
              <span class="text-base sm:text-2xl text-primary dark:text-secondary">Rp</span>
              <span class="text-2xl sm:text-4xl leading-none text-gradient-gold" ref="counter1">0</span>
              <span class="text-sm sm:text-xl pb-0.5 text-primary dark:text-secondary">jt</span>
            </div>
            <div class="flex items-center gap-2 mt-3">
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
          class="finance-card group w-full bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-gray-300 dark:border-white/20 transition-all duration-300 transform-gpu relative overflow-hidden"
        >
          <div class="absolute inset-0 bg-linear-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="absolute -right-4 -top-4 w-20 h-20 bg-green-500/5 dark:bg-green-500/10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
            <TrendingUp class="w-8 h-8 text-green-500/20 dark:text-green-400/20" />
          </div>
          <div class="relative z-10">
            <div class="flex items-center gap-2.5 mb-1">
              <div class="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center">
                <TrendingUp class="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <h3 class="text-dark dark:text-white/90 font-semibold text-base transition-colors duration-500">Pemasukan</h3>
            </div>
            <p class="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs mb-3 sm:mb-4 ml-[46px] transition-colors duration-500">Hingga hari ini</p>
            
            <!-- Sparkline Chart -->
            <div class="mb-3 sm:mb-4 ml-1">
              <svg class="w-full h-8 sm:h-10" viewBox="0 0 200 40" preserveAspectRatio="none">
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
              <span class="text-base sm:text-2xl">Rp</span>
              <span class="text-2xl sm:text-4xl leading-none drop-shadow-sm" ref="counter2">0</span>
            </div>
            <div class="flex items-center gap-2 mt-3">
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
          class="finance-card group w-full bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-gray-300 dark:border-white/20 transition-all duration-300 transform-gpu relative overflow-hidden"
        >
          <div class="absolute inset-0 bg-linear-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div class="absolute -right-4 -top-4 w-20 h-20 bg-red-500/5 dark:bg-red-500/10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
            <TrendingDown class="w-8 h-8 text-red-500/20 dark:text-red-400/20" />
          </div>
          <div class="relative z-10">
            <div class="flex items-center gap-2.5 mb-1">
              <div class="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center">
                <TrendingDown class="w-4 h-4 text-red-500 dark:text-red-400" />
              </div>
              <h3 class="text-dark dark:text-white/90 font-semibold text-base transition-colors duration-500">Pengeluaran</h3>
            </div>
            <p class="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs mb-3 sm:mb-4 ml-[46px] transition-colors duration-500">Hingga hari ini</p>
            
            <!-- Sparkline Chart -->
            <div class="mb-3 sm:mb-4 ml-1">
              <svg class="w-full h-8 sm:h-10" viewBox="0 0 200 40" preserveAspectRatio="none">
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
              <span class="text-base sm:text-2xl">Rp</span>
              <span class="text-2xl sm:text-4xl leading-none drop-shadow-sm" ref="counter3">0</span>
            </div>
            <div class="flex items-center gap-2 mt-3">
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
          class="finance-card group w-full bg-linear-to-br from-white/90 to-cyan-50/50 dark:from-[#1a2035]/80 dark:to-[#152030]/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-cyan-400 dark:border-cyan-500/50 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-300 transform-gpu relative overflow-hidden"
        >
          <div class="absolute -right-12 -top-12 w-40 h-40 bg-linear-to-br from-cyan-400/20 to-blue-500/20 dark:from-cyan-400/10 dark:to-blue-500/10 rounded-full blur-2xl z-0 transition-all duration-500 group-hover:scale-150"></div>
          <div class="absolute -left-8 -bottom-8 w-32 h-32 bg-linear-to-tr from-blue-400/10 to-transparent rounded-full blur-2xl z-0"></div>
          
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-1">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-linear-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                  <BadgeCheck class="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 class="text-dark dark:text-white font-bold text-base transition-colors duration-500">Saldo Akhir</h3>
              </div>
              <button class="px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800 rounded-full hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-white transition-all duration-300 flex-shrink-0 shadow-sm">
                Detail
              </button>
            </div>
            <p class="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs mb-3 sm:mb-4 ml-[46px] transition-colors duration-500">{{ adminStore.finance.periodeAkhir }}</p>
            
            <!-- Sparkline Chart -->
            <div class="mb-3 sm:mb-4 ml-1">
              <svg class="w-full h-8 sm:h-10" viewBox="0 0 200 40" preserveAspectRatio="none">
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
              <span class="text-base sm:text-2xl text-cyan-600 dark:text-cyan-400">Rp</span>
              <span class="text-2xl sm:text-4xl leading-none text-transparent bg-clip-text bg-linear-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 drop-shadow-sm" ref="counter4">0</span>
              <span class="text-sm sm:text-xl pb-0.5 text-cyan-600 dark:text-cyan-400">jt</span>
            </div>
            <div class="flex items-center gap-2 mt-3">
              <div class="flex-1 h-1 rounded-full bg-cyan-500/10 overflow-hidden">
                <div ref="progressBar4" class="h-full bg-linear-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300" style="width: 0%"></div>
              </div>
              <span class="text-gray-400 dark:text-gray-500 text-[10px] font-medium">Rp {{ adminStore.finance.saldoAkhirFull }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Stats Row -->
      <div ref="summaryRef" class="mt-4 sm:mt-6 bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-gray-300 dark:border-white/20 shadow-sm overflow-hidden">
        <div class="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100 dark:divide-white/10">
          <div class="p-3 sm:p-5 lg:p-6 text-center group hover:bg-primary/5 dark:hover:bg-secondary/5 transition-colors duration-300">
            <div class="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
              <CalendarDays class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary dark:text-secondary" />
              <span class="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Periode</span>
            </div>
            <p class="text-dark dark:text-white font-bold text-xs sm:text-base transition-colors duration-500">{{ adminStore.finance.periodeSingkat }}</p>
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
              <span class="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Selisih Bersih</span>
            </div>
            <div class="flex items-end justify-center gap-1 text-cyan-600 dark:text-cyan-400 font-bold">
              <span class="text-xs sm:text-sm">Rp</span>
              <span class="text-xs sm:text-base leading-none" ref="sumDiff">0</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Decorative Divider -->
      <div class="flex items-center gap-4 mt-10" ref="dividerRef">
        <div class="flex-1 h-px bg-linear-to-r from-transparent via-primary/20 dark:via-secondary/20 to-transparent"></div>
        <div class="flex items-center gap-2 text-dark/30 dark:text-white/20">
          <ShieldCheck class="w-4 h-4" />
          <span class="text-[10px] font-semibold tracking-widest uppercase">Dikelola Dengan Amanah</span>
          <ShieldCheck class="w-4 h-4" />
        </div>
        <div class="flex-1 h-px bg-linear-to-r from-transparent via-primary/20 dark:via-secondary/20 to-transparent"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Wallet, TrendingUp, TrendingDown, BadgeCheck, ShieldCheck, CalendarDays, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-vue-next'
import IslamicPattern from '@/components/ui/IslamicPattern.vue'
import { useAdminStore } from '@/stores/admin'

gsap.registerPlugin(ScrollTrigger)

const adminStore = useAdminStore()
const headerRef = ref(null)
const cardsRef = ref(null)
const dividerRef = ref(null)
const summaryRef = ref(null)
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
