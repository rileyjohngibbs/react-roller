import React, { Component } from 'react';
import './App.css';

import Die from './Die';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: [],
      mod: 0
    };
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

  renderDesc() {
    const counts = {};
    this.state.dice.forEach((die) => {
      counts[die.faces] = counts[die.faces] === undefined
        ? 1
        : counts[die.faces] + 1;
    });
    const pool = Object.keys(counts).map(
      (type) => counts[type] + "d" + type
    ).join(" + ");
    const mod = this.state.mod
      ? this.state.mod > 0
        ? " + " + this.state.mod
        : " - " + (-this.state.mod)
      : "";
    return pool + mod;
  }

  renderDie(key) {
    return (
      <div key={key} className="die col-2">
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
    return this.state.dice.reduce((acc, die) => acc + die.value, 0) + this.state.mod;
  }

  render() {
    return (
      <div className="App container">
        <div id="adders" className="row">
          {[4, 6, 8, 10, 100, 12, 20].map((faces, key) => {
            return (
              <button className="col" key={key} onClick={() => {this.addDie(faces);}}>
                +d{faces}
              </button>
            )
          })}
        </div>
        <div id="controllers">
          <div id="total-display" className="row">
            <div className="col-8" style={{padding: 0}}>
              <button className="mod-minus" onClick={() => {
                  this.setState({mod: this.state.mod - 1})
                }}>
                -
              </button>
              <button className="mod-plus" onClick={() => {
                  this.setState({mod: this.state.mod + 1})
                }}>
                +
              </button>
              {this.renderDesc()}
            </div>
            <div className="col-4">
              Total: {this.calcSum()}
            </div>
          </div>
          <div className="row">
            <button className="col" onClick={() => {
                this.state.dice.forEach((_, key) => {
                  this.rollDie(key);
                });
              }}>
              Roll Dice
            </button>
            <button className="col" onClick={() => {
                while (this.state.dice.length) {
                  this.removeDie(0);
                }
                this.setState({mod: 0});
              }}>
              Clear Pool
            </button>
            <button className="col" onClick={() => {
                const dice = this.state.dice;
                dice.forEach((d) => {d.value = 0});
                this.setState({dice});
              }}>
              Reset Dice
            </button>
          </div>
        </div>
        <div id="dicepool" className="row">
          {this.state.dice.map((_, key) => {
            return this.renderDie(key);
          })}
        </div>
      </div>
    );
  }
}

export default App;
