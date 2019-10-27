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
  private codes = (n: number): number[] => {
    switch (n) {
      case 3:
        return [1, 1, 2, 1, 1, 1, 2, 2];
      case 4:
        return [3, 1, 2, 2, 1];
      default:
        return [];
    }
  };

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

  private isOpen = (n: number): boolean => {
    const { clicked } = this.state;

    if (equals(this.codes(n), takeLast(this.codes(n).length, clicked))) {
      return true;
    }
    if (n === 3 && this.isOpen(4)) {
      return true;
    }
    return false;
  };

  private clicked = (n: number): (() => void) => (): void => {
    const { clicked } = this.state;

    this.setState({
      clicked: takeLast(16, [...clicked, n]),
    });
  };

  public render(): ReactElement {
    const { now } = this.state;
    const today = now.clone().startOf('day');

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
            {this.isOpen(3) &&
              <Event
                header="Zaręczyny"
                value="2019-08-02"
                now={today}
                src="trzebnica.jpg"
                handleClick={this.clicked(3)}
              />
            }
            {this.isOpen(4) &&
              <Event
                header="Vegas"
                value="2020-08-14"
                now={today}
                src="vegas.jpg"
                handleClick={this.clicked(4)}
              />
            }
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
