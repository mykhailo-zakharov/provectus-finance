import React, {Component} from 'react'
import { connect } from 'react-redux'

class Preloader extends Component {

    render() {
        if(!this.props.isPreloader){
            return null;
        }
        return (
            <div className='preload'>

                <div className="preload-box">
                    <div className="preload-dot"></div>
                    <div className="preload-dot"></div>
                    <div className="preload-dot"></div>
                    <div className="preload-dot"></div>
                    <div className="preload-dot"></div>
                    <div className="preload-dot"></div>
                    <div className="preload-dot"></div>
                    <div className="preload-dot"></div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isPreloader: state.common.isPreloader
    }
}

export default connect(mapStateToProps)(Preloader)