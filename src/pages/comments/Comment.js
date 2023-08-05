import React from 'react'
import styles from '../../styles/Comment.module.css'
import Avatar from '../../components/Avatar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Media } from 'react-bootstrap';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { MoreDropdown } from '../../components/MoreDropdown';
import { axiosRes } from '../../api/axiosDefaults';

const Comment = (props) => {
  const {
    owner,
    content,
    profile_image,
    profile_id,
    updated_at,
    id,
    setPost,
    setComments
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}`);
      setPost(prevPost => ({ results: [{
        ...prevPost.results[0], 
        comments_count: prevPost.results[0].comments_count - 1
      }]}))
      setComments(prevComments => ({
        ...prevComments, results: prevComments.results.filter((comment) => comment.id !== id
        )
      }))
    }
    catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
        <Media>
            <Link to={`/profile/${profile_id}`}>
                <Avatar src={profile_image} />
            </Link>
            <Media.Body>
                <span className={styles.Owner}>{owner} </span>
                <span className={styles.date}>{updated_at}</span>
                <p>{content}</p>
            </Media.Body>
            { is_owner && (
              <MoreDropdown handleEdit={() => {}} handleDelete={handleDelete} />
            )}
        </Media>
    </div>
  )
}

export default Comment