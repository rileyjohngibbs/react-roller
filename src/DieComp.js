import React, { Component } from 'react';

class DieComp extends Component {
  roll() {
    this.props.rollBack(Math.ceil(Math.random() * this.props.faces));
  }

  render() {
    return (
      <div className={this.props.className}>
        <button onClick={() => this.roll()}>
          {this.props.value}
        </button>
        <div className="die-label">
          d{this.props.faces}
        </div>
        <div className="die-remove">
          <button onClick={() => this.props.tearDown()}>
            Drop
          </button>
        </div>
      </div>
    )
  }
}

export default DieComp;
