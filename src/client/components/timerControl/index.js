// node module
import { useState, useCallback, useMemo } from "react";
import noop from "lodash/noop";
import get from "lodash/get";
import moment from "moment";
// local
import Timer from 'components/timer';
import Input from 'components/input';
import Button from 'components/button';
// constants
import { HOUR, MINUTE, SECOND } from 'constants/durationType';

const TimerControl = ({ onTimeout = noop, onTimeReset = noop, disabled = false }) => {
  const [timerStarting, setTimerStarting] = useState(false);
  const [timerReset, setTimerReset] = useState(0);
  // const [duration, setDuration] = useState(0);
  // duration
  const [hourDuration, setHourDuration] = useState(0);
  const [minuteDuration, setMinuteDuration] = useState(0);
  const [secondDuration, setSecondDuration] = useState(0);

  const handleChange = useCallback(e => {
    const regex = /^[0-9]*$/;
    const value = e.target.value;
    const durationType = get(e, "target.dataset.durationType");
    if(!regex.test(value)) {
      console.warn(`[TimerControl]: input must be number`)
      return;
    }

    const durationNumber = Number(value);
    switch (durationType) {
      case HOUR:
        if (durationNumber >= 24) {
          console.warn(`[TimerControl]: hour must be in 24`)
          return;
        }

        setHourDuration(value);
        break;
      case MINUTE:
        if (durationNumber >= 60) {
          console.warn(`[TimerControl]: hour must be in 60`)
          return;
        }

        setMinuteDuration(value);
        break;
      case SECOND:
        if (durationNumber >= 60) {
          console.warn(`[TimerControl]: hour must be in 60`)
          return;
        }

        setSecondDuration(value);
        break;
    
      default:
        break;
    }
    
  }, []);

  const handleSettingTimer = useCallback((e) => {
    if (!timerStarting) {
      setTimerStarting(true);
    }
  }, [timerStarting])


  const handleResetTimer = useCallback((e) => {
    const RESET_STEP_VALUE = 1;
    setTimerStarting(false);
    setTimerReset(prevState => prevState += RESET_STEP_VALUE);
    onTimeReset();
  }, [timerReset, onTimeReset])

  const handleTimeout = useCallback(() => {
    handleResetTimer();
    onTimeout();
  }, [handleResetTimer, onTimeout]);

  const defaultDuration = useMemo(() => {
    const duration = moment
        .duration(secondDuration, "seconds")
        .add(minuteDuration, "minutes")
        .add(hourDuration, "hours")
        .toISOString()
      return duration;
  }, [timerStarting, timerReset, hourDuration, minuteDuration, secondDuration]);

  return (
    <div className="timerControl">
      <div className="timerControlInputGroup">
        <Input
          type="text"
          maxLength="2"
          min="0"
          value={hourDuration}
          onChange={handleChange}
          data-duration-type={HOUR}
        />
        <span className="timerControlText">:</span>  
        <Input
          type="text"
          maxLength="2"
          min="0"
          value={minuteDuration}
          onChange={handleChange}
          data-duration-type={MINUTE}
        />
        <span className="timerControlText">:</span>  
        <Input
          type="text"
          maxLength="2"
          min="0"
          value={secondDuration}
          onChange={handleChange}
          data-duration-type={SECOND}
        />
        
        {
          timerStarting && !disabled
          ? <Button onClick={handleResetTimer}>重設</Button>
          : <Button onClick={handleSettingTimer} disabled={disabled}>抽獎</Button>
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
        .timerControl {
          .timerControlText {
            margin: 0 5px;
          }
        }
        .timerControlInputGroup {
          :global(input) {
            display: inline-block;
            max-width: 2.8rem;
            text-align: center;
          }

          :global(button) {
            margin-left: 10px;
          }
        }
      `}</style>
    </div>
  )
}

export default TimerControl;
