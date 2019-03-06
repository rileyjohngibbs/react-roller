import React, { Component } from 'react';
import './App.css';

import Pool from './Pool';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pools: [{key: 0, calcType: "sum"}]
    };
  }

  addPool() {
    const pools = this.state.pools;
    pools.push({key: Math.max(-1, ...pools.map(p => p.key)) + 1, calcType: "sum"});
    this.setState({pools});
  }

  removePool(key) {
    this.setState({pools: this.state.pools.filter(p => p.key !== key)});
  }

  render () {
    return (
      <div className="App">
        {this.state.pools.map((pool) => {
          return (
            <div key={pool.key} className="container">
              <div className="row">
                <select id={'type' + pool.key} className="col-8"
                  onChange={(value) => {
                    const pools = this.state.pools;
                    const pool_ = pools.find(p => p.key === pool.key);
                    pool_.calcType = document.querySelector('#type' + pool.key).value;
                    this.setState({pools});
                  }} defaultValue="sum">
                  <option value="sum">Sum</option>
                  <option value="max">Max</option>
                </select>
                <button className="col-4" onClick={() => this.removePool(pool.key)}>
                  Remove
                </button>
              </div>
              <div className="row">
                <Pool calcType={pool.calcType} />
              </div>
            </div>
          )
        })}
        <button onClick={() => this.addPool()}
          style={{width: '100%'}}>
            Add Pool
        </button>
      </div>
    )
  }
}

export default App;
