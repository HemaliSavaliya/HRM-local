import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import { Box } from '@mui/material';
import { getChartColorsArray } from './commonChartColor/chartUtils';

const EmployeeChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Ensure this code runs only on the client-side
        if (typeof window !== 'undefined') {
            const chartColors = getChartColorsArray("totalEmployee");

            if (chartColors && chartColors.length > 0) {
                const options = {
                    series: [10],
                    chart: {
                        height: 110,
                        type: 'radialBar',
                        sparkline: {
                            enabled: true
                        }
                    },
                    plotOptions: {
                        radialBar: {
                            hollow: {
                                margin: 0,
                                size: '50%',
                            },
                            track: {
                                margin: 2,
                            },
                            dataLabels: {
                                show: false
                            }
                        }
                    },
                    grid: {
                        padding: {
                            top: -15,
                            bottom: -15
                        }
                    },
                    stroke: {
                        lineCap: 'round'
                    },
                    labels: ['Total Employee'],
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

    return <Box ref={chartRef} id="totalEmployee" data-chart-colors='["#5694f6"]' sx={{ width: '100%', height: '100%' }}></Box>;
};

export default EmployeeChart;
