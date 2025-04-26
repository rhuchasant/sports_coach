// pages/diet-preferences.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';

export default function DietPreferences() {
  const router = useRouter();
  const [dietType, setDietType] = useState('');
  const [restrictions, setRestrictions] = useState([]);
  const [availableDietTypes, setAvailableDietTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch available diet types from backend
    fetch('http://localhost:5000/api/diet_types')
      .then(response => response.json())
      .then(data => setAvailableDietTypes(data.dietTypes))
      .catch(err => console.error('Error fetching diet types:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch('http://localhost:5000/api/diet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          dietType,
          restrictions,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save diet preferences');
      }

      router.push('/past-history');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Diet Preferences - Sports Fitness Coach</title>
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Diet Preferences
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-300 text-lg"
          >
            Let us know about your dietary preferences to create a personalized nutrition plan
          </motion.p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Diet Type Selection */}
          <div className="space-y-4">
            <label className="block text-gray-300 text-lg font-medium">
              Preferred Diet Type
            </label>
            <select
              value={dietType}
              onChange={(e) => setDietType(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a diet type</option>
              {availableDietTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Dietary Restrictions */}
          <div className="space-y-4">
            <label className="block text-gray-300 text-lg font-medium">
              Dietary Restrictions (Optional)
            </label>
            <div className="space-y-2">
              {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free'].map((restriction) => (
                <label key={restriction} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={restrictions.includes(restriction)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRestrictions([...restrictions, restriction]);
                      } else {
                        setRestrictions(restrictions.filter(r => r !== restriction));
                      }
                    }}
                    className="h-5 w-5 text-blue-500 rounded border-gray-700 focus:ring-blue-500"
                  />
                  <span className="text-gray-300">{restriction}</span>
                </label>
              ))}
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.back()}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            >
              Back
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Continue to Past History'}
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
}