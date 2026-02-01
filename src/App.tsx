import { Coins, Zap, MessageSquare, TrendingUp } from 'lucide-react';
import { Header } from './components/Header';
import { UsageCard } from './components/UsageCard';
import { UsageChart } from './components/UsageChart';
import { CostChart } from './components/CostChart';
import { ModelBreakdown } from './components/ModelBreakdown';
import { CreditBalance } from './components/CreditBalance';
import { accountInfo, usageSummary, dailyUsage, modelUsage } from './data/mockData';

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header account={accountInfo} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            trend={{ value: 12.5, isPositive: false }}
          />
          <UsageCard
            title="Total Tokens"
            value={formatNumber(usageSummary.totalTokens)}
            subtitle={`${formatNumber(usageSummary.totalInputTokens)} in / ${formatNumber(usageSummary.totalOutputTokens)} out`}
            icon={<Zap className="w-6 h-6" />}
            trend={{ value: 8.3, isPositive: true }}
          />
          <UsageCard
            title="API Requests"
            value={usageSummary.totalRequests.toLocaleString()}
            subtitle="Total requests made"
            icon={<MessageSquare className="w-6 h-6" />}
            trend={{ value: 15.2, isPositive: true }}
          />
          <UsageCard
            title="Avg Cost/Request"
            value={`$${(usageSummary.totalCost / usageSummary.totalRequests).toFixed(4)}`}
            subtitle="Per request average"
            icon={<TrendingUp className="w-6 h-6" />}
            trend={{ value: 3.1, isPositive: false }}
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
