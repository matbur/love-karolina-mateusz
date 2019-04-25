import React, { Component } from 'react';
import { Card, CardDeck } from 'react-bootstrap';
import moment from 'moment';
// eslint-disable-next-line no-unused-vars
import * as pl from 'moment/locale/pl';
import { equals, takeLast } from 'ramda'

moment.locale('pl');

const format = 'ddd, D MMM Y';

class App extends Component {
  state = {
    now: moment(),
    clicked: [],
    isHidden: true,
  };

  componentDidMount() {
    this.t = setInterval(() => {
      this.setState({
        now: moment(),
      });
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.t);
  }

  clicked = (n) => () => {
    const { clicked } = this.state
    const isOpen = equals(clicked, [1, 1, 2, 1, 1, 1]) && n === 2

    this.setState({
      clicked: isOpen ? [] : [...takeLast(5, clicked), n],
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

class Date extends Component {
  beforeAfter = (val, s) => (val > 0 ? `za ${val} ${s}` : `${-val} ${s} temu`);

  calculateDays = (date, now) => {
    const diffDays = date.diff(now, 'days');

    return (
      <li>
        {diffDays === 0 ? 'to już dzisiaj' : this.beforeAfter(diffDays, 'dni')}
      </li>
    );
  };

  calculateWeeks = (date, now) => {
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

  calculateMonths = (date, now) => {
    const diffMonths = date.diff(now, 'months');
    const diff = date.diff(now, 'days');
    const dd = date.date();
    const nd = now.date();

    let diffDays = 0;

    if (diff < 0) {
      if (dd < nd) {
        diffDays = dd - nd;
      } else if (dd > nd) {
        diffDays =
          dd -
          nd -
          date
            .clone()
            .endOf('month')
            .date();
      }
    } else if (diff > 0) {
      if (dd < nd) {
        diffDays =
          dd -
          nd +
          now
            .clone()
            .endOf('month')
            .date();
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
    const { header, src, now, value } = this.props;
    const { handleClick } = this.props
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
