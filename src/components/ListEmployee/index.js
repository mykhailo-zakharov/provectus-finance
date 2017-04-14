import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Item from './Item'

import {deleteEmployeesController} from '../../api/employee'

import {actions as employeeActions} from '../../ducks/employee'
import {actions as commonActions} from '../../ducks/common'


class Employee extends Component {
    constructor(props) {
        super(props);

        props.getAllEmployees();

        // this.state = {

        // };
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id) {
        console.log(`delete: ${id}`);

        deleteEmployeesController(id)
        // .then(res=>res.json())
            .then(res => {
                console.log(res);
                return res
            }).then(() => {
            this.props.actionAmployees.getAllEmployees();
        })
            .catch((error) => console.log(error));

    }

    render() {
        let isTable = this.props.isTable;

        return (
            <div className={"employee-list" + (!isTable ? "" : " mini")}>
                <div className="employee-list-inner">

                    <h3 >Сотрудники</h3>

                    <table className="table">
                        <tbody >
                        <tr className="employee-table-row table-header">
                            <td className="employee-table-cell">№</td>
                            <td className="employee-table-cell">фамилия</td>
                            <td className="employee-table-cell">имя</td>
                            <td className="employee-table-cell">отчество</td>
                            <td className="employee-table-cell">емейл</td>
                            <td className="employee-table-cell">отдел</td>
                            <td className="employee-table-cell">комментарий</td>
                            <td className="employee-table-cell">КВЕД</td>
                            <td className="employee-table-cell"></td>

                            {this.props.isTable ?  (
                                            <svg viewBox="0 0 24 24"
                                                 className="employee-table-btn-open"
                                                 onClick={()=>this.props.offTable()}
                                            >
                                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#icon_open" />
                                            </svg>
                                ) : ""}

                        </tr>
                        </tbody>


                        {this.props.employee.list && this.props.employee.list.length > 0 && this.props.employee.list.map((item, index) => (
                            <Item item={item}
                                  key={index}
                                  index={index}
                                  delete={this.deleteEmployee}
                            />
                        ))}

                    </table>

                </div>

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

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        ...commonActions,
        ...employeeActions
    }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Employee)
