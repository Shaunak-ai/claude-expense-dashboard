import { DailyUsage, ModelUsage, UsageSummary, AccountInfo } from '../types/usage';

const API_BASE_URL = 'https://api.anthropic.com/v1';

// Get API key from environment variable
const getApiKey = (): string => {
  const apiKey = import.meta.env.VITE_ANTHROPIC_ADMIN_API_KEY;
  if (!apiKey) {
    throw new Error('VITE_ANTHROPIC_ADMIN_API_KEY is not set. Please add it to your .env file.');
  }
  return apiKey;
};

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

export async function fetchOrganizationInfo(): Promise<AccountInfo> {
  const response = await fetch(`${API_BASE_URL}/organizations`, {
    headers: {
      'x-api-key': getApiKey(),
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch organization info: ${response.statusText}`);
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
    `${API_BASE_URL}/usage?start_date=${startDate}&end_date=${endDate}&group_by=day`,
    {
      headers: {
        'x-api-key': getApiKey(),
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch usage data: ${response.statusText}`);
  }

  const data: ApiUsageResponse = await response.json();

  // Transform daily usage
  const dailyUsage: DailyUsage[] = data.data.map((record) => ({
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
    `${API_BASE_URL}/usage?start_date=${startDate}&end_date=${endDate}&group_by=model`,
    {
      headers: {
        'x-api-key': getApiKey(),
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
    }
  );

  let modelUsage: ModelUsage[] = [];

  if (modelResponse.ok) {
    const modelData: ApiUsageResponse = await modelResponse.json();
    const totalTokens = modelData.data.reduce((sum, r) => sum + r.total_tokens, 0);

    modelUsage = modelData.data.map((record) => ({
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

// Check if API key is configured
export function isApiKeyConfigured(): boolean {
  return !!import.meta.env.VITE_ANTHROPIC_ADMIN_API_KEY;
}
