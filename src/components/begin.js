import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import './begin.scss';

export default class Begin extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeRow = this.handleChangeRow.bind(this);
		this.handleChangeCol = this.handleChangeCol.bind(this);
		this.handleChangeMine = this.handleChangeMine.bind(this);

		this.state = {
			row: 16,
			col: 16,
			mine: 20
		}
	}

	handleChangeRow(e) {
		let newState = this.state;
		newState.row = parseInt(e.target.value);
		this.setState(newState);
	}
	handleChangeCol(e) {
		let newState = this.state;
		newState.col = parseInt(e.target.value);
		this.setState(newState);
	}
	handleChangeMine(e) {
		let newState = this.state;
		newState.mine = parseInt(e.target.value);
		this.setState(newState);
	}

  handleSubmit(e) {
  	let numberValid = (number) => number >= 1 && number <=30;
  	// get real dom
  	let row = this.state.row;
		let col = this.state.col;
		let mine = this.state.mine;

		if (isNaN(row) || isNaN(col) || isNaN(mine) || mine >= row * col) {
			alert("输入数据非法！");
		} else {
			if (numberValid(row) && numberValid(col)) {
				this.props.oper(row, col, mine);
			} else {
				alert("输入数据非法！");
			}
		}
  }

  render() {
    return (
      <div id="container">
      	<form>
	      	<label htmlFor="row">游戏规格:</label>
					<input type="number" name="row" placeholder="row number" min="1" max="30" value={this.state.row} onChange={this.handleChangeRow}/>
					<input type="number" name="col" placeholder="col number" min="1" max="30" value={this.state.col} onChange={this.handleChangeCol}/>
					<label htmlFor="mine">地雷数:</label>
					<input type="number" name="mine" placeholder="mine number" min="1" max="900" value={this.state.mine} onChange={this.handleChangeMine}/>
					<button type="button" onClick={this.handleSubmit}>开始游戏</button>
      	</form>
      </div>
    );
  }
}