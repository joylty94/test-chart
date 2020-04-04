import React, {useState, useEffect, useCallback, useMemo, useRef, useContext} from 'react';
import styled from 'styled-components';
import {randomColor} from 'randomcolor';
import {Json} from '../json';

const ChartWrap = styled.div`
    height: 100%;
    opacity: 0;
    transition: opacity 2s;

    &.on{
        opacity: 1;
    }
`
const ChartBarWrap = styled.div`
    position:relative;

    &::after{
        content: '';
        clear: both;
        display: block;
    }
`;

const ChartBarContainer = styled.div`
    transition: all 400ms ease-in;
    display: inline-block;
    vertical-align: middle;
    position: absolute;
    top: ${props => props.top};
`;

const ChartBar = styled.div`
    width: ${props => props.size};
    height: 40px;
    background-color: ${props => props.color};
    transition: all 300ms ease-in;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    &:hover{
        transform: scaleY(1.1);
    }
`;

const TestChart = () => {

    const [data, setData] = useState([]);
    const [mount, setMount] = useState(false);
    const [topPosition, setTopPosition] = useState()
    const [date, setdate] = useState()
    const colorSet = useRef(Array(Json[0]['COVID'].length).fill().map((c, i) => randomColor()))
    let interval = useRef();
    const isMountChart = useRef(true);

    useEffect(()=>{
        setMount(true)
    },[])

    const sortChart = (arr) => {
        const newDataArr = [...arr]
        let temp;
        let temp2;
        const rank = newDataArr.map((a, i) => {
            return i + 1;
        });

        for (let i = 0; i < newDataArr.length - 1 ; i++) {
            for (let j = i + 1; j < newDataArr.length ; j++) {
                if (parseInt(newDataArr[i]['COVID']) < parseInt(newDataArr[j]['COVID'])) {
                    
                    temp2 = newDataArr[j];
                    newDataArr[j] = newDataArr[i];
                    newDataArr[i] = temp2;

                    temp = rank[j];
                    rank[j] = rank[i];
                    rank[i] = temp;

                }
            }
        }

        const rankPosition = Array(rank.length).fill()
        rank.map((p, i) => {
            rankPosition[p - 1] = i * 60;
        })

        setTopPosition(rankPosition)
    }

    useEffect(() => {
        if (isMountChart.current) {
            isMountChart.current = false;
        } else {            
            Json.forEach((d, i) => {
                interval.current = setTimeout(() => {
                    setdate(d.date)
                    sortChart(d.COVID)
                    setData(d.COVID)
                }, 600 * i)
            })
        }
        return () => {
            clearTimeout(interval.current)
        }
    }, [mount])

    const onClickReset = useCallback((e) => {
        e.preventDefault();

        clearTimeout(interval.current);
        Json.forEach((d, i) => {
            interval.current = setTimeout(() => {
                setdate(d.date)
                sortChart(d.COVID)
                setData(d.COVID)
            }, 600 * i)
        })
    }, [])
    
    return(
        <ChartWrap className={mount && 'on'}>
            <div style={{ padding: '40px 60px 0' }}>DATE : {date} {<button onClick={onClickReset}>Reset</button>}</div>
            <ul style={{padding: '40px 60px'}}>
                { Json[0]['COVID'].length >= 1 && Json[0]['COVID'].map((s, i) => {
                    return(
                            <li style={{display:'inline-block', paddingRight:'8px'}} key={i}>
                                <div style={{ background: colorSet.current[i], width: '18px', height: '18px', display:'inline-block', verticalAlign:'bottom'}}></div>
                                <span style={{paddingLeft: '4px',}}>{s.state}</span>
                            </li>
                    )
                })}
            </ul>
            <ul style={{ paddingLeft: '60px', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                <span>0</span>
                {Array(15).fill(1).map((n, i) => {
                    return <li style={{ width: '100px', display: 'inline-block', textAlign: 'right', paddingBottom:'8px' }}><span style={{ marginRight: '-15px' }}>{100 * (i+1)}</span></li>
                })}
            </ul>
            <ChartBarWrap>
                { data.length >= 1 && data.map((p, i) => {
                    return(
                        <ChartBarContainer key={i} top={`${topPosition[i]}px`}>
                            <span style={{width:'60px', textAlign:'center', display:'inline-block'}}>{data[i]['state']}</span>
                            <ChartBar size={`${data[i]['COVID']}px`} color={colorSet.current[i]}></ChartBar>
                            <span style={{ width: '60px', verticalAlign:'middle', textAlign: 'center', display: 'inline-block' }}>{data[i]['COVID']}명</span>
                        </ChartBarContainer>
                    )
                })}
            </ChartBarWrap>
        </ChartWrap>
    )
}

export default TestChart;