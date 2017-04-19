import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {actions as employeeActions} from '../../ducks/employee'
import {actions as commonActions} from '../../ducks/common'
import {actions as financeDataActions} from '../../ducks/financeData'


export class Authentication extends Component {
    handleSubmit(e) {
        e.preventDefault();
        this.props.login(e.target.elements[0].value, e.target.elements[1].value)
    }

    render() {
        let access = localStorage.getItem('access');

        if(this.props.common.isAuthenticated !== true && access){
            this.props.logInStorage('admin');
        }

        if(this.props.common.isAuthenticated === true || access) {
            return this.props.children
        } else {
            return (
                <div className='authentication'>
                    <form className='authentication-form' onSubmit={::this.handleSubmit}>
                        <input className='authentication-input' type='text' placeholder='login'/>
                        <input className='authentication-input' type='password' placeholder='pw'/>
                        <button className='authentication-btn' type='submit'>Войти</button>
                    </form>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        common: state.common
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        ...commonActions,
        ...employeeActions,
        ...financeDataActions
    }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)

