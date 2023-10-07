import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Logout from "./components/Logout/Logout";
import CustomNavbar from "./components/Navbar/CustomNavbar";
import LoggedInUserLandingPage from "./components/LoggedInUserLandingPage/LoggedInUserLandingPage";
import AddFriend from "./components/AddFriend/AddFriend";
import Friends from "./components/ManageFriends/ManageFriends";

function App() {

  const [userState, setUserState] = useState({
    'doesUserLoggedIn': false,
    'email': '',
    'name': ''
  });

  useEffect(() => {
    console.log(userState);
  }, [userState]);

  return (
    <div className="App">
      <div className="Bg">
        <BrowserRouter>
          { userState.doesUserLoggedIn ? <CustomNavbar userState={userState}/> : <Navbar/> }
          <Routes>
            <Route exact path="/" Component={Homepage}/>
            <Route path="login" element={<Login setUserState={setUserState} />}/>
            <Route path="register" Component={Register}/>
            <Route path="logout" element={<Logout userState={userState} setUserState={setUserState} />}/>
            <Route path="landingpage" element={<LoggedInUserLandingPage userState={userState} />}/>
            <Route path="addfriend" Component={AddFriend}/>
            <Route path="friends" element={<Friends userState={userState} />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
