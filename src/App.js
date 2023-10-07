import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./Pages/MainPage";
import "./components/stylesheet/main.css";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import ShowPage from "./Pages/ShowPage";
import EditPage from "./Pages/EditPage";
import LogoutPage from "./Pages/LogoutPage";
import NewPage from "./Pages/NewPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/items" element={<HomePage />} />
        <Route path="/items/new" element={<NewPage />} />
        <Route path="/items/:id" element={<ShowPage />} />
        <Route path="/items/:id/edit" element={<EditPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </>
  );
}

export default App;
