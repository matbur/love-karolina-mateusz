import React, { Component } from 'react';
import { Card, CardDeck } from 'react-bootstrap';
import moment from 'moment';
import { equals, takeLast } from 'ramda';

const format = 'ddd, D MMM Y';


type AppState = {
  now: moment.Moment;
  clicked: number[];
  isHidden: boolean;
}
class App extends Component<{}, AppState> {
  t: NodeJS.Timeout;

  constructor(props: {}) {
    super(props);

    this.state = {
      now: moment(),
      clicked: [],
      isHidden: true,
    };

    this.t = setInterval(() => {
      this.setState({
        now: moment(),
      });
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.t);
  }

  clicked = (n: number) => () => {
    const { clicked } = this.state
    const code = [1, 1, 2, 1, 1, 1, 2]
    const isOpen = equals(clicked, code) && n === 2

    this.setState({
      clicked: isOpen ? [] : takeLast(code.length, [...clicked, n]),
      isHidden: !isOpen,
    })
  }

  render() {
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
              <Date
                header="Piersze spotkanie"
                value="2018-07-23"
                now={today}
                src="kajaki.jpg"
                handleClick={this.clicked(1)}
              />
              <Date
                header="Początek związku"
                value="2018-09-14"
                now={today}
                src="giewont.jpg"
                handleClick={this.clicked(2)}
              />
              {
                isHidden ? null :
                  <Date
                    header="Vegas"
                    value="2020-08-22"
                    now={today}
                    src="vegas.jpg"
                    handleClick={this.clicked(3)}
                  />
              }
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


type DateProps = {
  header: string;
  value: string;
  now: moment.Moment;
  src: string;
  handleClick: () => void
}
class Date extends Component<DateProps, {}> {
  beforeAfter = (val: number, s: string) => (val > 0 ? `za ${val} ${s}` : `${-val} ${s} temu`);

  calculateDays = (date: moment.Moment, now: moment.Moment) => {
    const diffDays = date.diff(now, 'days');

    return (
      <li>
        {diffDays === 0 ? 'to już dzisiaj' : this.beforeAfter(diffDays, 'dni')}
      </li>
    );
  };

  calculateWeeks = (date: moment.Moment, now: moment.Moment) => {
    const diff = date.diff(now, 'days');
    const diffWeeks = (diff / 7) >> 0;
    const diffDays = diff % 7;

    return diffWeeks === 0 ? null : (
      <li>
        {this.beforeAfter(diffWeeks, 'tyg.')}
        {diffDays === 0 ? null : (
          <>
            <br />
            {`i ${Math.abs(diffDays)} dni`}
          </>
        )}
      </li>
    );
  };

  calculateMonths = (date: moment.Moment, now: moment.Moment) => {
    const diffMonths = date.diff(now, 'months');
    const diff = date.diff(now, 'days');
    const dd = date.date();
    const nd = now.date();

    let diffDays = 0;

    if (diff < 0) {
      if (dd < nd) {
        diffDays = dd - nd;
      } else if (dd > nd) {
        diffDays = dd - nd - date.clone().endOf('month').date();
      }
    } else if (diff > 0) {
      if (dd < nd) {
        diffDays = dd - nd + now.clone().endOf('month').date();
      } else if (dd > nd) {
        diffDays = dd - nd;
      }
    }

    return diffMonths === 0 ? null : (
      <li>
        {this.beforeAfter(diffMonths, 'm-cy')}
        {diffDays === 0 ? null : (
          <>
            <br />
            {`i ${Math.abs(diffDays)} dni`}
          </>
        )}
      </li>
    );
  };

  render() {
    const { header, src, now, value, handleClick } = this.props;
    const date = moment(value);

    return (
      <Card
        bg="light"
        style={{ minWidth: '11.09rem', marginBottom: 10 }}
        className={"hidden"}
        onClick={handleClick}
      >
        <Card.Img variant="top" src={src} />
        <Card.Body>
          <Card.Title>{header}</Card.Title>
          <ul>
            {this.calculateDays(date, now)}
            {this.calculateWeeks(date, now)}
            {this.calculateMonths(date, now)}
          </ul>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{`${date.format(format)}`}</small>
        </Card.Footer>
      </Card>
    );
  }
}
export default App;
