import {useEffect, useReducer} from 'react';

const formatNumber = (number) => number < 10 ? `0${number}` : number;

const secondsToTime = (seconds) => {
  return {
    totalSeconds: seconds,
    minutes: formatNumber(Math.floor(seconds / 60)),
    seconds: formatNumber(seconds % 60)
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
  'PAUSED': 'PAUSED',
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
        countdown: secondsToTime(state.timerStartedWith),
        state: TimerState.IDLE
      }
    }
    case TimerState.END: {
      return {
        ...state,
        state: action.type
      }
    }
    case 'TICK': {
      return {
        ...state,
        countdown: secondsToTime(action.payload)
      }
    }
    default: {
      throw new Error(`Switch case ${action.type} not handled`);
    }
  }
}

const useTimer = (durationInSeconds) => {
  const [timer, dispatch] = useReducer(timerReducer, {
    state: TimerState.IDLE,
    timerStartedWith: durationInSeconds,
    countdown: secondsToTime(durationInSeconds)
  });

  useEffect(() => {
    if (timer.countdown.totalSeconds === 0 || 
    timer.state === TimerState.IDLE || 
    timer.state === TimerState.PAUSED || 
    timer.state === TimerState.END) {
      dispatch({
        type: TimerState.END
      });
      return;
    }

    setTimeout(function(){
      dispatch({
        type: 'TICK', 
        payload: timer.countdown.totalSeconds - 1
      });
    }, 1000);
  }, [timer.countdown.totalSeconds, timer.state]);

  return {
    totalSeconds: timer.countdown.totalSeconds,
    minutes: timer.countdown.minutes,
    seconds: timer.countdown.seconds,
    timerDispatch: dispatch,
    timer: timer
  }
}

export default useTimer;
