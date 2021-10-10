import React, { useState, useEffect } from "react";
import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";
import { Container, Col, Row, ButtonGroup, ToggleButton } from "react-bootstrap";
import { GoVerified, GoUnverified } from "react-icons/go";

import EventCard from "../components/EventCard";

const Profile = () => {
  const { user } = useAuth0();
  const { name, picture, email_verified: verified } = user;
  const [userEvents, setUserEvents] = useState([]);
  const [selectedView, setSelectedView] = useState(1);

  const radios = [
    { name: "Current", value: 1 },
    { name: "Past", value: 2 },
  ];

  useEffect(() => {
    const dataFilter = radios.filter((type) => type.value === parseInt(selectedView));

    axios
      .get(`http://localhost:5000/userevents/${user.sub}/${dataFilter[0].name.toLowerCase()}`)
      .then((response) => {
        setUserEvents(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedView]);

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
      <h2 className="mb-3">My Events:</h2>
      <ButtonGroup className="btnGroup">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? "outline-secondary" : "outline-primary"}
            name="radio"
            value={radio.value}
            checked={selectedView === parseInt(radio.value)}
            onChange={(e) => setSelectedView(parseInt(e.target.value))}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>

      {userEvents.map((event) => {
        return (
          <EventCard key={event.eventId} info={event} edit={selectedView === 1 ? true : false} />
        );
      })}
    </Container>
  );
};

export default Profile;
