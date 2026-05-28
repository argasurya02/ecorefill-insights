// Frontend-only mock data for the EcoRefill admin dashboard.

export type MachineStatus = "Available" | "Offline" | "Maintenance" | "Empty";
export type TxStatus = "Completed" | "Pending" | "Failed" | "Refunded";

export const stats = {
  totalUsers: 12480,
  totalTransactions: 38219,
  activeMachines: 142,
  plasticReducedKg: 9876,
  monthlyRevenue: 48230,
  co2SavedKg: 21450,
};

export const monthlyRefills = [
  { month: "Jan", refills: 1820, revenue: 3420 },
  { month: "Feb", refills: 2110, revenue: 3980 },
  { month: "Mar", refills: 2450, revenue: 4510 },
  { month: "Apr", refills: 2790, revenue: 5120 },
  { month: "May", refills: 3120, revenue: 5840 },
  { month: "Jun", refills: 3380, revenue: 6210 },
  { month: "Jul", refills: 3690, revenue: 6780 },
  { month: "Aug", refills: 3920, revenue: 7220 },
  { month: "Sep", refills: 4180, revenue: 7790 },
  { month: "Oct", refills: 4520, revenue: 8240 },
  { month: "Nov", refills: 4780, revenue: 8810 },
  { month: "Dec", refills: 5040, revenue: 9420 },
];

export const productMix = [
  { name: "Hand Soap", value: 32 },
  { name: "Shampoo", value: 24 },
  { name: "Detergent", value: 20 },
  { name: "Dish Soap", value: 16 },
  { name: "Laundry Fragrance", value: 8 },
];

export const customers = Array.from({ length: 24 }).map((_, i) => ({
  id: `CUS-${1000 + i}`,
  name: [
    "Aisha Rahman", "Liam Carter", "Sofia Nguyen", "Marcus Bell", "Hana Tan",
    "Ethan Brooks", "Mira Patel", "Noah Lim", "Zara Khan", "Owen Park",
    "Eli Stone", "Ivy Chen", "Mason Reed", "Nora Diaz", "Leo Tran",
    "Ada Owusu", "Jonas Weber", "Yara Haddad", "Theo Marsh", "Kaia Lund",
    "Rio Saito", "Sena Kaya", "Beatrix Cole", "Idris Vega",
  ][i],
  email: `user${i + 1}@ecorefill.io`,
  phone: `+1 555 0${100 + i}`,
  ecoPoints: 240 + i * 37,
  wallet: 12.5 + i * 3.2,
  bottles: 2 + (i % 6),
  joined: `2025-${String((i % 12) + 1).padStart(2, "0")}-12`,
}));

export const transactions = Array.from({ length: 20 }).map((_, i) => {
  const statuses: TxStatus[] = ["Completed", "Pending", "Failed", "Refunded"];
  const products = ["Hand Soap", "Shampoo", "Detergent", "Dish Soap", "Laundry Fragrance"];
  return {
    id: `TXN-${20480 + i}`,
    customer: customers[i % customers.length].name,
    product: products[i % products.length],
    machine: `EM-${String(101 + (i % 12)).padStart(3, "0")}`,
    amount: +(2.4 + (i % 7) * 0.9).toFixed(2),
    status: statuses[i % statuses.length],
    date: `2026-05-${String(28 - (i % 27)).padStart(2, "0")} 14:${String((i * 7) % 60).padStart(2, "0")}`,
    type: i % 5 === 0 ? "Top-up" : i % 7 === 0 ? "Deposit" : "Refill",
  };
});

