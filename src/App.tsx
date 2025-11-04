import { BrowserRouter, Routes, Route } from "react-router-dom";
import Doors from "./components/Doors.tsx";
import Title from "./components/Title.tsx";
import "./App.css";
import { useState, useEffect } from "react";
import uploadPrizeData from "./UploadPrizeData.tsx";

function App() {
  const [uploaded, setuploaded] = useState(false);

  useEffect(() => {
    const uploadImage = async () => {
      if (!uploaded) {
        try {
          // Fetch the image file first
          const response = await fetch("/src/assets/Curtain.png");
          const blob = await response.blob();
          const file = new File([blob], "Curtain.png", { type: "image/png" });

          await uploadPrizeData({
            prizeName: "Curtain",
            prizeImage: file,
          });
          setuploaded(true);
        } catch (error) {
          console.error("Failed to upload prize data:", error);
        }
      }
    };

    uploadImage();
  }, [uploaded]);

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

export default App;
