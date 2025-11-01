import { BrowserRouter, Routes, Route } from "react-router-dom";
import Title from "./components/Title.tsx";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Title />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
