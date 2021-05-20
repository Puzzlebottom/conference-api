class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
      talks: []
    }
    this.addSession = this.addSession.bind(this);
    this.addTalk = this.addTalk.bind(this);
    this.assignTalks = this.assignTalks.bind(this);
    this.sumDurationOfTalks = this.sumDurationOfTalks.bind(this)
  };

  addSession(id, title, startTime) {
    const newSession = {id, title, startTime, talks: []};
    const sessions = [...this.state.sessions, newSession];
    this.setState({sessions});
  };

  addTalk(id, title, duration, sessionId) {
    duration = parseInt(duration);
    const newTalk = {id, title, duration, sessionId};
    const talks = [...this.state.talks, newTalk];
    this.setState({talks});
  };

  assignTalks(sessionId) {
    return this.state.talks.filter(talk => talk.sessionId === sessionId)
  }

  sumDurationOfTalks(sessionId) {
    const talks = this.assignTalks(sessionId);
    let total = 0;
    talks.map(talk => total += talk.duration);
    return total;
  }

  render() {
    const sessions = this.state.sessions.map(session =>
      <Session
        {...session}
        key={session.id}
        duration={this.sumDurationOfTalks(session.id)}
        talks={this.assignTalks(session.id)}
      />);
    return (
      <div>
        {this.state.sessions.length > 0 && <div className={"sessions-wrapper"}>{sessions}</div>}
        <NewSessionForm addSession={this.addSession}/>
        <NewTalkForm addTalk={this.addTalk} sessions={this.state.sessions}/>
      </div>
    );
  };
}

ReactDOM.render(
  React.createElement(Container),
  document.getElementById('root')
);
