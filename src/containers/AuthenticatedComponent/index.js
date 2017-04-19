import React from 'react'
import { connect } from 'react-redux'
import { ROUTING } from '../../constants/Routing'


export default function requireAuthentication(Component) {

  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth(this.props.common)
    }
    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.common)
    }
    checkAuth(user) {
      if (!user.isAuthenticated) {
        this.props.dispatch({
          type: ROUTING,
          payload: {
            method: 'replace',
            nextUrl: '/login'
          }
        })
      }
    }
    render() {
      return (
        <div>
          {this.props.common.isAuthenticated === true
            ? <Component {...this.props} />
            : null
          }
        </div>
      )
    }
  }

  function mapStateToProps(state) {
    return {
      common: state.common
    }
  }

  return connect(mapStateToProps)(AuthenticatedComponent)
}
