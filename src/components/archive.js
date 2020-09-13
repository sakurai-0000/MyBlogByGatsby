import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby'
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
                            {count.map((x, index) => {
                                if (x[Object.keys(x)] === 0) return false;
                                return <li key={index}><Link to={`/${Object.keys(x)}`}>{`${Object.keys(x) + ' (' + x[Object.keys(x)] + ')'}`} </Link> </li>
                            }
                            )}
                        </ui>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Archive