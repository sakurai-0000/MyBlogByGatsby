import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import { Container, Button, Row, Col } from 'react-bootstrap'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export const query = graphql`
query ($slug: String!) {
    contentfulBlogPost(slug: {eq: $slug}) {
      title
      createdDateJP:createdDate(formatString: "YYYY年MM月DD日")
      createdDate
      body {
        json
      }
      category {
        category
        categorySlug
        id
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
          {
            id: children[0].split('_')[0],
            text: children[0].split('_')[1]
          })
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
      <Container fluid style={{ padding: "30px" }}>
        <Row >
          <Col ></Col>
          <Col xs={8}>
            <h1>{props.data.contentfulBlogPost.title}</h1>
            <aside className="info">
              <time dateTime={props.data.contentfulBlogPost.createdDate}>
                {props.data.contentfulBlogPost.createdDateJP}
              </time>
            </aside>
            <ul>
              {props.data.contentfulBlogPost.category.map(x => (
                <li className={x.categorySlug} key={x.id}>
                  <Link to={`code/${x.categorySlug}/`}>{x.category}</Link>
                </li>
              ))}
            </ul>
            {documentToReactComponents(props.data.contentfulBlogPost.body.json, options)}
          </Col>
          <Col >
            <Sidebar title={props.data.contentfulBlogPost.title} links={links} />
          </Col>
        </Row>
      </Container>
      <Container className="text-center">
        <Button href="/" variant="outline-info">一覧へ戻る</Button>
      </Container>

      <ul className="postlink">
        {props.pageContext.next && (
          <li className="prev">
            <Link to={`/blog/${props.pageContext.next.slug}`} rel='prev'>
              <span>{props.pageContext.next.title} </span>
            </Link>
          </li>
        )}
        {props.pageContext.previous && (
          <li className="next">
            <Link to={`/blog/${props.pageContext.previous.slug}`} rel='next'>
              <span>{props.pageContext.previous.title} </span>
            </Link>
          </li>
        )}
      </ul>
    </Layout>
  )
}

export default BlogDetail
