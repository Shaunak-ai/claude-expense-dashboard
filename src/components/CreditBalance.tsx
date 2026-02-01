import { AccountInfo } from '../types/usage';

interface CreditBalanceProps {
  account: AccountInfo;
  totalSpent: number;
}

export function CreditBalance({ account, totalSpent }: CreditBalanceProps) {
  const usagePercentage = (totalSpent / account.usageLimit) * 100;
  const remainingPercentage = 100 - usagePercentage;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Credit Balance</h3>

      <div className="flex items-center justify-center mb-6">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="12"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#da7756"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${usagePercentage * 2.51} ${remainingPercentage * 2.51}`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">
              ${account.creditBalance.toFixed(0)}
            </span>
            <span className="text-xs text-gray-500">remaining</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Usage Limit</span>
          <span className="font-medium text-gray-900">${account.usageLimit.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Spent This Period</span>
          <span className="font-medium text-claude-orange">${totalSpent.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Remaining</span>
          <span className="font-medium text-green-600">${account.creditBalance.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
