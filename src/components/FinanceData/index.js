import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'


class FinanceData extends Component {
    constructor(){
        super();
        // this.state = {
        //   isTable: false
        // }
    }


    render() {
        if(!this.props.isTable){
            return null;
        }

        return (
            <div className='finance-data'>


                <h1>FinanceData </h1>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        employee: state.employee,
        isTable: state.common.isTable
    }
}

// const mapDispatchToProps = (dispatch) => ({
//     ...bindActionCreators({
//         ...commonActions,
//         ...employeeActions
//     }, dispatch)
// })
export default connect(mapStateToProps, null)(FinanceData)
