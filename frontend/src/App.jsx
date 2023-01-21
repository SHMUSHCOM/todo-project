
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './layout/header'
import LeftPanel from './layout/left-panel'
import RightPanel from './layout/right-panel'
import Main from './layout/main'
import Content from './layout/content'
import ListView from './pages/list'
import BoardView from './pages/board'
import TimelineView from './pages/timeline'
import Page404 from './pages/404'



function App() {
  return <BrowserRouter>
    <Header></Header>
    <Main>
      <LeftPanel></LeftPanel>
      <Content>
        <Routes>
          <Route path='/list' element={<ListView/>}></Route>
          <Route path='/board' element={<BoardView/>}></Route>
          <Route path='/timeline' element={<TimelineView/>}></Route>
          <Route path='*' element={<Page404/>}></Route>
        </Routes>
      </Content>
      <RightPanel></RightPanel>
    </Main>
    
  </BrowserRouter>
}

export default App
