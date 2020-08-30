import React from 'react';
import { useStaticQuery, graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap';
import Style from './layout.module.scss'

const Archive = (props) => {
    const datas = useStaticQuery(graphql`
    query{
        allContentfulCode {
            edges {
              node {
                createdDate(formatString:"YYYY/MM/DD")
               }
            }
        }
    }
`)
    const date = ['2020/07', '2020/08', '2020/09', '2020/10', '2020/11', '2020/12'];
    const count = date.map(x => {
        const obj = {};
        obj[x] = (datas.allContentfulCode.edges.filter(y => y.node.createdDate.match(x))).length;
        return obj;
    });
    return (
        <div className={Style.archive_wrap}>
            <Container className={Style.content}>
                <Row>
                <Col>
                    <h3>Archive</h3>
                    <ui>
                        {count.map((x) =>
                            <li> {`${Object.keys(x) + ' (' + x[Object.keys(x)] + ')'}`} </li>
                        )}
                    </ui>
                </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Archive