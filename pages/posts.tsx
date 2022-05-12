import constants from "../lib/constants";
import Layout from '../components/layout'
import { useState, useEffect, useMemo } from "react";
import { Container, Row, Card, Col, Button } from 'react-bootstrap'
import { CardGroup } from "react-bootstrap";
import Pagination from "../components/features/Pagination/Pagination";
import Link from "next/link";

const Posts = (props:any) => {
    console.log(process.env.API_URI+"/assets?format=json",props);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        constants.client.get("assets?format=json").then((response) => {
            setPosts(response.data.assets);
        });
    }, []);

    const renderPosts = (posts: any) => {
       
        posts = posts.filter((item: any) => item.name);
                
        const firstPageIndex = (currentPage - 1) * constants.offset;
        let postRows =  posts.slice(firstPageIndex, firstPageIndex + constants.offset);
         // array of N elements, where N is the number of rows needed
        const rows = [...Array(Math.ceil(postRows.length / 4))];
        // chunk the posts into the array of rows
         postRows = rows.map((row, idx) => postRows.slice(idx * 4, idx * 4 + 4));

         const setPostObj = (item:any)=>{
            console.log(item);
            sessionStorage.setItem('postState',  JSON.stringify(item));
         }

        return postRows.map((row:any, idx:any) => (
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
                                    <Button onClick={setPostObj(item)}   variant="primary" href={`/posts/${item.id}`}>Read More</Button>
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



Posts.getInitialProps = async (ctx:any) => {
    console.log(process.env.API_URI+"/assets?format=json");
  //  let res = await fetch(process.env.API_URI+"/assets?format=json");
  const resp = await fetch(
    process.env.API_URI+"/assets?format=json",
    {
        headers: {
            'User-Agent': '*',
        }, //this is required by api provider
    }
);

//console.log('states in getStaticProps : ', data);


 
    return {
        data: {
            title: 'Article Management',
            list: JSON.parse(JSON.stringify(resp))
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

