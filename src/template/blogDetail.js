import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Sidebar from '../components/linkInBlogItem'
import { Container, Button, Row, Col } from 'react-bootstrap'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export const query = graphql`
  query($slug: String!){
    contentfulBlogPost(slug: {eq: $slug}){
      title
      createdDate
      body{
        json
      }
    }
  }
`
function BlogDetail(props) {
  let links = [];
  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="heading1">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className={children}>{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="heading3">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => {
        links.push(
          {id: children[0].split('_')[0],
           text: children[0].split('_')[1]})
        return <h4 id={children[0].split('_')[0]}>{children[0].split('_')[1]}</h4>
      },
      "embedded-asset-block": (node) => {
        return (<img
          width="100%"
          src={node.data.target.fields.file['en-US'].url}
          alt={node.data.target.fields.title['en-US']} />)
      }
    }
  }
  return (
    <Layout>
      <Container style={{ maxWidth: "auto" }} className="pt-4">
        <Row>
          <Col>
            <h1>{props.data.contentfulBlogPost.title}</h1>
            {/* <p>{props.data.contentfulBlogPost.createdDate}</p> */}
            {documentToReactComponents(props.data.contentfulBlogPost.body.json, options)}
          </Col>
          <Col>
            <Container>
              <Sidebar title={props.data.contentfulBlogPost.title} links={links}/>
            </Container>
          </Col>
        </Row>
      </Container>
      <Container className="text-center">
        <Button href="/" variant="outline-info">一覧へ戻る</Button>
      </Container>
    </Layout>
  )
}

export default BlogDetail
