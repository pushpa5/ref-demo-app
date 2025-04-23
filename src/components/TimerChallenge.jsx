import { useRef, useState } from "react"
import ResultModal from "./ResultModal"

export default function TimerChallenge({ title, targetTime }) {
    const [remainingTime, setRemainingTime] = useState(targetTime * 1000)

    const timer = useRef()
    const dialog = useRef()

    const isTimerActive =  remainingTime > 0 && remainingTime < targetTime * 1000

    if(remainingTime <= 0) {
        clearInterval(timer.current)
        dialog.current.open()
    }

    const handleReset = () => {
        setRemainingTime(targetTime * 1000)
    }

    const handleStart = () => {
        timer.current = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 10)
        }, 10)
    }

    const handleStop = () => {
        dialog.current.open()
        clearInterval(timer.current)
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} remainingTime={remainingTime} onReset={handleReset} />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={isTimerActive ? handleStop : handleStart}>{isTimerActive ? 'stop' : 'start'} challenge</button>
                </p>
                <p>
                    {isTimerActive ? 'timer is running' : 'timer is inactive'}
                </p>
            </section>
        </>
    )
}