import Dashboard from "./ui/Dashboard";
import Navbar from "./ui/Navbar";
import RightSideBar from "./ui/RightSideBar";
import './App.css';
import { useState } from "react";
 

function App() {
  const [Open, setOpen] = useState(false);
 

  const HandleOpen = () => {
    setOpen(!Open);
  };


  return (
    <div className="App">
      <div>
        <Navbar />
        <Dashboard HandleOpen={HandleOpen}  />
      </div>
      <div>
        <RightSideBar Open={Open} HandleOpen={HandleOpen} />
      </div>
     
    </div>
  );
}

export default App;
