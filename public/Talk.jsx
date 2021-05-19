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