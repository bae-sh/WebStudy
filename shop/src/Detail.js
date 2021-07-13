import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import "./Detail.scss";
import { stackContext } from "./App.js";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

/*let Box = styled.div`
    padding: 20px;
`;
let 제목 = styled.h4`
    font-size: 25px;
    color: ${ props => props.색상}
`; //styled compoent*/

// class Detail2 extends React.Component{
//     componentDidMount() {//생성될때

//     }
//     componentWillUnmount() {//사라질때

//     }
// }

function Detail(props) {
  let { id } = useParams(); //??
  let history = useHistory(); //Router안에 내장 함수
  let shoe = props.shoes.find((shoe) => shoe.id == id);
  let [alert, _alert] = useState(true);
  let [detail, _detail] = useState(0);
  let [tap, setTap] = useState(0);
  let [Switch, setSwitch] = useState(false);

  useEffect(() => {
    // 컴포넌트가 mount되었을때 update 될때 특정코드 실행
    axios.get();
    let timer = setTimeout(() => {
      _alert(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    }; // 타임이 다 되기 전에 페이지 이동시 타이머 제거
    // return () =>{ }//unMount가 될때 실행
  }, [alert]); //실행 조건 넣기 alert 조건이 변할떄만 실행 [] 이면 처음 한번 빼고 실행 전혀 안됨

  return (
    <div className="container">
      {alert === true ? <Alert /> : null}
      <div></div>
      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" +
              (Number(id) + 1) +
              ".jpg"
            }
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{shoe.title} </h4>
          <p>{shoe.content}</p>
          <p>{shoe.price}</p>
          <Info stack={props.stack} id={id} />
          <div>
            <input
              onChange={(e) => {
                _detail(e.target.value);
              }}
            ></input>
          </div>
          <button
            className="btn btn-danger"
            onClick={() => {
              props.dispatch({
                type: "추가",
                payload: { id: shoe.id, name: shoe.title, quan: detail },
              });
              history.push("/cart");
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack(); // 구글링 해서 알기
              // history.push('/');
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              setSwitch(false);
              setTap(0);
            }}
          >
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              setSwitch(false);
              setTap(1);
            }}
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <CSSTransition in={Switch} classNames="wow" timeout={500}>
        <TapContent tap={tap} setSwitch={setSwitch} />
      </CSSTransition>
    </div>
  );
}

function TapContent(props) {
  // if 문항이 3개이상일때 컴포넌트 생성

  useEffect(() => {
    props.setSwitch(true);
  });

  if (props.tap === 0) {
    return <div>0 번째</div>;
  } else if (props.tap === 1) {
    return <div>1 번째</div>;
  } else if (props.tap === 2) {
    return <div>2 번째</div>;
  }
}

function Info(props) {
  let stack = useContext(stackContext);
  return <p>재고: {stack[props.id]}</p>;
}
function Alert() {
  return (
    <div className="my-alert2">
      <p>"재고가 얼마 남지 않았습니다."</p>
    </div>
  );
}

function state를props화(state) {
  return {
    state: state.reducer,
    alert: state.reducer2,
  };
}
export default connect(state를props화)(Detail);
//get요청 : 특정 페이지 / 자료 읽기
// post요청: 서버로 중요 정보 전달
// ajax 1.jquery 설치 $.ajax 2. axios axios.get() 선택 3. 쌩자바 fetch()
// axios는 변환이 잘되고 object로 바꿔주는 장점!
