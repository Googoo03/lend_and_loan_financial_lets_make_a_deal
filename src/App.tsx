import { BrowserRouter, Routes, Route } from "react-router-dom";
import Doors from "./components/Doors.tsx";
import Title from "./components/Title.tsx";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Title />} />
          <Route path="/doors" element={<Doors />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
