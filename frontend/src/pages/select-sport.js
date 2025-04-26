// Continuing from pages/select-sport.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

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
        setError(data.message || 'Failed to set sport preference');
      }
    } catch (err) {
      console.error('Error setting sport:', err);
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Select Sport - Sports Fitness Coach AI</title>
      </Head>
      
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Select Your Sport</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="sport" className="block text-sm font-medium text-gray-700">Sport</label>
            <select
              id="sport"
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a sport</option>
              {sports.map((sport) => (
                <option key={sport} value={sport}>
                  {sport.charAt(0).toUpperCase() + sport.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700">Your Experience Level</label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="professional">Professional</option>
            </select>
          </div>
          
          <div className="pt-2 flex justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Back
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? 'Processing...' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}