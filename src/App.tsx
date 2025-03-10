import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Stopwatch from './components/Stopwatch';

interface StopwatchType {
    id: number;
}

const App: React.FC = () => {
    const [stopwatches, setStopwatches] = useState<StopwatchType[]>([]);

    const handleAddStopwatch = () => {
        setStopwatches([...stopwatches, { id: Date.now() }]);
    };

    const handleDeleteStopwatch = (idToRemove: number) => {
        const updatedStopwatches = stopwatches.filter(stopwatch => stopwatch.id !== idToRemove);
        setStopwatches(updatedStopwatches);
    };

    return (
        <div className="App" style={{ padding: '20px' }}>
            <h1>React Stopwatches</h1>
            <button className="add-stopwatch-button" onClick={handleAddStopwatch}>Add New Stopwatch</button>
            <div>
                {stopwatches.map((stopwatch) => (
                    <div key={stopwatch.id} style={{ position: 'relative' }}>
                        <Stopwatch id={stopwatch.id} handleDeleteStopwatch={handleDeleteStopwatch} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
