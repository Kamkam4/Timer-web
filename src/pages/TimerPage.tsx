import React, { useState, useEffect, useContext, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { TimerContext } from '../context/TimerContext';
import './TimerPage.css';

const TimerPage: React.FC = () => {
  const timerContext = useContext(TimerContext);
  if (!timerContext) throw new Error('TimerPage must be used within a TimerProvider');
  const { timeInSeconds, isRunning, startTimer, pauseTimer, resetTimer } = timerContext;
  
  const [searchParams, setSearchParams] = useSearchParams();

  // State მხოლოდ input ველებისთვის
  const [hours, setHours] = useState<string>('00');
  const [minutes, setMinutes] = useState<string>('00');
  const [seconds, setSeconds] = useState<string>('00');
  
  const inputsRef = useRef(null);
  const displayRef = useRef(null);
  
  useEffect(() => {
    const durationFromUrl = searchParams.get('duration');
    if (durationFromUrl && !isRunning && timeInSeconds === 0) {
      const totalSeconds = Number(durationFromUrl);
      if (totalSeconds > 0) {
        startTimer(totalSeconds);
      }
      setSearchParams({});
    }
  }, [searchParams, isRunning, startTimer, setSearchParams, timeInSeconds]);

  useEffect(() => {
    if (!isRunning) {
      const h = Math.floor(timeInSeconds / 3600);
      const m = Math.floor((timeInSeconds % 3600) / 60);
      const s = timeInSeconds % 60;
      setHours(String(h).padStart(2, '0'));
      setMinutes(String(m).padStart(2, '0'));
      setSeconds(String(s).padStart(2, '0'));
    }
  }, [timeInSeconds, isRunning]);

  const handleStartFromInputs = () => {
    const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    if(totalSeconds > 0) {
      startTimer(totalSeconds);
    }
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    // თუ მომხმარებელი რამეს ცვლის, გლობალური ტაიმერი უნდა დარესეტდეს
    if(isRunning || timeInSeconds > 0) {
        resetTimer();
    }
    setter(value);
  }
  
  return (
    <div className="timer-container">
      <h1 className="timer-title">ტაიმერი</h1>
      <div className="animation-wrapper">
        <CSSTransition
          in={!isRunning}
          timeout={300}
          classNames="fade"
          unmountOnExit
          nodeRef={inputsRef}
        >
          <div className="time-inputs-wrapper" ref={inputsRef}>
              <div className="time-inputs">
                  <input type="text" inputMode="numeric" value={hours} onChange={(e) => handleInputChange(setHours, e.target.value.replace(/[^0-9]/g, '').slice(0, 2))} />
                  <span>:</span>
                  <input type="text" inputMode="numeric" value={minutes} onChange={(e) => handleInputChange(setMinutes, e.target.value.replace(/[^0-9]/g, '').slice(0, 2))} />
                  <span>:</span>
                  <input type="text" inputMode="numeric" value={seconds} onChange={(e) => handleInputChange(setSeconds, e.target.value.replace(/[^0-9]/g, '').slice(0, 2))} />
              </div>
          </div>
        </CSSTransition>
        <CSSTransition
          in={isRunning}
          timeout={300}
          classNames="fade"
          unmountOnExit
          nodeRef={displayRef}
        >
          <div className="time-display-wrapper" ref={displayRef}>
              <div className="time-display">
                  <div className="time-box"><span>{String(Math.floor(timeInSeconds / 3600)).padStart(2, '0')}</span><label>საათი</label></div>
                  <div className="time-box"><span>{String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, '0')}</span><label>წუთი</label></div>
                  <div className="time-box"><span>{String(timeInSeconds % 60).padStart(2, '0')}</span><label>წამი</label></div>
              </div>
          </div>
        </CSSTransition>
      </div>
       <div className="controls">
        <button onClick={isRunning ? pauseTimer : handleStartFromInputs} className="start-btn">
          {isRunning ? 'პაუზა' : 'დაწყება'}
        </button>
        <button onClick={resetTimer} className="reset-btn">გამორთვა</button>
      </div>
    </div>
  );
};

export default TimerPage;