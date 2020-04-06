import React, {useState, useEffect, useCallback, useMemo, useRef, useContext} from 'react';
import styled from 'styled-components';
import {randomColor} from 'randomcolor';
import {Json} from '../json/formed';

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
    transition: all 300ms ease-in;
    display: inline-block;
    vertical-align: middle;
    position: absolute;
    top: ${props => props.top};
`;

const ChartBar = styled.div`
    width: ${props => props.size};
    height: 40px;
    background-color: ${props => props.color};
    transition: all 700ms ease-in;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    max-width: 1500px;

    &:hover{
        transform: scaleY(1.1);
    }
`;

const TestChart = () => {

    const [data, setData] = useState([]);
    const [date, setdate] = useState()
    const [mount, setMount] = useState(false);
    const [topPosition, setTopPosition] = useState()
    const [topCOVID, setTopCOVID] = useState()
    const colorSet = useRef(Array(Json[Json.length - 1]['COVID'].length).fill().map((c, i) => randomColor()))
    //const colorSet = useRef(Array(Json[Json.length - 1]['COVID'].length).fill(() => randomColor()))
    let interval = useRef()
    const isMountChart = useRef(true);

    useEffect(()=>{
        setMount(true)
    },[])
    
    useEffect(() => {
        if (isMountChart.current) {
            isMountChart.current = false;
        } else {            
            Json.forEach((d, i) => {
                interval.current = setTimeout(() => {
                    setdate([d.year, d.month, d.day])
                    sortChart(d.COVID)
                }, 600 * i)
            })
        }
        return () => {
            clearTimeout(interval.current)
        }
    }, [mount])

    const sortChart = useCallback((arr) => {  
        setData([...arr])

        const newDataArr = [...arr]
        let temp;
        let temp2;
        const rank = newDataArr.map((a, i) => {
            return i + 1;
        });

        for (let i = 0; i < newDataArr.length - 1; i++) {
            for (let j = i + 1; j < newDataArr.length; j++) {
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
        
        setTopCOVID(newDataArr[0]['COVID'])
        setTopPosition(rankPosition)
    },[])

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

    const onClickStop = useCallback((e) => {
        e.preventDefault();
        clearTimeout(interval.current);
    }, [])

    const handlePx = (currentPx) => {
        if (topCOVID <= 1500){
            return currentPx;
        }else if( topCOVID > 1500){
            return currentPx / topCOVID * 1500
        }
    }

    return(
        <ChartWrap className={mount && 'on'}>
            { date && (
                <div style={{ padding: '40px 42px 0 60px' }}>DATE : {date[0]}.{date[1]}.{date[2]} {<><button onClick={onClickStop}>stop</button><button onClick={onClickReset}>Reset</button></>}</div>
            )}
            <ul style={{ padding: '40px 100px'}}>
                { data.length >= 1 && data.map((s, i) => {
                    if(i < 15){
                        return(
                                <li style={{display:'inline-block', paddingRight:'18px', marginBottom:'5px'}} key={i}>
                                    <div style={{ background: colorSet.current[i], width: '18px', height: '18px', display:'inline-block', verticalAlign:'bottom'}}></div>
                                    <span style={{paddingLeft: '4px'}}>{s.state}</span>
                                </li>
                        )
                    }
                })}
            </ul>
            <ul style={{ paddingLeft: '100px', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '1550px', overflow: 'hidden'}}>
                <span>0</span>
                {Array(15).fill(1).map((n, i) => {
                    return <li key={i} style={{ width: '100px', display: 'inline-block', textAlign: 'right', paddingBottom:'8px' }}><span style={{ marginRight: '-15px' }}>{100 * (i+1)}</span></li>
                })}
            </ul>
            <ChartBarWrap>
                { data.length >= 1 && data.map((p, i) => {
                    if(i < 15){
                        return(
                            <ChartBarContainer key={i} top={topPosition &&`${topPosition[i]}px`}>
                                <span style={{width:'100px', textAlign:'center', display:'inline-block', overflow:'hidden'}}>{p['state']}</span>
                                <ChartBar size={`${handlePx(p['COVID'])}px`} color={colorSet.current[i]}></ChartBar>
                                <span style={{ width: '60px', verticalAlign:'middle', textAlign: 'center', display: 'inline-block' }}>{p['COVID']}명</span>
                            </ChartBarContainer>
                        )
                    }
                })}
            </ChartBarWrap>
        </ChartWrap>
    )
}

export default TestChart;