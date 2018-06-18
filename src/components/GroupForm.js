import React, { Component } from 'react';
import App from './../App';

class GroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: 'a'
    };
  }
  
  handleChange = (event) => {
    this.setState({
      group: event.target.value
    })
    
    // App.setState({
    //   selection: event.target.value
    // })
    // App.fetchGroupMatches().catch(err => console.log(err));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    alert('A Group was submitted: ' + this.state.group);

  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Group:
          <select value={this.state.group} onChange={this.handleChange}>
            <option value="a">a</option>
            <option value="b">b</option>
            <option value="c">c</option>
            <option value="d">d</option>
            <option value="e">e</option>
            <option value="f">f</option>
            <option value="g">g</option>
            <option value="h">h</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default GroupForm;
