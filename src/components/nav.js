import React from 'react';
import { Container, Navbar, Nav, NavDropdown, } from 'react-bootstrap';
import Style from './layout.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faHome,
    faCode
} from "@fortawesome/free-solid-svg-icons"

const Nv = (props) => {
    return (
        <div className={Style.nav_wrap}>
            <Container fluid className={Style.content}>
                <Navbar bg="dark" variant="dark" className={Style.navbar}>
                    <Navbar.Brand href="/"><FontAwesomeIcon icon={faHome} /> HOME</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className={Style.nav}>
                            <NavDropdown title={<><FontAwesomeIcon icon={faCode} /> Code </>} id="basic-nav-dropdown" >
                                <div className={Style.navDropdown} >
                                    <NavDropdown.Item href="/code/gatsby/"> Gatsby</NavDropdown.Item>
                                    <NavDropdown.Item href="/code/react-redux/">React/Redux</NavDropdown.Item>
                                    <NavDropdown.Item href="/code/aws/">AWS</NavDropdown.Item>
                                </div>
                            </NavDropdown>
                            {/* <NavDropdown title="Travel" id="basic-nav-dropdown">
                                <div className={Style.navDropdown}>
                                    <NavDropdown.Item href="/">Asia</NavDropdown.Item>
                                    <NavDropdown.Item href="/">Euro</NavDropdown.Item>
                                    <NavDropdown.Item href="/">America</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/">Travel</NavDropdown.Item>
                                </div>
                            </NavDropdown>
                            <NavDropdown title="Blog" id="basic-nav-dropdown">
                                <div className={Style.navDropdown}>
                                    <NavDropdown.Item href="/blog">Blog</NavDropdown.Item>
                                </div>
                            </NavDropdown> */}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </div>
    );
}

export default Nv