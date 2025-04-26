import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function InjuryHistory({ userId }) {
  const [injuries, setInjuries] = useState([]);
  const [newInjury, setNewInjury] = useState({
    type: '',
    date: '',
    severity: '',
    recoveryTime: '',
    notes: ''
  });

  useEffect(() => {
    if (userId) {
      // Fetch existing injuries for the user
      fetch(`/api/injuries/${userId}`)
        .then(res => res.json())
        .then(data => setInjuries(data))
        .catch(err => console.error('Error fetching injuries:', err));
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/injuries/${userId}`, {
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
      }
    } catch (error) {
      console.error('Error adding injury:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Injury History</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Injury Type</label>
            <input
              type="text"
              value={newInjury.type}
              onChange={(e) => setNewInjury({ ...newInjury, type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Sprained ankle"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={newInjury.date}
              onChange={(e) => setNewInjury({ ...newInjury, date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
            <select
              value={newInjury.severity}
              onChange={(e) => setNewInjury({ ...newInjury, severity: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select severity</option>
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recovery Time (weeks)</label>
            <input
              type="number"
              value={newInjury.recoveryTime}
              onChange={(e) => setNewInjury({ ...newInjury, recoveryTime: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 4"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            value={newInjury.notes}
            onChange={(e) => setNewInjury({ ...newInjury, notes: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Additional details about the injury"
            rows="3"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Injury
        </button>
      </form>

      <div className="space-y-4">
        {injuries.map((injury, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{injury.type}</h3>
                <p className="text-sm text-gray-600">Date: {new Date(injury.date).toLocaleDateString()}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                injury.severity === 'mild' ? 'bg-green-100 text-green-800' :
                injury.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {injury.severity}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Recovery: {injury.recoveryTime} weeks</p>
            {injury.notes && (
              <p className="text-sm text-gray-600 mt-2">{injury.notes}</p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 