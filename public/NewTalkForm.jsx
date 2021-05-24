class NewTalkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      duration:'',
      sessionId: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(event) {
    event.preventDefault();
    const sessionId = this.state.sessionId.length === 0 ? this.props.sessions[0].id : this.state.sessionId;
    try {
      await this.props.addTalk(this.state.title, this.state.duration, sessionId);
      this.setState({
        title: '',
        duration: ''
      })
    } catch (e) {
      this.setState({error: e.response.data.error})
    }

  }

  render() {
    const dropdownOptions = this.props.sessions.map(i => <option key={uuidv4()} value={i.id}>{i.title}</option>);
    return (
      <form onSubmit={this.handleSubmit}>
        <span>{this.state.error}</span>
        <h4>Add new talk</h4>
        <label>Title: <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/></label>
        <label>Duration: <input name="duration" type="text"  value={this.state.duration} onChange={this.handleChange}/></label>
        <label>Session: <select name="sessionId" value={this.state.sessionId} onChange={this.handleChange}>
          {dropdownOptions}
        </select></label>
        <input type="submit" value="Add"/>
      </form>
    );
  };
}