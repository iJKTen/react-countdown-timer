import React from 'react';
import useTimer, {TimerState, TimerAction} from './useTimer';

const Timer = () => {
  const {totalSeconds, minutes, seconds, timerDispatch, timer} = useTimer(60 * 2);
  
  const startPause = (action) => {
    if (timer.state === TimerState.RUNNING) {
      timerDispatch({
        type: TimerAction.PAUSE
      });
    } else {
      timerDispatch({
        type: TimerAction.START
      });
    }
  }

  const styleObj = {
    color: (totalSeconds <= 45) ? 'orange' : 'black'
  }

  if (totalSeconds <= 15) {
    styleObj.color = 'red';
  }
  
  return (
    <div>
      <p style={styleObj}>
        <span>{minutes}</span> : <span>{seconds}</span>
      </p>
      <input 
        type='button' 
        onClick={() => startPause(TimerAction.START)} 
        value={timer.state === TimerState.RUNNING ? 'Pause Timer' : 'Start Timer'}
      />
      <input 
        type='button' 
        onClick={() => timerDispatch({
          type: TimerAction.RESET
        })} 
        value='Reset Timer'
      />
    </div>
  )
}

export default Timer;