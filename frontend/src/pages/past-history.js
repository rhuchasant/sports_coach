// pages/past-history.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';

export default function PastHistory() {
  const router = useRouter();
  const [injuries, setInjuries] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [newInjury, setNewInjury] = useState({
    type: '',
    date: '',
    severity: '',
    recoveryTime: '',
    notes: ''
  });
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    date: '',
    category: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/register');
      return;
    }

    // Fetch existing injuries and achievements
    fetch(`http://localhost:5000/api/injuries/${userId}`)
      .then(res => res.json())
      .then(data => {
        setInjuries(data);
        if (data.length > 0) {
          // Fetch injury recommendations
          fetch(`http://localhost:5000/api/injury_recommendations/${userId}`)
            .then(res => res.json())
            .then(recs => setRecommendations(recs))
            .catch(err => console.error('Error fetching recommendations:', err));
        }
      })
      .catch(err => console.error('Error fetching injuries:', err));

    fetch(`http://localhost:5000/api/achievements/${userId}`)
      .then(res => res.json())
      .then(data => setAchievements(data))
      .catch(err => console.error('Error fetching achievements:', err));
  }, []);

  const handleAddInjury = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`http://localhost:5000/api/injuries/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newInjury),
      });

      if (response.ok) {
        const data = await response.json();
        setInjuries([...injuries, data]);
        setNewInjury({
          type: '',
          date: '',
          severity: '',
          recoveryTime: '',
          notes: ''
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add injury');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAchievement = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`http://localhost:5000/api/achievements/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAchievement),
      });

      if (response.ok) {
        const data = await response.json();
        setAchievements([...achievements, data]);
        setNewAchievement({
          title: '',
          date: '',
          category: '',
          description: ''
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add achievement');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePlan = () => {
    router.push('/plan');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Past History - Sports Fitness Coach AI</title>
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
          >
            Your Past History
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-2 text-gray-400"
          >
            Add your injury history and achievements to help us create a better plan for you
          </motion.p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Injury Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Add Injury</h2>
            <form onSubmit={handleAddInjury} className="space-y-4">
              <div>
                <label htmlFor="injuryType" className="block text-sm font-medium text-gray-300">
                  Injury Type
                </label>
                <input
                  type="text"
                  id="injuryType"
                  value={newInjury.type}
                  onChange={(e) => setNewInjury({ ...newInjury, type: e.target.value })}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="injuryDate" className="block text-sm font-medium text-gray-300">
                    Date
                  </label>
                  <input
                    type="date"
                    id="injuryDate"
                    value={newInjury.date}
                    onChange={(e) => setNewInjury({ ...newInjury, date: e.target.value })}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="severity" className="block text-sm font-medium text-gray-300">
                    Severity
                  </label>
                  <select
                    id="severity"
                    value={newInjury.severity}
                    onChange={(e) => setNewInjury({ ...newInjury, severity: e.target.value })}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="recoveryTime" className="block text-sm font-medium text-gray-300">
                  Recovery Time (weeks)
                </label>
                <input
                  type="number"
                  id="recoveryTime"
                  value={newInjury.recoveryTime}
                  onChange={(e) => setNewInjury({ ...newInjury, recoveryTime: e.target.value })}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="injuryNotes" className="block text-sm font-medium text-gray-300">
                  Notes
                </label>
                <textarea
                  id="injuryNotes"
                  value={newInjury.notes}
                  onChange={(e) => setNewInjury({ ...newInjury, notes: e.target.value })}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding...' : 'Add Injury'}
              </motion.button>
            </form>
          </motion.div>

          {/* Achievement Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Add Achievement</h2>
            <form onSubmit={handleAddAchievement} className="space-y-4">
              <div>
                <label htmlFor="achievementTitle" className="block text-sm font-medium text-gray-300">
                  Title
                </label>
                <input
                  type="text"
                  id="achievementTitle"
                  value={newAchievement.title}
                  onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="achievementDate" className="block text-sm font-medium text-gray-300">
                    Date
                  </label>
                  <input
                    type="date"
                    id="achievementDate"
                    value={newAchievement.date}
                    onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-300">
                    Category
                  </label>
                  <select
                    id="category"
                    value={newAchievement.category}
                    onChange={(e) => setNewAchievement({ ...newAchievement, category: e.target.value })}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select</option>
                    <option value="competition">Competition</option>
                    <option value="training">Training</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="achievementDescription" className="block text-sm font-medium text-gray-300">
                  Description
                </label>
                <textarea
                  id="achievementDescription"
                  value={newAchievement.description}
                  onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding...' : 'Add Achievement'}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Display Existing Entries */}
        <div className="mt-12 space-y-8">
          {/* Injuries List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Your Injuries</h2>
            {injuries.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Severity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Recovery Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {injuries.map((injury, index) => (
                      <tr key={index} className="hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{injury.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{injury.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{injury.severity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{injury.recoveryTime} weeks</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{injury.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-400">No injuries recorded yet.</p>
            )}
          </motion.div>

          {/* Achievements List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Your Achievements</h2>
            {achievements.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {achievements.map((achievement, index) => (
                      <tr key={index} className="hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{achievement.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{achievement.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{achievement.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{achievement.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-400">No achievements recorded yet.</p>
            )}
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-12 flex justify-between"
        >
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
            onClick={handleGeneratePlan}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Generate Plan
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}