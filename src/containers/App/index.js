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
            <div>
                <AppBar
                    title="Provectus Finans"
                    iconStyleLeft={{display: "none"}}
                    //iconElementRight={<Logged />}
                />

                <div className="header">
                    {/*<h1>Provectus Finans</h1>*/}
                    <ul className='nav'>
                        <li className="nav-item"><NavLink onlyActiveOnIndex={true} to='/'>Главная</NavLink></li>
                        <li className="nav-item"><NavLink to='/list-employee'>Список сотрудников</NavLink></li>
                        <li className="nav-item"><NavLink to='/new-employee'>Добавление нового сотрудника</NavLink></li>
                </ul>


                </div>

                {this.props.children}

            </div>
        )
    }
}

export default App;

