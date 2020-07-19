import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import { Container, Row, Col} from "react-bootstrap"
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
          <Row>
            {data.allContentfulBlogPost.edges.map((edge, index) => (
              <Col sm={4} key={index}>
                <BlogItem
                  title={edge.node.title}
                  date={edge.node.createdDate}
                  src={edge.node.thumbnail.fluid.src}
                  link={`/blog/${edge.node.slug}`}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </Layout >
  )
}

export default IndexPage
