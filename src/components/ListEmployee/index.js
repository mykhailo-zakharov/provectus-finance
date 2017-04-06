import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionAmployees from '../../actions/Employee'

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
from 'material-ui/Table';


class Employee extends Component {
    constructor(props){
        super(props);

        let {getAllEmployees} = props.actionAmployees;
        getAllEmployees();

        this.state = {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            selectable: false,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: 'calc(100vh - 300px)'
        };
    }

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled
        });
    };

    handleChange = (event) => {
        this.setState({height: event.target.value});
    };

    render() {

        let list=[],
            context = [];

            if(this.props.employee.list && this.props.employee.list.length > 0){
                context = this.props.employee.list.map((item, index)=>{
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.firstName}</td>
                            <td>{item.secondName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.department}</td>
                            <td>{item.comment}</td>
                            <td>{item.kved}</td>
                        </tr>
                    )
                });
            }


        return (
            <div className="container">
                <h3> Таблица сотрудников </h3>



                <Table
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                    style={{overflow: "hidden"}}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        <TableRow>
                            <TableHeaderColumn >№</TableHeaderColumn>
                            <TableHeaderColumn >фамилия</TableHeaderColumn>
                            <TableHeaderColumn >имя</TableHeaderColumn>
                            <TableHeaderColumn >отчество</TableHeaderColumn>
                            <TableHeaderColumn >емейл</TableHeaderColumn>
                            <TableHeaderColumn >отдел</TableHeaderColumn>
                            <TableHeaderColumn >комментарий</TableHeaderColumn>
                            <TableHeaderColumn tooltip='ВЕД(вещественное число)'>КВЕД</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>

                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {this.props.employee.list && this.props.employee.list.length > 0 && this.props.employee.list.map( (item, index) => (
                            <TableRow key={index}>
                                <TableRowColumn>{index}</TableRowColumn>
                                <TableRowColumn>{item.lastName}</TableRowColumn>
                                <TableRowColumn>{item.firstName}</TableRowColumn>
                                <TableRowColumn>{item.secondName}</TableRowColumn>
                                <TableRowColumn>{item.email}</TableRowColumn>
                                <TableRowColumn>{item.department}</TableRowColumn>
                                <TableRowColumn>{item.comment}</TableRowColumn>
                                <TableRowColumn>{item.kved}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter >
                        <TableRow>
                            <TableHeaderColumn >№</TableHeaderColumn>
                            <TableHeaderColumn >имя</TableHeaderColumn>
                            <TableHeaderColumn >фамилия</TableHeaderColumn>
                            <TableHeaderColumn >отчество</TableHeaderColumn>
                            <TableHeaderColumn >емейл</TableHeaderColumn>
                            <TableHeaderColumn >отдел</TableHeaderColumn>
                            <TableHeaderColumn >комментарий</TableHeaderColumn>
                            <TableHeaderColumn tooltip='ВЕД(вещественное число)'>КВЕД</TableHeaderColumn>
                        </TableRow>
                    </TableFooter>
                </Table>


            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        employee: state.employee
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actionAmployees: bindActionCreators(actionAmployees, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Employee)