class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
    }
    this.addSession = this.addSession.bind(this);
    this.addTalk = this.addTalk.bind(this);
  };

  addSession(id, title, startTime) {
    const newSession = {id: id, title: title, startTime: startTime, talks: []};
    let sessions = [...this.state.sessions, newSession];
    this.setState({
      sessions: sessions
    });
  };

  addTalk(id, title, duration, sessionId) {
    const newTalk = {id: id, title: title, duration: duration};
    const session = this.state.sessions.filter(function(i) {return i.id === sessionId});
    session[0].talks = [...session[0].talks, newTalk];
    const index = this.state.sessions.findIndex(function(i) {return i.id === sessionId});
    const updateSessions = () => {
      const oldSessions = this.state.sessions
      const updatedSessions = oldSessions.conca //I'm working here now
    }

    this.setState({
      sessions: updatedSessions
    })
  };

  render() {
    const sessions = this.state.sessions.map(i =>
      <Session
        key={i.id}
        id={i.id}
        title={i.title}
        startTime={i.startTime}
        talks={i.talks}
      />);
    return (
      <div>
        {this.state.sessions.length > 0 && <div className={"sessions-wrapper"}>{sessions}</div>}
        <NewSessionForm addSession={this.addSession}/>
        <NewTalkForm
          addTalk={this.addTalk}
          sessions={this.state.sessions}/>
      </div>
    );
  };
}

class Session extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      title: props.title,
      startTime: props.startTime,
      duration: '',
      talks: []
    }
    this.assignTalkStartTime = this.assignTalkStartTime.bind(this)
  }

  assignTalkStartTime() {
    const sessionStartTime = this.state.startTime;
    const talks = this.state.talks;
    const sumOfTalkDuration = 0;

  }

  render() {
    // const time = this.state.startTime.format('h:mm a')
    // console.log(time)
    const talks = this.state.talks.map(i =>
      <Talk
        key={i.id}
        id={i.id}
        startTime={i.startTime}
        title={i.title}
        duration={i.duration}
      />);
    return (
      <section className="session">
        <h2>{this.props.title}</h2>
        {this.state.talks.length > 0 && <ul>{talks}</ul>}
        <h3>duration: {this.state.talks.length > 0
          ? this.state.duration
          : '0 min'}</h3>
      </section>
    );
  };
}

class Talk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      startTime: props.startTime,
      title: props.title,
      duration: props.duration,
      sessionId: props.sessionId
    }
  }

  render() {
    return (
      <li>
        <span>{this.state.startTime}</span>
        {this.state.title} + ' ' + {this.state.duration} + ' min'
      </li>
    );
  };
}

class NewSessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      startTime: ''
    }
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeTitle(event) {
    this.setState({title: event.target.value});
  }

  handleChangeStartTime(event) {
    this.setState({startTime: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const id = uuidv4();
    this.props.addSession(id, this.state.title, moment.utc(this.state.startTime, 'h:mm a'));
    this.setState({
      title: '',
      startTime: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>Add new session</h4>
        <label>Title: <input type="text" value={this.state.title} onChange={this.handleChangeTitle}/></label>
        <label>Start time: <input type="time" value={this.state.startTime} onChange={this.handleChangeStartTime}/></label>
        <input type="submit" value="Add"/>
      </form>
    );
  };
}

class NewTalkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      duration: '',
      sessionId: '',
    }
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDuration = this.handleChangeDuration.bind(this);
    this.handleChangeSession = this.handleChangeSession.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dropdown = React.createRef();
  }

  handleChangeTitle(event) {
    this.setState({title: event.target.value});
  }

  handleChangeDuration(event) {
    this.setState({duration: event.target.value});
  }

  handleChangeSession(event) {
    this.setState({sessionId: event.target.value});
  }

  componentDidUpdate(prevProps) {
    if(this.props.sessions.length === 1 && this.props.sessions !== prevProps.sessions) {
      this.setState({
        sessionId: this.props.sessions[0].id
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const id = uuidv4();
    this.props.addTalk(id, this.state.title, this.state.duration, this.state.sessionId);
    this.setState({
      title: '',
      duration: ''
    })
  }

  render() {
    const dropdownOptions = this.props.sessions.map(i => <option key={uuidv4()} value={i.id}>{i.title}</option>);
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>Add new talk</h4>
        <label>Title: <input type="text" value={this.state.title} onChange={this.handleChangeTitle}/></label>
        <label>Duration: <input type="number" value={this.state.duration} onChange={this.handleChangeDuration}/></label>
        <label>Session: <select value={this.state.sessionId} onChange={this.handleChangeSession} ref={this.dropdown}>
          {dropdownOptions}
        </select></label>
        <input type="submit" value="Add"/>
      </form>
    );
  };
}

ReactDOM.render(
  React.createElement(Container),
  document.getElementById('root')
);
