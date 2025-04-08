export const processTimeData = (data) => {
    const hours = Array(24).fill(0);

    data.forEach(obs => {
        const hour = new Date(obs.start).getHours();
        hours[hour]++;
    });

    return {
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        datasets: [{
            label: 'Наблюдения по часам',
            data: hours,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };
};

export const processFrequencyData = (data) => {
    const freqBins = {
        '137-138 MHz': 0,
        '400-402 MHz': 0,
        '435-438 MHz': 0,
        'Другие': 0
    };

    data.forEach(obs => {
        const freq = obs.observation_frequency / 1e6;
        if (freq >= 137 && freq <= 138) freqBins['137-138 MHz']++;
        else if (freq >= 400 && freq <= 402) freqBins['400-402 MHz']++;
        else if (freq >= 435 && freq <= 438) freqBins['435-438 MHz']++;
        else freqBins['Другие']++;
    });

    return {
        labels: Object.keys(freqBins),
        datasets: [{
            data: Object.values(freqBins),
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    };
};

export const processDurationData = (data) => {
    const durations = data.map(obs => {
        const start = new Date(obs.start);
        const end = new Date(obs.end);
        return (end - start) / 60000; // продолжительность в минутах
    });

    return {
        labels: data.map(obs => obs.station_name),
        datasets: [{
            label: 'Длительность наблюдения (мин)',
            data: durations,
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    };
};

export const getStationCoordinates = (data) => {
    const stations = {};

    data.forEach(obs => {
        if (!stations[obs.station_name]) {
            stations[obs.station_name] = {
                lat: obs.station_lat,
                lng: obs.station_lng,
                count: 0
            };
        }
        stations[obs.station_name].count++;
    });

    return Object.entries(stations).map(([name, { lat, lng, count }]) => ({
        name,
        lat,
        lng,
        count
    }));
};