import { useState } from 'react';
import { ArrowLeft, Pill, Eye, Smile, Stethoscope, ChevronRight } from 'lucide-react';
import { ClaimData } from '../App';

type SelectionQuizProps = {
  onSubmit: (data: ClaimData) => void;
  onBack: () => void;
  initialData: ClaimData;
};

export function SelectionQuiz({ onSubmit, onBack, initialData }: SelectionQuizProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialData.category);
  const [claimFor, setClaimFor] = useState(initialData.claimFor);

  const categories = [
    { id: 'dental', name: 'Dental', icon: Smile, color: 'bg-blue-50 border-blue-200 hover:border-blue-400' },
    { id: 'vision', name: 'Vision', icon: Eye, color: 'bg-purple-50 border-purple-200 hover:border-purple-400' },
    { id: 'physio', name: 'Physio', icon: Stethoscope, color: 'bg-pink-50 border-pink-200 hover:border-pink-400' },
    { id: 'drug', name: 'Prescription', icon: Pill, color: 'bg-amber-50 border-amber-200 hover:border-amber-400' },
  ];

  const claimForOptions = ['Self', 'Spouse', 'Child'];

  const handleContinue = () => {
    if (selectedCategory) {
      onSubmit({
        category: selectedCategory,
        claimFor,
      });
    }
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
        <h1 className="text-gray-900 mb-2">What are you claiming for today?</h1>
        <p className="text-gray-500">Select the type of claim you'd like to file</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Category Selection */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`${category.color} ${
                  isSelected ? 'ring-2 ring-[#00BF6F] border-[#00BF6F]' : ''
                } border-2 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all duration-200 active:scale-[0.97]`}
              >
                <div className={`w-12 h-12 rounded-full ${
                  isSelected ? 'bg-[#00BF6F]' : 'bg-white'
                } flex items-center justify-center transition-colors`}>
                  <Icon className={`w-6 h-6 ${
                    isSelected ? 'text-white' : 'text-gray-700'
                  }`} />
                </div>
                <span className="text-gray-900">{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Who is this for? */}
        <div>
          <h2 className="text-gray-900 mb-4">Who is this for?</h2>
          <div className="flex gap-3">
            {claimForOptions.map((option) => (
              <button
                key={option}
                onClick={() => setClaimFor(option)}
                className={`flex-1 py-3 px-4 rounded-full border-2 transition-all duration-200 ${
                  claimFor === option
                    ? 'bg-[#00BF6F] border-[#00BF6F] text-white'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Button */}
      <div className="px-6 py-6 border-t border-gray-100">
        <button
          onClick={handleContinue}
          disabled={!selectedCategory}
          className={`w-full py-5 rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 ${
            selectedCategory
              ? 'bg-[#00BF6F] hover:bg-[#00a860] text-white shadow-lg shadow-[#00BF6F]/20 active:scale-[0.98]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Continue</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
