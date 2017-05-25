import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {actions as employeeActions} from '../../ducks/employee'
import {actions as commonActions} from '../../ducks/common'
import {actions as financeDataActions} from '../../ducks/financeData'

import TaxEdite from './TaxEdite'


class Tax extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     isEdite: false
        // };


        // this.onSelected = this.onSelected.bind(this);
    }


    render(){
        let item = this.props.item,
            date = new Date(item.receivingDate);
        date = date > 0 ? (date.toDateString()) : "-";
        let sumIds = this.props.id + item.id;

        if( this.props.taxEdite == sumIds ){
            return <TaxEdite item={this.props.item} />
        }

        return(
            <tr onDoubleClick={()=>this.props.setTaxEdite(this.props.id + item.id)}>
                <td>{item.counterpartyName}</td>
                <td>{date}</td>
                <td>{item.usdRevenue}</td>
                <td>{item.uahRevenue}</td>
                <td>{ ( item.exchRateUsdUahNBUatReceivingDate ).toFixed(2) }</td>
                <td>{ ( item.exchRateUsdUahNBUatReceivingDate * item.usdRevenue ).toFixed(2) }</td>
                <td>{ ( item.exchRateUsdUahNBUatReceivingDate * item.usdRevenue + item.uahRevenue ).toFixed(2) }</td>
                <td>{ ( ( item.exchRateUsdUahNBUatReceivingDate * item.usdRevenue + item.uahRevenue ) * 0.05 ).toFixed(2) }</td>
                {/*<td>menu</td>*/}
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