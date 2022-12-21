import './App.css';

// React Imports
import React from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Custom Components
import Home from './components/home/Home';
import Layout from './components/layout/Layout';
import NotFound from './components/404/NotFound';
import AllPortfolios from './components/portfolios/AllPortfolios';

function App() {
  return (
    <ProSidebarProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Layout /> }>
            <Route index element={ <Home /> } />
            <Route path="portfolios" element={ <AllPortfolios userId={1} /> } />
            <Route path="*" element={ <NotFound /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProSidebarProvider>
  );
}

export default App;
