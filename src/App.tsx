import { useState, useEffect } from 'react';
import { Coins, Zap, MessageSquare, TrendingUp, AlertCircle, Loader2 } from 'lucide-react';
import { Header } from './components/Header';
import { UsageCard } from './components/UsageCard';
import { UsageChart } from './components/UsageChart';
import { CostChart } from './components/CostChart';
import { ModelBreakdown } from './components/ModelBreakdown';
import { CreditBalance } from './components/CreditBalance';
import { accountInfo as mockAccountInfo, usageSummary as mockUsageSummary, dailyUsage as mockDailyUsage, modelUsage as mockModelUsage } from './data/mockData';
import { fetchOrganizationInfo, fetchUsageData, isApiKeyConfigured } from './services/anthropicApi';
import { AccountInfo, UsageSummary, DailyUsage, ModelUsage } from './types/usage';

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

function getDateRange(): { startDate: string; endDate: string } {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    startDate: startOfMonth.toISOString().split('T')[0],
    endDate: endOfMonth.toISOString().split('T')[0],
  };
}

function App() {
  const [accountInfo, setAccountInfo] = useState<AccountInfo>(mockAccountInfo);
  const [usageSummary, setUsageSummary] = useState<UsageSummary>(mockUsageSummary);
  const [dailyUsage, setDailyUsage] = useState<DailyUsage[]>(mockDailyUsage);
  const [modelUsage, setModelUsage] = useState<ModelUsage[]>(mockModelUsage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        // Check if API key is configured on backend
        const apiConfigured = await isApiKeyConfigured();

        if (!apiConfigured) {
          setUsingMockData(true);
          setLoading(false);
          return;
        }

        const { startDate, endDate } = getDateRange();

        const [orgInfo, usageData] = await Promise.all([
          fetchOrganizationInfo(),
          fetchUsageData(startDate, endDate),
        ]);

        setAccountInfo(orgInfo);
        setUsageSummary(usageData.summary);
        setDailyUsage(usageData.dailyUsage);
        setModelUsage(usageData.modelUsage);
        setUsingMockData(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch usage data');
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-claude-orange animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your usage data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header account={accountInfo} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* API Key Warning */}
        {usingMockData && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800">Using Demo Data</p>
              <p className="text-sm text-amber-700 mt-1">
                To view your real Claude usage, add your Admin API key to the <code className="bg-amber-100 px-1 rounded">.env</code> file:
              </p>
              <pre className="mt-2 text-xs bg-amber-100 p-2 rounded overflow-x-auto">
                ANTHROPIC_ADMIN_API_KEY=your_admin_api_key_here
              </pre>
              <p className="text-xs text-amber-600 mt-2">
                Then restart the backend server with: <code className="bg-amber-100 px-1 rounded">npm run server</code>
              </p>
              <p className="text-xs text-amber-600 mt-1">
                Get your Admin API key from: <a href="https://console.anthropic.com/settings/admin-keys" target="_blank" rel="noopener noreferrer" className="underline">console.anthropic.com/settings/admin-keys</a>
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">Error loading data</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <p className="text-sm text-red-600 mt-2">Showing demo data instead.</p>
            </div>
          </div>
        )}

        {/* Period Info */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900">Usage Overview</h2>
          <p className="text-sm text-gray-500">
            {new Date(usageSummary.periodStart).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} -{' '}
            {new Date(usageSummary.periodEnd).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <UsageCard
            title="Total Cost"
            value={`$${usageSummary.totalCost.toFixed(2)}`}
            subtitle="This billing period"
            icon={<Coins className="w-6 h-6" />}
          />
          <UsageCard
            title="Total Tokens"
            value={formatNumber(usageSummary.totalTokens)}
            subtitle={`${formatNumber(usageSummary.totalInputTokens)} in / ${formatNumber(usageSummary.totalOutputTokens)} out`}
            icon={<Zap className="w-6 h-6" />}
          />
          <UsageCard
            title="API Requests"
            value={usageSummary.totalRequests.toLocaleString()}
            subtitle="Total requests made"
            icon={<MessageSquare className="w-6 h-6" />}
          />
          <UsageCard
            title="Avg Cost/Request"
            value={`$${usageSummary.totalRequests > 0 ? (usageSummary.totalCost / usageSummary.totalRequests).toFixed(4) : '0.0000'}`}
            subtitle="Per request average"
            icon={<TrendingUp className="w-6 h-6" />}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <UsageChart data={dailyUsage} />
          <CostChart data={dailyUsage} />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ModelBreakdown data={modelUsage} />
          </div>
          <CreditBalance account={accountInfo} totalSpent={usageSummary.totalCost} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            Claude Usage Dashboard - Powered by Anthropic API
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
