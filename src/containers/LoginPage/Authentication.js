import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from '../../actions/UserActions'

export class Authentication extends Component {
    handleSubmit(e) {
        e.preventDefault();
        this.props.UserActions.login(e.target.elements[0].value, e.target.elements[1].value)
    }

    render() {
        let access = localStorage.getItem('access');

        console.log('access: ', access,this.props.user.isAuthenticated);

        if(this.props.user.isAuthenticated !== true && access){
            this.props.UserActions.logInStorage('admin');
        }

        if(this.props.user.isAuthenticated === true || access) {
            return this.props.children
        } else {
            return (
                <div className='authentication'>
                    <form className='authentication-form' onSubmit={::this.handleSubmit}>
                        <input className='authentication-input' type='text' placeholder='login'/>
                        <input className='authentication-input' type='text' placeholder='pw'/>
                        <button className='authentication-btn' type='submit'>Войти</button>
                    </form>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
  return {
      UserActions: bindActionCreators(UserActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)
