import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

const UserProfileSetup = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    // Step 1: Basic Profile
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    fitnessLevel: 'beginner',
    
    // Step 2: Sport Selection
    sport: '',
    sportLevel: 'beginner',
    
    // Step 3: Diet Preferences
    dietType: 'balanced',
    restrictions: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          age: parseInt(formData.age),
          gender: formData.gender,
          height: parseInt(formData.height),
          weight: parseInt(formData.weight),
          fitnessLevel: formData.fitnessLevel
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserId(data.userId);
        setStep(2);
      } else {
        alert('Failed to create profile. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleSubmitSport = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/sport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          sport: formData.sport,
          level: formData.sportLevel
        })
      });
      
      if (response.ok) {
        setStep(3);
      } else {
        alert('Failed to set sport. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleSubmitDiet = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/diet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          dietType: formData.dietType,
          restrictions: formData.restrictions
        })
      });
      
      if (response.ok) {
        // Redirect to plan page
        router.push(`/plan/${userId}`);
      } else {
        alert('Failed to set diet preferences. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const stepVariants = {
    enter: { opacity: 0, y: 20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white
                ${step >= s ? 'bg-blue-500' : 'bg-gray-300'}`}>
                {s}
              </div>
              <span className="mt-2 text-sm font-medium text-gray-600">
                {s === 1 ? 'Profile' : s === 2 ? 'Sport' : 'Diet'}
              </span>
            </div>
          ))}
        </div>
        <div className="relative">
          <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
          <div className="absolute top-0 left-0 h-1 bg-blue-500 transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          {step === 1 && (
            <form onSubmit={handleSubmitProfile} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Tell us about yourself</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your height"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your weight"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fitness Level</label>
                  <select
                    name="fitnessLevel"
                    value={formData.fitnessLevel}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="elite">Elite</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
              >
                Next: Select Sport
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmitSport} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Choose your sport</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sport</label>
                  <select
                    name="sport"
                    value={formData.sport}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Sport</option>
                    <option value="running">Running</option>
                    <option value="swimming">Swimming</option>
                    <option value="cricket">Cricket</option>
                    <option value="football">Football</option>
                    <option value="tennis">Tennis</option>
                    <option value="basketball">Basketball</option>
                    <option value="weightlifting">Weightlifting</option>
                    <option value="gymnastics">Gymnastics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sport Level</label>
                  <select
                    name="sportLevel"
                    value={formData.sportLevel}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="elite">Elite</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
              >
                Next: Diet Preferences
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmitDiet} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Set your diet preferences</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Diet Type</label>
                <select
                  name="dietType"
                  value={formData.dietType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="balanced">Balanced</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="keto">Keto</option>
                  <option value="paleo">Paleo</option>
                  <option value="high_protein">High Protein</option>
                  <option value="no_restrictions">No Restrictions</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
              >
                Generate My Plan
              </button>
            </form>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default UserProfileSetup; 