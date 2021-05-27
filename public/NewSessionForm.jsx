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

  async handleSubmit(event) {
    event.preventDefault();
    try {
      await this.props.addSession(this.state.title, this.state.startTime);
      this.setState({
        title: '',
        startTime: '',
        error: ''
      })
    } catch (e) {
      this.setState({error: e.response.data.error})
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <span>{this.state.error}</span>
        <h4>Add new session</h4>
        <label>Title: <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/></label>
        <label>Start time: <input type="text" name="startTime" value={this.state.startTime} onChange={this.handleChange}/></label>
        <input type="submit" value="Add"/>
      </form>
    );
  };
}