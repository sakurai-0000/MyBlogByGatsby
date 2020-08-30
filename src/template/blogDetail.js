import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import { Container, Button, Row, Col } from 'react-bootstrap'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Style from '../components/layout.module.scss'
import ContentfulImage from "../utils/useContentfulImage"
import Img from "gatsby-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faFolderOpen } from "@fortawesome/free-regular-svg-icons"
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faCheck,
  faKey
} from "@fortawesome/free-solid-svg-icons"


export const query = graphql`
query ($slug: String!) {
    contentfulCode(slug: {eq: $slug}) {
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
let cnt = 0;
function BlogDetail(props) {
  let links = [];
  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => (
        < h1 className="heading1" > {children}</h1 >
      ),
      [BLOCKS.HEADING_2]: (node, children) => {
        links.push(
          {
            id: `link${cnt}`,
            text: children
          })
        return <h2
          id={`link${cnt}`}
          style={{
            background: "#f7f7f7",
            padding: "20px 15px 18px",
            color: "#333",
            borderLeft: "9px solid #4865b2",
            lineHeight: "40px",
          }}
        >
          {children}
        </h2>
      },
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="heading3">
          <FontAwesomeIcon icon={faKey} />
          {children}
        </h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        < h4 className="heading4">
          <FontAwesomeIcon icon={faCheck} /> {children}
        </h4>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node) => (
        < Img
          fluid={ContentfulImage(node.data.target.fields.file["en-US"].url)}
          alt={
            node.data.target.fields.description
              ? node.data.target.fields.description['en-US']
              : node.data.target.fields.title['en-US']
          }
        />
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol
          className="ollist"
          style={{
          //   backgroundColor: "#f8f9ff",
          //   border: "dashed 1px #4865b2",
          //   // marginLeft: "40px",
          //   paddingTop: "20px",
          //   paddingBottom: "28px",
          //   paddingRight: "10px",
          //   counterReset: "item",
          }}
        >
          {children}
        </ol>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul
          className="ullist"
          style={{
            // backgroundColor: "#f8f9ff",
            // border: "dashed 1px #4865b2",
            // // marginLeft: "40px",
            // paddingTop: "40px",
            // paddingBottom: "36px",
            // paddingRight: "10px",
          }}
        >
          {children}
        </ul>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p
          className="paragraph"
          style={{
            // margin: "0",
            // paddingTop: "40px",
            // paddingBottom: "36px",
            // paddingRight: "10px",
          }}
        >
          {children}
        </p>
      ),
    },
    renderText: text => {
      return text.split('\n').reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      }, []);
    },
    renderMark: {
      [MARKS.CODE]: text => {
        return <div className={Style.gatsbyHighlight}>
          <pre class="language-">
            <code class="language-">
              {text}
            </code>
          </pre>
        </div>
      }
    },
  }
  return (
    <Layout>
      <div className={Style.code_wrap}>
        <Container>
          <Row>
            <Col className={Style.title}>
              <h1>{props.data.contentfulCode.title}</h1>
            </Col>
          </Row>
          <Row>
            <Col className={Style.date}>
              <time dateTime={props.data.contentfulCode.createdDate}>
                <FontAwesomeIcon icon={faClock} /> 作成日：{props.data.contentfulCode.createdDateJP}
              </time>
            </Col>
            <Col className={Style.category}>
              <li><Link to={`/`}> <FontAwesomeIcon icon={faFolderOpen} /> HOME</Link></li>
              {props.data.contentfulCode.category.map(x => (
                <li className={x.categorySlug} key={x.id}>
                  <Link to={`/code/${x.categorySlug}/`}><FontAwesomeIcon icon={faFolderOpen} /> {x.category}</Link>
                </li>
              ))}
            </Col>
          </Row>
        </Container>
        <Container fluid style={{ padding: "30px" }}>
          <Row >
            <Col ></Col>
            <Col xs={8}>
              {documentToReactComponents(props.data.contentfulCode.body.json, options)}
            </Col>
            <Col >
              <Sidebar title={props.data.contentfulCode.title} links={links} />
            </Col>
          </Row>
        </Container>
        <Container className="text-center">
          <Button href="/" variant="outline-secondary">HOME</Button>
        </Container>
        <Container className="text-center">
          <Row>
            {props.pageContext.next && (
              <Col className="text-left">
                <Link to={`/code/${props.pageContext.next.category[0].categorySlug}/${props.pageContext.next.slug}`} rel='prev'>
                  <FontAwesomeIcon icon={faArrowAltCircleLeft} /> <span>{`${props.pageContext.next.title}`}</span>
                </Link>
              </Col>
            )}
            {props.pageContext.previous && (
              <Col className="text-right">
                <Link to={`/code/${props.pageContext.previous.category[0].categorySlug}/${props.pageContext.previous.slug}`} rel='next'>
                  <span>{props.pageContext.previous.title}</span> <FontAwesomeIcon icon={faArrowAltCircleRight} />
                </Link>
              </Col>
            )}
          </Row>
        </Container>
      </div>
    </Layout>
  )
}

export default BlogDetail
