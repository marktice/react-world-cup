import React from 'react';
import moment from 'moment';

function Match(props) {
  return (
    <div>
      <p>{moment(props.date).format('MMMM Do h:mm a')}</p>
      <p>{props.matchStadium.name}</p>
      <img style={{width: '250px'}} src={props.matchStadium.image} alt="stadium" />
      <p>
        {props.homeTeam.name} {props.homeTeam.emojiString} vs {props.awayTeam.emojiString} {props.awayTeam.name}
      </p>
      {(props.home_result != null) && <p>{props.home_result} - {props.away_result}</p>}
      <hr />
    </div>
  )
}

export default Match;
