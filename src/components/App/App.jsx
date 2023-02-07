import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import './App.css'
import Menu from '../Menu/Menu'
import People from '../People/People'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = '/' element ={<Menu />}/>
        <Route  path = '/people' element = {<People />}/>
      </Routes> 
    </div>
  )
}

export default App
