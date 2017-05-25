import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {actions as employeeActions} from '../../ducks/employee'
import {actions as commonActions} from '../../ducks/common'
import {actions as financeDataActions} from '../../ducks/financeData'

// import getKursController from '../../api/financeData'

import Date from './Date'


class TaxEdite extends Component {
    constructor(props) {
        super(props);
        let name = this.props.item.counterpartyName,
            date = this.props.item.receivingDate,
            usd = this.props.item.usdRevenue,
            grn = this.props.item.uahRevenue,
            kurs = this.props.item.exchRateUsdUahNBUatReceivingDate;

        this.state = {
            name,
            date,
            usd,
            grn,
            kurs,
        };


        this.getKurs = this.getKurs.bind(this);
        this.saveTax = this.saveTax.bind(this);
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

    saveTax(){
        let self = this.state;
        console.log(self.name, self.date, self.usd, self.grn, self.kurs);
        let data = {
            "counterpartyName": self.name,
            "receivingDate": self.date,
            "uahRevenue": self.grn,
            "usdRevenue": self.usd,
            "exchRateUsdUahNBUatReceivingDate": self.kurs
        };
        let idEmployee = this.props.employee.activeEmployee,
            idQuarter = this.props.idQuarter;
        this.props.addTax(data, idEmployee, idQuarter)
            .then(()=>{
                this.props.getQuarter(idEmployee);
            });

        this.setState({
            isEdite: false,
            name: "",
            date: null,
            usd: 0,
            grn: 0,
            kurs: null,
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
                    <Date getKurs={ this.getKurs } />
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
                {this.state.kurs &&
                <button className="tax-btn tax-btn-save"
                        onClick={this.saveTax}
                >Сохранить изменения</button>
                }
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