import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <div className="Bg">
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route exact path="/" Component={Homepage}/>
            <Route path="login" Component={Login}/>
            <Route path="register" Component={Register}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
