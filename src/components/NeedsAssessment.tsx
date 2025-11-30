import { useState, useEffect } from 'react';
import { ChevronLeft, Calendar, CheckCircle2 } from 'lucide-react';
import image_f42f659a10873f310d6028ae1ecf8b9fa1e3c60d from 'figma:asset/f42f659a10873f310d6028ae1ecf8b9fa1e3c60d.png';

interface NeedsAssessmentProps {
  category: string;
  subCategory: string;
  onComplete: (data: Record<string, any>) => void;
  onBack: () => void;
  onLogoClick?: () => void;
}

export function NeedsAssessment({ category, subCategory, onComplete, onBack, onLogoClick }: NeedsAssessmentProps) {
  const [subScreen, setSubScreen] = useState(1);
  
  // Initialize formData with default values to prevent uncontrolled component warnings
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const key = `${category}-${subCategory}`;
    const defaults: Record<string, any> = {};

    // Set defaults based on the path
    if (key === 'Insurance-life') {
      defaults.coverageAmount = 500000;
    } else if (key === 'Insurance-critical') {
      defaults.financialSupport = 50000;
    } else if (key === 'Investing-mutual-funds') {
      defaults.riskTolerance = 3;
    } else if (key === 'Investing-education') {
      defaults.monthlyContribution = 208;
    }

    return defaults;
  });

  // Calculate total sub-screens based on the path
  const getTotalSubScreens = () => {
    const key = `${category}-${subCategory}`;
    // Mutual funds and Credit Card have 3 sub-screens
    if (key === 'Investing-mutual-funds' || key === 'Banking-creditCard') {
      return 3;
    }
    // Most other paths have 2 sub-screens
    return 2;
  };

  const handleContinue = () => {
    if (subScreen < getTotalSubScreens()) {
      setSubScreen(subScreen + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  const handleBackToSubScreen = () => {
    if (subScreen > 1) {
      setSubScreen(subScreen - 1);
    } else {
      onBack();
    }
  };

  const isCurrentScreenValid = () => {
    const key = `${category}-${subCategory}`;
    
    // Validation logic for each sub-screen
    if (subScreen === 1) {
      switch (key) {
        case 'Insurance-life':
          return formData.purpose !== undefined;
        case 'Insurance-health':
          return formData.whoNeedsCoverage !== undefined;
        case 'Insurance-critical':
          return formData.financialSupport !== undefined;
        case 'Insurance-travel':
          return formData.destination !== undefined;
        case 'Investing-mutual-funds':
          return formData.timeHorizon !== undefined;
        case 'Investing-retirement':
          return formData.currentAge && formData.retirementAge;
        case 'Investing-gics':
          return formData.liquidityNeeds !== undefined;
        case 'Investing-education':
          return formData.childBirthYear !== undefined;
        case 'Banking-savings':
          return formData.savingsGoal !== undefined;
        case 'Banking-chequing':
          return formData.monthlyTransactions !== undefined;
        case 'Banking-creditCard':
          return formData.rewardsPriority !== undefined;
        case 'Banking-mortgage':
          return formData.buyerStatus !== undefined;
        default:
          return true;
      }
    } else if (subScreen === 2) {
      switch (key) {
        case 'Insurance-life':
          return formData.coverageAmount && formData.coverageDuration;
        case 'Insurance-health':
          return formData.benefits && formData.benefits.length > 0;
        case 'Insurance-critical':
          return formData.conditionFocus && formData.conditionFocus.length > 0;
        case 'Insurance-travel':
          return formData.tripDuration && formData.departureDate && formData.tripType;
        case 'Investing-mutual-funds':
          return formData.riskManagement !== undefined;
        case 'Investing-retirement':
          return formData.contributionStyle !== undefined;
        case 'Investing-gics':
          return formData.termLength !== undefined;
        case 'Investing-education':
          return formData.monthlyContribution !== undefined;
        case 'Banking-savings':
          return formData.withdrawalFrequency !== undefined;
        case 'Banking-chequing':
          return true; // Features are optional
        case 'Banking-creditCard':
          return formData.annualFeePreference !== undefined;
        case 'Banking-mortgage':
          return formData.purchasePrice && formData.downPayment;
        default:
          return true;
      }
    } else if (subScreen === 3) {
      switch (key) {
        case 'Investing-mutual-funds':
          return formData.riskTolerance !== undefined;
        case 'Banking-creditCard':
          return formData.rewardPreference !== undefined;
        default:
          return true;
      }
    }
    return false;
  };

  const renderScreenContent = () => {
    const key = `${category}-${subCategory}`;

    // INSURANCE PATHS
    if (key === 'Insurance-life') {
      if (subScreen === 1) {
        return (
          <div>
            <h2 className="mb-6 text-gray-900">What is the primary purpose of this coverage?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { value: 'income', label: 'Income Replacement', icon: '💼' },
                { value: 'mortgage', label: 'Mortgage Protection', icon: '🏠' },
                { value: 'final', label: 'Final Expenses', icon: '🕊️' },
                { value: 'legacy', label: 'Legacy Planning', icon: '🌟' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, purpose: option.value })}
                  className={`flex flex-col items-center gap-3 p-6 border-2 rounded-xl transition-all ${
                    formData.purpose === option.value
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <span className="text-4xl">{option.icon}</span>
                  <span className="text-gray-900">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        );
      } else if (subScreen === 2) {
        return (
          <div>
            <h2 className="mb-6 text-gray-900">Let's determine your coverage needs</h2>
            
            <div className="mb-8">
              <label className="block mb-4 text-gray-900">
                Estimated Coverage Amount
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="range"
                min="100000"
                max="5000000"
                step="50000"
                value={formData.coverageAmount || 500000}
                onChange={(e) => setFormData({ ...formData, coverageAmount: e.target.value })}
                className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-600">$100K</span>
                <span className="text-emerald-700">${(parseInt(formData.coverageAmount || '500000') / 1000).toFixed(0)}K</span>
                <span className="text-sm text-gray-600">$5M</span>
              </div>
            </div>

            <div>
              <label className="block mb-4 text-gray-900">
                How long do you need coverage?
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="space-y-3">
                {[
                  { value: 'term10', label: 'Specific Term (10 years)' },
                  { value: 'term20', label: 'Specific Term (20 years)' },
                  { value: 'term30', label: 'Specific Term (30 years)' },
                  { value: 'whole', label: 'Whole Life/Permanent' }
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.coverageDuration === option.value
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="coverageDuration"
                      value={option.value}
                      checked={formData.coverageDuration === option.value}
                      onChange={(e) => setFormData({ ...formData, coverageDuration: e.target.value })}
                      className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-gray-900">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      }
    }

    if (key === 'Insurance-health') {
      if (subScreen === 1) {
        return (
          <div>
            <h2 className="mb-6 text-gray-900">Who needs coverage?</h2>
            <div className="space-y-3">
              {[
                { value: 'individual', label: 'Just Me' },
                { value: 'couple', label: 'Me + Spouse' },
                { value: 'family', label: 'Family (Me, Spouse, Children)' }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-4 p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.whoNeedsCoverage === option.value
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="whoNeedsCoverage"
                    value={option.value}
                    checked={formData.whoNeedsCoverage === option.value}
                    onChange={(e) => setFormData({ ...formData, whoNeedsCoverage: e.target.value })}
                    className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-gray-900 text-lg">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );
      } else if (subScreen === 2) {
        const toggleBenefit = (benefit: string) => {
          const current = formData.benefits || [];
          if (current.includes(benefit)) {
            setFormData({ ...formData, benefits: current.filter((b: string) => b !== benefit) });
          } else {
            setFormData({ ...formData, benefits: [...current, benefit] });
          }
        };

        return (
          <div>
            <h2 className="mb-6 text-gray-900">Which specific benefits are most important?</h2>
            <p className="text-gray-600 mb-6">Select all that apply</p>
            <div className="space-y-3">
              {[
                { value: 'prescription', label: 'Prescription Drugs', icon: '💊' },
                { value: 'dental', label: 'Dental Care', icon: '🦷' },
                { value: 'vision', label: 'Vision Care', icon: '👓' },
                { value: 'paramedical', label: 'Paramedical Services (Massage, Physio)', icon: '💆' }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.benefits?.includes(option.value)
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.benefits?.includes(option.value)}
                    onChange={() => toggleBenefit(option.value)}
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className="text-2xl">{option.icon}</span>
                  <span className="text-gray-900 flex-1">{option.label}</span>
                  {formData.benefits?.includes(option.value) && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                </label>
              ))}
            </div>
          </div>
        );
      }
    }

    if (key === 'Insurance-critical') {
      if (subScreen === 1) {
        return (
          <div>
            <h2 className="mb-6 text-gray-900">How much financial support would you need if you couldn't work for 6 months due to illness?</h2>
            <div className="mb-8">
              <input
                type="range"
                min="10000"
                max="200000"
                step="5000"
                value={formData.financialSupport || 50000}
                onChange={(e) => setFormData({ ...formData, financialSupport: e.target.value })}
                className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-600">$10K</span>
                <span className="text-emerald-700 text-xl">${(parseInt(formData.financialSupport || '50000') / 1000).toFixed(0)}K</span>
                <span className="text-sm text-gray-600">$200K</span>
              </div>
            </div>
          </div>
        );
      } else if (subScreen === 2) {
        const toggleCondition = (condition: string) => {
          const current = formData.conditionFocus || [];
          if (current.includes(condition)) {
            setFormData({ ...formData, conditionFocus: current.filter((c: string) => c !== condition) });
          } else {
            setFormData({ ...formData, conditionFocus: [...current, condition] });
          }
        };

        return (
          <div>
            <h2 className="mb-6 text-gray-900">What type of coverage focus do you prefer?</h2>
            <p className="text-gray-600 mb-6">Select all that apply</p>
            <div className="space-y-3">
              {[
                { value: 'cancer', label: 'Cancer coverage focus', icon: '🎗️' },
                { value: 'heart', label: 'Heart condition focus', icon: '❤️' },
                { value: 'comprehensive', label: 'Comprehensive coverage', icon: '🛡️' }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-4 p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.conditionFocus?.includes(option.value)
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.conditionFocus?.includes(option.value)}
                    onChange={() => toggleCondition(option.value)}
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className="text-3xl">{option.icon}</span>
                  <span className="text-gray-900 flex-1 text-lg">{option.label}</span>
                  {formData.conditionFocus?.includes(option.value) && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                </label>
              ))}
            </div>
          </div>
        );
      }
    }

    if (key === 'Insurance-travel') {
      if (subScreen === 1) {
        return (
          <div>
            <h2 className="mb-6 text-gray-900">Where are you traveling?</h2>
            <div className="space-y-3">
              {[
                { value: 'outOfProvince', label: 'Out-of-province (within Canada)', icon: '🍁' },
                { value: 'usa', label: 'United States', icon: '🗽' },
                { value: 'international', label: 'International (outside North America)', icon: '✈️' }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.destination === option.value
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="destination"
                    value={option.value}
                    checked={formData.destination === option.value}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-2xl">{option.icon}</span>
                  <span className="text-gray-900">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );
      } else if (subScreen === 2) {
        return (
          <div>
            <h2 className="mb-6 text-gray-900">Tell us about your trip</h2>
            
            <div className="mb-8">
              <label className="block mb-4 text-gray-900">
                How long is your trip?
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { value: '1-7', label: '1-7 days' },
                  { value: '8-14', label: '8-14 days' },
                  { value: '15-30', label: '15-30 days' },
                  { value: '31+', label: '31+ days' }
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center justify-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.tripDuration === option.value
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tripDuration"
                      value={option.value}
                      checked={formData.tripDuration === option.value}
                      onChange={(e) => setFormData({ ...formData, tripDuration: e.target.value })}
                      className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-gray-900">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block mb-4 text-gray-900">
                When do you depart?
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.departureDate || ''}
                  onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:border-emerald-600 focus:outline-none text-gray-900"
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block mb-4 text-gray-900">
                What type of trip is this?
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="space-y-3">
                {[
                  { value: 'leisure', label: 'Leisure/Vacation' },
                  { value: 'business', label: 'Business' },
                  { value: 'family', label: 'Family visit' },
                  { value: 'adventure', label: 'Adventure/Sports' }
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.tripType === option.value
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tripType"
                      value={option.value}
                      checked={formData.tripType === option.value}
                      onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                      className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-gray-900">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      }
    }

    // INVESTING PATHS
    if (key === 'Investing-mutual-funds') {
      if (subScreen === 1) {
        return (
          <div>
            <h2 className="mb-6 text-gray-900">When do you plan to use this money?</h2>
            <div className="space-y-3">
              {[
                { value: 'short', label: 'Less than 3 years' },
                { value: 'medium', label: '3–7 years' },
                { value: 'long', label: '7+ years' }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-4 p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.timeHorizon === option.value
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="timeHorizon"
                    value={option.value}
                    checked={formData.timeHorizon === option.value}
                    onChange={(e) => setFormData({ ...formData, timeHorizon: e.target.value })}
                    className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-gray-900 text-lg">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );
      } else if (subScreen === 2) {
        return (
          <div>
            <h2 className="mb-4 text-gray-900">How would you describe your risk tolerance?</h2>
            <p className="text-gray-600 mb-8">Think about how you'd feel if your investments fluctuated in value</p>
            
            {/* Risk Tolerance Initial Assessment */}
            <div className="space-y-4">
              {[
                { 
                  value: 'low', 
                  label: 'Low Risk Tolerance', 
                  subtitle: 'Stability First',
                  description: 'I prefer to protect my money and avoid losses, even if it means lower returns. Market drops make me very uncomfortable.'
                },
                { 
                  value: 'moderate-low', 
                  label: 'Moderate-Low Risk Tolerance', 
                  subtitle: 'Mostly Cautious',
                  description: 'I want stability but can accept small fluctuations for slightly better returns. I prefer to limit my exposure to losses.'
                },
                { 
                  value: 'moderate', 
                  label: 'Moderate Risk Tolerance', 
                  subtitle: 'Balanced View',
                  description: 'I can handle ups and downs in the market. I understand that some risk is necessary for better long-term growth.'
                },
                { 
                  value: 'moderate-high', 
                  label: 'Moderate-High Risk Tolerance', 
                  subtitle: 'Growth-Oriented',
                  description: 'I am comfortable with significant fluctuations to pursue stronger returns. Short-term losses do not concern me much.'
                },
                { 
                  value: 'high', 
                  label: 'High Risk Tolerance', 
                  subtitle: 'Maximum Growth',
                  description: 'I can handle major swings in my portfolio value. I am focused on maximizing long-term returns and can weather volatility.'
                }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`block p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.riskManagement === option.value
                      ? 'border-emerald-600 bg-emerald-50 shadow-md'
                      : 'border-gray-200 hover:border-emerald-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="radio"
                      name="riskManagement"
                      value={option.value}
                      checked={formData.riskManagement === option.value}
                      onChange={(e) => setFormData({ ...formData, riskManagement: e.target.value })}
                      className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 mt-1 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-gray-900 text-xl">{option.label}</span>
                        <span className="text-emerald-700 text-sm bg-emerald-100 px-3 py-1 rounded-full">
                          {option.subtitle}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{option.description}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );
      } else if (subScreen === 3) {
        return (
          <div>
            <h2 className="mb-4 text-gray-900">Let's confirm your investment comfort level</h2>
            <p className="text-gray-600 mb-8">Based on your previous answer, please select the investment strategy that best matches your goals and comfort with risk</p>
            
            {/* Risk Tolerance Confirmation */}
            <div className="space-y-4">
              {[
                { 
                  value: 1, 
                  label: 'Conservative', 
                  subtitle: 'Stability & Preservation', 
                  description: 'Prioritize capital preservation with minimal market exposure. Suitable for those who prefer predictable, steady returns.'
                },
                { 
                  value: 2, 
                  label: 'Moderately Conservative', 
                  subtitle: 'Cautious Growth', 
                  description: 'Prefer stability with some growth potential. Willing to accept small fluctuations for modest returns.'
                },
                { 
                  value: 3, 
                  label: 'Moderate', 
                  subtitle: 'Balanced Strategy', 
                  description: 'Equal focus on growth and stability. Comfortable with moderate market ups and downs for balanced returns.'
                },
                { 
                  value: 4, 
                  label: 'Moderately Aggressive', 
                  subtitle: 'Growth-Focused', 
                  description: 'Prioritize growth over stability. Comfortable with significant volatility to pursue higher long-term returns.'
                },
                { 
                  value: 5, 
                  label: 'Aggressive', 
                  subtitle: 'Maximum Growth Potential', 
                  description: 'Maximize returns through higher risk investments. Accept substantial short-term volatility for optimal long-term growth.'
                }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`block p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.riskTolerance === option.value
                      ? 'border-emerald-600 bg-emerald-50 shadow-md'
                      : 'border-gray-200 hover:border-emerald-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="radio"
                      name="riskTolerance"
                      value={option.value}
                      checked={formData.riskTolerance === option.value}
                      onChange={(e) => setFormData({ ...formData, riskTolerance: parseInt(e.target.value) })}
                      className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 mt-1 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-gray-900 text-xl">{option.label}</span>
                        <span className="text-emerald-700 text-sm bg-emerald-100 px-3 py-1 rounded-full">
                          {option.subtitle}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{option.description}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );
      }
    }

    if (key === 'Investing-retirement') {
      if (subScreen === 1) {
        return (
          <div>
            <h2 className="mb-6 text-gray-900">Let's plan your retirement timeline</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-3 text-gray-900">
                  Current Age
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="number"
                  min="18"
                  max="75"
                  value={formData.currentAge || ''}
                  onChange={(e) => setFormData({ ...formData, currentAge: e.target.value })}
                  placeholder="e.g., 35"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-emerald-600 focus:outline-none text-gray-900"
                />
              </div>
              <div>
                <label className="block mb-3 text-gray-900">
                  Target Retirement Age
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="number"
                  min="50"
                  max="80"
                  value={formData.retirementAge || ''}
                  onChange={(e) => setFormData({ ...formData, retirementAge: e.target.value })}
                  placeholder="e.g., 65"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-emerald-600 focus:outline-none text-gray-900"
                />
              </div>
            </div>
            {formData.currentAge && formData.retirementAge && parseInt(formData.retirementAge) > parseInt(formData.currentAge) && (
              <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <p className="text-emerald-800">
                  <strong>{parseInt(formData.retirementAge) - parseInt(formData.currentAge)} years</strong> to save for retirement
                </p>
              </div>
            )}
          </div>
        );
      } else if (subScreen === 2) {
        return (
          <div>
            <h2 className="mb-6 text-gray-900">How do you prefer to contribute?</h2>
            <div className="space-y-3">
              {[
                { value: 'lumpSum', label: 'Lump Sum deposits', description: 'Make larger one-time contributions' },
                { value: 'monthly', label: 'Regular Monthly Contributions', description: 'Consistent smaller amounts each month' }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-start gap-4 p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.contributionStyle === option.value
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="contributionStyle"
                    value={option.value}
                    checked={formData.contributionStyle === option.value}
                    onChange={(e) => setFormData({ ...formData, contributionStyle: e.target.value })}
                    className="mt-1 w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <div className="text-gray-900 text-lg mb-1">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );
      }
    }

    if (key === 'Investing-gics') {
      if (subScreen === 1) {
        return (
          <div>
            <h2 className="mb-6 text-gray-900">Do you need access to these funds before the term ends?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { value: 'cashable', label: 'Yes, make it Cashable', description: 'Lower rate, but access anytime' },
                { value: 'locked', label: 'No, lock it in', description: 'Higher rate, funds locked until maturity' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, liquidityNeeds: option.value })}
                  className={`flex flex-col items-start gap-2 p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.liquidityNeeds === option.value
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="text-gray-900 text-lg">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.description}</div>
                </button>
              ))}
            </div>
          </div>
        );
      } else if (subScreen === 2) {
        return (
          <div>
            <h2 className="mb-6 text-gray-900">Select your term length</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['1', '2', '3', '5'].map((years) => (
                <button
                  key={years}
                  type="button"
                  onClick={() => setFormData({ ...formData, termLength: years })}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all text-center ${
                    formData.termLength === years
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="text-3xl text-gray-900 mb-2">{years}</div>
                  <div className="text-sm text-gray-600">Year{years !== '1' ? 's' : ''}</div>
                </button>
              ))}
            </div>
          </div>
        );
      }
    }

    if (key === 'Investing-education') {
      if (subScreen === 1) {
        return (
          <div>
            <h2 className="mb-6 text-gray-900">What is the birth year of the child?</h2>
            <input
              type="number"
              min="2000"
              max={new Date().getFullYear()}
              value={formData.childBirthYear || ''}
              onChange={(e) => setFormData({ ...formData, childBirthYear: e.target.value })}
              placeholder="e.g., 2020"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-emerald-600 focus:outline-none text-gray-900 text-lg"
            />
            {formData.childBirthYear && (
              <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <p className="text-emerald-800">
                  Approximately <strong>{18 - (new Date().getFullYear() - parseInt(formData.childBirthYear))} years</strong> until post-secondary education
                </p>
              </div>
            )}
          </div>
        );
      } else if (subScreen === 2) {
        return (
          <div>
            <h2 className="mb-6 text-gray-900">What is your monthly contribution goal to maximize government grants?</h2>
            <p className="text-gray-600 mb-6">The government matches 20% on the first $2,500 per year ($208/month)</p>
            <div className="mb-6">
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={formData.monthlyContribution || 208}
                onChange={(e) => setFormData({ ...formData, monthlyContribution: e.target.value })}
                className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-600">$50</span>
                <span className="text-emerald-700 text-xl">${formData.monthlyContribution || 208}/month</span>
                <span className="text-sm text-gray-600">$500</span>
              </div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <p className="text-sm text-emerald-800">
                <strong>Annual contribution:</strong> ${(parseInt(formData.monthlyContribution || '208') * 12).toLocaleString()}
                <br />
                <strong>Government grant (20%):</strong> ${Math.min((parseInt(formData.monthlyContribution || '208') * 12 * 0.2), 500).toLocaleString()}
              </p>
            </div>
          </div>
        );
      }
    }

    // BANKING PATHS
    if (key === 'Banking-savings') {
      if (subScreen === 1) {
        return (
          <div>
            <h2 className="mb-6 text-gray-900">What are you saving for?</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { value: 'emergency', label: 'Emergency Fund', icon: '🛡️' },
                { value: 'largePurchase', label: 'Large Purchase (Car/Home)', icon: '🏠' },
                { value: 'general', label: 'General Savings', icon: '💰' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, savingsGoal: option.value })}
                  className={`flex flex-col items-center gap-3 p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.savingsGoal === option.value
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <span className="text-4xl">{option.icon}</span>
                  <span className="text-gray-900 text-center">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        );
      } else if (subScreen === 2) {
        return (
          <div>
            <h2 className="mb-6 text-gray-900">How often will you need to withdraw money?</h2>
            <div className="space-y-3">
              {[
                { value: 'rarely', label: 'Rarely/Never' },
                { value: 'sometimes', label: 'A few times a year' },
                { value: 'frequently', label: 'Frequently' }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-4 p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.withdrawalFrequency === option.value
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="withdrawalFrequency"
                    value={option.value}
                    checked={formData.withdrawalFrequency === option.value}
                    onChange={(e) => setFormData({ ...formData, withdrawalFrequency: e.target.value })}
                    className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-gray-900 text-lg">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );
      }
    }

    if (key === 'Banking-chequing') {
      if (subScreen === 1) {
        return (
          <div>
            <h2 className="mb-6 text-gray-900">Estimate your monthly transactions</h2>
            <p className="text-gray-600 mb-6">(Debit, Bill Pay, Transfers)</p>
            <div className="space-y-3">
              {[
                { value: 'low', label: 'Low (Under 15 transactions)' },
                { value: 'medium', label: 'Medium (15-40 transactions)' },
                { value: 'unlimited', label: 'Unlimited' }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-4 p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.monthlyTransactions === option.value
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="monthlyTransactions"
                    value={option.value}
                    checked={formData.monthlyTransactions === option.value}
                    onChange={(e) => setFormData({ ...formData, monthlyTransactions: e.target.value })}
                    className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-gray-900 text-lg">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );
      } else if (subScreen === 2) {
        const toggleFeature = (feature: string) => {
          const current = formData.features || [];
          if (current.includes(feature)) {
            setFormData({ ...formData, features: current.filter((f: string) => f !== feature) });
          } else {
            setFormData({ ...formData, features: [...current, feature] });
          }
        };

        return (
          <div>
            <h2 className="mb-6 text-gray-900">Must-Have Features</h2>
            <p className="text-gray-600 mb-6">Select all that apply</p>
            <div className="space-y-3">
              {[
                { value: 'eTransfers', label: 'Unlimited E-Transfers' },
                { value: 'overdraft', label: 'Overdraft Protection' },
                { value: 'noMinimum', label: 'No minimum balance requirement' }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.features?.includes(option.value)
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.features?.includes(option.value)}
                    onChange={() => toggleFeature(option.value)}
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className="text-gray-900 flex-1">{option.label}</span>
                  {formData.features?.includes(option.value) && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                </label>
              ))}
            </div>
          </div>
        );
      }
    }

    if (key === 'Banking-creditCard') {
      if (subScreen === 1) {
        return (
          <div>
            <h2 className="mb-6 text-gray-900">What matters most to you in earning rewards?</h2>
            <p className="text-gray-600 mb-8">Help us understand your spending priorities to recommend the best card</p>
            <div className="space-y-4">
              {[
                { 
                  value: 'rewards', 
                  label: 'Maximize Rewards/Points', 
                  subtitle: 'Highest Earning Rate',
                  description: 'I want to earn the maximum number of points or rewards on my purchases, even if it means paying an annual fee.'
                },
                { 
                  value: 'cashback', 
                  label: 'Prioritize Cash Back', 
                  subtitle: 'Simple & Direct',
                  description: 'I prefer getting cash back that I can use immediately rather than accumulating points or miles.'
                },
                { 
                  value: 'flexible', 
                  label: 'Flexible Options', 
                  subtitle: 'Best of Both',
                  description: 'I want the flexibility to choose between cash back and rewards points depending on my needs.'
                },
                { 
                  value: 'simplicity', 
                  label: 'Keep It Simple', 
                  subtitle: 'Easy to Understand',
                  description: 'I prefer a straightforward rewards structure without complex categories or spending requirements.'
                }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`block p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.rewardsPriority === option.value
                      ? 'border-emerald-600 bg-emerald-50 shadow-md'
                      : 'border-gray-200 hover:border-emerald-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="radio"
                      name="rewardsPriority"
                      value={option.value}
                      checked={formData.rewardsPriority === option.value}
                      onChange={(e) => setFormData({ ...formData, rewardsPriority: e.target.value })}
                      className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 mt-1 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-gray-900 text-xl">{option.label}</span>
                        <span className="text-emerald-700 text-sm bg-emerald-100 px-3 py-1 rounded-full">
                          {option.subtitle}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{option.description}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );
      } else if (subScreen === 2) {
        return (
          <div>
            <h2 className="mb-6 text-gray-900">Are you willing to pay an annual fee for higher reward earning potential?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { value: 'yes', label: 'Yes', description: 'Higher rewards, with annual fee' },
                { value: 'no', label: 'No', description: 'No annual fee, standard rewards' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, annualFeePreference: option.value })}
                  className={`flex flex-col items-center gap-2 p-8 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.annualFeePreference === option.value
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="text-gray-900 text-2xl mb-2">{option.label}</div>
                  <div className="text-sm text-gray-600 text-center">{option.description}</div>
                </button>
              ))}
            </div>
          </div>
        );
      } else if (subScreen === 3) {
        return (
          <div>
            <h2 className="mb-6 text-gray-900">What is your primary reward preference?</h2>
            <div className="space-y-4">
              {[
                { value: 'cashBack', label: 'Cash Back', icon: '💵', description: 'Get money back on every purchase' },
                { value: 'travel', label: 'Travel Points/Miles', icon: '✈️', description: 'Earn points for flights and hotels' },
                { value: 'lowInterest', label: 'Low Interest Rate', icon: '📉', description: 'Lower rates if you carry a balance' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, rewardPreference: option.value })}
                  className={`w-full flex items-start gap-4 p-6 border-2 rounded-xl cursor-pointer transition-all text-left ${
                    formData.rewardPreference === option.value
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <span className="text-4xl">{option.icon}</span>
                  <div className="flex-1">
                    <div className="text-gray-900 text-lg mb-1">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      }
    }

    if (key === 'Banking-mortgage') {
      if (subScreen === 1) {
        return (
          <div>
            <h2 className="mb-6 text-gray-900">What is your current status?</h2>
            <div className="space-y-3">
              {[
                { value: 'firstTime', label: 'First-Time Buyer', icon: '🏡' },
                { value: 'renewing', label: 'Renewing/Refinancing', icon: '🔄' },
                { value: 'nextHome', label: 'Buying Next Home/Investment', icon: '🏢' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, buyerStatus: option.value })}
                  className={`w-full flex items-center gap-4 p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.buyerStatus === option.value
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <span className="text-3xl">{option.icon}</span>
                  <span className="text-gray-900 text-lg">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        );
      } else if (subScreen === 2) {
        return (
          <div>
            <h2 className="mb-6 text-gray-900">Financial Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block mb-3 text-gray-900">
                  Estimated Purchase Price
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={formData.purchasePrice || ''}
                    onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                    placeholder="e.g., 500000"
                    className="w-full p-4 pl-8 border-2 border-gray-200 rounded-xl focus:border-emerald-600 focus:outline-none text-gray-900"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-3 text-gray-900">
                  Available Down Payment
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={formData.downPayment || ''}
                    onChange={(e) => setFormData({ ...formData, downPayment: e.target.value })}
                    placeholder="e.g., 100000"
                    className="w-full p-4 pl-8 border-2 border-gray-200 rounded-xl focus:border-emerald-600 focus:outline-none text-gray-900"
                  />
                </div>
              </div>
              {formData.purchasePrice && formData.downPayment && (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <p className="text-sm text-emerald-800">
                    <strong>Down payment:</strong> {((parseInt(formData.downPayment) / parseInt(formData.purchasePrice)) * 100).toFixed(1)}%
                    <br />
                    <strong>Mortgage needed:</strong> ${(parseInt(formData.purchasePrice) - parseInt(formData.downPayment)).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      }
    }

    // Default fallback
    return (
      <div>
        <h2 className="mb-6 text-gray-900">Tell us about your needs</h2>
        <p className="text-gray-600">We're gathering information to provide you with the best recommendation.</p>
      </div>
    );
  };

  const isLastScreen = subScreen === getTotalSubScreens();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onLogoClick}
              className="hover:opacity-80 transition-opacity"
            >
              <img src={image_f42f659a10873f310d6028ae1ecf8b9fa1e3c60d} alt="Manulife" className="h-8" />
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
              <span>Step 3.{subScreen} of 4</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBackToSubScreen}
            className="flex items-center gap-2 text-gray-600 hover:text-emerald-700 mb-8 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          {/* Progress & Title */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
              <span className="text-sm">Question {subScreen} of {getTotalSubScreens()}</span>
            </div>
            <h1 className="mb-4 text-gray-900">
              {isLastScreen ? 'Almost done!' : 'Tell us about your needs'}
            </h1>
            <p className="text-gray-600 text-lg">
              These details help us find the perfect {category.toLowerCase()} solution for you
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-6">
              {renderScreenContent()}
            </div>

            {/* Action Button */}
            {!isLastScreen ? (
              <button
                type="button"
                onClick={handleContinue}
                disabled={!isCurrentScreenValid()}
                className={`w-full py-5 rounded-xl transition-all flex items-center justify-center gap-2 text-lg ${
                  isCurrentScreenValid()
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isCurrentScreenValid()}
                className={`w-full py-5 rounded-xl transition-all flex items-center justify-center gap-3 text-lg ${
                  isCurrentScreenValid()
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 className="w-6 h-6" />
                See My Results
              </button>
            )}
          </form>

          {/* Help Section */}
          <div className="mt-8 text-center space-y-4">
            <p className="text-gray-500 text-sm">
              Need help with these questions?{' '}
              <a href="tel:1-800-626-8543" className="text-emerald-700 hover:text-emerald-800 underline">
                Call us at 1-800-MANULIFE
              </a>
            </p>
            <button
              type="button"
              onClick={onLogoClick}
              className="text-gray-500 hover:text-emerald-700 text-sm underline transition-colors"
            >
              Start Over
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
