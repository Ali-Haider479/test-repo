
import React from "react"
import TodoList from "./todolist"
import Users from "./users"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/todos/:userId" element={<TodoList />} />
        </Routes>
    </Router>
    // <>
    //   <TodoList/>
    // </>


  )
}

export default App