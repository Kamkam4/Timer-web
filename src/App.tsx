import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { TimerProvider } from './context/TimerContext';
import FloatingTimer from './components/FloatingTimer';
import Footer from './components/Footer';
import './App.css';

const App: React.FC = () => {
  return (
    <TimerProvider>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Outlet />
        </main>
        <FloatingTimer />
        <Footer />
      </div>
    </TimerProvider>
  );
};

export default App;