import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import { Box } from '@mui/material';
import { getChartColorsArray } from './commonChartColor/chartUtils';

const TotalApplicationChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const chartColors = getChartColorsArray("totalApplication");

            if (chartColors && chartColors.length > 0) {
                const options = {
                    series: [60],
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
                    labels: ['Total Application'],
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

    return <Box ref={chartRef} id="totalApplication" data-chart-colors='["#b36df7"]' sx={{ width: '100%', height: '100%' }}></Box>;
};

export default TotalApplicationChart;
