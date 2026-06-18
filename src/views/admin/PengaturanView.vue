<template>
  <form @submit.prevent="saveSettings" class="space-y-6 sm:space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Pengaturan Umum</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola preferensi sistem, konten website, dan data utama.</p>
      </div>
      <button 
        ref="topButtonRef"
        type="submit"
        :disabled="isSaving"
        class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-4 py-2 rounded-lg transition-colors shadow-md text-sm flex items-center gap-2 justify-center shrink-0 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <span v-if="isSaving" class="w-4 h-4 border-2 border-white/30 dark:border-gray-950/30 border-t-white dark:border-t-gray-950 rounded-full animate-spin"></span>
        <Save v-else class="w-4 h-4" />
        <span>{{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}</span>
      </button>
    </div>

    <!-- 2-Column Layout -->
    <div class="flex flex-col md:flex-row gap-6 md:gap-8 items-start relative">
      
      <!-- Navigasi Kiri (Sidebar) -->
      <div class="w-full md:w-64 shrink-0 bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 p-2 rounded-xl shadow-sm md:sticky md:top-6 overflow-x-auto md:overflow-visible">
        <div class="flex md:flex-col gap-1 min-w-max md:min-w-0">
          <button 
            v-for="tab in settingTabs" 
            :key="tab.id"
            type="button"
            @click="activeSettingTab = tab.id"
            :class="activeSettingTab === tab.id 
              ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'"
            class="flex items-center gap-3 px-4 md:px-3 py-2.5 rounded-lg transition-all text-sm text-left whitespace-nowrap md:whitespace-normal"
          >
            <component :is="tab.icon" class="w-4 h-4 shrink-0" :class="activeSettingTab === tab.id ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'" />
            <span>{{ tab.name }}</span>
          </button>
        </div>
      </div>

      <!-- Area Konten Kanan -->
      <div class="flex-1 w-full min-w-0">
        
        <!-- Tab: Profil & Sejarah -->
        <section v-show="activeSettingTab === 'profil'" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md animate-fade-in">
          <div class="p-6 sm:p-8 border-b border-gray-300 dark:border-white/5">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
              <Globe class="w-5 h-5 text-gray-400" />
              Profil & Sejarah
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Informasi ini akan ditampilkan secara publik di halaman beranda.</p>
          </div>
          
          <div class="p-6 sm:p-8 space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Teks Lokasi (Beranda)</label>
                <input 
                  v-model="settings.name"
                  placeholder="Misal: Perum Arjamukti Kencana"
                  type="text" 
                  class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                />
              </div>
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Slogan Utama (Hero)</label>
                <textarea 
                  v-model="settings.slogan"
                  rows="2"
                  placeholder="Gunakan tanda bintang *kata* untuk efek teks emas"
                  class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all resize-none text-sm shadow-md"
                ></textarea>
                <p class="text-xs text-gray-500">Tekan Enter untuk baris baru. Apit kata dengan bintang (*Iman*) untuk efek warna emas.</p>
              </div>
            </div>
            
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi Sambutan (Hero Paragraf)</label>
              <textarea 
                v-model="settings.description"
                rows="3"
                class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all resize-none text-sm shadow-md"
              ></textarea>
              <p class="text-xs text-gray-500">Teks ini akan muncul tepat di bawah slogan utama di halaman pertama.</p>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-300 dark:border-white/5">
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Judul Floating Card (Sejarah)</label>
                <input 
                  v-model="settings.floatingCardTitle"
                  type="text" 
                  class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                />
              </div>
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi Floating Card</label>
                <input 
                  v-model="settings.floatingCardDesc"
                  type="text" 
                  class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                />
              </div>
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Tahun Berdiri (Statistik)</label>
                <input 
                  v-model="settings.tahunBerdiri"
                  type="number" 
                  class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                />
              </div>
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Estimasi Jamaah Aktif (Statistik)</label>
                <input 
                  v-model="settings.jamaahAktif"
                  type="number" 
                  class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                />
              </div>
            </div>

            <div class="space-y-4 mt-6 pt-6 border-t border-gray-300 dark:border-white/5">
              <h4 class="text-sm font-bold text-gray-900 dark:text-white">Pengaturan Gambar Landing Page</h4>
              
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Pilih Gambar Hero Slider (Bisa pilih lebih dari satu)</label>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-60 overflow-y-auto p-2 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg">
                  <label v-for="item in adminStore.gallery" :key="'hero-'+item.id" class="cursor-pointer group relative rounded-lg overflow-hidden border-2 transition-all" :class="settings.heroImages.includes(item.image) ? 'border-secondary' : 'border-transparent'">
                    <input type="checkbox" :value="item.image" v-model="settings.heroImages" class="hidden" />
                    <img :src="item.image" class="w-full h-20 object-cover" />
                    <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span class="text-white text-xs font-bold text-center px-1">{{ item.caption }}</span>
                    </div>
                    <div v-if="settings.heroImages.includes(item.image)" class="absolute top-1 right-1 bg-secondary text-white rounded-full p-0.5 shadow-md">
                      <Check class="w-3 h-3" />
                    </div>
                  </label>
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Pilih Gambar Pendamping Sejarah Singkat (Pilih satu)</label>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-60 overflow-y-auto p-2 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg">
                  <label v-for="item in adminStore.gallery" :key="'hist-'+item.id" class="cursor-pointer group relative rounded-lg overflow-hidden border-2 transition-all" :class="settings.historyImage === item.image ? 'border-secondary' : 'border-transparent'">
                    <input type="radio" :value="item.image" v-model="settings.historyImage" class="hidden" />
                    <img :src="item.image" class="w-full h-20 object-cover" />
                    <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span class="text-white text-xs font-bold text-center px-1">{{ item.caption }}</span>
                    </div>
                    <div v-if="settings.historyImage === item.image" class="absolute top-1 right-1 bg-secondary text-white rounded-full p-0.5 shadow-md">
                      <Check class="w-3 h-3" />
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div class="space-y-1.5 border-t border-gray-300 dark:border-white/5 pt-6 mt-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Sejarah Singkat (Tentang Kami)</label>
              <textarea 
                v-model="settings.history"
                rows="6"
                placeholder="Tuliskan sejarah singkat masjid di sini..."
                class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all resize-y text-sm shadow-md"
              ></textarea>
            </div>
          </div>
        </section>

        <!-- Tab: Kontak & Lokasi -->
        <section v-show="activeSettingTab === 'kontak'" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md animate-fade-in">
          <div class="p-6 sm:p-8 border-b border-gray-300 dark:border-white/5">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
              <LinkIcon class="w-5 h-5 text-gray-400" />
              Kontak & Lokasi
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola informasi alamat, nomor kontak, dan tautan sosial media resmi masjid.</p>
          </div>
          
          <div class="p-6 sm:p-8 space-y-10">
            <!-- Grup 1: Informasi Alamat & Peta -->
            <div class="space-y-6">
              <h4 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-200 dark:border-white/10 pb-2">
                <MapPin class="w-4 h-4 text-secondary" /> Informasi Alamat & Peta
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="sm:col-span-2 space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Alamat Lengkap</label>
                  <textarea 
                    v-model="settings.alamatLengkap"
                    rows="2"
                    class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-secondary transition-all resize-none text-sm shadow-md"
                    placeholder="Misal: Jl. Raya Arjamukti Blok B No. 12..."
                  ></textarea>
                </div>
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kota / Kabupaten</label>
                  <input 
                    v-model="settings.kota"
                    type="text" 
                    class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                    placeholder="Misal: Kab. Tasikmalaya"
                  />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kode Pos</label>
                  <input 
                    v-model="settings.kodepos"
                    type="text" 
                    class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                    placeholder="Misal: 46461"
                  />
                </div>
                <div class="sm:col-span-2 space-y-1.5 pt-4">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Link Google Maps (URL)</label>
                  <input 
                    v-model="settings.maps"
                    type="url" 
                    class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                    placeholder="https://maps.google.com/..."
                  />
                  <p class="text-xs text-gray-500">Tautan langsung menuju titik lokasi di Google Maps.</p>
                </div>
                <div class="sm:col-span-2 space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Google Maps Iframe / Embed Code</label>
                  <textarea 
                    v-model="settings.mapsIframe"
                    rows="3"
                    class="w-full font-mono bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-secondary transition-all resize-y text-xs shadow-md"
                    placeholder='<iframe src="..."></iframe>'
                  ></textarea>
                  <p class="text-xs text-gray-500">Buka Google Maps > Bagikan > Sematkan Peta, lalu salin kode HTML-nya ke sini.</p>
                </div>
              </div>
            </div>

            <!-- Grup 2: Kontak Resmi -->
            <div class="space-y-6">
              <h4 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-200 dark:border-white/10 pb-2">
                <Phone class="w-4 h-4 text-secondary" /> Kontak Resmi
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Resmi</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail class="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      v-model="settings.email"
                      type="email" 
                      class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg pl-9 pr-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                      placeholder="info@masjidkassiti.com"
                    />
                  </div>
                </div>
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Telepon Kantor (Landline)</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone class="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      v-model="settings.teleponKantor"
                      type="tel" 
                      class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg pl-9 pr-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                      placeholder="022-1234567"
                    />
                  </div>
                </div>
              </div>

              <!-- Multiple WhatsApp Numbers -->
              <div class="space-y-4 pt-2">
                <div class="flex items-center justify-between">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nomor WhatsApp</label>
                    <p class="text-xs text-gray-500">Bisa menambahkan lebih dari satu kontak (Misal: Sekretariat, ZISWAF, Layanan Jenazah).</p>
                  </div>
                  <button type="button" @click="addWhatsapp" class="text-xs font-medium bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-md">
                    <Plus class="w-3.5 h-3.5" /> Tambah Kontak
                  </button>
                </div>
                <div class="bg-gray-50/80 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-white/10 p-4 space-y-3">
                  <div v-for="(wa, index) in settings.whatsapp" :key="wa.id || index" class="flex flex-col sm:flex-row gap-3 items-end sm:items-center">
                    <div class="flex-1 w-full space-y-1">
                      <label class="block text-xs font-medium text-gray-500 dark:text-gray-400">Nama / Bagian</label>
                      <input 
                        v-model="wa.name"
                        type="text" 
                        class="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-secondary transition-all text-sm"
                        placeholder="Misal: Informasi / Sekretariat atau Nama Orang"
                      />
                    </div>
                    <div class="flex-1 w-full space-y-1">
                      <label class="block text-xs font-medium text-gray-500 dark:text-gray-400">Nomor Telepon (Awali dengan 62)</label>
                      <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg class="h-4 w-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        </div>
                        <input 
                          v-model="wa.number"
                          type="tel" 
                          class="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg pl-9 pr-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-secondary transition-all text-sm"
                          placeholder="628..."
                        />
                      </div>
                    </div>
                    <button type="button" @click="removeWhatsapp(index)" class="p-2 text-gray-400 hover:text-red-500 bg-white hover:bg-red-50 dark:bg-gray-900 dark:hover:bg-red-500/10 border border-gray-200 dark:border-white/10 rounded-lg transition-colors mb-0.5" title="Hapus Kontak">
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Grup 3: Media Sosial -->
            <div class="space-y-6">
              <h4 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-gray-200 dark:border-white/10 pb-2">
                <Globe class="w-4 h-4 text-secondary" /> Media Sosial
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Link Instagram</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Instagram class="h-4 w-4 text-[#E1306C]" />
                    </div>
                    <input 
                      v-model="settings.instagram"
                      type="url" 
                      class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg pl-9 pr-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                    />
                  </div>
                </div>
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Link Facebook</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Facebook class="h-4 w-4 text-[#1877F2]" />
                    </div>
                    <input 
                      v-model="settings.facebook"
                      type="url" 
                      class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg pl-9 pr-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                    />
                  </div>
                </div>
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Link YouTube</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Youtube class="h-4 w-4 text-[#FF0000]" />
                    </div>
                    <input 
                      v-model="settings.youtube"
                      type="url" 
                      class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg pl-9 pr-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                    />
                  </div>
                </div>
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Link Twitter (X)</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Twitter class="h-4 w-4 text-black dark:text-white" />
                    </div>
                    <input 
                      v-model="settings.twitter"
                      type="url" 
                      class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg pl-9 pr-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                    />
                  </div>
                </div>
                <div class="space-y-1.5">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Link TikTok</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-4 w-4 text-black dark:text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                    </div>
                    <input 
                      v-model="settings.tiktok"
                      type="url" 
                      class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg pl-9 pr-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </section>

        <!-- Tab: Ajakan Bertindak (Donasi) -->
        <section v-show="activeSettingTab === 'donasi'" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md animate-fade-in">
          <div class="p-6 sm:p-8 border-b border-gray-300 dark:border-white/5">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
              <Heart class="w-5 h-5 text-gray-400" />
              Ajakan Bertindak
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Atur teks ajakan berdonasi beserta grafik progress bar yang ditampilkan di halaman beranda.</p>
          </div>
          
          <div class="p-6 sm:p-8 space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Judul Donasi</label>
                <input 
                  v-model="ctaSettings.title"
                  type="text" 
                  class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm"
                />
              </div>
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Kutipan / Hadist</label>
                <input 
                  v-model="ctaSettings.quote"
                  type="text" 
                  class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm"
                />
              </div>
              <div class="sm:col-span-2 space-y-1.5">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi / Subjudul</label>
                <textarea 
                  v-model="ctaSettings.subtitle"
                  rows="2"
                  class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all resize-none text-sm"
                ></textarea>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-gray-300 dark:border-white/5 pt-6 mt-6">
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Sumber Kutipan</label>
                <input 
                  v-model="ctaSettings.quoteSource"
                  type="text" 
                  class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm"
                />
              </div>
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Total Donatur</label>
                <input 
                  v-model.number="ctaSettings.totalDonors"
                  type="number" 
                  class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm"
                />
              </div>
            </div>

            <div class="border-t border-gray-300 dark:border-white/5 pt-6 mt-6 space-y-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Grafik Target Donasi (Progress Bar)</label>
              
              <div v-for="(prog, index) in ctaSettings.programs" :key="prog.id" class="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10">
                <div class="flex-1 space-y-1.5">
                  <label class="block text-xs font-medium text-gray-500">Nama Program</label>
                  <input 
                    v-model="prog.name"
                    type="text" 
                    class="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-1.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm"
                  />
                </div>
                <div class="w-full sm:w-32 space-y-1.5">
                  <label class="block text-xs font-medium text-gray-500">Persentase (%)</label>
                  <input 
                    v-model.number="prog.progress"
                    type="number" 
                    min="0"
                    max="100"
                    class="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-1.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Tab: Susunan Pengurus -->
        <section v-show="activeSettingTab === 'pengurus'" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md animate-fade-in">
          <div class="p-6 sm:p-8 border-b border-gray-300 dark:border-white/5">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
              <Users class="w-5 h-5 text-gray-400" />
              Susunan Pengurus DKM
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola daftar pengurus dan struktur divisi yang akan ditampilkan pada Halaman Utama.</p>
          </div>
          
          <div class="p-6 sm:p-8 space-y-12">
            <!-- PENGATURAN UMUM PENGURUS -->
            <div class="space-y-4">
              <h4 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Teks Pendahuluan</h4>
              <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-white/10 p-4">
                <div>
                  <textarea 
                    v-model="settings.committeeDescription" 
                    rows="2" 
                    class="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary transition-all text-sm resize-none"
                    placeholder="Mengenal lebih dekat para pelayan jamaah Masjid Jami Kassiti periode 2023-2026."
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- DEWAN PENASIHAT -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Dewan Penasihat</h4>
                <button type="button" @click="addCommitteeMember('dewanPenasihat')" class="text-xs font-medium bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-md">
                  <Plus class="w-3.5 h-3.5" /> Tambah Anggota
                </button>
              </div>
              <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-white/10 p-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div v-for="(member, index) in committee.dewanPenasihat" :key="'penasihat-'+index" class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-lg p-3 relative group shadow-sm flex flex-col gap-3">
                    <button type="button" @click="removeCommitteeMember('dewanPenasihat', index)" class="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 dark:bg-gray-800 dark:hover:bg-red-500/10 rounded-md transition-colors opacity-0 group-hover:opacity-100 z-10" title="Hapus">
                      <X class="w-3 h-3" />
                    </button>
                    <!-- Photo Upload -->
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-600 overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 relative group/photo">
                        <img v-if="member.image" :src="member.image" class="w-full h-full object-cover" />
                        <div v-else class="w-full h-full flex items-center justify-center text-xs text-gray-400">Foto</div>
                        <input type="file" accept="image/*" @change="handlePhotoUpload($event, member)" class="absolute inset-0 opacity-0 cursor-pointer" title="Upload Foto" />
                      </div>
                      <div class="flex-1 space-y-2">
                        <input v-model="member.name" type="text" class="w-full bg-transparent border-b border-gray-300 dark:border-white/10 focus:border-secondary rounded-none px-0 py-1 text-gray-900 dark:text-white focus:ring-0 outline-none transition-all text-sm font-semibold" placeholder="Nama Lengkap" />
                        <input v-model="member.role" type="text" class="w-full bg-transparent border-b border-gray-300 dark:border-white/10 focus:border-secondary rounded-none px-0 py-1 text-gray-900 dark:text-white focus:ring-0 outline-none transition-all text-xs" placeholder="Jabatan" />
                      </div>
                    </div>
                    <div class="flex items-center gap-2 pt-1 border-t border-gray-100 dark:border-gray-800 mt-1">
                      <input type="radio" :name="'leader-penasihat'" :checked="member.isLeader" @change="setLeader('dewanPenasihat', index)" class="rounded-full text-secondary focus:ring-secondary dark:bg-gray-800 dark:border-gray-600" />
                      <label class="text-xs text-gray-700 dark:text-gray-300">Pimpinan (Ketua)</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- PENGURUS HARIAN -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Pengurus Harian</h4>
                <button type="button" @click="addCommitteeMember('pengurusHarian')" class="text-xs font-medium bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-md">
                  <Plus class="w-3.5 h-3.5" /> Tambah Anggota
                </button>
              </div>
              <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-white/10 p-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div v-for="(member, index) in committee.pengurusHarian" :key="'harian-'+index" class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-lg p-3 relative group shadow-sm flex flex-col gap-3">
                    <button type="button" @click="removeCommitteeMember('pengurusHarian', index)" class="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 dark:bg-gray-800 dark:hover:bg-red-500/10 rounded-md transition-colors opacity-0 group-hover:opacity-100 z-10" title="Hapus">
                      <X class="w-3 h-3" />
                    </button>
                    <!-- Photo Upload -->
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-600 overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 relative group/photo">
                        <img v-if="member.image" :src="member.image" class="w-full h-full object-cover" />
                        <div v-else class="w-full h-full flex items-center justify-center text-xs text-gray-400">Foto</div>
                        <input type="file" accept="image/*" @change="handlePhotoUpload($event, member)" class="absolute inset-0 opacity-0 cursor-pointer" title="Upload Foto" />
                      </div>
                      <div class="flex-1 space-y-2 pr-6">
                        <input v-model="member.name" type="text" class="w-full bg-transparent border-b border-gray-300 dark:border-white/10 focus:border-secondary rounded-none px-0 py-1 text-gray-900 dark:text-white focus:ring-0 outline-none transition-all text-sm font-semibold" placeholder="Nama Lengkap" />
                        <input v-model="member.role" type="text" class="w-full bg-transparent border-b border-gray-300 dark:border-white/10 focus:border-secondary rounded-none px-0 py-1 text-gray-900 dark:text-white focus:ring-0 outline-none transition-all text-xs" placeholder="Jabatan" />
                      </div>
                    </div>
                    <div class="flex items-center gap-2 pt-1 border-t border-gray-100 dark:border-gray-800 mt-1">
                      <input type="radio" :name="'leader-harian'" :checked="member.isLeader" @change="setLeader('pengurusHarian', index)" class="rounded-full text-secondary focus:ring-secondary dark:bg-gray-800 dark:border-gray-600" />
                      <label class="text-xs text-gray-700 dark:text-gray-300">Pimpinan (Ketua)</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- DIVISI & SEKSI KERJA -->
            <div class="space-y-6 pt-4 border-t border-gray-200 dark:border-white/10">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Divisi & Seksi Kerja</h4>
                  <p class="text-xs text-gray-500 mt-1">Struktur fleksibel dengan warna dinamis otomatis.</p>
                </div>
                <button type="button" @click="addDivisi" class="text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-md">
                  <Plus class="w-3.5 h-3.5" /> Tambah Divisi Baru
                </button>
              </div>

              <div v-for="(divisi, divIndex) in committee.divisi" :key="divisi.id" class="bg-gray-50/80 dark:bg-gray-800/30 rounded-xl border border-gray-200 dark:border-white/10 p-5 shadow-sm">
                <div class="flex items-center justify-between mb-4 border-b border-gray-200 dark:border-white/10 pb-3">
                  <input v-model="divisi.name" type="text" class="bg-transparent border-none focus:ring-0 px-0 py-0 text-base font-bold text-gray-900 dark:text-white w-full max-w-sm" placeholder="Nama Divisi..." />
                  <div class="flex items-center gap-2">
                    <button type="button" @click="addCommitteeMember('divisi', divIndex)" class="text-[10px] font-semibold bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                      <Plus class="w-3 h-3" /> Anggota
                    </button>
                    <button type="button" @click="removeDivisi(divIndex)" class="text-[10px] font-semibold bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                      <X class="w-3 h-3" /> Hapus Divisi
                    </button>
                  </div>
                </div>

                <div v-if="divisi.members && divisi.members.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div v-for="(member, index) in divisi.members" :key="'div-'+divIndex+'-'+index" class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-lg p-3 relative group shadow-sm flex flex-col gap-3">
                    <button type="button" @click="removeCommitteeMember('divisi', index, divIndex)" class="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 dark:bg-gray-800 dark:hover:bg-red-500/10 rounded-md transition-colors opacity-0 group-hover:opacity-100 z-10" title="Hapus">
                      <X class="w-3 h-3" />
                    </button>
                    <!-- Photo Upload -->
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 relative group/photo">
                        <img v-if="member.image" :src="member.image" class="w-full h-full object-cover" />
                        <div v-else class="w-full h-full flex items-center justify-center text-[10px] text-gray-400">Foto</div>
                        <input type="file" accept="image/*" @change="handlePhotoUpload($event, member)" class="absolute inset-0 opacity-0 cursor-pointer" title="Upload Foto" />
                      </div>
                      <div class="flex-1 space-y-1.5 pr-6">
                        <input v-model="member.name" type="text" class="w-full bg-transparent border-b border-gray-300 dark:border-white/10 focus:border-secondary rounded-none px-0 py-0.5 text-gray-900 dark:text-white focus:ring-0 outline-none transition-all text-xs font-semibold" placeholder="Nama Lengkap" />
                        <input v-model="member.role" type="text" class="w-full bg-transparent border-b border-gray-300 dark:border-white/10 focus:border-secondary rounded-none px-0 py-0.5 text-gray-900 dark:text-white focus:ring-0 outline-none transition-all text-[10px]" placeholder="Jabatan/Peran" />
                      </div>
                    </div>
                    <div class="flex items-center gap-2 pt-1 border-t border-gray-100 dark:border-gray-800 mt-1">
                      <input type="radio" :name="'leader-divisi-'+divIndex" :checked="member.isLeader" @change="setLeader('divisi', index, divIndex)" class="rounded-full text-secondary focus:ring-secondary dark:bg-gray-800 dark:border-gray-600" />
                      <label class="text-xs text-gray-700 dark:text-gray-300">Koordinator Divisi</label>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center py-6 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                  <p class="text-xs text-gray-500 dark:text-gray-400">Belum ada anggota di divisi ini. Klik "Anggota" untuk menambahkan.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        <!-- Tab: Master Data -->
        <section v-show="activeSettingTab === 'master'" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md animate-fade-in">
          <div class="p-6 sm:p-8 border-b border-gray-300 dark:border-white/5">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
              <List class="w-5 h-5 text-gray-400" />
              Manajemen Master Data
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola opsi Kategori, Label, dan Status yang muncul pada form input data di modul lain.</p>
          </div>
          
          <div class="p-6 sm:p-8 space-y-8">
            <div v-for="(items, key) in masterData" :key="key" class="space-y-4">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">{{ key }}</h4>
                <button 
                  type="button" 
                  @click="addMasterDataItem(key)"
                  class="text-xs font-medium bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-md"
                >
                  <Plus class="w-3.5 h-3.5" />
                  Tambah {{ key }}
                </button>
              </div>
              
              <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
                <!-- Desktop Table View -->
                <div class="hidden sm:block overflow-x-auto">
                  <table class="w-full text-left text-sm whitespace-nowrap">
                    <thead class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      <tr>
                        <th class="px-4 py-3 font-semibold w-1/4">Nama</th>
                        <th class="px-4 py-3 font-semibold w-1/2">Deskripsi</th>
                        <th v-if="key === 'kategori'" class="px-4 py-3 font-semibold w-40">Ikon</th>
                        <th v-if="key !== 'kategori'" class="px-4 py-3 font-semibold w-32">Warna</th>
                        <th class="px-4 py-3 font-semibold text-right w-16">Aksi</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-white/5">
                      <tr v-for="(item, index) in items" :key="item.id" class="group hover:bg-white dark:hover:bg-gray-800 transition-colors">
                        <td class="px-4 py-2">
                          <input 
                            v-model="item.name" 
                            type="text" 
                            class="w-full bg-transparent border border-transparent hover:border-gray-300 focus:border-secondary dark:hover:border-white/20 rounded px-2 py-1.5 text-gray-900 dark:text-white focus:ring-1 focus:ring-secondary outline-none transition-all"
                            placeholder="Nama"
                          />
                        </td>
                        <td class="px-4 py-2">
                          <input 
                            v-model="item.description" 
                            type="text" 
                            class="w-full bg-transparent border border-transparent hover:border-gray-300 focus:border-secondary dark:hover:border-white/20 rounded px-2 py-1.5 text-gray-500 dark:text-gray-400 focus:text-gray-900 dark:focus:text-white focus:ring-1 focus:ring-secondary outline-none transition-all"
                            placeholder="Deskripsi singkat"
                          />
                        </td>
                        <td v-if="key === 'kategori'" class="px-4 py-2">
                          <select 
                            v-model="item.iconName"
                            class="w-full bg-transparent border border-transparent hover:border-gray-300 focus:border-secondary dark:hover:border-white/20 rounded px-2 py-1.5 text-gray-700 dark:text-gray-300 focus:ring-1 focus:ring-secondary outline-none transition-all text-sm"
                          >
                            <option v-for="icon in availableIcons" :key="icon.value" :value="icon.value" class="bg-white dark:bg-slate-800">{{ icon.label }}</option>
                          </select>
                        </td>
                        <td v-if="key !== 'kategori'" class="px-4 py-2">
                          <select 
                            v-model="item.color"
                            class="w-full bg-transparent border border-transparent hover:border-gray-300 focus:border-secondary dark:hover:border-white/20 rounded px-2 py-1.5 text-gray-700 dark:text-gray-300 focus:ring-1 focus:ring-secondary outline-none transition-all"
                          >
                            <option class="bg-white dark:bg-slate-800" value="red">Merah</option>
                            <option class="bg-white dark:bg-slate-800" value="yellow">Kuning</option>
                            <option class="bg-white dark:bg-slate-800" value="green">Hijau</option>
                            <option class="bg-white dark:bg-slate-800" value="blue">Biru</option>
                            <option class="bg-white dark:bg-slate-800" value="purple">Ungu</option>
                            <option class="bg-white dark:bg-slate-800" value="gray">Abu-abu</option>
                          </select>
                        </td>
                        <td class="px-4 py-2 text-right">
                          <button 
                            type="button" 
                            @click="removeMasterDataItem(key, index)"
                            class="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            title="Hapus"
                          >
                            <X class="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Mobile Card View -->
                <div class="block sm:hidden divide-y divide-gray-200 dark:divide-white/10">
                  <div v-for="(item, index) in items" :key="item.id" class="p-4 space-y-3 relative group">
                    <button 
                      type="button" 
                      @click="removeMasterDataItem(key, index)"
                      class="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-500 bg-gray-100 hover:bg-red-50 dark:bg-gray-800 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <X class="w-4 h-4" />
                    </button>
                    <div class="pr-8 space-y-3">
                      <div>
                        <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Nama</label>
                        <input 
                          v-model="item.name" 
                          type="text" 
                          class="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all text-sm"
                          placeholder="Nama"
                        />
                      </div>
                      <div>
                        <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Deskripsi</label>
                        <input 
                          v-model="item.description" 
                          type="text" 
                          class="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all text-sm"
                          placeholder="Deskripsi singkat"
                        />
                      </div>
                      <div v-if="key === 'kategori'">
                        <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Ikon</label>
                        <select 
                          v-model="item.iconName"
                          class="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all text-sm"
                        >
                          <option v-for="icon in availableIcons" :key="icon.value" :value="icon.value" class="bg-white dark:bg-slate-800">{{ icon.label }}</option>
                        </select>
                      </div>
                      <div v-if="key !== 'kategori'">
                        <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Warna</label>
                        <select 
                          v-model="item.color"
                          class="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all text-sm"
                        >
                          <option class="bg-white dark:bg-slate-800" value="red">Merah</option>
                          <option class="bg-white dark:bg-slate-800" value="yellow">Kuning</option>
                          <option class="bg-white dark:bg-slate-800" value="green">Hijau</option>
                          <option class="bg-white dark:bg-slate-800" value="blue">Biru</option>
                          <option class="bg-white dark:bg-slate-800" value="purple">Ungu</option>
                          <option class="bg-white dark:bg-slate-800" value="gray">Abu-abu</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>

    <!-- Floating Save Button -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-full opacity-0"
    >
      <div 
        v-if="hasChanges && !isTopButtonVisible"
        class="fixed bottom-0 left-0 right-0 md:left-72 z-40 p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-white/10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex justify-between items-center"
      >
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">Terdapat perubahan yang belum disimpan</span>
        <button 
          type="submit"
          :disabled="isSaving"
          class="bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 font-medium px-6 py-2.5 rounded-lg transition-colors shadow-lg text-sm flex items-center gap-2 justify-center w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span v-if="isSaving" class="w-4 h-4 border-2 border-white/30 dark:border-gray-950/30 border-t-white dark:border-t-gray-950 rounded-full animate-spin"></span>
          <Save v-else class="w-4 h-4" />
          <span>{{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}</span>
        </button>
      </div>
    </transition>

  </form>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Globe, Link as LinkIcon, Instagram, Phone, MapPin, Save, Bold, Italic, Underline, Heading1, Heading2, List, ListOrdered, AlignLeft, AlignCenter, Heart, Plus, X, Users, Check, Mail, Facebook, Youtube, Twitter, Trash2 } from 'lucide-vue-next'
import { useAdminStore } from '../../stores/admin'
import { useToastStore } from '../../stores/toast'

const toastStore = useToastStore()
const adminStore = useAdminStore()
const isSaving = ref(false)

const settings = ref(JSON.parse(JSON.stringify(adminStore.generalSettings)))
// Migration for older localStorage data where whatsapp might still be a string
if (typeof settings.value.whatsapp === 'string') {
  settings.value.whatsapp = [{ id: 1, name: 'Pengurus / Umum', number: settings.value.whatsapp }]
}
if (!settings.value.email) settings.value.email = ''
if (!settings.value.alamatLengkap) settings.value.alamatLengkap = ''
if (!settings.value.kota) settings.value.kota = ''
if (!settings.value.kodepos) settings.value.kodepos = ''
if (!settings.value.mapsIframe) settings.value.mapsIframe = ''
if (!settings.value.teleponKantor) settings.value.teleponKantor = ''
if (settings.value.twitter === undefined) settings.value.twitter = ''
if (settings.value.tiktok === undefined) settings.value.tiktok = ''

const ctaSettings = ref(JSON.parse(JSON.stringify(adminStore.ctaSettings)))
const masterData = ref(JSON.parse(JSON.stringify(adminStore.masterData)))



// Tabs Configuration
const activeSettingTab = ref('profil')
const settingTabs = [
  { id: 'profil', name: 'Profil & Sejarah', icon: Globe },
  { id: 'pengurus', name: 'Susunan Pengurus', icon: Users },
  { id: 'kontak', name: 'Kontak & Lokasi', icon: LinkIcon },
  { id: 'donasi', name: 'Ajakan Bertindak', icon: Heart },
  { id: 'master', name: 'Master Data', icon: List }
]

const availableIcons = [
  { value: 'Users', label: 'Orang / Komunitas' },
  { value: 'BookOpen', label: 'Buku / Kajian' },
  { value: 'GraduationCap', label: 'Edukasi / Sekolah' },
  { value: 'Heart', label: 'Hati / Sosial' },
  { value: 'Building', label: 'Gedung / Fasilitas' },
  { value: 'Camera', label: 'Kamera / Foto' },
  { value: 'MapPin', label: 'Lokasi' },
  { value: 'Calendar', label: 'Kalender / Jadwal' },
  { value: 'Clock', label: 'Jam / Waktu' },
  { value: 'Globe', label: 'Internet / Global' },
  { value: 'Mic', label: 'Audio / Tausiyah' },
  { value: 'HandCoins', label: 'Infaq / Zakat' },
  { value: 'Info', label: 'Informasi Umum' },
  { value: 'Layout', label: 'Tampilan' },
  { value: 'Star', label: 'Bintang / Spesial' },
  { value: 'HeartHandshake', label: 'Kerjasama / Bantuan' },
  { value: 'Shield', label: 'Keamanan' }
]

const cData = adminStore.committee || {}
const committee = ref({
  dewanPenasihat: cData.dewanPenasihat ? JSON.parse(JSON.stringify(cData.dewanPenasihat)) : [],
  pengurusHarian: cData.pengurusHarian ? JSON.parse(JSON.stringify(cData.pengurusHarian)) : [],
  divisi: cData.divisi ? JSON.parse(JSON.stringify(cData.divisi)) : []
})

const topButtonRef = ref(null)
const isTopButtonVisible = ref(true)
let observer = null

const hasChanges = computed(() => {
  const isSettingsChanged = JSON.stringify(settings.value) !== JSON.stringify(adminStore.generalSettings)
  const isCtaChanged = JSON.stringify(ctaSettings.value) !== JSON.stringify(adminStore.ctaSettings)
  const isMasterDataChanged = JSON.stringify(masterData.value) !== JSON.stringify(adminStore.masterData)
  const isCommitteeChanged = JSON.stringify(committee.value) !== JSON.stringify(adminStore.committee)
  return isSettingsChanged || isCtaChanged || isMasterDataChanged || isCommitteeChanged
})

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => {
    isTopButtonVisible.value = entry.isIntersecting
  }, { threshold: 0 })
  
  if (topButtonRef.value) {
    observer.observe(topButtonRef.value)
  }

})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

