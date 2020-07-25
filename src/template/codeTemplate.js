import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import Style from '../components/layout.module.scss'

export const query = graphql`
  query($codeId: String!, $skip: Int!, $limit: Int!){
    allContentfulBlogPost(
      sort: {fields: createdDate, order: DESC},
      limit: $limit,
      skip: $skip,
      filter: {category:
        {elemMatch: {id: {eq: $codeId}}}}
      ){
      edges {
        node {
          title
          slug
          createdDate(formatString: "YYYY/MM/DD")
          thumbnail {
            fluid {
              src
            }
          }
        }
      }
    }
  }
`


function CodeTemplate(props) {
  console.log(props.pageContext);
  return (
    <Layout>
      <div className={Style.wrap}>
      <h1 className="bar">CATEGORY: {props.pageContext.codeName}</h1>
        <Container>
          <Row>
            {props.data.allContentfulBlogPost.edges.map((edge, index) => (
              <Col sm={12} >
                <Card className="m-5">
                  <Card.Body>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk
                      of the card's content.
                </Card.Text>
                  </Card.Body>
                  <Card.Img variant="bottom" src={edge.node.thumbnail.fluid.src} />
                  <Card.Body>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk
                      of the card's content.
                </Card.Text>
                  </Card.Body>
                  <Button variant="primary" href={`/blog/${edge.node.slug}`}>Go To</Button>
                </Card>
              </Col>
            ))}
          </Row>
          <ul className="pagenation">
            {!props.pageContext.isFirst && (
              <li className="prev">
                <Link
                  to={
                    props.pageContext.currentPage === 2
                      ? `/code/${props.pageContext.codeSlug}/`
                      : `/code/${props.pageContext.codeSlug}/${props.pageContext.currentPage - 1}`
                  }
                  rel='prev'>
                  <span>前のページ </span>
                </Link>
              </li>
            )}
            {!props.pageContext.isLast && (
              <li className="next">
                <Link to={`/code/${props.pageContext.codeSlug}/${props.pageContext.currentPage + 1}/`} rel='next'>
                  <span>次のページ</span>
                </Link>
              </li>
            )}
          </ul>
        </Container>
      </div>
    </Layout >
  )
}

export default CodeTemplate
