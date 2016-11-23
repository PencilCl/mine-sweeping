import React, { Component } from 'react';
import '../css/common.scss';

import Begin from './begin';
import Game from './game';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			beginGame: 0, // 0 未开始, 1开始, -1结束
			result: false,
			gameParam: {
				row: 16,
				col: 16,
				mine: 20
			},
			show: <Begin oper={this.begin.bind(this)}/>
		}
	}

	getGameParam() {
		return this.state.gameParam;
	}

	begin(newRow, newCol, newMine) {
		this.setState({
			beginGame: 1, // 0 未开始, 1开始, -1结束
			result: false,
			gameParam: {
				row: newRow,
				col: newCol,
				mine: newMine
			},
			show: <Game oper={this.getGameParam.bind(this)}/>
		});
	}
	
	render() {
		return (
			<div>
				{this.state.show}
			</div>
		)
	}
}