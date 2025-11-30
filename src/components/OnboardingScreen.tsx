import image_f42f659a10873f310d6028ae1ecf8b9fa1e3c60d from 'figma:asset/f42f659a10873f310d6028ae1ecf8b9fa1e3c60d.png';
import { Shield, TrendingUp, CreditCard } from 'lucide-react';
import manulifeLogo from '../public/manulife-logo.svg';

interface OnboardingScreenProps {
  onSelect: (category: string) => void;
  onLogoClick?: () => void;
}

export function OnboardingScreen({ onSelect, onLogoClick }: OnboardingScreenProps) {
  const categories = [
    {
      id: 'Insurance',
      title: 'Insurance',
      description: 'Protect what matters most',
      icon: Shield,
      color: 'emerald'
    },
    {
      id: 'Investing',
      title: 'Investing',
      description: 'Grow your wealth',
      icon: TrendingUp,
      color: 'emerald'
    },
    {
      id: 'Banking',
      title: 'Banking',
      description: 'Manage your money',
      icon: CreditCard,
      color: 'emerald'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
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
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl">
          {/* Welcome Text */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
              <span className="text-sm">Step 1 of 4</span>
            </div>
            <h1 className="mb-4 text-gray-900">
              Which Manulife product are you looking for?
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Select a category below to help us recommend the right solution for your needs
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => onSelect(category.id)}
                  className="group relative bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-emerald-600 hover:shadow-xl transition-all duration-300 text-center"
                >
                  {/* Icon */}
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-600 transition-colors">
                    <Icon className="w-8 h-8 text-emerald-700 group-hover:text-white transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-gray-900 group-hover:text-emerald-700 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-8">
                    {category.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      className="w-6 h-6 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Help Text */}
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              Not sure which category to choose? 
              <a href="tel:1-800-626-8543" className="text-emerald-700 hover:text-emerald-800 ml-1 underline">
                Speak with an advisor
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
