import React, {Component} from 'react'
import NavLink from '../../components/NavLink'
import AppBar from 'material-ui/AppBar';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';


const Logged = (props) => (
    <IconMenu
        //{...props}
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem primaryText="Refresh" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
    </IconMenu>
);

Logged.muiName = 'IconMenu';

class App extends Component {

    render() {
        return (
            <div className="main-wrap">

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

