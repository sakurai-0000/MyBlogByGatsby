import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Style from './layout.module.scss'

function Footer(props) {
    return (
        <div className={Style.footer_wrap}>
            <Container fluid className={Style.content}>
                <Row >
                    <Col >
                        <div className={Style.siteFooting}>
                            <p>Copyright © All Rights reserved by RYUTARO SAKURAI.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer

