import React,{useEffect, useState} from 'react';
import Chart from "react-google-charts";

const GoogleChart = () => {
    const [data, setData] = useState([10, 300, 20, 3]);
    useEffect(() => {
        setTimeout(() => {
            setData([20, 700, 220, 100])
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
                ['한국', parseInt(data[0]), '#b87333', null],
                ['중국', parseInt(data[1]), 'silver', null],
                ['일본', parseInt(data[2]), 'gold', null],
                ['미국', parseInt(data[3]), 'color: #e5e4e2', null],
            ]}
            options={{
                title: '타이틀',
                width: 800,
                height: 500,
                bar: { groupWidth: '95%' },
                legend: { position: 'none' },
                hAxis: { title: '확진자수', minValue: 0, maxValue: 2020 },
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