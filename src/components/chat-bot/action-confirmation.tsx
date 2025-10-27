'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ActionConfirmationProps {
  action: {
    type: string;
    parameter: string;
    currentValue: string | number;
    suggestedValue: string | number;
    reasoning: string;
    estimatedImpact: string;
  };
  onConfirm: () => void;
  onReject: () => void;
}

export default function ActionConfirmation({
  action,
  onConfirm,
  onReject,
}: ActionConfirmationProps) {
  const [isExecuting, setIsExecuting] = useState(false);
  const [executed, setExecuted] = useState(false);

  const handleConfirm = () => {
    setIsExecuting(true);
    onConfirm();
    setTimeout(() => {
      setIsExecuting(false);
      setExecuted(true);
      setTimeout(() => {
        // Auto-hide after showing success
      }, 2000);
    }, 500);
  };

  if (executed) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 my-2">
        <div className="flex items-center gap-2 text-green-700">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold">Change Applied!</span>
        </div>
        <p className="text-sm text-green-600 mt-1">
          Your dashboard has been updated with the new value.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-lg p-4 my-2 shadow-md">
      <div className="flex items-start gap-2 mb-3">
        <AlertCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
        <h4 className="font-bold text-emerald-900 text-base">
          💡 Suggested Dashboard Change
        </h4>
      </div>
      
      <div className="space-y-2 text-sm mb-4">
        <div className="bg-white rounded-md p-3 border border-emerald-100">
          <p className="text-gray-600 text-xs font-medium mb-1">PARAMETER</p>
          <p className="text-gray-900 font-semibold">{action.parameter}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white rounded-md p-3 border border-gray-200">
            <p className="text-gray-600 text-xs font-medium mb-1">CURRENT</p>
            <p className="text-gray-900 font-semibold">{action.currentValue}</p>
          </div>
          <div className="bg-emerald-100 rounded-md p-3 border border-emerald-300">
            <p className="text-emerald-700 text-xs font-medium mb-1">SUGGESTED</p>
            <p className="text-emerald-900 font-bold">{action.suggestedValue}</p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-md p-3 border border-blue-200">
          <p className="text-blue-700 text-xs font-medium mb-1">WHY THIS HELPS</p>
          <p className="text-blue-900 text-sm">{action.reasoning}</p>
        </div>

        <div className="bg-green-50 rounded-md p-3 border border-green-200">
          <p className="text-green-700 text-xs font-medium mb-1">EXPECTED IMPACT</p>
          <p className="text-green-900 text-sm font-semibold">{action.estimatedImpact}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleConfirm}
          disabled={isExecuting}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2.5 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50 font-semibold shadow-md hover:shadow-lg"
        >
          {isExecuting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Applying...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4" />
              Apply Change
            </>
          )}
        </button>
        <button
          onClick={onReject}
          disabled={isExecuting}
          className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50 font-medium"
        >
          <XCircle className="w-4 h-4" />
          Dismiss
        </button>
      </div>
    </div>
  );
}