import React from 'react'
import styles from '../../styles/Comment.module.css'
import Avatar from '../../components/Avatar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Media } from 'react-bootstrap';

const Comment = (props) => {
  const {
    owner,
    content,
    profile_image,
    profile_id,
    updated_at
  } = props;
  console.log(props);
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
        </Media>
    </div>
  )
}

export default Comment