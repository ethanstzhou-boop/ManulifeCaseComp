import { ChevronLeft } from 'lucide-react';
import image_f42f659a10873f310d6028ae1ecf8b9fa1e3c60d from 'figma:asset/f42f659a10873f310d6028ae1ecf8b9fa1e3c60d.png';

interface SubCategoryScreenProps {
  category: string;
  onSelect: (subCategory: string) => void;
  onBack: () => void;
  onLogoClick?: () => void;
}

export function SubCategoryScreen({ category, onSelect, onBack, onLogoClick }: SubCategoryScreenProps) {
  const subCategories = {
    Insurance: [
      { id: 'life', title: 'Life Insurance', description: 'Financial protection for your loved ones' },
      { id: 'health', title: 'Health Insurance', description: 'Coverage for medical and dental expenses' },
      { id: 'travel', title: 'Travel Insurance', description: 'Protection for your trips abroad' },
      { id: 'critical', title: 'Critical Illness', description: 'Support for major health events' }
    ],
    Investing: [
      { id: 'mutual-funds', title: 'Mutual Funds', description: 'Diversified investment portfolios' },
      { id: 'retirement', title: 'Retirement Plans', description: 'Build wealth for your future' },
      { id: 'gics', title: 'GICs', description: 'Guaranteed investment certificates' },
      { id: 'education', title: 'Education Savings', description: 'Save for your child\'s education' }
    ],
    Banking: [
      { id: 'savings', title: 'Savings Account', description: 'High-interest savings options' },
      { id: 'chequing', title: 'Chequing Account', description: 'Everyday banking made easy' },
      { id: 'credit-card', title: 'Credit Card', description: 'Earn rewards on purchases' },
      { id: 'mortgage', title: 'Mortgage', description: 'Finance your dream home' }
    ]
  };

  const options = subCategories[category as keyof typeof subCategories] || [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={onLogoClick}
            className="hover:opacity-80 transition-opacity"
          >
            <img src={image_f42f659a10873f310d6028ae1ecf8b9fa1e3c60d} alt="Manulife" className="h-8" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-emerald-700 mb-8 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          {/* Progress & Title */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
              <span className="text-sm">Step 2 of 4</span>
            </div>
            <h1 className="mb-4 text-gray-900">
              What type of {category.toLowerCase()} are you interested in?
            </h1>
            <p className="text-gray-600 text-lg">
              Choose the option that best fits your needs
            </p>
          </div>

          {/* Sub-Category Options */}
          <div className="grid md:grid-cols-2 gap-4">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => onSelect(option.id)}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-600 hover:shadow-lg transition-all duration-200 text-left"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="mb-2 text-gray-900 group-hover:text-emerald-700 transition-colors">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {option.description}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-4"
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
      </main>
    </div>
  );
}
