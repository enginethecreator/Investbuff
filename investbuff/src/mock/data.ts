import type { User, Plan, Investment, Transaction, ChatMessage, DepositAddress, Language } from "../types";
import { calculateProfit } from "../utils/helpers";

export const mockUsers: User[] = [
  {
    id: "user_admin",
    firstName: "Admin",
    lastName: "Account",
    email: "admin@investbuff.com",
    password: "admin123",
    role: "admin",
    balance: 128540.87,
    totalInvested: 420000.0,
    totalEarned: 87340.87,
    currentProfit: 12540.23,
    cryptoAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD12",
    cryptoNetwork: "Ethereum",
    cryptoName: "USDT",
    status: "active",
    createdAt: "2025-11-02T09:12:00.000Z",
  },
  {
    id: "user_john",
    firstName: "John",
    lastName: "Anderson",
    email: "john@example.com",
    password: "user123",
    role: "user",
    balance: 38620.45,
    totalInvested: 120000.0,
    totalEarned: 24620.45,
    currentProfit: 4320.9,
    cryptoAddress: "TYz9K2mP5vQ8nR3wL7jX4cA1bV6fGhD9sE3mU2kQ5p",
    cryptoNetwork: "BSC",
    cryptoName: "USDT",
    status: "active",
    createdAt: "2025-11-10T14:22:00.000Z",
    investmentId: "inv_john_1",
  },
  {
    id: "user_jane",
    firstName: "Jane",
    lastName: "Mitchell",
    email: "jane@example.com",
    password: "user123",
    role: "user",
    balance: 82310.12,
    totalInvested: 210000.0,
    totalEarned: 56310.12,
    currentProfit: 9870.45,
    cryptoAddress: "0x2aF3c5D5b7A1d9E0f6C4B8D2A9E1F7C3B5D9A0e2",
    cryptoNetwork: "Ethereum",
    cryptoName: "USDC",
    status: "active",
    createdAt: "2025-11-14T08:05:00.000Z",
    investmentId: "inv_jane_1",
  },
  {
    id: "user_marcus",
    firstName: "Marcus",
    lastName: "Reed",
    email: "marcus@example.com",
    password: "user123",
    role: "user",
    balance: 12450.0,
    totalInvested: 45000.0,
    totalEarned: 9450.0,
    currentProfit: 1250.0,
    cryptoAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    cryptoNetwork: "Bitcoin",
    cryptoName: "BTC",
    status: "blocked",
    createdAt: "2025-12-01T16:40:00.000Z",
  },
];

export const mockPlans: Plan[] = [
  {
    id: "plan_starter",
    name: "Starter",
    minCapital: 1000,
    maxCapital: 4999,
    dailyPercentage: 2.5,
    days: 4,
    description: "A low-entry plan ideal for first-time investors who want to test the platform with modest capital and still earn competitive daily returns.",
    color: "#10b981",
    icon: "🌱",
  },
  {
    id: "plan_professional",
    name: "Professional",
    minCapital: 10000,
    maxCapital: 49999,
    dailyPercentage: 3.5,
    days: 4,
    description: "Built for serious investors who want stronger returns, priority access, and a more detailed analytics view of their portfolio.",
    color: "#3b82f6",
    icon: "🚀",
  },
  {
    id: "plan_premium",
    name: "Premium",
    minCapital: 50000,
    maxCapital: 500000,
    dailyPercentage: 5.0,
    days: 4,
    description: "Our flagship plan for high-net-worth investors seeking the highest daily returns, co-investment access, and dedicated support.",
    color: "#d97706",
    icon: "💎",
  },
];

const today = new Date();
const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

