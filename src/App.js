import './App.css';
import React from 'react';
import AllPortfolios from './components/portfolios/AllPortfolios';

function App() {
  return (
    <div className="App">
      <AllPortfolios userId={1}/>
    </div>
  );
}

export default App;
