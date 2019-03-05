import React, { Component } from 'react';
import './App.css';

import Pool from './Pool';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pools: [0]
    };
  }

  addPool() {
    const pools = this.state.pools;
    pools.push(Math.max(-1, ...pools) + 1);
    this.setState({pools});
  }

  removePool(key) {
    this.setState({pools: this.state.pools.filter(p => p !== key)});
  }

  render () {
    return (
      <div className="App">
        <button onClick={() => this.addPool()}>Add Pool</button>
        {this.state.pools.map((key) => {
          return (
            <div key={key}>
              <button onClick={() => this.removePool(key)}>
                Remove
              </button>
              <Pool />
            </div>
          )
        })}
      </div>
    )
  }
}

export default App;
