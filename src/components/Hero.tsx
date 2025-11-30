import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
  return (
    <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 text-white">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mb-6 text-white">
            Not sure where to start?
          </h1>
          <p className="mb-8 text-emerald-50 text-lg lg:text-xl max-w-2xl mx-auto">
            Let us help you find the right Manulife products for your needs. 
            Answer a few quick questions and we'll guide you to personalized recommendations 
            that match your goals.
          </p>
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 bg-white text-emerald-800 px-8 py-4 rounded-lg hover:bg-emerald-50 transition-colors shadow-lg hover:shadow-xl"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Decorative wave */}
      <div className="relative h-16 bg-gray-50">
        <svg
          className="absolute top-0 w-full h-16"
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 48h1440V0c-240 48-480 48-720 24C480 0 240 0 0 24v24z"
            className="fill-emerald-900"
          />
        </svg>
      </div>
    </div>
  );
}
