import React, { Component } from 'react';

import './App.css';
import Matches from './components/Matches';
import GroupForm from './components/GroupForm';

require('dotenv').config()

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
  
  async getWeather(stadium) {
    const lat = stadium.lat;
    const lng = stadium.lng;
    const weatherUrl = `https://api.darksky.net/forecast/${process.env.darkSkyApiKey}/${lat},${lng}?units=si`;
    const response = await fetch(weatherUrl)
    return await response.json()
  }

  handleWeather = (stadium) => {
    const response = this.getWeather(stadium)
    const currentTemp = response.data.currently.temperature;
    const currentApparentTemp = response.data.currently.apparentTemperature;
    console.log(`
      It's currently ${currentTemp} celsius. 
      It feels like ${currentApparentTemp} celsius`
    );
    return (
      <div>
        <p>It's currently {currentTemp} celsius.</p>
        <p>It feels like {currentApparentTemp} celsius</p>
      </div>
    )
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
    const { group } = this.state;
    if (!group.name) {
      return <div>Loading...</div>;
    }

    return (
      <div className="App">
        <GroupForm handleGroupChange={this.handleGroupChange} />
        <h1>{group.name}</h1>
        <h2>{process.env.TEST}</h2>
        <Matches handleWeather={this.handleWeather} {...this.state} />
      </div>
    );
  }
}

export default App;
