import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom"
import Header from "./components/Header"
import Hero from "./pages/Hero"

function Layout(){
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Layout/>}>
          <Route path="/" element={<Hero/>}/>
          </Route>
        </Routes>
      </Router>
      
    </div>
  )
}

export default App
