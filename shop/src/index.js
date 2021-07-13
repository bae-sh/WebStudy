import React from "react";
import ReactDOM, { unstable_renderSubtreeIntoContainer } from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

let 초기값 = [
  { id: 11, name: "미니 신발", quan: 2 },
  { id: 12, name: "이쁜 신발", quan: 3 },
  { id: 13, name: "비싼 신발", quan: 1 },
];

function reducer(state = 초기값, action) {
  //default  파라미터
  if (action.type === "추가") {
    let shoe = action.payload;
    let copy = [...state];
    var hasShoe = false;
    for (var i = 0; i < copy.length; i++) {
      console.log(2);
      if (copy[i].id === shoe.id) {
        copy[i].quan = Number(copy[i].quan) + Number(shoe.quan);
        hasShoe = true;
      }
    }
    if (!hasShoe) {
      copy.push(action.payload);
    }
    return copy;
  } else if (action.type === "증가") {
    let copy = [...state];
    copy = copy.map((shoe, i) => {
      if (shoe.id === action.id) {
        shoe.quan++;
      }
      return shoe;
    });
    return copy;
  } else if (action.type === "감소") {
    let copy = [...state];
    copy = copy.map((shoe, i) => {
      if (shoe.id === action.id && shoe.quan > 0) {
        shoe.quan--;
      }
      return shoe;
    });
    return copy;
  } else {
    return state;
  }
}

function reducer2(state = true, action) {
  if (action.type === "닫기") {
    state = false;
  }
  return state;
}

let store = createStore(combineReducers({ reducer, reducer2 }));
//hashRouther 안전.
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
