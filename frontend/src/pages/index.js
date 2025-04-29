// pages/index.js
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import UserProfileSetup from '../components/UserProfileSetup';
import InjuryHistory from '../components/InjuryHistory';
import PreviousAchievements from '../components/PreviousAchievements';
import { motion } from 'framer-motion';
import Chatbot from '../components/Chatbot';

export default function Home() {
  const router = useRouter();
  const [showSetup, setShowSetup] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleGetStarted = () => {
    router.push('/register');
  };

  const handleProfileComplete = (id) => {
    setUserId(id);
    setShowSetup(false);
  };

  if (showSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Head>
          <title>Setup Your Profile - Sports Fitness Coach</title>
          <meta name="description" content="Set up your profile to get your personalized fitness plan" />
        </Head>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Let's Create Your Profile
            </h1>
            <p className="text-center text-gray-600 mb-12">
              We'll use this information to create a personalized plan just for you
            </p>
            <UserProfileSetup onComplete={handleProfileComplete} />
          </div>
        </div>
      </div>
    );
  }

  if (userId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Head>
          <title>Your Profile - Sports Fitness Coach</title>
          <meta name="description" content="View and manage your fitness profile" />
        </Head>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Your Fitness Profile
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InjuryHistory userId={userId} />
              <PreviousAchievements userId={userId} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Head>
        <title>Sports Fitness Coach AI</title>
        <meta name="description" content="AI-powered sports fitness coaching system" />
      </Head>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6"
          >
            Welcome to Sports Fitness Coach
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
          >
            Get your personalized training and nutrition plan tailored to your goals, 
            fitness level, and preferences. Start your journey to peak performance today!
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started
          </motion.button>
        </motion.div>

        <Chatbot />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300"
          >
            <div className="text-5xl mb-4 text-blue-400">🎯</div>
            <h3 className="text-xl font-semibold mb-2 text-white">Personalized Plans</h3>
            <p className="text-gray-400">Get a plan tailored to your specific goals and fitness level</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300"
          >
            <div className="text-5xl mb-4 text-purple-400">💪</div>
            <h3 className="text-xl font-semibold mb-2 text-white">Expert Guidance</h3>
            <p className="text-gray-400">AI-powered recommendations based on proven training methods</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300"
          >
            <div className="text-5xl mb-4 text-green-400">🥗</div>
            <h3 className="text-xl font-semibold mb-2 text-white">Nutrition Plans</h3>
            <p className="text-gray-400">Customized diet recommendations to support your training</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-sm">
            Powered by AI • Personalized Training • Expert Nutrition
          </p>
        </motion.div>
      </div>
    </div>
  );
}