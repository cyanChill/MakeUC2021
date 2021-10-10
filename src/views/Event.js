import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { formatDate } from "../helpers/utility";

const Event = ({ match }) => {
  const [eventInfo, setEventInfo] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/event/${match.params.id}`)
      .then((response) => {
        setEventInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title>{eventInfo.eventName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {eventInfo.location
            ? `${eventInfo.locationSetting} | ${eventInfo.location}`
            : `${eventInfo.locationSetting}`}{" "}
          @ {formatDate(eventInfo.startDate)} - {formatDate(eventInfo.endDate)}
        </Card.Subtitle>
        <Card.Subtitle style={{ color: "red" }}>
          Masks: {eventInfo.masks ? "Required" : "Not Required"}
        </Card.Subtitle>
        <Card.Text>{eventInfo.eventDescription}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted text-end">
          {`Organized By: ${eventInfo.organizerName}`}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default Event;
