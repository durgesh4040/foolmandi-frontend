const prod = {
  url: {
    API_BASE_URL: "https://phoolmandi-backend-production.onrender.com/api",
    OAUTH2_REDIRECT_URI: "http://localhost:3000/oauth2/redirect",
  },
};



const dev = {
  url: {
    API_BASE_URL: "http://localhost:3000/api",
    OAUTH2_REDIRECT_URI: "http://localhost:3000/oauth2/redirect",
  },
};
export const config = process.env.NODE_ENV === "development" ? prod: prod;
