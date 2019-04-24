import React, { Component } from 'react';
import { Card, CardDeck } from 'react-bootstrap';
import moment from 'moment';
// eslint-disable-next-line no-unused-vars
import * as pl from 'moment/locale/pl';

moment.locale('pl');

const format = 'ddd, D MMM Y';

class App extends Component {
  state = {
    now: moment()
  };

  componentDidMount() {
    this.t = setInterval(() => {
      this.setState({
        now: moment()
      });
    });
  }

  componentWillUnmount() {
    clearInterval(this.t);
  }

  render() {
    const { now } = this.state;

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
                now={now}
                src="kajaki.jpg"
              />
              <Date
                header="Początek związku"
                value="2018-09-14"
                now={now}
                src="giewont.jpg"
              />
              <Date
                header="Vegas"
                value="2020-08-22"
                now={now}
                src="vegas.jpg"
              />
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

class Date extends Component {
  beforeAfter = (val, s) => (val > 0 ? `za ${val} ${s}` : `${-val} ${s} temu`);

  render() {
    const { header, src, now, value } = this.props;
    const date = moment(value);
    return (
      <Card bg="light" style={{ minWidth: '13.2em', marginBottom: 10 }}>
        <Card.Img variant="top" src={src} />
        <Card.Body>
          <Card.Title>{header}</Card.Title>
          <ul>
            <li>{`${this.beforeAfter(date.diff(now, 'days'), 'dni')}`}</li>
            <li>{`${this.beforeAfter(
              date.diff(now, 'weeks'),
              'tygodnie'
            )}`}</li>
            <li>{`${this.beforeAfter(
              date.diff(now, 'months'),
              'miesięcy'
            )}`}</li>
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
