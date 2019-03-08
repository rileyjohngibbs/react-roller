import React, { Component } from 'react';
import './App.css';

import DieComp from './DieComp';
import PoolDescription from './PoolDescription';

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
    dice.push({faces: faces, value: 0});
    this.setState({dice});
  }

  removeDie(key) {
    const dice = this.state.dice;
    dice.splice(key, 1);
    this.setState({dice});
  }

  rollDie(key) {
    const dice = this.state.dice;
    dice[key].value = Math.ceil(Math.random() * dice[key].faces);
    this.setState({dice});
  }

  calcSum() {
    return this.state.dice.reduce((acc, die) => acc + die.value, 0);
  }

  render() {
    const dice = this.state.dice.map((die, key) => {
      return <DieComp key={key} className="die col-2"
        faces={die.faces}
        value={die.value}
        rollBack={(newValue) => {
          const dice = this.state.dice;
          dice[key].value = newValue;
          this.setState({dice});
        }}
        tearDown={() => this.removeDie(key)}
      />
    });
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
              <button style={{float: "left"}} onClick={() => {this.setState({mod: this.state.mod - 1})}}>
                -
              </button>
              <PoolDescription dice={this.state.dice} mod={this.state.mod} />
              <button style={{float: "right"}} onClick={() => {this.setState({mod: this.state.mod + 1})}}>
                +
              </button>
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
          {dice}
        </div>
      </div>
    );
  }
}

export default App;
