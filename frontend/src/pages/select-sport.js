// Continuing from pages/select-sport.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';

export default function SelectSport() {
  const router = useRouter();
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState('');
  const [level, setLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user ID exists
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/register');
      return;
    }

    // Fetch available sports from API
    const fetchSports = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sports');
        const data = await response.json();
        setSports(data.sports);
      } catch (err) {
        console.error('Error fetching sports:', err);
        // Fallback in case API is not available
        setSports(['cricket', 'football', 'swimming', 'running', 'tennis', 'basketball', 'weightlifting', 'gymnastics']);
      }
    };

    fetchSports();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('User session not found. Please register again.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/sport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          sport: selectedSport,
          level
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Store selected sport for future reference
        localStorage.setItem('selectedSport', selectedSport);
        
        // Navigate to the competition details page
        router.push('/competition-details');
      } else {
        setError(data.error || 'Failed to set sport preference');
      }
    } catch (err) {
      console.error('Error setting sport:', err);
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Select Sport - Sports Fitness Coach AI</title>
      </Head>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Select Your Sport</h2>
            <p className="text-blue-100 mt-1">Choose your primary sport and experience level</p>
          </div>
          
          <form onSubmit={handleSubmit} className="px-6 py-4 space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg"
              >
                {error}
              </motion.div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="sport" className="block text-sm font-medium text-gray-300">
                Sport
              </label>
              <select
                id="sport"
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                required
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a sport</option>
                {sports.map((sport) => (
                  <option key={sport} value={sport}>
                    {sport.charAt(0).toUpperCase() + sport.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="level" className="block text-sm font-medium text-gray-300">
                Your Experience Level
              </label>
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                required
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="professional">Professional</option>
              </select>
            </div>
            
            <div className="flex justify-between pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => router.back()}
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Back
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Continue'}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}