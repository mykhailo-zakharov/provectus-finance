import React, { Component } from 'react'
import NavLink from '../../components/NavLink'

export default class App extends Component {
  render() {
    return (
      <div className='container'>

        <h1>Provectus Finans</h1>

        <ul className='nav nav-pills'>
          <li><NavLink onlyActiveOnIndex={true} to='/'>Главная</NavLink></li>
          <li><NavLink to='/list-employee'>Список сотрудников</NavLink></li>
          <li><NavLink to='/new-employee'>Добавление нового сотрудника</NavLink></li>
        </ul>

        {this.props.children}

      </div>
    )
  }
}
