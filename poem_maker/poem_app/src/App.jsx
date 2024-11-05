// src/App.jsx
import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import PoemBox from './PoemBox';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>

      {/* Add PoemBox below the existing content */}
      <PoemBox />
    </>
  );
}

export default App;
