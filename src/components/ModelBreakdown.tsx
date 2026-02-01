import { ModelUsage } from '../types/usage';

interface ModelBreakdownProps {
  data: ModelUsage[];
}

export function ModelBreakdown({ data }: ModelBreakdownProps) {
  const colors = ['#da7756', '#d4a27f', '#e8dcc4'];

  const getModelDisplayName = (model: string): string => {
    if (model.includes('opus')) return 'Claude Opus 4.5';
    if (model.includes('sonnet')) return 'Claude Sonnet 4';
    if (model.includes('haiku')) return 'Claude 3.5 Haiku';
    return model;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage by Model</h3>
      <div className="space-y-4">
        {data.map((model, index) => (
          <div key={model.model} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="text-sm font-medium text-gray-700">
                  {getModelDisplayName(model.model)}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                ${model.cost.toFixed(2)} ({model.percentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full transition-all duration-500"
                style={{
                  width: `${model.percentage}%`,
                  backgroundColor: colors[index % colors.length]
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{model.requests.toLocaleString()} requests</span>
              <span>{model.totalTokens.toLocaleString()} tokens</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
