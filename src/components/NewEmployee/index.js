import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import {createNewEmployee} from '../../api/employee'

import {actions as employeeActions} from '../../ducks/employee'
import {actions as commonActions} from '../../ducks/common'
import {actions as financeDataActions} from '../../ducks/financeData'


class NewEmployee extends Component {
    constructor(props){
        super(props);

        this.state = {
            snackbar: false
        }

    }

    handleChange = () => {
        // console.log(
        //     this.refs.firstName.input.value,
        //     this.refs.secondName.input.value,
        //     this.refs.lastName.input.value,
        //     this.refs.email.input.value,
        //     this.refs.department.input.value,
        //     this.refs.comment.input.value,
        //     this.refs.kved.input.value
        // );
        let firstName = this.refs.firstName.input.value,
            lastName = this.refs.lastName.input.value,
            secondName = this.refs.secondName.input.value,
            email = this.refs.email.input.value,
            department = this.refs.department.input.value,
            comment = this.refs.comment.input.value,
            kved = this.refs.kved.input.value;

        let data = {firstName,secondName,lastName,email,department,comment};

        //вкл прелоуд
        this.props.onPreloader();

        createNewEmployee(data)
            .then(res=>res.json())
            .then(res => {
                this.setState({snackbar: true});
                this.refs.firstName.input.value = '';
                this.refs.secondName.input.value = '';
                this.refs.lastName.input.value = '';
                this.refs.email.input.value = '';
                this.refs.department.input.value = '';
                this.refs.comment.input.value = '';
                this.refs.kved.input.value = '';

                return this.props.getAllEmployees();
            })
            // .then(() => {
            //     //выкл прелоуд
            //     this.props.offPreloader();
            //     //закрыть модал окно
            //     this.props.clearModal();
            // })
            .catch((error)=>{
                console.log(error);
                //выкл прелоуд
                this.props.offPreloader();
                //выкл модал  окно
                this.props.clearModal();
            });

    };

    render() {

        return (
            <div className='container'>

                <form className="form">

                    <h3>Новый сотрутдник</h3>

                        <TextField
                            hintText='Text'
                            fullWidth={true}
                            floatingLabelText='Имя'
                            ref='firstName'
                        />
                        <TextField
                            hintText='Text'
                            fullWidth={true}
                            floatingLabelText='Фамилия'
                            ref='lastName'
                        />
                        <TextField
                            hintText='Text'
                            fullWidth={true}
                            floatingLabelText='Отчество'
                            ref='secondName'
                        />

                        <TextField
                            hintText='Text'
                            fullWidth={true}
                            floatingLabelText='E-mail'
                            ref='email'
                        />
                        <TextField
                            hintText='Text'
                            fullWidth={true}
                            floatingLabelText='Отдел'
                            ref='department'
                        />
                        <TextField
                            hintText='Text'
                            fullWidth={true}
                            floatingLabelText='Комментарий'
                            ref='comment'
                        />

                        <TextField
                            hintText='Text'
                            fullWidth={true}
                            floatingLabelText='Налоговая ставка (вещественное число)'
                            disabled={true}
                        />
                        <TextField
                            hintText='Text'
                            fullWidth={true}
                            floatingLabelText='КВЕД (список стоковых значений)'
                            ref='kved'
                            disabled={true}
                        />

                    <RaisedButton label='СОХРАНИТЬ' fullWidth={true} style={{marginTop: '30px'}} onClick={this.handleChange} />

                </form>

                <Snackbar
                    open={this.state.snackbar}
                    message='Добавлен новый пользователь'
                    autoHideDuration={4000}
                />

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        employee: state.employee
    }
}
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        ...commonActions,
        ...employeeActions,
        ...financeDataActions
    }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(NewEmployee)