function addMasterDataItem(key) {
  const newId = masterData.value[key].length > 0 ? Math.max(...masterData.value[key].map(i => i.id)) + 1 : 1
  const newItem = {
    id: newId,
    name: 'Item Baru',
    description: ''
  }
  if (key !== 'kategori') {
    newItem.color = 'gray'
  } else {
    newItem.iconName = 'Info'
  }
  masterData.value[key].push(newItem)
}

function removeMasterDataItem(key, index) {
  masterData.value[key].splice(index, 1)
}

function formatCommitteeKey(key) {
  const labels = {
    dewanPenasihat: 'Dewan Penasihat',
    pengurusHarian: 'Pengurus Harian',
    seksiDakwah: 'Seksi Pendidikan & Dakwah',
    seksiEkonomi: 'Seksi Ekonomi & Wakaf',
    seksiLogistik: 'Seksi Peralatan & Logistik',
    remajaMasjid: 'Remaja Masjid'
  }
  return labels[key] || key
}

function addCommitteeMember(key, divisiIndex = null) {
  if (key === 'divisi' && divisiIndex !== null) {
    const members = committee.value.divisi[divisiIndex].members
    const newId = members.length > 0 ? Math.max(...members.map(i => i.id || 0)) + 1 : 1
    members.push({ id: newId, name: '', role: '', image: null })
  } else {
    const newId = committee.value[key].length > 0 ? Math.max(...committee.value[key].map(i => i.id || 0)) + 1 : 1
    const newMember = {
      id: newId,
      name: '',
      role: '',
      image: null
    }
    if (key === 'pengurusHarian') {
      newMember.isLeader = false
    }
    committee.value[key].push(newMember)
  }
}

