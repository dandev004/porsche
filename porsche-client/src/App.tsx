import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"

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
          <Route path="/" element={<Home/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}
export default App
