import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import RestaurantList from './components/restaurant/RestaurantList';
import RestaurantDetail from './components/restaurant/RestaurantDetail';

const App = () => {
  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column bg-light">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<RestaurantList />} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
