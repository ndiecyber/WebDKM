/**
 * Keuangan Field Mapper
 * 
 * Maps between FE (camelCase/English) and BE (snake_case/Bahasa Indonesia) field names.
 * Centralizes all naming convention translations for consistent FE↔BE communication.
 */

// ============================================================================
// Tipe Mapping (Bank/Kas)
// ============================================================================

const TIPE_TO_FE = {
  'tunai': 'Kas Tunai',
  'rekening': 'Bank',
  'dompet_digital': 'Dompet Digital'
}

const TIPE_TO_BE = {
  'Kas Tunai': 'tunai',
  'Bank': 'rekening',
  'Dompet Digital': 'dompet_digital'
}

export const mapTipeToFe = (tipe) => TIPE_TO_FE[tipe] || tipe || 'Kas Tunai'
export const mapTipeToBe = (type) => TIPE_TO_BE[type] || type || 'tunai'

// ============================================================================
// Transaction Tipe Mapping
// ============================================================================

const TX_TIPE_TO_FE = {
  'pemasukan': 'in',
  'pengeluaran': 'out',
  'transfer': 'transfer'
}

const TX_TIPE_TO_BE = {
  'in': 'pemasukan',
  'out': 'pengeluaran',
  'transfer': 'transfer'
}

export const mapTxTipeToFe = (tipe) => TX_TIPE_TO_FE[tipe] || tipe
export const mapTxTipeToBe = (type) => TX_TIPE_TO_BE[type] || type

// ============================================================================
// Bank/Kas Mappers
// ============================================================================

export const mapBankKasFromApi = (data) => ({
  id: data.id,
  name: data.nama,
  type: mapTipeToFe(data.tipe),
  accountNo: data.nomor_rekening || '',
  ownerName: data.atas_nama || '',
  desc: data.deskripsi || '',
  balance: parseFloat(data.saldo_terkini) || 0,
  initialBalance: parseFloat(data.saldo_awal) || 0,
  color: data.color || 'gray',
  isPinned: data.is_pinned || false,
  isActive: data.status === 'aktif',
  qrImage: data.qr_image_path || null,
  visibilitasPublik: data.visibilitas_publik || false,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
})

export const mapBankKasToApi = (data) => {
  const mapped = {}
  if (data.name !== undefined) mapped.nama = data.name
  if (data.type !== undefined) mapped.tipe = mapTipeToBe(data.type)
  if (data.accountNo !== undefined) mapped.nomor_rekening = data.accountNo || null
  if (data.ownerName !== undefined) mapped.atas_nama = data.ownerName || null
  if (data.desc !== undefined) mapped.deskripsi = data.desc || null
  if (data.initialBalance !== undefined) mapped.saldo_awal = data.initialBalance
  if (data.color !== undefined) mapped.color = data.color
  if (data.isPinned !== undefined) mapped.is_pinned = data.isPinned
  if (data.isActive !== undefined) mapped.status = data.isActive ? 'aktif' : 'non_aktif'
  if (data.visibilitasPublik !== undefined) mapped.visibilitas_publik = data.visibilitasPublik
  return mapped
}

// ============================================================================
// Transaction Mappers
// ============================================================================

export const mapTransactionFromApi = (data) => ({
  id: data.id,
  nomorTransaksi: data.nomor_transaksi || '',
  date: data.tanggal ? data.tanggal.split('T')[0] : '',
  name: data.nama || '',
  description: data.deskripsi || '',
  category: data.category?.nama || '',
  categoryId: data.category_id,
  account: data.bank_kas_tujuan?.nama || data.bank_kas_asal?.nama || '',
  bankKasAsalId: data.bank_kas_asal_id,
  bankKasTujuanId: data.bank_kas_tujuan_id,
  bankKasAsal: data.bank_kas_asal?.nama || '',
  bankKasTujuan: data.bank_kas_tujuan?.nama || '',
  program_id: data.program_id || null,
  programName: data.program?.nama || '',
  type: mapTxTipeToFe(data.tipe),
  status: data.status || 'pending',
  amount: parseFloat(data.nominal) || 0,
  biayaAdmin: parseFloat(data.biaya_admin) || 0,
  jamaahId: data.jamaah_id || null,
  jamaahName: data.jamaah?.nama_lengkap || '',
  createdBy: data.created_by,
  createdByName: data.created_by_user?.name || data.created_by?.name || '',
  createdAt: data.created_at,
})

