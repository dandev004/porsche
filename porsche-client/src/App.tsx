import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import ModelsDetails from "./pages/ModelsDetails"
import ModelsStart from "./pages/ModelsStart"

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
          <Route path="/model-pages/:name" element={<ModelsDetails/>}/>
          <Route path="/model-start/:name" element={<ModelsStart/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}
export default App
