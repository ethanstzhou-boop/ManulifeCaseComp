import { ArrowRight, RefreshCw } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ResultsPageProps {
  category: string;
  onRestart: () => void;
}

export function ResultsPage({ category, onRestart }: ResultsPageProps) {
  const productRecommendations = {
    Insurance: [
      {
        name: "Term Life Insurance",
        description: "Affordable protection for your family's future with flexible coverage options.",
        image: "https://images.unsplash.com/photo-1758084413534-ca441e8376a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBwcm90ZWN0aW9uJTIwaW5zdXJhbmNlfGVufDF8fHx8MTc2NDQxODc3Mnww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        name: "Critical Illness Insurance",
        description: "Financial support when you need it most with coverage for major health events.",
        image: "https://images.unsplash.com/photo-1668874896975-7f874c90600a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBtZWRpY2FsJTIwY2FyZXxlbnwxfHx8fDE3NjQ0MzUxNzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        name: "Health & Dental Insurance",
        description: "Comprehensive coverage for medical, dental, and vision care expenses.",
        image: "https://images.unsplash.com/photo-1668874896975-7f874c90600a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBtZWRpY2FsJTIwY2FyZXxlbnwxfHx8fDE3NjQ0MzUxNzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
      }
    ],
    Investing: [
      {
        name: "Mutual Funds",
        description: "Diversified investment options managed by experienced professionals.",
        image: "https://images.unsplash.com/photo-1633158829875-e5316a358c6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBpbnZlc3RtZW50JTIwZ3Jvd3RofGVufDF8fHx8MTc2NDM0NzQ1OHww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        name: "Retirement Savings Plans",
        description: "Tax-advantaged accounts designed to help you build wealth for retirement.",
        image: "https://images.unsplash.com/photo-1473679408190-0693dd22fe6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRpcmVtZW50JTIwcGxhbm5pbmd8ZW58MXx8fHwxNjQzMzM4N3ww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        name: "GICs & Fixed Income",
        description: "Secure investments with guaranteed returns and capital protection.",
        image: "https://images.unsplash.com/photo-1700047614820-0f32080db6f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXZpbmdzJTIwYWNjb3VudCUyMG1vbmV5fGVufDF8fHx8MTc2NDQzNTE3MXww&ixlib=rb-4.1.0&q=80&w=1080"
      }
    ],
    Banking: [
      {
        name: "High-Interest Savings Account",
        description: "Earn competitive rates on your savings with easy access to your funds.",
        image: "https://images.unsplash.com/photo-1700047614820-0f32080db6f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXZpbmdzJTIwYWNjb3VudCUyMG1vbmV5fGVufDF8fHx8MTc2NDQzNTE3MXww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        name: "Cashback Credit Card",
        description: "Earn rewards on everyday purchases with no annual fee.",
        image: "https://images.unsplash.com/photo-1571715268998-d6e79bed5fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5raW5nJTIwY3JlZGl0JTIwY2FyZHxlbnwxfHx8fDE3NjQ0MzUxNzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        name: "Personal Line of Credit",
        description: "Flexible borrowing option with competitive rates for your financial needs.",
        image: "https://images.unsplash.com/photo-1571715268998-d6e79bed5fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5raW5nJTIwY3JlZGl0JTIwY2FyZHxlbnwxfHx8fDE3NjQ0MzUxNzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
      }
    ]
  };

  const products = productRecommendations[category as keyof typeof productRecommendations] || [];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Success header */}
      <div className="bg-emerald-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-emerald-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="mb-3 text-white">
            Perfect! Here are your recommended products
          </h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Based on your answers, we've selected {category.toLowerCase()} products that match your needs.
          </p>
        </div>
      </div>

      {/* Products grid */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-gray-900">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {product.description}
                </p>
                <button className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 transition-colors group/btn">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 border-t border-gray-200">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-emerald-700 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Start Over
          </button>
          <button className="inline-flex items-center gap-2 bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-800 transition-colors">
            Talk to an Advisor
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Help text */}
        <p className="text-center text-gray-600 mt-8">
          Still have questions? Our advisors are here to help you make the right choice.
        </p>
      </div>
    </div>
  );
}
