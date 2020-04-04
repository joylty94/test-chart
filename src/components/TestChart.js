import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import styled from 'styled-components';
import {randomColor} from 'randomcolor';

const ChartWrap = styled.div`
    background-color:skyblue;
    opacity: 0;
    transition: opacity 2s;
    position: relative;
    height: 500px;

    &.on{
        opacity: 1;
    }
`
const ChartBarWrap = styled.div`
    transition: all 400ms ease-in;
    display: inline-block;
    vertical-align: middle;
    position: absolute;
    top: ${props => props.top};
`;

const ChartBar = styled.div`
    width: ${props => props.size};
    height: 30px;
    background-color: ${props => props.color};
    transition: all 300ms ease-in;
    display: inline-block;
    vertical-align: middle;
`;


const TestChart = () => {

    const [data, setData] = useState([]);
    const [mount, setMount] = useState(false);
    const [topPosition, setTopPosition] = useState()
    const colorSet = useRef([randomColor(), randomColor(), randomColor(), randomColor()])
  
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
            rankPosition[p - 1] = (i + 1) * 50;
        })

        setTopPosition(rankPosition)
    }

    const Json = [
        {
            'date': '',
            'COVID':[
                {
                    'COVID' : 50,
                    'state' : '중국'
                },
                {
                    'COVID' : 30,
                    'state' : '일본'
                },
                {
                    'COVID' : 10,
                    'state' : '한국'
                },
                {
                    'COVID' : 5,
                    'state' : '미국'
                }
            ]
        },
        {
            'date': '',
            'COVID':[
                {
                    'COVID' : 110,
                    'state' : '중국'
                },
                {
                    'COVID' : 50,
                    'state' : '일본'
                },
                {
                    'COVID' : 80,
                    'state' : '한국'
                },
                {
                    'COVID' : 15,
                    'state' : '미국'
                }
            ]
        },
        {
            'date': '',
            'COVID':[
                {
                    'COVID' : 250,
                    'state' : '중국'
                },
                {
                    'COVID' : 80,
                    'state' : '일본'
                },
                {
                    'COVID' : 121,
                    'state' : '한국'
                },
                {
                    'COVID' : 30,
                    'state' : '미국'
                }
            ]
        },
        {
            'date': '',
            'COVID':[
                {
                    'COVID' : 380,
                    'state' : '중국'
                },
                {
                    'COVID' : 170,
                    'state' : '일본'
                },
                {
                    'COVID' : 192,
                    'state' : '한국'
                },
                {
                    'COVID' : 93,
                    'state' : '미국'
                }
            ]
        },
        {
            'date': '',
            'COVID':[
                {
                    'COVID' : 561,
                    'state' : '중국'
                },
                {
                    'COVID' : 252,
                    'state' : '일본'
                },
                {
                    'COVID' : 241,
                    'state' : '한국'
                },
                {
                    'COVID' : 132,
                    'state' : '미국'
                }
            ]
        },
        {
            'date': '',
            'COVID':[
                {
                    'COVID' : 783,
                    'state' : '중국'
                },
                {
                    'COVID' : 420,
                    'state' : '일본'
                },
                {
                    'COVID' : 294,
                    'state' : '한국'
                },
                {
                    'COVID' : 302,
                    'state' : '미국'
                }
            ]
        },
    ]

    useEffect(() => {
        Json.forEach((d, i) => {
            setTimeout(() => {
                sortChart(d.COVID)
                setData(d.COVID)
            }, 1000 * (i+1))
        })
    }, [mount])

    return(
        <ChartWrap className={mount && 'on'}>
            { data.length >= 1 && data.map((p, i) => {
                return(
                    <ChartBarWrap key={i} top={`${topPosition[i]}px`}>
                        <span>{data[i]['state']}</span>
                        <ChartBar size={`${data[i]['COVID']}px`} color={colorSet.current[i]}></ChartBar>
                        <span style={{ verticalAlign: 'middle' }}>{data[i]['COVID']}명</span>
                    </ChartBarWrap>
                )
            })}
        </ChartWrap>
    )
}

export default TestChart;