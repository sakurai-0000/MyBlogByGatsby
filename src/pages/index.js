import React from "react"
import Layout from "../components/layout"
import { Container, Card, Button } from "react-bootstrap"

const IndexPage = () => {
  return (
    <Layout>
        <Container >
          <Card className="mt-5">
            <Card.Header>静的サイト作成備忘録</Card.Header>
            <Card.Body>
              <Card.Title>Gatsby学習記録</Card.Title>
              <Card.Text>
                静的サイトジェネレーターとして知られるGatsbyを用いて、個人ブログを作成した。また、SQL言語であるGraphqlや、データ保管にHeadlessCMSのContentfulを用いた。それらの備忘録をまとめる。
              </Card.Text>
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
          </Card>
        </Container>
    </Layout >
  )
}

export default IndexPage
