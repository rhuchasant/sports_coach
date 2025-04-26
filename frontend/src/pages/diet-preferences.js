// pages/diet-preferences.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function DietPreferences() {
  const router = useRouter();
  const [dietTypes, setDietTypes] = useState([]);
  const [dietType, setDietType] = useState('');
  const [restrictions, setRestrictions] = useState([]);
  const [newRestriction, setNewRestriction] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user ID exists
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/register');
      return;
    }

    // Fetch diet types from API
    const fetchDietTypes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/diet_types');
        const data = await response.json();
        setDietTypes(data.dietTypes);
      } catch (err) {
        console.error('Error fetching diet types:', err);
        // Fallback values
        setDietTypes(['vegetarian', 'vegan', 'keto', 'paleo', 'balanced', 'high_protein', 'no_restrictions']);
      }
    };

    fetchDietTypes();
  }, []);

  const addRestriction = (e) => {
    e.preventDefault();
    if (!newRestriction.trim()) return;
    
    setRestrictions([...restrictions, newRestriction.trim()]);
    setNewRestriction('');
  };

  const removeRestriction = (index) => {
    const newRestrictions = [...restrictions];
    newRestrictions.splice(index, 1);
    setRestrictions(newRestrictions);
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
      const response = await fetch('http://localhost:5000/api/diet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          dietType,
          restrictions
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Navigate to the final plan page
        router.push('/fitness-plan');
      } else {
        setError(data.message || 'Failed to set diet preferences');
      }
    } catch (err) {
      console.error('Error setting diet preferences:', err);
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Diet Preferences - Sports Fitness Coach AI</title>
      </Head>
      
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Diet Preferences</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="dietType" className="block text-sm font-medium text-gray-700">Diet Type</label>
            <select
              id="dietType"
              value={dietType}
              onChange={(e) => setDietType(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select diet type</option>
              {dietTypes.map((type) => (
                <option key={type} value={type}>
                  {type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</label>
            
            <div className="flex">
              <input
                 type="text"
                 value={newRestriction}
                 onChange={(e) => setNewRestriction(e.target.value)}
                 placeholder="e.g., gluten-free, dairy-free"
                 className="flex-grow border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
               />
               <button
                 type="button"
                 onClick={addRestriction}
                 className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md focus:outline-none focus:shadow-outline"
               >
                 Add
               </button>
             </div>
             
             {restrictions.length > 0 && (
               <div className="mt-2">
                 <ul className="bg-gray-50 rounded-md p-2">
                   {restrictions.map((restriction, index) => (
                     <li key={index} className="flex justify-between items-center py-1">
                       <span>{restriction}</span>
                       <button
                         type="button"
                         onClick={() => removeRestriction(index)}
                         className="text-red-600 hover:text-red-800"
                       >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                         </svg>
                       </button>
                     </li>
                   ))}
                 </ul>
               </div>
             )}
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
               {loading ? 'Processing...' : 'Generate Plan'}
             </button>
           </div>
         </form>
       </div>
     </div>
   );
 }