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
            usd: 0,
            grn: 0,
            kurs: 0,
            isLoadKurs: false
        };


        this.handleSetDate = this.handleSetDate.bind(this);
    }

    handleSetDate(event, date) {
        this.setState({
            isLoadKurs: true
        });
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
                    kurs: data,
                    isLoadKurs: false
                });
            })
    }


    render() {

        if (!this.state.isEdite) {
            return <button onClick={() => this.setState({isEdite: true})}> + </button>
        }


        let DateTimeFormat = global.Intl.DateTimeFormat;

        return (
            <tr>
                <td>
                    <input type="text"
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
                               value={this.state.usd}
                               onChange={(e) => this.setState({usd: +e.target.value})}
                        />
                    }
                </td>
                <td>
                    {this.state.kurs &&
                        <input type="number"
                               value={this.state.grn}
                               onChange={(e) => this.setState({grn: +e.target.value})}
                        />
                    }
                </td>
                <td>{this.state.kurs && this.state.kurs}</td>
                <td>{this.state.grn + this.state.usd * this.state.kurs}</td>
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
};

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        ...commonActions,
        ...employeeActions,
        ...financeDataActions
    }, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(CreateTax)