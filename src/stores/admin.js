import { defineStore } from 'pinia'
import { getStorage, setStorage, removeStorage } from '@/utils/storage'
import heroImg from '@/assets/images/hero-mosque.png'
import interiorImg from '@/assets/images/mosque-interior.png'
import communityImg from '@/assets/images/community-prayer.png'
import quranImg from '@/assets/images/quran-study.png'
import exteriorImg from '@/assets/images/mosque-exterior.png'
import grandInteriorImg from '@/assets/images/mosque_grand_interior.png'
import stunningExteriorImg from '@/assets/images/mosque_stunning_exterior.png'
import kajianImg from '@/assets/images/kajian_masjid.png'
import sholatImg from '@/assets/images/sholat_jumat.png'
import sosialImg from '@/assets/images/kegiatan_sosial.png'
import malamImg from '@/assets/images/arsitektur_malam.png'
import kaligrafiImg from '@/assets/images/kaligrafi_masjid.png'
import bpkGojali from '@/assets/images/Gojali Abdul S.jpeg'
import usthAi from '@/assets/images/Usth. Ai Jamaliah.jpeg'
import usthNeneng from '@/assets/images/Usth. Neneng Aam.jpeg'
import usthRani from '@/assets/images/Usth. Rani Rahmayati.jpeg'
import usthDede from '@/assets/images/Usth. Dede Asiah.jpeg'
import usthRini from '@/assets/images/Usth. Rini Dewi Anggiani.jpeg'
import usthRayanthi from '@/assets/images/Usth.Rayanthi.jpeg'

const parseSafe = (key) => {
  try {
    const val = getStorage(key)
    return val ? JSON.parse(val) : null
  } catch (e) {
    return null
  }
}

