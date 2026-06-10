<template>
  <div class="space-y-6 sm:space-y-8 animate-fade-in">
    
    <!-- Welcome Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard Keuangan</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Ringkasan performa finansial Masjid Jami Kassiti bulan ini.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <div class="relative">
          <button @click="showMonthDropdown = !showMonthDropdown" class="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium px-4 py-2 rounded-lg transition-colors ring-1 ring-gray-300 dark:ring-white/10 shadow-md text-sm flex items-center gap-2 min-w-[150px] justify-between">
            <div class="flex items-center gap-2">
              <Calendar class="w-4 h-4 text-gray-400" />
              <span>{{ selectedMonth }}</span>
            </div>
            <ChevronDown class="w-4 h-4 ml-1 text-gray-400" />
          </button>
          
          <div v-if="showMonthDropdown" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/10 rounded-lg shadow-lg z-20 py-1 overflow-hidden animate-fade-in-down max-h-60 overflow-y-auto custom-scrollbar">
            <button 
              v-for="month in months" 
              :key="month"
              @click="selectedMonth = month; showMonthDropdown = false"
              :class="['w-full text-left px-4 py-2 text-sm transition-colors', selectedMonth === month ? 'bg-secondary/10 text-secondary dark:bg-secondary/20 font-medium' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700']"
            >
              {{ month }}
            </button>
          </div>
          <!-- Backdrop -->
          <div v-if="showMonthDropdown" @click="showMonthDropdown = false" class="fixed inset-0 z-10"></div>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      
      <!-- Stat: Total Saldo -->
      <RouterLink to="/admin/keuangan-bank-kas" class="relative overflow-hidden bg-linear-to-br from-emerald-600 to-teal-800 rounded-2xl p-6 shadow-lg shadow-emerald-900/20 text-white group block hover:-translate-y-1 hover:shadow-emerald-900/30 transition-all duration-300">
        <div class="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
          <Landmark class="w-24 h-24" />
        </div>
        <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <ArrowRight class="w-5 h-5 text-emerald-100" />
        </div>
        <div class="relative z-10 flex flex-col justify-between h-full">
          <div class="flex items-center justify-between mb-4">
            <p class="text-sm font-medium text-emerald-100">Total Saldo Tersedia</p>
          </div>
          <div>
            <h3 class="text-3xl font-bold tracking-tight">Rp 51.250.000</h3>
            <p class="text-xs text-emerald-200 mt-2 flex items-center gap-1 font-medium bg-white/10 w-max px-2 py-1 rounded backdrop-blur-sm">
              <CheckCircle class="w-3 h-3" />
              Tervalidasi & Sinkron
            </p>
          </div>
        </div>
      </RouterLink>

      <!-- Stat: Pemasukan -->
      <RouterLink to="/admin/keuangan-transaksi" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:shadow-lg hover:ring-gray-400 dark:hover:ring-white/20 transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
        <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <ArrowRight class="w-5 h-5 text-gray-400" />
        </div>
        <div class="flex items-center justify-between mb-4 relative z-10">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Pemasukan</p>
          <div class="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 transition-colors">
            <TrendingUp class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
        <div class="relative z-10">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Rp 15.400.000</h3>
          <p class="text-sm text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1 font-medium">
            <ArrowUpRight class="w-4 h-4" />
            +12% dari bulan lalu
          </p>
        </div>
      </RouterLink>

      <!-- Stat: Pengeluaran -->
      <RouterLink to="/admin/keuangan-transaksi" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:shadow-lg hover:ring-gray-400 dark:hover:ring-white/20 transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
        <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <ArrowRight class="w-5 h-5 text-gray-400" />
        </div>
        <div class="flex items-center justify-between mb-4 relative z-10">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Pengeluaran</p>
          <div class="p-2 bg-rose-50 dark:bg-rose-500/10 rounded-lg group-hover:bg-rose-100 dark:group-hover:bg-rose-500/20 transition-colors">
            <TrendingDown class="w-5 h-5 text-rose-600 dark:text-rose-400" />
          </div>
        </div>
        <div class="relative z-10">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Rp 4.250.000</h3>
          <p class="text-sm text-rose-600 dark:text-rose-400 mt-2 flex items-center gap-1 font-medium">
            <ArrowDownRight class="w-4 h-4" />
            -5% dari bulan lalu
          </p>
        </div>
      </RouterLink>

      <!-- Stat: Selisih -->
      <RouterLink to="/admin/keuangan-laporan" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:shadow-lg hover:ring-gray-400 dark:hover:ring-white/20 transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
        <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <ArrowRight class="w-5 h-5 text-gray-400" />
        </div>
        <div class="flex items-center justify-between mb-4 relative z-10">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Surplus Bulan Ini</p>
          <div class="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors">
            <Scale class="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <div class="relative z-10">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Rp 11.150.000</h3>
          <p class="text-sm text-blue-600 dark:text-blue-400 mt-2 flex items-center gap-1 font-medium">
            Surplus Positif
          </p>
        </div>
      </RouterLink>

    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Chart Widget -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl shadow-md flex flex-col">
        <div class="p-6 border-b border-gray-300 dark:border-white/5 flex items-center justify-between">
          <div>
            <h2 class="text-base font-semibold text-gray-900 dark:text-white">Arus Kas Bulanan</h2>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Pemasukan & Pengeluaran 6 bulan terakhir</p>
          </div>
          <div class="relative">
            <button @click="showChartMenu = !showChartMenu" class="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <MoreHorizontal class="w-5 h-5" />
            </button>
            
            <!-- Dropdown Menu -->
            <div v-if="showChartMenu" class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/10 rounded-lg shadow-lg z-20 py-1 overflow-hidden animate-fade-in-down">
              <button @click="exportChart" class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3">
                <Image class="w-4 h-4 text-gray-400" />
                Unduh PNG
              </button>
              <button v-if="chartType === 'line'" @click="toggleChartType" class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3">
                <BarChart3 class="w-4 h-4 text-gray-400" />
                Ubah ke Diagram Batang
              </button>
              <button v-if="chartType === 'bar'" @click="toggleChartType" class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3">
                <LineChart class="w-4 h-4 text-gray-400" />
                Ubah ke Diagram Garis
              </button>
            </div>
            
            <!-- Backdrop -->
            <div v-if="showChartMenu" @click="showChartMenu = false" class="fixed inset-0 z-10"></div>
          </div>
        </div>
        <div class="p-6 flex-1 min-h-[300px]">
          <!-- ApexCharts Component -->
          <VueApexCharts ref="cashFlowChart" :type="chartType" height="100%" :options="chartOptions" :series="chartSeries" />
        </div>
      </div>

      <!-- Recent Transactions Widget -->
      <div class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-2xl shadow-md flex flex-col">
        <div class="p-6 border-b border-gray-300 dark:border-white/5 flex items-center justify-between">
          <h2 class="text-base font-semibold text-gray-900 dark:text-white">Transaksi Terbaru</h2>
          <RouterLink to="/admin/keuangan-transaksi" class="text-xs font-medium text-secondary hover:text-yellow-600 transition-colors">
            Lihat Semua
          </RouterLink>
        </div>
        <div class="p-2 flex-1">
          <ul class="divide-y divide-gray-100 dark:divide-white/5">
            <li v-for="tx in recentTransactions" :key="tx.id" class="p-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] rounded-xl transition-colors flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center shrink-0 ring-1',
                  tx.type === 'in' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20' : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-rose-500/20'
                ]">
                  <ArrowDownLeft v-if="tx.type === 'in'" class="w-5 h-5" />
                  <ArrowUpRight v-else class="w-5 h-5" />
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ tx.title }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ tx.date }} • {{ tx.category }}</p>
                </div>
              </div>
              <div class="text-right">
                <p :class="[
                  'text-sm font-bold',
                  tx.type === 'in' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'
                ]">
                  {{ tx.type === 'in' ? '+' : '-' }}Rp {{ tx.amount }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  Calendar, Wallet, TrendingUp, TrendingDown, Scale, 
  MoreHorizontal, ChevronDown, Landmark, CheckCircle,
  ArrowUpRight, ArrowDownRight, ArrowDownLeft, Image, BarChart3, LineChart, ArrowRight
} from 'lucide-vue-next'
import VueApexCharts from 'vue3-apexcharts'

