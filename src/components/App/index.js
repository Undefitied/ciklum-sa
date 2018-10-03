import React, { Component } from 'react'

import { calculateTable, getMatrixArray } from '../../utils';
import { MATRIX_SIZE, MATRIX_TICK_TIME } from '../../config';

import './App.css'

class App extends Component {

  state = {
    table: getMatrixArray(MATRIX_SIZE),
    interval: null,
  }

  tick = time => {
    return setInterval(() => {
      const table = calculateTable(this.state.table)

      this.setState({ table })
    }, time)
  }

  componentDidMount() {
    const interval = this.tick(MATRIX_TICK_TIME)

    this.setState({
      interval,
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  render() {
    const { table } = this.state
    
    return (
      <div className="table">
        {
          table.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {
                row.map((cell, cellIndex) => (
                  <div className={`cell ${ cell ? 'active' : '' }`} key={cellIndex} />
                ))
              }
            </div>
          ))
        }
      </div>
    );
  }
}

export default App;
