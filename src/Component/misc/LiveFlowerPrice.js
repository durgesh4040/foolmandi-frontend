import axios from "axios";
import { config } from "../../Constants";
import { parseJwt } from "./Helpers";
import Format from "../Format";

export const liveflowerPrice = {
  authenticate,
  signup,
  saveFeedback,
  getUsers,
  deleteUser,
  getMovies,
  deleteMovie,
  addMovie,
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
};

function authenticate(username, password) {
  return instance.post(
    "/auth/authenticate",
    { username, password },
    {
      headers: { "Content-type": "application/json" },
    }
  );
}

function signup(user) {
  return instance.post("/auth/signup", user, {
    headers: { "Content-type": "application/json" },
  });
}

function updateProduct(id, product, user) {
  return instance.put(`api/getUpdate/${id}`, product, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
  });
}
function sendOtp(email) {
  return instance.post(
    `/public/sendOtp?email=${encodeURIComponent(email)}`,
    null,
    {
      headers: { "Content-type": "application/json" },
    }
  );
}
function verifyOtp(email, otp) {
  return instance.post(
    `/public/verifyOtp?email=${encodeURIComponent(
      email
    )}&otp=${encodeURIComponent(otp)}`,
    null,
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

function findSellerByEmail(email) {
  return instance.get(`/public/findSellerByEmail/${email}`);
}
function allData(page, size) {
  return instance.get(`/public/getData?page=${page}&size=${size}`);
}

function findAllSellerData() {
  return instance.get(`/public/allSeller`);
}
function getDataByDate() {
  return instance.get(`public/getPriceByDate/${Format}`);
}

function saveSeller(seller) {
  return instance.post("/public/signup1", seller, {
    headers: { "Content-type": "application/json" },
  });
}

function saveProduct(verifiedEmail, productData, user) {
  return instance.post(`api/saveProduct/${verifiedEmail}`, productData, {
    headers: {
      "Content-type": "mutipart/form-data",
      Authorization: bearerAuth(user),
    },
  });
}

function loginSeller(login) {
  return instance.post(`public/login1`, login, {
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
  return instance.delete(`/api/getId/${id}`, {
    headers: {
      Authorization: bearerAuth(user),
    },
  });
}

function deleteUser(user, username) {
  return instance.delete(`/api/users/${username}`, {
    headers: { Authorization: bearerAuth(user) },
  });
}

function getMovies(user, text) {
  const url = text ? `/api/movies?text=${text}` : "/api/movies";
  return instance.get(url, {
    headers: { Authorization: bearerAuth(user) },
  });
}

function deleteMovie(user, id) {
  return instance.delete(`/api/movies/${id}`, {
    headers: { Authorization: bearerAuth(user) },
  });
}

function addMovie(user, movie) {
  return instance.post("/api/movies", movie, {
    headers: {
      "Content-type": "application/json",
      Authorization: bearerAuth(user),
    },
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
