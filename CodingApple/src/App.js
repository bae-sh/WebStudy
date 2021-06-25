import './App.css';
import { useState } from 'react';
import React from 'react';
function App() {

  let [title, _title] = useState(['남자 코트 추천', '맛집 추천', '영화 추천'])
  var [cnt, c] = useState(0);
  let [modal, _modal] = useState(false);//UI보임 안보임을 state로 저장해둠 중요한 정보는 state로 저장
  var [num, _num] = useState(0);
  let [inputValue, _inputValue] = useState('');

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 Blog</div>
      </div>
      {
        title.map(function (t, i) {//map 반복문으로 돌린 html에는 key 필요
          return (
            < div className="list" key={i} >
              <h2 onClick={() => { _num(i) }}> {t}
                <span onClick={() => { c(cnt + 1); }}>👍</span> {cnt} {/*span은 줄바꿈 x 문장 단위 의 영역 */}
              </h2>
              <p>2월 19일 발행</p>
              <hr />
            </div>
          )
        })
      }
      {/* <input onChange={(e) => { _inputValue(e.target.value) }}></input> */}
      <div className="publish">
        <input onChange={(e) => {
          _inputValue(e.target.value)
        }} />
        <button onClick={() => {
          var newTitle = [...title];// spraied operator?
          newTitle.unshift(inputValue);
          _title(newTitle);
        }}>저장</button>
      </div>
      {console.log(1111)}
      <button onClick={() => { _modal(!modal) }}>열고 닫기</button>
      {
        modal ? <Modal title={title} num={num}></Modal> : null
      }

    </div >
  );
}

function Modal(props) {//새로운 component 만드는법
  return (
    <div className="modal">
      <h2>{props.title[props.num]}</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}
export default App;

/*class Profile extends React.Component {
  constructor() {
    super();
    this.state = { name: 'Kim'}
  }
  changeName = () => {
    this.setState({ name: 'Park'})
  }
  render() {
    return (
      <div>
        <h3> 프로필입니다. {this.state.name }</h3>
        <button onClick={this.changeName}>버튼</button>
      </div>
    )
  }
}*/
