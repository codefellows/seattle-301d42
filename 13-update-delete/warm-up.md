# Warm-Up Exercise
This code sample is written in JavaScript and JSX. Read through the code and determine the output for this function.

```
import React, { Component } from "react";

export default class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mascot: "Seahawks",
      roster: [
        {
          id: 12345,
          name: "Russel Wilson",
          position: "Quarterback",
          playing: true
        },
        {
          id: 23456,
          name: "Earl Thomas III",
          position: "Strong Safety",
          playing: true
        },
        {
          id: 34567,
          name: "Doug Baldwin",
          position: "Wide Receiver",
          playing: false
        }
      ]
    };
  }

  togglePlaying = changedPlayer => {
    changedPlayer.playing = !changedPlayer.playing;
    const updatedRoster = this.state.roster.map(player => {
      return player.id === changedPlayer.id ? changedPlayer : player;
    });
    this.setState({ roster: updatedRoster });
  };

  render() {
    return (
      <div>
        <h2>{this.state.mascot} Roster</h2>
        <ul>
          {this.state.roster.map(player => (
            <li key={player.id}>
              <div>
                <strong>{player.name}</strong>
                <p>Position: {player.position}</p>
                <input
                  type="checkbox"
                  onChange={() => this.togglePlaying(player)}
                  checked={player.playing}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
```
