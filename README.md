# It's the Final Countdown React Timer
I needed a countdown timer in my punions client and this is a project showing how to create one.
![Example output](https://raw.githubusercontent.com/iJKTen/react-countdown-timer/master/public/screenshots/App.png)

## What it does
I have a custom hook called Timer.js with which you can start a countdown timer in seconds. I am also able to change the color of the timer, if you have 45 seconds remaining and then a different color when you have 15 seconds remaining. 

It gives you the ability to start, pause, and reset the countdown timer.

TimerAction is used to manage the timer, for example: start, pause, and reset the timer.

TimerState has all the possible states the timer can be in, for example: idle, running, paused, and end.

## To Do
1. Clean up the if condition logic in useEffect
2. 'TICK' is hardcoded as a dispatch action... find a place for it.