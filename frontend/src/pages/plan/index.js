import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Plan() {
  const router = useRouter();

  useEffect(() => {
    // Get the user ID from localStorage
    const userId = localStorage.getItem('userId');
    
    if (userId) {
      // Redirect to the user's plan page
      router.push(`/plan/${userId}`);
    } else {
      // If no user ID is found, redirect to the home page
      router.push('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
      <Head>
        <title>Loading Plan - Sports Fitness Coach</title>
      </Head>
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-300 text-lg">Loading your plan...</p>
      </div>
    </div>
  );
} 