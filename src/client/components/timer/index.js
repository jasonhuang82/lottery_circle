import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import moment from "moment";
import noop from "lodash/noop";
// local module
import fillText from "utils/fillText";

const Timer = ({
  defaultDuration = 0,
  unit = "minutes",
  starting = false,
  reset,
  onTimeout = noop,
}) => {
  const timerId = useRef(null);
  
  const [duration, setDuration] = useState(0);

  const setTimer = useCallback(() => {
    if (!moment.duration(duration).isValid()) {
      console.log("timer duration format incorrect.")
      return;
    }
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    timerId.current = setTimeout(() => {
      const nextDuration = moment.duration(duration).subtract(1, "seconds").toISOString();
      const nextMoment = moment.duration(nextDuration);
      const hours = nextMoment.hours();
      const minutes = nextMoment.minutes();
      const seconds = nextMoment.seconds();
      const isTimeout = (
        hours <= 0 &&
        minutes <= 0 &&
        seconds < 0
      );
      if (isTimeout) {
        console.log("stop timeout");
        if (timerId.current) {
          clearTimeout(timerId.current);
        }
        onTimeout();
        return;
      }
      setDuration(nextDuration);
    }, 1000);
  }, [timerId, duration, onTimeout])

  const resetDuration = useCallback(() => {
    if (!defaultDuration) {
      return 0;
    }
    return moment.duration(defaultDuration, unit).toISOString();
  }, [defaultDuration, unit])

  useEffect(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
      const defaultState = resetDuration();
      setDuration(defaultState);
    }
  }, [reset, timerId, resetDuration]);

  useEffect(() => {
    if (defaultDuration) {
      const defaultState = resetDuration();
      setDuration(defaultState);
    }
  }, [defaultDuration, resetDuration]);

  useEffect(() => {
    if (starting) {
      setTimer();
    }
  }, [starting, setTimer]);

  const displayTimer = useMemo(() => {
    const durationMoment = moment.duration(duration);
    const hours = fillText(`${durationMoment.hours()}`, 2, "0");
    const minutes = fillText(`${durationMoment.minutes()}`, 2, "0");
    const seconds = fillText(`${durationMoment.seconds()}`, 2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }, [duration]);

  return (
    <div className="timer">
      <span>{displayTimer}</span>
      
    </div>
  );
};

export default Timer;
