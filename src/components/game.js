import React, { Component } from 'react';
import './game.scss';

export default class Game extends Component {
	constructor(props) {
		super(props);

		this.param = this.props.oper();

		this.state = {
			isGameOver: false,
			win: false,
			pane: this.initialPane()
		}
	}
	
	repeat(n, val) {
		const res = [];
		while (n--) {
			let newVal = {
				isMine: val.isMine,
				reveal: val.reveal
			}
			res.push(newVal);
		}
		return res;
	}

	shuffle(list) {
		return list.sort(() => Math.random() - 0.5);
	}

	initialPane() {
		let total = this.param.row * this.param.col;
		let mines = this.param.mine;
		return this.shuffle(this.repeat(mines, {isMine: true, reveal: false}).concat(this.repeat(total - mines, {isMine: false, reveal: false}))).map((pane, idx) => {
				pane.id = idx;
				return pane;
			});
	}

	getRowColById(id) {
		return [id/(this.param.col), id%(this.param.col)];
	}

	neibours(id) {
		let [row, col] = this.getRowColById(id);
		return [
			row>0&&col>0?this.state.pane[id - this.param.col - 1]:null,
			row>0?this.state.pane[id - this.param.col]:null,
			row>0&&col<this.param.col?this.state.pane[id - this.param.col + 1]:null,
			col>0?this.state.pane[id - 1]:null,
			col<this.param.col?this.state.pane[id + 1]:null,
			row<this.param.row&&col>0?this.state.pane[id + this.param.col - 1]:null,
			row<this.param.row?this.state.pane[id + this.param.col]:null,
			row<this.param.row&&col<this.param.col?this.state.pane[id + this.param.col + 1]:null
		]
	}

	isWin() {
		let panes = this.state.pane;
		return panes.filter((pane) => !pane.reveal&&!pane.isMine).length === 0;
	}

	updateState(id) {
		let newState = this.state;
		// 踩雷游戏结束
		if (newState.pane[id].isMine) {
			newState.isGameOver = true;
			this.setState(newState);
			return ;
		}
		// 更新数据
		newState.pane[id].reveal = true;
		this.setState(newState);
		// 获取当前格子周围的炸弹数量
		let paneNeibours = this.neibours(id);
		let mines = paneNeibours.filter((pane) => pane&&pane.isMine).length;
		if (mines === 0) {
			// 炸弹数为0，则翻转该格子周围的格子
			paneNeibours.map((pane) => {
				if (pane && !pane.reveal) {
					this.updateState(pane.id);
				}
			});
		} else {
			// 判断游戏是否结束
			if (this.isWin()) {
				newState.win = true;
				newState.isGameOver = true;
				this.setState(newState);
				return ;
			}
			// 否则更新当前格子炸弹数量
			newState.pane[id].mines = mines;
			this.setState(newState);
		}
	}

	reveal(e) {
		let id = parseInt(e.target.getAttribute('id'));
		this.updateState(id);
	}

  render() {
  	// Gameover
  	if (this.state.isGameOver) {
  		return (<div>{this.state.win ? "win" : "false" }</div>)
  	}

  	let rows = [];
  	for (var i = 0; i < this.param.row; ++i) {
  		let row = [];
  		for (var j = 0; j < this.param.col; ++j) {
  			row.push(this.state.pane[i * this.param.row + j]);
  		}
  		rows.push(row);
  	}

    return (
      <div className="border" style={{width: (this.param.col * 27 + (this.param.col + 2) * 2)}}>
      	{rows.map((row) => <div className="row">{row.map((pane) => pane.reveal?<div className={"pane reveal " + (pane.isMine?"mine":"")} id={pane.id}>{pane.mines?pane.mines:''}</div>:<div className="pane" id={pane.id} onClick={this.reveal.bind(this)}></div>)}</div>)}
      </div>
    );
  }
}

Game.propTypes = {
	oper: React.PropTypes.func
}