import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
import Match from './components/Match';

class App extends Component {
  state = {
    teams: null,
    matches: null,
    stadiums: null,
    group: {
      name: null
    }
  };

  // handleChanges = (message) => {
  //   this.setState(() => {return {message}});
  // }

  componentDidMount() {
    this.fetchGroupMatches().catch(err => {
      console.log(err);
    });
  }

  async fetchGroupMatches() {
    const url = 'https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json';
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      teams: data.teams,
      matches: data.groups.a.matches,
      stadiums: data.stadiums,
      group: {
        name: data.groups.a.name
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
          key={match.id}
          {...match}
        />
      );
    });

    return (
      <div className="App">
        <h1>{group.name}</h1>
        <div>{listOfMatches}</div>
      </div>
    );
  }
}

export default App;
