import { CheckCircle2, Phone, Mail, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import image_f42f659a10873f310d6028ae1ecf8b9fa1e3c60d from 'figma:asset/f42f659a10873f310d6028ae1ecf8b9fa1e3c60d.png';

interface RecommendationDashboardProps {
  category: string;
  subCategory: string;
  assessmentData?: Record<string, any>;
  onRestart: () => void;
}

export function RecommendationDashboard({ category, subCategory, assessmentData, onRestart }: RecommendationDashboardProps) {
  // Product recommendations based on category and subcategory
  const getRecommendation = () => {
    const recommendations: Record<string, any> = {
      'Insurance-life': {
        title: 'Manulife Term Life Insurance',
        subtitle: 'Affordable protection for your family',
        description: 'Our Term Life Insurance provides comprehensive coverage to protect your loved ones financially. With flexible terms from 10 to 30 years and coverage amounts up to $5 million, you can customize a plan that fits your needs and budget.',
        features: [
          'Flexible coverage from $100,000 to $5 million',
          'Term lengths: 10, 15, 20, or 30 years',
          'Option to convert to permanent insurance',
          'No medical exam required for eligible applicants'
        ],
        image: 'https://images.unsplash.com/photo-1758084413534-ca441e8376a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBwcm90ZWN0aW9uJTIwaW5zdXJhbmNlfGVufDF8fHx8MTc2NDQxODc3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
        estimatedCost: 'Starting at $25/month'
      },
      'Insurance-health': {
        title: 'Manulife Health & Dental Plan',
        subtitle: 'Comprehensive coverage for you and your family',
        description: 'Get peace of mind with our comprehensive health and dental insurance. Covering prescription drugs, dental care, vision care, and paramedical services, our plan ensures you and your family have access to the care you need.',
        features: [
          'Prescription drug coverage up to 80%',
          'Annual dental coverage up to $2,000',
          'Vision care including exams and glasses',
          'Coverage for chiropractors, massage therapy, and more'
        ],
        image: 'https://images.unsplash.com/photo-1668874896975-7f874c90600a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBtZWRpY2FsJTIwY2FyZXxlbnwxfHx8fDE3NjQ0MzUxNzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        estimatedCost: 'Starting at $95/month for families'
      },
      'Insurance-travel': {
        title: 'Manulife Travel Insurance',
        subtitle: 'Travel with confidence',
        description: 'Whether you\'re traveling for business or pleasure, our travel insurance provides emergency medical coverage, trip cancellation protection, and lost baggage coverage to keep you protected wherever you go.',
        features: [
          'Emergency medical coverage up to $5 million',
          'Trip cancellation and interruption insurance',
          'Lost baggage and document coverage',
          'Available for single trips or annual plans'
        ],
        image: 'https://images.unsplash.com/photo-1473679408190-0693dd22fe6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRpcmVtZW50JTIwcGxhbm5pbmd8ZW58MXx8fHwxNzY0NDMzMzg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        estimatedCost: 'From $8/day'
      },
      'Insurance-critical': {
        title: 'Manulife Critical Illness Insurance',
        subtitle: 'Financial support when you need it most',
        description: 'Critical Illness Insurance provides a lump sum payment if you\'re diagnosed with a covered condition like cancer, heart attack, or stroke. Use the funds however you need - for treatment, recovery, or daily expenses.',
        features: [
          'Coverage for 25+ critical illnesses',
          'Lump sum payment up to $2 million',
          'Return of premium option available',
          'Coverage for children at no extra cost'
        ],
        image: 'https://images.unsplash.com/photo-1668874896975-7f874c90600a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBtZWRpY2FsJTIwY2FyZXxlbnwxfHx8fDE3NjQ0MzUxNzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        estimatedCost: 'Starting at $45/month'
      },
      'Investing-mutual-funds': {
        title: 'Manulife Balanced Growth Fund',
        subtitle: 'Diversified investing made simple',
        description: 'Our professionally managed mutual fund offers a balanced mix of stocks and bonds, providing growth potential while managing risk. Perfect for investors looking for a hands-off approach to building wealth.',
        features: [
          '60% equities, 40% fixed income allocation',
          'Managed by award-winning portfolio managers',
          'Automatic rebalancing included',
          'Minimum investment: $500'
        ],
        image: 'https://images.unsplash.com/photo-1633158829875-e5316a358c6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBpbnZlc3RtZW50JTIwZ3Jvd3RofGVufDF8fHx8MTc2NDM0NzQ1OHww&ixlib=rb-4.1.0&q=80&w=1080',
        estimatedCost: 'Management fee: 1.85%'
      },
      'Investing-retirement': {
        title: 'Manulife Retirement Plus',
        subtitle: 'Build the retirement you deserve',
        description: 'Our comprehensive retirement savings plan helps you maximize your contributions and grow your wealth tax-efficiently. With flexible investment options and expert guidance, you\'re on track for a comfortable retirement.',
        features: [
          'Tax-deferred growth on investments',
          'Employer matching available',
          'Wide range of investment options',
          'Free retirement planning consultation'
        ],
        image: 'https://images.unsplash.com/photo-1473679408190-0693dd22fe6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRpcmVtZW50JTIwcGxhbm5pbmd8ZW58MXx8fHwxNzY0NDMzMzg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        estimatedCost: 'No setup fees'
      },
      'Investing-gics': {
        title: 'Manulife Guaranteed Investment Certificate',
        subtitle: 'Secure, guaranteed returns',
        description: 'Earn competitive interest rates with the security of a guaranteed return. Our GICs offer terms from 1 to 5 years and are perfect for conservative investors looking for stable, predictable growth.',
        features: [
          'Guaranteed returns up to 4.5% annually',
          'Terms from 1 to 5 years',
          'CDIC insured up to $100,000',
          'Flexible or non-redeemable options'
        ],
        image: 'https://images.unsplash.com/photo-1700047614820-0f32080db6f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXZpbmdzJTIwYWNjb3VudCUyMG1vbmV5fGVufDF8fHx8MTc2NDQzNTE3MXww&ixlib=rb-4.1.0&q=80&w=1080',
        estimatedCost: 'No fees'
      },
      'Investing-education': {
        title: 'Manulife Education Savings Plan',
        subtitle: 'Invest in your child\'s future',
        description: 'Start saving for your child\'s education with tax-advantaged growth and government grants. Our RESP helps you build a substantial education fund to give your children the best opportunities.',
        features: [
          'Government grants up to $7,200',
          'Tax-free investment growth',
          'Flexible contribution schedule',
          'Can be used at any accredited institution'
        ],
        image: 'https://images.unsplash.com/photo-1620618653685-363c9de761b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB3b3JraW5nJTIwbGFwdG9wfGVufDF8fHx8MTc2NDM0NTI0MHww&ixlib=rb-4.1.0&q=80&w=1080',
        estimatedCost: 'No annual fees'
      },
      'Banking-savings': {
        title: 'Manulife High-Interest Savings Account',
        subtitle: 'Watch your savings grow',
        description: 'Earn one of the highest interest rates available with no monthly fees and unlimited transactions. Perfect for emergency funds or short-term savings goals.',
        features: [
          'Competitive interest rate of 3.75%',
          'No monthly account fees',
          'Unlimited transactions',
          'Access via online banking and mobile app'
        ],
        image: 'https://images.unsplash.com/photo-1700047614820-0f32080db6f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXZpbmdzJTIwYWNjb3VudCUyMG1vbmV5fGVufDF8fHx8MTc2NDQzNTE3MXww&ixlib=rb-4.1.0&q=80&w=1080',
        estimatedCost: '$0/month'
      },
      'Banking-chequing': {
        title: 'Manulife Unlimited Chequing',
        subtitle: 'Banking without limits',
        description: 'Enjoy unlimited transactions, free Interac e-Transfers, and no minimum balance requirements. Our chequing account gives you the freedom to bank your way.',
        features: [
          'Unlimited debit transactions',
          'Free Interac e-Transfers',
          'No minimum balance required',
          'Free personalized cheques'
        ],
        image: 'https://images.unsplash.com/photo-1571715268998-d6e79bed5fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5raW5nJTIwY3JlZGl0JTIwY2FyZHxlbnwxfHx8fDE3NjQ0MzUxNzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        estimatedCost: '$4.95/month'
      },
      'Banking-credit-card': {
        title: 'Manulife Cashback Rewards Card',
        subtitle: 'Earn while you spend',
        description: 'Earn unlimited 2% cashback on all purchases with no annual fee. Plus, get additional perks like purchase protection, extended warranty, and travel insurance.',
        features: [
          '2% unlimited cashback on all purchases',
          'No annual fee',
          'Purchase protection and extended warranty',
          'Complimentary travel insurance'
        ],
        image: 'https://images.unsplash.com/photo-1571715268998-d6e79bed5fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5raW5nJTIwY3JlZGl0JTIwY2FyZHxlbnwxfHx8fDE3NjQ0MzUxNzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        estimatedCost: '$0 annual fee'
      },
      'Banking-mortgage': {
        title: 'Manulife Fixed-Rate Mortgage',
        subtitle: 'Finance your dream home',
        description: 'Lock in a competitive rate and enjoy the stability of fixed monthly payments. Our mortgage specialists will help you find the perfect solution for your home financing needs.',
        features: [
          'Competitive fixed rates from 4.89%',
          'Flexible payment options',
          'Pre-payment privileges up to 20% annually',
          'Portable to your next home'
        ],
        image: 'https://images.unsplash.com/photo-1758518730384-be3d205838e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoYW5kc2hha2UlMjBtZWV0aW5nfGVufDF8fHx8MTc2NDQyODkxMXww&ixlib=rb-4.1.0&q=80&w=1080',
        estimatedCost: 'Rates from 4.89%'
      }
    };

    return recommendations[`${category}-${subCategory}`] || recommendations['Insurance-life'];
  };

  const product = getRecommendation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={onRestart}
            className="hover:opacity-80 transition-opacity"
          >
            <img src={image_f42f659a10873f310d6028ae1ecf8b9fa1e3c60d} alt="Manulife" className="h-8" />
          </button>
        </div>
      </header>

      {/* Success Banner */}
      <div className="bg-emerald-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8" />
              <div>
                <p className="text-sm text-emerald-100">Recommendation Ready</p>
                <p className="text-lg">We found the perfect match for you</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onRestart}
              className="text-emerald-100 hover:text-white text-sm underline transition-colors"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Progress */}
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full mb-8">
            <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
            <span className="text-sm">Step 3 of 3 - Your Recommendation</span>
          </div>

          {/* Product Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-64 lg:h-auto bg-gray-200">
                <ImageWithFallback
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm">
                    Best Match
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12">
                <div className="mb-6">
                  <h1 className="mb-2 text-gray-900">
                    {product.title}
                  </h1>
                  <p className="text-emerald-700 text-lg">
                    {product.subtitle}
                  </p>
                </div>

                <p className="text-gray-700 mb-8 leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="mb-4 text-gray-900">Key Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 mb-8">
                  <p className="text-sm text-emerald-800 mb-1">Estimated Cost</p>
                  <p className="text-emerald-900">{product.estimatedCost}</p>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                  Get a Quote
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-white rounded-xl p-8 shadow-md">
            <h3 className="mb-6 text-center text-gray-900">Have questions? We're here to help</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <button className="flex items-center gap-4 p-6 border border-gray-200 rounded-xl hover:border-emerald-600 hover:bg-emerald-50 transition-all group">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                  <Phone className="w-6 h-6 text-emerald-700 group-hover:text-white transition-colors" />
                </div>
                <div className="text-left">
                  <p className="text-gray-900 mb-1">Call us</p>
                  <p className="text-emerald-700">1-800-MANULIFE</p>
                </div>
              </button>

              <button className="flex items-center gap-4 p-6 border border-gray-200 rounded-xl hover:border-emerald-600 hover:bg-emerald-50 transition-all group">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                  <Mail className="w-6 h-6 text-emerald-700 group-hover:text-white transition-colors" />
                </div>
                <div className="text-left">
                  <p className="text-gray-900 mb-1">Email us</p>
                  <p className="text-emerald-700">support@manulife.com</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
