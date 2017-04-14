import React, {Component} from 'react'
import NavLink from '../../components/NavLink'

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import Svg from '../Svg'


class App extends Component {

    render() {
        return (
            <div className="main-wrap">
                <Svg />

                <div className="header">
                    <h1 className="header-title">
                        <NavLink to='/'>Provectus Finans</NavLink>
                    </h1>
                    <NavLink to='/new-employee'>Добавить нового сотрудника</NavLink>
                </div>

                {this.props.children}

            </div>
        )
    }
}

export default App;

