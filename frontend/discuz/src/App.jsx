import { Routes,Route } from "react-router-dom"
import Signup from "../components/Signup.jsx"
import Login from "../components/Login.jsx"
import Home from "../components/Home.jsx"

function App() {

  return (
    <> 
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/home"></Route>
        </Routes>
    </>
  )
}

export default App
