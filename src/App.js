import Navbar from "./Component/Navbar";
import HomePage from "./Component/HomePage";
import RegistrationForm from "./Component/Admin/RegistrationForm";
import LivePrice from "./Component/LivePrice/LivePrice";
import LoginForm from "./Component/User/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Component/context/AuthContext";
import OAuth2Redirect from "./Component/home/OAuth2Redirect";
import { Navigate } from "react-router-dom";
import SellerData from "./Component/Seller/SellerData";
import EnquiryForm from "./Component/Seller/EnquiryForm";
import Signup from "./Component/User/Signup";
import SellerForm from "./Component/Seller/SellerForm";
import PrivateRoute from "./Component/misc/PrivateRoute";
import ProductList from "./Component/Seller/ProductList";
import EmailVerification from "./Component/Seller/EmailVerification";
import Footer from "./Component/Footer";
import { useState } from "react";
import "./App.css";
function App() {
  const [verifiedEmail, setVerifiedEmail] = useState("");
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/directBuy" element={<SellerData />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
            <Route path="/livePrice" element={<LivePrice />} />

            <Route
              path="/becameseller"
              element={
                verifiedEmail ? (
                  <SellerForm verifiedEmail={verifiedEmail} />
                ) : (
                  <EmailVerification setVerifiedEmail={setVerifiedEmail} />
                )
              }
            />

            <Route
              path="/enquiryform"
              element={
                <PrivateRoute>
                  <EnquiryForm />
                </PrivateRoute>
              }
            />
            <Route path="/productlist" element={<ProductList />} />
            {/* <Route path="/becameseller" element={<SellerForm />} /> */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
