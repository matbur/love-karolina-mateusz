import 'moment/locale/pl';
import { Card, CardDeck } from 'react-bootstrap';
import React, { Component, ReactElement } from 'react';
import { equals, takeLast } from 'ramda';
import moment, { Moment } from 'moment';

import Event from './components/Event';

moment.locale('pl');

interface AppState {
  now: Moment;
  clicked: number[];
}
class App extends Component<{}, AppState> {
  public state = {
    now: moment(),
    clicked: [],
  };

  public componentDidMount(): void {
    setInterval((): void => {
      this.setState({
        now: moment(),
      });
    }, 100);
  }

  private code = [1, 1, 2, 1, 1, 1, 2, 2];

  private isOpen = (a: number[]): boolean => equals(this.code, a);

  private clicked = (n: number): (() => void) => (): void => {
    const { clicked } = this.state;
    const isOpen = this.isOpen(clicked);

    this.setState({
      clicked: isOpen ? [n] : takeLast(this.code.length, [...clicked, n]),
    });
  };

  public render(): ReactElement {
    const { now, clicked } = this.state;
    const today = now.clone().startOf('day');

    console.log(this.isOpen(clicked), clicked);

    return (
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
            {!this.isOpen(this.state.clicked) ? null : (
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
          <small className="text-muted">{`${now.format('ddd, D MMM Y - HH:mm:ss')}`}</small>
        </Card.Footer>
      </Card>
    );
  }
}

export default App;
