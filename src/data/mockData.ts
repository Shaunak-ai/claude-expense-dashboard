import { DailyUsage, ModelUsage, UsageSummary, AccountInfo } from '../types/usage';

export const accountInfo: AccountInfo = {
  organizationName: "Acme Corporation",
  accountId: "org_abc123xyz",
  plan: "Team",
  creditBalance: 847.52,
  usageLimit: 1000.00,
};

export const usageSummary: UsageSummary = {
  totalInputTokens: 2847392,
  totalOutputTokens: 1523847,
  totalTokens: 4371239,
  totalCost: 152.48,
  totalRequests: 8472,
  periodStart: "2026-01-01",
  periodEnd: "2026-01-31",
};

export const dailyUsage: DailyUsage[] = [
  { date: "2026-01-01", inputTokens: 89234, outputTokens: 45123, totalTokens: 134357, cost: 4.68, requests: 267 },
  { date: "2026-01-02", inputTokens: 102847, outputTokens: 58392, totalTokens: 161239, cost: 5.62, requests: 312 },
  { date: "2026-01-03", inputTokens: 78392, outputTokens: 41283, totalTokens: 119675, cost: 4.17, requests: 241 },
  { date: "2026-01-04", inputTokens: 45123, outputTokens: 23847, totalTokens: 68970, cost: 2.40, requests: 156 },
  { date: "2026-01-05", inputTokens: 38274, outputTokens: 19283, totalTokens: 57557, cost: 2.00, requests: 128 },
  { date: "2026-01-06", inputTokens: 112384, outputTokens: 62847, totalTokens: 175231, cost: 6.11, requests: 345 },
  { date: "2026-01-07", inputTokens: 134829, outputTokens: 71283, totalTokens: 206112, cost: 7.18, requests: 398 },
  { date: "2026-01-08", inputTokens: 98234, outputTokens: 52847, totalTokens: 151081, cost: 5.27, requests: 289 },
  { date: "2026-01-09", inputTokens: 87392, outputTokens: 46123, totalTokens: 133515, cost: 4.65, requests: 256 },
  { date: "2026-01-10", inputTokens: 109283, outputTokens: 58392, totalTokens: 167675, cost: 5.84, requests: 324 },
  { date: "2026-01-11", inputTokens: 42847, outputTokens: 22847, totalTokens: 65694, cost: 2.29, requests: 142 },
  { date: "2026-01-12", inputTokens: 35829, outputTokens: 18283, totalTokens: 54112, cost: 1.88, requests: 118 },
  { date: "2026-01-13", inputTokens: 125392, outputTokens: 67829, totalTokens: 193221, cost: 6.73, requests: 378 },
  { date: "2026-01-14", inputTokens: 142847, outputTokens: 78392, totalTokens: 221239, cost: 7.71, requests: 425 },
  { date: "2026-01-15", inputTokens: 108392, outputTokens: 57283, totalTokens: 165675, cost: 5.77, requests: 318 },
  { date: "2026-01-16", inputTokens: 95829, outputTokens: 51283, totalTokens: 147112, cost: 5.13, requests: 287 },
  { date: "2026-01-17", inputTokens: 118392, outputTokens: 62847, totalTokens: 181239, cost: 6.31, requests: 352 },
  { date: "2026-01-18", inputTokens: 48392, outputTokens: 25123, totalTokens: 73515, cost: 2.56, requests: 158 },
  { date: "2026-01-19", inputTokens: 41283, outputTokens: 21847, totalTokens: 63130, cost: 2.20, requests: 135 },
  { date: "2026-01-20", inputTokens: 132847, outputTokens: 71283, totalTokens: 204130, cost: 7.11, requests: 392 },
  { date: "2026-01-21", inputTokens: 145829, outputTokens: 79283, totalTokens: 225112, cost: 7.84, requests: 435 },
  { date: "2026-01-22", inputTokens: 112392, outputTokens: 59847, totalTokens: 172239, cost: 6.00, requests: 334 },
  { date: "2026-01-23", inputTokens: 98283, outputTokens: 52123, totalTokens: 150406, cost: 5.24, requests: 291 },
  { date: "2026-01-24", inputTokens: 121847, outputTokens: 65283, totalTokens: 187130, cost: 6.52, requests: 361 },
  { date: "2026-01-25", inputTokens: 52123, outputTokens: 27847, totalTokens: 79970, cost: 2.79, requests: 172 },
  { date: "2026-01-26", inputTokens: 44283, outputTokens: 23123, totalTokens: 67406, cost: 2.35, requests: 145 },
  { date: "2026-01-27", inputTokens: 138392, outputTokens: 74283, totalTokens: 212675, cost: 7.41, requests: 412 },
  { date: "2026-01-28", inputTokens: 152847, outputTokens: 82392, totalTokens: 235239, cost: 8.20, requests: 452 },
  { date: "2026-01-29", inputTokens: 115829, outputTokens: 61847, totalTokens: 177676, cost: 6.19, requests: 342 },
  { date: "2026-01-30", inputTokens: 102392, outputTokens: 54283, totalTokens: 156675, cost: 5.46, requests: 305 },
  { date: "2026-01-31", inputTokens: 128392, outputTokens: 68283, totalTokens: 196675, cost: 6.85, requests: 378 },
];

export const modelUsage: ModelUsage[] = [
  {
    model: "claude-opus-4-5-20251101",
    inputTokens: 854218,
    outputTokens: 456912,
    totalTokens: 1311130,
    cost: 78.67,
    requests: 2541,
    percentage: 30,
  },
  {
    model: "claude-sonnet-4-20250514",
    inputTokens: 1423847,
    outputTokens: 762384,
    totalTokens: 2186231,
    cost: 54.66,
    requests: 4235,
    percentage: 50,
  },
  {
    model: "claude-3-5-haiku-20241022",
    inputTokens: 569327,
    outputTokens: 304551,
    totalTokens: 873878,
    cost: 19.15,
    requests: 1696,
    percentage: 20,
  },
];
