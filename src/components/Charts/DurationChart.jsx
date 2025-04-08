import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';

// Убрали Legend из регистрируемых компонентов
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const DurationChart = ({ durationData }) => {
    // Генерируем цвета для тёмной темы
    const generateColors = (count) => {
        const darkThemeColors = [
            'hsl(210, 70%, 60%)', // синий
            'hsl(150, 70%, 60%)', // зелёный
            'hsl(30, 70%, 60%)',  // оранжевый
            'hsl(300, 70%, 60%)', // фиолетовый
            'hsl(90, 70%, 60%)',  // салатовый
            'hsl(0, 70%, 60%)',   // красный
            'hsl(270, 70%, 60%)', // пурпурный
            'hsl(180, 70%, 60%)'  // голубой
        ];

        const colors = [];
        for (let i = 0; i < count; i++) {
            colors.push(darkThemeColors[i % darkThemeColors.length]);
        }
        return colors;
    };

    // Создаем модифицированные данные с разными цветами для каждого столбца
    const modifiedData = {
        ...durationData,
        datasets: durationData.datasets.map(dataset => {
            const colors = generateColors(dataset.data.length);
            return {
                ...dataset,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace('60%)', '40%)')), // Темнее для границы
                borderWidth: 1
            };
        })
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false // Полностью отключаем легенду
            },
            title: {
                display: true,
                text: 'Длительность наблюдений по станциям',
                font: {
                    size: 16,
                    weight: 'bold',
                    family: '"JetBrains Mono", monospace'
                },
                color: 'hsl(0, 0%, 90%)'
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
                        return `${context.label}: ${context.raw} минут`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Длительность (минуты)',
                    font: {
                        weight: 'bold',
                        family: '"JetBrains Mono", monospace'
                    },
                    color: 'hsl(0, 0%, 90%)'
                },
                grid: {
                    color: 'hsl(0, 0%, 30%)'
                },
                ticks: {
                    color: 'hsl(0, 0%, 80%)',
                    font: {
                        family: '"JetBrains Mono", monospace'
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        weight: 'bold',
                        family: '"JetBrains Mono", monospace'
                    },
                    color: 'hsl(0, 0%, 80%)'
                }
            }
        },
        elements: {
            bar: {
                borderRadius: 4
            }
        },
        backgroundColor: 'hsl(197, 8%, 18%)'
    };

    return (
        <div style={{
            width: '100%',
            height: '400px',
            backgroundColor: 'hsl(197, 8%, 18%)',
            fontFamily: '"JetBrains Mono", monospace'
        }}>
            <Bar
                options={options}
                data={modifiedData}
                style={{
                    display: 'block',
                    height: '100%',
                    width: '100%',
                    fontFamily: '"JetBrains Mono", monospace'
                }}
            />
        </div>
    );
};

export default DurationChart;