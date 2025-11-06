import { BrowserRouter, Routes, Route } from "react-router-dom";
import Doors from "./components/Doors.tsx";
import Title from "./components/Title.tsx";
import "./App.css";
//import { useState, useEffect } from "react";
//import uploadPrizeData from "./UploadPrizeData.tsx";
//import Curtain from "./assets/Curtain.png";

function App() {
  //const [uploaded, setuploaded] = useState(false);
  /*
  useEffect(() => {
    const uploadImage = async () => {
      if (!uploaded) {
        try {
          await uploadPrizeData({
            prizeName: "Curtain",
            prizeImage: Curtain, // This is now the imported image URL
          });
          setuploaded(true);
        } catch (error) {
          console.error("Failed to upload prize data:", error);
        }
      }
    };

    uploadImage();
  }, [uploaded]);*/

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
