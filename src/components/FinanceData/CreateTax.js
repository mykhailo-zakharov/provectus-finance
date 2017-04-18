import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {actions as employeeActions} from '../../ducks/employee'
import {actions as commonActions} from '../../ducks/common'
import {actions as financeDataActions} from '../../ducks/financeData'

import getKursController from '../../api/financeData'

import DatePicker from 'material-ui/DatePicker';


class CreateTax extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdite: false,
            name: "",
            date: null,
            usd: 0,
            grn: 0,
            kurs: null,
        };


        this.handleSetDate = this.handleSetDate.bind(this);
        this.saveTax = this.saveTax.bind(this);
    }

    handleSetDate(event, date) {
        let d = date,
            curr_date = d.getDate();
        curr_date = curr_date < 10 ? ("0" + curr_date) : curr_date;
        let curr_month = d.getMonth() + 1;
        curr_month = curr_month < 10 ? ("0" + curr_month) : curr_month;
        let curr_year = d.getFullYear(),
            dateFormat = "" + curr_year + curr_month + curr_date;

        this.props.getKurs(dateFormat)
            .then((data) => {
                this.setState({
                    date: +date,
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

        if (!this.state.isEdite) {
            return <svg viewBox="0 0 24 24"
                        className="tax-btn-add"
                        onClick={() => this.setState({isEdite: true})}
                >
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#icon_note_add" />
                </svg>
        }


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
                    {this.state.name.length > 0 &&
                        <DatePicker hintText="Конечная дата"
                                onChange={::this.handleSetDate}
                                autoOk="true"
                                cancelLabel="Отмена"
                                maxDate={new Date()}
                                style={{
                                    width: "120px",
                                    display: "inline-block",
                                    overflow: "hidden",
                                    verticalAlign: "middle",
                                    marginLeft: "2rem",
                                    textAlign: "right"
                                }}
                                locale="ru"
                                formatDate={new DateTimeFormat('ru', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                }).format}
                        />
                    }
                </td>
                <td>
                    {this.state.kurs &&
                        <input type="number"
                               className="tax-edit-input-numb"
                               value={this.state.usd}
                               onChange={(e) => this.setState({usd: +e.target.value})}
                        />
                    }
                </td>
                <td>
                    {this.state.kurs &&
                        <input type="number"
                               className="tax-edit-input-numb"
                               value={this.state.grn}
                               onChange={(e) => this.setState({grn: +e.target.value})}
                        />
                    }
                </td>
                <td>{this.state.kurs && this.state.kurs}</td>
                <td>{this.state.kurs && (this.state.usd * this.state.kurs)}</td>
                <td>{this.state.kurs && (this.state.grn + this.state.usd * this.state.kurs)}</td>
                <td>{this.state.kurs && ((this.state.grn + this.state.usd * this.state.kurs) * 0.2)}</td>
                {this.state.kurs &&
                    <button className="tax-btn tax-btn-save"
                            onClick={this.saveTax}
                    >Сохранить</button>
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


export default connect(mapStateToProps, mapDispatchToProps)(CreateTax)