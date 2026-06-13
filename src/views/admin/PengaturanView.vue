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
                <input 
                  v-model="settings.slogan"
                  type="text" 
                  class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                />
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

            <div class="space-y-1.5 border-t border-gray-300 dark:border-white/5 pt-6 mt-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Sejarah Singkat (Tentang Kami)</label>
              <div class="border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-secondary transition-all bg-gray-50 dark:bg-white/5">
                <div class="flex items-center gap-1 p-2 border-b border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-gray-900/50 flex-wrap">
                  <button type="button" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors"><Bold class="w-4 h-4" /></button>
                  <button type="button" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors"><Italic class="w-4 h-4" /></button>
                  <button type="button" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors"><Underline class="w-4 h-4" /></button>
                  <div class="w-px h-4 bg-gray-300 dark:bg-white/10 mx-1"></div>
                  <button type="button" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors"><Heading1 class="w-4 h-4" /></button>
                  <button type="button" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors"><Heading2 class="w-4 h-4" /></button>
                  <div class="w-px h-4 bg-gray-300 dark:bg-white/10 mx-1"></div>
                  <button type="button" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors"><List class="w-4 h-4" /></button>
                  <button type="button" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors"><ListOrdered class="w-4 h-4" /></button>
                </div>
                <textarea 
                  v-model="settings.history"
                  rows="8"
                  class="w-full bg-transparent border-0 px-4 py-4 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-0 resize-none text-sm outline-none"
                ></textarea>
              </div>
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
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola tautan sosial media dan nomor kontak yang bisa dihubungi.</p>
          </div>
          
          <div class="p-6 sm:p-8 space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Link Instagram</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Instagram class="h-4 w-4 text-gray-400" />
                  </div>
                  <input 
                    v-model="settings.instagram"
                    type="url" 
                    class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg pl-9 pr-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                  />
                </div>
              </div>
              
              <div class="space-y-1.5">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nomor WhatsApp Pengurus</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone class="h-4 w-4 text-gray-400" />
                  </div>
                  <input 
                    v-model="settings.whatsapp"
                    type="tel" 
                    class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg pl-9 pr-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                  />
                </div>
                <p class="text-xs text-gray-500">Format: 628xxx (tanpa tanda + atau 0 di depan).</p>
              </div>

              <div class="sm:col-span-2 space-y-1.5 border-t border-gray-300 dark:border-white/5 pt-6 mt-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Link Google Maps (Lokasi Masjid)</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin class="h-4 w-4 text-gray-400" />
                  </div>
                  <input 
                    v-model="settings.maps"
                    type="url" 
                    class="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg pl-9 pr-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-secondary transition-all text-sm shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Tab: Donasi (CTA) -->
        <section v-show="activeSettingTab === 'donasi'" class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md animate-fade-in">
          <div class="p-6 sm:p-8 border-b border-gray-300 dark:border-white/5">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
              <Heart class="w-5 h-5 text-gray-400" />
              Donasi & Amal Jariyah
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
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola daftar pengurus yang akan ditampilkan pada Halaman Utama.</p>
          </div>
          
          <div class="p-6 sm:p-8 space-y-8">
            <div v-for="(members, key) in committee" :key="key" class="space-y-4">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">{{ formatCommitteeKey(key) }}</h4>
                <button 
                  type="button" 
                  @click="addCommitteeMember(key)"
                  class="text-xs font-medium bg-secondary hover:bg-yellow-500 text-white dark:text-gray-950 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-md"
                >
                  <Plus class="w-3.5 h-3.5" />
                  Tambah Anggota
                </button>
              </div>
              
              <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden p-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div v-for="(member, index) in members" :key="member.id" class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-lg p-3 relative group shadow-sm">
                    <button 
                      type="button" 
                      @click="removeCommitteeMember(key, index)"
                      class="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 dark:bg-gray-800 dark:hover:bg-red-500/10 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                      title="Hapus"
                    >
                      <X class="w-3 h-3" />
                    </button>
                    <div class="space-y-2 pr-6">
                      <div>
                        <label class="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-0.5">Nama</label>
                        <input 
                          v-model="member.name" 
                          type="text" 
                          class="w-full bg-transparent border-b border-gray-300 dark:border-white/10 focus:border-secondary rounded-none px-0 py-1 text-gray-900 dark:text-white focus:ring-0 outline-none transition-all text-sm"
                          placeholder="Nama Lengkap"
                        />
                      </div>
                      <div>
                        <label class="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-0.5">Jabatan / Peran</label>
                        <input 
                          v-model="member.role" 
                          type="text" 
                          class="w-full bg-transparent border-b border-gray-300 dark:border-white/10 focus:border-secondary rounded-none px-0 py-1 text-gray-900 dark:text-white focus:ring-0 outline-none transition-all text-sm"
                          placeholder="Jabatan"
                        />
                      </div>
                      <div v-if="key === 'pengurusHarian'" class="flex items-center gap-2 pt-1">
                        <input 
                          v-model="member.isLeader" 
                          type="checkbox" 
                          class="rounded text-secondary focus:ring-secondary dark:bg-gray-800 dark:border-gray-600"
                        />
                        <label class="text-xs text-gray-700 dark:text-gray-300">Tandai sebagai Pimpinan (Ketua)</label>
                      </div>
                    </div>
                  </div>
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
                            class="w-full bg-transparent border border-transparent hover:border-gray-300 focus:border-secondary dark:hover:border-white/20 rounded px-2 py-1.5 text-gray-700 dark:text-gray-300 focus:ring-1 focus:ring-secondary outline-none transition-all appearance-none text-sm"
                          >
                            <option v-for="icon in availableIcons" :key="icon.value" :value="icon.value" class="bg-white dark:bg-slate-800">{{ icon.label }}</option>
                          </select>
                        </td>
                        <td v-if="key !== 'kategori'" class="px-4 py-2">
                          <select 
                            v-model="item.color"
                            class="w-full bg-transparent border border-transparent hover:border-gray-300 focus:border-secondary dark:hover:border-white/20 rounded px-2 py-1.5 text-gray-700 dark:text-gray-300 focus:ring-1 focus:ring-secondary outline-none transition-all appearance-none"
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
                          class="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all appearance-none text-sm"
                        >
                          <option v-for="icon in availableIcons" :key="icon.value" :value="icon.value" class="bg-white dark:bg-slate-800">{{ icon.label }}</option>
                        </select>
                      </div>
                      <div v-if="key !== 'kategori'">
                        <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Warna</label>
                        <select 
                          v-model="item.color"
                          class="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary outline-none transition-all appearance-none text-sm"
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
import { Globe, Link as LinkIcon, Instagram, Phone, MapPin, Save, Bold, Italic, Underline, Heading1, Heading2, List, ListOrdered, AlignLeft, AlignCenter, Heart, Plus, X, Users } from 'lucide-vue-next'
import { useAdminStore } from '../../stores/admin'
import { useToastStore } from '../../stores/toast'

