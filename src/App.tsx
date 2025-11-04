import { BrowserRouter, Routes, Route } from "react-router-dom";
import Doors from "./components/Doors.tsx";
import Title from "./components/Title.tsx";
import "./App.css";
import { useState } from "react";

function App() {
  const [uploaded, setuploaded] = useState(false);

  if (!uploaded) {
    setuploaded(true);
    uploadPrizeData({
      prizeName: "Curtain",
      prizeImage: "assets/Curtain.png", // or a File object
    });
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Title clickLink="/doors" />} />
          <Route path="/doors" element={<Doors />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
import uploadPrizeData from "./UploadPrizeData.tsx";

export default App;
