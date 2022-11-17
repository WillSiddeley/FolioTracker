import logo from './logo.svg';
import './App.css';
import AllPortfolios from './components/portfolios/AllPortfolios';

function App() {
  return (
    <div className="App">
      <AllPortfolios userId={1}/>
    </div>
  );
}

export default App;
