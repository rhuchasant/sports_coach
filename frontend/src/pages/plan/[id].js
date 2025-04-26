import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';

export default function PlanPage() {
  const router = useRouter();
  const { id } = router.query;
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchPlan = async () => {
      try {
        console.log('Fetching plan for user:', id);
        const response = await fetch(`http://localhost:5000/api/plan/${id}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('API Error:', errorData);
          
          // Handle specific error cases
          if (response.status === 404) {
            throw new Error('User profile not found. Please complete your profile setup first.');
          } else if (response.status === 400) {
            throw new Error('Unable to generate plan. Please ensure all required information is provided in your profile.');
          } else {
            throw new Error(errorData.error || 'Failed to fetch plan');
          }
        }
        
        const data = await response.json();
        console.log('Received plan data:', data);
        
        if (!data || (!data.trainingPlan && !data.nutritionPlan)) {
          throw new Error('No plan data available. Please complete your profile setup.');
        }
        
        setPlan(data);
      } catch (err) {
        console.error('Error fetching plan:', err);
        setError(err.message || 'Failed to fetch plan. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 p-8 rounded-xl shadow-lg"
          >
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Unable to Load Plan</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/setup')}
                className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Complete Profile Setup
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/')}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                Return to Home
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Your Personalized Plan - Sports Fitness Coach</title>
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Your Personalized Plan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-300 text-lg"
          >
            Tailored to your goals, preferences, and fitness level
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Training Plan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700"
          >
            <div className="flex items-center mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Training Plan</h2>
                <p className="text-gray-400">Your personalized workout routine</p>
              </div>
            </div>
            
            {plan?.trainingPlan?.length > 0 ? (
              <div className="space-y-4">
                {plan.trainingPlan.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors duration-200"
                  >
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1">
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-gray-300">{item.description}</p>
                        {item.details && (
                          <ul className="mt-3 space-y-2">
                            {item.details.map((detail, i) => (
                              <li key={i} className="text-gray-400 flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-400">No training plan available yet.</p>
              </div>
            )}
          </motion.div>

          {/* Nutrition Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700"
          >
            <div className="flex items-center mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Nutrition Plan</h2>
                <p className="text-gray-400">Your personalized meal recommendations</p>
              </div>
            </div>
            
            {plan.nutritionPlan && plan.nutritionPlan.length > 0 ? (
              <div className="space-y-4">
                {plan.nutritionPlan.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors duration-200"
                  >
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-gray-300">{item.description}</p>
                        {item.details && (
                          <ul className="mt-3 space-y-2">
                            {item.details.map((detail, i) => (
                              <li key={i} className="text-gray-400 flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-400">No nutrition plan available yet.</p>
              </div>
            )}
          </motion.div>

          {/* Injury Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700"
          >
            <div className="flex items-center mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Injury Recommendations</h2>
                <p className="text-gray-400">Important guidelines for your training</p>
              </div>
            </div>
            
            {plan.injuryRecommendations && plan.injuryRecommendations.length > 0 ? (
              <div className="space-y-4">
                {plan.injuryRecommendations.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors duration-200"
                  >
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-4 mt-1">
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-gray-300">{item.description}</p>
                        {item.details && (
                          <ul className="mt-3 space-y-2">
                            {item.details.map((detail, i) => (
                              <li key={i} className="text-gray-400 flex items-center">
                                <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-400">No injury recommendations available.</p>
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/')}
            className="px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium shadow-lg"
          >
            Return to Home
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
} 