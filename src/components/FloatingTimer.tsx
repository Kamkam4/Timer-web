import React, { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { TimerContext } from '../context/TimerContext';
import './FloatingTimer.css';
import { FiClock } from 'react-icons/fi';

const FloatingTimer: React.FC = () => {
  const timerContext = useContext(TimerContext);
  const location = useLocation();

  if (!timerContext) {
    return null;
  }

  const { timeInSeconds, isRunning } = timerContext;

  if (!isRunning || location.pathname === '/') {
    return null;
  }

  // --- დროის კორექტული კონვერტაცია ---
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  
  // ვაჩვენებთ საათებს მხოლოდ იმ შემთხვევაში, თუ დრო 1 საათზე მეტია
  const displayTime = hours > 0 
    ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}` 
    : `${formattedMinutes}:${formattedSeconds}`;

  return (
    <Link to="/" className="floating-timer-link">
      <div className="floating-timer">
        <FiClock />
        <span>{displayTime}</span>
      </div>
    </Link>
  );
};

export default FloatingTimer;