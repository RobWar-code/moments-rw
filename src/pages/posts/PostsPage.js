import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import Asset from "../../components/Asset"
import NoResults from "../../assets/no-results.png"
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

function PostsPage({message, filter=""}) {
  const [posts, setPosts] = useState({results: []});
  const [hasLoaded, setHasLoaded] = useState(false);
  // This enables us to track the url page
  // Bearing in mind that we may have got here from /feed or /liked
  const {pathname} = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const {data} = await axiosReq.get(`/posts/?${filter}search=${query}`);
        console.log(data);
        setPosts({results: data});
        setHasLoaded(true);
      }
      catch (err) {
        console.log(err);
      }
    }

    setHasLoaded(false);

    // This inserts a delay so that the screen does not flicker during typing
    const timer = setTimeout(() => {fetchPosts()}, 1000);
    return () => {clearTimeout(timer)}
    
    // Note that we execute this when either of filter or pathname changes
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form className={styles.SearchBar} onSubmit={(event) => {event.preventDefault()}}>
          <Form.Control 
            type="text" 
            className="mr-sm-2" 
            placeholder="Search Posts" 
            value={query} 
            onChange={event => setQuery(event.target.value)}
          />
        </Form>
        { hasLoaded ? (
            <>
            { posts.results.length ? (
              // Note the !!posts.next which converts a truthy value to a boolean
              <InfiniteScroll children={
                  posts.results.map((post) => (
                    <Post key={post.id} {...post} setPosts={setPosts} />
                  ))
                }
                dataLength={posts.results.length}
                loader={<Asset spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
            ) : (
              <Container>
                <Asset src={NoResults} message={message} />
              </Container>
            )
            }
            </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default PostsPage;