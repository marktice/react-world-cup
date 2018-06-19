import React, { Component } from 'react';

class GroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: 'a'
    };
  }

  handleChange = (event) => {
    const groupSelection = event.target.value;
    this.setState({
      group: groupSelection
    });
    this.props.handleGroupChange(groupSelection);
  };

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   this.props.handleGroupChange(this.state.group)
  // }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Group:
          <select value={this.state.group} onChange={this.handleChange}>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
            <option value="e">E</option>
            <option value="f">F</option>
            <option value="g">G</option>
            <option value="h">H</option>
          </select>
        </label>
        {/* <input type="submit" value="Submit" /> */}
      </form>
    );
  }
}

export default GroupForm;
