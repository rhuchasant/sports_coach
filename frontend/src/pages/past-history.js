// pages/past-history.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function PastHistory() {
  const router = useRouter();
  const [injuries, setInjuries] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [newInjury, setNewInjury] = useState({ type: '', status: '' });
  const [newAchievement, setNewAchievement] = useState({ competition: '', position: '', year: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addInjury = async (e) => {
    e.preventDefault();
    if (!newInjury.type || !newInjury.status) return;

    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('User session not found. Please register again.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/injury', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          injuryType: newInjury.type,
          recoveryStatus: newInjury.status
        }),
      });

      if (response.ok) {
        setInjuries([...injuries, newInjury]);
        setNewInjury({ type: '', status: '' });
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to add injury');
      }
    } catch (err) {
      console.error('Error adding injury:', err);
      setError('Network error. Please try again later.');
    }
  };

  const addAchievement = async (e) => {
    e.preventDefault();
    if (!newAchievement.competition || !newAchievement.position || !newAchievement.year) return;

    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('User session not found. Please register again.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/achievement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          competition: newAchievement.competition,
          position: newAchievement.position,
          year: parseInt(newAchievement.year)
        }),
      });

      if (response.ok) {
        setAchievements([...achievements, newAchievement]);
        setNewAchievement({ competition: '', position: '', year: '' });
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to add achievement');
      }
    } catch (err) {
      console.error('Error adding achievement:', err);
      setError('Network error. Please try again later.');
    }
  };

  const handleContinue = () => {
    router.push('/diet-preferences');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Past History - Sports Fitness Coach AI</title>
      </Head>
      
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-blue-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Past Injuries</h2>
        </div>
        
        <div className="px-6 py-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={addInjury} className="mb-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="injuryType" className="block text-sm font-medium text-gray-700">Injury Type</label>
                <input
                  type="text"
                  id="injuryType"
                  value={newInjury.type}
                  onChange={(e) => setNewInjury({...newInjury, type: e.target.value})}
                  placeholder="e.g., Sprained Ankle"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="recoveryStatus" className="block text-sm font-medium text-gray-700">Recovery Status</label>
                <select
                  id="recoveryStatus"
                  value={newInjury.status}
                  onChange={(e) => setNewInjury({...newInjury, status: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select status</option>
                  <option value="fully_recovered">Fully Recovered</option>
                  <option value="partially_recovered">Partially Recovered</option>
                  <option value="in_recovery">In Recovery</option>
                  <option value="chronic">Chronic</option>
                </select>
              </div>
            </div>
            
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Injury
            </button>
          </form>
          
          {injuries.length > 0 ? (
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Injury Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recovery Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {injuries.map((injury, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{injury.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {injury.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 italic">No past injuries added.</p>
          )}
        </div>
      </div>
      
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-blue-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Past Achievements</h2>
        </div>
        
        <div className="px-6 py-4">
          <form onSubmit={addAchievement} className="mb-4">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="col-span-3 sm:col-span-1">
                <label htmlFor="competition" className="block text-sm font-medium text-gray-700">Competition</label>
                <input
                  type="text"
                  id="competition"
                  value={newAchievement.competition}
                  onChange={(e) => setNewAchievement({...newAchievement, competition: e.target.value})}
                  placeholder="e.g., State Championship"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position/Medal</label>
                <input
                  type="text"
                  id="position"
                  value={newAchievement.position}
                  onChange={(e) => setNewAchievement({...newAchievement, position: e.target.value})}
                  placeholder="e.g., Gold, 1st Place"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="col-span-1">
                <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
                <input
                  type="number"
                  id="year"
                  value={newAchievement.year}
                  onChange={(e) => setNewAchievement({...newAchievement, year: e.target.value})}
                  placeholder="YYYY"
                  min="2000"
                  max="2025"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Achievement
            </button>
          </form>
          
          {achievements.length > 0 ? (
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Competition</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position/Medal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {achievements.map((achievement, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{achievement.competition}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{achievement.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{achievement.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 italic">No achievements added.</p>
          )}
        </div>
      </div>
      
      <div className="max-w-lg mx-auto flex justify-between">
        <button
          onClick={() => router.back()}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Back
        </button>
        
        <button
          onClick={handleContinue}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Continue
        </button>
      </div>
    </div>
  );
}