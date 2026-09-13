import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Plan, Investment, Transaction, ChatMessage, DepositAddress, Language } from "../types";
import {
  mockUsers,
  mockPlans,
  mockInvestments,
  mockTransactions,
  mockChatMessages,
  mockDepositAddresses,
  defaultLanguages,
} from "../mock/data";
import { generateId } from "../utils/helpers";

const USERS_KEY = "investbuff-users";
const PLANS_KEY = "investbuff-plans";
const INVESTMENTS_KEY = "investbuff-investments";
const TRANSACTIONS_KEY = "investbuff-transactions";
const CHAT_KEY = "investbuff-chat";
const ADDRESSES_KEY = "investbuff-addresses";
const LANGUAGES_KEY = "investbuff-languages";

const loadSeed = <T>(key: string, seed: T[]): T[] => {
  if (typeof window === "undefined") {
    return seed.map((item) => (typeof item === "object" && item !== null ? { ...item } : item));
  }
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as T[];
      }
    }
  } catch {
    // ignore malformed storage
  }
  return seed.map((item) => (typeof item === "object" && item !== null ? { ...item } : item));
};

const isBuiltInLanguageCode = (code: string): boolean => {
  return code === "en-US" || code === "es-ES";
};

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  updateProfile: (updates: Partial<User>) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateProfile: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
      logout: () => set({ user: null }),
    }),
    { name: "investbuff-auth" }
  )
);

interface UsersState {
  users: User[];
  addUser: (user: Omit<User, "id" | "createdAt">) => User;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  blockUser: (id: string) => void;
  unblockUser: (id: string) => void;
}

export const useUsers = create<UsersState>()(
  persist(
    (set) => ({
      users: [],
      addUser: (user) => {
        const created: User = {
          ...user,
          id: generateId("user"),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ users: [...state.users, created] }));
        return created;
      },
      updateUser: (id, updates) =>
        set((state) => ({
          users: state.users.map((u) =>
            u.id === id ? { ...u, ...updates } : u
          ),
        })),
      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((u) => u.id !== id),
        })),
      blockUser: (id) =>
        set((state) => ({
          users: state.users.map((u) =>
            u.id === id ? { ...u, status: "blocked" as const } : u
          ),
        })),
      unblockUser: (id) =>
        set((state) => ({
          users: state.users.map((u) =>
            u.id === id ? { ...u, status: "active" as const } : u
          ),
        })),
    }),
    {
      name: USERS_KEY,
      onRehydrateStorage: () => () => ({
        users: loadSeed(USERS_KEY, mockUsers),
      }),
    }
  )
);

interface PlansState {
  plans: Plan[];
  addPlan: (plan: Omit<Plan, "id">) => string;
  updatePlan: (id: string, updates: Partial<Plan>) => void;
  removePlan: (id: string) => void;
}

