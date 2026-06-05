<template>
  <section id="pengurus" class="relative py-16 lg:py-20 bg-white dark:bg-dark overflow-hidden transition-colors duration-500">
    <!-- Background Patterns -->
    <IslamicPattern pattern-color="#0D4F4F" :show-sparkles="false" class="opacity-5 dark:opacity-10" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16" ref="headerRef">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
          <span class="text-primary text-xs font-semibold tracking-wider uppercase">Struktur Organisasi</span>
        </div>
        <h2 class="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark dark:text-white mb-4 transition-colors duration-500">
          Pengurus <span class="text-primary dark:text-secondary">DKM</span>
        </h2>
        <p class="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto transition-colors duration-500">
          Susunan kepengurusan Dewan Kemakmuran Masjid Jami Kassiti periode 2024-2027
        </p>
      </div>

      <!-- Committee Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8" ref="gridRef">
        <div
          v-for="(member, index) in committee"
          :key="member.name"
          class="group relative bg-light dark:bg-[#1A2525] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-primary/5 dark:border-white/5 hover:border-primary/30 dark:hover:border-secondary/30"
          :style="{ transform: `translateY(${index % 2 !== 0 ? '20px' : '0'})` }"
        >
          <!-- Image Container -->
          <div class="relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-800">
            <img 
              :src="member.image" 
              :alt="member.name" 
              class="w-full h-full object-cover object-top filter grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
          </div>
          
          <!-- Content -->
          <div class="relative p-6 -mt-12 bg-gradient-to-b from-transparent to-light dark:to-[#1A2525]">
            <div class="bg-white dark:bg-dark-light rounded-xl p-4 shadow-lg border border-gray-100 dark:border-white/10 transform -translate-y-4 group-hover:-translate-y-6 transition-transform duration-500 relative z-10">
              <h3 class="font-heading text-lg font-bold text-dark dark:text-white text-center mb-1 transition-colors">{{ member.name }}</h3>
              <p class="text-primary dark:text-secondary text-sm font-medium text-center uppercase tracking-wide">{{ member.role }}</p>
            </div>
            
            <div class="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 absolute bottom-6 left-0 right-0">
              <a href="#" class="w-8 h-8 rounded-full bg-primary/10 text-primary dark:bg-white/10 dark:text-white flex items-center justify-center hover:bg-primary hover:text-white dark:hover:bg-secondary dark:hover:text-dark transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" class="w-8 h-8 rounded-full bg-primary/10 text-primary dark:bg-white/10 dark:text-white flex items-center justify-center hover:bg-primary hover:text-white dark:hover:bg-secondary dark:hover:text-dark transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
            </div>
          </div>
        </div>
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

const committee = [
  {
    name: 'H. Ahmad Abdullah, Lc.',
    role: 'Ketua DKM',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Ust. Budi Santoso',
    role: 'Wakil Ketua',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'M. Ikhsan Fauzi',
    role: 'Sekretaris',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Rhafi Decul',
    role: 'Bendahara',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
]

onMounted(() => {
  // Animate Header
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

  // Animate Grid Items
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
})
</script>
