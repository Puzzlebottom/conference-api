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

  async addSession(title, startTime) {
    const newSession = {title: title, startTime: startTime};
    await axios.post('/api/sessions', newSession);
    const sessions = await axios.get('/api/sessions');
    await this.setState({
      sessions: sessions.data
    })
  };

  async addTalk(title, duration, sessionId) {
    duration = parseInt(duration);
    const newTalk = {title: title, duration: duration, sessionId: sessionId};
    await axios.post('/api/talks', newTalk);
    const talks = await axios.get('/api/talks');
    await this.setState({
      talks: talks.data
    })
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

  formatStartTime(time) {
    return moment(time, 'h:mm a')
  }

  async componentDidMount() {
    const sessions = await axios.get('/api/sessions');
    const talks = await axios.get('/api/talks');
    await this.setState({
      sessions: sessions.data,
      talks: talks.data
    })
  }

  render() {
    const sessions = this.state.sessions.map(session =>
      <Session
        key={session.id}
        id={session.id}
        title={session.title}
        startTime={this.formatStartTime(session.startTime)}
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
