import Navbar from "./Component/Navbar";
import HomePage from "./Component/HomePage";

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
import AddProduct from "./Component/Seller/AddProduct";
import SellerLogin from "./Component/Seller/SellerLogin";
import SellerDashboard from "./Component/Seller/SellerDashboard";
import Feedback from "./Component/Feedback/Feedback";
import { Helmet } from "react-helmet";
import ForgotUserName from "./Component/ForgotUserName";
import ForgotPassword from "./Component/ForgotPassword";

function App() {
  const [verifiedEmail, setVerifiedEmail] = useState("");

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Helmet>
            <title>
              PhoolMandi - Your One-Stop Platform for Florists, Flower
              Decorators, and Online Flower Shop
            </title>
            <meta
              name="description"
              content="PhoolMandi - The best platform to buy flowers directly from florists. Find the cheapest flowers, bouquet decorators, and all florist sellers in one place."
            />
            <meta
              name="keywords"
              content="PhoolMandi, flower bouquets, cheapest flowers, florist sellers, buy flowers, flower decorators, online flower shop, best flower platform, flower delivery, floral arrangements, nursery, cheap flowers, best place for online PhoolMandi"
            />
            <meta name="author" content="PhoolMandi Team" />
            <meta
              property="og:title"
              content="PhoolMandi - Your One-Stop Platform for Florists, Flower Decorators, and Online Flower Shop"
            />
            <meta
              property="og:description"
              content="Find the best flower bouquet decorators and cheapest flowers from top florists. All florist sellers in one place."
            />
            <meta property="og:image" content="%PUBLIC_URL%/og-image.jpg" />
            <meta property="og:url" content="http://www.phoolmandi.in" />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta
              name="twitter:title"
              content="PhoolMandi - Your One-Stop Platform for Florists, Flower Decorators, and Online Flower Shop"
            />
            <meta
              name="twitter:description"
              content="Find the best flower bouquet decorators and cheapest flowers from top florists. All florist sellers in one place."
            />
            <meta
              name="twitter:image"
              content="%PUBLIC_URL%/twitter-image.jpg"
            />
            <meta name="twitter:site" content="@PhoolMandi" />
            <link rel="canonical" href="http://www.phoolmandi.in" />
            <meta name="robots" content="index, follow" />
          </Helmet>
          <Navbar />
          <Routes>
            <Route path="/" element={<SellerData />} />
            <Route path="/livePrice" element={<HomePage />} />
            {/* <Route path="/directBuy" element={<SellerData />} /> */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
            <Route path="/savelivePrice" element={<LivePrice />} />
            <Route path="/sellerLogin" element={<SellerLogin />} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/forgotUserName" element={<ForgotUserName />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
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
            <Route path="/product-dashboard" element={<AddProduct />} />
            <Route
              path="/enquiryform"
              element={
                <PrivateRoute>
                  <EnquiryForm />
                </PrivateRoute>
              }
            />
            <Route path="/productlist" element={<ProductList />} />
            <Route path="/feedback" element={<Feedback />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
