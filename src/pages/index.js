import React from "react"
import Layout from "../components/layout"
import { graphql, useStaticQuery, Link } from "gatsby"
import { Container, Col, Row, Card, Button } from "react-bootstrap"
import Profile from "../components/profile"
import Archive from "../components/archive"
import Img from "gatsby-image"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query{
      allContentfulCode(sort:{fields:createdDate,order: DESC},
        limit: 5
        skip: 0
        ){
        edges{
          node{
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
            createdDate(formatString:"YYYY/MM/DD")
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
  `)

  return (
    <Layout>
      <Container fluid style={{ backgroundColor: "#EEEEEE" }} >
        <Row className="justify-content-md-center">
          <Col xs={7} className="mt-3" style={{ borderBottom: "3px solid grey" }} >
            <h1 className="m-3">Latest</h1>
          </Col>
          <Col xs={3} >
          </Col>
        </Row>
        <Row className="justify-content-md-center" style={{ marginTop: "1.2em" }}>
          <Col xs={7} style={{ padding: "20px", textAlign: "center" }} className="mt-3">
            {data.allContentfulCode.edges.map((edge, index) => (
              <Card className="m-3">
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
                  <figure>
                    <Link to={`/code/${edge.node.category[0].categorySlug}/${edge.node.slug}`}>
                      <Img
                        fluid={edge.node.thumbnail.fluid}
                        alt={edge.node.thumbnail.description}
                        style={{ height: "300px" }}
                      />
                    </Link>
                  </figure>
                  <Card.Text>
                    {edge.node.description.content[0].content[0].value}
                  </Card.Text>
                  <Button variant="outline-secondary" href={`/code/${edge.node.category[0].categorySlug}/${edge.node.slug}`}>See More</Button>
                </Card.Body>
                <Card.Footer className="text-muted">作成日 {edge.node.createdDate}</Card.Footer>
              </Card>
            ))}
          </Col>
          <Col xs={3}>
            <Profile />
            <Archive/>
          </Col>
        </Row>
      </Container>
    </Layout >
  )
}

export default IndexPage
