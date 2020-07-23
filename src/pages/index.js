import React from "react"
import Layout from "../components/layout"
import { graphql, useStaticQuery } from "gatsby"
import { Container, Col, Row, Card, Button } from "react-bootstrap"

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
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={7}>
            {data.allContentfulBlogPost.edges.map((edge, index) => (
              // <Col sm={12} >
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
              // </Col>
            ))}
            {/* <Card className="mt-5">
              <Card.Header>静的サイト作成備忘録</Card.Header>
              <Card.Body>
                <Card.Title>Gatsby学習記録</Card.Title>
                <Card.Text>
                  静的サイトジェネレーターとして知られるGatsbyを用いて、個人ブログを作成した。また、SQL言語であるGraphqlや、データ保管にHeadlessCMSのContentfulを用いた。それらの備忘録をまとめる。
              </Card.Text>
              <Card.Img variant="bottom" src="../images/Matsuda_Konoka.png" />
                <Button variant="primary" href="/gatsby">Go To</Button>
              </Card.Body>
              <Card.Footer className="text-muted">Created by 2020/07/10</Card.Footer>
            </Card>
            <Card className="mt-5">
              <Card.Header>開発履歴</Card.Header>
              <Card.Body>
                <Card.Title>個人開発一覧</Card.Title>
                <Card.Text>
                  これまでに作成したガラクタの一覧。
              </Card.Text>
                <Button variant="primary" href="/gatsby">Go To</Button>
              </Card.Body>
              <Card.Footer className="text-muted">Created by 2020/07/13</Card.Footer>
            </Card>
            <Card className="mt-5">
              <Card.Header>SampleCard</Card.Header>
              <Card.Body>
                <Card.Title>SampleTitle</Card.Title>
                <Card.Text>
                  SampleText
              </Card.Text>
                <Button variant="primary" href="/gatsby">Go To</Button>
              </Card.Body>
              <Card.Footer className="text-muted">Created by 2020/07/21</Card.Footer>
            </Card> */}
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
