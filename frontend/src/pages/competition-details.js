// pages/competition-details.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';

export default function CompetitionDetails() {
  const router = useRouter();
  const [competitionTypes, setCompetitionTypes] = useState([]);
  const [formats, setFormats] = useState([]);
  const [levels, setLevels] = useState([]);
  const [formData, setFormData] = useState({
    competitionType: '',
    format: '',
    level: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user ID exists
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/register');
      return;
    }

    const selectedSport = localStorage.getItem('selectedSport');
    if (!selectedSport) {
      router.push('/select-sport');
      return;
    }

    // Fetch competition types, formats, and levels
    const fetchData = async () => {
      try {
        const [typesResponse, formatsResponse, levelsResponse] = await Promise.all([
          fetch('http://localhost:5000/api/competition_types'),
          fetch(`http://localhost:5000/api/sport_formats/${selectedSport}`),
          fetch('http://localhost:5000/api/competition_levels')
        ]);

        const typesData = await typesResponse.json();
        const formatsData = await formatsResponse.json();
        const levelsData = await levelsResponse.json();

        setCompetitionTypes(typesData.competitionTypes);
        setFormats(formatsData.formats);
        setLevels(levelsData.levels);
      } catch (err) {
        console.error('Error fetching competition data:', err);
        // Fallback values
        setCompetitionTypes(['olympics', 'commonwealth', 'world_championship', 'national', 'local']);
        setFormats(['tournament', 'league', 'friendly']);
        setLevels(['international', 'national', 'state', 'club']);
      }
    };

    fetchData();
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
      const userId = localStorage.getItem('userId');
      const response = await fetch('http://localhost:5000/api/competition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          competitionType: formData.competitionType,
          format: formData.format,
          level: formData.level
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save competition details');
      }

      router.push('/diet-preferences');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Competition Details - Sports Fitness Coach</title>
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
            Competition Details
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-300 text-lg"
          >
            Tell us about your competition goals and experience
          </motion.p>
        </div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-6">
            <div>
              <label htmlFor="competitionType" className="block text-sm font-medium text-gray-300 mb-2">
                Competition Type
              </label>
              <select
                id="competitionType"
                name="competitionType"
                value={formData.competitionType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="" className="text-gray-400">Select competition type</option>
                {competitionTypes.map((type) => (
                  <option key={type} value={type} className="text-gray-200">
                    {type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="format" className="block text-sm font-medium text-gray-300 mb-2">
                Format
              </label>
              <select
                id="format"
                name="format"
                value={formData.format}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="" className="text-gray-400">Select format</option>
                {formats.map((format) => (
                  <option key={format} value={format} className="text-gray-200">
                    {format.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-300 mb-2">
                Level
              </label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="" className="text-gray-400">Select level</option>
                {levels.map((level) => (
                  <option key={level} value={level} className="text-gray-200">
                    {level.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between pt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.back()}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            >
              Back
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Continue to Diet Preferences'}
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
}