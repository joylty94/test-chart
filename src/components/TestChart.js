import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
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

    &:hover{
        transform: scaleY(1.2);
    }
`;

const TestChart = () => {

    const [data, setData] = useState([]);
    const [mount, setMount] = useState(false);
    const [topPosition, setTopPosition] = useState()
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
                    sortChart(d.COVID)
                    setData(d.COVID)
                }, 600 * i)
            })
        }
        return () => {
            clearTimeout(interval.current)
        }
    }, [mount])
    
    return(
        <ChartWrap className={mount && 'on'}>
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
            {/* <div style={{ paddingLeft: '60px', height: '40px', marginBottom: '40px', background: '#ddd', borderRight: 'solid 1px #aaa', overflow:'hidden'}}>
                <span style={{ width: '100px', height: '100%', display: 'inline-block', textAlign: 'right', borderLeft: 'solid 1px #aaa', borderRight: 'solid 1px #aaa'}}></span>
                <span style={{width:'100px', height:'100%', display:'inline-block', textAlign:'right', borderRight: 'solid 1px #aaa'}}></span>
                <span style={{width:'100px', height:'100%', display:'inline-block', textAlign:'right', borderRight: 'solid 1px #aaa'}}></span>
                <span style={{width:'100px', height:'100%', display:'inline-block', textAlign:'right', borderRight: 'solid 1px #aaa'}}></span>
                <span style={{width:'100px', height:'100%', display:'inline-block', textAlign:'right', borderRight: 'solid 1px #aaa'}}></span>
                <span style={{width:'100px', height:'100%', display:'inline-block', textAlign:'right', borderRight: 'solid 1px #aaa'}}></span>
                <span style={{width:'100px', height:'100%', display:'inline-block', textAlign:'right', borderRight: 'solid 1px #aaa'}}></span>
                <span style={{width:'100px', height:'100%', display:'inline-block', textAlign:'right', borderRight: 'solid 1px #aaa'}}></span>
                <span style={{width:'100px', height:'100%', display:'inline-block', textAlign:'right', borderRight: 'solid 1px #aaa'}}></span>
            </div> */}
            <ChartBarWrap>
                { data.length >= 1 && data.map((p, i) => {
                    return(
                        <ChartBarContainer key={i} top={`${topPosition[i]}px`}>
                            <span style={{width:'60px', textAlign:'center', display:'inline-block'}}>{data[i]['state']}</span>
                            <ChartBar size={`${data[i]['COVID']}px`} color={colorSet.current[i]}></ChartBar>
                            <span style={{ verticalAlign: 'middle' }}>{data[i]['COVID']}명</span>
                        </ChartBarContainer>
                    )
                })}
            </ChartBarWrap>
        </ChartWrap>
    )
}

export default TestChart;