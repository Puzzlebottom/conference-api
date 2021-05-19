class NewTalkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      duration:'',
      sessionId: '',
    }
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDuration = this.handleChangeDuration.bind(this);
    this.handleChangeSession = this.handleChangeSession.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeTitle(event) {
    this.setState({title: event.target.value});
  }

  handleChangeDuration(event) {
    this.setState({duration: parseInt(event.target.value)});
  }

  handleChangeSession(event) {
    this.setState({sessionId: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const id = uuidv4();
    const sessionId = this.state.sessionId.length === 0 ? this.props.sessions[0].id : this.state.sessionId;
    this.props.addTalk(id, this.state.title, this.state.duration, sessionId);
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
        <label>Session: <select value={this.state.sessionId} onChange={this.handleChangeSession}>
          {dropdownOptions}
        </select></label>
        <input type="submit" value="Add"/>
      </form>
    );
  };
}