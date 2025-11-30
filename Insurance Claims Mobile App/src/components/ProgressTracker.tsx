import { CheckCircle2, Circle, Home, FileText } from 'lucide-react';
import { ClaimData } from '../App';

type ProgressTrackerProps = {
  claimData: ClaimData;
  onBackToDashboard: () => void;
};

export function ProgressTracker({ claimData, onBackToDashboard }: ProgressTrackerProps) {
  const steps = [
    { id: 1, name: 'Submitted', status: 'complete' },
    { id: 2, name: 'In Review', status: 'active' },
    { id: 3, name: 'Approved', status: 'pending' },
    { id: 4, name: 'Payment Sent', status: 'pending' },
  ];

  const categoryDisplayNames: Record<string, string> = {
    dental: 'Dental Care',
    vision: 'Vision Care',
    physio: 'Physiotherapy',
    drug: 'Prescription Medication',
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header with Success Animation */}
      <div className="bg-gradient-to-br from-[#00BF6F] to-[#00a860] px-6 pt-14 pb-12 rounded-b-3xl">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
            <CheckCircle2 className="w-12 h-12 text-[#00BF6F]" />
          </div>
          <h1 className="text-white mb-2">Claim Submitted!</h1>
          <p className="text-white/90">Sit tight! We're on it.</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        {/* Claim Reference */}
        <div className="bg-gray-50 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-500">Claim Reference</span>
            <span className="text-gray-900">CLM-{Math.floor(Math.random() * 9000) + 1000}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Type</span>
            <span className="text-gray-900">{categoryDisplayNames[claimData.category]}</span>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="mb-6">
          <h2 className="text-gray-900 mb-6">Claim Status</h2>
          <div className="space-y-6">
            {steps.map((step, index) => {
              const isComplete = step.status === 'complete';
              const isActive = step.status === 'active';
              const isPending = step.status === 'pending';
              
              return (
                <div key={step.id} className="relative">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="relative z-10">
                      {isComplete && (
                        <div className="w-10 h-10 bg-[#00BF6F] rounded-full flex items-center justify-center shadow-md">
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                      )}
                      {isActive && (
                        <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-md animate-pulse">
                          <Circle className="w-6 h-6 text-white fill-white" />
                        </div>
                      )}
                      {isPending && (
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <Circle className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <h3 className={`mb-1 ${isComplete || isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step.name}
                      </h3>
                      {isComplete && (
                        <p className="text-gray-500">Completed</p>
                      )}
                      {isActive && (
                        <p className="text-amber-600">In progress - Usually takes 24-48 hours</p>
                      )}
                      {isPending && (
                        <p className="text-gray-400">Pending</p>
                      )}
                    </div>
                  </div>

                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-5 top-10 w-0.5 h-6 -ml-px" 
                         style={{ 
                           backgroundColor: isComplete ? '#00BF6F' : '#E5E7EB' 
                         }} 
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Estimated Timeline Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="text-gray-900 mb-1">What's Next?</h3>
              <p className="text-gray-600">
                We're reviewing your claim now. You'll receive a notification once it's approved. Expected completion: {claimData.processingTime}.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="px-6 py-6 border-t border-gray-100 space-y-3">
        <button
          onClick={onBackToDashboard}
          className="w-full bg-[#00BF6F] hover:bg-[#00a860] text-white py-5 rounded-2xl transition-all duration-200 shadow-lg shadow-[#00BF6F]/20 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
      </div>
    </div>
  );
}
