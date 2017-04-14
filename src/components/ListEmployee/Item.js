import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {actions as employeeActions} from '../../ducks/employee'
import {actions as commonActions} from '../../ducks/common'
import {actions as financeDataActions} from '../../ducks/financeData'


class Item extends Component {
    constructor(props) {
        super(props);


        this.onSelected = this.onSelected.bind(this);
    }

    onSelected(){
        !this.props.isTable && this.props.onTable();
        this.props.getQuarter(this.props.item.id);

    }

    render(){
        let {item, index} = this.props;
        return(
            <tr className="employee-table-row"
                onDoubleClick={this.onSelected}
            >
                <td  className="employee-table-cell">{index + 1}</td>
                <td  className="employee-table-cell" >{item.lastName}</td>
                <td  className="employee-table-cell" >{item.firstName}</td>
                <td  className="employee-table-cell" >{item.secondName}</td>
                <td  className="employee-table-cell" >{item.email}</td>
                <td  className="employee-table-cell" >{item.department}</td>
                <td  className="employee-table-cell" >{item.comment}</td>
                <td  className="employee-table-cell" >{item.kved}</td>
                <td  className="employee-table-cell"  onClick={() => this.props.delete(item.id)}>
                    <svg viewBox="0 0 24 24"
                         className="employee-table-btn-del"
                    >
                        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#icon_del" />
                    </svg>
                </td>
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
export default connect(mapStateToProps, mapDispatchToProps)(Item)