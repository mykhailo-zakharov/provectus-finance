import React, {Component} from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import {actions as commonActions} from '../../ducks/common'


class Modal extends Component {
    constructor(){
        super();
        this.close = this.close.bind(this);
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
            <div className='modal'>
                <div className="modal-wrap">
                    <div className="modal-header">
                        <div className="modal-title">
                            { modalName }
                            <svg viewBox="0 0 15 15"
                                 className="modal-close"
                                 onClick={this.close}
                            >
                                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#icon_close" />
                            </svg>
                        </div>
                    </div>
                    <div className="modal-content">
                        { modalContent }
                    </div>
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
        ...commonActions
    }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
