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
    const newSession = {id: id, title: title, startTime: startTime, talks: []};
    let sessions = [...this.state.sessions, newSession];
    this.setState({
      sessions: sessions
    });
  };

  addTalk(id, title, duration, sessionId) {
    const newTalk = {id: id, title: title, duration: duration, sessionId: sessionId};
    let talks = [...this.state.talks, newTalk];
    this.setState({
      talks: talks
    });
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
    const sessions = this.state.sessions.map(i =>
      <Session
        key={i.id}
        id={i.id}
        title={i.title}
        startTime={i.startTime}
        duration={this.sumDurationOfTalks(i.id)}
        talks={this.assignTalks(i.id)}
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
