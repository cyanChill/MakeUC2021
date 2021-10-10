import React, { useState, useEffect } from "react";
import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";
import { Container, Col, Row } from "react-bootstrap";
import { GoVerified, GoUnverified } from "react-icons/go";

import EventCard from "../components/EventCard";

const Profile = () => {
  const { user } = useAuth0();
  const { name, picture, email_verified: verified } = user;
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/userevents/${user.sub}`)
      .then((response) => {
        setUserEvents(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <Row className="align-items-center profile-header mb-5 text-center text-md-lft">
        <Col md={2}>
          <img
            src={picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>
            <span className="px-2">{name}</span>
            {verified ? <GoVerified /> : <GoUnverified />}
          </h2>
        </Col>
      </Row>
      {userEvents.map((event) => {
        return <EventCard key={event.eventId} info={event} edit={true} />;
      })}
    </Container>
  );
};

export default Profile;
