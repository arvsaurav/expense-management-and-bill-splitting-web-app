import "./App.css";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <div className="Bg">
        <Navbar/>
        <Homepage />
      </div>
    </div>
  );
}

export default App;
