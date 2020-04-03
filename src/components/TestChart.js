import React, {useState, useEffect, useCallback, useMemo} from 'react';
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
    transition: all 300ms ease-in;
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
    const [topPosition, setTopPosition] = useState([30, 80, 130, 180])
  

    useEffect(()=>{
        setMount(true)
    },[])

    

    const sortChart = (arr) => {
        const newArr = [...topPosition];
        const newDataArr = [...arr]
        let temp;
        let temp2;
        let a = [1,2,3,4];

        for (let i = 0; i < newDataArr.length - 1 ; i++) {
            for (let j = i + 1; j < newDataArr.length ; j++) {
                if (parseInt(newDataArr[i]) < parseInt(newDataArr[j])) {
                    console.log(i, j)
                    console.log(newDataArr[i], newDataArr[j])
                    console.log(newArr[i], newArr[j])
                    
                    temp2 = newDataArr[j];
                    newDataArr[j] = newDataArr[i];
                    newDataArr[i] = temp2;
                    
                    // temp = newArr[j];
                    // newArr[j] = newArr[i];
                    // newArr[i] = temp;

                    temp = a[j];
                    a[j] = a[i];
                    a[i] = temp;

                }
            }
        }

        // for (let i = 0; i < arr.length - 1; i++) {
        //     for (let j = i + 1; j < arr.length; j++) {
        //         if (parseInt(arr[i]) < parseInt(arr[j])) {
        //             console.log(i, j)
        //             console.log(newDataArr[i], newDataArr[j])
        //             temp2 = newDataArr[j];
        //             newDataArr[j] = newDataArr[i];
        //             newDataArr[i] = temp2;
        //         }
        //     }
        // }
        console.log(a)
        console.log(arr)
        console.log(newDataArr)
        console.log(topPosition)
        console.log(newArr)
        setTopPosition(newArr)
    }

    useEffect(() => {
        // setTimeout(() => {
        //     sortChart(['50', '10', '12', '8'])
        //     setData(['50', '10', '12', '8'])
            // setTimeout(() => {
            //     sortChart(['80', '21', '92', '26'])
            //     setData(['80', '21', '92', '26'])
                setTimeout(() => {
                    sortChart(['130', '23', '111', '31'])
                    setData(['130', '23', '111', '31'])
                //     setTimeout(() => {
                //         sortChart(['150', '40', '131', '50'])
                //         setData(['150', '40', '131', '50'])
                //         setTimeout(() => {
                //             sortChart(['210', '60', '221', '70'])
                //             setData(['210', '60', '221', '70'])
                //             setTimeout(() => {
                //                 sortChart(['330', '82', '281', '122'])
                //                 setData(['330', '82', '281', '122'])
                //             },1000)
                //         },1000)
                //     },1000)
                },1000)
            // },1000)
        // }, 1000)
    }, [mount])
    
    const useColor = useCallback(() =>{
        return randomColor();
    }, [])
    //console.log(data)
    return(
        <ChartWrap className={mount && 'on'}>
            { data.length >= 1 && data.map((p, i) => {
                return(
                    <ChartBarWrap key={i} top={`${topPosition[i]}px`}>
                        <ChartBar size={`${data[i]}px`} color={useColor} ></ChartBar>
                        <span style={{verticalAlign:'middle'}}>{data[i]}명</span>
                    </ChartBarWrap>
                )
            })}
        </ChartWrap>
    )
}

export default TestChart;