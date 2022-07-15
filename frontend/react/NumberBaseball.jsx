// 클래스형 컴포넌트 숫자야구 게임

import React, { Component } from 'react';

function ranmderNumber() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chose = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chose);
  }

  return array;
}

ranmderNumber();

class NumberBaseball extends Component {
  state = {
    userInput: '',
    result: '',
    quiz: ranmderNumber(),
    tries: [],
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.quiz.join('') === this.state.userInput) {
      this.setState({
        result: '홈런!',
        userInput: '',
        quiz: ranmderNumber(),
        tries: [...this.state.tries, { try: this.state.userInput, result: '홈런!' }],
      });
    } else {
      const userInputArray = this.state.userInput.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        this.setState({
          result: `10번 넘게 시도했습니다. 정답은 ${this.state.quiz.join(',')} 였습니다.`,
        });
        alert('게임을 다시 시작합니다.');
        this.setState({
          userInput: '',
          quiz: ranmderNumber(),
          tries: [],
        });
      } else {
        for (let i = 0; i < 4; i++) {
          if (userInputArray[i] === this.state.quiz[i]) {
            strike += 1;
          } else if (this.state.quiz.includes(userInputArray[i])) {
            ball += 1;
          }
        }
        this.setState({
          tries: [...this.state.tries, { try: this.state.userInput, result: `${strike} 스트라이크, ${ball}볼 입니다.` }],
          userInput: '',
        });
      }
    }
  };

  onChange = (e) => {
    this.setState({
      userInput: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input value={this.state.userInput} onChange={this.onChange} type="number" />
          <button>확인</button>
        </form>
        <div>시도 : {this.state.tries.length}</div>
        <ul>
          {this.state.tries.map((v, index) => {
            return (
              <li key={`${index + 1}차 시도`}>
                {v.try} : {v.result}
              </li>
            );
          })}
        </ul>
        <div>{this.state.result}</div>
      </div>
    );
  }
}

export default NumberBaseball;
