import React,{useEffect, useState} from 'react';
import Chart from "react-google-charts";

const GoogleChart = () => {
    const [data, setData] = useState(10);
    useEffect(() => {
        setTimeout(() => {
            setData(50)
        }, 1000)
    }, [])
    return(
        <Chart
            width={'800px'}
            height={'500px'}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={[
                [
                    'Element',
                    'Density',
                    { role: 'style' },
                    {
                        sourceColumn: 0,
                        role: 'annotation',
                        type: 'string',
                        calc: 'stringify',
                    },
                ],
                ['Copper', data, '#b87333', null],
                ['Silver', 10.49, 'silver', null],
                ['Gold', 19.3, 'gold', null],
                ['Platinum', 21.45, 'color: #e5e4e2', null],
            ]}
            options={{
                title: '타이틀',
                width: 800,
                height: 500,
                bar: { groupWidth: '95%' },
                legend: { position: 'none' },
                hAxis: { title: '날짜', minValue: 2019, maxValue: 2020 },
                vAxis: { title: '나라', },
                animation: {
                    startup: true,
                    easing: 'linear',
                    duration: 1500,
                },
            }}
            // For tests
            rootProps={{ 'data-testid': '6' }}
        />
    )
}

export default GoogleChart;