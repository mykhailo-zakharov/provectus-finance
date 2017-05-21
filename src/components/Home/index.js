import React, { Component } from 'react'

import ListEmployee from '../ListEmployee'
import FinanceData from '../FinanceData'
import Preloader from '../PreLoader'
import Modal from '../Modal'


export default class Home extends Component {
  constructor(){
    super();

  }


  render() {
    return (
      <div className='content'>

          <ListEmployee />

          <FinanceData />

          <Preloader />

          <Modal />

      </div>
    )
  }
}
