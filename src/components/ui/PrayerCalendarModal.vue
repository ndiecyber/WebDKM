<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
    >
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-dark/80 backdrop-blur-sm"
        @click="$emit('close')"
      ></div>

      <!-- Modal Content -->
      <div class="relative w-full max-w-5xl h-[calc(100vh-3rem)] sm:h-auto sm:max-h-[90vh] bg-white dark:bg-[#121220] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-300 dark:border-white/10">
        
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-300 dark:border-white/10">
          <div>
            <h3 class="font-heading text-2xl font-bold text-dark dark:text-white">Kalender Jadwal Sholat</h3>
            <p class="text-sm text-gray-500 dark:text-white/60 mt-1">Berdasarkan lokasi Anda saat ini (Metode Kemenag RI)</p>
          </div>
          <button
            @click="$emit('close')"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-500 dark:text-white/60 hover:text-dark dark:hover:text-white"
          >
            <X class="w-6 h-6" />
          </button>
        </div>

        <!-- Controls (Month/Year) -->
        <div class="p-4 sm:p-6 bg-gray-50 dark:bg-dark border-b border-gray-300 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <button @click="changeMonth(-1)" class="p-2 rounded-lg bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
              <ChevronLeft class="w-5 h-5 text-dark dark:text-white" />
            </button>
            <h4 class="font-bold text-lg text-dark dark:text-white min-w-[150px] text-center">
              {{ monthName }} {{ currentYear }}
            </h4>
            <button @click="changeMonth(1)" class="p-2 rounded-lg bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
              <ChevronRight class="w-5 h-5 text-dark dark:text-white" />
            </button>
          </div>
          
          <button @click="resetToToday" class="px-4 py-2 rounded-lg bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20 transition-colors font-medium text-sm">
            Kembali ke Hari Ini
          </button>
        </div>

        <!-- Table / Content -->
        <div ref="scrollContainer" class="flex-1 overflow-auto p-4 sm:p-6 custom-scrollbar relative">
          <div v-if="loading" class="absolute inset-0 flex flex-col items-center justify-center bg-white/50 dark:bg-[#121220]/50 backdrop-blur-sm z-10">
            <div class="w-10 h-10 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin mb-4"></div>
            <p class="text-dark dark:text-white font-medium">Memuat jadwal...</p>
          </div>

          <div v-else-if="error" class="text-center py-10">
            <p class="text-red-500">{{ error }}</p>
            <button @click="fetchCalendar" class="mt-4 px-6 py-2 bg-secondary text-dark rounded-full font-bold">Coba Lagi</button>
          </div>

          <div v-else>
            <!-- Mobile View (Cards) -->
            <div class="block lg:hidden space-y-3 pb-2">
              <div 
                v-for="(day, index) in calendarData" 
                :key="'m-'+index"
                :ref="el => { if (isToday(day)) todayMobileRef = el }"
                class="bg-white dark:bg-[#1A1A2E] border border-gray-300 dark:border-white/10 rounded-xl p-4 shadow-md transition-all"
                :class="isToday(day) ? 'ring-2 ring-secondary bg-secondary/5 dark:bg-secondary/10' : ''"
              >
                <div class="flex items-center justify-between mb-3 border-b border-gray-300 dark:border-white/10 pb-2">
                  <div class="font-bold text-dark dark:text-white flex items-center gap-2">
                    <span v-if="isToday(day)" class="inline-block w-2 h-2 rounded-full bg-secondary"></span>
                    {{ formatDate(day.date.readable) }}
                  </div>
                  <span v-if="isToday(day)" class="text-[10px] font-bold text-secondary uppercase bg-secondary/10 px-2 py-0.5 rounded-full">Hari Ini</span>
                </div>
                
                <div class="grid grid-cols-4 gap-2 text-center">
                  <div class="bg-gray-50 dark:bg-white/5 rounded-lg p-1.5">
                    <p class="text-[10px] text-gray-500 dark:text-white/50 uppercase mb-0.5">Imsak</p>
                    <p class="font-mono text-xs font-semibold text-dark dark:text-white">{{ cleanTime(day.timings.Imsak) }}</p>
                  </div>
                  <div class="bg-secondary/10 rounded-lg p-1.5 ring-1 ring-secondary/20">
                    <p class="text-[10px] text-secondary uppercase mb-0.5 font-bold">Subuh</p>
                    <p class="font-mono text-xs font-bold text-dark dark:text-white">{{ cleanTime(day.timings.Fajr) }}</p>
                  </div>
                  <div class="bg-gray-50 dark:bg-white/5 rounded-lg p-1.5">
                    <p class="text-[10px] text-gray-500 dark:text-white/50 uppercase mb-0.5">Terbit</p>
                    <p class="font-mono text-xs font-semibold text-dark dark:text-white">{{ cleanTime(day.timings.Sunrise) }}</p>
                  </div>
                  <div class="bg-secondary/10 rounded-lg p-1.5 ring-1 ring-secondary/20">
                    <p class="text-[10px] text-secondary uppercase mb-0.5 font-bold">Dzuhur</p>
                    <p class="font-mono text-xs font-bold text-dark dark:text-white">{{ cleanTime(day.timings.Dhuhr) }}</p>
                  </div>
                  <div class="bg-secondary/10 rounded-lg p-1.5 ring-1 ring-secondary/20">
                    <p class="text-[10px] text-secondary uppercase mb-0.5 font-bold">Ashar</p>
                    <p class="font-mono text-xs font-bold text-dark dark:text-white">{{ cleanTime(day.timings.Asr) }}</p>
                  </div>
                  <div class="bg-secondary/10 rounded-lg p-1.5 ring-1 ring-secondary/20">
                    <p class="text-[10px] text-secondary uppercase mb-0.5 font-bold">Maghrib</p>
                    <p class="font-mono text-xs font-bold text-dark dark:text-white">{{ cleanTime(day.timings.Maghrib) }}</p>
                  </div>
                  <div class="bg-secondary/10 rounded-lg p-1.5 ring-1 ring-secondary/20">
                    <p class="text-[10px] text-secondary uppercase mb-0.5 font-bold">Isya</p>
                    <p class="font-mono text-xs font-bold text-dark dark:text-white">{{ cleanTime(day.timings.Isha) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Desktop View (Table) -->
            <div class="hidden lg:block overflow-x-auto custom-scrollbar pb-2">
              <div class="min-w-[800px] bg-white dark:bg-[#1A1A2E] rounded-xl border border-gray-300 dark:border-white/10 shadow-md overflow-hidden">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="bg-gray-100 dark:bg-white/5 border-b border-gray-300 dark:border-white/10">
                      <th class="py-3 px-4 text-dark dark:text-white/90 font-bold text-sm uppercase tracking-wider whitespace-nowrap">Tanggal</th>
                      <th class="py-3 px-4 text-dark dark:text-white/90 font-bold text-sm uppercase tracking-wider whitespace-nowrap">Imsak</th>
                      <th class="py-3 px-4 text-dark dark:text-white/90 font-bold text-sm uppercase tracking-wider whitespace-nowrap text-secondary">Subuh</th>
                      <th class="py-3 px-4 text-dark dark:text-white/90 font-bold text-sm uppercase tracking-wider whitespace-nowrap">Terbit</th>
                      <th class="py-3 px-4 text-dark dark:text-white/90 font-bold text-sm uppercase tracking-wider whitespace-nowrap text-secondary">Dzuhur</th>
                      <th class="py-3 px-4 text-dark dark:text-white/90 font-bold text-sm uppercase tracking-wider whitespace-nowrap text-secondary">Ashar</th>
                      <th class="py-3 px-4 text-dark dark:text-white/90 font-bold text-sm uppercase tracking-wider whitespace-nowrap text-secondary">Maghrib</th>
                      <th class="py-3 px-4 text-dark dark:text-white/90 font-bold text-sm uppercase tracking-wider whitespace-nowrap text-secondary">Isya</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100 dark:divide-white/5">
                    <tr 
                      v-for="(day, index) in calendarData" 
                      :key="'d-'+index"
                      :ref="el => { if (isToday(day)) todayDesktopRef = el }"
                      :class="[
                        'hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors',
                        isToday(day) ? 'bg-secondary/10 dark:bg-secondary/20' : ''
                      ]"
                    >
                      <td class="py-3 px-4 font-medium text-sm text-dark dark:text-white whitespace-nowrap">
                        <span v-if="isToday(day)" class="inline-block w-2 h-2 rounded-full bg-secondary mr-2"></span>
                        {{ formatDate(day.date.readable) }}
                      </td>
                      <td class="py-3 px-4 font-mono text-sm text-gray-500 dark:text-white/60">{{ cleanTime(day.timings.Imsak) }}</td>
                      <td class="py-3 px-4 font-mono text-sm text-dark dark:text-white font-semibold">{{ cleanTime(day.timings.Fajr) }}</td>
                      <td class="py-3 px-4 font-mono text-sm text-gray-500 dark:text-white/60">{{ cleanTime(day.timings.Sunrise) }}</td>
                      <td class="py-3 px-4 font-mono text-sm text-dark dark:text-white font-semibold">{{ cleanTime(day.timings.Dhuhr) }}</td>
                      <td class="py-3 px-4 font-mono text-sm text-dark dark:text-white font-semibold">{{ cleanTime(day.timings.Asr) }}</td>
                      <td class="py-3 px-4 font-mono text-sm text-dark dark:text-white font-semibold">{{ cleanTime(day.timings.Maghrib) }}</td>
                      <td class="py-3 px-4 font-mono text-sm text-dark dark:text-white font-semibold">{{ cleanTime(day.timings.Isha) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { X, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean,
  lat: Number,
  lng: Number
})

const emit = defineEmits(['close'])

const loading = ref(false)
const error = ref('')
const calendarData = ref([])
const scrollContainer = ref(null)
const todayMobileRef = ref(null)
const todayDesktopRef = ref(null)

const currentDateObj = new Date()
const currentMonth = ref(currentDateObj.getMonth() + 1)
const currentYear = ref(currentDateObj.getFullYear())

const monthNames = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]
const monthName = computed(() => monthNames[currentMonth.value - 1])

const isToday = (dayData) => {
  const d = new Date()
  const todayStr = `${String(d.getDate()).padStart(2, '0')} ${monthNames[d.getMonth()].substring(0,3)} ${d.getFullYear()}`
  return dayData.date.readable.includes(todayStr)
}

const formatDate = (dateStr) => {
  // Aladhan returns something like "01 Jun 2026"
  return dateStr
}

const cleanTime = (timeStr) => {
  // Remove the timezone part if present like "04:30 (WIB)" -> "04:30"
  return timeStr.substring(0, 5)
}

const fetchCalendar = async () => {
  if (!props.lat || !props.lng) return
  
  loading.value = true
  error.value = ''
  
  try {
    const url = `https://api.aladhan.com/v1/calendar/${currentYear.value}/${currentMonth.value}?latitude=${props.lat}&longitude=${props.lng}&method=20`
    const res = await fetch(url)
    const data = await res.json()
    
    if (data.code === 200) {
      calendarData.value = data.data
      // Auto-scroll ke hari ini setelah data dimuat
      await nextTick()
      scrollToToday()
    } else {
      error.value = 'Gagal mengambil data jadwal.'
    }
  } catch (err) {
    console.error(err)
    error.value = 'Terjadi kesalahan jaringan.'
  } finally {
    loading.value = false
  }
}

const changeMonth = (offset) => {
  let newMonth = currentMonth.value + offset
  let newYear = currentYear.value
  
  if (newMonth > 12) {
    newMonth = 1
    newYear++
  } else if (newMonth < 1) {
    newMonth = 12
    newYear--
  }
  
  currentMonth.value = newMonth
  currentYear.value = newYear
  fetchCalendar()
}

const scrollToToday = () => {
  setTimeout(() => {
    const target = todayMobileRef.value || todayDesktopRef.value
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, 150)
}

const resetToToday = () => {
  const d = new Date()
  currentMonth.value = d.getMonth() + 1
  currentYear.value = d.getFullYear()
  fetchCalendar()
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
    if (calendarData.value.length === 0) {
      resetToToday()
    }
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(197, 165, 90, 0.5);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(197, 165, 90, 0.8);
}
</style>
