import React, { useState, useEffect } from 'react';
import './Stopwatch.css'; // Import the CSS file

interface StopwatchProps {
    id: number;
    handleDeleteStopwatch: (id: number) => void;
}

const Stopwatch: React.FC<StopwatchProps> = ({ id, handleDeleteStopwatch }) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else if (!isRunning && time !== 0) {
            clearInterval(interval!);
        }
        return () => clearInterval(interval!);
    }, [isRunning, time]);

    const formatTime = (time: number) => {
        const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
        const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
        const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
        const hours = `0${Math.floor(time / 3600000)}`.slice(-2);
        return `${hours}:${minutes}:${seconds}:${getMilliseconds}`;
    };

    return (
        <div className="stopwatch-container">
            <h1 className="stopwatch-title">Stopwatch</h1>
            <div className="stopwatch-display">
                <h2>{formatTime(time)}</h2>
            </div>
            <div className="stopwatch-buttons">
                <button className="stopwatch-button" onClick={() => setIsRunning(true)}>Start</button>
                <button className="stopwatch-button" onClick={() => setIsRunning(false)}>Pause</button>
                <button className="stopwatch-button" onClick={() => setTime(0)}>Reset</button>
                <button className="stopwatch-button" onClick={() => handleDeleteStopwatch(id)}>Delete</button>
            </div>
        </div>
    );
}

export default Stopwatch;
