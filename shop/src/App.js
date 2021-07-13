import "./App.css";
import { Navbar, Container, Nav, NavDropdown, Carousel } from "react-bootstrap";
import { useContext, useState } from "react";
import data from "./data.js";
import Detail from "./Detail.js";
import { Link, Route, Switch } from "react-router-dom"; //Switch는 경로가 중복되어 나올때 하나만 보이게 함
import axios from "axios";
import React from "react";
import Cart from "./Cart.js";

export let stackContext = React.createContext(); //같은 값을 공유할 범위

function App() {
  let [shoes, _shoes] = useState(data);
  let [stack, _stack] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/detail">
                Detail
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <div className="jumbo" style={{ height: "280px" }}>
            <h1>20% Season Off</h1>
            <button>버튼</button>
          </div>

          <div className="container">
            <stackContext.Provider value={stack}>
              <div className="row">
                {shoes.map((shoe, index) => {
                  return <Shoe shoe={shoe} index={index} />;
                })}
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    axios.post("서버URL");
                    axios
                      .get("https://codingapple1.github.io/shop/data2.json")
                      .then((res) => {
                        _shoes([...shoes, ...res.data]); //...은 대괄호를 벗기자의미
                      }) //성공했을떄 실행
                      .catch(() => {
                        console.log("실패");
                      }); //실패했을때 실행
                  }}
                >
                  더보기
                </button>
              </div>
            </stackContext.Provider>
          </div>
        </Route>
        <Route path="/detail/:id">
          <stackContext.Provider value={stack}>
            <Detail shoes={shoes} stack={stack} _stack={_stack} />
          </stackContext.Provider>
        </Route>

        <Route paht="/cart">
          <Cart></Cart>
        </Route>
        <Route path="/:id">
          <div>아무거나</div>
        </Route>
      </Switch>
      {/* <Route path="/어쩌고" component={Modal }></Route> 
      :~~ 아무문자나 받겠다 파라미터 문법*/}
    </div>
  );
}

function Shoe(props) {
  let stack = useContext(stackContext);

  return (
    <Link className="col-md-4" to={"./detail/" + props.index}>
      <div>
        <img
          src={
            "https://codingapple1.github.io/shop/shoes" +
            (props.index + 1) +
            ".jpg"
          }
          width="100%"
        />
        <h4>{props.shoe.title}</h4>
        <p>
          {props.shoe.content} & {props.shoe.price}
        </p>
      </div>
    </Link>
  );
}

/* {}변수 넣기 "123" + i + "123"  가능 */
export default App;
