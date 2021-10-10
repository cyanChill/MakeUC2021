import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import axios from "axios";

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/events/")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h2>Events:</h2>
      {events.map((event) => {
        return <EventCard key={event.eventId} info={event} />;
      })}
    </>
  );
};

export default Home;
