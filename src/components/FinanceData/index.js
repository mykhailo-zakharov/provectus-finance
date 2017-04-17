import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Quarter from './Quarter'

import {actions as employeeActions} from '../../ducks/employee'
import {actions as commonActions} from '../../ducks/common'
import {actions as financeDataActions} from '../../ducks/financeData'


class FinanceData extends Component {
    constructor(){
        super();
        // this.state = {
        //   isTable: false
        // }
        this.addQuarter = this.addQuarter.bind(this);
    }

    addQuarter(){
        let year = this.refs.quarterYear.value,
            numb = this.refs.quarterNumb.value,
            id = this.props.employees.activeEmployee;
        console.log(year, numb);
        this.props.addQuarter(year, numb, id);

        this.refs.quarterYear.value = "";
        this.refs.quarterNumb.value = "";

        // this.props.getQuarter(id);
    }


    render() {
        if(!this.props.isTable){
            return null;
        }

        return (
            <div className='finance-data'>
                <div className="quarter-add-container">
                    <h1>Добавить новый квартал</h1>
                        <span>Год</span>
                        <input type="text" ref="quarterYear"/>
                        <span>Номер квартала</span>
                        <input type="text" ref="quarterNumb"/>
                        <button onClick={this.addQuarter}
                                className="tax-btn"
                        >ДОБАВИТЬ</button>
                </div>



                <div className="quarter-container">

                    <div className="quarter-container-inner">



                        {this.props.quarters && this.props.quarters.length > 0  &&
                            this.props.quarters.map((item)=>{
                                return (
                                    <Quarter key={item.id}
                                             item={item}
                                    />
                                )
                            })
                        }

                    </div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        employees: state.employee,
        quarters: state.financeData.list,
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
export default connect(mapStateToProps, mapDispatchToProps)(FinanceData)
