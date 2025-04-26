// pages/competition-details.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

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

    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('User session not found. Please register again.');
      setLoading(false);
      return;
    }

    try {
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

      const data = await response.json();
      
      if (response.ok) {
        // Navigate to the past history page
        router.push('/past-history');
      } else {
        setError(data.message || 'Failed to set competition details');
      }
    } catch (err) {
      console.error('Error setting competition details:', err);
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Competition Details - Sports Fitness Coach AI</title>
      </Head>
      
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Competition Details</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="competitionType" className="block text-sm font-medium text-gray-700">Competition Type</label>
            <select
              id="competitionType"
              name="competitionType"
              value={formData.competitionType}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select competition type</option>
              {competitionTypes.map((type) => (
                <option key={type} value={type}>
                  {type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="format" className="block text-sm font-medium text-gray-700">Format</label>
            <select
              id="format"
              name="format"
              value={formData.format}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select format</option>
              {formats.map((format) => (
                <option key={format} value={format}>
                  {format.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700">Competition Level</label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select level</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
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