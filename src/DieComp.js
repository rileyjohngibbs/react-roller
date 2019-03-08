import React, { Component } from 'react';

class DieComp extends Component {
  constructor(props) {
    super(props)
    this.roll = this.roll.bind(this);
  }

  roll() {
    this.props.rollBack(Math.ceil(Math.random() * this.props.die.faces));
  }

  render() {
    return (
      <div className={this.props.className}>
        <button onClick={this.roll}>
          {this.props.die.value}
        </button>
        <div className="die-label">
          d{this.props.die.faces}
        </div>
        <div className="die-remove">
          <button onClick={this.props.tearDown}>
            Drop
          </button>
        </div>
      </div>
    )
  }
}

export default DieComp;
