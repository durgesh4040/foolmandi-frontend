import Navbar from "./Component/Navbar";
import HomePage from "./Component/HomePage";
import RegistrationForm from "./Component/Admin/RegistrationForm";
import LivePrice from "./Component/LivePrice/LivePrice";
import LoginForm from "./Component/User/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="login" element={<LoginForm />}></Route>
          <Route path="signup" element={<RegistrationForm />}></Route>
          <Route path="admin" element={<LivePrice />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
