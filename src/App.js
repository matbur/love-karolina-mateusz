import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
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
        <Alert variant="info">{`${now.format(format + ' - HH:mm:ss')}`}</Alert>
        <Date text="Poznanie" value="2018-07-23" now={now} />
        <Date text="Związek" value="2018-09-14" now={now} />
        <Date text="Vegas" value="2020-08-22" now={now} />
      </div>
    );
  }
}

class Date extends Component {
  beforeAfter = days => (days > 0 ? `za ${days} dni` : `${-days} dni temu`);

  render() {
    const { now, text, value } = this.props;
    const date = moment(value);
    const diff = date.diff(now, 'days');

    return (
      <Alert variant="primary">
        {`${text}: ${date.format(format)} (${this.beforeAfter(diff)})`}
      </Alert>
    );
  }
}
export default App;
