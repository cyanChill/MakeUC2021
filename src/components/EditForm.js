import { useState, useEffect } from "react";
import axios from "axios";
import EventForm from "./EventForm";
import { useAuth0 } from "@auth0/auth0-react";
import { Alert } from "react-bootstrap";

const EditForm = ({ match }) => {
  const [eventInfo, setEventInfo] = useState({});
  const {
    user: { sub },
  } = useAuth0();

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

  if (sub !== eventInfo.submitterId) {
    return <Alert variant="danger">You do not have permission to edit this event.</Alert>;
  }

  return <EventForm eventInfo={eventInfo} />;
};

export default EditForm;
