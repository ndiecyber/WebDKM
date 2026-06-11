<template>
  <section id="berita" class="relative py-16 lg:py-24 bg-white dark:bg-[#0B1120] overflow-hidden transition-colors duration-500">
    <!-- Background -->
    <div class="absolute inset-0 bg-primary/5 dark:bg-white/[0.02] transform -skew-y-3 origin-top-left z-0 pointer-events-none"></div>
    <IslamicPattern pattern-color="#0D4F4F" :show-sparkles="false" class="absolute top-0 left-0 w-full opacity-5 dark:opacity-[0.03]" />
    <IslamicPattern pattern-color="#0D4F4F" :show-sparkles="false" class="absolute bottom-0 right-0 w-full rotate-180 opacity-5 dark:opacity-[0.03]" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16" ref="headerRef">
        <div>
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
            <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span class="text-primary text-xs font-semibold tracking-wider uppercase">Informasi Terbaru</span>
          </div>
          <h2 class="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark dark:text-white transition-colors duration-500">
            Berita & <span class="text-primary dark:text-secondary">Artikel</span>
          </h2>
        </div>
        <a href="#" class="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-full font-medium text-dark dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 group">
          Lihat Semua Berita
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>

      <!-- News Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" ref="gridRef">
        <article
          v-for="(item, index) in news"
          :key="index"
          class="group bg-white dark:bg-[#1A2525] rounded-2xl overflow-hidden border border-gray-300 dark:border-white/5 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col h-full"
        >
          <!-- Image -->
          <div class="relative h-56 overflow-hidden">
            <img 
              :src="item.image" 
              :alt="item.title" 
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-linear-to-t from-dark/60 to-transparent"></div>
            
            <!-- Category Badge -->
            <div class="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-dark/90 backdrop-blur-sm text-primary dark:text-secondary text-xs font-bold uppercase tracking-wider rounded-md">
              {{ item.category }}
            </div>
          </div>
          
          <!-- Content -->
          <div class="p-6 sm:p-8 flex-1 flex flex-col">
            <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4 transition-colors">
              <div class="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                {{ item.date }}
              </div>
              <div class="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                {{ item.author }}
              </div>
            </div>
            
            <h3 class="font-heading text-xl font-bold text-dark dark:text-white mb-3 leading-snug group-hover:text-primary dark:group-hover:text-secondary transition-colors line-clamp-2">
              <a href="#">{{ item.title }}</a>
            </h3>
            
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 transition-colors">
              {{ item.excerpt }}
            </p>
            
            <div class="mt-auto pt-4 border-t border-gray-300 dark:border-white/10 transition-colors">
              <a href="#" class="inline-flex items-center gap-2 text-primary dark:text-secondary font-medium text-sm hover:underline underline-offset-4">
                Baca Selengkapnya
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </article>
      </div>
      
      <!-- Mobile View All Button -->
      <div class="mt-8 text-center md:hidden">
        <a href="#" class="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-full font-medium text-dark dark:text-white transition-colors">
          Lihat Semua Berita
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IslamicPattern from '@/components/ui/IslamicPattern.vue'

gsap.registerPlugin(ScrollTrigger)

const headerRef = ref(null)
const gridRef = ref(null)

const news = [
  {
    category: 'Kegiatan',
    title: 'Pembagian Sembako Ramadhan 1447 H untuk Warga Arjasari',
    excerpt: 'Alhamdulillah, DKM Masjid Jami Kassiti telah menyalurkan 200 paket sembako kepada warga sekitar yang membutuhkan di Perumahan Arjamukti dan sekitarnya.',
    date: '15 Maret 2026',
    author: 'Tim DKM',
    image: 'https://images.unsplash.com/photo-1593113589914-072120038478?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    category: 'Dakwah',
    title: 'Kajian Spesial: Menjaga Istiqomah Pasca Ramadhan',
    excerpt: 'Jangan lewatkan kajian spesial bersama Ustadz H. Ahmad Abdullah, Lc. yang akan membahas bagaimana cara mempertahankan amalan-amalan baik setelah bulan suci Ramadhan berakhir.',
    date: '10 Mei 2026',
    author: 'Seksi Dakwah',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    category: 'Pengumuman',
    title: 'Pendaftaran Santri Baru TPQ Masjid Jami Kassiti Tahun 2026',
    excerpt: 'Telah dibuka pendaftaran santri baru untuk Taman Pendidikan Al-Quran (TPQ) Masjid Jami Kassiti. Kuota terbatas untuk 50 santri. Segera daftarkan putra-putri Anda.',
    date: '1 Juni 2026',
    author: 'Pengurus TPQ',
    image: 'https://images.unsplash.com/photo-1511499557008-0136696b92cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
]

onMounted(() => {
  if (headerRef.value && headerRef.value.children) {
    gsap.fromTo(headerRef.value.children, 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.value,
          start: 'top 80%',
        }
      }
    )
  }

  if (gridRef.value && gridRef.value.children) {
    gsap.fromTo(gridRef.value.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.value,
          start: 'top 75%',
        }
      }
    )
  }
})
</script>
