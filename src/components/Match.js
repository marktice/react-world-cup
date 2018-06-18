import React, { Component } from 'react';
import moment from 'moment';

function Match(props) {
  const matchStadium = props.stadium

  return (
    <div key={props.key}>
      <p>{moment(props.date).format('MMMM Do h:mm a')}</p>
      <p>{matchStadium.name}</p>
      <p>
        {props.homeTeam.name} {props.homeTeam.emojiString} vs {props.awayTeam.emojiString} {props.awayTeam.name}
      </p>
      {(props.home_result != null) && <p>{props.home_result} - {props.away_result}</p>}
      <hr />
    </div>
  )
}

export default Match;
