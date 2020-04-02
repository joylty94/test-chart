import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {randomColor} from 'randomcolor';

const ChartBar = styled.div`
    width: ${props => props.size};
    height: 30px;
    background-color: ${props => props.color};
    transition: all 300ms ease-in;
    display: inline-block;
    vertical-align: middle;
`;


const TestChart = () => {
    const color = ['red', 'blue', 'green', 'black']
    const [data, setData] = useState(['10px', '5px', '3px', '2px']);
    // const []
    useEffect(() => {
        setTimeout(() => {
            setData(['50px', '10px', '12px', '8px'])
            setTimeout(() => {
                setData(['80px', '21px', '92px', '26px'])
                setTimeout(() => {
                    setData(['130px', '23px', '111px', '31px'])
                },500)
            },500)
        }, 500)
    }, [])
    
    console.log()
    return(
        <div style={{width: 500, height: 400, backgroundColor:'skyblue'}}>
            { data.length >= 1 && data.map((p, i) => {
                console.log(randomColor())
                return(
                    <div key={i} style={{marginBottom:'10px'}}>
                        <ChartBar size={data[i]} color={randomColor()}></ChartBar>
                        <span style={{verticalAlign:'middle'}}>{data[i].split('p')[0]}명</span>
                    </div>
                )
            })}
        </div>
    )
}

export default TestChart;