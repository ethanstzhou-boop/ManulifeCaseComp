import { ChevronLeft } from 'lucide-react';

interface QuizStepProps {
  question: string;
  options: Array<{ label: string; value: string }>;
  onAnswer: (answer: string) => void;
  stepNumber: number;
  onBack?: () => void;
}

export function QuizStep({ question, options, onAnswer, stepNumber, onBack }: QuizStepProps) {
  return (
    <div className="animate-fadeIn">
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-emerald-700 mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
      )}

      <div className="text-center mb-10">
        <h2 className="mb-3 text-gray-900">
          {question}
        </h2>
        <p className="text-gray-600">
          {stepNumber === 1 
            ? "Choose the category that best matches your needs" 
            : "Select the option that best describes you"}
        </p>
      </div>

      <div className={`grid gap-4 ${stepNumber === 1 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            className={`group relative bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-emerald-500 hover:shadow-lg transition-all duration-200 text-left ${
              stepNumber === 1 ? 'md:p-8' : ''
            }`}
          >
            <div className={`flex items-center ${stepNumber === 1 ? 'flex-col text-center' : 'gap-4'}`}>
              {stepNumber === 1 && (
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                  <svg
                    className="w-8 h-8 text-emerald-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {option.value === 'Insurance' && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    )}
                    {option.value === 'Investing' && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    )}
                    {option.value === 'Banking' && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    )}
                  </svg>
                </div>
              )}
              
              <div className="flex-1">
                <h3 className="text-gray-900 group-hover:text-emerald-700 transition-colors">
                  {option.label}
                </h3>
              </div>
              
              <svg
                className="w-6 h-6 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
