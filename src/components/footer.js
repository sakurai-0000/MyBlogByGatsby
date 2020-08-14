import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Style from './layout.module.scss'
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faTwitter,
    faFacebookSquare,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons'


function Footer(props) {
    return (
        <footer className={Style.footer_wrap}>
            <Container fluid >
                <Row >
                    <Col>
                        <div className={Style.siteFooting}>
                            <p>Copyright © All Rights reserved by
                                <Link to="/">
                                    RYUTARO SAKURAI
                                </Link>
                                .</p>
                        </div>
                    </Col>
                    <Col >
                        <div className={Style.siteFootingIcon}>
                            <FontAwesomeIcon icon={faTwitter} className="ml-3" size="2x" />
                            <FontAwesomeIcon icon={faFacebookSquare} className="ml-3" size="2x" />
                            <FontAwesomeIcon icon={faInstagram} className="ml-3" size="2x" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer

