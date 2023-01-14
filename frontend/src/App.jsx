import react from 'react'
import styled from 'styled-components'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './layout/header'
import SidePanel from './layout/panel'
import Main from './layout/main'
import Content from './layout/content'
import Songs from './pages/songs'
import Artists from './pages/artists'
import Playlists from './pages/playlists'


function App() {
  return <BrowserRouter>
    <Header></Header>
    <Main>
      <SidePanel></SidePanel>
      <Content>
        <Routes>
          <Route path='/' element={<h1>Home Page</h1>}></Route>
          <Route path='/artists' element={<Artists/>}></Route>
          <Route path='/songs' element={<Songs/>}></Route>
          <Route path='/playlists' element={<Playlists/>}></Route>
        </Routes>
      </Content>
    </Main>
    
  </BrowserRouter>
}

export default App
