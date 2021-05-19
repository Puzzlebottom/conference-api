class Talk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      startTime: props.startTime,
      title: props.title,
      duration: props.duration,
    }
  }

  render() {
    return (
      <li>
        <span>{this.state.startTime}</span>
        {this.state.title} {this.state.duration}  min
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