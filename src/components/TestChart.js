import React, {useState, useEffect, useCallback, useMemo} from 'react';
import styled from 'styled-components';
import {randomColor} from 'randomcolor';

const ChartWrap = styled.div`
    background-color:skyblue;
    padding: 20px 0 10px;
    opacity: 0;
    transition: opacity 2s;

    &.on{
        opacity: 1;
    }
`

const ChartBar = styled.div`
    width: ${props => props.size};
    height: 30px;
    background-color: ${props => props.color};
    transition: all 300ms ease-in;
    display: inline-block;
    vertical-align: middle;
`;


const TestChart = () => {
    //const color = ['red', 'blue', 'green', 'black']
    const [data, setData] = useState(['10px', '5px', '3px', '2px']);
    const [mount, setMount] = useState(false);
    // const []

    useEffect(()=>{
        setMount(true)
    },[])

    // function* numberGen() {
    //     yield 1;
    //     yield 2;
    //     yield 3;
    // }

    useEffect(() => {
        setTimeout(() => {
            setData(['50px', '10px', '12px', '8px'])
            setTimeout(() => {
                setData(['80px', '21px', '92px', '26px'])
                setTimeout(() => {
                    setData(['130px', '23px', '111px', '31px'])
                },500)
            },500)
        }, 1000)
    }, [mount])
    
    // const useColor = useMemo(() =>{
    //     const color = randomColor();
    //     return color
    // }, [color])
    // console.log()
    return(
        <ChartWrap className={mount && 'on'}>
            { data.length >= 1 && data.map((p, i) => {
                return(
                    <div key={i} style={{marginBottom:'10px'}}>
                        <ChartBar size={data[i]} color={randomColor()}></ChartBar>
                        <span style={{verticalAlign:'middle'}}>{data[i].split('p')[0]}명</span>
                    </div>
                )
            })}
        </ChartWrap>
    )
}

export default TestChart;