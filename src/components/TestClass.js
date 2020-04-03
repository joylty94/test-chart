import React, {Component} from 'react'

export default class TestClass extends Component{
    num = 1
    componentDidMount(){
        [1,2,3,4].forEach((n, i) => {
            this.num++
        })
        console.log(this.num)
    }
    render(){
        return(
            <div>{this.num}</div>
        )
    }
}