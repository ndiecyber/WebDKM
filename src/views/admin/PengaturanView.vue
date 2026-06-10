<template>
  <form @submit.prevent="saveSettings" class="space-y-6 sm:space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Pengaturan Umum</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Ubah profil dasar, teks sambutan, dan pengaturan kontak masjid.</p>
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

    <div class="max-w-5xl space-y-6">
      
      <!-- Profil Masjid Section -->
      <section class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md">
        <div class="p-6 sm:p-8 border-b border-gray-300 dark:border-white/5">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <Globe class="w-5 h-5 text-gray-400" />
            Profil & Teks Sambutan
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
            
            <!-- Rich Text Editor UI -->
            <div class="border border-gray-300 dark:border-transparent dark:ring-1 dark:ring-white/10 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-secondary transition-all bg-gray-50 dark:bg-white/5">
              <!-- Toolbar -->
              <div class="flex items-center gap-1 p-2 border-b border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-gray-900/50 flex-wrap">
                <button type="button" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors" title="Bold">
                  <Bold class="w-4 h-4" />
                </button>
                <button type="button" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors" title="Italic">
                  <Italic class="w-4 h-4" />
                </button>
                <button type="button" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors" title="Underline">
                  <Underline class="w-4 h-4" />
                </button>
                <div class="w-px h-4 bg-gray-300 dark:bg-white/10 mx-1"></div>
                <button type="button" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors" title="Heading 1">
                  <Heading1 class="w-4 h-4" />
                </button>
                <button type="button" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors" title="Heading 2">
                  <Heading2 class="w-4 h-4" />
                </button>
                <div class="w-px h-4 bg-gray-300 dark:bg-white/10 mx-1"></div>
                <button type="button" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors" title="Bullet List">
                  <List class="w-4 h-4" />
                </button>
                <button type="button" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors" title="Numbered List">
                  <ListOrdered class="w-4 h-4" />
                </button>
                <div class="w-px h-4 bg-gray-300 dark:bg-white/10 mx-1"></div>
                <button type="button" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors" title="Align Left">
                  <AlignLeft class="w-4 h-4" />
                </button>
                <button type="button" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors" title="Align Center">
                  <AlignCenter class="w-4 h-4" />
                </button>
                <div class="w-px h-4 bg-gray-300 dark:bg-white/10 mx-1"></div>
                <button type="button" class="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 dark:hover:text-white transition-colors" title="Link">
                  <LinkIcon class="w-4 h-4" />
                </button>
              </div>
              <!-- Editor Area -->
              <textarea 
                v-model="settings.history"
                rows="6"
                class="w-full bg-transparent border-0 px-4 py-4 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-0 resize-none text-sm outline-none"
              ></textarea>
            </div>
          </div>
        </div>
      </section>

      <!-- Sosial Media & Kontak Section -->
      <section class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md">
        <div class="p-6 sm:p-8 border-b border-gray-300 dark:border-white/5">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <LinkIcon class="w-5 h-5 text-gray-400" />
            Sosial Media & Kontak
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

      <!-- Donasi & Amal Jariyah (CTA) Section -->
      <section class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md">
        <div class="p-6 sm:p-8 border-b border-gray-300 dark:border-white/5">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <Heart class="w-5 h-5 text-gray-400" />
            Donasi & Amal Jariyah (CTA)
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

      <!-- Manajemen Master Data Section -->
      <section class="bg-white dark:bg-gray-900 ring-1 ring-gray-300 dark:ring-white/10 rounded-xl shadow-md">
        <div class="p-6 sm:p-8 border-b border-gray-300 dark:border-white/5">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <List class="w-5 h-5 text-gray-400" />
            Manajemen Master Data
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola opsi Kategori, Label, dan Status yang muncul pada form input data.</p>
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
import { Globe, Link as LinkIcon, Instagram, Phone, MapPin, Save, Bold, Italic, Underline, Heading1, Heading2, List, ListOrdered, AlignLeft, AlignCenter, Heart, Plus, X } from 'lucide-vue-next'
import { useAdminStore } from '../../stores/admin'
import { useToastStore } from '../../stores/toast'

const toastStore = useToastStore()
const adminStore = useAdminStore()
const isSaving = ref(false)

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
const ctaSettings = ref({ ...JSON.parse(JSON.stringify(adminStore.ctaSettings)) })
const masterData = ref({ ...JSON.parse(JSON.stringify(adminStore.masterData)) })

const topButtonRef = ref(null)
const isTopButtonVisible = ref(true)
let observer = null

const hasChanges = computed(() => {
  const isSettingsChanged = JSON.stringify(settings.value) !== JSON.stringify(adminStore.generalSettings)
  const isCtaChanged = JSON.stringify(ctaSettings.value) !== JSON.stringify(adminStore.ctaSettings)
  const isMasterDataChanged = JSON.stringify(masterData.value) !== JSON.stringify(adminStore.masterData)
  return isSettingsChanged || isCtaChanged || isMasterDataChanged
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

function saveSettings() {
  isSaving.value = true
  
  // Simulate API call
  setTimeout(() => {
    adminStore.generalSettings = { ...settings.value }
    adminStore.ctaSettings = JSON.parse(JSON.stringify(ctaSettings.value))
    adminStore.masterData = JSON.parse(JSON.stringify(masterData.value))
    
    adminStore.saveGeneralSettings()
    adminStore.saveCtaSettings()
    adminStore.saveMasterData()
    
    isSaving.value = false
    toastStore.addToast('Pengaturan umum berhasil disimpan')
  }, 1000)
}
</script>
