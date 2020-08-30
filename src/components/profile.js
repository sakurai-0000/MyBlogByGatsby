import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Img from "../images/profile.jpeg"

const Profile = (props) => {
    return (
        <Container style={{ padding: "1.2em", backgroundColor: "#fff" }} className="mt-3">
            <Row>
                <Col className="mb-3" style={{ textAlign: "center" }}>
                    <Image
                        src={`${Img}`}
                        style={{ height: "250px", width: "250px" }}
                        roundedCircle
                    />
                </Col>
            </Row>
            <Row>
                <Col className="mb-1" style={{ textAlign: "center" }}>
                    <p style={{ fontWeight: "bold", fontSize: "1.4em" }}>サクライ</p>
                </Col>
            </Row>
            <Row>
                <Col style={{ textAlign: "left" }}>
                    <p style={{ margin: "0" }}>
                        Web系エンジニア2年目。前職は2次元図面の自動化ツール開発に従事。
                        AutoCADは結構得意（3次元は無理）。現在は、
                        HTML / CSS / JS / React / Redux / Perl（はもうやりたくない）、
                        あたりをよく使います。趣味は海外旅行（13ヵ国）、ベトナム超行きたい。
                        ラジオ大好き（リトルトゥース）。
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default Profile