export const useAdminStore = defineStore('admin', {
  state: () => ({
    isAuthenticated: getStorage('admin_auth') === 'true',
    kegiatan: parseSafe('admin_kegiatan_v4') || [
      { id: 1, title: 'Kajian Akbar Bulanan', type: 'berita', category: 'Kajian', badge: 'Segera', image: communityImg, day: '15', month: 'Jun', time: '09:00 - 12:00', location: 'Aula Utama', author: 'Tim DKM Kassiti', hits: 312, description: 'Kajian ilmu agama bersama ustadz ternama membahas fiqih ibadah dan muamalah kontemporer.', content: '<p>Masjid Jami Kassiti kembali menggelar <strong>Kajian Akbar Bulanan</strong> yang dihadiri lebih dari 300 jamaah dari berbagai penjuru wilayah Arjasari dan sekitarnya. Kajian berlangsung di Aula Utama Masjid dengan penceramah tamu Ustadz H. Ahmad Faruqi, Lc., M.A., alumni Al-Azhar Kairo yang aktif membina majelis taklim di Jawa Barat.</p><p>Tema kajian kali ini adalah <strong>"Fiqih Muamalah Kontemporer: Transaksi Digital dan Hukum Islam"</strong>. Materi sangat relevan mengingat maraknya transaksi berbasis digital, mulai dari dompet elektronik, investasi online, hingga platform pinjaman berbasis aplikasi yang kini menjamur di masyarakat modern.</p><p>Beberapa poin penting yang dibahas antara lain:</p><ul><li>Hukum bertransaksi menggunakan dompet digital dan mata uang kripto dalam perspektif fiqih.</li><li>Syarat dan rukun akad jual beli online agar sesuai syariat Islam.</li><li>Perbedaan antara riba dan bunga bank dalam perspektif ulama kontemporer.</li><li>Alternatif keuangan syariah yang halal dan penuh keberkahan untuk kehidupan sehari-hari.</li></ul><p>Kajian berlangsung sangat interaktif dengan sesi tanya jawab yang antusias. Acara ditutup dengan doa bersama dan ramah tamah. DKM berkomitmen menyelenggarakan kajian berkualitas setiap bulan demi meningkatkan wawasan keagamaan masyarakat.</p><blockquote>"Dengan memahami fiqih muamalah, kita dapat meraih rezeki yang halal sekaligus keberkahan dalam setiap transaksi." &mdash; Ustadz H. Ahmad Faruqi, Lc., M.A.</blockquote>' },
      { id: 2, title: 'Wisuda Santri TPA/TPQ', type: 'berita', category: 'Pendidikan', badge: null, image: quranImg, day: '22', month: 'Jun', time: '08:00 - 11:00', location: 'Masjid Utama', author: 'Pengurus TPQ', hits: 195, description: 'Perayaan kelulusan para santri TPA/TPQ yang telah menyelesaikan program tahfidz dan tilawah.', content: '<p>Sebuah momen membanggakan kembali hadir di Masjid Jami Kassiti. <strong>Wisuda Santri TPA/TPQ Tahun Ajaran 2025/2026</strong> resmi digelar dengan penuh kekhidmatan dan kebahagiaan. Sebanyak 48 santri yang telah menyelesaikan program tahfidz dan tilawah Al-Quran dinyatakan lulus dan berhak menerima ijazah wisuda yang membanggakan.</p><p>Acara wisuda dihadiri oleh para orang tua santri, wali murid, pengurus DKM, serta sejumlah tokoh masyarakat setempat. Suasana penuh haru mewarnai jalannya acara ketika para santri melantunkan hafalan Al-Quran di hadapan seluruh tamu undangan yang hadir memenuhi ruang masjid.</p><p>Rangkaian acara wisuda meliputi:</p><ul><li>Tilawah Al-Quran pembuka oleh santri terbaik angkatan ini.</li><li>Sambutan Kepala TPA/TPQ dan perwakilan DKM Kassiti.</li><li>Prosesi penyerahan ijazah dan penghargaan santri berprestasi.</li><li>Penampilan seni islami: nasyid dan hafalan surat pendek.</li><li>Doa bersama dan tasyakuran sederhana untuk semua peserta yang hadir.</li></ul><p>Kepala TPA/TPQ, Usth. Ai Jamaliah, menyampaikan rasa syukurnya atas pencapaian para santri dan mengajak seluruh orang tua untuk terus mendukung putra-putri mereka dalam perjalanan menuntut ilmu Al-Quran meski telah menyelesaikan program dasar ini.</p><blockquote>"Wisuda ini bukan akhir dari belajar, melainkan awal dari perjalanan panjang menghafal dan mengamalkan Al-Quran dalam kehidupan sehari-hari." &mdash; Usth. Ai Jamaliah</blockquote>' },
      { id: 3, title: 'Bakti Sosial Ramadhan', type: 'berita', category: 'Sosial', badge: null, image: exteriorImg, day: '01', month: 'Jul', time: '07:00 - 10:00', location: 'Halaman Masjid', author: 'Divisi Sosial DKM', hits: 278, description: 'Kegiatan bakti sosial pembagian sembako dan santunan untuk dhuafa dan yatim piatu.', content: '<p>Dalam rangka memperkuat kepedulian sosial dan ukhuwah islamiyah, <strong>DKM Masjid Jami Kassiti</strong> kembali menggelar <strong>Bakti Sosial Ramadhan</strong>. Kegiatan tahunan ini berhasil menyalurkan ratusan paket sembako dan santunan tunai kepada para dhuafa, fakir miskin, dan anak yatim piatu di sekitar lingkungan Perumahan Arjamukti dan desa-desa tetangga.</p><p>Kegiatan berlangsung sejak pukul 07.00 WIB di Halaman Masjid Jami Kassiti dan dihadiri oleh ratusan penerima manfaat yang antri dengan tertib. Setiap paket sembako berisikan beras 5 kg, minyak goreng 2 liter, gula pasir 1 kg, terigu, mi instan, dan kebutuhan pokok lainnya yang disesuaikan dengan kebutuhan masing-masing penerima manfaat.</p><p>Selain penyaluran sembako, DKM juga menyerahkan santunan tunai kepada 30 anak yatim piatu yang hadir bersama walinya. Dana yang terkumpul merupakan hasil donasi jamaah melalui program ZIS (Zakat, Infaq, dan Sedekah) Masjid Jami Kassiti yang dikelola secara transparan dan akuntabel dengan laporan yang dipublikasikan rutin.</p><p>Ketua DKM menegaskan bahwa kegiatan ini merupakan wujud nyata komitmen masjid sebagai pusat dakwah dan sosial kemasyarakatan. Program bakti sosial akan terus dilaksanakan rutin, tidak hanya di bulan Ramadhan, tetapi juga di momen-momen penting lainnya sepanjang tahun.</p><blockquote>"Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya. Kegiatan sosial ini adalah cara nyata kita mengamalkan sabda Rasulullah SAW." &mdash; Ketua DKM Masjid Jami Kassiti</blockquote>' },
      { id: 4, title: 'Kajian Muslimah', type: 'artikel', category: 'Kajian', badge: null, image: communityImg, day: '10', month: 'Jul', time: '13:00 - 15:00', location: 'Aula Lt. 2', author: 'Seksi Dakwah DKM', hits: 156, description: 'Kajian khusus muslimah membahas peranan wanita dalam membangun keluarga Islami.', content: '<p><strong>Kajian Muslimah</strong> Masjid Jami Kassiti hadir kembali dengan tema yang sangat inspiratif: <strong>"Muslimah Cerdas: Membangun Keluarga Sakinah di Era Digital"</strong>. Kajian khusus untuk para ibu, remaja putri, dan muslimah umum ini berlangsung di Aula Lantai 2 Masjid Jami Kassiti dengan penuh semangat dan keantusiasan yang luar biasa dari para peserta.</p><p>Pemateri kajian kali ini adalah Usth. Hj. Siti Maemunah, M.Pd.I., seorang pendidik dan konselor keluarga berpengalaman yang aktif membina kajian muslimah di beberapa masjid di Kabupaten Tasikmalaya. Beliau memaparkan bagaimana muslimah modern dapat memanfaatkan teknologi secara bijak tanpa mengorbankan nilai-nilai keislaman yang mulia.</p><p>Materi utama kajian mencakup topik-topik penting:</p><ul><li>Peran muslimah sebagai madrasah pertama dan utama bagi anak-anaknya sejak dini.</li><li>Tips praktis mendampingi anak di era gadget dan media sosial yang penuh tantangan.</li><li>Menjaga keharmonisan rumah tangga dengan pola komunikasi islami yang sehat dan bijak.</li><li>Pentingnya terus menuntut ilmu agama bagi para muslimah di segala usia dan latar belakang.</li></ul><p>Kajian ini diikuti oleh lebih dari 80 muslimah yang hadir dengan penuh semangat. Sesi tanya jawab berlangsung sangat hidup dengan berbagai pertanyaan seputar permasalahan rumah tangga dan pengasuhan anak yang langsung dijawab dengan perspektif syariat yang bijaksana dan menenangkan hati.</p>' },
      { id: 5, title: 'Pelatihan Pengurusan Jenazah', type: 'artikel', category: 'Pendidikan', badge: null, image: quranImg, day: '18', month: 'Jul', time: '08:30 - 11:30', location: 'Serambi Masjid', author: 'Divisi Pendidikan DKM', hits: 143, description: 'Pelatihan tata cara memandikan, mengkafani, dan menyalatkan jenazah sesuai sunnah.', content: '<p>DKM Masjid Jami Kassiti menyelenggarakan <strong>Pelatihan Tata Cara Pengurusan Jenazah</strong> yang terbuka untuk seluruh jamaah dan masyarakat umum. Pelatihan ini diadakan dalam rangka meningkatkan pemahaman dan kemampuan praktis umat Islam dalam melaksanakan fardhu kifayah pengurusan jenazah sesuai tuntunan syariat Islam yang benar sesuai ajaran Rasulullah SAW.</p><p>Pelatihan dipandu oleh Ustadz Miftahul Huda, S.Ag., seorang praktisi dan pengajar fiqih jenazah yang berpengalaman lebih dari 15 tahun. Materi disampaikan secara sistematis mulai dari teori dasar hingga praktik langsung menggunakan boneka peraga yang telah disiapkan oleh panitia penyelenggara dengan baik.</p><p>Kurikulum pelatihan yang komprehensif meliputi:</p><ul><li>Hukum dan keutamaan mengurus jenazah saudara muslim dalam ajaran Islam.</li><li>Tata cara memandikan jenazah laki-laki dan perempuan sesuai sunnah yang shahih.</li><li>Cara mengkafani jenazah dengan benar sesuai jenis kelamin dan kondisi jenazah.</li><li>Tata cara menshalatkan jenazah: niat, urutan takbir, bacaan doa, dan gerakannya.</li><li>Adab, sunnah, dan hal-hal yang dilarang dalam proses pemakaman jenazah.</li></ul><p>Pelatihan ini sangat diminati jamaah, terbukti dengan kuota 40 peserta yang langsung terpenuhi dalam waktu singkat sejak pendaftaran dibuka. Para peserta mendapatkan sertifikat kehadiran dan modul panduan lengkap sebagai referensi di rumah. DKM berencana mengadakan pelatihan serupa secara rutin setidaknya dua kali dalam setahun ke depannya.</p>' },
      { id: 6, title: 'Mabit & Qiyamullail', type: 'berita', category: 'Ibadah', badge: 'Terbatas', image: exteriorImg, day: '25', month: 'Jul', time: '20:00 - 04:30', location: 'Masjid Utama', author: 'Panitia Mabit DKM', hits: 89, description: 'Malam bina iman dan taqwa, diisi dengan kajian, muhasabah, dan shalat malam berjamaah.', content: '<p>Salah satu program unggulan pembinaan iman dan taqwa di Masjid Jami Kassiti adalah <strong>Mabit (Malam Bina Iman dan Taqwa) sekaligus Qiyamullail berjamaah</strong>. Program ini dirancang khusus untuk mempererat hubungan spiritual jamaah dengan Allah SWT, sekaligus mempererat ukhuwah islamiyah antar sesama jamaah yang hadir bersama.</p><p>Kegiatan dimulai setelah shalat Isya berjamaah dengan agenda kajian malam bertema <strong>"Mendekatkan Diri kepada Allah di Tengah Kesibukan Dunia"</strong>. Setelah kajian, jamaah menjalani muhasabah (introspeksi diri) yang dipandu oleh Ustadz Rudi Hartono, S.Pd.I., dilanjutkan dengan istirahat singkat sebelum bangun untuk shalat malam berjamaah menjelang Subuh.</p><p>Rangkaian kegiatan Mabit secara lengkap dan terstruktur:</p><ul><li>Shalat Isya berjamaah dan pembukaan kajian malam oleh panitia.</li><li>Muhasabah dan refleksi diri bersama yang dipandu oleh ustadz.</li><li>Istirahat bersama di dalam masjid hingga sepertiga malam terakhir.</li><li>Bangun pukul 02.30 WIB untuk shalat Tahajud berjamaah yang khusyuk.</li><li>Shalat Witir dan doa bersama hingga menjelang waktu Subuh tiba.</li><li>Shalat Subuh berjamaah dilanjutkan kultum singkat yang menginspirasi.</li><li>Sarapan bersama dan ramah tamah antar sesama peserta Mabit.</li></ul><p>Program Mabit ini terbuka untuk semua kalangan dengan kapasitas terbatas untuk menjaga kekhusyukan suasana ibadah. Jamaah yang ingin berpartisipasi dipersilakan mendaftar lebih awal melalui panitia DKM Masjid Jami Kassiti sebelum kuota terpenuhi.</p><blockquote>"Barangsiapa yang shalat malam karena iman dan mengharap pahala dari Allah, maka diampuni dosa-dosanya yang telah lalu." &mdash; HR. Bukhari &amp; Muslim</blockquote>' },
    ],
    finance: parseSafe('admin_finance') || {
      saldoAwal: '84,74',
      saldoAwalFull: '84.739.781',
      periodeAwal: 'Jumat, 29 Mei 2026',
      pemasukan: '15',
      pemasukanFull: '15.000.000',
      pengeluaran: '8',
      pengeluaranFull: '8.000.000',
      saldoAkhir: '91,74',
      saldoAkhirFull: '91.739.781',
      periodeAkhir: 'Selasa, 2 Juni 2026',
      periodeSingkat: '29 Mei - 2 Jun',
      selisihBersih: '7.000.000'
    },
    gallery: parseSafe('admin_gallery') || [
      { id: 1, image: heroImg, caption: 'Kawasan Masjid Kassiti', subcaption: 'Pemandangan udara masjid dan perumahan yang asri dan hijau.', tag: 'Udara', iconName: 'MapPin', date: 'Baru saja' },
      { id: 2, image: stunningExteriorImg, caption: 'Pesona Senja', subcaption: 'Kemegahan arsitektur masjid di kala senja dengan tata cahaya yang indah.', tag: 'Eksklusif', iconName: 'Camera', date: 'Baru saja' },
      { id: 3, image: interiorImg, caption: 'Keheningan Interior', subcaption: 'Desain ruang sholat utama yang tenang, sejuk, dan khusyuk.', tag: 'Fasilitas', iconName: 'Building', date: 'Baru saja' },
      { id: 4, image: grandInteriorImg, caption: 'Kemegahan Interior', subcaption: 'Detail ornamen geometris dan lampu gantung kristal yang memukau jamaah.', tag: 'Desain', iconName: 'Building', date: 'Baru saja' },
      { id: 5, image: sholatImg, caption: 'Sholat Jumat Bersama', subcaption: 'Kekhusyukan jamaah saat melaksanakan ibadah sholat Jumat.', tag: 'Ibadah', iconName: 'Users', date: 'Baru saja' },
      { id: 6, image: communityImg, caption: 'Ukhuwah Jamaah', subcaption: 'Momen kebersamaan dan kekeluargaan jamaah Masjid Jami Kassiti.', tag: 'Sosial', iconName: 'Users', date: 'Baru saja' },
      { id: 7, image: kajianImg, caption: 'Kajian Rutin', subcaption: 'Majelis ilmu yang diisi oleh asatidzah berkompeten.', tag: 'Kajian', iconName: 'BookOpen', date: 'Baru saja' },
      { id: 8, image: quranImg, caption: 'Pendidikan Al-Quran', subcaption: 'TPA/TPQ untuk mencetak generasi Islami yang cinta Al-Quran.', tag: 'Edukasi', iconName: 'BookOpen', date: 'Baru saja' },
      { id: 9, image: sosialImg, caption: 'Bakti Sosial', subcaption: 'Kegiatan pembagian santunan untuk warga sekitar.', tag: 'Sosial', iconName: 'Users', date: 'Baru saja' },
      { id: 10, image: exteriorImg, caption: 'Arsitektur Menawan', subcaption: 'Keindahan kubah dan eksterior yang menjadi ikon perumahan.', tag: 'Arsitektur', iconName: 'Camera', date: 'Baru saja' },
      { id: 11, image: malamImg, caption: 'Cahaya Malam', subcaption: 'Suasana masjid yang syahdu dan bercahaya di malam hari.', tag: 'Arsitektur', iconName: 'Camera', date: 'Baru saja' },
      { id: 12, image: kaligrafiImg, caption: 'Detail Kaligrafi', subcaption: 'Seni kaligrafi indah yang menghiasi dinding masjid.', tag: 'Desain', iconName: 'Building', date: 'Baru saja' },
    ],
    layanan: parseSafe('admin_layanan_v8') || [
      { id: 1, title: 'Sholat Berjamaah', category: 'Ibadah', bgImage: communityImg, description: 'Sholat lima waktu dan sholat Jumat berjamaah dengan imam yang berpengalaman.', iconName: 'Sholat', badge: 'Tersedia', badgeColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800', details: { fullDescription: 'Masjid Jami Kassiti menyelenggarakan sholat berjamaah lima waktu secara rutin, dilengkapi dengan fasilitas tempat wudhu yang bersih, karpet yang nyaman, dan pendingin ruangan. Kami juga menyelenggarakan Sholat Jumat dengan khatib-khatib pilihan yang membawakan materi khutbah inspiratif dan aktual.', schedule: 'Setiap Waktu Sholat & Jumat 11.30 WIB', location: 'Ruang Utama & Lantai 2 Masjid Jami Kassiti', contact: 'DKM Masjid (Bpk. Ahmad)', requirements: ['Pakaian sopan dan menutup aurat', 'Menjaga ketertiban dan kebersihan'] } },
      { id: 2, title: 'Kajian Rutin', category: 'Pendidikan', bgImage: interiorImg, description: 'Kajian ilmu agama setiap pekan meliputi tafsir, hadits, fiqih, dan akhlak.', iconName: 'BookOpen', badge: 'Terjadwal', badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800', details: { fullDescription: 'Program kajian rutin terbuka untuk umum (Ikhwan & Akhwat) yang diisi oleh asatidzah berkompeten. Materi kajian disusun secara terstruktur mulai dari dasar hingga lanjutan, mencakup pembahasan Tafsir Al-Quran, Hadits Arbain, Fiqih Ibadah, dan Sirah Nabawiyah.', schedule: 'Rabu (Ba\'da Maghrib) & Ahad (Ba\'da Subuh)', location: 'Ruang Utama Masjid', contact: 'Divisi Dakwah (Bpk. Rizky)', requirements: ['Membawa alat tulis (opsional)', 'Terbuka untuk umum'] } },
      { id: 3, title: 'TPQ (Taman Pendidikan Al-Qur\'an)', category: 'Pendidikan', bgImage: quranImg, description: 'Program pendidikan Al-Quran untuk anak-anak dengan metode pembelajaran modern.', iconName: 'GraduationCap', badge: 'Pendaftaran Buka', badgeColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800', details: { fullDescription: 'Taman Pendidikan Al-Quran (TPQ) Masjid Jami Kassiti mendidik generasi muda agar cinta Al-Quran. Kurikulum mencakup baca tulis Al-Quran (Metode Iqro/Tilawati), hafalan surat pendek, doa sehari-hari, praktik ibadah, dan pembentukan akhlakul karimah.', schedule: 'Senin - Kamis, 15.30 - 17.00 WIB', location: 'Ruang Kelas TPA (Lantai 2)', contact: 'Kepala TPA (Usth. Ai Jamaliah)', requirements: ['Usia 5 - 12 Tahun', 'Mengisi formulir pendaftaran', 'Fotokopi Akta Kelahiran'], staff: [{ name: 'Usth. Ai Jamaliah', role: 'Kepala Sekolah', image: usthAi }, { name: 'Usth. Rini Dewi Anggiani', role: 'Guru', image: usthRini }, { name: 'Usth. Dede Asiah', role: 'Guru', image: usthDede }, { name: 'Usth. Rani Rahmayati', role: 'Guru', image: usthRani }] } },
      { id: 6, title: 'DTA (Diniyah Takmiliyah Awaliyah)', category: 'Pendidikan', bgImage: quranImg, description: 'Program pendidikan keagamaan Islam non-formal sebagai pelengkap pendidikan formal anak.', iconName: 'GraduationCap', badge: 'Pendaftaran Buka', badgeColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800', details: { fullDescription: 'Diniyah Takmiliyah Awaliyah (DTA) Masjid Jami Kassiti menyelenggarakan pendidikan keagamaan Islam bagi anak-anak usia sekolah dasar. Program ini dirancang untuk memperkuat pemahaman agama anak di luar jam sekolah formal dengan kurikulum terpadu meliputi Aqidah, Akhlak, Fiqih Ibadah, Tarikh (Sejarah Islam), Hadits, serta praktik ibadah sehari-hari.', schedule: 'Senin - Sabtu, 15.30 - 17.00 WIB', location: 'Ruang Kelas Lantai 2 Masjid Jami Kassiti', contact: 'Kepala DTA (Usth. Neneng Aam S.M)', requirements: ['Mengisi formulir pendaftaran', 'Fotokopi Akta Kelahiran & Kartu Keluarga', 'Membayar biaya administrasi pendaftaran'], staff: [{ name: 'Bpk. Dani R', role: 'Guru' }, { name: 'Usth. Neneng Aam Siti Marhamah', role: 'Kepala DTA', image: usthNeneng }, { name: 'Usth. Raya', role: 'Guru', image: usthRayanthi }, { name: 'Usth. Sani', role: 'Guru' }] } },
      { id: 5, title: 'Zakat & Infaq', category: 'Ibadah', bgImage: exteriorImg, description: 'Pengelolaan dan penyaluran zakat, infaq, dan sedekah secara transparan.', iconName: 'HandCoins', badge: 'Aktif', badgeColor: 'bg-primary/10 text-primary-dark dark:text-primary-light border border-primary/20', details: { fullDescription: 'Unit Pengumpul Zakat (UPZ) Masjid Jami Kassiti memfasilitasi jamaah dalam menunaikan Zakat Fitrah, Zakat Maal, Infaq, dan Sedekah. Dana yang terkumpul disalurkan kepada asnaf yang berhak and untuk operasional kemakmuran masjid dengan laporan keuangan yang dipublikasikan rutin.', schedule: 'Layanan 24 Jam (Transfer) / 08.00-17.00 (Offline)', location: 'Kantor Sekretariat Masjid', contact: 'Divisi ZISWAF (Bpk. Lukman)', requirements: ['Menerima konsultasi hitung Zakat Maal', 'Menerima jemput zakat khusus area terdekat'] } },
      { id: 4, title: 'Remaja Masjid', category: 'Sosial', bgImage: sosialImg, description: 'Wadah kegiatan dan kreativitas pemuda-pemudi muslim Masjid Jami Kassiti.', iconName: 'Users', badge: 'Aktif', badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800', details: { fullDescription: 'Remaja Masjid Jami Kassiti (IRMAS) merupakan wadah pembinaan, kreativitas, dan kolaborasi pemuda-pemudi muslim dalam memakmurkan masjid. Kegiatan meliputi kajian kepemudaan, pelatihan skill, olahraga, bakti sosial, dan pengembangan seni budaya Islami.', schedule: 'Setiap Akhir Pekan (Sabtu & Ahad)', location: 'Masjid Jami Kassiti & Lingkungan Sekitar', contact: 'Koordinator IRMAS (Sdr. Gojali)', requirements: ['Pemuda/pemudi usia 13 - 25 tahun', 'Memiliki semangat belajar dan berorganisasi', 'Mengisi form keanggotaan'], staff: [{ name: 'Bpk. Gojali Abdul Syafi\'i', role: 'Koordinator', image: bpkGojali }, { name: 'Usth. Rani Rahmayati', role: 'Anggota', image: usthRani }, { name: 'Usth. Rayanthi', role: 'Anggota', image: usthRayanthi }] } }
    ],
    generalSettings: parseSafe('admin_general_settings') || {
      name: 'Masjid Jami Kassiti',
      slogan: 'Membangun <span class="text-gradient-gold">Iman</span>,<br class="hidden sm:block" /> Ilmu, dan <span class="text-gradient-gold">Ukhuwah</span>',
      description: 'Selamat datang di Masjid Jami Kassiti Perum Arjamukti Kencana Raya Arjasari, Leuwisari, Kab. Tasikmalaya. Bergabunglah bersama kami dalam ibadah, pembelajaran, dakwah, dan pelayanan umat.',
      history: 'Masjid Jami Kassiti yang berlokasi di Perum Arjamukti Kencana Raya, Arjasari, Leuwisari, Kab. Tasikmalaya, adalah pusat ibadah dan kegiatan keislaman yang melayani umat dengan penuh dedikasi. Kami berkomitmen untuk menjadi rumah Allah yang menyejukkan, tempat berkumpulnya jamaah dalam menuntut ilmu, beribadah, dan mempererat ukhuwah islamiah.\n\nDengan berbagai program kegiatan rutin seperti kajian, TPA/TPQ, dan kegiatan sosial, kami berusaha membangun generasi muslim yang beriman, berilmu, dan bermanfaat bagi masyarakat sekitar.',
      instagram: 'https://instagram.com/dkmjami.kassiti',
      facebook: 'https://facebook.com/dkmjami.kassiti',
      youtube: 'https://youtube.com/@dkmjami.kassiti',
      email: 'dkmjami.kassiti@gmail.com',
      whatsapp: '6281234567890',
      maps: 'https://maps.google.com'
    },
    ctaSettings: parseSafe('admin_cta_settings') || {
      title: 'Investasi Terbaik Untuk Akhirat',
      subtitle: 'Setiap rupiah yang Anda sedekahkan tidak hanya memakmurkan masjid, tapi juga mengalirkan pahala yang tak terputus bagi Anda dan keluarga.',
      quote: '"Barang siapa yang membangun masjid karena Allah, maka Allah akan membangunkan baginya rumah di surga."',
      quoteSource: 'HR. Bukhari & Muslim',
      totalDonors: 128,
      programs: [
        { id: 1, name: 'Renovasi Aula Utama', progress: 75 },
        { id: 2, name: 'Sarana Pendidikan TPQ', progress: 60 }
      ]
    },
    masterData: parseSafe('admin_master_data_v2') || {
      kategori: [
        { id: 1, name: 'Kajian', description: 'Kegiatan belajar agama bersama ustadz', iconName: 'BookOpen' },
        { id: 2, name: 'Pendidikan', description: 'Kegiatan edukasi dan pembelajaran', iconName: 'GraduationCap' },
        { id: 3, name: 'Sosial', description: 'Kegiatan sosial kemasyarakatan', iconName: 'Users' },
        { id: 4, name: 'Ibadah', description: 'Kegiatan peribadahan jamaah', iconName: 'Heart' },
        { id: 5, name: 'Umum', description: 'Kegiatan umum lainnya', iconName: 'Info' }
      ],
      label: [
        { id: 1, name: 'Segera', description: 'Akan segera dilaksanakan', color: 'red' },
        { id: 2, name: 'Terbatas', description: 'Kuota terbatas', color: 'yellow' },
        { id: 3, name: 'Tersedia', description: 'Fasilitas / Layanan tersedia', color: 'green' },
        { id: 4, name: 'Baru', description: 'Informasi atau foto terbaru', color: 'blue' }
      ],
      status: [
        { id: 1, name: 'Aktif', description: 'Ditampilkan secara publik', color: 'green' },
        { id: 2, name: 'Nonaktif', description: 'Disembunyikan dari publik', color: 'gray' }
      ],
    }
  }),
  actions: {
    login(username, password) {
      if (username === 'admin' && password === 'admin123') {
        this.isAuthenticated = true
        setStorage('admin_auth', 'true')
        return true
      }
      return false
    },
    logout() {
      this.isAuthenticated = false
      removeStorage('admin_auth')
    },
    addKegiatan(data) {
      const newId = this.kegiatan.length > 0 ? Math.max(...this.kegiatan.map((k) => k.id)) + 1 : 1
      this.kegiatan.push({ ...data, id: newId })
      this.saveKegiatan()
    },
    updateKegiatan(id, updatedData) {
      const index = this.kegiatan.findIndex((k) => k.id === id)
      if (index !== -1) {
        this.kegiatan[index] = { ...this.kegiatan[index], ...updatedData }
        this.saveKegiatan()
      }
    },
    deleteKegiatan(id) {
      this.kegiatan = this.kegiatan.filter((k) => k.id !== id)
      this.saveKegiatan()
    },
    saveKegiatan() {
      setStorage('admin_kegiatan_v4', JSON.stringify(this.kegiatan))
    },
    updateFinance(data) {
      this.finance = { ...this.finance, ...data }
      setStorage('admin_finance', JSON.stringify(this.finance))
    },
    addGallery(data) {
      const newId = this.gallery.length > 0 ? Math.max(...this.gallery.map((g) => g.id)) + 1 : 1
      this.gallery.push({ ...data, id: newId })
      this.saveGallery()
    },
    updateGallery(id, updatedData) {
      const index = this.gallery.findIndex((g) => g.id === id)
      if (index !== -1) {
        this.gallery[index] = { ...this.gallery[index], ...updatedData }
        this.saveGallery()
      }
    },
    deleteGallery(id) {
      this.gallery = this.gallery.filter((g) => g.id !== id)
      this.saveGallery()
    },
    saveGallery() {
      setStorage('admin_gallery', JSON.stringify(this.gallery))
    },
    addLayanan(data) {
      const newId = this.layanan.length > 0 ? Math.max(...this.layanan.map((l) => l.id)) + 1 : 1
      this.layanan.push({ ...data, id: newId })
      this.saveLayanan()
    },
    updateLayanan(id, updatedData) {
      const index = this.layanan.findIndex((l) => l.id === id)
      if (index !== -1) {
        this.layanan[index] = { ...this.layanan[index], ...updatedData }
        this.saveLayanan()
      }
    },
    deleteLayanan(id) {
      this.layanan = this.layanan.filter((l) => l.id !== id)
      this.saveLayanan()
    },
    saveLayanan() {
      setStorage('admin_layanan_v8', JSON.stringify(this.layanan))
    },
    saveGeneralSettings() {
      setStorage('admin_general_settings', JSON.stringify(this.generalSettings))
    },
    saveCtaSettings() {
      setStorage('admin_cta_settings', JSON.stringify(this.ctaSettings))
    },
    saveMasterData() {
      setStorage('admin_master_data_v2', JSON.stringify(this.masterData))
    }
  }
})
