import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import { Container, Row, Col, Card} from "react-bootstrap"
import BlogItem from '../components/blogItem'
import Style from './index.module.scss'

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query{
      allContentfulBlogPost(sort:{
        fields:createdDate,
        order: DESC
      }){
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
      <div className={Style.wrap}>
        <Container>
          {/* <Row>
            {data.allContentfulBlogPost.edges.map((edge, index) => (
              <Col sm={12} key={index}>
                <BlogItem
                  title={edge.node.title}
                  date={edge.node.createdDate}
                  src={edge.node.thumbnail.fluid.src}
                  link={`/blog/${edge.node.slug}`}
                />
              </Col>
            ))}
          </Row> */}
          <Row>
          {data.allContentfulBlogPost.edges.map((edge, index) => (
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
              </Card>
            </Col>
            ))}
          </Row>
        </Container>
      </div>
    </Layout >
  )
}

export default IndexPage
