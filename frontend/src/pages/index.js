// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  
  // Redirect to registration page
  useEffect(() => {
    router.push('/register');
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Head>
        <title>Sports Fitness Coach AI</title>
        <meta name="description" content="AI-powered sports fitness coaching system" />
      </Head>
      
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-800">Loading Sports Fitness Coach...</h1>
        <p className="mt-4">Please wait while we set up your fitness journey</p>
      </div>
    </div>
  );
}