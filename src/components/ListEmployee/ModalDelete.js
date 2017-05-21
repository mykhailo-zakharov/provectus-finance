import React, {Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import {actions as employeeActions} from '../../ducks/employee'
import {actions as commonActions} from '../../ducks/common'

import {deleteEmployeesController} from '../../api/employee'


class Modal extends Component {
    constructor(){
        super();
        this.close = this.close.bind(this);
        this.delete = this.delete.bind(this);
    }

    delete(){
        //вкл прелоуд
        this.props.onPreloader();

        let { id } = this.props;

        deleteEmployeesController(id)
            .then(res => {
                console.log(res);
                return res;
            })
            .then(() => {
                this.props.getAllEmployees();
            })
            .catch((error) => {
                console.log(error);
                //выкл прелоуд
                this.props.offPreloader();
                //выкл модал  окно
                this.props.clearModal();
            });
    }

    close(){
        console.log("close");
        this.props.clearModal();
    }

    render() {
        let {modalName, modalContent} = this.props.common;

        if(!modalContent){
            return null;
        }

        return (
            <div>
                <div className="modal-content-text">Вы уверны, что хотите удалить пользователя?</div>
                <div className="modal-footer">
                    <button className="modal-btn"
                            onClick={this.close}
                    >Отмена</button>
                    <button className="modal-btn"
                            onClick={this.delete}
                    >ОК</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        common: state.common
    }
};

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        ...commonActions,
        ...employeeActions
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
