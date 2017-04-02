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
                <div className='row'>
                    <div className='col-md-12'>
                        <form className='form-inline' onSubmit={::this.handleSubmit}>
                            <input className='form-control' type='text' placeholder='login'/>
                            <input className='form-control' type='text' placeholder='pw'/>
                            <button className='btn btn-primary' type='submit'>Войти</button>
                        </form>
                    </div>
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
