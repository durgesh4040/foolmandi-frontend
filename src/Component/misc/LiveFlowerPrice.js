import axios from "axios";
import { config } from "../../Constants";
import { parseJwt } from "./Helpers";

export const liveflowerPrice = {
  authenticate,
  signup,
  saveFeedback,
  getUsers,
  deleteUser,

  allData,
  saveSeller,
  findAllSellerData,
  findSellerByEmail,
  enquiryData,
  sendOtp,
  verifyOtp,
  getDataByDate,
  saveProduct,
  loginSeller,
  deleteProductById,
  updateProduct,
  findSellerByName,
  forgotUserName,
  forgotPassword,
};

function authenticate(email, password) {
  return instance.post(
    "/auth/login",
    { email, password },
    {
      headers: { "Content-type": "application/json" },
    }
  );
}

function signup(user) {
  return instance.post("/auth/register", user, {
    headers: { "Content-type": "application/json" },
  });
}

function updateProduct(id, product) {
  return instance.patch(`/productUpdate/${id}`, product, {
    headers: {
      "Content-type": "application/json",
    },
  });
}
function forgotUserName(email, user) {
  return instance.post(`public/sendUserName/${email}`, {
    headers: {
      "Content-type": "application/json",
    },
  });
}

function forgotPassword(forgotPassword) {
  return instance.put(`public/resetPassword`, forgotPassword, {
    headers: {
      "Content-type": "mutipart/form-data",
    },
  });
}
function sendOtp(email) {
  return instance.post(
    `/public/sendOtp?email=${email}`,
    {
      headers: { "Content-type": "application/json" },
    }
  );
}
function verifyOtp(email, otp) {
  return instance.post(
    `/public/verifyOtp?email=${
      email
    }&otp=${otp}`,
    {
      headers: { "Content-type": "application/json" },
    }
  );
}

function enquiryData(enquiry, user) {
  return instance.post("/enquiry", enquiry, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}

function findSellerByEmail(sellerId) {
  return instance.get(`/getProduct/${sellerId}`);
}

function findSellerByName(sellerId) {
  return instance.get(`/getProduct/${sellerId}`);
}
function allData(page, size) {
  return instance.get(`/public/getData?page=${page}&size=${size}`);
}

function findAllSellerData(searchQuery) {
  const url = searchQuery
    ? `/public/sellers/search?term=${searchQuery}`
    : "/public/allSeller";
  console.log("api-url", url);
  return instance.get(url);
}
function getDataByDate() {
  return instance.get(`public/getPriceByDate/2024-07-25`);
}

function saveSeller(seller) {
  return instance.post("/api/auth/seller/register", seller, {
    headers: { "Content-type": "application/json" },
  });
}

function saveProduct(sellerId, productData, user) {
  return instance.post(`/saveProduct/${sellerId}`, productData, {
    headers: {
      "Content-type": "mutipart/form-data",
    },
  });
}

function loginSeller(login) {
  return instance.post(`seller/login`, login, {
    headers: { "Content-type": "application/json" },
  });
}

function saveFeedback(feedback) {
  return instance.post(
    `/public/saveFeedback`,
    { text: feedback },
    {
      headers: { "Content-type": "application/json" },
    }
  );
}

function getUsers(user, username) {
  const url = username ? `/api/users/${username}` : "/api/users";
  return instance.get(url, {
    headers: { Authorization: bearerAuth(user) },
  });
}

function deleteProductById(id, user) {
  return instance.delete(`/productDelete/${id}`, {
    // headers: {
    //   Authorization: bearerAuth(user),
    // },
  });
}

function deleteUser(user, username) {
  return instance.delete(`/api/users/${username}`, {
    headers: { Authorization: bearerAuth(user) },
  });
}

// -- Axios

const instance = axios.create({
  baseURL: config.url.API_BASE_URL,
});

instance.interceptors.request.use(
  function (config) {
    // If token is expired, redirect user to login
    if (config.headers.Authorization) {
      const token = config.headers.Authorization.split(" ")[1];
      const data = parseJwt(token);
      if (Date.now() > data.exp * 1000) {
        window.location.href = "/login";
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// -- Helper functions

function bearerAuth(user) {
  return `Bearer ${user.accessToken}`;
}
