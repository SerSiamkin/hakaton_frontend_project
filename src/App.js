import React from 'react';
import { processTimeData, processFrequencyData, processDurationData, getStationCoordinates } from './utils/dataProcessing';
import satnogsData from './data/satnogsData';
import TimeChart from './components/Charts/TimeChart';
import FrequencyChart from './components/Charts/FrequencyChart';
import StationMap from './components/Charts/StationMap';
import DurationChart from './components/Charts/DurationChart';
import './styles.css';

function App() {
    const timeData = processTimeData(satnogsData);
    const frequencyData = processFrequencyData(satnogsData);
    const durationData = processDurationData(satnogsData);
    const stations = getStationCoordinates(satnogsData);

    return (
        <div className="app">
            <h1>Визуализация данных </h1>

            <div className="chart-container">
                <div className="chart">
                    <h2>Наблюдения по времени суток</h2>
                    <TimeChart timeData={timeData} />
                </div>

                <div className="chart">
                    <h2>Используемые частоты</h2>
                    <FrequencyChart frequencyData={frequencyData} />
                </div>
            </div>

            <div className="chart-container">
                <div className="chart">
                    <h2>Длительность наблюдений</h2>
                    <DurationChart durationData={durationData} />
                </div>

                <div className="chart">
                    <h2>Расположение станций</h2>
                    <StationMap stations={stations} />
                </div>
            </div>
        </div>
    );
}

export default App;