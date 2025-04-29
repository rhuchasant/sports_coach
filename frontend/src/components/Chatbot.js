import { useState } from 'react';

export default function Chatbot() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse('Error fetching response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 max-w-md mx-auto mt-12">
      <h2 className="text-xl font-bold text-white mb-4">Ask the AI Chatbot</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question about sports or fitness..."
        className="w-full p-2 mb-4 border rounded bg-gray-900 text-white"
      />
      <button
        onClick={handleAskQuestion}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Ask'}
      </button>
      {response && (
        <div className="mt-4 p-3 bg-gray-900 text-white rounded">
          <strong>Response:</strong> {response}
        </div>
      )}
    </div>
  );
}