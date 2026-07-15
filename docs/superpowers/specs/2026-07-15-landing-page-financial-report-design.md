# Landing Page Financial Report Design

## 1. Overview
The goal is to connect the public "Laporan Keuangan" dashboard (Landing Page) to the backend. Currently, it displays static mock data. The connected version will fetch aggregated monthly data and transactions from a new public API endpoint, covering all active `BankKas` accounts.

## 2. Architecture & Backend (API)
We will introduce a single new public endpoint to minimize latency and simplify frontend logic.

**Endpoint:** `GET /api/v1/keuangan/public/monthly-report`
**Query Parameters:**
- `month` (e.g., `01` to `12`)
- `year` (e.g., `2026`)

**Logic Flow:**
1. Fetch all active `BankKas` IDs.
2. **Saldo Awal (Initial Balance):** Calculate the sum of `saldo_awal` of all active `BankKas` PLUS the net of all transactions (pemasukan - pengeluaran) that occurred *before* the 1st day of the requested `month/year`.
3. **Pemasukan (Income):** Sum all `pemasukan` transactions within the requested `month/year`.
4. **Pengeluaran (Expense):** Sum all `pengeluaran` transactions within the requested `month/year`.
5. **Saldo Akhir (Final Balance):** Saldo Awal + Pemasukan - Pengeluaran.
6. **Transactions List:** Retrieve all approved `pemasukan` and `pengeluaran` transactions in that `month/year` for the "Detail Laporan" modal.

**Response Structure:**
```json
{
  "success": true,
  "data": {
    "periode": { "month": "01", "year": "2026" },
    "saldo_awal": 138200,
    "pemasukan": 5059100,
    "pengeluaran": 2830000,
    "saldo_akhir": 2229100,
    "transactions": [ ... ]
  }
}
```

## 3. Frontend (Vue + Pinia)
1. **API Integration & Mapper:**
   - Add `fetchPublicMonthlyReport(month, year)` to `stores/keuangan.js`.
   - Ensure `keuangan-mapper.js` maps the new response payload correctly to the frontend standard (camelCase, formatted amounts).

2. **UI Updates (`FinanceSection.vue`):**
   - Convert the currently hardcoded `monthlyFinanceData` to a reactive `ref`.
   - Trigger `fetchPublicMonthlyReport` on component mount and whenever the Month/Year dropdown is changed.
   - Map the returned `transactions` to the "Detail Laporan" modal (similar to how the program transactions were mapped).
   - Update the trend charts/lines to be either hidden or generated pseudo-randomly for aesthetic purposes, or use a flat line if real historical trend data per day is too heavy. *(Decision: For simplicity, trend lines can use placeholder aesthetic paths, while the large numbers reflect real data).*

## 4. Error Handling & Edge Cases
- **No Data for Selected Month:** If a month has no transactions, `pemasukan` and `pengeluaran` should be `0`, while `saldo_awal` and `saldo_akhir` remain equal to whatever the carried-over balance is. The "Detail Laporan" modal will just show "Tidak ada transaksi".
- **Invalid Parameters:** Fallback to the current month/year if parameters are invalid or missing.

## 5. Security
- The endpoint is purely read-only and public. No authentication is required.
- It aggregates data and does not expose sensitive user information (like `jamaah` personal identities beyond what is normally visible in public donation names).
