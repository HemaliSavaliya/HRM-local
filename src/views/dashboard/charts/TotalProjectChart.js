import { Box } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import ApexCharts from 'apexcharts';
import { getChartColorsArray } from './commonChartColor/chartUtils';

const TotalProjectChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const chartColors = getChartColorsArray("totalProjectChart");

            if (chartColors && chartColors.length > 0) {
                const options = {
                    series: [{
                        name: 'New',
                        data: [44, 55, 41, 67, 22, 43, 14, 55, 41,]
                    }, {
                        name: 'Pending',
                        data: [13, 23, 20, 8, 13, 27, 8, 20, 8,]
                    }, {
                        name: 'Completed',
                        data: [11, 17, 15, 15, 21, 14, 24, 11, 17,]
                    }, {
                        name: 'Rejected',
                        data: [21, 7, 25, 13, 22, 8, 13, 7, 25,]
                    }],
                    chart: {
                        type: 'bar',
                        height: 350,
                        stacked: true,
                        zoom: {
                            enabled: true
                        },
                        toolbar: {
                            show: false,
                        },
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            borderRadius: 10,
                            columnWidth: '25%',
                        },
                    },
                    grid: {
                        padding: {
                            top: -15,
                            bottom: 5,
                            right: 0,
                        }
                    },
                    xaxis: {
                        categories: ['01', '02', '03', '04',
                            '05', '06', '07', '08', '09'
                        ],
                    },
                    dataLabels: {
                        enabled: false
                    },
                    colors: getChartColorsArray("totalProjectChart"),
                    legend: {
                        position: 'bottom',
                    },
                    fill: {
                        opacity: 1
                    },
                    labels: ['Total Projects'],
                    colors: chartColors
                };

                if (chartRef.current) {
                    const chart = new ApexCharts(chartRef.current, options);
                    chart.render();

                    return () => {
                        chart.destroy();
                    };
                }
            } else {
                console.warn("Chart colors are undefined or empty");
            }
        }
    }, []);

    return <Box ref={chartRef} id="totalProjectChart" data-chart-colors='["#3b82f6", "#eab308", "#2dbda3", "#f87171"]' sx={{ width: '100%', height: '100%' }}></Box>
}

export default TotalProjectChart
