export interface Balance {
  amount: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'SENDER' | 'RECEIVER' | 'AGENT';
  balance: Balance;
}

export interface Transaction {
  id: number;
  sender: number;
  receiver: number;
  agent: number | null;
  amount: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  created_at: string;
  updated_at: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}