function removeCommitteeMember(key, index, divisiIndex = null) {
  if (key === 'divisi' && divisiIndex !== null) {
    committee.value.divisi[divisiIndex].members.splice(index, 1)
  } else {
    committee.value[key].splice(index, 1)
  }
}

function setLeader(group, memberIndex, divIndex = null) {
  if (group === 'divisi' && divIndex !== null) {
    committee.value.divisi[divIndex].members.forEach((m, idx) => {
      m.isLeader = (idx === memberIndex)
    })
  } else {
    committee.value[group].forEach((m, idx) => {
      m.isLeader = (idx === memberIndex)
    })
  }
}

function addWhatsapp() {
  if (!Array.isArray(settings.value.whatsapp)) {
    settings.value.whatsapp = []
  }
  const newId = settings.value.whatsapp.length > 0 ? Math.max(...settings.value.whatsapp.map(w => w.id || 0)) + 1 : 1
  settings.value.whatsapp.push({ id: newId, name: '', number: '' })
}

function removeWhatsapp(index) {
  settings.value.whatsapp.splice(index, 1)
}

function addDivisi() {
  const name = prompt('Masukkan Nama Divisi/Seksi Baru:')
  if (name) {
    committee.value.divisi.push({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name: name,
      members: []
    })
  }
}

function removeDivisi(index) {
  if (confirm('Yakin ingin menghapus divisi ini beserta seluruh anggotanya?')) {
    committee.value.divisi.splice(index, 1)
  }
}

function handlePhotoUpload(event, member) {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    member.image = e.target.result
  }
  reader.readAsDataURL(file)
}

function saveSettings() {
  isSaving.value = true
  
  // Simulate API call
  setTimeout(() => {
    adminStore.generalSettings = { ...settings.value }
    adminStore.ctaSettings = JSON.parse(JSON.stringify(ctaSettings.value))
    adminStore.masterData = JSON.parse(JSON.stringify(masterData.value))
    adminStore.committee = JSON.parse(JSON.stringify(committee.value))
    
    adminStore.saveGeneralSettings()
    adminStore.saveCtaSettings()
    adminStore.saveMasterData()
    adminStore.saveCommittee()
    
    isSaving.value = false
    toastStore.addToast('Pengaturan umum berhasil disimpan')
  }, 1000)
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