export const products = [
  { id: "P-01", name: "Eco Hand Soap", category: "Personal Care", stockMl: 14800, capacityMl: 20000, pricePerMl: 0.012, status: "Active" },
  { id: "P-02", name: "Botanical Shampoo", category: "Hair Care", stockMl: 9200, capacityMl: 20000, pricePerMl: 0.018, status: "Active" },
  { id: "P-03", name: "Plant Detergent", category: "Laundry", stockMl: 17500, capacityMl: 25000, pricePerMl: 0.009, status: "Active" },
  { id: "P-04", name: "Citrus Dish Soap", category: "Kitchen", stockMl: 6400, capacityMl: 20000, pricePerMl: 0.011, status: "Low" },
  { id: "P-05", name: "Lavender Laundry Fragrance", category: "Laundry", stockMl: 2100, capacityMl: 15000, pricePerMl: 0.022, status: "Low" },
  { id: "P-06", name: "Aloe Body Wash", category: "Personal Care", stockMl: 0, capacityMl: 20000, pricePerMl: 0.014, status: "Out" },
];

export const machines: Array<{
  id: string; location: string; status: MachineStatus; stockPct: number; lastRefill: string;
}> = [
  { id: "EM-101", location: "Greenpoint Mall, Floor 2", status: "Available", stockPct: 82, lastRefill: "2026-05-26" },
  { id: "EM-102", location: "Eastside Market", status: "Available", stockPct: 64, lastRefill: "2026-05-25" },
  { id: "EM-103", location: "Riverside Campus", status: "Maintenance", stockPct: 30, lastRefill: "2026-05-21" },
  { id: "EM-104", location: "Harbor Lofts", status: "Empty", stockPct: 4, lastRefill: "2026-05-18" },
  { id: "EM-105", location: "Civic Plaza", status: "Available", stockPct: 91, lastRefill: "2026-05-27" },
  { id: "EM-106", location: "Northgate Station", status: "Offline", stockPct: 12, lastRefill: "2026-05-15" },
  { id: "EM-107", location: "Sunset Co-op", status: "Available", stockPct: 73, lastRefill: "2026-05-26" },
  { id: "EM-108", location: "Bayfront Library", status: "Available", stockPct: 58, lastRefill: "2026-05-24" },
];

export const rewards = [
  { id: "R-01", name: "Free Refill (250ml)", cost: 120, status: "Active", category: "Refill" },
  { id: "R-02", name: "10% Discount Voucher", cost: 80, status: "Active", category: "Voucher" },
  { id: "R-03", name: "Reusable Glass Bottle", cost: 450, status: "Active", category: "Merch" },
  { id: "R-04", name: "Eco Tote Bag", cost: 300, status: "Paused", category: "Merch" },
  { id: "R-05", name: "Premium Refill Bundle", cost: 600, status: "Active", category: "Refill" },
];

export const bottleLifecycle = [
  { stage: "Active", value: 5420 },
  { stage: "Returned", value: 3180 },
  { stage: "Recycled", value: 2240 },
  { stage: "Damaged", value: 312 },
];

export const notifications = [
  { id: 1, type: "alert", title: "EM-104 is empty", message: "Harbor Lofts machine ran out of stock.", time: "12m ago" },
  { id: 2, type: "warning", title: "Low stock on Lavender", message: "P-05 below 15% across 4 machines.", time: "1h ago" },
  { id: 3, type: "info", title: "Maintenance scheduled", message: "EM-103 maintenance window starts 18:00.", time: "3h ago" },
  { id: 4, type: "alert", title: "Failed transaction", message: "TXN-20492 failed at EM-106.", time: "5h ago" },
  { id: 5, type: "info", title: "New customer milestone", message: "12,000 lifetime users reached.", time: "1d ago" },
];

export const ecoImpact = [
  { month: "Jan", plastic: 420, co2: 980 },
  { month: "Feb", plastic: 510, co2: 1120 },
  { month: "Mar", plastic: 640, co2: 1340 },
  { month: "Apr", plastic: 720, co2: 1510 },
  { month: "May", plastic: 880, co2: 1820 },
  { month: "Jun", plastic: 940, co2: 1980 },
  { month: "Jul", plastic: 1020, co2: 2110 },
  { month: "Aug", plastic: 1140, co2: 2360 },
];
