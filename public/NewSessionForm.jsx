class NewSessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      startTime: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
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
        <label>Title: <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/></label>
        <label>Start time: <input type="time" name="startTime" value={this.state.startTime} onChange={this.handleChange}/></label>
        <input type="submit" value="Add"/>
      </form>
    );
  };
}