export const mapTransactionToApi = (data) => {
  const mapped = {
    tipe: mapTxTipeToBe(data.type || data.tipe),
    nama: data.name || data.description || '', // 'nama' is required by BE
    nominal: parseFloat(data.amount) || 0,
    tanggal: data.date || null,
    deskripsi: data.description || null,
    category_id: data.categoryId || data.category_id || null,
    program_id: data.program_id || null,
    status: data.status || 'approved',
  }

  // Set bank_kas IDs based on transaction type
  const tipe = mapped.tipe
  if (tipe === 'pemasukan') {
    mapped.bank_kas_tujuan_id = data.bankKasTujuanId || data.bank_kas_tujuan_id || null
  } else if (tipe === 'pengeluaran') {
    mapped.bank_kas_asal_id = data.bankKasAsalId || data.bank_kas_asal_id || null
  } else if (tipe === 'transfer') {
    mapped.bank_kas_asal_id = data.bankKasAsalId || data.bank_kas_asal_id || null
    mapped.bank_kas_tujuan_id = data.bankKasTujuanId || data.bank_kas_tujuan_id || null
    if (data.biayaAdmin) mapped.biaya_admin = parseFloat(data.biayaAdmin) || 0
  }

  if (data.jamaahId) mapped.jamaah_id = data.jamaahId

  return mapped
}

// ============================================================================
// Program Mappers
// ============================================================================

export const mapProgramFromApi = (data) => ({
  id: data.id,
  name: data.nama,
  description: data.deskripsi || '',
  startDate: data.tanggal_mulai ? data.tanggal_mulai.split('T')[0] : '',
  endDate: data.tanggal_selesai ? data.tanggal_selesai.split('T')[0] : '',
  status: data.status === 'aktif' ? 'Aktif' : 'Selesai',
  // Financial aggregates from BE
  pemasukan: parseFloat(data.pemasukan) || 0,
  pengeluaran: parseFloat(data.pengeluaran) || 0,
  sisaSaldo: parseFloat(data.sisa_saldo) || 0,
  jumlahTransaksi: data.jumlah_transaksi || 0,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
  transactions: (data.transactions || []).map(mapTransactionFromApi),
})

export const mapProgramToApi = (data) => ({
  nama: data.name,
  deskripsi: data.description || null,
  tanggal_mulai: data.startDate || null,
  tanggal_selesai: data.endDate || null,
  status: data.status === 'Aktif' ? 'aktif' : 'selesai',
})

// ============================================================================
// Category Mappers
// ============================================================================

export const mapCategoryFromApi = (data) => ({
  id: data.id,
  name: data.nama,
  tipe: data.tipe, // 'pemasukan' or 'pengeluaran'
  description: data.deskripsi || '',
  status: data.status || 'aktif',
  visibilitas: data.visibilitas,
})

export const mapCategoryToApi = (data) => ({
  nama: data.name,
  tipe: data.tipe,
  deskripsi: data.description || null,
  status: data.status || 'aktif',
})

// ============================================================================
// Dashboard Mappers
// ============================================================================

export const mapDashboardFromApi = (data) => ({
  totalSaldo: data.total_saldo || 0,
  ringkasanBankKas: (data.ringkasan_bank_kas || []).map(bk => ({
    id: bk.id,
    name: bk.nama,
    type: mapTipeToFe(bk.tipe),
    balance: parseFloat(bk.saldo_terkini) || 0,
  })),
  pemasukanBulanIni: data.pemasukan_bulan_ini || 0,
  pengeluaranBulanIni: data.pengeluaran_bulan_ini || 0,
  selisihBulanIni: data.selisih_bulan_ini || 0,
  transaksiTerbaru: (data.transaksi_terbaru || []).map(mapTransactionFromApi),
  periode: data.periode || {},
  persentasePerubahan: data.persentase_perubahan || { pemasukan: 0, pengeluaran: 0 },
})

export const mapChartDataFromApi = (data) => {
  if (!Array.isArray(data)) return { categories: [], pemasukan: [], pengeluaran: [] }

  const months = data.map(d => {
    const [year, month] = d.bulan.split('-')
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
    return monthNames[parseInt(month) - 1] || d.bulan
  })

  return {
    categories: months,
    pemasukan: data.map(d => d.pemasukan || 0),
    pengeluaran: data.map(d => d.pengeluaran || 0),
  }
}

// ============================================================================
// Utility Helpers
// ============================================================================

export const formatRupiah = (val) => {
  if (!val && val !== 0) return 'Rp 0'
  return 'Rp ' + Math.abs(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export const formatCurrency = (val) => {
  if (!val && val !== 0) return '0'
  return Math.abs(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

/**
 * Extract paginated data from Laravel's paginated response.
 * Works with both ApiResponse wrapper and raw paginate() output.
 */
export const extractPaginatedData = (response) => {
  // ApiResponse format: { success: true, data: { data: [...], current_page, last_page, ... } }
  // Raw paginate: { data: [...], current_page, last_page, ... }
  const payload = response.data?.data ?? response.data ?? response

  // If payload itself has a nested `data` array (Laravel paginate format)
  if (payload && Array.isArray(payload.data)) {
    return {
      items: payload.data,
      currentPage: payload.current_page || 1,
      lastPage: payload.last_page || 1,
      total: payload.total || 0,
      perPage: payload.per_page || 15,
    }
  }

  // Non-paginated response (array or single object)
  if (Array.isArray(payload)) {
    return { items: payload, currentPage: 1, lastPage: 1, total: payload.length, perPage: payload.length }
  }

  return { items: [], currentPage: 1, lastPage: 1, total: 0, perPage: 15 }
}
