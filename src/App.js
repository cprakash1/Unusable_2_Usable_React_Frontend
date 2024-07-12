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
import RegisterPage from "./Pages/RegisterPage";
import { useContext, useEffect } from "react";
import { GlobalContext } from "./context/GlobalState";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import MainLayout from "./Pages/MainLayout";

function App() {
  const { setUserFromAccessToken } = useContext(GlobalContext);
  useEffect(() => {
    setUserFromAccessToken();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" exact element={<MainPage />} />
          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/items" element={<HomePage />} />
          <Route path="/items/new" element={<NewPage />} />
          <Route path="/items/:id" element={<ShowPage />} />
          <Route path="/items/:id/edit" element={<EditPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
