import React, { useState, useEffect } from "react";
import { ListGroup, Card } from "react-bootstrap";
import { MoreVert } from "@material-ui/icons";
import { format } from "timeago.js";
import axios from "axios";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const postTopStyle = {
  fontSize: "20px",
  margin: "0 10px",
};

export default function Post({ post, userId }) {
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const { sourcePath } = useAuth();

  const imageExists = (image_url) => {
    var http = new XMLHttpRequest();

    http.open("HEAD", image_url, false);
    http.send();

    return http.status !== 404;
  };

  useEffect(() => {
    setIsLiked(post.likes.includes(userId));
  }, [userId, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const resp = await axios.get(`/user?userId=${post.userId}`);
      setUser(resp["data"]);
    };

    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put(`post/${post._id}/like`, {
        userId: userId,
      });
    } catch (e) {}

    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  return (
    <React.Fragment>
      <Card
        style={{
          width: "100",
          margin: "1.5vh 1.5vw",
          position: "sticky",
          boxShadow: "2px 0px 19px 0px rgba(50, 50, 50, 0.65)",
          border: "2px solid lightblue",
        }}
      >
        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex" variant="">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture !== ""
                    ? user.profilePicture
                    : sourcePath + "person/default.png"
                }
                className="d-inline-block align-top"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt="User logo"
              />
            </Link>
            <span style={{ ...postTopStyle, fontWeight: "500" }}>
              {user.username}
            </span>
            <span
              style={{
                ...postTopStyle,
                fontSize: "15px",
                paddingTop: "5px",
                color: "gray",
              }}
            >
              {format(post.createdAt)}
            </span>
            <MoreVert style={{ marginLeft: "auto" }} />
          </ListGroup.Item>

          <ListGroup.Item
            className="d-flex flex-column"
            style={{ fontSize: "15px", fontWeight: "500" }}
          >
            <span>{post.desc ? post.desc : ""}</span>
            <Card.Img
              src={
                post.img === ""
                  ? null
                  : imageExists(post.img)
                  ? post.img
                  : sourcePath + "NoImage.jpg"
              }
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "1%",
                objectFit: "contain",
              }}
            />
          </ListGroup.Item>

          <ListGroup.Item
            variant="info"
            className="d-flex justify-content-between"
            style={{ fontSize: "15px", fontWeight: "500" }}
          >
            <img
              src={
                isLiked ? sourcePath + "dislike.png" : sourcePath + "like.png"
              }
              style={{
                width: "24px",
                height: "24px",
                cursor: "pointer",
              }}
              alt="like button"
              onClick={() => likeHandler()}
            />
            <span>{likes} people like it</span>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </React.Fragment>
  );
}
