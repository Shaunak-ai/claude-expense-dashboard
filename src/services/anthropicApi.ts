import { DailyUsage, ModelUsage, UsageSummary, AccountInfo } from '../types/usage';

// Backend proxy URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ApiUsageRecord {
  date: string;
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
  cost_usd: number;
  request_count: number;
  model?: string;
}

interface ApiOrganization {
  id: string;
  name: string;
  plan: string;
  credit_balance_usd: number;
  usage_limit_usd: number;
}

interface ApiUsageResponse {
  data: ApiUsageRecord[];
  organization: ApiOrganization;
}

export async function checkApiKeyConfigured(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) return false;
    const data = await response.json();
    return data.apiKeyConfigured === true;
  } catch {
    return false;
  }
}

export async function fetchOrganizationInfo(): Promise<AccountInfo> {
  const response = await fetch(`${API_BASE_URL}/organizations`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error || `Failed to fetch organization info: ${response.statusText}`);
  }

  const data = await response.json();
  const org = data.data?.[0] || data;

  return {
    organizationName: org.name || 'My Organization',
    accountId: org.id || 'unknown',
    plan: org.plan || 'Unknown',
    creditBalance: org.credit_balance_usd || 0,
    usageLimit: org.usage_limit_usd || 1000,
  };
}

export async function fetchUsageData(
  startDate: string,
  endDate: string
): Promise<{ summary: UsageSummary; dailyUsage: DailyUsage[]; modelUsage: ModelUsage[] }> {
  const response = await fetch(
    `${API_BASE_URL}/usage?start_date=${startDate}&end_date=${endDate}&group_by=day`
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error.error || `Failed to fetch usage data: ${response.statusText}`);
  }

  const data: ApiUsageResponse = await response.json();

  // Transform daily usage
  const dailyUsage: DailyUsage[] = (data.data || []).map((record) => ({
    date: record.date,
    inputTokens: record.input_tokens,
    outputTokens: record.output_tokens,
    totalTokens: record.total_tokens,
    cost: record.cost_usd,
    requests: record.request_count,
  }));

  // Calculate summary
  const summary: UsageSummary = {
    totalInputTokens: dailyUsage.reduce((sum, d) => sum + d.inputTokens, 0),
    totalOutputTokens: dailyUsage.reduce((sum, d) => sum + d.outputTokens, 0),
    totalTokens: dailyUsage.reduce((sum, d) => sum + d.totalTokens, 0),
    totalCost: dailyUsage.reduce((sum, d) => sum + d.cost, 0),
    totalRequests: dailyUsage.reduce((sum, d) => sum + d.requests, 0),
    periodStart: startDate,
    periodEnd: endDate,
  };

  // Fetch model breakdown
  const modelResponse = await fetch(
    `${API_BASE_URL}/usage?start_date=${startDate}&end_date=${endDate}&group_by=model`
  );

  let modelUsage: ModelUsage[] = [];

  if (modelResponse.ok) {
    const modelData: ApiUsageResponse = await modelResponse.json();
    const totalTokens = (modelData.data || []).reduce((sum, r) => sum + r.total_tokens, 0);

    modelUsage = (modelData.data || []).map((record) => ({
      model: record.model || 'unknown',
      inputTokens: record.input_tokens,
      outputTokens: record.output_tokens,
      totalTokens: record.total_tokens,
      cost: record.cost_usd,
      requests: record.request_count,
      percentage: totalTokens > 0 ? Math.round((record.total_tokens / totalTokens) * 100) : 0,
    }));
  }

  return { summary, dailyUsage, modelUsage };
}

// Check if API key is configured via backend
export async function isApiKeyConfigured(): Promise<boolean> {
  return checkApiKeyConfigured();
}
