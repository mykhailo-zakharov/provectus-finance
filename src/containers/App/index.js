import React, {Component} from 'react'

import Svg from '../Svg'


class App extends Component {

    render() {
        return (
            <div className="main-wrap">

                <Svg />

                <div className="header">
                    <h1 className="header-title">
                        <h1>Provectus Finans</h1>
                    </h1>
                </div>


                {this.props.children}

            </div>
        )
    }
}

export default App;
