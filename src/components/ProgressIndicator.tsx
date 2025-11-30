interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="mb-12">
      {/* Progress bar */}
      <div className="relative mb-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex justify-between items-center">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={stepNumber} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </div>
                <span className="mt-2 text-xs text-gray-600 hidden sm:block">
                  {stepNumber === 1 ? 'Category' : stepNumber === 2 ? 'Preferences' : 'Details'}
                </span>
              </div>
              {stepNumber < totalSteps && (
                <div className="h-0.5 bg-gray-200 flex-1 -mt-6 hidden sm:block" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
