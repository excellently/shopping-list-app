/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class CommandButton extends Component {
  render() {
    return (
      <button
        type='button'
        className='btn btn-link'
        style={{ padding: 11 }}
        onClick={(e) => {
          this.props.onExecute();
          e.stopPropagation();
        }}
        title={this.props.hint}
      >
        <span className={this.props.color || 'undefined'}>
          {this.props.icon
            ? <i className={`oi oi-${this.props.icon}`} style={{ marginRight: this.props.text ? 5 : 0 }} />
            : null}
          {this.props.text}
        </span>
      </button>
    );
  }
}

export default CommandButton;
