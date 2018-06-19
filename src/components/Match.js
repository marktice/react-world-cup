import React from 'react';
import moment from 'moment';

function Match(props) {
  return (
    <div className='match' style={{ background: props.home_result !== null ? 'green' : 'red' }}>
      <p>{moment(props.date).format('MMMM Do h:mm a')}</p>
      <p>
        {props.homeTeam.name} {props.homeTeam.emojiString} vs {props.awayTeam.emojiString} {props.awayTeam.name}
      </p>
      {props.home_result != null && (
        <p>
          {props.home_result} - {props.away_result}
        </p>
      )}
      <img style={{ width: '300px' }} src={props.matchStadium.image} alt="stadium" />
      <p>{props.matchStadium.name}</p>
    </div>
  );
}

export default Match;
