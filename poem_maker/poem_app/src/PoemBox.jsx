// src/PoemBox.jsx
import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function PoemBox() {
  const [response, setResponse] = useState("");   // Stores the generated poem
  const [error, setError] = useState(null);       // Stores any error messages
  const [currentTime, setCurrentTime] = useState(new Date()); // Tracks when a poem was generated
  
  // Fetch a poem from the Gemini API
  const fetchPoem = async () => {
    try {
      // Initialize the generative AI model with your API key
      const genAI = new GoogleGenerativeAI("Your-gemini-api-key");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Set a creative prompt for generating poems
      const prompt = "Write me a rhyming poem about the beauty of a sunset over the ocean.";
      const result = await model.generateContent(prompt);
      
      // Update response with generated text
      setResponse(result.response.text());
      setError(null); // Clear previous errors
      setCurrentTime(new Date()); // Update generation time
    } catch (err) {
      // Handle and display any errors
      setError("Error fetching poem: " + err.message);
    }
  };

  // useEffect to trigger poem fetch on initial render and every 30 seconds
  useEffect(() => {
    // Fetch an initial poem
    fetchPoem();

    // Set an interval to fetch a new poem every 30 seconds
    const poemIntervalId = setInterval(fetchPoem, 30000);
    return () => clearInterval(poemIntervalId); // Cleanup on unmount
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>AI Poet</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p style={{ whiteSpace: 'pre-wrap' }}>{response}</p>
      )}
      <div style={{ marginTop: '20px', fontStyle: 'italic' }}>
        Generated at: {currentTime.toLocaleTimeString()}
      </div>
    </div>
  );
}
