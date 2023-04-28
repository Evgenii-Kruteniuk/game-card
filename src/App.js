import React from "react";
import Main from "./components/main/main";
import Timer from "./components/timer/timer";
import Watch from "./components/watch/watch";
import "./App.css";

function App(props) {
  return (
    <div className="background">
      <Timer />
      <Main />
      {/*<Watch />*/}
    </div>
  );
}

export default App;
