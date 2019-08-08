import React from 'react';
import {
    Navbar, NavbarBrand, NavbarToggler, Collapse, Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

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
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">reactstrap</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <ul className="navbar-nav mr-auto">
                            <li><Link to={'/'} className="nav-link"> Home </Link></li>
                            <li><Link to={'/upload'} className="nav-link">Upload</Link></li>
                            <li><Link to={'/about'} className="nav-link">About</Link></li>
                            <li><Link to={'/contact'} className="nav-link">Contact</Link></li>
                        </ul>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                User
                </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <li><Link to={'/profile'} className="nav-link">Profile</Link></li>
                                </DropdownItem>
                                <DropdownItem>
                                    <li><Link to={'/registration'} className="nav-link">Registration</Link></li>
                                </DropdownItem>
                                <DropdownItem>
                                    <li><Link to={'/login'} className="nav-link">Login</Link></li>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

export default NavBar;