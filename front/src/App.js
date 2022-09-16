import React, { useEffect } from 'react';
import './App.css';
import { initWeb3 } from './WebClient';

function App() {
  useEffect(() => {
    initWeb3();
  }, []);

  return (
    <div className="App">
          
    </div>
  );
}

export default App;
