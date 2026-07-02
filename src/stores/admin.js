import { defineStore } from 'pinia'
import { getStorage, setStorage, removeStorage } from '@/utils/storage'
import api from '@/utils/api'

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
    currentUser: parseSafe('admin_current_user') || { id: 1, username: 'admin', name: 'Super Admin', role: 'superadmin' },
    roles: [
      { id: 1, key: 'superadmin', name: 'Super Admin', hierarchy: 1, modules: ['web', 'keuangan', 'qurban', 'sistem'] },
      { id: 2, key: 'bendahara', name: 'Bendahara', hierarchy: 2, modules: ['keuangan'] },
      { id: 3, key: 'sekretaris', name: 'Sekretaris', hierarchy: 3, modules: ['web'] }
    ],
    users: [
      { id: 1, username: 'admin', name: 'Super Admin', role: 'superadmin', password: 'admin123' },
      { id: 2, username: 'bendahara', name: 'Bendahara', role: 'bendahara', password: 'password123' },
      { id: 3, username: 'sekretaris', name: 'Sekretaris', role: 'sekretaris', password: 'password123' }
    ],
    auditLogs: parseSafe('admin_audit_logs') || [],
    committee: { dewanPenasihat: [], pengurusHarian: [], divisi: [] },
    kegiatan: [],
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
    gallery: [],
    layanan: [],
    generalSettings: {
      name: '',
      slogan: '',
      description: '',
      history: '',
      floatingCardTitle: '',
      floatingCardDesc: '',
      tahunBerdiri: 2015,
      jamaahAktif: 0,
      heroImages: [],
      historyImage: '',
      committeeDescription: '',
      instagram: '',
      facebook: '',
      youtube: '',
      twitter: '',
      tiktok: '',
      whatsapp: [],
      email: '',
      teleponKantor: '',
      alamatLengkap: '',
      kota: '',
      kodepos: '',
      maps: '',
      mapsIframe: ''
    },
    ctaSettings: {
      title: '',
      subtitle: '',
      quote: '',
      quoteSource: '',
      totalDonors: 0,
      programs: [],
      sliderImages: []
    },
    masterData: { kategori: [], tipeBerita: [], label: [], status: [] }
  }),
  getters: {
    currentRoleData: (state) => {
      return state.roles.find(r => r.key === state.currentUser?.role) || null;
    },
    hasModuleAccess: (state) => {
      return (moduleKey) => {
        const roleData = state.roles.find(r => r.key === state.currentUser?.role);
        return roleData ? roleData.modules.includes(moduleKey) : false;
      }
    },
    canManageRole: (state) => {
      return (targetHierarchy) => {
        const roleData = state.roles.find(r => r.key === state.currentUser?.role);
        // User can only manage roles with a hierarchy numerically strictly greater than their own (1 is highest)
        return roleData ? roleData.hierarchy < targetHierarchy : false;
      }
    }
  },
  actions: {
    logActivity(actionName, details) {
      if (!this.currentUser) return;
      const newLog = {
        id: Date.now(),
        userId: this.currentUser.id,
        userName: this.currentUser.name,
        userRole: this.currentUser.role,
        action: actionName,
        details: details,
        timestamp: new Date().toISOString()
      };
      this.auditLogs.unshift(newLog); // Add to beginning
      if (this.auditLogs.length > 500) {
        this.auditLogs = this.auditLogs.slice(0, 500); // Keep max 500 logs
      }
      setStorage('admin_audit_logs', JSON.stringify(this.auditLogs));
    },
    async login(username, password) {
      try {
        const response = await api.post('/auth/login', {
          email: username, // assuming username is used as email or identifier
          password: password
        });
        
        const resData = response.data && response.data.data ? response.data.data : response.data;
        if (resData && resData.token) {
          const { token, user } = resData;
          
          this.isAuthenticated = true;
          this.currentUser = user;
          
          // Save token to localStorage for the interceptor
          localStorage.setItem('auth_token', token);
          setStorage('admin_auth', 'true');
          setStorage('admin_current_user', JSON.stringify(this.currentUser));
          
          this.logActivity('Login', 'Berhasil login ke sistem');
          return true;
        }
        return false;
      } catch (error) {
        console.error('Login error:', error);
        return false;
      }
    },
    async logout() {
      if (this.isAuthenticated) {
        try {
          await api.post('/auth/logout');
          this.logActivity('Logout', 'Keluar dari sistem');
        } catch (error) {
          console.error('Logout error:', error);
        }
      }
      this.isAuthenticated = false;
      this.currentUser = null;
      localStorage.removeItem('auth_token');
      removeStorage('admin_auth');
      removeStorage('admin_current_user');
    },
    async fetchKegiatan() {
      try {
        const res = await api.get('/web-profile/events');
        this.kegiatan = res.data.data || res.data;
      } catch (err) {
        console.error('Failed to fetch kegiatan:', err);
        throw err;
      }
    },
    async addKegiatan(data) {
      try {
        await api.post('/web-profile/events', data);
        await this.fetchKegiatan();
        this.logActivity('Tambah Kegiatan', 'Menambahkan kegiatan/acara baru');
      } catch (err) {
        console.error('Failed to add kegiatan:', err);
        throw err;
      }
    },
    async updateKegiatan(id, updatedData) {
      try {
        if (updatedData instanceof FormData) {
          updatedData.append('_method', 'PUT');
          await api.post(`/web-profile/events/${id}`, updatedData);
        } else {
          await api.put(`/web-profile/events/${id}`, updatedData);
        }
        await this.fetchKegiatan();
        this.logActivity('Ubah Kegiatan', 'Memperbarui data kegiatan/acara');
      } catch (err) {
        console.error('Failed to update kegiatan:', err);
        throw err;
      }
    },
    async deleteKegiatan(id) {
      try {
        await api.delete(`/web-profile/events/${id}`);
        await this.fetchKegiatan();
        this.logActivity('Hapus Kegiatan', 'Menghapus data kegiatan/acara');
      } catch (err) {
        console.error('Failed to delete kegiatan:', err);
        throw err;
      }
    },
    updateFinance(data) {
      this.finance = { ...this.finance, ...data }
      setStorage('admin_finance', JSON.stringify(this.finance))
      this.logActivity('Ubah Keuangan', 'Memperbarui data laporan keuangan');
    },
    async fetchGallery() {
      try {
        const res = await api.get('/web-profile/galleries');
        this.gallery = res.data.data || res.data;
      } catch (err) {
        console.error('Failed to fetch gallery:', err);
        throw err;
      }
    },
    async addGallery(data) {
      try {
        await api.post('/web-profile/galleries', data);
        await this.fetchGallery();
        this.logActivity('Tambah Galeri', 'Menambahkan foto galeri baru');
      } catch (err) {
        console.error('Failed to add gallery:', err);
        throw err;
      }
    },
    async updateGallery(id, updatedData) {
      try {
        await api.put(`/web-profile/galleries/${id}`, updatedData);
        await this.fetchGallery();
        this.logActivity('Ubah Galeri', 'Memperbarui data galeri foto');
      } catch (err) {
        console.error('Failed to update gallery:', err);
        throw err;
      }
    },
    async deleteGallery(id) {
      try {
        await api.delete(`/web-profile/galleries/${id}`);
        await this.fetchGallery();
        this.logActivity('Hapus Galeri', 'Menghapus foto galeri');
      } catch (err) {
        console.error('Failed to delete gallery:', err);
        throw err;
      }
    },
    async fetchLayanan() {
      try {
        const res = await api.get('/web-profile/services');
        // Assume API returns { data: [...] } or just an array
        this.layanan = res.data.data || res.data;
      } catch (err) {
        console.error('Failed to fetch layanan:', err);
        throw err;
      }
    },
    async addLayanan(data) {
      try {
        await api.post('/web-profile/services', data);
        await this.fetchLayanan();
        this.logActivity('Tambah Layanan', 'Menambahkan layanan masjid baru');
      } catch (err) {
        console.error('Failed to add layanan:', err);
        throw err;
      }
    },
    async updateLayanan(id, updatedData) {
      try {
        await api.put(`/web-profile/services/${id}`, updatedData);
        await this.fetchLayanan();
        this.logActivity('Ubah Layanan', 'Memperbarui data layanan masjid');
      } catch (err) {
        console.error('Failed to update layanan:', err);
        throw err;
      }
    },
    async deleteLayanan(id) {
      try {
        await api.delete(`/web-profile/services/${id}`);
        await this.fetchLayanan();
        this.logActivity('Hapus Layanan', 'Menghapus data layanan masjid');
      } catch (err) {
        console.error('Failed to delete layanan:', err);
        throw err;
      }
    },
    async fetchGeneralSettings() {
      try {
        const res = await api.get('/web-profile/settings');
        const data = res.data.data || res.data;
        
        // Map backend snake_case to frontend camelCase
        this.generalSettings = {
          name: data.nama_masjid || '',
          slogan: data.slogan || '',
          description: data.deskripsi_sambutan || '',
          history: data.sejarah_singkat || '',
          floatingCardTitle: data.floating_card_title || '',
          floatingCardDesc: data.floating_card_desc || '',
          tahunBerdiri: data.tahun_berdiri || 2015,
          jamaahAktif: data.jamaah_aktif || 200,
          heroImages: data.hero_images || [],
          historyImage: data.history_image || '',
          committeeDescription: data.committee_description || '',
          instagram: data.link_instagram || '',
          facebook: data.link_facebook || '',
          youtube: data.link_youtube || '',
          twitter: data.link_twitter || '',
          tiktok: data.link_tiktok || '',
          whatsapp: data.whatsapp || [],
          email: data.email || '',
          teleponKantor: data.telepon_kantor || '',
          alamatLengkap: data.alamat_lengkap || '',
          kota: data.kota || '',
          kodepos: data.kodepos || '',
          maps: data.link_maps || '',
          mapsIframe: data.maps_iframe || ''
        };
      } catch (err) {
        console.error('Failed to fetch general settings:', err);
        throw err;
      }
    },
    async saveGeneralSettings() {
      try {
        // Map frontend camelCase to backend snake_case
        const payload = {
          nama_masjid: this.generalSettings.name,
          slogan: this.generalSettings.slogan,
          deskripsi_sambutan: this.generalSettings.description,
          sejarah_singkat: this.generalSettings.history,
          floating_card_title: this.generalSettings.floatingCardTitle,
          floating_card_desc: this.generalSettings.floatingCardDesc,
          tahun_berdiri: this.generalSettings.tahunBerdiri,
          jamaah_aktif: this.generalSettings.jamaahAktif,
          hero_images: this.generalSettings.heroImages,
          history_image: this.generalSettings.historyImage,
          committee_description: this.generalSettings.committeeDescription,
          link_instagram: this.generalSettings.instagram,
          link_facebook: this.generalSettings.facebook,
          link_youtube: this.generalSettings.youtube,
          link_twitter: this.generalSettings.twitter,
          link_tiktok: this.generalSettings.tiktok,
          whatsapp: this.generalSettings.whatsapp,
          email: this.generalSettings.email,
          telepon_kantor: this.generalSettings.teleponKantor,
          alamat_lengkap: this.generalSettings.alamatLengkap,
          kota: this.generalSettings.kota,
          kodepos: this.generalSettings.kodepos,
          link_maps: this.generalSettings.maps,
          maps_iframe: this.generalSettings.mapsIframe
        };

        await api.put('/web-profile/settings', payload);
        this.logActivity('Ubah Pengaturan', 'Memperbarui pengaturan umum (teks sambutan, dsb)');
        await this.fetchGeneralSettings();
      } catch (err) {
        console.error('Failed to save general settings:', err);
        throw err;
      }
    },
    async fetchCtaSettings() {
      try {
        const res = await api.get('/web-profile/cta');
        const data = res.data.data || res.data;
        
        // Map backend to frontend
        this.ctaSettings = {
          title: data.title || '',
          subtitle: data.subtitle || '',
          quote: data.quote || '',
          quoteSource: data.quote_source || '',
          totalDonors: data.total_donors || 0,
          sliderImages: data.slider_images || [],
          programs: data.programs || []
        };
      } catch (err) {
        console.error('Failed to fetch CTA settings:', err);
        throw err;
      }
    },
    async saveCtaSettings() {
      try {
        // Map frontend to backend
        const payload = {
          title: this.ctaSettings.title,
          subtitle: this.ctaSettings.subtitle,
          quote: this.ctaSettings.quote,
          quote_source: this.ctaSettings.quoteSource,
          total_donors: this.ctaSettings.totalDonors,
          slider_images: this.ctaSettings.sliderImages,
          programs: (this.ctaSettings.programs || []).map(p => ({
            id: p.id,
            name: p.name,
            progress: p.progress
          }))
        };

        await api.put('/web-profile/cta', payload);
        this.logActivity('Ubah Donasi', 'Memperbarui pengaturan CTA Donasi');
        await this.fetchCtaSettings();
      } catch (err) {
        console.error('Failed to save CTA settings:', err);
        throw err;
      }
    },
    async fetchMasterData() {
      try {
        const res = await api.get('/web-profile/master-categories');
        const data = res.data.data || res.data;
        
        const mapItem = (item) => ({
          id: item.id,
          name: item.name,
          description: item.description || '',
          iconName: item.icon_name || '',
          color: item.color || ''
        });

        this.masterData = {
          kategori: (data.kategori || []).map(mapItem),
          tipeBerita: (data.tipeBerita || []).map(mapItem),
          label: (data.label || []).map(mapItem),
          status: (data.status || []).map(mapItem)
        };
      } catch (err) {
        console.error('Failed to fetch master data:', err);
        throw err;
      }
    },
    async saveMasterData() {
      try {
        const mapItemPayload = (item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          icon_name: item.iconName,
          color: item.color
        });

        const payload = {
          kategori: (this.masterData.kategori || []).map(mapItemPayload),
          tipeBerita: (this.masterData.tipeBerita || []).map(mapItemPayload),
          label: (this.masterData.label || []).map(mapItemPayload),
          status: (this.masterData.status || []).map(mapItemPayload)
        };

        await api.put('/web-profile/master-categories/bulk', payload);
        this.logActivity('Ubah Master Data', 'Memperbarui master data (kategori/label)');
        await this.fetchMasterData();
      } catch (err) {
        console.error('Failed to save master data:', err);
        throw err;
      }
    },
    async fetchCommittee() {
      try {
        const res = await api.get('/web-profile/committee');
        const data = res.data.data || res.data;
        
        const defaultAvatar = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2394A3B8" style="background:%23F1F5F9"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;

        const mapMember = (m) => ({
          id: m.id,
          name: m.name,
          role: m.role,
          image: m.image ? m.image : defaultAvatar,
          isLeader: m.is_leader !== undefined ? Boolean(m.is_leader) : Boolean(m.isLeader || false)
        });

        this.committee = {
          dewanPenasihat: (data.dewanPenasihat || []).map(mapMember),
          pengurusHarian: (data.pengurusHarian || []).map(mapMember),
          divisi: (data.divisi || []).map(d => ({
            id: d.id,
            name: d.name,
            members: (d.members || []).map(mapMember)
          }))
        };
      } catch (err) {
        console.error('Failed to fetch committee:', err);
        throw err;
      }
    },
    async saveCommittee() {
      try {
        await api.put('/web-profile/committee', this.committee);
        setStorage('admin_committee_v3', JSON.stringify(this.committee));
        this.logActivity('Ubah Pengurus', 'Memperbarui struktur pengurus DKM');
      } catch (err) {
        console.error('Failed to save committee:', err);
        throw err;
      }
    },
    async fetchUsers() {
      try {
        const res = await api.get('/users');
        this.users = res.data.data || res.data;
      } catch (err) {
        console.error('Failed to fetch users:', err);
        throw err;
      }
    },
    async addUser(userData) {
      try {
        await api.post('/users', userData);
        await this.fetchUsers();
        this.logActivity('Tambah Pengguna', `Menambahkan admin baru: ${userData.username}`);
      } catch (err) {
        console.error('Failed to add user:', err);
        throw err;
      }
    },
    async updateUser(id, userData) {
      try {
        await api.put(`/users/${id}`, userData);
        await this.fetchUsers();
        const user = this.users.find(u => u.id === id);
        this.logActivity('Ubah Pengguna', `Memperbarui data admin: ${user ? user.username : id}`);
      } catch (err) {
        console.error('Failed to update user:', err);
        throw err;
      }
    },
    async deleteUser(id) {
      try {
        const user = this.users.find(u => u.id === id);
        await api.delete(`/users/${id}`);
        await this.fetchUsers();
        this.logActivity('Hapus Pengguna', `Menghapus admin: ${user ? user.username : id}`);
      } catch (err) {
        console.error('Failed to delete user:', err);
        throw err;
      }
    },
    saveUsers() {
      // deprecated locally
    },
    recalculateHierarchy() {
      this.roles.forEach((r, index) => {
        r.hierarchy = index + 1;
      });
      this.saveRoles();
    },
    async fetchRoles() {
      try {
        const res = await api.get('/roles');
        this.roles = res.data.data || res.data;
      } catch (err) {
        console.error('Failed to fetch roles:', err);
        throw err;
      }
    },
    async moveRoleUp(id) {
      try {
        await api.patch(`/roles/${id}/move`, { direction: 'up' });
        await this.fetchRoles();
      } catch (err) {
        console.error('Failed to move role up:', err);
        throw err;
      }
    },
    async moveRoleDown(id) {
      try {
        await api.patch(`/roles/${id}/move`, { direction: 'down' });
        await this.fetchRoles();
      } catch (err) {
        console.error('Failed to move role down:', err);
        throw err;
      }
    },
    async addRole(roleData) {
      try {
        await api.post('/roles', roleData);
        await this.fetchRoles();
        this.logActivity('Tambah Role', `Menambahkan peran baru: ${roleData.name}`);
      } catch (err) {
        console.error('Failed to add role:', err);
        throw err;
      }
    },
    async updateRole(id, roleData) {
      try {
        await api.put(`/roles/${id}`, roleData);
        await this.fetchRoles();
        this.logActivity('Ubah Role', `Memperbarui data peran: ${roleData.name}`);
      } catch (err) {
        console.error('Failed to update role:', err);
        throw err;
      }
    },
    async deleteRole(id) {
      try {
        await api.delete(`/roles/${id}`);
        await this.fetchRoles();
        this.logActivity('Hapus Role', `Menghapus peran id: ${id}`);
      } catch (err) {
        console.error('Failed to delete role:', err);
        throw err;
      }
    },
    saveRoles() {
      // deprecated locally
    }
  }
})
