import { useState } from 'react';
import { ClaimsDashboard } from './components/ClaimsDashboard';
import { SelectionQuiz } from './components/SelectionQuiz';
import { ClaimDetailsForm } from './components/ClaimDetailsForm';
import { EstimateReview } from './components/EstimateReview';
import { ProgressTracker } from './components/ProgressTracker';

export type ClaimData = {
  category: string;
  claimFor: string;
  physioType?: string;
  amount?: number;
  estimatedCoverage?: number;
  processingTime?: string;
  providerName?: string;
  serviceDate?: string;
  receipts?: File[];
};

export type SubmittedClaim = {
  id: number;
  type: string;
  date: string;
  amount: string;
  status: string;
  color: string;
  category: string;
  coveredAmount: number;
};

export type Coverage = {
  dental: { used: number; total: number };
  vision: { used: number; total: number };
  paramedical: { used: number; total: number };
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'quiz' | 'details' | 'review' | 'tracker'>('dashboard');
  const [claimData, setClaimData] = useState<ClaimData>({
    category: '',
    claimFor: 'Self',
  });
  
  const [submittedClaims, setSubmittedClaims] = useState<SubmittedClaim[]>([
    {
      id: 1,
      type: 'Dental',
      date: 'Nov 20, 2025',
      amount: '$185.00',
      status: 'Approved',
      color: 'text-[#00BF6F]',
      category: 'dental',
      coveredAmount: 185,
    },
    {
      id: 2,
      type: 'Prescription',
      date: 'Nov 15, 2025',
      amount: '$42.50',
      status: 'Processing',
      color: 'text-amber-500',
      category: 'drug',
      coveredAmount: 0,
    },
  ]);

  const [coverage, setCoverage] = useState<Coverage>({
    dental: { used: 185, total: 2000 },
    vision: { used: 150, total: 500 },
    paramedical: { used: 320, total: 1000 },
  });

  const handleStartClaim = () => {
    setCurrentScreen('quiz');
  };

  const handleQuizSubmit = (data: ClaimData) => {
    setClaimData(data);
    setCurrentScreen('details');
  };

  const handleDetailsSubmit = (data: ClaimData) => {
    const coverage = Math.floor((data.amount || 0) * 0.8);
    setClaimData({
      ...data,
      estimatedCoverage: coverage,
      processingTime: '24 Hours',
    });
    setCurrentScreen('review');
  };

  const handleReviewSubmit = () => {
    // Add the claim to submitted claims
    const categoryDisplayNames: Record<string, string> = {
      dental: 'Dental',
      vision: 'Vision',
      physio: 'Physiotherapy',
      drug: 'Prescription',
    };

    const newClaim: SubmittedClaim = {
      id: submittedClaims.length + 1,
      type: categoryDisplayNames[claimData.category],
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      amount: `$${claimData.amount?.toFixed(2)}`,
      status: 'Processing',
      color: 'text-amber-500',
      category: claimData.category,
      coveredAmount: 0, // Will be updated when approved
    };

    setSubmittedClaims([newClaim, ...submittedClaims]);

    // Update coverage for the category
    const coverageKey = claimData.category === 'physio' ? 'paramedical' : claimData.category === 'drug' ? 'paramedical' : claimData.category as keyof Coverage;
    
    if (coverage[coverageKey]) {
      setCoverage({
        ...coverage,
        [coverageKey]: {
          ...coverage[coverageKey],
          used: coverage[coverageKey].used + (claimData.estimatedCoverage || 0),
        },
      });
    }

    setCurrentScreen('tracker');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
    setClaimData({ category: '', claimFor: 'Self' });
  };

  const handleBack = () => {
    if (currentScreen === 'quiz') {
      setCurrentScreen('dashboard');
    } else if (currentScreen === 'details') {
      setCurrentScreen('quiz');
    } else if (currentScreen === 'review') {
      setCurrentScreen('details');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden" style={{ height: '812px' }}>
        {currentScreen === 'dashboard' && (
          <ClaimsDashboard 
            onStartClaim={handleStartClaim}
            submittedClaims={submittedClaims}
            coverage={coverage}
          />
        )}
        {currentScreen === 'quiz' && (
          <SelectionQuiz 
            onSubmit={handleQuizSubmit} 
            onBack={handleBack}
            initialData={claimData}
          />
        )}
        {currentScreen === 'details' && (
          <ClaimDetailsForm
            claimData={claimData}
            onSubmit={handleDetailsSubmit}
            onBack={handleBack}
          />
        )}
        {currentScreen === 'review' && (
          <EstimateReview 
            claimData={claimData}
            onSubmit={handleReviewSubmit}
            onBack={handleBack}
          />
        )}
        {currentScreen === 'tracker' && (
          <ProgressTracker 
            claimData={claimData}
            onBackToDashboard={handleBackToDashboard}
          />
        )}
      </div>
    </div>
  );
}
