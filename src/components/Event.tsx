import React, { ReactElement } from 'react';
import moment, { Moment } from 'moment';
import { Card } from 'react-bootstrap';

import { beforeAfter, calculateDays, calculateMonths, calculateWeeks } from '../utils/date';

interface PartsProps {
  date: Moment;
  today: Moment;
}

const Days: React.FC<PartsProps> = ({ date, today }): ReactElement => {
  const days = calculateDays(date, today);

  return (
    <li>
      {days === 0
        ? 'to już dzisiaj'
        : beforeAfter(days, 'dni')
      }
    </li>
  );
};

const Weeks: React.FC<PartsProps> = ({ date, today }): ReactElement | null => {
  const { weeks, days } = calculateWeeks(date, today);

  return weeks === 0
    ? null
    : (
      <li>
        {beforeAfter(weeks, 'tyg.')}
        {days === 0
          ? null
          : (
            <>
              <br />
              {`i ${Math.abs(days)} dni`}
            </>
          )}
      </li>
    );
};

const Months: React.FC<PartsProps> = ({ date, today }): ReactElement | null => {
  const { months, days } = calculateMonths(date, today);

  return months === 0
    ? null
    : (
      <li>
        {beforeAfter(months, 'm-cy')}
        {days === 0
          ? null
          : (
            <>
              <br />
              {`i ${Math.abs(days)} dni`}
            </>
          )}
      </li>
    );
};

interface EventProps {
  header: string;
  value: string;
  now: Moment;
  src: string;
  handleClick: () => void;
}

export const Event: React.FC<EventProps> = ({ header, value, now, src, handleClick }): React.ReactElement => {
  const date = moment(value);

  return (
    <Card
      bg="light"
      style={{ minWidth: '11.09rem', marginBottom: 10 }}
      onClick={handleClick}
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
