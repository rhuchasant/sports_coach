import Head from 'next/head';
import UserProfileSetup from '../components/UserProfileSetup';

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Head>
        <title>Setup Your Profile - Sports Fitness Coach</title>
        <meta name="description" content="Set up your profile to get your personalized fitness plan" />
      </Head>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Let's Create Your Profile
          </h1>
          <p className="text-center text-gray-600 mb-12">
            We'll use this information to create a personalized plan just for you
          </p>
          <UserProfileSetup />
        </div>
      </div>
    </div>
  );
} 