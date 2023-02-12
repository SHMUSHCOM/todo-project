import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/layout/header";
import LeftPanel from "./components/layout/panel-left";
import RightPanel from "./components/layout/panel-right";
import Main from "./components/layout/main";
import Content from "./components/layout/content";



function App() {

  return (
    <React.Fragment>
      <Header/>
      <Main>
        <LeftPanel/>
        <Content>
          <Outlet/>
        </Content>
        <RightPanel/>
      </Main>
    </React.Fragment>
  );
}

export default App;
