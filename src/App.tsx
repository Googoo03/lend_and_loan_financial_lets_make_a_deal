import { BrowserRouter, Routes, Route } from "react-router-dom";
import Door1 from "./components/Door1.tsx";
import Title from "./components/Title.tsx";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Title />} />
          <Route path="/door1" element={<Door1 />} />
          <Route path="/door2" element={<Door1 />} />
          <Route path="/door3" element={<Door1 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
