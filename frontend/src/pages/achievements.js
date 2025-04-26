import Head from 'next/head';

export default function Achievements() {
  return (
    <>
      <Head>
        <title>Achievements | Your Fitness Journey</title>
        <meta name="description" content="Track your fitness achievements and milestones" />
      </Head>
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Achievements</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Achievement cards will go here */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-2">No achievements yet</h2>
            <p className="text-gray-600">Start your fitness journey to earn achievements!</p>
          </div>
        </div>
      </main>
    </>
  );
}
