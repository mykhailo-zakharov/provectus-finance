import React, { Component } from 'react'

import ListEmployee from '../ListEmployee'
import FinanceData from '../FinanceData'


export default class Home extends Component {
  constructor(){
    super();
    // this.state = {
    //   isTable: false
    // }
  }


  render() {
    return (
      <div className='content'>

          <ListEmployee />

          <FinanceData />

      </div>
    )
  }
}
