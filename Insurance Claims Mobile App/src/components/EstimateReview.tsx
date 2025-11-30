import { ArrowLeft, DollarSign, Clock, CheckCircle2, User, Calendar, Building2, FileText } from 'lucide-react';
import { ClaimData } from '../App';

type EstimateReviewProps = {
  claimData: ClaimData;
  onSubmit: () => void;
  onBack: () => void;
};

export function EstimateReview({ claimData, onSubmit, onBack }: EstimateReviewProps) {
  const categoryDisplayNames: Record<string, string> = {
    dental: 'Dental Care',
    vision: 'Vision Care',
    physio: 'Physiotherapy',
    drug: 'Prescription Medication',
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 pt-14 pb-6 border-b border-gray-100">
        <button
          onClick={onBack}
          className="mb-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-gray-900 mb-2">Review Your Claim</h1>
        <p className="text-gray-500">Check the details before submitting</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Claim Summary Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4">
          <h2 className="text-gray-900 mb-4">Claim Details</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Type</span>
              <span className="text-gray-900">{categoryDisplayNames[claimData.category]}</span>
            </div>
            {claimData.physioType && (
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Physio Type</span>
                <span className="text-gray-900">{claimData.physioType}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Claim Amount</span>
              <span className="text-gray-900">${claimData.amount?.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Claiming for</span>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-gray-900">{claimData.claimFor}</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-gray-500">Provider</span>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-500" />
                <span className="text-gray-900">{claimData.providerName}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Service Date</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-gray-900">{claimData.serviceDate}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Receipts</span>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-gray-900">{claimData.receipts?.length || 0} file(s)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coverage Predictor - Highlighted */}
        <div className="bg-gradient-to-br from-[#00BF6F]/10 to-[#00BF6F]/5 border-2 border-[#00BF6F]/30 rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#00BF6F] rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-gray-900">Coverage Predictor</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700">
                <DollarSign className="w-5 h-5 text-[#00BF6F]" />
                <span>Estimated Coverage</span>
              </div>
              <span className="text-[#00BF6F]">${claimData.estimatedCoverage?.toFixed(2)}</span>
            </div>
            <div className="h-2 bg-white rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#00BF6F] rounded-full transition-all duration-500"
                style={{ width: `${((claimData.estimatedCoverage || 0) / (claimData.amount || 1)) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#00BF6F]/20">
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-5 h-5 text-[#00BF6F]" />
                <span>Estimated Processing</span>
              </div>
              <span className="text-[#00BF6F]">{claimData.processingTime}</span>
            </div>
          </div>
        </div>

        {/* Info Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <p className="text-blue-900">
            These estimates are based on your current coverage and claim history. Final amounts may vary after review.
          </p>
        </div>
      </div>

      {/* Footer Button */}
      <div className="px-6 py-6 border-t border-gray-100">
        <button
          onClick={onSubmit}
          className="w-full bg-[#00BF6F] hover:bg-[#00a860] text-white py-5 rounded-2xl transition-all duration-200 shadow-lg shadow-[#00BF6F]/20 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>Submit Claim</span>
        </button>
      </div>
    </div>
  );
}
