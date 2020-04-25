import React from 'react';
import './App.css';
import {Redirect} from 'react-router-dom';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let name = localStorage.setItem("name", this.state.value);
    window.location = '/quiz';
  }

  render() {
    return (
      <div class="subscribe-box">
        <h2>Welcome to the Java Quiz</h2>
        <h3>created by Zaiyr Sharsheev</h3>
        <form class="subscribe" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Your name or nickname" autocomplete="off" required="required" value={this.state.value} onChange={this.handleChange}/>
          <button type="submit"> <span>Start</span></button>
        </form>
    </div>
    );
  }
}

export default App;
