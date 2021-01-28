import React from "react";
import { Card } from "react-bootstrap";
import { format, formatDistanceToNowStrict } from "date-fns";
import { pl } from "date-fns/locale";

interface EventProps {
  header: string;
  value: Date;
  src: string;
}

const Event: React.FC<EventProps> = ({
  header,
  value,
  src
}): React.ReactElement => (
  <Card bg="light" style={{ minWidth: "11.09rem", marginBottom: 10 }}>
    <Card.Img variant="top" src={src} />
    <Card.Body>
      <Card.Title>{header}</Card.Title>
      <ul>
        <li>
          {formatDistanceToNowStrict(value, { ...dateOptions, unit: "day" })}
        </li>
        <li>
          {formatDistanceToNowStrict(value, { ...dateOptions, unit: "month" })}
        </li>
        <li>
          {formatDistanceToNowStrict(value, { ...dateOptions, unit: "year" })}
        </li>
      </ul>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">
        {format(value, "ccc, d LLL y", { locale: pl })}{" "}
      </small>
    </Card.Footer>
  </Card>
);

const dateOptions = {
  addSuffix: true,
  locale: pl
};

export default Event;
