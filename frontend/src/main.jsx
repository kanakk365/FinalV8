import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import MainLayout from "./MainLayout";

createRoot(document.getElementById("root")).render(
  <MainLayout>
    {" "}
    <StrictMode>
      <App />
    </StrictMode>
    ,
  </MainLayout>
);
