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

  const resetTimer = () => {
    timerDispatch({
      type: TimerAction.RESET
    });
  }

  const styleObj = {
    color: (totalSeconds <= 45) ? 'orange' : 'black'
  }

  if (totalSeconds <= 15) {
    styleObj.color = 'red';
  }

  let startButtonTitle = 'Start Timer';
  if (timer.state === TimerState.RUNNING) {
    startButtonTitle = 'Pause Timer'
  }
  
  return (
    <div style={styleObj}>
      <p>
        <span>{minutes}</span> : <span>{seconds}</span>
      </p>
      <input 
        type='button' 
        onClick={(e) => startPause(TimerAction.START)} 
        value={startButtonTitle}
      />
      <input 
        type='button' 
        onClick={(e) => resetTimer()} 
        value='Reset Timer'
      />
    </div>
  )
}

export default Timer;