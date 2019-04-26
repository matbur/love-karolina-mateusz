import 'moment/locale/pl';
import { Card, CardDeck } from 'react-bootstrap';
import React, { Component, ReactElement } from 'react';
import { equals, takeLast } from 'ramda';
import moment, { Moment } from 'moment';

import { beforeAfter, calculateDays, calculateMonths, calculateWeeks } from './utils/date';

moment.locale('pl');

const format = 'ddd, D MMM Y';

interface AppState {
  now: Moment;
  clicked: number[];
  isHidden: boolean;
}
class App extends Component<{}, AppState> {
  public state = {
    now: moment(),
    clicked: [],
    isHidden: true,
  };

  public componentDidMount(): void {
    setInterval((): void => {
      this.setState({
        now: moment(),
      });
    }, 100);
  }

  private clicked = (n: number): (() => void) => (): void => {
    const { clicked } = this.state;
    const code = [1, 1, 2, 1, 1, 1, 2];
    const isOpen = equals(clicked, code) && n === 2;

    this.setState({
      clicked: isOpen ? [] : takeLast(code.length, [...clicked, n]),
      isHidden: !isOpen,
    });
  };

  public render(): ReactElement {
    const { now, isHidden } = this.state;
    const today = now.clone().startOf('day');

    return (
      <div className="App">
        <Card>
          <Card.Header className="text-center">
            {'\u2619 Karolina i Mateusz \u2767'}
          </Card.Header>
          <Card.Body>
            <CardDeck>
              <Event
                header="Piersze spotkanie"
                value="2018-07-23"
                now={today}
                src="kajaki.jpg"
                handleClick={this.clicked(1)}
              />
              <Event
                header="Początek związku"
                value="2018-09-14"
                now={today}
                src="giewont.jpg"
                handleClick={this.clicked(2)}
              />
              {isHidden ? null : (
                <Event
                  header="Vegas"
                  value="2020-08-22"
                  now={today}
                  src="vegas.jpg"
                  handleClick={this.clicked(3)}
                />
              )}
            </CardDeck>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">{`${now.format(
              format + ' - HH:mm:ss'
            )}`}</small>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

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

const Event: React.FC<EventProps> = ({ header, value, now, src, handleClick }): React.ReactElement => {
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
        <small className="text-muted">{`${date.format(format)}`}</small>
      </Card.Footer>
    </Card>
  );
};

export default App;
