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

  dieAdder(faces) {
    return () => {
      const dice = this.state.dice;
      dice.push({faces: faces, value: 0});
      this.setState({dice});
    }
  }

  dieRemover(key) {
    return () => {
      const dice = this.state.dice;
      dice.splice(key, 1);
      this.setState({dice});
    }
  }

  rollDie(key) {
    const dice = this.state.dice;
    dice[key].value = Math.ceil(Math.random() * dice[key].faces);
    this.setState({dice});
  }

  calcSum() {
    return this.state.dice.reduce((acc, die) => acc + die.value, 0);
  }

  rollBack(key) {
    return (newValue) => {
      const dice = this.state.dice;
      dice[key].value = newValue;
      this.setState({dice});
    }
  }

  modTicker(inc) {
    return () => {
      this.setState({mod: this.state.mod + inc});
    }
  }

  render() {
    const dice = this.state.dice.map((die, key) => {
      return <DieComp key={key} className="die col-2"
        die={die}
        rollBack={this.rollBack(key)}
        tearDown={this.dieRemover(key)}
      />
    });
    return (
      <div className="App container">
        <div id="adders" className="row">
          {[4, 6, 8, 10, 100, 12, 20].map((faces, key) => {
            return (
              <button className="col" key={key} onClick={this.dieAdder(faces)}>
                +d{faces}
              </button>
            )
          })}
        </div>
        <div id="controllers">
          <div id="total-display" className="row">
            <div className="col-8" style={{padding: 0}}>
              <button style={{float: "left"}} onClick={this.modTicker(-1)}>
                -
              </button>
              <PoolDescription dice={this.state.dice} mod={this.state.mod} />
              <button style={{float: "right"}} onClick={this.modTicker(1)}>
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
                  this.dieRemover(0)();
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