export const mockInvestments: Investment[] = [
  {
    userId: "user_john",
    planId: "plan_professional",
    amount: 45000,
    dailyPercentage: 3.5,
    days: 4,
    startDate: addDays(today, -2).toISOString(),
    endDate: addDays(today, 2).toISOString(),
    estimatedProfit: calculateProfit(45000, 3.5, 4),
    currentProfit: calculateProfit(45000, 3.5, 2),
    status: "active",
  },
  {
    userId: "user_john",
    planId: "plan_starter",
    amount: 1500,
    dailyPercentage: 2.5,
    days: 4,
    startDate: addDays(today, -1).toISOString(),
    endDate: addDays(today, 3).toISOString(),
    estimatedProfit: calculateProfit(1500, 2.5, 4),
    currentProfit: calculateProfit(1500, 2.5, 1),
    status: "active",
  },
  {
    userId: "user_jane",
    planId: "plan_premium",
    amount: 200000,
    dailyPercentage: 5.0,
    days: 4,
    startDate: addDays(today, -3).toISOString(),
    endDate: addDays(today, 1).toISOString(),
    estimatedProfit: calculateProfit(200000, 5.0, 4),
    currentProfit: calculateProfit(200000, 5.0, 3),
    status: "active",
  },
  {
    userId: "user_jane",
    planId: "plan_professional",
    amount: 10000,
    dailyPercentage: 3.5,
    days: 4,
    startDate: addDays(today, -4).toISOString(),
    endDate: addDays(today, 0).toISOString(),
    estimatedProfit: calculateProfit(10000, 3.5, 4),
    currentProfit: calculateProfit(10000, 3.5, 4),
    status: "completed",
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: "tx_john_dep_1",
    userId: "user_john",
    type: "deposit",
    amount: 60000,
    cryptoName: "USDT",
    cryptoNetwork: "BSC",
    cryptoAddress: "TYz9K2mP5vQ8nR3wL7jX4cA1bV6fGhD9sE3mU2kQ5p",
    status: "approved",
    createdAt: addDays(today, -14).toISOString(),
    processedAt: addDays(today, -13).toISOString(),
  },
  {
    id: "tx_john_with_1",
    userId: "user_john",
    type: "withdrawal",
    amount: 5000,
    cryptoName: "USDT",
    cryptoNetwork: "BSC",
    cryptoAddress: "TYz9K2mP5vQ8nR3wL7jX4cA1bV6fGhD9sE3mU2kQ5p",
    status: "approved",
    createdAt: addDays(today, -6).toISOString(),
    processedAt: addDays(today, -5).toISOString(),
  },
  {
    id: "tx_john_dep_2",
    userId: "user_john",
    type: "deposit",
    amount: 15000,
    cryptoName: "USDT",
    cryptoNetwork: "BSC",
    cryptoAddress: "TYz9K2mP5vQ8nR3wL7jX4cA1bV6fGhD9sE3mU2kQ5p",
    status: "pending",
    createdAt: addDays(today, -1).toISOString(),
  },
  {
    id: "tx_jane_dep_1",
    userId: "user_jane",
    type: "deposit",
    amount: 250000,
    cryptoName: "USDC",
    cryptoNetwork: "Ethereum",
    cryptoAddress: "0x2aF3c5D5b7A1d9E0f6C4B8D2A9E1F7C3B5D9A0e2",
    status: "approved",
    createdAt: addDays(today, -20).toISOString(),
    processedAt: addDays(today, -19).toISOString(),
  },
  {
    id: "tx_jane_with_1",
    userId: "user_jane",
    type: "withdrawal",
    amount: 12000,
    cryptoName: "USDC",
    cryptoNetwork: "Ethereum",
    cryptoAddress: "0x2aF3c5D5b7A1d9E0f6C4B8D2A9E1F7C3B5D9A0e2",
    status: "pending",
    createdAt: addDays(today, -2).toISOString(),
  },
  {
    id: "tx_jane_rej_1",
    userId: "user_jane",
    type: "withdrawal",
    amount: 30000,
    cryptoName: "USDC",
    cryptoNetwork: "Ethereum",
    cryptoAddress: "0x2aF3c5D5b7A1d9E0f6C4B8D2A9E1F7C3B5D9A0e2",
    status: "rejected",
    createdAt: addDays(today, -8).toISOString(),
    processedAt: addDays(today, -7).toISOString(),
    adminNote: "Insufficient verification documents.",
  },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: "msg_1",
    senderId: "user_john",
    receiverId: "user_admin",
    message: "Hello, I'd like to know more about the Premium plan returns.",
    createdAt: addDays(today, -3).toISOString(),
    read: true,
  },
  {
    id: "msg_2",
    senderId: "user_admin",
    receiverId: "user_john",
    message: "Hi John! The Premium plan currently offers 5% daily over 4 days. Would you like a detailed breakdown?",
    createdAt: addDays(today, -3).toISOString(),
    read: true,
  },
  {
    id: "msg_3",
    senderId: "user_john",
    receiverId: "user_admin",
    message: "Yes please, also can I withdraw part of my earnings early?",
    createdAt: addDays(today, -2).toISOString(),
    read: true,
  },
  {
    id: "msg_4",
    senderId: "user_admin",
    receiverId: "user_john",
    message: "You can request a withdrawal any time and our team will review it. For Premium plans, early partial withdrawals are allowed once the investment has generated at least 50% of the estimated profit.",
    createdAt: addDays(today, -2).toISOString(),
    read: false,
  },
];

export const mockDepositAddresses: DepositAddress[] = [
  {
    id: "dep_usdt_eth",
    name: "USDT (Ethereum)",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD12",
    network: "Ethereum",
  },
  {
    id: "dep_usdt_bsc",
    name: "USDT (BSC)",
    address: "TYz9K2mP5vQ8nR3wL7jX4cA1bV6fGhD9sE3mU2kQ5p",
    network: "BSC",
  },
  {
    id: "dep_usdt_trx",
    name: "USDT (Tron)",
    address: "TXnS3YrJLWLXhPvQt9q3sR8bN5j6kD2fG4aZ1cQ7wV",
    network: "Tron",
  },
  {
    id: "dep_usdc_eth",
    name: "USDC (Ethereum)",
    address: "0x2aF3c5D5b7A1d9E0f6C4B8D2A9E1F7C3B5D9A0e2",
    network: "Ethereum",
  },
  {
    id: "dep_btc",
    name: "BTC (Bitcoin)",
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    network: "Bitcoin",
  },
];

export const defaultLanguages: Language[] = [
  {
    code: "en-US",
    name: "English",
    nativeName: "English",
    enabled: true,
    translations: {},
  },
  {
    code: "es-ES",
    name: "Spanish",
    nativeName: "Español",
    enabled: true,
    translations: {},
  },
];

type PortfolioPoint = { date: string; balance: number; profit: number };

export function generatePortfolioChartData(): PortfolioPoint[] {
  const points: PortfolioPoint[] = [];
  let balance = 85000;
  let profit = 0;
  for (let i = 29; i >= 0; i--) {
    const date = addDays(today, -i);
    const change = +(Math.random() * 6000 - 2500).toFixed(2);
    balance += change;
    profit = +(balance - 85000).toFixed(2);
    points.push({
      date: date.toISOString(),
      balance: +balance.toFixed(2),
      profit: +Math.max(0, profit).toFixed(2),
    });
  }
  return points;
}

type ProfitPoint = { date: string; profit: number };

export function generateProfitChartData(): ProfitPoint[] {
  const points: ProfitPoint[] = [];
  let running = 0;
  for (let i = 29; i >= 0; i--) {
    const date = addDays(today, -i);
    running += +(Math.random() * 1200 - 400).toFixed(2);
    points.push({
      date: date.toISOString(),
      profit: +Math.max(0, running).toFixed(2),
    });
  }
  return points;
}
