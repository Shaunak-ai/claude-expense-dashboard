export interface DailyUsage {
  date: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cost: number;
  requests: number;
}

export interface ModelUsage {
  model: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cost: number;
  requests: number;
  percentage: number;
}

export interface UsageSummary {
  totalInputTokens: number;
  totalOutputTokens: number;
  totalTokens: number;
  totalCost: number;
  totalRequests: number;
  periodStart: string;
  periodEnd: string;
}

export interface AccountInfo {
  organizationName: string;
  accountId: string;
  plan: string;
  creditBalance: number;
  usageLimit: number;
}