const toastStore = useToastStore()
const adminStore = useAdminStore()
const isSaving = ref(false)

// Tabs Configuration
const activeSettingTab = ref('profil')
const settingTabs = [
  { id: 'profil', name: 'Profil & Sejarah', icon: Globe },
  { id: 'kontak', name: 'Kontak & Lokasi', icon: LinkIcon },
  { id: 'donasi', name: 'Donasi & Amal Jariyah', icon: Heart },
  { id: 'pengurus', name: 'Susunan Pengurus', icon: Users },
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

// Use settings from store
const settings = ref({ ...adminStore.generalSettings })
const ctaSettings = ref({ ...JSON.parse(JSON.stringify(adminStore.ctaSettings || {})) })
const masterData = ref({ ...JSON.parse(JSON.stringify(adminStore.masterData || {})) })

const cData = adminStore.committee || {}
const committee = ref({
  dewanPenasihat: cData.dewanPenasihat ? [...cData.dewanPenasihat] : [],
  pengurusHarian: cData.pengurusHarian ? [...cData.pengurusHarian] : [],
  seksiDakwah: cData.seksiDakwah ? [...cData.seksiDakwah] : [],
  seksiEkonomi: cData.seksiEkonomi ? [...cData.seksiEkonomi] : [],
  seksiLogistik: cData.seksiLogistik ? [...cData.seksiLogistik] : [],
  remajaMasjid: cData.remajaMasjid ? [...cData.remajaMasjid] : []
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

function addCommitteeMember(key) {
  const newId = committee.value[key].length > 0 ? Math.max(...committee.value[key].map(i => i.id)) + 1 : 1
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

function removeCommitteeMember(key, index) {
  committee.value[key].splice(index, 1)
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
