import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import Profile from "../components/profile"
import Img from "gatsby-image"
import Archive from "../components/archive"

export const query = graphql`
  query($skip: Int!, $limit: Int!, $currentYearMonth: Date!, $nextYearMonth: Date!){
    allContentfulCode(
      sort: {fields: createdDate, order: DESC},
      limit: $limit,
      skip: $skip,
      filter:  {createdDate :
        {
          lt: $nextYearMonth,
          gte: $currentYearMonth
        }
      }
      ){
      edges {
        node {
          title
          slug
          category {
            category
            categorySlug
            id
          }
          description {
            content {
              content {
                value
              }
            }
          }
          createdDate(formatString: "YYYY/MM/DD")
          thumbnail{
            fluid(maxWidth: 500) {
              src
              ...GatsbyContentfulFluid_withWebp
            }
            description
          }
        }
      }
    }
  }
`

function ArchiveTemplate(props) {
  console.log(props.data.allContentfulCode);
  return (
    <Layout>
      <Container fluid >
        <Row className="justify-content-md-center">
          <Col xs={7} className="mt-3" style={{ borderBottom: "3px solid grey" }} >
            <h1 className="m-3">{`${props.pageContext.currentYearMonth}`}</h1>
          </Col>
          <Col xs={3} >
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={7} style={{ padding: "20px", textAlign: "center" }} className="mt-3" >
            {props.data.allContentfulCode.edges.map((edge, index) => (
              <Card className="m-5">
                <Card.Body>
                  <Card.Text>
                    <Link to={`/code/${edge.node.category[0].categorySlug}/${edge.node.slug}`}>
                      <h3>{edge.node.title}</h3>
                    </Link>
                    {edge.node.category.map(x => (
                      <li className={x.categorySlug} key={x.id} style={{ listStyleType: "none" }}>
                        <Link to={`/code/${x.categorySlug}/`}>＃{x.category}</Link>
                      </li>
                    ))}
                  </Card.Text>
                </Card.Body>
                <figure>
                  <Link to={`/code/${edge.node.category[0].categorySlug}/${edge.node.slug}`}>
                    <Img
                      fluid={edge.node.thumbnail.fluid}
                      alt={edge.node.thumbnail.description}
                      style={{ height: "300px" }}
                    />
                  </Link>
                </figure>
                <Card.Body>
                  <Card.Text>
                    {edge.node.description.content[0].content[0].value}
                  </Card.Text>
                  <Button variant="outline-secondary" href={`/code/${edge.node.category[0].categorySlug}/${edge.node.slug}`}>See More</Button>
                </Card.Body>
                <Card.Footer className="text-muted">作成日 {edge.node.createdDate}</Card.Footer>
              </Card>
            ))}
            <div>
              {!props.pageContext.isFirst && (
                <div className="text-left" style={{ display: "inline" }}>
                  <Link
                    to={
                      props.pageContext.currentPage === 2
                        ? `/${props.pageContext.currentYear}/${props.pageContext.currentMonth}/`
                        : `/${props.pageContext.currentYear}/${props.pageContext.currentMonth}/${props.pageContext.currentPage - 1}`
                    }
                    rel='prev'>
                    <span className="m-5">前のページ </span>
                  </Link>
                </div>
              )}
              {!props.pageContext.isLast && (
                <div className="text-right" style={{ display: "inline" }}>
                  <Link to={`/${props.pageContext.currentYear}/${props.pageContext.currentMonth}/${props.pageContext.currentPage + 1}/`} rel='next'>
                    <span className="m-5">次のページ</span>
                  </Link>
                </div>
              )}
            </div>
          </Col>
          <Col xs={3}>
            <Profile />
            <Archive />
          </Col>
        </Row>
      </Container>
    </Layout >
  )
}

export default ArchiveTemplate