// Month Dropdown Setup
const showMonthDropdown = ref(false)
const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const monthNames = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]
const months = monthNames.map(m => `${m} ${currentYear}`)
const selectedMonth = ref(`${monthNames[currentDate.getMonth()]} ${currentYear}`)

// Chart Setup
const showChartMenu = ref(false)
const chartType = ref('bar')
const cashFlowChart = ref(null)

const toggleChartType = () => {
  chartType.value = chartType.value === 'bar' ? 'line' : 'bar'
  showChartMenu.value = false
}

const exportChart = () => {
  if (cashFlowChart.value) {
    cashFlowChart.value.chart.dataURI().then(({ imgURI }) => {
      const a = document.createElement("a");
      a.href = imgURI;
      a.download = `arus-kas-${selectedMonth.value.toLowerCase().replace(' ', '-')}.png`;
      a.click();
    });
  }
  showChartMenu.value = false
}

// Chart Mockup Data
const chartSeries = ref([
  { name: 'Pemasukan', data: [15, 20, 18, 25, 22, 30] },
  { name: 'Pengeluaran', data: [5, 4, 8, 5, 6, 4] }
])

const chartOptions = computed(() => ({
  chart: { 
    toolbar: { show: false }, 
    background: 'transparent',
    fontFamily: 'inherit'
  },
  plotOptions: { 
    bar: { borderRadius: 4, columnWidth: '50%' } 
  },
  colors: ['#10b981', '#f43f5e'],
  dataLabels: { enabled: false },
  stroke: { 
    show: true, 
    width: chartType.value === 'line' ? 3 : 4, 
    curve: 'smooth',
    colors: chartType.value === 'line' ? ['#10b981', '#f43f5e'] : ['transparent'] 
  },
  xaxis: {
    categories: ['Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt'],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: '#9ca3af' } }
  },
  yaxis: {
    labels: { 
      style: { colors: '#9ca3af' }, 
      formatter: (value) => `Rp ${value}M` 
    }
  },
  grid: { 
    borderColor: 'rgba(156, 163, 175, 0.1)', 
    strokeDashArray: 4,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } }
  },
  legend: { show: false },
  tooltip: {
    theme: 'dark',
    y: { formatter: (val) => `Rp ${val}.000.000` }
  }
}))

// Transactions Mockup Data
const recentTransactions = [
  { id: 1, title: 'Infaq Jumat', category: 'Kotak Amal', date: '10 Okt', amount: '3.250.000', type: 'in' },
  { id: 2, title: 'Donasi Hamba Allah', category: 'Transfer BSI', date: '08 Okt', amount: '1.000.000', type: 'in' },
  { id: 3, title: 'Bayar Listrik & Air', category: 'Operasional', date: '05 Okt', amount: '850.000', type: 'out' },
  { id: 4, title: 'Honor Penceramah', category: 'Dakwah', date: '04 Okt', amount: '500.000', type: 'out' },
  { id: 5, title: 'Infaq Jumat', category: 'Kotak Amal', date: '03 Okt', amount: '2.800.000', type: 'in' },
]
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.5);
}
@keyframes fade-in-down {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-down {
  animation: fade-in-down 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
