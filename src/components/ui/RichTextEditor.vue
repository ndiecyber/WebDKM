<template>
  <div class="quill-wrapper bg-white dark:bg-dark/50 border border-gray-300 dark:border-white/10 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-secondary/50 focus-within:border-secondary transition-all shadow-sm">
    <div ref="editorContainer" class="min-h-[250px] text-gray-900 dark:text-white"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import api from '@/utils/api'
import { useToastStore } from '@/stores/toast'
import { validateFileSize } from '@/utils/fileValidator'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Ketik konten di sini...'
  }
})

const emit = defineEmits(['update:modelValue'])
const editorContainer = ref(null)

let quill = null
let isUpdating = false

onMounted(() => {
  try {
    // Inisialisasi Quill menggunakan modul NPM lokal
    quill = new Quill(editorContainer.value, {
      theme: 'snow',
      placeholder: props.placeholder,
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'align': [] }],
          ['blockquote'],
          ['link', 'image', 'video'],
          ['clean']
        ]
      }
    })

    // Set nilai awal
    if (props.modelValue) {
      quill.root.innerHTML = props.modelValue
    }

    // Dengarkan perubahan
    quill.on('text-change', () => {
      isUpdating = true
      let html = quill.root.innerHTML
      // Jika kosong, Quill biasanya menyisakan <p><br></p>, kita bersihkan
      if (html === '<p><br></p>') html = ''
      
      emit('update:modelValue', html)
      
      // Beri sedikit jeda agar watch tidak memicu pembaruan berbalik (looping)
      setTimeout(() => { isUpdating = false }, 50)
    })

    // Custom image handler untuk upload gambar ke server, bukan base64
    quill.getModule('toolbar').addHandler('image', () => {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.click()

      input.onchange = async () => {
        const file = input.files[0]
        if (file) {
          if (!validateFileSize(file)) return // hentikan proses upload jika tidak valid

          const formData = new FormData()
          formData.append('image', file)

          try {
            const response = await api.post('/web-profile/events/upload-image', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            
            const imageUrl = response.data?.data?.url
            if (imageUrl) {
              const range = quill.getSelection(true) || { index: quill.getLength() }
              quill.insertEmbed(range.index, 'image', imageUrl)
            }
          } catch (error) {
            console.error('Gagal mengupload gambar:', error)
          }
        }
      }
    })

    // Tambahkan tooltips pada toolbar
    const tooltips = {
      'ql-bold': 'Bold',
      'ql-italic': 'Italic',
      'ql-underline': 'Underline',
      'ql-strike': 'Strike',
      'ql-header': 'Header Size',
      'ql-list[value="ordered"]': 'Ordered List',
      'ql-list[value="bullet"]': 'Bullet List',
      'ql-align': 'Alignment',
      'ql-blockquote': 'Blockquote',
      'ql-link': 'Insert Link',
      'ql-image': 'Insert Image',
      'ql-video': 'Insert Video',
      'ql-clean': 'Clean Format'
    }
    
    setTimeout(() => {
      if (editorContainer.value && editorContainer.value.parentElement) {
        Object.keys(tooltips).forEach(key => {
          const els = editorContainer.value.parentElement.querySelectorAll(`.${key}`);
          els.forEach(el => el.setAttribute('title', tooltips[key]));
        });
      }
    }, 100);

  } catch (error) {
    console.error('Gagal memuat Quill:', error)
  }
})

watch(() => props.modelValue, (newVal) => {
  if (!isUpdating && quill && newVal !== quill.root.innerHTML) {
    quill.root.innerHTML = newVal || ''
  }
})

onBeforeUnmount(() => {
  if (quill) {
    quill.off('text-change')
    quill = null
  }
})
</script>

<style scoped>
/* Menyesuaikan styling toolbar Quill agar sesuai dengan tema, terutama Dark Mode */
.quill-wrapper :deep(.ql-toolbar) {
  border: none !important;
  border-bottom: 1px solid rgba(156, 163, 175, 0.3) !important;
  font-family: inherit;
}
.dark .quill-wrapper :deep(.ql-toolbar) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
}
.dark .quill-wrapper :deep(.ql-stroke) {
  stroke: #cbd5e1;
}
.dark .quill-wrapper :deep(.ql-fill) {
  fill: #cbd5e1;
}
.dark .quill-wrapper :deep(.ql-picker) {
  color: #cbd5e1;
}
.dark .quill-wrapper :deep(.ql-picker-options) {
  background-color: #1e293b;
  border-color: rgba(255, 255, 255, 0.1);
}

.quill-wrapper :deep(.ql-container) {
  border: none !important;
  font-family: inherit;
  font-size: 1rem;
}
.quill-wrapper :deep(.ql-editor) {
  min-height: 250px;
  max-height: 500px;
  overflow-y: auto;
  padding: 1rem;
}
.quill-wrapper :deep(.ql-editor.ql-blank::before) {
  color: #9ca3af;
  font-style: normal;
}
.dark .quill-wrapper :deep(.ql-editor) {
  color: #f8fafc;
}

</style>
