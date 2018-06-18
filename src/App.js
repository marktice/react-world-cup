import React, { Component } from 'react';

import './App.css';
import Match from './components/Match';
import GroupForm from './components/GroupForm';

class App extends Component {
  state = {
    selection: "a",
    teams: null,
    matches: null,
    stadiums: null,
    group: {
      name: null
    }
  };

  componentDidMount() {
    this.fetchGroupMatches().catch(err => console.log(err));
  }

  async fetchGroupMatches() {
    const url = 'https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json';
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      teams: data.teams,
      matches: data.groups[this.state.selection].matches,
      stadiums: data.stadiums,
      group: {
        name: data.groups[this.state.selection].name
      }
    });
  }

  render() {
    const { group, matches, teams, stadiums } = this.state;
    if (!group.name) {
      return <div>Loading...</div>;
    }

    const listOfMatches = matches.map(match => {
      const home_team = teams.find(team => match.home_team === team.id);
      const away_team = teams.find(team => match.away_team === team.id);
      const matchStadium = stadiums.find(stadium => match.stadium === stadium.id);
      return (
        <Match
          matchStadium={matchStadium}
          homeTeam={home_team}
          awayTeam={away_team}
          key={match.name}
          {...match}
        />
      );
    });

    return (
      <div className="App">
        <GroupForm updateApp={this.fetchGroupMatches.bind(this)}/>
        <h1>{group.name}</h1>
        <div>{listOfMatches}</div>
      </div>
    );
  }
}

export default App;
