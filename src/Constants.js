// const prod = {
//   url: {
//     API_BASE_URL: "http://16.170.98.46:8080",
//     OAUTH2_REDIRECT_URI: "https://foolmandi.netlify.app/oauth2/redirect",
//   },
// };

// const dev = {
//   url: {
//     API_BASE_URL: "https://api.phoolmandi.in",
//     OAUTH2_REDIRECT_URI: "http://www.phoolmandi.in/oauth2/redirect",
//   },
// };
const dev = {
  url: {
    API_BASE_URL: "http://localhost:8080",
    OAUTH2_REDIRECT_URI: "http://localhost:3000/oauth2/redirect",
  },
};
export const config = process.env.NODE_ENV === "development" ? dev : dev;
