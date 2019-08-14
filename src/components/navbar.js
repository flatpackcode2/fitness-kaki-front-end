import React from 'react';
import {
    Navbar, NavbarBrand, NavbarToggler, Collapse, Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import FitnessKaki from '../images/FitnessKaki.png'


class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Navbar color="info" light expand="md">
                <NavbarBrand href="/" className="text-light"><img src={FitnessKaki} width="50" /><h3 className="d-inline">FitnessKaki</h3></NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto text-light" navbar>
                        <ul className="navbar-nav mr-auto">
                            <li><Link to={'/'} className="nav-link text-light"> Home </Link></li>
                            <li><Link to={'/about'} className="nav-link text-light">About</Link></li>
                            <li><Link to={'/contact'} className="nav-link text-light">Contact</Link></li>
                            {this.props.isLoggedIn === 'loggedIn' ?
                                <li><Link to={'/events'} className="nav-link text-light">Events</Link></li>
                                : null
                            }
                            {this.props.isLoggedIn === 'loggedIn' ?
                                <li><Link to={'/upload'} className="nav-link text-light">Upload</Link></li>
                                : null
                            }
                        </ul>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret className="text-light">Get started</DropdownToggle>
                            <DropdownMenu right>
                                {this.props.isLoggedIn === 'loggedIn' ?
                                    <>
                                        <DropdownItem><li><a onClick={this.props.logout} className="nav-link text-info">Logout</a></li></DropdownItem>
                                        <DropdownItem><li><Link to={'/profile'} className="nav-link text-info">Profile</Link></li></DropdownItem>
                                    </>
                                    :
                                    <>
                                        <DropdownItem><li><Link to={'/login'} className="nav-link text-info">Login</Link></li></DropdownItem>
                                        <DropdownItem><li><Link to={'/registration'} className="nav-link text-info">Register</Link></li></DropdownItem>
                                    </>
                                }
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

export default NavBar;