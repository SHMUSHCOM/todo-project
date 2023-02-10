import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./layout/header";
import LeftPanel from "./layout/panel-left";
import RightPanel from "./layout/panel-right";
import Main from "./layout/main";
import Content from "./layout/content";



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
