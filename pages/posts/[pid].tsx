import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import constants from '../../lib/constants'
import { useState, useEffect, useLayoutEffect } from 'react'
import { Col, CardGroup, Card } from 'react-bootstrap'

const Post = () => {
  const [post, setPost] = useState({});
  const router = useRouter()
  const { pid } = router.query;

  useLayoutEffect(() => {
    const state: any = sessionStorage.getItem('postState') || null
    setPost(JSON.parse(state));
  }, [])

  return <>

    <Col >
      <CardGroup className={`post-item`}>
        <Card className={`post-item`}>
          <Card.Body >
            <Card.Img variant="top" src={post.image_url} />
            <Card.Title className="h6">
              {(post.name) ? post.name : null}
            </Card.Title>
            <Card.Text>
              {post.description}
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
    </Col>
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