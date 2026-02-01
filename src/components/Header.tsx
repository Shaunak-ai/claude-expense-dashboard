import { Sparkles } from 'lucide-react';
import { AccountInfo } from '../types/usage';

interface HeaderProps {
  account: AccountInfo;
}

export function Header({ account }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-claude-beige rounded-lg">
              <Sparkles className="w-6 h-6 text-claude-orange" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Claude Usage Dashboard</h1>
              <p className="text-xs text-gray-500">{account.organizationName}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Account ID</p>
              <p className="text-sm font-mono text-gray-700">{account.accountId}</p>
            </div>
            <div className="px-3 py-1 bg-claude-beige text-claude-orange text-sm font-medium rounded-full">
              {account.plan}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
