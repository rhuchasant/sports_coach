// pages/fitness-plan.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function FitnessPlan() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');
  const [plan, setPlan] = useState({
    trainingPlan: [],
    nutritionPlan: []
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const name = localStorage.getItem('userName');
    
    if (!userId) {
      router.push('/register');
      return;
    }
    
    setUserName(name || 'Athlete');
    
    // Fetch the personalized plan
    const fetchPlan = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/plan/${userId}`);
        const data = await response.json();
        
        if (response.ok) {
          setPlan(data);
        } else {
          setError(data.error || 'Could not generate fitness plan');
        }
      } catch (err) {
        console.error('Error fetching fitness plan:', err);
        setError('Network error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlan();
  }, []);

  const handleStartOver = () => {
    // Clear stored data
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('selectedSport');
    
    // Redirect to registration
    router.push('/register');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">Generating Your Personalized Plan</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Our AI is analyzing your information to create the perfect plan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Your Fitness Plan - Sports Fitness Coach AI</title>
      </Head>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-blue-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Your Personalized Sports Fitness Plan</h2>
            <p className="text-blue-100">Hello, {userName}! Here's your AI-generated fitness plan.</p>
          </div>
          
          {error ? (
            <div className="p-6">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
              <button
                onClick={handleStartOver}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Start Over
              </button>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Training Plan</h3>
                  {plan.trainingPlan && plan.trainingPlan.length > 0 ? (
                    <ul className="space-y-2">
                      {plan.trainingPlan.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">No training recommendations available.</p>
                  )}
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Nutrition Plan</h3>
                  {plan.nutritionPlan && plan.nutritionPlan.length > 0 ? (
                    <ul className="space-y-2">
                      {plan.nutritionPlan.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">No nutrition recommendations available.</p>
                  )}
                </div>
              </div>
              
              <div className="mt-8 bg-blue-50 rounded-md p-4">
                <h4 className="font-medium text-blue-800 mb-2">Important Note</h4>
                <p className="text-sm text-gray-700">
                  This plan is generated based on the information you provided and general best practices. 
                  Always consult with a professional coach, trainer, or healthcare provider before starting 
                  any new fitness or nutrition program, especially if you have existing health conditions or injuries.
                </p>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => window.print()}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                  </svg>
                  Print Plan
                </button>
                
                <button
                  onClick={handleStartOver}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Create New Plan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}