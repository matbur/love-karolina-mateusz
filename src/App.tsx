import { Card, CardDeck } from "react-bootstrap";
import React, { Component, ReactElement } from "react";
import { pl } from "date-fns/locale";

import Event from "./components/Event";
import { format } from "date-fns";

interface AppState {
  now: Date;
}
class App extends Component<{}, AppState> {
  public state = {
    now: new Date()
  };

  public componentDidMount(): void {
    setInterval((): void => {
      this.setState({
        now: new Date()
      });
    }, 100);
  }

  public render(): ReactElement {
    return (
      <Card>
        <Card.Header className="text-center">
          {"\u2619 Karolina i Mateusz \u2767"}
        </Card.Header>
        <Card.Body>
          <CardDeck>
            <Event
              header="Pierwsze spotkanie"
              value={new Date(Date.parse("2018-07-23"))}
              src="kajaki.jpg"
            />
            <Event
              header="Początek związku"
              value={new Date(Date.parse("2018-09-14"))}
              src="giewont.jpg"
            />
            <Event
              header="Zaręczyny"
              value={new Date(Date.parse("2019-08-02"))}
              src="trzebnica.jpg"
            />
            <Event
              header="Ślub"
              value={new Date(Date.parse("2020-08-14"))}
              src="vegas.jpg"
            />
          </CardDeck>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            {format(this.state.now, "ccc, d LLL y - HH:mm:ss", { locale: pl })}
          </small>
        </Card.Footer>
      </Card>
    );
  }
}

export default App;
