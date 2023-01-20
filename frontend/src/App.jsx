
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './layout/header'
import LeftPanel from './layout/left-panel'
import RightPanel from './layout/right-panel'
import Main from './layout/main'
import Content from './layout/content'
import TodoList from './pages/todo-list'
import Page404 from './pages/404.jsx'



function App() {
  return <BrowserRouter>
    <Header></Header>
    <Main>
      <LeftPanel></LeftPanel>
      <Content>
        <Routes>
          <Route path='/list' element={<TodoList/>}></Route>
          <Route path='/board' element={<h1>Board</h1>}></Route>
          <Route path='/timeline' element={<h1>Timeline</h1>}></Route>
          <Route path='*' element={<Page404/>}></Route>
        </Routes>
      </Content>
      <RightPanel></RightPanel>
    </Main>
    
  </BrowserRouter>
}

export default App
