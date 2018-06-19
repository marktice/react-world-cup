import React, { Component } from 'react';

import './App.css';
import Matches from './components/Matches';
import GroupForm from './components/GroupForm';

class App extends Component {
  state = {
    selection: 'a',
    teams: null,
    matches: null,
    stadiums: null,
    group: {
      name: null
    }
  };

  componentDidMount() {
    this.fetchGroupMatches()
      .then((data) => {
        this.handleGroupData(data);
      }).catch((err) => console.log(err));
  }

  async fetchGroupMatches() {
    const url = 'https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json';
    const response = await fetch(url);
    return await response.json();
  }

  handleGroupData = (data) => {
    this.setState({
      teams: data.teams,
      matches: data.groups[this.state.selection].matches,
      stadiums: data.stadiums,
      group: {
        name: data.groups[this.state.selection].name
      }
    });
  };

  handleGroupChange = (groupSelection) => {
    this.fetchGroupMatches()
      .then((data) => {
        this.setState(() => {
          return {
            matches: data.groups[groupSelection].matches,
            group: {
              name: data.groups[groupSelection].name
            }
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { group, matches, teams, stadiums } = this.state;
    if (!group.name) {
      return <div>Loading...</div>;
    }

    return (
      <div className="App">
        <GroupForm handleGroupChange={this.handleGroupChange} />
        <h1>{group.name}</h1>
        <Matches {...this.state} />
      </div>
    );
  }
}

export default App;
