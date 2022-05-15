import Layout from '../../components/layout'
import { useState, useLayoutEffect } from 'react'
import { Col, Card, Row, Image, Stack } from 'react-bootstrap'

const Post = () => {
  const [post, setPost] = useState({ name: '', image_url: '', description: '' });

  useLayoutEffect(() => {
    const state: any = sessionStorage.getItem('postState') || null
    setPost(JSON.parse(state));
  }, [])

  return <>
    <Stack gap={3}>
      <Row>
        <Col>
          <Image
            alt={post.name}
            src={post.image_url}
            className='contain'
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card.Title> {(post.name) ? post.name : null}</Card.Title>

        </Col>
      </Row>
      <Row>
        <Col>
          <Card.Text>
            {post.description}
          </Card.Text>

        </Col>
      </Row>
    </Stack>
  </>
}




Post.getInitialProps = () => {
  return {
    data: {
      title: 'Single Post'
    }
  }
}

Post.getLayout = function getLayout(page: any) {
  console.log(page);
  const { props } = page
  return (
    <Layout data={props.data}>
      {page}
    </Layout>
  )
}
export default Post