import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Style from './components.module.scss'
function Header() {
    return (
        <div className={Style.header_wrap}>
            <Container fluid className={Style.content}>
                <Row>
                    <Col className="mx-auto">
                        <div className={Style.siteHeading}>
                            <h1>SAKU BLOG</h1>
                            <span>It's a piece of cake!!</span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Header
