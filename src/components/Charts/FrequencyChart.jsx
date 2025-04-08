import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const FrequencyChart = ({ frequencyData }) => {
    // Цвета для тёмной темы
    const darkThemeColors = [
        'hsl(210, 100%, 70%)', // синий
        'hsl(150, 100%, 70%)', // зелёный
        'hsl(30, 100%, 70%)',  // оранжевый
        'hsl(300, 100%, 70%)', // фиолетовый
        'hsl(90, 100%, 70%)',  // салатовый
        'hsl(0, 100%, 70%)',   // красный
        'hsl(270, 100%, 70%)', // пурпурный
        'hsl(180, 100%, 70%)'  // голубой
    ];

    // Проверяем и фильтруем данные
    const getFilteredData = () => {
        if (!frequencyData || !frequencyData.labels || !frequencyData.datasets || !frequencyData.datasets[0]) {
            return null;
        }

        const nonZeroIndices = frequencyData.datasets[0].data
            .map((value, index) => value > 0 ? index : null)
            .filter(index => index !== null);

        if (nonZeroIndices.length === 0) {
            return null;
        }

        return {
            labels: nonZeroIndices.map(index => frequencyData.labels[index]),
            datasets: [{
                data: nonZeroIndices.map(index => frequencyData.datasets[0].data[index]),
                backgroundColor: nonZeroIndices.map((index, i) =>
                    frequencyData.datasets[0].backgroundColor?.[index] ||
                    darkThemeColors[i % darkThemeColors.length]
                ),
                borderColor: 'hsl(0, 0%, 20%)',
                borderWidth: 2
            }]
        };
    };

    const filteredData = getFilteredData();

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: !!filteredData,
                labels: {
                    color: 'hsl(0, 0%, 90%)',
                    font: {
                        family: '"JetBrains Mono", monospace'
                    }
                }
            },
            title: {
                display: true,
                text: 'Распределение по частотам наблюдений',
                color: 'hsl(0, 0%, 90%)',
                font: {
                    size: 16,
                    family: '"JetBrains Mono", monospace'
                }
            },
            tooltip: {
                backgroundColor: 'hsl(0, 0%, 20%)',
                titleColor: 'hsl(0, 0%, 90%)',
                bodyColor: 'hsl(0, 0%, 90%)',
                titleFont: {
                    family: '"JetBrains Mono", monospace'
                },
                bodyFont: {
                    family: '"JetBrains Mono", monospace'
                },
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = Math.round((value / total) * 100);
                        return `${label}: ${value} (${percentage}%)`;
                    }
                }
            }
        },
    };

    return (
        <div style={{
            position: 'relative',
            height: '500px',
            width: '100%',
            backgroundColor: 'hsl(197, 8%, 18%)',
            borderRadius: '8px',
            padding: '16px',
            boxSizing: 'border-box',
            fontFamily: '"JetBrains Mono", monospace'
        }}>
            {filteredData ? (
                <Pie
                    options={options}
                    data={filteredData}
                    key={JSON.stringify(filteredData)}
                />
            ) : (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    color: 'hsl(0, 0%, 60%)',
                    fontFamily: '"JetBrains Mono", monospace'
                }}>
                    Нет данных для отображения
                </div>
            )}
        </div>
    );
};

export default FrequencyChart;