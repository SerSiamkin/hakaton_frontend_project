import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TimeChart = ({ timeData }) => {
    const [hiddenItems, setHiddenItems] = React.useState({});

    const darkThemeColors = [
        'hsl(210, 70%, 60%)',
        'hsl(150, 70%, 60%)',
        'hsl(30, 70%, 60%)',
        'hsl(300, 70%, 60%)',
        'hsl(90, 70%, 60%)',
        'hsl(0, 70%, 60%)',
        'hsl(270, 70%, 60%)',
        'hsl(180, 70%, 60%)',
        'hsl(330, 70%, 60%)',
        'hsl(60, 70%, 60%)',
        'hsl(120, 70%, 60%)',
        'hsl(240, 70%, 60%)'
    ];

    const colors = useMemo(() => {
        if (!timeData?.labels) return [];
        return Array.from({ length: timeData.labels.length }, (_, i) =>
            darkThemeColors[i % darkThemeColors.length]
        );
    }, [timeData?.labels?.length]);

    if (!timeData || !timeData.labels || !timeData.datasets || !timeData.datasets[0]) {
        return (
            <div style={{
                height: '500px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'hsl(0, 0%, 60%)',
                fontFamily: '"JetBrains Mono", monospace',
                backgroundColor: 'hsl(0, 0%, 15%)',
                borderRadius: '8px'
            }}>
                Нет данных для отображения
            </div>
        );
    }

    const transformedData = {
        labels: timeData.labels,
        datasets: timeData.labels.map((label, index) => ({
            label: label,
            data: Array(timeData.labels.length).fill(0).map((_, i) =>
                i === index ? timeData.datasets[0].data[index] : 0
            ),
            backgroundColor: colors[index],
            borderColor: 'hsl(0, 0%, 20%)',
            borderWidth: 1,
            hidden: hiddenItems[label] || false
        }))
    };

    const options = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                onClick: (e, legendItem, legend) => {
                    const label = legendItem.text;
                    setHiddenItems(prev => ({
                        ...prev,
                        [label]: !prev[label]
                    }));
                },
                labels: {
                    usePointStyle: true,
                    pointStyle: 'rect',
                    font: {
                        family: '"JetBrains Mono", monospace'
                    },
                    generateLabels: (chart) => {
                        return chart.data.labels.map((label, i) => ({
                            text: label,
                            fillStyle: colors[i],
                            hidden: hiddenItems[label] || false,
                            fontColor: hiddenItems[label] ? 'hsl(0, 0%, 40%)' : 'hsl(0, 0%, 80%)',
                            textDecoration: hiddenItems[label] ? 'line-through' : 'none',
                            strokeStyle: hiddenItems[label] ? 'hsl(0, 0%, 40%)' : 'transparent',
                            lineWidth: hiddenItems[label] ? 1 : 0
                        }));
                    }
                }
            },
            title: {
                display: true,
                text: 'Распределение наблюдений по времени суток',
                font: {
                    family: '"JetBrains Mono", monospace',
                    size: 16
                },
                color: 'hsl(0, 0%, 90%)'
            },
            tooltip: {
                backgroundColor: 'hsl(0, 0%, 25%)',
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
                        if (hiddenItems[context.label]) return null;
                        return `${context.label}: ${context.raw} наблюдений`;
                    }
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Количество наблюдений',
                    color: 'hsl(0, 0%, 80%)',
                    font: {
                        family: '"JetBrains Mono", monospace'
                    }
                },
                grid: {
                    color: 'hsl(0, 0%, 25%)'
                },
                ticks: {
                    color: 'hsl(0, 0%, 70%)',
                    font: {
                        family: '"JetBrains Mono", monospace'
                    }
                }
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Часы дня',
                    color: 'hsl(0, 0%, 80%)',
                    font: {
                        family: '"JetBrains Mono", monospace'
                    }
                },
                grid: {
                    color: 'hsl(0, 0%, 25%)'
                },
                ticks: {
                    color: 'hsl(0, 0%, 70%)',
                    font: {
                        family: '"JetBrains Mono", monospace'
                    },
                    autoSkip: false,
                    callback: (value, index) => {
                        return hiddenItems[transformedData.labels[index]] ?
                            `~~${transformedData.labels[index]}~~` :
                            transformedData.labels[index];
                    }
                }
            }
        },
        onHover: (e, elements) => {
            if (e.native?.target) {
                e.native.target.style.cursor = elements?.length > 0 ? 'pointer' : 'default';
            }
        }
    };

    transformedData.datasets.forEach(dataset => {
        dataset.hidden = hiddenItems[dataset.label] || false;
    });

    return (
        <div style={{
            height: '500px',
            width: '100%',
            backgroundColor: 'hsl(197, 8%, 18%)',
            borderRadius: '8px',
            padding: '16px',
            boxSizing: 'border-box',
            fontFamily: '"JetBrains Mono", monospace'
        }}>
            <Bar
                options={options}
                data={transformedData}
                key={JSON.stringify(hiddenItems)}
            />
        </div>
    );
};

export default TimeChart;