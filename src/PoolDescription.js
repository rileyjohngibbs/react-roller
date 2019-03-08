import React, { Component } from 'react';

class PoolDescription extends Component {
  render() {
    const counts = {};
    this.props.dice.forEach((die) => {
      counts[die.faces] = counts[die.faces] === undefined
      ? 1
      : counts[die.faces] + 1;
    });
    const pool = Object.keys(counts).map(
      (type) => counts[type] + "d" + type
    ).join(" + ");
    const mod = this.props.mod
      ? this.props.mod > 0
        ? " + " + this.props.mod
        : " - " + (-this.props.mod)
      : "";
    return (
      <span>
        {pool + mod}
      </span>
    )
  }
}

export default PoolDescription;
