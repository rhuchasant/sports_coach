import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PreviousAchievements({ userId }) {
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    date: '',
    category: '',
    description: ''
  });

  useEffect(() => {
    if (userId) {
      // Fetch existing achievements for the user
      fetch(`/api/achievements/${userId}`)
        .then(res => res.json())
        .then(data => setAchievements(data))
        .catch(err => console.error('Error fetching achievements:', err));
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/achievements/${userId}`, {
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
      }
    } catch (error) {
      console.error('Error adding achievement:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Previous Achievements</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={newAchievement.title}
              onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., First Place in Marathon"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={newAchievement.date}
              onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={newAchievement.category}
            onChange={(e) => setNewAchievement({ ...newAchievement, category: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select category</option>
            <option value="competition">Competition</option>
            <option value="personal">Personal Best</option>
            <option value="training">Training Milestone</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={newAchievement.description}
            onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe your achievement"
            rows="3"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Achievement
        </button>
      </form>

      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                <p className="text-sm text-gray-600">Date: {new Date(achievement.date).toLocaleDateString()}</p>
              </div>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {achievement.category}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">{achievement.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 