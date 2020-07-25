import React from "react"
import Layout from "../components/layout"
import { graphql, useStaticQuery } from "gatsby"
import { Container, Col, Row, Card, Button } from "react-bootstrap"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query{
      allContentfulBlogPost(sort:{fields:createdDate,order: DESC},
        limit: 2
        skip: 0
        ){
        edges{
          node{
            title
            slug
            createdDate(formatString:"YYYY/MM/DD")
            thumbnail{
              fluid{
                src
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={8}>
            {data.allContentfulBlogPost.edges.map((edge, index) => (
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
                  <Button variant="primary" href="/gatsby">Go To</Button>
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col xs={3}>
            <div >
              <p>profile</p>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout >
  )
}

export default IndexPage
