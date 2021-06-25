import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from 'styled-components';
import './Detail.scss'

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


    let { id } = useParams();//??
    let history = useHistory();//Router안에 내장 함수
    let shoe = props.shoes.find((shoe) => shoe.id == id);
    let [alert, _alert] = useState(true);
    let [detail, _detail] = useState('');

    useEffect(() => {// 컴포넌트가 mount되었을때 update 될때 특정코드 실행
        axios.get();
        let timer = setTimeout(() => { _alert(false); }, 2000);
        return () => { clearTimeout(timer) };// 타임이 다 되기 전에 페이지 이동시 타이머 제거
    // return () =>{ }//unMount가 될때 실행
    },[alert]);//실행 조건 넣기 alert 조건이 변할떄만 실행 [] 이면 처음 한번 빼고 실행 전혀 안됨
 

    return (
        <div className="container">
            <h3 className="red">Detail</h3>
            <input onChange={(e) => { _detail(e.target.value) }} />
            {detail}
            {alert === true ? <Alert/> : null}
            <div></div>
            <div className="row">
                <div className="col-md-6">
                <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{shoe.title} </h4>
                <p>{shoe.content}</p>
                    <p>{shoe.price}</p>
                    <Info stack={props.stack}/>
                    <button className="btn btn-danger">주문하기</button> 
                        <button className="btn btn-danger" onClick={() => {
                        history.goBack();// 구글링 해서 알기
                        // history.push('/');
                        
                }}>뒤로가기</button> 
                    </div>
                </div>
        </div>
      
  )
}

function Info(props) {
    return (
        <p>재고: { props.stack[0]}</p>
    )
}
function Alert() {
    return (
        <div className="my-alert2">
            <p>"재고가 얼마 남지 않았습니다."</p> 
        </div>
    )
}
export default Detail;



//get요청 : 특정 페이지 / 자료 읽기
// post요청: 서버로 중요 정보 전달
// ajax 1.jquery 설치 $.ajax 2. axios axios.get() 선택 3. 쌩자바 fetch()
// axios는 변환이 잘되고 object로 바꿔주는 장점!