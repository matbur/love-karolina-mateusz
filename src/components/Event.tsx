import React from 'react';
import moment, { Moment } from 'moment';
import { Card } from 'react-bootstrap';

import Days from './Days';
import Months from './Months';
import Weeks from './Weeks';

interface EventProps {
  header: string;
  value: string;
  now: Moment;
  src: string;
}

const Event: React.FC<EventProps> = ({ header, value, now, src }): React.ReactElement => {
  const date = moment(value);

  return (
    <Card
      bg="light"
      style={{ minWidth: '11.09rem', marginBottom: 10 }}
    >
      <Card.Img variant="top" src={src} />
      <Card.Body>
        <Card.Title>{header}</Card.Title>
        <ul>
          <Days date={date} today={now} />
          <Weeks date={date} today={now} />
          <Months date={date} today={now} />
        </ul>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{`${date.format('ddd, D MMM Y')}`}</small>
      </Card.Footer>
    </Card>
  );
};

export default Event;