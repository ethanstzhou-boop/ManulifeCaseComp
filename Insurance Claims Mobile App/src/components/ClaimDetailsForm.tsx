import { useState } from 'react';
import { ArrowLeft, Upload, X, Calendar, DollarSign, Building2, ChevronRight, FileText } from 'lucide-react';
import { ClaimData } from '../App';

type ClaimDetailsFormProps = {
  claimData: ClaimData;
  onSubmit: (data: ClaimData) => void;
  onBack: () => void;
};

export function ClaimDetailsForm({ claimData, onSubmit, onBack }: ClaimDetailsFormProps) {
  const [amount, setAmount] = useState(claimData.amount?.toString() || '');
  const [providerName, setProviderName] = useState(claimData.providerName || '');
  const [serviceDate, setServiceDate] = useState(claimData.serviceDate || '');
  const [receipts, setReceipts] = useState<File[]>(claimData.receipts || []);
  const [physioType, setPhysioType] = useState(claimData.physioType || '');

  const physioTypes = [
    'Sports Injury',
    'Chronic Pain',
    'Post-Surgery',
    'Mobility Issues',
    'Other',
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setReceipts([...receipts, ...newFiles]);
    }
  };

  const handleRemoveReceipt = (index: number) => {
    setReceipts(receipts.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const isValid = amount && providerName && serviceDate && 
                    (claimData.category !== 'physio' || physioType);
    
    if (isValid) {
      onSubmit({
        ...claimData,
        amount: parseFloat(amount),
        providerName,
        serviceDate,
        receipts,
        physioType: claimData.category === 'physio' ? physioType : undefined,
      });
    }
  };

  const isFormValid = amount && providerName && serviceDate && 
                      (claimData.category !== 'physio' || physioType);

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
        <h1 className="text-gray-900 mb-2">Claim Details</h1>
        <p className="text-gray-500">
          {categoryDisplayNames[claimData.category]} for {claimData.claimFor}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Physiotherapy Type - Only shown if Physio is selected */}
        {claimData.category === 'physio' && (
          <div className="mb-6">
            <label className="text-gray-900 mb-2 block">
              Type of Physiotherapy
            </label>
            <div className="space-y-2">
              {physioTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setPhysioType(type)}
                  className={`w-full py-4 px-5 rounded-2xl border-2 transition-all duration-200 text-left ${
                    physioType === type
                      ? 'bg-[#00BF6F] border-[#00BF6F] text-white'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Claim Amount */}
        <div className="mb-6">
          <label className="text-gray-900 mb-2 block">
            Claim Amount
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <DollarSign className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BF6F] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Provider Name */}
        <div className="mb-6">
          <label className="text-gray-900 mb-2 block">
            Provider/Clinic Name
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Building2 className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={providerName}
              onChange={(e) => setProviderName(e.target.value)}
              placeholder="e.g., Downtown Dental Clinic"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BF6F] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Service Date */}
        <div className="mb-6">
          <label className="text-gray-900 mb-2 block">
            Date of Service
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="date"
              value={serviceDate}
              onChange={(e) => setServiceDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00BF6F] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Receipt Upload */}
        <div className="mb-6">
          <label className="text-gray-900 mb-2 block">
            Upload Receipts
          </label>
          
          {/* Upload Button */}
          <label className="w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl py-8 px-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#00BF6F] hover:bg-[#00BF6F]/5 transition-all">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Upload className="w-6 h-6 text-[#00BF6F]" />
            </div>
            <div className="text-center">
              <p className="text-gray-900 mb-1">
                Tap to upload
              </p>
              <p className="text-gray-500">
                PDF, JPG, PNG up to 10MB
              </p>
            </div>
            <input
              type="file"
              accept="image/*,.pdf"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Uploaded Files List */}
          {receipts.length > 0 && (
            <div className="mt-4 space-y-2">
              {receipts.map((file, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-[#00BF6F]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-[#00BF6F]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 truncate">{file.name}</p>
                      <p className="text-gray-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveReceipt(index)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-50 flex items-center justify-center transition-colors flex-shrink-0 ml-2"
                  >
                    <X className="w-4 h-4 text-gray-600 hover:text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <p className="text-blue-900">
            Make sure your receipts are clear and show the date, provider name, and amount paid.
          </p>
        </div>
      </div>

      {/* Footer Button */}
      <div className="px-6 py-6 border-t border-gray-100">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full py-5 rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 ${
            isFormValid
              ? 'bg-[#00BF6F] hover:bg-[#00a860] text-white shadow-lg shadow-[#00BF6F]/20 active:scale-[0.98]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Continue to Review</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
