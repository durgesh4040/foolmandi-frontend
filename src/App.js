import Navbar from "./Component/Navbar";
import LoginForm from "./Component/LoginForm";
import HomePage from "./Component/HomePage";
import RegistrationForm from "./Component/RegistrationForm";
import LivePrice from "./Component/LivePrice";
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
