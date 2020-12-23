import 'moment/locale/pl';
import { Card, CardDeck } from 'react-bootstrap';
import React, { Component, ReactElement } from 'react';
import moment, { Moment } from 'moment';

import Event from './components/Event';

moment.locale('pl');

interface AppState {
  now: Moment;
}
class App extends Component<{}, AppState> {

  public state = {
    now: moment(),
  };

  public componentDidMount(): void {
    setInterval((): void => {
      this.setState({
        now: moment(),
      });
    }, 100);
  }

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
            />
            <Event
              header="Początek związku"
              value="2018-09-14"
              now={today}
              src="giewont.jpg"
            />
            <Event
              header="Zaręczyny"
              value="2019-08-02"
              now={today}
              src="trzebnica.jpg"
            />
            <Event
              header="Vegas"
              value="2020-08-14"
              now={today}
              src="vegas.jpg"
            />
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
