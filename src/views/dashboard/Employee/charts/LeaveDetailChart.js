import { Box, useTheme } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import ApexCharts from 'apexcharts';

const LeaveDetailChart = () => {
    const chartRef = useRef(null);
    const theme = useTheme();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const options = {
                series: [15, 10, 5, 10, 60],
                chart: {
                    height: 255,
                    type: 'donut',
                    toolbar: {
                        show: false,
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '50%'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                colors: ['#F26522', '#FFC107', '#E70D0D', '#03C95A', '#0C4B5E'],
                legend: {
                    show: false
                },
                // responsive: [{
                //     breakpoint: 480,
                //     options: {
                //         chart: {
                //             width: 200
                //         },
                //         legend: {
                //             show: false
                //         }
                //     }
                // }],
                // tooltip: {
                //     theme: theme.palette.mode, // Automatically applies 'light' or 'dark'
                //     style: {
                //         color: tooltipTextColor, // Tooltip text color
                //     },
                //     background: tooltipBgColor, // Tooltip background color
                // },
                labels: ['Leave Detail'],
            };

            if (chartRef.current) {
                const chart = new ApexCharts(chartRef.current, options);
                chart.render();

                return () => {
                    chart.destroy();
                };
            }
        }
    }, [theme.palette.mode]);

    return <Box ref={chartRef} id="leaves_chart"></Box>
}

export default LeaveDetailChart
