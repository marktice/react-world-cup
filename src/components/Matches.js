import React, { Component } from 'react';
import Match from './Match';

// class Matches extends Component {
function Matches({ matches, teams, stadiums, handleWeather }) {
  // const { matches, teams, stadiums } = props;
  const matchesList = matches.map((match) => {
    const home_team = teams.find((team) => match.home_team === team.id);
    const away_team = teams.find((team) => match.away_team === team.id);
    const matchStadium = stadiums.find((stadium) => match.stadium === stadium.id);

    return (
      <Match
        handleWeather={handleWeather}
        matchStadium={matchStadium}
        homeTeam={home_team}
        awayTeam={away_team}
        key={match.name}
        {...match}
      />
    );
  });

  return <div>{matchesList}</div>;
}

export default Matches;