export const usePlans = create<PlansState>()(
  persist(
    (set) => ({
      plans: [],
      addPlan: (plan) => {
        const id = generateId("plan");
        set((state) => ({
          plans: [...state.plans, { ...plan, id }],
        }));
        return id;
      },
      updatePlan: (id, updates) =>
        set((state) => ({
          plans: state.plans.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      removePlan: (id) =>
        set((state) => ({
          plans: state.plans.filter((p) => p.id !== id),
        })),
    }),
    {
      name: PLANS_KEY,
      onRehydrateStorage: () => () => ({
        plans: loadSeed(PLANS_KEY, mockPlans),
      }),
    }
  )
);

interface InvestmentsState {
  investments: Investment[];
  addInvestment: (investment: Omit<Investment, "userId" | "planId"> & { userId: string; planId: string }) => string;
  updateInvestment: (userId: string, planId: string, updates: Partial<Investment>) => void;
  removeInvestment: (userId: string, planId: string) => void;
}

export const useInvestments = create<InvestmentsState>()(
  persist(
    (set) => ({
      investments: [],
      addInvestment: (investment) => {
        const id = generateId("inv");
        set((state) => ({
          investments: [
            ...state.investments,
            { ...investment, userId: investment.userId, planId: investment.planId },
          ],
        }));
        return id;
      },
      updateInvestment: (userId, planId, updates) =>
        set((state) => ({
          investments: state.investments.map((inv) =>
            inv.userId === userId && inv.planId === planId
              ? { ...inv, ...updates }
              : inv
          ),
        })),
      removeInvestment: (userId, planId) =>
        set((state) => ({
          investments: state.investments.filter(
            (inv) => !(inv.userId === userId && inv.planId === planId)
          ),
        })),
    }),
    {
      name: INVESTMENTS_KEY,
      onRehydrateStorage: () => () => ({
        investments: loadSeed(INVESTMENTS_KEY, mockInvestments),
      }),
    }
  )
);

interface TransactionsState {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id" | "createdAt">) => string;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
}

export const useTransactions = create<TransactionsState>()(
  persist(
    (set) => ({
      transactions: [],
      addTransaction: (transaction) => {
        const id = generateId("tx");
        set((state) => ({
          transactions: [
            ...state.transactions,
            { ...transaction, id, createdAt: new Date().toISOString() },
          ],
        }));
        return id;
      },
      updateTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),
    }),
    {
      name: TRANSACTIONS_KEY,
      onRehydrateStorage: () => () => ({
        transactions: loadSeed(TRANSACTIONS_KEY, mockTransactions),
      }),
    }
  )
);

interface ChatState {
  messages: ChatMessage[];
  addMessage: (message: Omit<ChatMessage, "id" | "createdAt" | "read">) => string;
  markRead: (senderId: string, receiverId: string) => void;
}

export const useChat = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message) => {
        const id = generateId("msg");
        set((state) => ({
          messages: [
            ...state.messages,
            {
              ...message,
              id,
              createdAt: new Date().toISOString(),
              read: false,
            },
          ],
        }));
        return id;
      },
      markRead: (senderId, receiverId) =>
        set((state) => ({
          messages: state.messages.map((m) =>
            m.senderId === senderId && m.receiverId === receiverId
              ? { ...m, read: true }
              : m
          ),
        })),
    }),
    {
      name: CHAT_KEY,
      onRehydrateStorage: () => () => ({
        messages: loadSeed(CHAT_KEY, mockChatMessages),
      }),
    }
  )
);

interface AddressesState {
  addresses: DepositAddress[];
  addAddress: (address: Omit<DepositAddress, "id">) => string;
  updateAddress: (id: string, updates: Partial<DepositAddress>) => void;
  removeAddress: (id: string) => void;
}

export const useAddresses = create<AddressesState>()(
  persist(
    (set) => ({
      addresses: [],
      addAddress: (address) => {
        const id = generateId("addr");
        set((state) => ({
          addresses: [...state.addresses, { ...address, id }],
        }));
        return id;
      },
      updateAddress: (id, updates) =>
        set((state) => ({
          addresses: state.addresses.map((a) =>
            a.id === id ? { ...a, ...updates } : a
          ),
        })),
      removeAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
        })),
    }),
    {
      name: ADDRESSES_KEY,
      onRehydrateStorage: () => () => ({
        addresses: loadSeed(ADDRESSES_KEY, mockDepositAddresses),
      }),
    }
  )
);

interface LanguagesState {
  languages: Language[];
  addLanguage: (language: Language) => void;
  updateLanguage: (code: string, updates: Partial<Language>) => void;
  removeLanguage: (code: string) => void;
  updateLanguageTranslations: (code: string, translations: Record<string, string>) => void;
}

export const useLanguages = create<LanguagesState>()(
  persist(
    (set) => ({
      languages: [],
      addLanguage: (language) =>
        set((state) => ({
          languages: [...state.languages, language],
        })),
      updateLanguage: (code, updates) =>
        set((state) => ({
          languages: state.languages.map((l) =>
            l.code === code ? { ...l, ...updates } : l
          ),
        })),
      removeLanguage: (code) =>
        set((state) => ({
          languages: state.languages.filter(
            (l) => l.code !== code && !isBuiltInLanguageCode(l.code)
          ),
        })),
      updateLanguageTranslations: (code, translations) =>
        set((state) => ({
          languages: state.languages.map((l) =>
            l.code === code ? { ...l, translations } : l
          ),
        })),
    }),
    {
      name: LANGUAGES_KEY,
      onRehydrateStorage: () => () => ({
        languages: loadSeed(LANGUAGES_KEY, defaultLanguages),
      }),
    }
  )
);
