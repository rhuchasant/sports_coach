// pages/register.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';

export default function Register() {
  const router = useRouter();
  const [fitnessLevels, setFitnessLevels] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    fitnessLevel: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch fitness levels from API
    const fetchFitnessLevels = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/fitness_levels');
        const data = await response.json();
        setFitnessLevels(data.fitnessLevels);
      } catch (err) {
        console.error('Error fetching fitness levels:', err);
        // Fallback in case API is not available
        setFitnessLevels(['beginner', 'intermediate', 'advanced', 'elite']);
      }
    };

    fetchFitnessLevels();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Store user ID and name for future use
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userName', formData.name);
        
        // Navigate to select-sport page
        router.push('/select-sport');
      } else {
        setError(data.error || 'Failed to create profile');
      }
    } catch (err) {
      console.error('Error creating profile:', err);
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Register - Sports Fitness Coach AI</title>
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
          >
            Create Your Profile
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-2 text-gray-400"
          >
            Let's get started with your fitness journey
          </motion.p>
        </div>

        <div className="bg-gray-800 py-8 px-4 shadow-lg rounded-xl border border-gray-700">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-300">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-300">
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-300">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    id="height"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-300">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="fitnessLevel" className="block text-sm font-medium text-gray-300">
                  Fitness Level
                </label>
                <select
                  id="fitnessLevel"
                  value={formData.fitnessLevel}
                  onChange={(e) => setFormData({ ...formData, fitnessLevel: e.target.value })}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Profile...' : 'Create Profile'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}