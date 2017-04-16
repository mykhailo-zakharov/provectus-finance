import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {actions as employeeActions} from '../../ducks/employee'
import {actions as commonActions} from '../../ducks/common'
import {actions as financeDataActions} from '../../ducks/financeData'


class Tax extends Component {
    constructor(props) {
        super(props);


        // this.onSelected = this.onSelected.bind(this);
    }


    render(){
        let item = this.props.item,
            date = new Date(item.receivingDate);
        date = date > 0 ? (date.toDateString()) : "-";

        return(
            <tr>
                <td>{item.counterpartyName}</td>
                <td>{date}</td>
                <td>{item.usdRevenue}</td>
                <td>{item.uahRevenue}</td>
                <td>{item.exchRateUsdUahNBUatReceivingDate}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        employee: state.employee,
        isTable: state.common.isTable
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        ...commonActions,
        ...employeeActions,
        ...financeDataActions
    }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Tax)