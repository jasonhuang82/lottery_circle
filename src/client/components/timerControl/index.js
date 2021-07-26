// node module
import { useState, useEffect, useCallback, useMemo } from "react";
import noop from "lodash/noop";
import moment from "moment";
// local
import Timer from 'components/timer';

// when input doesn't give any value
const DEFAULT_TIMER = 0;
const FIRST_RESET_COUNT = 0;
const RESET_STEP_VALUE = 1;

const TimerControl = ({ onTimeout = noop, onTimeReset = noop}) => {
  const [timerStarting, setTimerStarting] = useState(false);
  const [timerReset, setTimerReset] = useState(0);
  const [duration, setDuration] = useState("");

  const handleKeyDown = useCallback(e => {
    if (e.code === "KeyE") {
      e.preventDefault();
    }
  }, []);

  const handleChange = useCallback(e => {
    const regex = /^[0-9]*$/;
    const value = e.target.value;
    if(regex.test(value)) {
      setDuration(value);
      return;
    }
  }, []);

  const handleSettingTimer = useCallback((e) => {
    if (!timerStarting) {
      setTimerStarting(true);
    }
  }, [timerStarting])


  const handleResetTimer = useCallback((e) => {
    setTimerStarting(false);
    setTimerReset(prevState => prevState += RESET_STEP_VALUE);
    onTimeReset();
  }, [timerReset, onTimeReset])

  const handleTimeout = useCallback(() => {
    handleResetTimer();
    onTimeout();
  }, [handleResetTimer, onTimeout]);

  const defaultDuration = useMemo(() => {
    if (timerStarting || timerReset > FIRST_RESET_COUNT) {
      return duration;
    }

    if (timerReset <= FIRST_RESET_COUNT) {
      return DEFAULT_TIMER;
    }

    return DEFAULT_TIMER;
  }, [timerStarting, timerReset]);

  return (
    <div>
      <div className="timerControlInputGroup">
        <input
          type="text"
          maxLength="4"
          min="0"
          value={duration}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
        <span>分鐘</span>  
        {
          timerStarting
          ? <button onClick={handleResetTimer}>重設</button>
          : <button onClick={handleSettingTimer}>設定</button>
        }
        
      </div>
      <Timer
        defaultDuration={defaultDuration}
        onTimeout={handleTimeout}
        unit="minutes"
        starting={timerStarting}
        reset={timerReset}
      />
      <style jsx>{`
        .timerControlInputGroup {
          input {

          }

          button {

          }
        }
      `}</style>
    </div>
  )
}

export default TimerControl;
