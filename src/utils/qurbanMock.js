// Mock data generator for Qurban feature to simulate backend format and a large dataset

const names = [
  'Bapak Ahmad', 'Ibu Fatimah', 'Keluarga Budi', 'Haji Suryana', 'Deni Setiawan', 
  'Kang Ujang', 'Ibu Siti', 'Bapak Ilham', 'Haji Lulung', 'Keluarga Syafei',
  'Ibu Aminah', 'Bapak Reza', 'Keluarga Anwar', 'Andi Pratama', 'Ibu Wati',
  'Haji Romli', 'Bapak Yanto', 'Ibu Neneng', 'Keluarga Siregar', 'Bapak Hasan',
  'Ibu Rina', 'Haji Somat', 'Keluarga Tariq', 'Bapak Arif', 'Ibu Siska'
];

const streets = ['Jl. Merdeka', 'Jl. Sudirman', 'Jl. Mawar', 'Jl. Melati', 'Jl. Anggrek', 'Blok A', 'Blok B', 'Blok C'];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomPhone = () => '08' + Math.floor(1000000000 + Math.random() * 9000000000).toString();
const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();

export function generateQurbanData() {
  const period = {
    id: 1,
    name: 'Qurban 1448 H / 2027 M',
    sapi_price_per_slot: 4000000,
    kambing_price: 3500000,
    deadline_date: '2027-06-15',
    is_active: true
  };

  const animalGroups = [];
  const shohibuls = [];
  const transactions = [];

  let sapiGroupCounter = 1;
  let currentSapiGroup = {
    id: sapiGroupCounter,
    period_id: period.id,
    name: `Sapi ${sapiGroupCounter}`,
    target_type: 'sapi',
    shohibuls: []
  };
  animalGroups.push(currentSapiGroup);

  const numShohibuls = 120; // Generate 120 participants
  let txIdCounter = 1;

  for (let i = 1; i <= numShohibuls; i++) {
    const isSapi = Math.random() > 0.4; // 60% sapi, 40% kambing
    const targetType = isSapi ? 'sapi' : 'kambing';
    const targetAmount = isSapi ? period.sapi_price_per_slot : period.kambing_price;
    
    // Status: 70% lunas, 20% belum lunas (cicil), 10% baru daftar
    const r = Math.random();
    let collectedAmount = 0;
    if (r < 0.7) {
      collectedAmount = targetAmount;
    } else if (r < 0.9) {
      collectedAmount = targetAmount / 2;
    } else {
      collectedAmount = 0; // Baru daftar, belum ada success transaction
    }

    const shohibul = {
      id: i,
      period_id: period.id,
      animal_group_id: null,
      name: randomItem(names) + (Math.random() > 0.5 ? ' ' + Math.floor(Math.random() * 100) : ''),
      phone: randomPhone(),
      address: `${randomItem(streets)} No. ${Math.floor(Math.random() * 100)}`,
      target_type: targetType,
      target_amount: targetAmount,
      collected_amount: collectedAmount,
      last_payment_month: '2026-06',
      animal_group: null,
      transactions: [] // populate later
    };

    if (isSapi) {
      if (currentSapiGroup.shohibuls.length >= 7) {
        sapiGroupCounter++;
        currentSapiGroup = {
          id: sapiGroupCounter,
          period_id: period.id,
          name: `Sapi ${sapiGroupCounter}`,
          target_type: 'sapi',
          shohibuls: []
        };
        animalGroups.push(currentSapiGroup);
      }
      shohibul.animal_group_id = currentSapiGroup.id;
      shohibul.animal_group = { id: currentSapiGroup.id, name: currentSapiGroup.name, target_type: 'sapi' };
      currentSapiGroup.shohibuls.push(shohibul);
    } else {
      shohibul.animal_group_id = null;
    }

    shohibuls.push(shohibul);

    // Generate transactions for this shohibul
    if (collectedAmount > 0) {
      // 1 or 2 transactions to reach collected amount
      let txAmount1 = collectedAmount;
      let txAmount2 = 0;
      if (collectedAmount === targetAmount && Math.random() > 0.5) {
        txAmount1 = targetAmount / 2;
        txAmount2 = targetAmount / 2;
      }

      const createTx = (amount, status) => {
        const tx = {
          id: txIdCounter++,
          shohibul_id: shohibul.id,
          order_id: `QUR-ORD-${1000 + txIdCounter}`,
          amount: amount,
          status: status,
          payment_method: randomItem(['qris', 'tunai', 'transfer bank']),
          payment_number: null,
          total_payment: amount,
          created_at: randomDate(new Date('2026-01-01'), new Date('2026-06-30')),
          shohibul: { id: shohibul.id, name: shohibul.name, target_type: shohibul.target_type, phone: shohibul.phone, address: shohibul.address }
        };
        transactions.push(tx);
        shohibul.transactions.push(tx);
      };

      createTx(txAmount1, 'success');
      if (txAmount2 > 0) {
        createTx(txAmount2, 'success');
      }
    } else {
      // Generate a pending transaction
      const tx = {
        id: txIdCounter++,
        shohibul_id: shohibul.id,
        order_id: `QUR-ORD-${1000 + txIdCounter}`,
        amount: targetAmount,
        status: 'pending',
        payment_method: 'qris',
        payment_number: null,
        total_payment: targetAmount,
        created_at: randomDate(new Date('2026-06-01'), new Date('2026-06-30')),
        shohibul: { id: shohibul.id, name: shohibul.name, target_type: shohibul.target_type, phone: shohibul.phone, address: shohibul.address }
      };
      transactions.push(tx);
      shohibul.transactions.push(tx);
    }
  }

  // Generate some random cancelled transactions just to have them
  for (let k = 0; k < 15; k++) {
    const s = randomItem(shohibuls);
    transactions.push({
      id: txIdCounter++,
      shohibul_id: s.id,
      order_id: `QUR-ORD-${1000 + txIdCounter}`,
      amount: s.target_amount,
      status: 'cancelled',
      payment_method: 'va bsi',
      payment_number: null,
      total_payment: s.target_amount,
      created_at: randomDate(new Date('2026-01-01'), new Date('2026-05-31')),
      shohibul: { id: s.id, name: s.name, target_type: s.target_type, phone: s.phone, address: s.address }
    });
  }

  // Sort transactions by date descending
  transactions.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // For Dashboard Summary
  const count_lunas = shohibuls.filter(s => s.collected_amount >= s.target_amount).length;
  const count_belum_lunas = shohibuls.length - count_lunas;
  const total_collected = shohibuls.reduce((sum, s) => sum + s.collected_amount, 0);
  const total_target = shohibuls.reduce((sum, s) => sum + s.target_amount, 0);
  
  const summary = {
    total_shohibul: shohibuls.length,
    total_collected: total_collected,
    total_target: total_target,
    count_lunas: count_lunas,
    count_belum_lunas: count_belum_lunas,
    percentage: Math.round((total_collected / total_target) * 100)
  };

  const animals = {
    sapi_shohibul: shohibuls.filter(s => s.target_type === 'sapi').length,
    kambing_shohibul: shohibuls.filter(s => s.target_type === 'kambing').length,
    sapi_groups: animalGroups.filter(g => g.target_type === 'sapi').length,
    estimated_sapi: Math.ceil(shohibuls.filter(s => s.target_type === 'sapi').length / 7)
  };

  return {
    period,
    animalGroups,
    shohibuls,
    transactions,
    summary,
    animals,
    settings: {
      hargaSapi: period.sapi_price_per_slot * 7,
      hargaSlotSapi: period.sapi_price_per_slot,
      hargaKambing: period.kambing_price
    }
  };
}

export const qurbanMockData = generateQurbanData();

