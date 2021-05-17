class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessions: [{title: "test", startTime: "12:00 am"}, {title: "test2", startTime: "12:00 am"}]
        }
        this.addSession = this.addSession.bind(this);
    };

    addSession(title, startTime) {
        const newSession = {title: title, startTime: startTime};
        this.setState({
            sessions: [...this.state.sessions, newSession]
        });
    };

    render() {
        this.addSession("banana", "12:00 am");
        const sessions = this.state.sessions.map(i => <Session title={i.title} startTime={i.startTime}/>);
        return (
            <div>
                <div className={"sessions-wrapper"}>
                    {this.state.sessions.length > 0 && sessions}
                </div>
                {/*<NewSessionForm addSession={this.addSession}/>*/}
                <NewTalkForm />
            </div>
        );
    };
}

class Session extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: props.title,
            startTime: props.startTime,
            talks: []
        }
    }
    render() {
        return (
            <section className="session">
                <h2>{this.props.title}</h2>
                <ul>
                    <li>talk</li>
                </ul>
                <h3>duration</h3>
            </section>
        );
    };
}

// class Talk extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return (
//             <div>
//             </div>
//
//         );
//     };
// }

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

    handleSubmit() {
        this.props.addSession(this.state.title, this.state.startTime)
        // event.preventDefault();
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
    }
    render() {
        return (
            <form method="post" action="/talks">
                <h4>Add new track</h4>
                <label>Title: <input type="text" name="title"/></label>
                <label>Duration: <input type="number" name="duration"/></label>
                <label>Session: <select name="sessionId">
                    %options%
                </select></label>
                <input type="submit" value="Save"/>
            </form>
        );
    };
}

ReactDOM.render(
  React.createElement(Container),
  document.getElementById('root')
);
