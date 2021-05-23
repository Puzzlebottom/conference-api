class Session extends React.Component {
  constructor(props) {
    super(props);
    this.assignTalkStartTime = this.assignTalkStartTime.bind(this);
    this.assignTalkStartTime = this.assignTalkStartTime.bind(this);
  }

  assignTalkStartTime(talkId) {
    const sessionStartTime = this.props.startTime;
    const talks = this.props.talks
    const index = talks.findIndex(talk => talk.id === talkId);
    let sumOfPriorDurations = 0;
    talks.slice(0, index).map(talk => sumOfPriorDurations += talk.duration);
    return sessionStartTime.add(sumOfPriorDurations, 'minutes').format('h:mm a');
  }

  static formatDuration(duration) {
    return duration > 60 ? Math.floor(duration/60) + ' h ' + (duration % 60) + ' min' : duration + ' min';
  }

  render() {
    const talks = this.props.talks.map(talk =>
      <Talk
        {...talk}
        key={talk.id}
        startTime={this.assignTalkStartTime(talk.id)}
      />);
    return (
      <div className="session">
        <h2>{this.props.title}</h2>
        {this.props.talks.length > 0 && <ul>{talks}</ul>}
        <h3>duration: {Session.formatDuration(this.props.duration)}</h3>
      </div>
    );
  };
}