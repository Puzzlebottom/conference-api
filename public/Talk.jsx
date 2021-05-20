class Talk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
    }
  }

  render() {
    return (
      <li>
        <span>{this.props.startTime}</span>
        {this.props.title} {this.props.duration}  min
      </li>
    );
  };
}