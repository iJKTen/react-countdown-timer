import {useState, useEffect, useReducer} from 'react';

const formatNumber = (number) => number < 10 ? `0${number}` : number;

const secondsToTime = (timer) => {
  return {
    totalSeconds: timer,
    minutes: formatNumber(Math.floor(timer / 60)),
    seconds: formatNumber(timer % 60)
  };
}

export const TimerAction = Object.freeze({
  'START': 'START',
  'PAUSE': 'PAUSE',
  'RESET': 'RESET'
});

export const TimerState = Object.freeze({
  'IDLE': 'IDLE',
  'RUNNING': 'RUNNING',
  'RESET': 'RESET',
  'END': 'END'
});

const timerReducer = (state, action) => {
  switch(action.type) {
    case TimerState.IDLE: {
      return {
        ...state
      };
    }
    case TimerAction.START: {
      return {
        ...state,
        state: TimerState.RUNNING
      };
    }
    case TimerAction.PAUSE: {
      return {
        ...state,
        state: TimerState.PAUSED
      };
    }
    case TimerAction.RESET: {
      return {
        ...state,
        state: TimerState.IDLE
      }
    }
    case TimerState.END: {
      return {
        ...state,
        state: action.type
      }
    }
    default: {
      throw new Error(`Switch case ${action.type} not handled`);
    }
  }
}

const useTimer = (durationInSeconds) => {
  const [timer, dispatch] = useReducer(timerReducer, {
    state: TimerState.IDLE
  });
  const initialState = secondsToTime(durationInSeconds);
  const [countdown, setCountdown] = useState(initialState);

  useEffect(() => {
    if (countdown.totalSeconds === 0 || 
        timer.state === TimerState.IDLE || 
        timer.state === TimerState.PAUSED) {
      return;
    }
    setTimeout(function(){
      setCountdown((current) => {
        return secondsToTime(current.totalSeconds - 1)
      })
    }, 1000);
  }, [timer, countdown.totalSeconds]);

  return {
    totalSeconds: countdown.totalSeconds,
    minutes: countdown.minutes,
    seconds: countdown.seconds,
    timerDispatch: dispatch,
    timer: timer
  }
}

export default useTimer;
