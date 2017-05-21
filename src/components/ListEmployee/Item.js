import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {actions as employeeActions} from '../../ducks/employee'
import {actions as commonActions} from '../../ducks/common'
import {actions as financeDataActions} from '../../ducks/financeData'

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


class Item extends Component {
    constructor(props) {
        super(props);


        this.onSelected = this.onSelected.bind(this);
    }

    onSelected(){
        !this.props.isTable && this.props.onTable();
        this.props.getQuarter(this.props.item.id);
        this.props.setActiveYmployee(this.props.item.id);
    }

    render(){
        let {item, index,activeEmployee} = this.props;
        return(
            <tr className={"employee-table-row" + (activeEmployee == item.id ? " active" : "")}
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
                <td  className="employee-table-cell">
                    {/*<svg viewBox="0 0 24 24"
                         className="employee-table-btn-del"
                    >
                        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#icon_del" />
                    </svg>*/}

                    <IconMenu
                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        style={{float: "right"}}
                    >
                        <MenuItem primaryText="Выбрать"
                                  onClick={ this.onSelected }
                        />
                        <MenuItem primaryText="Импорт с Ecxel" />
                        <MenuItem primaryText="Экспорт в Ecxel" />
                        <MenuItem primaryText="Удалить"
                                  onClick={() => this.props.delete(item.id)}
                        />
                    </IconMenu>


                </td>
            </tr>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        employee: state.employee,
        activeEmployee: state.employee.activeEmployee,
        isTable: state.common.isTable,
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