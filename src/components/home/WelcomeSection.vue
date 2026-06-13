<template>
  <section id="tentang" class="relative py-8 lg:py-10 bg-cream dark:bg-[#121220] overflow-hidden transition-colors duration-500">
    <!-- Animated Islamic Pattern Background -->
    <IslamicPattern pattern-color="#0D4F4F" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <!-- Left: Text Content -->
        <div ref="textContent">
          <!-- Section Label -->
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span class="text-primary text-xs font-semibold tracking-wider uppercase">Tentang Kami</span>
          </div>

          <h2 class="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark dark:text-white mb-6 leading-tight transition-colors duration-500">
            Selamat Datang di
            <span class="text-primary dark:text-secondary">Masjid Jami Kassiti</span>
          </h2>

          <div class="section-divider mb-8"></div>

          <p class="text-dark/60 dark:text-white/60 text-base sm:text-lg leading-relaxed mb-6 transition-colors duration-500 whitespace-pre-line text-justify">{{ settings.history }}</p>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4 sm:gap-6">
            <div 
              v-for="(stat, index) in stats"
              :key="stat.label"
              @click="stat.isClickable ? isCommitteeModalOpen = true : null"
              :class="[
                'text-center p-4 rounded-2xl bg-light dark:bg-white/5 shadow-md border transition-all duration-300 relative overflow-hidden',
                stat.isClickable 
                  ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1 border-primary/20 dark:border-white/20 hover:border-primary/40 dark:hover:border-secondary/40 group' 
                  : 'border-primary/5 dark:border-white/10 hover:shadow-lg hover:border-primary/10'
              ]"
            >
              <!-- Animated background for clickable stat -->
              <div v-if="stat.isClickable" class="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent dark:from-secondary/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div :class="['relative z-10 font-heading text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 transition-colors flex items-baseline justify-center gap-1', stat.isClickable ? 'text-primary dark:text-secondary group-hover:scale-105' : 'text-primary dark:text-secondary']">
                <span>{{ stat.prefix }}{{ stat.displayValue }}</span>
                <span v-if="stat.suffix" :class="stat.suffix.trim().length > 1 ? 'text-sm sm:text-base font-semibold opacity-90' : ''">{{ stat.suffix.trim() }}</span>
              </div>
              <p :class="['relative z-10 text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-1', stat.isClickable ? 'text-dark dark:text-white group-hover:text-primary dark:group-hover:text-secondary' : 'text-gray-600 dark:text-gray-400']">
                {{ stat.label }}
                <ArrowRight v-if="stat.isClickable" class="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </p>
            </div>
          </div>
        </div>

        <!-- Right: Image -->
        <div ref="imageContent" class="relative">
          <div class="relative rounded-3xl overflow-hidden shadow-2xl">
            <img :src="settings.historyImage || interiorImg" alt="Interior Masjid Jami Kassiti" class="w-full h-[400px] lg:h-[550px] object-cover" />
            <div class="absolute inset-0 bg-linear-to-t from-primary/30 to-transparent"></div>
          </div>

          <!-- Floating Card -->
          <div class="absolute -bottom-6 -left-6 bg-white dark:bg-dark-light rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-white/5 max-w-[280px] z-10">
            <div class="flex items-center gap-4 mb-3">
              <MosqueLogo variant="icon" :iconSize="48" class="text-primary dark:text-secondary drop-shadow-md" />
              <h4 class="font-heading text-xl font-bold text-dark dark:text-white leading-tight">{{ settings.floatingCardTitle }}</h4>
            </div>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{{ settings.floatingCardDesc }}</p>
          </div>

          <!-- Decorative Element -->
          <div class="absolute -top-4 -right-4 w-24 h-24 border-2 border-secondary/30 rounded-3xl -z-10"></div>
        </div>
      </div>
    </div>

    <!-- Committee Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="isCommitteeModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div class="absolute inset-0 bg-dark/80 backdrop-blur-md" @click="isCommitteeModalOpen = false"></div>
          
          <div class="modal-content relative w-full max-w-5xl bg-white dark:bg-dark-light rounded-3xl shadow-2xl flex flex-col h-[calc(100vh-3rem)] sm:h-[85vh] sm:max-h-[800px] border border-white/20 dark:border-white/10 overflow-hidden" role="dialog" aria-modal="true">
            <!-- Modal Background Pattern (Unique & Animated) -->
            <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <!-- Background Image -->
              <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] mix-blend-luminosity">
                <img :src="interiorImg" class="w-full h-full object-cover blur-sm scale-110" alt="" />
              </div>
              
              <!-- Animated Glowing Blobs -->
              <div class="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-primary/20 dark:bg-primary/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] sm:blur-[120px] animate-[pulse_8s_ease-in-out_infinite]"></div>
              <div class="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-secondary/20 dark:bg-secondary/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] sm:blur-[120px] animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>
              
              <!-- Islamic Pattern -->
              <IslamicPattern pattern-color="#C5A55A" :show-sparkles="true" class="absolute inset-0 opacity-10 dark:opacity-10 mix-blend-multiply dark:mix-blend-screen scale-150 transform-gpu animate-[pulse_6s_ease-in-out_infinite]" />
              
              <!-- Overlay Gradients for Readability -->
              <div class="absolute inset-0 bg-linear-to-b from-white/40 via-white/80 to-white dark:from-dark-light/60 dark:via-dark-light/90 dark:to-dark-light"></div>
            </div>

            <!-- Header -->
            <div class="relative shrink-0 h-36 sm:h-48 z-10 overflow-hidden">
              <!-- Rich Gradient Background -->
              <div class="absolute inset-0 bg-linear-to-r from-emerald-950 via-emerald-850 to-emerald-900"></div>
              
              <!-- Calligraphy / Mosaic Background Image (Clear and Elegant) -->
              <div class="absolute inset-0 opacity-15 dark:opacity-20 mix-blend-overlay">
                <img :src="kaligrafiImg" class="w-full h-full object-cover scale-105 pointer-events-none select-none" alt="" />
              </div>
              
              <!-- Subtle Islamic Pattern Overlay -->
              <IslamicPattern pattern-color="#C5A55A" :show-sparkles="true" class="opacity-20 mix-blend-overlay scale-110 transform-gpu animate-[pulse_5s_ease-in-out_infinite]" />
              
              <!-- Dark gradient overlay to ensure text readability -->
              <div class="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent"></div>
              
              <button @click="isCommitteeModalOpen = false" class="absolute top-4 right-4 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/10 backdrop-blur-md transition-all duration-300 z-20" aria-label="Tutup">
                <X class="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              
              <!-- Content Header -->
              <div class="absolute inset-0 flex flex-col items-center justify-center z-10 pt-4 px-4">
                <!-- Gold Badge Icon -->
                <div class="w-11 h-11 sm:w-16 sm:h-16 rounded-2xl bg-linear-to-br from-amber-400 to-amber-600 border border-amber-300/30 flex items-center justify-center shadow-lg mb-2 group">
                  <Users class="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <!-- Premium High-contrast Typography -->
                <h3 class="font-heading text-lg sm:text-2xl font-extrabold text-white uppercase tracking-wider mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">Pengurus DKM</h3>
                <p class="text-amber-100/90 text-[10px] sm:text-xs text-center max-w-lg leading-tight font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">Mengenal lebih dekat para pelayan jamaah Masjid Jami Kassiti periode 2023-2026.</p>
              </div>
            </div>

            <!-- Sticky Tab Switcher -->
            <div class="relative shrink-0 z-20 flex justify-center py-3.5 bg-white/95 dark:bg-[#151d2c]/95 border-b border-gray-200/50 dark:border-white/5 px-4 backdrop-blur-md">
              <div class="bg-gray-200/50 dark:bg-white/5 p-1 rounded-2xl flex shadow-inner border border-gray-300/30 dark:border-white/5 max-w-sm w-full">
                <button 
                  @click="activeTab = 'pengurus'" 
                  :class="activeTab === 'pengurus' ? 'bg-primary text-white font-bold shadow-md' : 'text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white'"
                  class="flex-1 py-2 text-xs sm:text-sm rounded-xl transition-all duration-300 font-semibold"
                >
                  Dewan Pengurus
                </button>
                <button 
                  @click="activeTab = 'penasihat'" 
                  :class="activeTab === 'penasihat' ? 'bg-primary text-white font-bold shadow-md' : 'text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-white'"
                  class="flex-1 py-2 text-xs sm:text-sm rounded-xl transition-all duration-300 font-semibold"
                >
                  Dewan Penasihat
                </button>
              </div>
            </div>

            <!-- Content -->
            <div class="relative flex-1 overflow-y-auto pt-6 pb-12 px-4 sm:px-8 hide-scrollbar z-10 -webkit-overflow-scrolling-touch">

              <!-- Dewan Penasihat View -->
              <div v-if="activeTab === 'penasihat'" class="space-y-6 max-w-5xl mx-auto mt-2">
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 justify-center">
                  <div 
                    v-for="member in dewanPenasihat" 
                    :key="member.name" 
                    :class="member.role === 'Ketua RW 07' ? 'col-span-2 sm:col-span-3 lg:col-span-4 border-indigo-500/40 dark:border-indigo-400/40 bg-indigo-500/5 dark:bg-indigo-400/5 ring-1 ring-indigo-500/30 dark:ring-indigo-400/30 shadow-md p-6 sm:p-8' : 'bg-white/80 dark:bg-white/[0.03] border-gray-200/50 dark:border-white/10 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1'"
                    class="backdrop-blur-md border flex flex-col items-center text-center rounded-2xl transition-all duration-300 group"
                  >
                    <!-- Elegant Avatar with Photo or Gradient Avatar with Initials (Enlarged) -->
                    <div class="relative rounded-full mb-4 shadow-lg ring-4 overflow-hidden group-hover:scale-105 transition-all duration-300 flex items-center justify-center"
                         :class="[
                           member.role === 'Ketua RW 07' ? 'w-24 h-24 sm:w-28 sm:h-28 ring-indigo-500/20' : 'w-20 h-20 sm:w-24 sm:h-24 ring-indigo-500/10',
                           member.image ? '' : 'bg-linear-to-br from-indigo-500 to-purple-600 text-white font-extrabold text-xl sm:text-2xl'
                         ]">
                      <img v-if="member.image" :src="member.image" :alt="member.name" class="w-full h-full object-cover" />
                      <span v-else>{{ getInitials(member.name) }}</span>
                    </div>
                    <h4 :class="member.role === 'Ketua RW 07' ? 'text-sm sm:text-base mb-2 font-black' : 'text-xs sm:text-sm mb-1.5 min-h-[2.5rem] flex items-center justify-center'" class="font-heading font-bold text-gray-950 dark:text-white leading-snug">{{ member.name }}</h4>
                    <span :class="member.role === 'Ketua RW 07' ? 'text-[11px] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-3.5 py-1.5 rounded-full font-extrabold shadow-sm' : 'text-[10px] text-indigo-600 dark:text-indigo-400 font-bold'" class="tracking-wider uppercase">{{ member.role }}</span>
                  </div>
                </div>
              </div>

              <!-- Dewan Pengurus View -->
              <div v-if="activeTab === 'pengurus'" class="space-y-10 max-w-5xl mx-auto mt-2">
                
                <!-- Pengurus Harian Sub-section -->
                <div class="space-y-6">
                  <div class="text-center">
                    <h4 class="text-[10px] font-extrabold uppercase tracking-widest text-primary dark:text-secondary mb-1">Pengurus Harian</h4>
                    <div class="h-0.5 w-8 bg-primary dark:bg-secondary mx-auto rounded-full"></div>
                  </div>
                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 justify-center">
                    <div 
                      v-for="member in pengurusHarian" 
                      :key="member.name"
                      :class="member.isLeader ? 'border-primary/40 dark:border-secondary/40 bg-primary/[0.02] dark:bg-secondary/[0.02] ring-1 ring-primary/20 dark:ring-secondary/20 shadow-md col-span-2 sm:col-span-1' : 'bg-white/80 dark:bg-white/[0.03] border-gray-200/50 dark:border-white/10 shadow-sm'"
                      class="rounded-2xl p-5 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <!-- Officer Photo or elegant Gradient Avatar with Initials -->
                      <div class="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-2 shadow-lg ring-4 overflow-hidden group-hover:scale-105 transition-all duration-300 flex items-center justify-center"
                           :class="member.isLeader ? 'ring-amber-500/10' : 'ring-emerald-500/10'">
                        <img v-if="member.image" :src="member.image" :alt="member.name" class="w-full h-full object-cover" />
                        <div v-else :class="member.isLeader ? 'bg-linear-to-br from-amber-400 to-amber-600' : 'bg-linear-to-br from-emerald-400 to-teal-600'" class="w-full h-full flex items-center justify-center text-white font-extrabold text-xl sm:text-2xl">
                          {{ getInitials(member.name) }}
                        </div>
                      </div>
                      <h4 class="font-heading text-xs sm:text-sm font-bold text-gray-950 dark:text-white leading-snug mb-0.5 min-h-[2.2rem] flex items-end justify-center">{{ member.name }}</h4>
                      <span 
                        :class="member.isLeader ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'"
                        class="text-[10px] font-bold tracking-wider uppercase"
                      >
                        {{ member.role }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Divisi & Seksi Sub-section -->
                <div class="space-y-8">
                  <div class="text-center">
                    <h4 class="text-[10px] font-extrabold uppercase tracking-widest text-primary dark:text-secondary mb-1">Divisi & Seksi Kerja</h4>
                    <div class="h-0.5 w-8 bg-primary dark:bg-secondary mx-auto rounded-full"></div>
                  </div>

                  <!-- Sections Grid (Full width per section with a clean 2x2 grid style) -->
                  <div class="space-y-8">
                    
                    <!-- Seksi Pendidikan dan Dakwah -->
                    <div class="bg-white/40 dark:bg-white/[0.01] border border-gray-200/50 dark:border-white/5 rounded-3xl p-5 sm:p-6 shadow-sm">
                      <h5 class="font-heading text-xs sm:text-sm font-bold text-gray-950 dark:text-white mb-6 flex items-center gap-2 border-b border-gray-200/50 dark:border-white/5 pb-3">
                        <span class="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-md"></span>
                        Seksi Pendidikan & Dakwah
                      </h5>
                      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        <div v-for="(member, index) in seksiDakwah" :key="member.name" class="bg-white/80 dark:bg-white/[0.03] backdrop-blur-md border border-gray-200/50 dark:border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                          <!-- Large Centered Avatar or Image -->
                          <div class="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full mb-2 shadow-md ring-4 overflow-hidden group-hover:scale-105 transition-all duration-300 flex items-center justify-center"
                               :class="member.image ? 'ring-blue-500/10' : 'ring-blue-500/10 bg-linear-to-br from-blue-400 to-indigo-500 text-white font-extrabold text-lg sm:text-xl'">
                            <img v-if="member.image" :src="member.image" :alt="member.name" class="w-full h-full object-cover" />
                            <span v-else>{{ getInitials(member.name) }}</span>
                          </div>
                          <p class="text-xs sm:text-sm font-bold text-gray-950 dark:text-white leading-snug mb-0.5 min-h-[2.2rem] flex items-end justify-center">{{ member.name }}</p>
                          <p :class="index === 0 ? 'text-blue-600 dark:text-blue-400 font-extrabold' : 'text-gray-500 dark:text-gray-400 font-bold'" class="text-[9px] uppercase tracking-wider">{{ index === 0 ? 'Koordinator' : 'Anggota' }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Seksi Ekonomi & Wakaf -->
                    <div class="bg-white/40 dark:bg-white/[0.01] border border-gray-200/50 dark:border-white/5 rounded-3xl p-5 sm:p-6 shadow-sm">
                      <h5 class="font-heading text-xs sm:text-sm font-bold text-gray-950 dark:text-white mb-6 flex items-center gap-2 border-b border-gray-200/50 dark:border-white/5 pb-3">
                        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-md"></span>
                        Seksi Ekonomi & Wakaf
                      </h5>
                      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        <div v-for="(member, index) in seksiEkonomi" :key="member.name" class="bg-white/80 dark:bg-white/[0.03] backdrop-blur-md border border-gray-200/50 dark:border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                          <!-- Large Centered Avatar or Image -->
                          <div class="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full mb-2 shadow-md ring-4 overflow-hidden group-hover:scale-105 transition-all duration-300 flex items-center justify-center"
                               :class="member.image ? 'ring-emerald-500/10' : 'ring-emerald-500/10 bg-linear-to-br from-emerald-400 to-teal-500 text-white font-extrabold text-lg sm:text-xl'">
                            <img v-if="member.image" :src="member.image" :alt="member.name" class="w-full h-full object-cover" />
                            <span v-else>{{ getInitials(member.name) }}</span>
                          </div>
                          <p class="text-xs sm:text-sm font-bold text-gray-950 dark:text-white leading-snug mb-0.5 min-h-[2.2rem] flex items-end justify-center">{{ member.name }}</p>
                          <p :class="index === 0 ? 'text-emerald-600 dark:text-emerald-400 font-extrabold' : 'text-gray-500 dark:text-gray-400 font-bold'" class="text-[9px] uppercase tracking-wider">{{ index === 0 ? 'Koordinator' : 'Anggota' }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Seksi Peralatan & Logistik -->
                    <div class="bg-white/40 dark:bg-white/[0.01] border border-gray-200/50 dark:border-white/5 rounded-3xl p-5 sm:p-6 shadow-sm">
                      <h5 class="font-heading text-xs sm:text-sm font-bold text-gray-950 dark:text-white mb-6 flex items-center gap-2 border-b border-gray-200/50 dark:border-white/5 pb-3">
                        <span class="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-md"></span>
                        Seksi Peralatan & Logistik
                      </h5>
                      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        <div v-for="(member, index) in seksiLogistik" :key="member.name" class="bg-white/80 dark:bg-white/[0.03] backdrop-blur-md border border-gray-200/50 dark:border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                          <!-- Large Centered Avatar or Image -->
                          <div class="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full mb-2 shadow-md ring-4 overflow-hidden group-hover:scale-105 transition-all duration-300 flex items-center justify-center"
                               :class="member.image ? 'ring-orange-500/10' : 'ring-orange-500/10 bg-linear-to-br from-orange-400 to-amber-500 text-white font-extrabold text-lg sm:text-xl'">
                            <img v-if="member.image" :src="member.image" :alt="member.name" class="w-full h-full object-cover" />
                            <span v-else>{{ getInitials(member.name) }}</span>
                          </div>
                          <p class="text-xs sm:text-sm font-bold text-gray-950 dark:text-white leading-snug mb-0.5 min-h-[2.2rem] flex items-end justify-center">{{ member.name }}</p>
                          <p :class="index === 0 ? 'text-orange-600 dark:text-orange-400 font-extrabold' : 'text-gray-500 dark:text-gray-400 font-bold'" class="text-[9px] uppercase tracking-wider">{{ index === 0 ? 'Koordinator' : 'Anggota' }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Remaja Masjid -->
                    <div class="bg-white/40 dark:bg-white/[0.01] border border-gray-200/50 dark:border-white/5 rounded-3xl p-5 sm:p-6 shadow-sm">
                      <h5 class="font-heading text-xs sm:text-sm font-bold text-gray-950 dark:text-white mb-6 flex items-center gap-2 border-b border-gray-200/50 dark:border-white/5 pb-3">
                        <span class="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-md"></span>
                        Remaja Masjid
                      </h5>
                      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        <div v-for="(member, index) in remajaMasjid" :key="member.name" class="bg-white/80 dark:bg-white/[0.03] backdrop-blur-md border border-gray-200/50 dark:border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                          <!-- Large Centered Avatar or Image -->
                          <div class="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full mb-2 shadow-md ring-4 overflow-hidden group-hover:scale-105 transition-all duration-300 flex items-center justify-center"
                               :class="member.image ? 'ring-pink-500/10' : 'ring-pink-500/10 bg-linear-to-br from-pink-400 to-rose-500 text-white font-extrabold text-lg sm:text-xl'">
                            <img v-if="member.image" :src="member.image" :alt="member.name" class="w-full h-full object-cover" />
                            <span v-else>{{ getInitials(member.name) }}</span>
                          </div>
                          <p class="text-xs sm:text-sm font-bold text-gray-950 dark:text-white leading-snug mb-0.5 min-h-[2.2rem] flex items-end justify-center">{{ member.name }}</p>
                          <p :class="index === 0 ? 'text-pink-600 dark:text-pink-400 font-extrabold' : 'text-gray-500 dark:text-gray-400 font-bold'" class="text-[9px] uppercase tracking-wider">{{ index === 0 ? 'Koordinator' : 'Anggota' }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, watch, onUnmounted, computed } from 'vue'
import { Users, User, X, ArrowRight } from 'lucide-vue-next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IslamicPattern from '@/components/ui/IslamicPattern.vue'
import MosqueLogo from '@/components/ui/MosqueLogo.vue'
import interiorImage from '@/assets/images/mosque-interior.png'
import dkmNasai from '@/assets/images/dkm-nasai.png'
import dkmRandi from '@/assets/images/dkm-randi.png'
import dkmRofik from '@/assets/images/M Ainur Rofiq.jpeg'
import dkmIrvan from '@/assets/images/Ivan Ruchiat.jpeg'
import dkmDani from '@/assets/images/Dani Ramdhani.jpeg'
import bpkAli from '@/assets/images/Ali M Abduh.jpeg'
import bpkGojali from '@/assets/images/Gojali Abdul S.jpeg'
import bpkRedi from '@/assets/images/H Redi Sasriandi.jpeg'
import bpkNanang from '@/assets/images/Nanang Barkah.jpeg'
import bpkSukardi from '@/assets/images/Sukardi.jpeg'
import usthAi from '@/assets/images/Usth. Ai Jamaliah.jpeg'
import usthNeneng from '@/assets/images/Usth. Neneng Aam.jpeg'
import usthRani from '@/assets/images/Usth. Rani Rahmayati.jpeg'
import penasihatIwa from '@/assets/images/Ust. H Iwa Penasihat.jpeg'
import penasihatAde from '@/assets/images/Ust. H Ade Karom.jpeg'
import penasihatSudiana from '@/assets/images/Bpk. Sudiana Maska.jpeg'
import penasihatUsman from '@/assets/images/H Usman penasihat.jpeg'
import penasihatAyi from '@/assets/images/Bpk. Ayi Sunarwan.jpeg'
import usthDede from '@/assets/images/Usth. Dede Asiah.jpeg'
import bpkAditya from '@/assets/images/Bpk. Aditya Astra P.jpeg'
import usthRini from '@/assets/images/Usth. Rini Dewi Anggiani.jpeg'
import usthRayanthi from '@/assets/images/Usth.Rayanthi.jpeg'
import kaligrafiImage from '@/assets/images/kaligrafi_masjid.png'
import { useAdminStore } from '@/stores/admin'

gsap.registerPlugin(ScrollTrigger)

const adminStore = useAdminStore()
const settings = computed(() => adminStore.generalSettings)

const interiorImg = interiorImage
const kaligrafiImg = kaligrafiImage
const textContent = ref(null)
const imageContent = ref(null)
const isCommitteeModalOpen = ref(false)
const activeTab = ref('pengurus')

// Watch modal state to toggle body scroll lock
watch(isCommitteeModalOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

const getInitials = (name) => {
  if (!name) return ''
  const cleanName = name
    .replace(/^(Ust\.|Usth\.|Bpk\.|Bapak|H\.|Hj\.)\s+/i, '')
    .trim()
  const parts = cleanName.split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return parts[0] ? parts[0][0].toUpperCase() : ''
}

const dewanPenasihat = [
  { name: 'Bpk. Ayi Sunarwan', role: 'Ketua RW 07', image: penasihatAyi },
  { name: 'Ust. H. Iwa Kurniawan', role: 'Dewan Penasihat', image: penasihatIwa },
  { name: 'Ust. H. Ade Karom', role: 'Dewan Penasihat', image: penasihatAde },
  { name: 'Bpk. Sudiana Maska', role: 'Dewan Penasihat', image: penasihatSudiana },
  { name: 'Bpk. H. Usman', role: 'Dewan Penasihat', image: penasihatUsman }
]

const pengurusHarian = [
  { name: "Ust. H. Ahmad Nasa'i", role: 'Ketua DKMJ', isLeader: true, image: dkmNasai },
  { name: 'Ust. H. M. Ainur Rofik', role: 'Sekretaris', image: dkmRofik },
  { name: 'Ust. Randi Rizal', role: 'Bendahara', image: dkmRandi }
]

const seksiDakwah = [
  { name: 'Ust. H. Irvan Ruchiat', role: 'Anggota Dakwah & Pendidikan', image: dkmIrvan },
  { name: 'Ust. H. Dani Ramdhani', role: 'Anggota Dakwah & Pendidikan', image: dkmDani },
  { name: 'Usth. Neneng Aam Siti Marhamah', role: 'Anggota Dakwah & Pendidikan', image: usthNeneng },
  { name: 'Usth. Ai Jamaliah', role: 'Anggota Dakwah & Pendidikan', image: usthAi },
  { name: 'Usth. Rini Dewi Anggiani', role: 'Anggota Dakwah & Pendidikan', image: usthRini },
  { name: 'Usth. Dede Asiah', role: 'Anggota Dakwah & Pendidikan', image: usthDede }
]

const seksiEkonomi = [
  { name: 'Bpk. Ali M. Abduh', role: 'Anggota Ekonomi & Wakaf', image: bpkAli },
  { name: 'Bpk. Ujang Kurnia', role: 'Anggota Ekonomi & Wakaf' },
  { name: 'Bpk. Erwin Darmawan', role: 'Anggota Ekonomi & Wakaf' },
  { name: 'Bpk. Ade Ramdhani', role: 'Anggota Ekonomi & Wakaf' }
]

const seksiLogistik = [
  { name: 'Bpk. H. Redi Sasriandi', role: 'Anggota Peralatan & Logistik', image: bpkRedi },
  { name: 'Bpk. Aditya Astra Prayudha', role: 'Anggota Peralatan & Logistik', image: bpkAditya },
  { name: 'Bpk. Sukardi', role: 'Anggota Peralatan & Logistik', image: bpkSukardi },
  { name: 'Bpk. Nanang Barkah', role: 'Anggota Peralatan & Logistik', image: bpkNanang }
]

const remajaMasjid = [
  { name: 'Bpk. Gojali Abdul Syafi\'i', role: 'Remaja Masjid', image: bpkGojali },
  { name: 'Usth. Rani Rahmayati', role: 'Remaja Masjid', image: usthRani },
  { name: 'Usth. Rayanthi', role: 'Remaja Masjid', image: usthRayanthi }
]

const stats = reactive([
  { label: 'Pengurus DKM', get value() { return adminStore.committee ? Object.values(adminStore.committee).flat().length : 0 }, displayValue: 0, prefix: '', suffix: ' Orang', isClickable: true },
  { label: 'Tahun Berdiri', get value() { return settings.value.tahunBerdiri || 2015 }, displayValue: 0, prefix: '', suffix: '', isClickable: false },
  { label: 'Jamaah Aktif', get value() { return settings.value.jamaahAktif || 200 }, displayValue: 0, prefix: '', suffix: '+', isClickable: false },
])

onMounted(() => {
  if (textContent.value) {
    gsap.fromTo(textContent.value, { opacity: 0, x: -60 }, {
      opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '#tentang', start: 'top 75%', once: true },
    })
  }

  if (imageContent.value) {
    gsap.fromTo(imageContent.value, { opacity: 0, x: 60 }, {
      opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '#tentang', start: 'top 75%', once: true },
    })
  }

  stats.forEach((stat) => {
    gsap.to(stat, {
      displayValue: stat.value, duration: 2, ease: 'power2.out',
      snap: { displayValue: 1 },
      scrollTrigger: { trigger: '#tentang', start: 'top 70%', once: true },
    })
  })
})
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
