class Container extends React.Component {
  render() {
    return <h1>Hello world</h1>
  }
}

ReactDOM.render(
  React.createElement(Container),
  document.getElementById('root')
);

