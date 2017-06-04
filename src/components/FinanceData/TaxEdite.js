import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {actions as employeeActions} from '../../ducks/employee'
import {actions as commonActions} from '../../ducks/common'
import {actions as financeDataActions} from '../../ducks/financeData'

import Date from './Date'

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


class TaxEdite extends Component {
    constructor(props) {
        super(props);
        let name = this.props.item.counterpartyName,
            date = this.props.item.receivingDate,
            usd = +this.props.item.usdRevenue,
            grn = +this.props.item.uahRevenue,
            kurs = +this.props.item.exchRateUsdUahNBUatReceivingDate;

        console.log(name,
            date,
            usd,
            grn,
            kurs);

        this.state = {
            name,
            date,
            usd,
            grn,
            kurs,
        };


        this.getKurs = this.getKurs.bind(this);
        this.editeTax = this.editeTax.bind(this);
    }

    getKurs( date, dateSec ) {

        this.props.getKurs( date )
            .then((data) => {
                console.log(date, dateSec);
                this.setState({
                    date: dateSec,
                    kurs: data,
                    isLoadKurs: false
                });
            })
    }

    editeTax(){
        let self = this.state,
            employeeId = this.props.employee.activeEmployee,
            quarterId = this.props.quarterid,
            taxRecordId = this.props.item.id;

        let data = {
            "id": taxRecordId,
            "counterpartyName": self.name,
            "receivingDate": self.date,
            "uahRevenue": self.grn,
            "usdRevenue": self.usd,
            "exchRateUsdUahNBUatReceivingDate": self.kurs
        };

        console.log(data);

        this.props.editeTax(employeeId, quarterId, data)
            .then((e)=>{
                this.props.getQuarter(employeeId);
                this.props.setTaxEdite(null);
                console.log("edite");
            });

        this.setState({
            isEdite: false,
            name: "",
            date: null,
            usd: 0,
            grn: 0,
            kurs: 0,
        });
    }

    render() {

        let DateTimeFormat = global.Intl.DateTimeFormat;

        return (
            <tr className="tax-tr-edit">
                <td>
                    <input type="text"
                           className="tax-edit-input-name"
                           placeholder="Введите название"
                           value={this.state.name}
                           onChange={(e) => this.setState({name: e.target.value})}
                    />
                </td>
                <td>
                    <Date getKurs={ this.getKurs } 
                          value={this.state.date}
                    />
                </td>
                <td>
                    <input type="number"
                           className="tax-edit-input-numb"
                           value={this.state.usd}
                           onChange={(e) => this.setState({usd: +e.target.value})}
                    />
                </td>
                <td>
                    <input type="number"
                           className="tax-edit-input-numb"
                           value={this.state.grn}
                           onChange={(e) => this.setState({grn: +e.target.value})}
                    />
                </td>
                <td>{ (this.state.kurs).toFixed(2) }</td>
                <td>{ (this.state.usd * this.state.kurs).toFixed(2) }</td>
                <td>{ (this.state.grn + this.state.usd * this.state.kurs).toFixed(2) }</td>
                <td>{ ((this.state.grn + this.state.usd * this.state.kurs) * 0.05).toFixed(2) }</td>
                <td>
                    <IconMenu
                        iconButtonElement={<IconButton style={{padding: "0", height: "2.5rem", width: "4rem"}}><MoreVertIcon /></IconButton>}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        style={{float: "right"}}
                    >
                        <MenuItem primaryText="Сохранить"
                                  onClick={this.editeTax}
                        />
                        <MenuItem primaryText="Отмена"
                                  onClick={ ()=>this.props.setTaxEdite( null ) }
                        />
                        <MenuItem primaryText="Удалить"
                                  //onClick={() => this.props.delete(item.id)}
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
        isTable: state.common.isTable
    }
};

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        ...commonActions,
        ...employeeActions,
        ...financeDataActions
    }, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(TaxEdite)