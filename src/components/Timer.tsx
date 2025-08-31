// ფაილის დასაწყისში დაამატეთ ეს იმპორტი
import { CSSTransition } from 'react-transition-group';
import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';

const Timer: React.FC = () => {
  // ... აქ თქვენი არსებული state-ები და ფუნქციები უცვლელი რჩება ...
  // (hours, setHours, timeInSeconds, handleStartStop, handleReset და ა.შ.)
  const [hours, setHours] = useState<string>('00');
  const [minutes, setMinutes] = useState<string>('00');
  const [seconds, setSeconds] = useState<string>('00');

  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const intervalRef = useRef<number | null>(null);
  const nodeRefInputs = useRef(null); // Ref ანიმაციისთვის
  const nodeRefDisplay = useRef(null); // Ref ანიმაციისთვის

  useEffect(() => {
    if (isRunning && timeInSeconds > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeInSeconds((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeInSeconds <= 0 && isRunning) {
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeInSeconds]);

  const handleStartStop = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      let totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
      if (totalSeconds > 0) {
        setTimeInSeconds(totalSeconds);
        setIsRunning(true);
      }
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeInSeconds(0);
    setHours('00');
    setMinutes('00');
    setSeconds('00');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>, limit: number) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, '');
    let finalValue = numericValue;
    
    if (parseInt(numericValue) > limit) {
      finalValue = String(limit);
    }

    setter(finalValue.slice(0, 2));
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const value = e.target.value;
    if (value === '') {
      setter('00');
    } else {
      setter(value.padStart(2, '0'));
    }
  };


  const formatTime = () => {
    const h = Math.floor(timeInSeconds / 3600);
    const m = Math.floor((timeInSeconds % 3600) / 60);
    const s = timeInSeconds % 60;
    
    return {
      formattedHours: String(h).padStart(2, '0'),
      formattedMinutes: String(m).padStart(2, '0'),
      formattedSeconds: String(s).padStart(2, '0'),
    };
  };

  const { formattedHours, formattedMinutes, formattedSeconds } = formatTime();

  // JSX ნაწილი, სადაც ცვლილებებია
  return (
    <div className="timer-container">
      <h1 className="timer-title">ტაიმერი</h1>
      
      {/* ანიმაციის კონტეინერი */}
      <div className="animation-wrapper">
        {/* CSSTransition Input ველებისთვის */}
        <CSSTransition
          in={!isRunning && timeInSeconds === 0}
          timeout={300}
          classNames="fade"
          unmountOnExit
          nodeRef={nodeRefInputs}
        >
          <div ref={nodeRefInputs} className="time-inputs-wrapper">
            <div className="time-inputs">
              <input 
                type="text" 
                inputMode="numeric"
                value={hours} 
                onChange={(e) => handleInputChange(e, setHours, 99)} 
                onBlur={(e) => handleBlur(e, setHours)}
              />
              <span>:</span>
              <input 
                type="text"
                inputMode="numeric"
                value={minutes} 
                onChange={(e) => handleInputChange(e, setMinutes, 59)} 
                onBlur={(e) => handleBlur(e, setMinutes)}
              />
              <span>:</span>
              <input 
                type="text"
                inputMode="numeric"
                value={seconds} 
                onChange={(e) => handleInputChange(e, setSeconds, 59)} 
                onBlur={(e) => handleBlur(e, setSeconds)}
              />
            </div>
          </div>
        </CSSTransition>

        {/* CSSTransition ტაიმერის ჩვენებისთვის */}
        <CSSTransition
          in={isRunning || timeInSeconds > 0}
          timeout={300}
          classNames="fade"
          unmountOnExit
          nodeRef={nodeRefDisplay}
        >
          <div ref={nodeRefDisplay} className="time-display-wrapper">
            <div className="time-display">
              <div className="time-box">
                <span>{formattedHours}</span>
                <label>საათი</label>
              </div>
              <div className="time-box">
                <span>{formattedMinutes}</span>
                <label>წუთი</label>
              </div>
              <div className="time-box">
                <span>{formattedSeconds}</span>
                <label>წამი</label>
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>

      <div className="controls">
        <button onClick={handleStartStop} className="start-btn" disabled={hours === '00' && minutes === '00' && seconds === '00' && !isRunning}>
          {isRunning ? 'პაუზა' : 'დაწყება'}
        </button>
        <button onClick={handleReset} className="reset-btn">
          გამორთვა
        </button>
      </div>
    </div>
  );
};

export default Timer;