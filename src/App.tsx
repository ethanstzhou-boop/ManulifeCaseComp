import { useState } from 'react';
import { OnboardingScreen } from './components/OnboardingScreen';
import { SubCategoryScreen } from './components/SubCategoryScreen';
import { NeedsAssessment } from './components/NeedsAssessment';
import { RecommendationDashboard } from './components/RecommendationDashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [assessmentData, setAssessmentData] = useState<Record<string, any>>({});

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentScreen(2);
  };

  const handleSubCategorySelect = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
    setCurrentScreen(3);
  };

  const handleAssessmentComplete = (data: Record<string, any>) => {
    setAssessmentData(data);
    setCurrentScreen(4);
  };

  const handleRestart = () => {
    setCurrentScreen(1);
    setSelectedCategory('');
    setSelectedSubCategory('');
    setAssessmentData({});
  };

  return (
    <div className="min-h-screen bg-white">
      {currentScreen === 1 && (
        <OnboardingScreen 
          onSelect={handleCategorySelect}
          onLogoClick={handleRestart}
        />
      )}

      {currentScreen === 2 && (
        <SubCategoryScreen
          category={selectedCategory}
          onSelect={handleSubCategorySelect}
          onBack={() => setCurrentScreen(1)}
          onLogoClick={handleRestart}
        />
      )}

      {currentScreen === 3 && (
        <NeedsAssessment
          category={selectedCategory}
          subCategory={selectedSubCategory}
          onComplete={handleAssessmentComplete}
          onBack={() => setCurrentScreen(2)}
          onLogoClick={handleRestart}
        />
      )}

      {currentScreen === 4 && (
        <RecommendationDashboard
          category={selectedCategory}
          subCategory={selectedSubCategory}
          assessmentData={assessmentData}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
