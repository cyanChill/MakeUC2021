import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import { FaExternalLinkAlt, FaEdit } from "react-icons/fa";
import { formatDate } from "../helpers/utility";

const EventCard = ({ info, edit }) => {
  const { eventName, startDate, endDate, locationSetting, location, masks, eventId } = info;

  return (
    <Card className="my-3">
      <Card.Body>
        <Row>
          <Col as={Card.Title}>{eventName}</Col>
          <Col>
            {edit ? (
              <Link to={`/form/edit/${eventId}`}>
                <FaEdit className="float-end" />
              </Link>
            ) : edit === false ? null : (
              <Link to={`/event/${eventId}`}>
                <FaExternalLinkAlt className="float-end" />
              </Link>
            )}
          </Col>
        </Row>
        <Row>
          <Col as={Card.Subtitle} className="mb-2 text-muted">
            {location ? `${locationSetting} | ${location}` : `${locationSetting}`}
          </Col>
          <Col as={Card.Subtitle} className="mb-2 text-muted text-end">
            {formatDate(startDate)} - {formatDate(endDate)}
          </Col>
        </Row>
        <Card.Subtitle style={{ color: "red" }}>
          Masks: {masks ? "Required" : "Not Required"}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
