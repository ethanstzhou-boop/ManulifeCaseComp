import { Plus, CheckCircle2, Clock, Shield } from 'lucide-react';
import { SubmittedClaim, Coverage } from '../App';

type ClaimsDashboardProps = {
  onStartClaim: () => void;
  submittedClaims: SubmittedClaim[];
  coverage: Coverage;
};

export function ClaimsDashboard({ onStartClaim, submittedClaims, coverage }: ClaimsDashboardProps) {

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-[#00BF6F] px-6 pt-14 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white">Claims</h1>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
        </div>
        <p className="text-white/90">Welcome back! Your coverage is active.</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Coverage Overview */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">Active Coverage</span>
            <CheckCircle2 className="w-5 h-5 text-[#00BF6F]" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Dental</span>
              <span className="text-gray-900">${coverage.dental.used.toFixed(0)} / ${coverage.dental.total.toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Vision</span>
              <span className="text-gray-900">${coverage.vision.used.toFixed(0)} / ${coverage.vision.total.toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Paramedical</span>
              <span className="text-gray-900">${coverage.paramedical.used.toFixed(0)} / ${coverage.paramedical.total.toFixed(0)}</span>
            </div>
          </div>
        </div>

        {/* Start New Claim Button */}
        <button
          onClick={onStartClaim}
          className="w-full bg-[#00BF6F] hover:bg-[#00a860] text-white rounded-2xl py-5 px-6 mb-6 flex items-center justify-center gap-3 transition-all duration-200 shadow-lg shadow-[#00BF6F]/20 active:scale-[0.98]"
        >
          <Plus className="w-6 h-6" />
          <span>Start New Claim</span>
        </button>

        {/* Recent Claims */}
        <div>
          <h2 className="text-gray-900 mb-4">Recent Claims</h2>
          {submittedClaims.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
              <p className="text-gray-500">No claims yet. Start your first claim above!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {submittedClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="bg-white border border-gray-200 rounded-2xl p-4 hover:border-[#00BF6F]/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-gray-900">{claim.type}</h3>
                        {claim.status === 'Approved' ? (
                          <CheckCircle2 className={`w-4 h-4 ${claim.color}`} />
                        ) : (
                          <Clock className={`w-4 h-4 ${claim.color}`} />
                        )}
                      </div>
                      <p className="text-gray-500">{claim.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900">{claim.amount}</p>
                      <p className={`${claim.color}`}>{claim.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
