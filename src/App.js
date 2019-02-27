import React, { Component } from 'react';
import './App.css';

import Die from './Die';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {dice: []};
  }

  addDie(faces) {
    const dice = this.state.dice;
    dice.push(new Die(faces));
    this.setState({dice});
  }

  removeDie(key) {
    const dice = this.state.dice;
    dice.splice(key, 1);
    this.setState({dice});
  }

  rollDie(key) {
    const dice = this.state.dice;
    dice[key].value = dice[key].roll();
    this.setState({dice});
  }

  renderDie(key) {
    return (
      <div key={key} className="die">
        <button onClick={() => this.rollDie(key)}>
          {this.state.dice[key].value}
        </button>
        <div className="die-label">
          d{this.state.dice[key].faces}
        </div>
        <div className="die-remove">
          <button onClick={() => this.removeDie(key)}>
            Drop
          </button>
        </div>
      </div>
    )
  }

  calcSum() {
    return this.state.dice.reduce((acc, die) => acc + die.value, 0);
  }

  render() {
    return (
      <div className="App">
        <div id="adders">
          {[4, 6, 8, 10, 100, 12, 20].map((faces, key) => {
            return (
              <button key={key} onClick={() => {this.addDie(faces);}}>
                +d{faces}
              </button>
            )
          })}
        </div>
        <div id="controllers">
          <div id="total-display">
            Total: {this.calcSum()}
          </div>
          <div>
            <button onClick={() => {
                this.state.dice.forEach((_, key) => {
                  this.rollDie(key);
                });
              }}>
              Roll Dice
            </button>
            <button onClick={() => {
                while (this.state.dice.length) {
                  this.removeDie(0);
                }
              }}>
              Clear Pool
            </button>
            <button onClick={() => {
                const dice = this.state.dice;
                dice.forEach((d) => {d.value = 0});
                this.setState({dice});
              }}>
              Reset Dice
            </button>
          </div>
        </div>
        <div id="dicepool">
          {this.state.dice.map((_, key) => {
            return this.renderDie(key);
          })}
        </div>
      </div>
    );
  }
}

export default App;
