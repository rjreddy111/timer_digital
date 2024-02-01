// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isTimerRunning: false, timeElapsedInseconds: 0, timeLimitInMin: 25}

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => clearInterval(this.intervalId)

  onResetButton = () => {
    this.clearTimeInterval()
    this.setState({
      timeLimitInMin: 25,
      timeElapsedInseconds: 0,
      isTimerRunning: false,
    })
  }

  incrementTimeElapse = () => {
    const {timeElapsedInseconds, timeLimitInMin} = this.state
    const isTimerCompleted = timeElapsedInseconds * 60 === timeLimitInMin
    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInseconds: prevState.timeElapsedInseconds + 1,
      }))
    }
  }

  onstartOrPauseTimer = () => {
    const {isTimerRunning, timeElapsedInseconds, timeLimitInMin} = this.state
    const isTimerCOmpleted = timeElapsedInseconds === timeLimitInMin * 60

    if (isTimerCOmpleted) {
      this.setState({timeElapsedInseconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapse, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerControler = () => {
    const {isTimerRunning} = this.state
    console.log(isTimerRunning)
    const pauseOrPlayImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const pauseOrPlayAltText = isTimerRunning ? 'pause icon' : 'play icon'
    return (
      <div className="timer-setter-stop-reset">
        <button
          className="butto-style"
          type="button"
          onClick={this.onstartOrPauseTimer}
        >
          <img
            src={pauseOrPlayImageUrl}
            alt={pauseOrPlayAltText}
            className="reset-image"
          />
          <p>{isTimerRunning ? 'Pause' : 'Start'} </p>
        </button>
        <button
          className="butto-style"
          type="button"
          onClick={this.onResetButton}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="reset-image"
          />
          <p>Reset</p>
        </button>
      </div>
    )
  }

  decresaseTimer = () => {
    const {timeLimitInMin} = this.state
    if (timeLimitInMin > 1) {
      this.setState({timeLimitInMin: parseInt(timeLimitInMin - 1)})
    }
  }

  IncreseTimer = () => {
    const {timeLimitInMin} = this.state

    this.setState({timeLimitInMin: timeLimitInMin + 1})
  }

  getElapsedTimeInSeconds = () => {
    const {timeElapsedInseconds, timeLimitInMin} = this.state
    const totalReainingTime = timeLimitInMin * 60 - timeElapsedInseconds
    const minutes = Math.floor(totalReainingTime / 60)
    const seconds = Math.floor(totalReainingTime % 60)
    const strigifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiesSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${strigifiedMinutes}:${stringifiesSeconds}`
  }

  render() {
    const {timeLimitInMin, isTimerRunning, timeElapsedInseconds} = this.state
    const istimerRunningStatus = isTimerRunning ? 'Running' : 'Paused'
    const isDisabled = timeElapsedInseconds > 0
    return (
      <div className="digital-watch-main-container">
        <div>
          <h1>Digital Timer</h1>
        </div>
        <div className="main-watch-display-container">
          <div className="digital-watch-bg-image">
            <div className="timer-bg-container">
              <h1 className="elapsed-time">{this.getElapsedTimeInSeconds()}</h1>
              <p className="timer-state">{istimerRunningStatus}</p>
            </div>
          </div>
          <div>
            {this.renderTimerControler()}
            <div>
              <p>Set Timer limit</p>
              <div className="timer-limiter-setter">
                <button
                  className="add-sub-button"
                  onClick={this.decresaseTimer}
                  disabled={isDisabled}
                  type="button"
                >
                  -
                </button>
                <p className="time-limit">{timeLimitInMin}</p>{' '}
                <button
                  className="add-sub-button"
                  onClick={this.IncreseTimer}
                  disabled={isDisabled}
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
