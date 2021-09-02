import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import "./rightbar.css";
import { useAuth } from "../../context/AuthContext";

const cardStyle = {
  width: "100",
  margin: "1.5vh 1.5vw",
  position: "sticky",
};

export default function Rightbar({ user }) {
  const [friends, setFriends] = useState([]);
  const { sourcePath } = useAuth();

  useEffect(() => {
    const getFriends = async () => {
      const resp = await axios.get("/user/friends/" + user._id);
      setFriends(resp["data"]);
    };
    getFriends();
  }, [user]);

  return (
    <div class="rightbar">
      <Card style={cardStyle}>
        <Card.Img
          src={sourcePath + "ad.jpg"}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "1%",
            objectFit: "contain",
          }}
        />
      </Card>
      <Card style={cardStyle}>
        <Card.Img
          src={sourcePath + "ad.jpg"}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "1%",
            objectFit: "contain",
          }}
        />
      </Card>

      <div style={{ width: "100", margin: "1.5vh 1.5vw", position: "sticky" }}>
        <h3>Friends</h3>
        <ul>
          {friends.map((u) => {
            return <Friends key={u._id} user={u} />;
          })}
        </ul>
      </div>
    </div>
  );
}

function Friends({ user }) {
  const { sourcePath } = useAuth();

  return (
    <li
      style={{
        display: "flex",
        marginBottom: "15px",
        alignItems: "center",
      }}
    >
      <Link to={`/profile/${user.username}`} style={{ textDecoration: "none" }}>
        <img
          src={
            user.profilePicture !== ""
              ? user.profilePicture
              : sourcePath + "person/default.png"
          }
          alt="img"
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "20%",
            objectFill: "contain",
            marginRight: "10px",
          }}
        />
        {user.username}
      </Link>
    </li>
  );
}
