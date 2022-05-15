import constants from "../lib/constants";
import Layout from '../components/layout'
import { useState, useEffect, useMemo } from "react";
import { Container, Row, Card, Col, Button } from 'react-bootstrap'
import { CardGroup } from "react-bootstrap";
import Pagination from "../components/features/Pagination/Pagination";
import Loader from "../components/features/Loader/Loader.feature";
import Link from "next/link";

const Posts = (props: any) => {
    console.log(process.env.API_URI + "/assets?format=json", props);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        constants.client.get("assets?format=json").then((response) => {
            setPosts(response.data.assets);
            setLoading(false);
        });
    }, []);

    const renderPosts = (posts: any) => {

        posts = posts.filter((item: any) => item.name);

        const firstPageIndex = (currentPage - 1) * constants.offset;
        let postRows = posts.slice(firstPageIndex, firstPageIndex + constants.offset);
        // array of N elements, where N is the number of rows needed
        const rows = [...Array(Math.ceil(postRows.length / 4))];
        // chunk the posts into the array of rows
        postRows = rows.map((row, idx) => postRows.slice(idx * 4, idx * 4 + 4));

        const setPostObj = (event: any, item: any) => {
            console.log(item);
            sessionStorage.setItem('postState', JSON.stringify(item));
        }

        return (loading) ? <Loader /> : postRows.map((row: any, idx: any) => (

            <Row className="g-2 mb-2" key={idx}>
                {row.map((item: any) =>
                    <Col xs={12} lg={3} className={`mr-3`} key={item.id}>
                        <CardGroup className={`post-item`}>
                            <Card className={`post-item`}>
                                <Card.Body >
                                    <Card.Img variant="top" src={item.image_url} />
                                    <Card.Title className="h6">
                                        {item.name}
                                    </Card.Title>
                                    <Card.Text>
                                        {constants.truncate(item.description, 50)}
                                    </Card.Text>
                                    <Link href={`/posts/${item.id}`}>
                                        <a onClick={(e) => setPostObj(e, item)}>Read More</a>
                                    </Link>
                                </Card.Body>

                            </Card>
                        </CardGroup>
                    </Col>
                )}
            </Row>)
        );
    }

    return <>
        <Container>
            {renderPosts(posts)}
            <Pagination
                className="pagination-container"
                currentPage={currentPage}
                totalCount={posts.length}
                pageSize={constants.offset}
                onPageChange={(page: any) => setCurrentPage(page)}
            />
        </Container>
    </>;

}


Posts.getInitialProps = async () => {
    return {
        data: {
            title: 'Article Management'
        }
    }
}

export default Posts;

Posts.getLayout = function getLayout(page: any) {
    const { props } = page

    return (
        <Layout data={props.data}>
            {page}
        </Layout>
    )
}

