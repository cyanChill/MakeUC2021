import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const EventForm = ({ eventInfo }) => {
  const [validated, setValidated] = useState(false);

  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [locationSetting, setLocationSetting] = useState("Virtual");
  const [location, setLocation] = useState("");
  const [masks, setMasks] = useState(true);
  const [eventId, setEventId] = useState(uuidv4());
  const [submitDate, setSubmitDate] = useState(new Date());

  useEffect(() => {
    if (eventInfo) {
      setEventName(eventInfo.eventName);
      setEventDescription(eventInfo.eventDescription);
      setStartDate(eventInfo.startDate);
      setEndDate(eventInfo.endDate);
      setLocationSetting(eventInfo.locationSetting);
      setLocation(eventInfo.location);
      setMasks(eventInfo.masks);
      setEventId(eventInfo.eventId);
      setSubmitDate(eventInfo.submitDate);
    }
  }, [eventInfo]);

  const {
    user: { email_verified: verified, sub, name },
  } = useAuth0();

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      if (locationSetting === "Virtual") {
        setLocation("");
      }

      const newEvent = {
        eventName,
        eventDescription,
        startDate,
        endDate,
        locationSetting,
        location,
        masks,
        submitterId: sub,
        submitDate,
        eventId,
        organizerName: name,
      };

      if (!eventInfo) {
        axios.post("http://localhost:5000/form/add", newEvent).then((res) => console.log(res.data));
      } else {
        axios
          .post(`http://localhost:5000/form/update/${eventId}`, newEvent)
          .then((res) => console.log(res.data));
      }
    }

    setValidated(true);
  };

  if (!verified) {
    return (
      <Container className="text-center">
        <p>
          Please verify your email in order to create an event. After doing so, refresh the page.
        </p>
      </Container>
    );
  }

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      action="http://localhost:5000/"
      method="post"
    >
      <h1>{!eventInfo ? "Create an Event" : "Update Event"}</h1>
      <Form.Group className="mb-3" controlId="eventName">
        <Form.Label>Event Name</Form.Label>
        <Form.Control
          required
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">Please give the event a name.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="eventDescription">
        <Form.Label>Event Description</Form.Label>
        <Form.Control
          required
          as="textarea"
          rows={3}
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          Please give the event a description.
        </Form.Control.Feedback>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} className="mb-3" controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            required
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please give the event a start date & time.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} className="mb-3" controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            required
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please give the event an end date & time.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="locationSetting">
        <Form.Label>Location</Form.Label>
        <Form.Check
          required
          type="radio"
          label="Virtual"
          name="location-setting"
          onChange={() => setLocationSetting("Virtual")}
          checked={locationSetting === "Virtual"}
        />
        <Form.Check
          required
          type="radio"
          label="In-Person"
          name="location-setting"
          onChange={() => setLocationSetting("In-Person")}
          checked={locationSetting === "In-Person"}
        />
        <Form.Check
          required
          type="radio"
          label="Virtual & In-Person"
          name="location-setting"
          onChange={() => setLocationSetting("Virtual & In-Person")}
          checked={locationSetting === "Virtual & In-Person"}
        />
      </Form.Group>

      {locationSetting === "Virtual" || locationSetting === "" ? null : (
        <Form.Group className="mb-3" controlId="physicalLocation">
          <Form.Control
            required={
              locationSetting === "In-Person" || locationSetting === "Virtual & In-Person"
                ? true
                : false
            }
            type="text"
            placeholder="Enter Event Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please give the event a physical location.
          </Form.Control.Feedback>
        </Form.Group>
      )}

      <Form.Group className="mb-3" controlId="masks">
        <Form.Check
          type="checkbox"
          label="Masks?"
          name="Masks"
          checked={masks}
          onChange={() => setMasks(!masks)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default EventForm;
