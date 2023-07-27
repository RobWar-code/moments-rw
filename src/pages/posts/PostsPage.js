import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function PostsPage({message, filter=""}) {
  const [posts, setPosts] = useState({results: []});
  const [hasLoaded, setHasLoaded] = useState(false);
  // This enables us to track the url page
  // Bearing in mind that we may have got here from /feed or /liked
  const {pathname} = useLocation();
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [{ data: posts }] = await axiosReq.get(`/posts/?${filter}`);
        setPosts({results: [posts]});
        console.log(posts.results)
        setHasLoaded(true);
      }
      catch (err) {
        console.log(err);
      }
    }

    setHasLoaded(false);
    fetchPosts();
    // Note that we execute this when either of filter or pathname changes
  }, [filter, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        { hasLoaded ? (
            <>
            { posts.results.length ? (
              console.log("Got posts for display")
            ) : (
              console.log("No posts found")
            )
            }
            </>
        ) : (
          console.log('Show loading spinner')
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default PostsPage;